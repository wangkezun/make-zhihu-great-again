import { persistBooleanPreference, readBooleanPreference } from "./shared.js";

export const TELEMETRY_BLOCKER_STORAGE_KEY = "zhihu-beautification:block-telemetry";

const BLOCKED_ENDPOINTS = new Map([
  [
    "zhihu-web-analytics.zhihu.com",
    new Set(["/api/v2/za/logs/batch", "/api/v3inv2/za/logs/batch"]),
  ],
  ["crash2.zhihu.com", new Set(["/api/1224/store/"])],
  ["datahub.zhihu.com", new Set(["/collector/zlab"])],
]);

const captureStack = () => new Error().stack ?? "";

export const matchesTelemetryCompressionWorker = ({ stack }) =>
  stack.includes("unpkg.zhimg.com/za-js-sdk@") ||
  (stack.includes("/heifetz/chunks/5946.") && stack.includes("/heifetz/chunks/6642."));

const getRequestUrl = (input) => {
  if (typeof input === "string") return input;
  if (input && typeof input.href === "string") return input.href;
  if (input && typeof input.url === "string") return input.url;
  return null;
};

export const isBlockedTelemetryUrl = (browserWindow, input) => {
  const requestUrl = getRequestUrl(input);
  if (!requestUrl) return false;

  try {
    const url = new browserWindow.URL(requestUrl, browserWindow.location.href);
    return (
      url.protocol === "https:" && BLOCKED_ENDPOINTS.get(url.hostname)?.has(url.pathname) === true
    );
  } catch {
    return false;
  }
};

const createSuccessfulResponse = (browserWindow) =>
  new browserWindow.Response(null, {
    status: 204,
    statusText: "No Content",
  });

export const createTelemetryBlockerFeature = (browserWindow, settings, matchers = {}) => {
  let enabled = readBooleanPreference(browserWindow, settings, TELEMETRY_BLOCKER_STORAGE_KEY, true);
  let menuCommandId;
  let originalFetch;
  let wrappedFetch;
  let originalWorker;
  let wrappedWorker;
  let originalSendBeacon;
  let wrappedSendBeacon;
  let originalXhrOpen;
  let originalXhrSend;
  let wrappedXhrOpen;
  let wrappedXhrSend;
  const blockedXhrs = new WeakSet();
  let started = false;
  const isTelemetryCompressionWorker =
    matchers.telemetryCompressionWorker ?? matchesTelemetryCompressionWorker;

  const updateMenuCommand = () => {
    if (!settings?.menu?.register) return;

    if (menuCommandId !== undefined && settings.menu.unregister) {
      settings.menu.unregister(menuCommandId);
    }

    const status = enabled ? "已开启" : "已关闭";
    menuCommandId = settings.menu.register(`屏蔽已知知乎遥测请求：${status}`, () => {
      setEnabled(!enabled);
    });
  };

  const installFetchWrapper = () => {
    if (wrappedFetch || typeof browserWindow.fetch !== "function") return;

    const installedOriginalFetch = browserWindow.fetch;
    originalFetch = installedOriginalFetch;
    wrappedFetch = function (...args) {
      if (enabled && isBlockedTelemetryUrl(browserWindow, args[0])) {
        return browserWindow.Promise.resolve(createSuccessfulResponse(browserWindow));
      }
      return installedOriginalFetch.apply(this, args);
    };
    browserWindow.fetch = wrappedFetch;
  };

  const createBlockedWorker = () => {
    const messageListeners = new Set();
    let terminated = false;
    let onmessage = null;

    return {
      addEventListener(type, callback) {
        if (type === "message" && typeof callback === "function") messageListeners.add(callback);
      },
      get onmessage() {
        return onmessage;
      },
      set onmessage(callback) {
        onmessage = callback;
      },
      postMessage(message) {
        if (terminated || !Array.isArray(message)) return;
        browserWindow.Promise.resolve().then(() => {
          if (terminated) return;
          const event = {
            data: {
              $e$: [
                "Telemetry compression skipped",
                "ZB_TELEMETRY_BLOCKED",
                "Telemetry compression worker blocked by Make Zhihu Great Again",
              ],
            },
          };
          onmessage?.call(this, event);
          messageListeners.forEach((callback) => callback.call(this, event));
        });
      },
      removeEventListener(type, callback) {
        if (type === "message") messageListeners.delete(callback);
      },
      terminate() {
        terminated = true;
        messageListeners.clear();
        onmessage = null;
      },
    };
  };

  const installWorkerWrapper = () => {
    if (wrappedWorker || typeof browserWindow.Worker !== "function") return;

    const installedOriginalWorker = browserWindow.Worker;
    originalWorker = installedOriginalWorker;
    wrappedWorker = function (url, options) {
      if (enabled) {
        const stack = captureStack();
        if (isTelemetryCompressionWorker({ options, stack, url })) {
          return createBlockedWorker();
        }
      }
      return Reflect.construct(installedOriginalWorker, [url, options], installedOriginalWorker);
    };
    Object.setPrototypeOf(wrappedWorker, installedOriginalWorker);
    wrappedWorker.prototype = installedOriginalWorker.prototype;
    browserWindow.Worker = wrappedWorker;
  };

  const installSendBeaconWrapper = () => {
    const navigator = browserWindow.navigator;
    if (wrappedSendBeacon || typeof navigator?.sendBeacon !== "function") return;

    const installedOriginalSendBeacon = navigator.sendBeacon;
    originalSendBeacon = installedOriginalSendBeacon;
    wrappedSendBeacon = function (url, data) {
      if (enabled && isBlockedTelemetryUrl(browserWindow, url)) return true;
      return installedOriginalSendBeacon.call(this, url, data);
    };
    try {
      navigator.sendBeacon = wrappedSendBeacon;
    } catch {
      originalSendBeacon = undefined;
      wrappedSendBeacon = undefined;
    }
  };

  const installXMLHttpRequestWrapper = () => {
    const prototype = browserWindow.XMLHttpRequest?.prototype;
    if (
      wrappedXhrOpen ||
      typeof prototype?.open !== "function" ||
      typeof prototype.send !== "function"
    ) {
      return;
    }

    const installedOriginalOpen = prototype.open;
    const installedOriginalSend = prototype.send;
    originalXhrOpen = installedOriginalOpen;
    originalXhrSend = installedOriginalSend;
    wrappedXhrOpen = function (method, url, ...args) {
      if (enabled && isBlockedTelemetryUrl(browserWindow, url)) {
        blockedXhrs.add(this);
        const async = args[0] ?? true;
        return installedOriginalOpen.call(this, "GET", "data:application/json,%7B%7D", async);
      }

      blockedXhrs.delete(this);
      return installedOriginalOpen.call(this, method, url, ...args);
    };
    wrappedXhrSend = function (body) {
      if (blockedXhrs.has(this)) return installedOriginalSend.call(this);
      return installedOriginalSend.call(this, body);
    };
    try {
      prototype.open = wrappedXhrOpen;
      prototype.send = wrappedXhrSend;
    } catch {
      if (prototype.open === wrappedXhrOpen) prototype.open = installedOriginalOpen;
      if (prototype.send === wrappedXhrSend) prototype.send = installedOriginalSend;
      originalXhrOpen = undefined;
      originalXhrSend = undefined;
      wrappedXhrOpen = undefined;
      wrappedXhrSend = undefined;
    }
  };

  function setEnabled(value) {
    enabled = Boolean(value);
    persistBooleanPreference(browserWindow, settings, TELEMETRY_BLOCKER_STORAGE_KEY, enabled);
    updateMenuCommand();
  }

  const start = () => {
    if (started) return;
    started = true;
    enabled = readBooleanPreference(browserWindow, settings, TELEMETRY_BLOCKER_STORAGE_KEY, true);
    installFetchWrapper();
    installWorkerWrapper();
    installSendBeaconWrapper();
    installXMLHttpRequestWrapper();
    updateMenuCommand();
  };

  const destroy = () => {
    if (!started) return;
    started = false;
    enabled = false;
    if (wrappedFetch && browserWindow.fetch === wrappedFetch) {
      browserWindow.fetch = originalFetch;
    }
    originalFetch = undefined;
    wrappedFetch = undefined;
    if (wrappedWorker && browserWindow.Worker === wrappedWorker) {
      browserWindow.Worker = originalWorker;
    }
    originalWorker = undefined;
    wrappedWorker = undefined;
    if (wrappedSendBeacon && browserWindow.navigator?.sendBeacon === wrappedSendBeacon) {
      browserWindow.navigator.sendBeacon = originalSendBeacon;
    }
    originalSendBeacon = undefined;
    wrappedSendBeacon = undefined;
    const xhrPrototype = browserWindow.XMLHttpRequest?.prototype;
    if (wrappedXhrOpen && xhrPrototype?.open === wrappedXhrOpen) {
      xhrPrototype.open = originalXhrOpen;
    }
    if (wrappedXhrSend && xhrPrototype?.send === wrappedXhrSend) {
      xhrPrototype.send = originalXhrSend;
    }
    originalXhrOpen = undefined;
    originalXhrSend = undefined;
    wrappedXhrOpen = undefined;
    wrappedXhrSend = undefined;
    if (menuCommandId !== undefined && settings?.menu?.unregister) {
      settings.menu.unregister(menuCommandId);
    }
    menuCommandId = undefined;
  };

  return { destroy, setEnabled, start };
};
