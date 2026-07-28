import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

import { createPageStylesFeature } from "../src/features/page-styles.js";
import { CATPPUCCIN_THEME_STYLE } from "../src/styles/catppuccin-theme.js";
import { CROSS_PAGE_CONTROLS_STYLE } from "../src/styles/components/cross-page-controls.js";
import { PAGE_STYLE_ENTRIES } from "../src/styles/pages/index.js";
import { PROFILE_PAGE_STYLE } from "../src/styles/pages/profile.js";
import {
  createRuleExpectation,
  createGroupedRuleExpectation,
  dispatchPageContext,
  expectStyleInjected,
  expectStyleRemoved,
} from "./helpers/style-rules.js";

const expectRule = createRuleExpectation(PROFILE_PAGE_STYLE);
const expectSharedRule = createGroupedRuleExpectation(CROSS_PAGE_CONTROLS_STYLE);

describe("profile page theme", () => {
  it("loads the extracted module only on profile routes", () => {
    const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
      url: "https://www.zhihu.com/people/example",
    });
    const feature = createPageStylesFeature(page.window, PAGE_STYLE_ENTRIES);

    feature.start();

    expect(CATPPUCCIN_THEME_STYLE).toContain(CROSS_PAGE_CONTROLS_STYLE);
    expect(PROFILE_PAGE_STYLE).not.toContain(".Button:not(.VoteButton):hover");
    expectStyleInjected(page, "zb-profile-page-theme-style", PROFILE_PAGE_STYLE);

    page.window.history.pushState({}, "", "/question/123");
    dispatchPageContext(page, { profile: false, question: true });
    expectStyleRemoved(page, "zb-profile-page-theme-style");

    dispatchPageContext(page, { profile: true, question: false });
    expectStyleInjected(page, "zb-profile-page-theme-style", PROFILE_PAGE_STYLE);

    feature.destroy();
    expectStyleRemoved(page, "zb-profile-page-theme-style");
    page.window.close();
  });

  it("themes the profile header and tabs as connected surfaces", () => {
    expectRule('html[data-zb-theme][data-zb-profile-page="true"] .ProfileHeader > .Card', [
      "border: 1px solid var(--zb-border) !important;",
      "border-radius: 12px !important;",
      "box-shadow: var(--zb-shadow) !important;",
    ]);
    expectRule(
      'html[data-zb-theme][data-zb-profile-page="true"]\n    .ProfileHeader\n    :is(.ProfileHeader-name, .ProfileHeader-detailValue)',
      ["color: var(--zb-text) !important;", "-webkit-text-fill-color: var(--zb-text) !important;"],
    );
    expectRule(
      'html[data-zb-theme][data-zb-profile-page="true"]\n    .ProfileMain-tabs\n    .Tabs-link.is-active',
      ["color: var(--zb-primary) !important;", "font-weight: 600 !important;"],
    );
    expectRule(
      'html[data-zb-theme][data-zb-profile-page="true"]\n    .ProfileMain-tabs\n    .Tabs-link:focus-visible',
      [
        "border-radius: 6px !important;",
        "box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;",
      ],
    );
  });

  it("themes activity lists and scoped action states", () => {
    expectRule(
      'html[data-zb-theme][data-zb-profile-page="true"]\n    .ProfileMain\n    :is(.List-header, .List-item)::after',
      [
        "background-color: var(--zb-border) !important;",
        "border-color: var(--zb-border) !important;",
      ],
    );
    expectSharedRule(
      'html[data-zb-theme][data-zb-profile-page="true"]\n    .ProfileMain\n    .ContentItem-actions\n    .Button:not(.VoteButton)',
      [
        "background-color: transparent !important;",
        "color: var(--zb-text-muted) !important;",
        "transition:",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-profile-page="true"]\n    .ProfileMain\n    .ContentItem-actions\n    .VoteButton:disabled',
      [
        "background-color: var(--zb-surface-raised) !important;",
        "color: var(--zb-text-subtle) !important;",
        "cursor: not-allowed !important;",
      ],
    );
  });

  it("themes sidebar cards, values, and keyboard interaction states", () => {
    expectRule(
      'html[data-zb-theme][data-zb-profile-page="true"] .Profile-sideColumn .Card,\n  html[data-zb-theme][data-zb-profile-page="true"] .Profile-sideColumn .Profile-lightList',
      [
        "background-color: var(--zb-surface) !important;",
        "border: 1px solid var(--zb-border) !important;",
        "border-radius: 12px !important;",
        "box-shadow: var(--zb-shadow) !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-profile-page="true"]\n    .Profile-sideColumn\n    :is(\n      .Profile-sideColumnTitle,\n      .Profile-sideColumnItemValue,\n      .Profile-lightItemValue,\n      .NumberBoard-itemValue,\n      .ProfileSideCreator-readCountNumber\n    )',
      ["color: var(--zb-text) !important;", "-webkit-text-fill-color: var(--zb-text) !important;"],
    );
    expectRule(
      'html[data-zb-theme][data-zb-profile-page="true"]\n    .Profile-sideColumn\n    :is(.NumberBoard-item.Button, .Profile-lightItem):focus-visible',
      [
        "border-radius: 6px !important;",
        "box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;",
      ],
    );
  });
});
