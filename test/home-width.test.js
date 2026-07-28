import { JSDOM } from "jsdom";
import { afterEach, describe, expect, it } from "vitest";

import {
  createHomeWidthFeature,
  HOME_WIDTH_MODES,
  HOME_WIDTH_STORAGE_KEY,
} from "../src/features/home-width.js";
import { createPageContextFeature } from "../src/features/page-context.js";
import { HOME_WIDTH_STYLE } from "../src/styles/home-width.js";

const activePages = [];

const createPage = () => {
  const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
    url: "https://www.zhihu.com/",
  });
  activePages.push(page);
  return page;
};

afterEach(() => {
  activePages.splice(0).forEach((page) => page.window.close());
});

describe("home width feature", () => {
  it("defaults to the current 694px layout and provides every width mode", () => {
    const page = createPage();
    const commands = new Map();
    let nextCommandId = 1;
    const feature = createHomeWidthFeature(page.window, {
      getMode: (defaultValue) => defaultValue,
      menu: {
        register: (label, callback) => {
          const commandId = nextCommandId++;
          commands.set(commandId, { callback, label });
          return commandId;
        },
        unregister: (commandId) => commands.delete(commandId),
      },
    });

    feature.start();

    expect(page.window.document.documentElement.dataset.zbHomeWidth).toBe("standard");
    expect(commands.size).toBe(HOME_WIDTH_MODES.length);
    expect([...commands.values()].map(({ label }) => label)).toContain("✓ 首页宽度：标准（694px）");

    feature.destroy();
    expect(commands.size).toBe(0);
  });

  it("applies and persists a selected width", () => {
    const page = createPage();
    let savedMode;
    const feature = createHomeWidthFeature(page.window, {
      getMode: () => "standard",
      setMode: (selectedMode) => {
        savedMode = selectedMode;
      },
    });

    feature.start();
    feature.setMode("wide");

    expect(page.window.document.documentElement.dataset.zbHomeWidth).toBe("wide");
    expect(savedMode).toBe("wide");
    expect(HOME_WIDTH_STORAGE_KEY).toBe("zhihu-beautification:home-width");
    feature.destroy();
  });

  it("applies the selected home width to the /follow feed", () => {
    const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
      url: "https://www.zhihu.com/follow",
    });
    activePages.push(page);
    const routeFeature = createPageContextFeature(page.window);
    const widthFeature = createHomeWidthFeature(page.window, { getMode: () => "wide" });

    routeFeature.start();
    widthFeature.start();

    expect(page.window.document.documentElement.dataset.zbHomePage).toBe("true");
    expect(page.window.document.documentElement.dataset.zbHomeWidth).toBe("wide");

    widthFeature.destroy();
    routeFeature.destroy();
  });

  it("falls back to standard and styles hidden and visible sidebars", () => {
    const page = createPage();
    const feature = createHomeWidthFeature(page.window, { getMode: () => "invalid" });

    feature.start();

    expect(page.window.document.documentElement.dataset.zbHomeWidth).toBe("standard");
    expect(HOME_WIDTH_STYLE).toContain("--zb-home-main-width: 694px");
    expect(HOME_WIDTH_STYLE).toContain('data-zb-hide-home-sidebar="false"');
    expect(HOME_WIDTH_STYLE).toContain("calc(var(--zb-home-main-width, 694px) + 306px)");
    feature.destroy();
  });

  it("can restart after destroy", () => {
    const page = createPage();
    const feature = createHomeWidthFeature(page.window);

    feature.start();
    feature.destroy();
    feature.start();

    expect(page.window.document.documentElement.dataset.zbHomeWidth).toBe("standard");
    expect(page.window.document.getElementById("zb-home-width-style")).not.toBeNull();
    feature.destroy();
  });
});
