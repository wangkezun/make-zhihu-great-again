import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

import { createPageStylesFeature } from "../src/features/page-styles.js";
import { CATPPUCCIN_THEME_STYLE } from "../src/styles/catppuccin-theme.js";
import { AI_SEARCH_PAGE_STYLE } from "../src/styles/pages/ai-search.js";
import { PAGE_STYLE_ENTRIES } from "../src/styles/pages/index.js";
import {
  createRuleExpectation,
  dispatchPageContext,
  expectStyleInjected,
  expectStyleRemoved,
} from "./helpers/style-rules.js";

const expectRule = createRuleExpectation(AI_SEARCH_PAGE_STYLE);

describe("AI search page theme", () => {
  it("loads only on AI search routes and unloads after SPA navigation", () => {
    const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
      url: "https://www.zhihu.com/search?q=catppuccin&type=zhida",
    });
    const feature = createPageStylesFeature(page.window, PAGE_STYLE_ENTRIES);

    feature.start();

    expectStyleInjected(page, "zb-ai-search-page-theme-style", AI_SEARCH_PAGE_STYLE);
    expectStyleRemoved(page, "zb-paper-page-theme-style");

    page.window.history.pushState({}, "", "/search?q=catppuccin&type=content");
    dispatchPageContext(page, { aiSearch: false });

    expectStyleRemoved(page, "zb-ai-search-page-theme-style");

    page.window.history.pushState({}, "", "/search?q=catppuccin&type=zhida");
    dispatchPageContext(page, { aiSearch: true });
    expectStyleInjected(page, "zb-ai-search-page-theme-style", AI_SEARCH_PAGE_STYLE);

    feature.destroy();
    page.window.close();
  });

  it("keeps AI search rules out of the always-loaded theme", () => {
    expect(CATPPUCCIN_THEME_STYLE).not.toContain('[data-zb-ai-search-page="true"]');
    expect(CATPPUCCIN_THEME_STYLE).not.toContain('[data-testid="Block:thinking_blcok"]');
    expect(CATPPUCCIN_THEME_STYLE).not.toContain(AI_SEARCH_PAGE_STYLE);
  });

  it("themes the AI answer shell and thinking controls", () => {
    expectRule(
      '  html[data-zb-theme]\n    .SearchMain:has(\n      :is(\n        [data-testid="Block:thinking_blcok"],\n        [data-testid="Block:zhida_answer_result_block"]\n      )\n    )\n    > div,\n  html[data-zb-theme]\n    .SearchMain:has(\n      :is(\n        [data-testid="Block:thinking_blcok"],\n        [data-testid="Block:zhida_answer_result_block"]\n      )\n    )\n    > div\n    > div',
      ["background-color: var(--zb-surface) !important;", "color: var(--zb-text) !important;"],
    );
    expectRule(
      '  html[data-zb-theme][data-zb-ai-search-page="true"]\n    .SearchMain\n    [data-testid="Block:thinking_blcok"]\n    > div',
      [
        "background-color: var(--zb-surface-raised) !important;",
        "border: 1px solid var(--zb-border) !important;",
        "border-radius: 8px !important;",
      ],
    );
    expectRule(
      '  html[data-zb-theme][data-zb-ai-search-page="true"]\n    .SearchMain\n    :is(\n      [data-testid="Button:thinking_node"],\n      [data-testid="Button:reference_card_block_more_btn"]\n    ):is(:hover, :focus-visible)',
      [
        "background-color: var(--zb-primary-soft) !important;",
        "color: var(--zb-primary) !important;",
        "box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;",
      ],
    );
  });

  it("themes AI source panels, discovery cards and the input box", () => {
    expectRule('  html[data-zb-theme][data-zb-ai-search-page="true"] [data-zb-ai-source-panel]', [
      "background-color: var(--zb-surface) !important;",
      "border: 1px solid var(--zb-border-strong) !important;",
      "box-shadow: var(--zb-shadow) !important;",
    ]);
    expectRule(
      '  html[data-zb-theme][data-zb-ai-search-page="true"]\n    .SearchMain\n    [data-testid^="Button:ai_search_content_discovery_navigation_tab:"]\n    > div',
      [
        "background-color: var(--zb-surface-raised) !important;",
        "border: 1px solid var(--zb-border) !important;",
        "color: var(--zb-text-secondary) !important;",
      ],
    );
    expectRule(
      '  html[data-zb-theme][data-zb-ai-search-page="true"]\n    .SearchMain\n    [data-testid="Card:OpenUrl:ai_search_content_card"]',
      [
        "background-color: var(--zb-surface-raised) !important;",
        "border-radius: 8px !important;",
        "overflow: hidden !important;",
      ],
    );
    expectRule(
      '  html[data-zb-theme][data-zb-ai-search-page="true"]\n    .SearchMain\n    [data-testid="Button:ai_search_input_field_button"]:is(:hover, :focus-visible)\n    > div',
      [
        "background-color: var(--zb-primary-soft) !important;",
        "border-color: var(--zb-primary) !important;",
        "box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;",
      ],
    );
  });
});
