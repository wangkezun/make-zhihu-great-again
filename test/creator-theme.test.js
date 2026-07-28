import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

import { createPageStylesFeature } from "../src/features/page-styles.js";
import { CATPPUCCIN_THEME_STYLE } from "../src/styles/catppuccin-theme.js";
import { CREATOR_PAGE_STYLE } from "../src/styles/pages/creator.js";
import { PAGE_STYLE_ENTRIES } from "../src/styles/pages/index.js";
import {
  createRuleExpectation,
  dispatchPageContext,
  expectStyleInjected,
  expectStyleRemoved,
} from "./helpers/style-rules.js";

const expectRule = createRuleExpectation(CREATOR_PAGE_STYLE);

describe("creator page theme", () => {
  it("loads the extracted module on creator routes and removes it after navigation", () => {
    const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
      url: "https://www.zhihu.com/creator",
    });
    const feature = createPageStylesFeature(page.window, PAGE_STYLE_ENTRIES);

    feature.start();

    expect(CATPPUCCIN_THEME_STYLE).not.toContain('[data-zb-creator-page="true"]');
    expectStyleInjected(page, "zb-creator-page-theme-style", CREATOR_PAGE_STYLE);

    page.window.history.pushState({}, "", "/hot");
    dispatchPageContext(page, { creator: false });
    expectStyleRemoved(page, "zb-creator-page-theme-style");

    feature.destroy();
    page.window.close();
  });

  it("also loads the creator module on associated-account routes", () => {
    const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
      url: "https://www.zhihu.com/creator/account/associated-account",
    });
    const feature = createPageStylesFeature(page.window, PAGE_STYLE_ENTRIES);

    feature.start();

    expectStyleInjected(page, "zb-creator-page-theme-style", CREATOR_PAGE_STYLE);

    feature.destroy();
    page.window.close();
  });

  it("themes creator navigation, cards, and creation entry states", () => {
    expectRule('html[data-zb-theme][data-zb-creator-page="true"] .CreatorHome', [
      "color: var(--zb-text) !important;",
    ]);
    expectRule('html[data-zb-theme][data-zb-creator-page="true"] .CreatorIndex-BottomBox-Item', [
      "background-color: var(--zb-surface-raised) !important;",
      "border-color: var(--zb-border) !important;",
      "color: var(--zb-text-muted) !important;",
    ]);
    expectRule(
      'html[data-zb-theme][data-zb-creator-page="true"]\n    .Creator\n    > div:first-child\n    a[href="/creator"]',
      ["background-color: var(--zb-primary-soft) !important;", "border-radius: 8px !important;"],
    );
    expectRule(
      'html[data-zb-theme][data-zb-creator-page="true"]\n    .Creator\n    > div:first-child\n    div:has(> a[href="/zvideo/upload-video"])',
      [
        "background: var(--zb-surface-raised) !important;",
        "border: 1px solid var(--zb-border-strong) !important;",
        "border-radius: 8px !important;",
        "opacity: 1 !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-creator-page="true"]\n    .Creator-mainColumn\n    > .Card\n    .Tabs-link.is-active',
      [
        "background-color: var(--zb-primary-soft) !important;",
        "color: var(--zb-primary) !important;",
        "font-weight: 500 !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-creator-page="true"]\n    .Creator-mainColumn\n    > .Card\n    .CreationManage-CreationCard',
      [
        "background-color: var(--zb-surface) !important;",
        "border: 1px solid var(--zb-border) !important;",
        "border-radius: 12px !important;",
        "box-shadow: var(--zb-shadow) !important;",
      ],
    );
  });

  it("themes creator home controls that otherwise keep light surfaces", () => {
    expectRule(
      'html[data-zb-theme][data-zb-creator-page="true"]\n    .SearchBar[role="search"]\n    > div:first-child',
      [
        "padding: 8px 12px !important;",
        "background-color: var(--zb-surface-raised) !important;",
        "border: 1px solid var(--zb-border) !important;",
        "color: var(--zb-text) !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-creator-page="true"]\n    .CreatorHome\n    div:has(\n      > div:first-child\n        > div:first-child\n        > div:first-child\n        > span\n        > .ZDI--Lightbulb24\n    )\n    > div:nth-child(2)\n    > div,\n  html[data-zb-theme][data-zb-creator-page="true"]\n    .CreatorHome\n    div:has(\n      > div:first-child > div:first-child > div:first-child > span > .ZDI--Fire24\n    )\n    > div:nth-child(2)\n    > div',
      [
        "min-height: 30px !important;",
        "padding: 6px 12px !important;",
        "background-color: var(--zb-surface-raised) !important;",
        "border: 1px solid var(--zb-border) !important;",
      ],
    );
    expect(CREATOR_PAGE_STYLE).not.toContain("div:has(> div:first-child .ZDI--Lightbulb24)");
    expectRule(
      'html[data-zb-theme][data-zb-creator-page="true"]\n    .CreatorHome\n    div:has(> img[alt="reward"])',
      [
        "background-color: var(--zb-surface-raised) !important;",
        "border: 1px solid var(--zb-border) !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-creator-page="true"]\n    [data-goalkeeper-selector="creator-home__announcement"]',
      ["color: var(--zb-text-secondary) !important;"],
    );
  });

  it("keeps associated-account surfaces scoped to their nested route", () => {
    expectRule(
      'html[data-zb-theme][data-zb-creator-page="true"][data-zb-creator-associated-account-page="true"]\n    .Creator-mainColumn\n    > .Card\n    > div',
      ["background-color: var(--zb-surface) !important;", "color: var(--zb-text) !important;"],
    );
    expectRule(
      'html[data-zb-theme][data-zb-creator-page="true"][data-zb-creator-associated-account-page="true"]\n    .Creator-mainColumn\n    > .Card\n    > div\n    > .Tabs\n    + div',
      [
        "background-color: var(--zb-surface-raised) !important;",
        "border: 1px solid var(--zb-border) !important;",
        "border-radius: 8px !important;",
      ],
    );
    expect(CREATOR_PAGE_STYLE).not.toContain(
      '.Card:has(.Tabs a[href="/creator/account/associated-account"])',
    );
    expect(CREATOR_PAGE_STYLE).not.toMatch(/data-zb-creator-page[\s\S]{0,500}\.css-[a-z0-9]+/);
  });
});
