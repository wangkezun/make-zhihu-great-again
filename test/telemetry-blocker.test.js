import { JSDOM } from "jsdom";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  createTelemetryBlockerFeature,
  isBlockedTelemetryUrl,
  matchesTelemetryCompressionWorker,
  TELEMETRY_BLOCKER_STORAGE_KEY,
} from "../src/features/telemetry-blocker.js";

const activePages = [];

const createPage = () => {
  const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
    url: "https://www.zhihu.com/",
  });
  activePages.push(page);
  page.window.Response = class {
    constructor(_body, init) {
      this.ok = init.status >= 200 && init.status < 300;
      this.status = init.status;
      this.statusText = init.statusText;
    }
  };
  page.window.fetch = vi.fn(async () => new page.window.Response(null, { status: 200 }));
  return page;
};

afterEach(() => {
  activePages.splice(0).forEach((page) => page.window.close());
});

describe("telemetry blocker feature", () => {
  it("matches only the two observed telemetry compression worker stacks", () => {
    expect(
      matchesTelemetryCompressionWorker({
        stack:
          "Error\n    at new Worker (https://unpkg.zhimg.com/za-js-sdk@5.6.0/dist/zap.js:1:335438)",
      }),
    ).toBe(true);
    expect(
      matchesTelemetryCompressionWorker({
        stack:
          "Error\n    at a (https://static.zhihu.com/heifetz/chunks/5946.hash.js:1:227)\n    at https://static.zhihu.com/heifetz/chunks/6642.hash.js:1:218",
      }),
    ).toBe(true);
    expect(
      matchesTelemetryCompressionWorker({
        stack: "Error\n    at new Worker (https://static.zhihu.com/heifetz/chunks/business.js:1:1)",
      }),
    ).toBe(false);
  });

  it.each([
    "https://zhihu-web-analytics.zhihu.com/api/v2/za/logs/batch",
    "https://zhihu-web-analytics.zhihu.com/api/v2/za/logs/batch?timestamp=1",
    "https://zhihu-web-analytics.zhihu.com/api/v3inv2/za/logs/batch",
    "https://crash2.zhihu.com/api/1224/store/?sentry_version=7",
    "https://datahub.zhihu.com/collector/zlab",
  ])("recognizes an exact telemetry endpoint: %s", (url) => {
    const page = createPage();

    expect(isBlockedTelemetryUrl(page.window, url)).toBe(true);
  });

  it.each([
    "http://zhihu-web-analytics.zhihu.com/api/v2/za/logs/batch",
    "https://zhihu-web-analytics.zhihu.com/api/v2/za/logs/batch/extra",
    "https://zhihu-web-analytics.zhihu.com/api/v4/za/logs/batch",
    "https://www.zhihu.com/api/v4/feed/topstory",
    "https://crash2.zhihu.com/api/1225/store/",
    "https://datahub.zhihu.com/collector/zlab/extra",
    "https://example.com/",
  ])("does not match a business or lookalike endpoint: %s", (url) => {
    const page = createPage();

    expect(isBlockedTelemetryUrl(page.window, url)).toBe(false);
  });

  it("returns a successful local response for telemetry and leaves business requests alone", async () => {
    const page = createPage();
    const originalFetch = page.window.fetch;
    const feature = createTelemetryBlockerFeature(page.window);

    feature.start();
    const analyticsResponse = await page.window.fetch(
      "https://zhihu-web-analytics.zhihu.com/api/v2/za/logs/batch",
      { method: "POST" },
    );
    const sentryResponse = await page.window.fetch({
      url: "https://crash2.zhihu.com/api/1224/store/?sentry_key=test",
    });
    await page.window.fetch("https://www.zhihu.com/api/v4/feed/topstory");

    expect(analyticsResponse).toMatchObject({ ok: true, status: 204 });
    expect(sentryResponse).toMatchObject({ ok: true, status: 204 });
    expect(originalFetch).toHaveBeenCalledOnce();
    expect(originalFetch).toHaveBeenCalledWith("https://www.zhihu.com/api/v4/feed/topstory");
    feature.destroy();
  });

  it("blocks URL objects and sendBeacon calls to known telemetry endpoints", async () => {
    const page = createPage();
    const originalFetch = page.window.fetch;
    const originalSendBeacon = vi.fn(() => true);
    Object.defineProperty(page.window.navigator, "sendBeacon", {
      configurable: true,
      value: originalSendBeacon,
      writable: true,
    });
    const feature = createTelemetryBlockerFeature(page.window);

    feature.start();
    const response = await page.window.fetch(
      new page.window.URL("https://zhihu-web-analytics.zhihu.com/api/v2/za/logs/batch"),
    );
    const telemetryQueued = page.window.navigator.sendBeacon(
      new page.window.URL("https://datahub.zhihu.com/collector/zlab"),
      "telemetry",
    );
    const businessQueued = page.window.navigator.sendBeacon(
      "https://www.zhihu.com/api/v4/feed/topstory",
      "business",
    );

    expect(response.status).toBe(204);
    expect(telemetryQueued).toBe(true);
    expect(businessQueued).toBe(true);
    expect(originalFetch).not.toHaveBeenCalled();
    expect(originalSendBeacon).toHaveBeenCalledOnce();
    expect(originalSendBeacon).toHaveBeenCalledWith(
      "https://www.zhihu.com/api/v4/feed/topstory",
      "business",
    );
    feature.destroy();
    expect(page.window.navigator.sendBeacon).toBe(originalSendBeacon);
  });

  it("redirects known telemetry XMLHttpRequests to a local data URL", () => {
    const page = createPage();
    const open = vi.fn();
    const send = vi.fn();
    page.window.XMLHttpRequest = class {
      open(...args) {
        return open(...args);
      }

      send(...args) {
        return send(...args);
      }
    };
    const originalOpen = page.window.XMLHttpRequest.prototype.open;
    const originalSend = page.window.XMLHttpRequest.prototype.send;
    const feature = createTelemetryBlockerFeature(page.window);

    feature.start();
    const telemetryRequest = new page.window.XMLHttpRequest();
    telemetryRequest.open(
      "POST",
      "https://zhihu-web-analytics.zhihu.com/api/v2/za/logs/batch",
      true,
    );
    telemetryRequest.send("telemetry");
    const businessRequest = new page.window.XMLHttpRequest();
    businessRequest.open("POST", "https://www.zhihu.com/api/v4/feed/topstory", true);
    businessRequest.send("business");

    expect(open.mock.calls).toEqual([
      ["GET", "data:application/json,%7B%7D", true],
      ["POST", "https://www.zhihu.com/api/v4/feed/topstory", true],
    ]);
    expect(send.mock.calls).toEqual([[], ["business"]]);
    feature.destroy();
    expect(page.window.XMLHttpRequest.prototype.open).toBe(originalOpen);
    expect(page.window.XMLHttpRequest.prototype.send).toBe(originalSend);
  });

  it("restores a saved disabled state and toggles immediately from the menu", async () => {
    const page = createPage();
    const originalFetch = page.window.fetch;
    const commands = new Map();
    let nextCommandId = 1;
    let storedPreference = false;
    const feature = createTelemetryBlockerFeature(page.window, {
      getPreference: () => storedPreference,
      menu: {
        register: (label, callback) => {
          const commandId = nextCommandId++;
          commands.set(commandId, { callback, label });
          return commandId;
        },
        unregister: (commandId) => commands.delete(commandId),
      },
      setPreference: (value) => {
        storedPreference = value;
      },
    });

    feature.start();
    expect([...commands.values()][0].label).toBe("屏蔽已知知乎遥测请求：已关闭");
    await page.window.fetch("https://zhihu-web-analytics.zhihu.com/api/v2/za/logs/batch");
    expect(originalFetch).toHaveBeenCalledOnce();

    [...commands.values()][0].callback();
    expect(storedPreference).toBe(true);
    expect([...commands.values()][0].label).toBe("屏蔽已知知乎遥测请求：已开启");
    const response = await page.window.fetch(
      "https://zhihu-web-analytics.zhihu.com/api/v2/za/logs/batch",
    );
    expect(response.status).toBe(204);
    expect(originalFetch).toHaveBeenCalledOnce();

    feature.destroy();
    expect(commands.size).toBe(0);
  });

  it("starts once and restores its own fetch wrapper on destroy", () => {
    const page = createPage();
    const originalFetch = page.window.fetch;
    const feature = createTelemetryBlockerFeature(page.window);

    feature.start();
    const wrappedFetch = page.window.fetch;
    feature.start();

    expect(page.window.fetch).toBe(wrappedFetch);
    feature.destroy();
    expect(page.window.fetch).toBe(originalFetch);
  });

  it("blocks only matched telemetry compression workers while enabled", async () => {
    const page = createPage();
    const nativeWorker = {
      addEventListener: vi.fn(),
      postMessage: vi.fn(),
      terminate: vi.fn(),
    };
    const OriginalWorker = vi.fn(function () {
      return nativeWorker;
    });
    page.window.Worker = OriginalWorker;
    const feature = createTelemetryBlockerFeature(page.window, undefined, {
      telemetryCompressionWorker: ({ url }) => String(url).includes("telemetry"),
    });

    feature.start();
    const blockedWorker = new page.window.Worker("blob:https://www.zhihu.com/telemetry");
    const onmessage = vi.fn();
    blockedWorker.onmessage = onmessage;
    blockedWorker.postMessage({ initialization: true });
    blockedWorker.postMessage([new Uint8Array([1]), {}]);
    await page.window.Promise.resolve();

    expect(OriginalWorker).not.toHaveBeenCalled();
    expect(onmessage).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          $e$: expect.arrayContaining(["Telemetry compression skipped"]),
        }),
      }),
    );
    const businessWorker = new page.window.Worker("blob:https://www.zhihu.com/business");
    expect(businessWorker).toBe(nativeWorker);
    expect(OriginalWorker).toHaveBeenCalledOnce();

    feature.setEnabled(false);
    expect(new page.window.Worker("blob:https://www.zhihu.com/telemetry")).toBe(nativeWorker);
    expect(OriginalWorker).toHaveBeenCalledTimes(2);

    feature.destroy();
    expect(page.window.Worker).toBe(OriginalWorker);
  });

  it("does not overwrite a fetch wrapper installed later", async () => {
    const page = createPage();
    const feature = createTelemetryBlockerFeature(page.window);

    feature.start();
    const blockerFetch = page.window.fetch;
    const laterFetch = vi.fn((...args) => blockerFetch(...args));
    page.window.fetch = laterFetch;

    feature.destroy();
    expect(page.window.fetch).toBe(laterFetch);
    await page.window.fetch("https://zhihu-web-analytics.zhihu.com/api/v2/za/logs/batch");
    expect(laterFetch).toHaveBeenCalledOnce();
  });

  it("does not overwrite or break a Worker wrapper installed later", () => {
    const page = createPage();
    const nativeWorker = { terminate: vi.fn() };
    const OriginalWorker = vi.fn(function () {
      return nativeWorker;
    });
    page.window.Worker = OriginalWorker;
    const feature = createTelemetryBlockerFeature(page.window);

    feature.start();
    const blockerWorker = page.window.Worker;
    const LaterWorker = vi.fn(function (...args) {
      return Reflect.construct(blockerWorker, args, blockerWorker);
    });
    page.window.Worker = LaterWorker;

    feature.destroy();
    expect(page.window.Worker).toBe(LaterWorker);
    expect(new page.window.Worker("blob:https://www.zhihu.com/business")).toBe(nativeWorker);
    expect(LaterWorker).toHaveBeenCalledOnce();
    expect(OriginalWorker).toHaveBeenCalledOnce();
  });

  it("uses the default when storage fails and persists the toggle safely", async () => {
    const page = createPage();
    const feature = createTelemetryBlockerFeature(page.window, {
      getPreference: () => {
        throw new Error("storage unavailable");
      },
      setPreference: () => {
        throw new Error("storage unavailable");
      },
    });

    feature.start();
    const blockedResponse = await page.window.fetch(
      "https://zhihu-web-analytics.zhihu.com/api/v3inv2/za/logs/batch",
    );
    expect(blockedResponse.status).toBe(204);
    expect(() => feature.setEnabled(false)).not.toThrow();
    feature.destroy();
  });

  it("uses the project storage key", () => {
    expect(TELEMETRY_BLOCKER_STORAGE_KEY).toBe("zhihu-beautification:block-telemetry");
  });
});
