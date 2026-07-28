import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

import { createPageStylesFeature } from "../src/features/page-styles.js";
import { CATPPUCCIN_THEME_STYLE } from "../src/styles/catppuccin-theme.js";
import { CROSS_PAGE_CONTROLS_STYLE } from "../src/styles/components/cross-page-controls.js";
import { COLUMN_PAGE_STYLE } from "../src/styles/pages/column.js";
import { PAGE_STYLE_ENTRIES } from "../src/styles/pages/index.js";
import {
  createRuleExpectation,
  createGroupedRuleExpectation,
  dispatchPageContext,
  expectStyleInjected,
  expectStyleRemoved,
} from "./helpers/style-rules.js";

const expectRule = createRuleExpectation(COLUMN_PAGE_STYLE);
const expectSharedRule = createGroupedRuleExpectation(CROSS_PAGE_CONTROLS_STYLE);

describe("column page theme", () => {
  it("loads the extracted module only on column routes", () => {
    const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
      url: "https://www.zhihu.com/column/example",
    });
    const feature = createPageStylesFeature(page.window, PAGE_STYLE_ENTRIES);

    feature.start();

    expect(CATPPUCCIN_THEME_STYLE).toContain(CROSS_PAGE_CONTROLS_STYLE);
    expect(COLUMN_PAGE_STYLE).not.toContain(".Button:not(.VoteButton):focus-visible");
    expectStyleInjected(page, "zb-column-page-theme-style", COLUMN_PAGE_STYLE);

    page.window.history.pushState({}, "", "/question/123");
    dispatchPageContext(page, { column: false, question: true });
    expectStyleRemoved(page, "zb-column-page-theme-style");

    feature.destroy();
    page.window.close();
  });

  it("themes the column tabs and article cards as connected surfaces", () => {
    expectRule(
      'html[data-zb-theme][data-zb-column-page="true"]\n    .App-main\n    > div\n    > .Card\n    + div\n    > div:last-child',
      [
        "background-color: var(--zb-surface) !important;",
        "border: 1px solid var(--zb-border) !important;",
        "border-radius: 12px 12px 0 0 !important;",
        "box-shadow: var(--zb-shadow) !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-column-page="true"]\n    .App-main\n    > div\n    > .Card\n    + div\n    + div\n    > section\n    > div\n    > div:has(.ContentItem)',
      [
        "background-color: var(--zb-surface) !important;",
        "border: 1px solid var(--zb-border) !important;",
        "border-radius: 12px !important;",
        "margin-bottom: 10px !important;",
      ],
    );
  });

  it("themes column actions and empty states with scoped interaction states", () => {
    expectSharedRule(
      'html[data-zb-theme][data-zb-column-page="true"]\n    .ContentItem-actions\n    .Button:not(.VoteButton):focus-visible',
      [
        "background-color: var(--zb-surface-raised) !important;",
        "color: var(--zb-primary) !important;",
        "box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;",
      ],
    );
    expectSharedRule('html[data-zb-theme][data-zb-column-page="true"] .ContentItem-more', [
      "min-height: 28px !important;",
      "border-radius: 6px !important;",
      "color: var(--zb-primary) !important;",
    ]);
    expectRule('html[data-zb-theme][data-zb-column-page="true"] .Column-EmptyCard', [
      "background-color: var(--zb-surface) !important;",
      "border: 1px solid var(--zb-border) !important;",
      "border-radius: 12px !important;",
      "color: var(--zb-text-muted) !important;",
    ]);
    expect(COLUMN_PAGE_STYLE).not.toContain('[data-zb-column-page="true"] .PlaceHolder-bg');
  });
});
