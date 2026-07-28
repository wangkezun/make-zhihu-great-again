const ROOT_HIDE_SIDEBAR_ATTRIBUTE = "data-zb-hide-home-sidebar";
const CAROUSEL_DELAY = 5000;
const PRESET_WORDS_DELAY = 8000;

const normalizeDelay = (delay) => {
  const numericDelay = Number(delay);
  return Number.isFinite(numericDelay) ? Math.max(0, numericDelay) : 0;
};

const captureStack = () => new Error().stack ?? "";

export const matchesCarouselTimeout = ({ delay, stack }) =>
  delay === CAROUSEL_DELAY &&
  stack.includes("/heifetz/chunks/1057.") &&
  /\bat n\.play \(/.test(stack);

export const matchesPresetWordsInterval = ({ delay, stack }) =>
  delay === PRESET_WORDS_DELAY && stack.includes("startPresetWordsRotation");

export const createIdleTimerBlockerFeature = (browserWindow, matchers = {}) => {
  const browserDocument = browserWindow.document;
  const originalSetTimeout = browserWindow.setTimeout;
  const originalSetInterval = browserWindow.setInterval;
  const originalClearTimeout = browserWindow.clearTimeout;
  const originalClearInterval = browserWindow.clearInterval;
  const isCarouselTimeout = matchers.carouselTimeout ?? matchesCarouselTimeout;
  const isPresetWordsInterval = matchers.presetWordsInterval ?? matchesPresetWordsInterval;
  const suspendedTimeouts = new Map();
  const blockedIntervals = new Set();
  let nextSuspendedTimerId = -1;
  let rootObserver;
  let documentObserver;
  let started = false;

  const isSidebarHidden = () =>
    browserDocument.documentElement?.getAttribute(ROOT_HIDE_SIDEBAR_ATTRIBUTE) === "true";

  const resumeSuspendedTimeouts = () => {
    if (isSidebarHidden() || suspendedTimeouts.size === 0) return;

    const suspended = [...suspendedTimeouts.values()];
    suspendedTimeouts.clear();
    suspended.forEach(({ args, callback }) =>
      originalSetTimeout.call(browserWindow, callback, 0, ...args),
    );
  };

  const observeRoot = () => {
    const root = browserDocument.documentElement;
    if (!root) return;

    documentObserver?.disconnect();
    documentObserver = undefined;
    rootObserver ??= new browserWindow.MutationObserver(resumeSuspendedTimeouts);
    rootObserver.observe(root, {
      attributes: true,
      attributeFilter: [ROOT_HIDE_SIDEBAR_ATTRIBUTE],
    });
  };

  const setTimeout = (callback, delay, ...args) => {
    const normalizedDelay = normalizeDelay(delay);
    if (typeof callback === "function" && isSidebarHidden() && normalizedDelay === CAROUSEL_DELAY) {
      const stack = captureStack();
      if (isCarouselTimeout({ callback, delay: normalizedDelay, stack })) {
        const timerId = nextSuspendedTimerId--;
        suspendedTimeouts.set(timerId, { args, callback });
        return timerId;
      }
    }
    return originalSetTimeout.call(browserWindow, callback, delay, ...args);
  };

  const setInterval = (callback, delay, ...args) => {
    const normalizedDelay = normalizeDelay(delay);
    if (typeof callback === "function" && normalizedDelay === PRESET_WORDS_DELAY) {
      const stack = captureStack();
      if (isPresetWordsInterval({ callback, delay: normalizedDelay, stack })) {
        const timerId = nextSuspendedTimerId--;
        blockedIntervals.add(timerId);
        return timerId;
      }
    }
    return originalSetInterval.call(browserWindow, callback, delay, ...args);
  };

  const clearTimeout = (timerId) => {
    if (suspendedTimeouts.delete(timerId) || blockedIntervals.delete(timerId)) return;
    return originalClearTimeout.call(browserWindow, timerId);
  };

  const clearInterval = (timerId) => {
    if (suspendedTimeouts.delete(timerId) || blockedIntervals.delete(timerId)) return;
    return originalClearInterval.call(browserWindow, timerId);
  };

  const start = () => {
    if (started) return;
    started = true;
    browserWindow.setTimeout = setTimeout;
    browserWindow.setInterval = setInterval;
    browserWindow.clearTimeout = clearTimeout;
    browserWindow.clearInterval = clearInterval;
    if (browserDocument.documentElement) {
      observeRoot();
    } else {
      documentObserver = new browserWindow.MutationObserver(observeRoot);
      documentObserver.observe(browserDocument, { childList: true });
    }
  };

  const destroy = () => {
    if (!started) return;
    rootObserver?.disconnect();
    rootObserver = undefined;
    documentObserver?.disconnect();
    documentObserver = undefined;
    if (browserWindow.setTimeout === setTimeout) browserWindow.setTimeout = originalSetTimeout;
    if (browserWindow.setInterval === setInterval) browserWindow.setInterval = originalSetInterval;
    if (browserWindow.clearTimeout === clearTimeout) {
      browserWindow.clearTimeout = originalClearTimeout;
    }
    if (browserWindow.clearInterval === clearInterval) {
      browserWindow.clearInterval = originalClearInterval;
    }
    suspendedTimeouts.clear();
    blockedIntervals.clear();
    started = false;
  };

  return { destroy, start };
};
