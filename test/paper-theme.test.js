import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

import { createPageStylesFeature } from "../src/features/page-styles.js";
import { CATPPUCCIN_THEME_STYLE } from "../src/styles/catppuccin-theme.js";
import { PAGE_STYLE_ENTRIES } from "../src/styles/pages/index.js";
import { PAPER_PAGE_STYLE } from "../src/styles/pages/paper.js";
import {
  createRuleExpectation,
  dispatchPageContext,
  expectStyleInjected,
  expectStyleRemoved,
} from "./helpers/style-rules.js";

const expectRule = createRuleExpectation(PAPER_PAGE_STYLE);

describe("paper page theme", () => {
  it("loads the extracted module only on paper routes", () => {
    const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
      url: "https://www.zhihu.com/kvip/sku/paper/123",
    });
    const feature = createPageStylesFeature(page.window, PAGE_STYLE_ENTRIES);

    feature.start();

    expect(CATPPUCCIN_THEME_STYLE).not.toContain(PAPER_PAGE_STYLE);
    expectStyleInjected(page, "zb-paper-page-theme-style", PAPER_PAGE_STYLE);

    page.window.history.pushState({}, "", "/question/123");
    dispatchPageContext(page, { paper: false, paperPreview: false, question: true });
    expectStyleRemoved(page, "zb-paper-page-theme-style");

    feature.destroy();
    page.window.close();
  });

  it("themes paper detail content and its fixed purchase actions", () => {
    expectRule(
      'html[data-zb-theme][data-zb-paper-page="true"],\n  html[data-zb-theme][data-zb-paper-page="true"] body,\n  html[data-zb-theme][data-zb-paper-page="true"] body > div:first-child',
      ["background-color: var(--zb-page) !important;", "color: var(--zb-text) !important;"],
    );
    expectRule(
      'html[data-zb-theme][data-zb-paper-page="true"]\n    body\n    div:has(> section + section)\n    > div:first-child',
      [
        "background-color: var(--zb-surface-raised) !important;",
        "background-image: none !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-paper-page="true"]\n    body\n    div:has(> section + section)\n    > section:nth-of-type(3)',
      ["color: var(--zb-text-secondary) !important;"],
    );
    expectRule(
      'html[data-zb-theme][data-zb-paper-page="true"]\n    body\n    div:has(> section + section)\n    > div:has(> button .ZDI--BookOpen24):has(> button + button + button)\n    > button:last-child',
      [
        "background-color: var(--zb-primary) !important;",
        "border: 1px solid var(--zb-primary) !important;",
        "color: var(--ctp-crust) !important;",
      ],
    );
  });

  it("themes the paper preview shell without recoloring PDF pages", () => {
    expectRule(
      'html[data-zb-theme][data-zb-paper-preview-page="true"],\n  html[data-zb-theme][data-zb-paper-preview-page="true"] body,\n  html[data-zb-theme][data-zb-paper-preview-page="true"] #app',
      ["background-color: var(--zb-page) !important;", "color: var(--zb-text) !important;"],
    );
    expectRule(
      'html[data-zb-theme][data-zb-paper-preview-page="true"]\n    [class^="ShelfTopNav-module-root_"]',
      [
        "background-color: var(--zb-surface) !important;",
        "border-bottom: 1px solid var(--zb-border) !important;",
      ],
    );
    expectRule(
      'html[data-zb-theme][data-zb-paper-preview-page="true"]\n    #app\n    > div:has(input[size="1"])\n    input:focus-visible',
      [
        "border-color: var(--zb-primary) !important;",
        "box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;",
        "outline: 0 !important;",
      ],
    );
    expectRule('html[data-zb-theme][data-zb-paper-preview-page="true"] .pdfViewer .page', [
      "background-color: #fff !important;",
    ]);
  });
});
