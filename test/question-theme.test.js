import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

import { PAGE_CONTEXT_CHANGE_EVENT } from "../src/features/page-context.js";
import { createPageStylesFeature } from "../src/features/page-styles.js";
import { CATPPUCCIN_THEME_STYLE } from "../src/styles/catppuccin-theme.js";
import { PAGE_STYLE_ENTRIES } from "../src/styles/pages/index.js";
import { QUESTION_PAGE_STYLE } from "../src/styles/pages/question.js";

const expectRule = (selector, declarations) => {
  const ruleStart = QUESTION_PAGE_STYLE.indexOf(`${selector} {`);
  expect(ruleStart, `missing selector: ${selector}`).toBeGreaterThanOrEqual(0);

  const ruleEnd = QUESTION_PAGE_STYLE.indexOf("\n  }", ruleStart);
  expect(ruleEnd, `unterminated rule: ${selector}`).toBeGreaterThan(ruleStart);
  const rule = QUESTION_PAGE_STYLE.slice(ruleStart, ruleEnd);

  declarations.forEach((declaration) => {
    expect(rule).toContain(declaration);
  });
};

describe("question page theme", () => {
  it("loads only on question routes and unloads after SPA navigation", () => {
    const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
      url: "https://www.zhihu.com/question/643718271",
    });
    const feature = createPageStylesFeature(page.window, PAGE_STYLE_ENTRIES);

    feature.start();

    expect(page.window.document.getElementById("zb-question-page-theme-style")?.textContent).toBe(
      QUESTION_PAGE_STYLE,
    );

    page.window.history.pushState({}, "", "/topic/19559593/hot");
    page.window.dispatchEvent(
      new page.window.CustomEvent(PAGE_CONTEXT_CHANGE_EVENT, {
        detail: { question: false, topic: true },
      }),
    );

    expect(page.window.document.getElementById("zb-question-page-theme-style")).toBeNull();

    feature.destroy();
    page.window.close();
  });

  it("keeps extracted question rules out of the always-loaded theme", () => {
    expect(CATPPUCCIN_THEME_STYLE).not.toContain('[data-zb-question-page="true"]');
    expect(CATPPUCCIN_THEME_STYLE).not.toContain(QUESTION_PAGE_STYLE);
  });

  it("themes the question header and semantic content", () => {
    expectRule(
      "  html[data-zb-theme] .QuestionHeader,\n" +
        "  html[data-zb-theme] .QuestionHeader-content,\n" +
        "  html[data-zb-theme] .QuestionHeader-main,\n" +
        "  html[data-zb-theme] .QuestionHeader-side,\n" +
        "  html[data-zb-theme] .QuestionHeader-footer,\n" +
        "  html[data-zb-theme] .QuestionHeader-footer-inner,\n" +
        "  html[data-zb-theme] .QuestionHeader-footer-main",
      [
        "background-color: var(--zb-surface) !important;",
        "border-color: var(--zb-border) !important;",
        "color: var(--zb-text) !important;",
      ],
    );
    expectRule(
      '  html[data-zb-theme]\n    .QuestionHeader-main\n    > a[aria-label^="话题 "][href*="/topic/"]',
      [
        "background-color: var(--zb-surface-raised) !important;",
        "border-color: var(--zb-border-strong) !important;",
        "border-radius: 10px !important;",
      ],
    );
    expectRule("  html[data-zb-theme] .QuestionPage .RichText a.LinkCard", [
      "background-color: var(--zb-surface-raised) !important;",
      "border: 1px solid var(--zb-border) !important;",
      "border-radius: 10px !important;",
    ]);
    expectRule("  html[data-zb-theme] .QuestionPage img.Avatar", [
      "background-color: var(--zb-surface-raised) !important;",
      "border-color: var(--zb-border) !important;",
    ]);
  });

  it("themes question status and invitation overlays within the page scope", () => {
    expectRule(
      '  html[data-zb-theme][data-zb-question-page="true"]\n' +
        "    .QuestionStatus-notification-actions\n" +
        "    .Button",
      [
        "background-color: transparent !important;",
        "border-radius: 6px !important;",
        "color: var(--zb-text-muted) !important;",
      ],
    );
    expectRule('  html[data-zb-theme][data-zb-question-page="true"] .QuestionInvitation', [
      "background-color: var(--zb-surface) !important;",
      "color: var(--zb-text) !important;",
      "overflow: hidden !important;",
    ]);
    expectRule(
      '  html[data-zb-theme][data-zb-question-page="true"]\n' + "    .QuestionInvitation-input",
      [
        "background-color: var(--zb-surface-raised) !important;",
        "border-color: var(--zb-border-strong) !important;",
        "color: var(--zb-text) !important;",
      ],
    );
    expectRule(
      '  html[data-zb-theme][data-zb-question-page="true"]\n' +
        "    .QuestionInvitation-content\n" +
        "    > .List\n" +
        "    > .List-item",
      [
        "width: calc(100% - 24px) !important;",
        "background-color: transparent !important;",
        "border-radius: 8px !important;",
      ],
    );
  });
});
