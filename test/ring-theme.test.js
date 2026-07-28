import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

import { PAGE_CONTEXT_CHANGE_EVENT } from "../src/features/page-context.js";
import { createPageStylesFeature } from "../src/features/page-styles.js";
import { CATPPUCCIN_THEME_STYLE } from "../src/styles/catppuccin-theme.js";
import { PAGE_STYLE_ENTRIES } from "../src/styles/pages/index.js";
import { RING_PAGE_STYLE } from "../src/styles/pages/ring.js";

const expectRule = (selector, declarations) => {
  const ruleStart = RING_PAGE_STYLE.indexOf(`${selector} {`);
  expect(ruleStart, `missing selector: ${selector}`).toBeGreaterThanOrEqual(0);

  const ruleEnd = RING_PAGE_STYLE.indexOf("\n  }", ruleStart);
  expect(ruleEnd, `unterminated rule: ${selector}`).toBeGreaterThan(ruleStart);
  const rule = RING_PAGE_STYLE.slice(ruleStart, ruleEnd);

  declarations.forEach((declaration) => {
    expect(rule).toContain(declaration);
  });
};

const dispatchPageContext = (page, detail) => {
  page.window.dispatchEvent(
    new page.window.CustomEvent(PAGE_CONTEXT_CHANGE_EVENT, {
      detail,
    }),
  );
};

describe("ring page theme", () => {
  it.each([
    ["index", "https://www.zhihu.com/ring", { ringIndex: true }],
    ["feeds", "https://www.zhihu.com/ring-feeds", { ringFeeds: true }],
    [
      "host",
      "https://www.zhihu.com/ring/host/1951598705296794400?tab=hot&tab_id=1",
      { ringHost: true },
    ],
  ])("loads the shared module on ring %s routes", (_route, url, context) => {
    const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", { url });
    const feature = createPageStylesFeature(page.window, PAGE_STYLE_ENTRIES);

    feature.start();

    expect(page.window.document.getElementById("zb-ring-page-theme-style")?.textContent).toBe(
      RING_PAGE_STYLE,
    );
    expect(CATPPUCCIN_THEME_STYLE).not.toContain("data-zb-ring-index-page");
    expect(CATPPUCCIN_THEME_STYLE).not.toContain("data-zb-ring-feeds-page");
    expect(CATPPUCCIN_THEME_STYLE).not.toContain("data-zb-ring-host-page");

    dispatchPageContext(page, {
      ...context,
      home: true,
      ringFeeds: false,
      ringHost: false,
      ringIndex: false,
    });
    expect(page.window.document.getElementById("zb-ring-page-theme-style")).toBeNull();

    feature.destroy();
    page.window.close();
  });

  it("keeps the shared style while switching between ring route kinds", () => {
    const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
      url: "https://www.zhihu.com/ring",
    });
    const feature = createPageStylesFeature(page.window, PAGE_STYLE_ENTRIES);
    feature.start();
    const style = page.window.document.getElementById("zb-ring-page-theme-style");

    dispatchPageContext(page, { ringFeeds: true, ringHost: false, ringIndex: false });
    expect(page.window.document.getElementById("zb-ring-page-theme-style")).toBe(style);

    dispatchPageContext(page, { ringFeeds: false, ringHost: true, ringIndex: false });
    expect(page.window.document.getElementById("zb-ring-page-theme-style")).toBe(style);

    feature.destroy();
    expect(style?.isConnected).toBe(false);
    page.window.close();
  });

  it("themes ring index cards and membership actions", () => {
    expectRule(
      'html[data-zb-theme][data-zb-ring-index-page="true"]\n    .App-main\n    a[href*="/ring/host/"][href*="tab_id"]',
      [
        "background-color: var(--zb-surface) !important;",
        "border: 1px solid var(--zb-border) !important;",
        "border-radius: 12px !important;",
        "box-shadow: var(--zb-shadow) !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-ring-index-page="true"]\n    .App-main\n    a[href^="/ring/host/"]\n    button:is([data-zb-ring-index-action="joined"], [aria-pressed="true"])::after',
      [
        'content: "已加入" !important;',
        "color: var(--zb-text-muted) !important;",
        "-webkit-text-fill-color: var(--zb-text-muted) !important;",
      ],
    );
    expect(RING_PAGE_STYLE).toContain('content: "取消加入" !important;');
  });

  it("themes ring host connected surfaces and joined state", () => {
    expectRule(
      'html[data-zb-theme][data-zb-ring-host-page="true"]\n    .App-main\n    > div:first-child\n    > div:first-child\n    > div:nth-child(2)\n    > :first-child',
      [
        "border-top: 1px solid var(--zb-border) !important;",
        "border-radius: 12px 12px 0 0 !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-ring-host-page="true"]\n    .App-main\n    > div:first-child\n    > div:first-child\n    > div:nth-child(2)\n    > :nth-child(2)\n    > div:nth-child(2)\n    > button[data-zb-ring-host-action="joined"]',
      [
        "background-color: var(--zb-surface-raised) !important;",
        "border-color: var(--zb-border-strong) !important;",
        "color: transparent !important;",
      ],
    );
    expect(RING_PAGE_STYLE).toContain('[data-zb-ring-host-ready="true"]');
  });

  it("themes ring feed cards and scoped action states", () => {
    expectRule(
      'html[data-zb-theme][data-zb-ring-feeds-page="true"]\n    #TopstoryContent\n    .List\n    > .List-item',
      [
        "background-color: var(--zb-surface) !important;",
        "border: 1px solid var(--zb-border) !important;",
        "border-radius: 12px !important;",
        "margin-bottom: 10px !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-ring-feeds-page="true"]\n    #TopstoryContent\n    .List\n    > .List-item\n    .ContentItem-actions\n    .Button:not(.VoteButton):focus-visible',
      ["box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;", "outline: 0 !important;"],
    );
    expectRule(
      'html[data-zb-theme][data-zb-ring-feeds-page="true"]\n    .Modal:has(.WritePinV2-Form)\n    .WritePinV2-Form',
      [
        "background-color: var(--zb-surface) !important;",
        "border: 1px solid var(--zb-border-strong) !important;",
        "border-radius: 8px !important;",
      ],
    );
  });
});
