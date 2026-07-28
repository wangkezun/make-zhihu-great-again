import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

import { createPageStylesFeature } from "../src/features/page-styles.js";
import { CATPPUCCIN_THEME_STYLE } from "../src/styles/catppuccin-theme.js";
import { HOME_PAGE_STYLE } from "../src/styles/pages/home.js";
import { PAGE_STYLE_ENTRIES } from "../src/styles/pages/index.js";
import {
  createRuleExpectation,
  dispatchPageContext,
  expectStyleInjected,
  expectStyleRemoved,
} from "./helpers/style-rules.js";

const expectRule = createRuleExpectation(HOME_PAGE_STYLE);

describe("home page theme", () => {
  it("loads the extracted module only on home-feed routes", () => {
    const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
      url: "https://www.zhihu.com/",
    });
    const feature = createPageStylesFeature(page.window, PAGE_STYLE_ENTRIES);

    feature.start();

    expect(CATPPUCCIN_THEME_STYLE).not.toContain('[data-zb-home-page="true"]');
    expectStyleInjected(page, "zb-home-page-theme-style", HOME_PAGE_STYLE);

    page.window.history.pushState({}, "", "/hot");
    dispatchPageContext(page, { home: false });
    expectStyleRemoved(page, "zb-home-page-theme-style");

    feature.destroy();
    page.window.close();
  });

  it("keeps unscoped follow-feed and sidebar rules in the main theme", () => {
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "html[data-zb-theme] .TopstoryItem.TopstoryItem-isFollow",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".HotSearchCard-itemText");
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-home-sidebar]");
    expect(HOME_PAGE_STYLE).not.toContain("TopstoryItem-isFollow");
    expect(HOME_PAGE_STYLE).not.toContain("HotLanding");
    expect(HOME_PAGE_STYLE).not.toContain("[data-zb-home-sidebar]");
  });

  it("themes home cards, the composer, and article actions", () => {
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .Topstory-mainColumnCard,\n  html[data-zb-theme][data-zb-home-page="true"]\n    .Topstory-mainColumnCard\n    > .Topstory-content',
      [
        "background-color: transparent !important;",
        "border: 0 !important;",
        "box-shadow: none !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .Topstory-mainColumn\n    > .WriteArea',
      [
        "border: 1px solid var(--zb-border) !important;",
        "transition:",
        "box-shadow 0.16s ease !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .Topstory-mainColumn\n    > .WriteArea:hover',
      ["border-color: var(--zb-border-strong) !important;"],
    );
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .Topstory-mainColumn\n    > .WriteArea:focus-within',
      [
        "border-color: var(--zb-primary) !important;",
        "0 0 0 2px var(--zb-primary-soft) !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .Topstory-mainColumn\n    > .WriteArea\n    > div\n    > div:has(> img[src*="/heifetz/assets/"])::after',
      ["border-top-color: var(--zb-border) !important;"],
    );
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .Topstory-recommend\n    > .TopstoryItem',
      [
        "margin-bottom: 10px !important;",
        "border: 1px solid var(--zb-border) !important;",
        "border-radius: 12px !important;",
        "box-shadow: var(--zb-shadow) !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .Topstory-recommend\n    > .TopstoryItem:hover',
      ["border-color: var(--zb-border-strong) !important;"],
    );
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .Topstory-recommend\n    > .TopstoryItem:focus-visible',
      [
        "border-color: var(--zb-primary) !important;",
        "0 0 0 2px var(--zb-primary-soft) !important;",
        "outline: 0 !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .TopstoryItem\n    .ContentItem-title,\n  html[data-zb-theme][data-zb-home-page="true"]\n    .TopstoryItem\n    .ContentItem-title\n    a',
      ["color: var(--zb-primary) !important;", "transition: color 0.16s ease !important;"],
    );
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .TopstoryItem\n    .ContentItem-title:is(:hover, :focus-within),\n  html[data-zb-theme][data-zb-home-page="true"]\n    .TopstoryItem\n    .ContentItem-title\n    a:is(:hover, :focus-visible)',
      ["color: var(--zb-primary-hover) !important;"],
    );
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .TopstoryItem\n    .ContentItem-actions\n    .Button:not(.VoteButton)',
      [
        "min-height: 28px !important;",
        "padding: 4px 6px !important;",
        "border-radius: 6px !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .TopstoryItem\n    .ContentItem-more',
      [
        "min-height: 28px !important;",
        "padding: 3px 8px !important;",
        "color: var(--zb-primary) !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .TopstoryItem\n    .ContentItem-more:is(:hover, :focus-visible)',
      [
        "background-color: var(--zb-primary-soft) !important;",
        "color: var(--zb-primary) !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .TopstoryItem\n    .ContentItem-more:focus-visible',
      ["box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;", "outline: 0 !important;"],
    );
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .TopstoryItem\n    .ContentItem-actions\n    .Button:not(.VoteButton):not(.Button--blue):hover',
      [
        "background-color: var(--zb-surface-raised) !important;",
        "color: var(--zb-text) !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .TopstoryItem\n    .ContentItem-actions\n    .Button:not(.VoteButton):not(.Button--blue):focus-visible',
      [
        "background-color: var(--zb-surface-raised) !important;",
        "color: var(--zb-primary) !important;",
        "box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;",
        "outline: 0 !important;",
      ],
    );
  });

  it("themes favorite and liked states within home cards", () => {
    expect(HOME_PAGE_STYLE).not.toContain(".TopstoryItem:is(:hover, :focus-within)");
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .TopstoryItem\n    .ContentItem-actions\n    .Button[aria-label="收藏"]:is(:hover, :focus-visible)\n    .Zi--Star,\n  html[data-zb-theme][data-zb-home-page="true"]\n    .TopstoryItem\n    .ContentItem-actions\n    .Button[aria-label="已收藏"]\n    .Zi--Star',
      ["color: var(--zb-warning) !important;", "fill: currentColor !important;"],
    );
    expectRule(
      'html[data-zb-theme][data-zb-home-page="true"]\n    .TopstoryItem\n    .ContentItem-actions\n    .Button:is(\n      .Button--red,\n      .is-active,\n      [aria-label="取消喜欢"],\n      [aria-pressed="true"]\n    ):has(\n      :is(.Zi--Heart, .Zi--HeartFill, .ZDI--HeartFill24)\n    )\n    svg',
      ["color: var(--zb-danger) !important;", "fill: currentColor !important;"],
    );
  });
});
