import { JSDOM } from "jsdom";
import { describe, expect, it, vi } from "vitest";

import {
  createIdleTimerBlockerFeature,
  matchesCarouselTimeout,
  matchesPresetWordsInterval,
} from "../src/features/idle-timer-blocker.js";

const createPage = () =>
  new JSDOM('<!doctype html><html data-zb-hide-home-sidebar="true"><body></body></html>', {
    url: "https://www.zhihu.com/",
  });

const installTimerHarness = (browserWindow) => {
  const timers = new Map();
  let nextTimerId = 1;
  const setTimeout = vi.fn((callback, delay, ...args) => {
    const timerId = nextTimerId++;
    timers.set(timerId, { args, callback, delay, type: "timeout" });
    return timerId;
  });
  const setInterval = vi.fn((callback, delay, ...args) => {
    const timerId = nextTimerId++;
    timers.set(timerId, { args, callback, delay, type: "interval" });
    return timerId;
  });
  const clearTimeout = vi.fn((timerId) => timers.delete(timerId));
  const clearInterval = vi.fn((timerId) => timers.delete(timerId));
  Object.assign(browserWindow, { clearInterval, clearTimeout, setInterval, setTimeout });

  const run = (timerId) => {
    const timer = timers.get(timerId);
    if (!timer) return;
    if (timer.type === "timeout") timers.delete(timerId);
    timer.callback(...timer.args);
  };

  return { clearInterval, clearTimeout, run, setInterval, setTimeout, timers };
};

describe("idle timer blocker feature", () => {
  it("matches only the observed carousel and preset-word registrations", () => {
    expect(
      matchesCarouselTimeout({
        delay: 5000,
        stack: "Error\n    at n.play (https://static.zhihu.com/heifetz/chunks/1057.hash.js:1:1931)",
      }),
    ).toBe(true);
    expect(
      matchesCarouselTimeout({
        delay: 5000,
        stack: "Error\n    at play (https://static.zhihu.com/heifetz/chunks/other.js:1:1)",
      }),
    ).toBe(false);
    expect(
      matchesPresetWordsInterval({
        delay: 8000,
        stack:
          "Error\n    at n.startPresetWordsRotation (https://static.zhihu.com/heifetz/main.app.js:1:1)",
      }),
    ).toBe(true);
    expect(
      matchesPresetWordsInterval({
        delay: 30000,
        stack:
          "Error\n    at n.startPresetWordsRotation (https://static.zhihu.com/heifetz/main.app.js:1:1)",
      }),
    ).toBe(false);
  });

  it("suspends the hidden carousel timeout and resumes it when the sidebar is shown", async () => {
    const page = createPage();
    const harness = installTimerHarness(page.window);
    const callback = vi.fn();
    const feature = createIdleTimerBlockerFeature(page.window, {
      carouselTimeout: () => true,
      presetWordsInterval: () => false,
    });

    feature.start();
    const suspendedId = page.window.setTimeout(callback, 5000, "carousel");

    expect(suspendedId).toBeLessThan(0);
    expect(harness.setTimeout).not.toHaveBeenCalled();

    page.window.document.documentElement.dataset.zbHideHomeSidebar = "false";
    await new Promise((resolve) => page.window.queueMicrotask(resolve));
    expect(harness.setTimeout).toHaveBeenCalledWith(expect.any(Function), 0, "carousel");

    const resumedId = [...harness.timers.keys()][0];
    harness.run(resumedId);
    expect(callback).toHaveBeenCalledWith("carousel");
    feature.destroy();
    page.window.close();
  });

  it("blocks preset-word rotation but preserves MQTT and unrelated intervals", () => {
    const page = createPage();
    const harness = installTimerHarness(page.window);
    const feature = createIdleTimerBlockerFeature(page.window, {
      carouselTimeout: () => false,
      presetWordsInterval: () => true,
    });
    const presetCallback = vi.fn();
    const mqttCallback = vi.fn();

    feature.start();
    const presetId = page.window.setInterval(presetCallback, 8000);
    const mqttId = page.window.setInterval(mqttCallback, 30000);

    expect(presetId).toBeLessThan(0);
    expect(mqttId).toBeGreaterThan(0);
    expect(harness.setInterval).toHaveBeenCalledOnce();
    expect(harness.setInterval).toHaveBeenCalledWith(mqttCallback, 30000);
    feature.destroy();
    page.window.close();
  });

  it("restores owned timer wrappers and delegates unknown negative ids", () => {
    const page = createPage();
    const harness = installTimerHarness(page.window);
    const originalSetTimeout = page.window.setTimeout;
    const originalSetInterval = page.window.setInterval;
    const feature = createIdleTimerBlockerFeature(page.window);

    feature.start();
    feature.start();
    page.window.clearInterval(-999);
    expect(harness.clearInterval).toHaveBeenCalledWith(-999);
    feature.destroy();

    expect(page.window.setTimeout).toBe(originalSetTimeout);
    expect(page.window.setInterval).toBe(originalSetInterval);
    page.window.close();
  });
});
