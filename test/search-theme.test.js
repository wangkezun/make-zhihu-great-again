import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

import { PAGE_CONTEXT_CHANGE_EVENT } from "../src/features/page-context.js";
import { createPageStylesFeature } from "../src/features/page-styles.js";
import { CATPPUCCIN_THEME_STYLE } from "../src/styles/catppuccin-theme.js";
import { AI_SEARCH_PAGE_STYLE } from "../src/styles/pages/ai-search.js";
import { PAGE_STYLE_ENTRIES } from "../src/styles/pages/index.js";
import { SEARCH_PAGE_STYLE } from "../src/styles/pages/search.js";

const expectRule = (selector, declarations) => {
  const ruleStart = SEARCH_PAGE_STYLE.indexOf(`${selector} {`);
  expect(ruleStart, `missing selector: ${selector}`).toBeGreaterThanOrEqual(0);

  const ruleEnd = SEARCH_PAGE_STYLE.indexOf("\n  }", ruleStart);
  expect(ruleEnd, `unterminated rule: ${selector}`).toBeGreaterThan(ruleStart);
  const rule = SEARCH_PAGE_STYLE.slice(ruleStart, ruleEnd);

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

describe("search page theme", () => {
  it("loads only the common search style on ordinary search routes", () => {
    const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
      url: "https://www.zhihu.com/search?q=test&type=content",
    });
    const feature = createPageStylesFeature(page.window, PAGE_STYLE_ENTRIES);

    feature.start();

    expect(CATPPUCCIN_THEME_STYLE).not.toContain(".SearchTabs");
    expect(page.window.document.getElementById("zb-search-page-theme-style")?.textContent).toBe(
      SEARCH_PAGE_STYLE,
    );
    expect(page.window.document.getElementById("zb-ai-search-page-theme-style")).toBeNull();

    dispatchPageContext(page, { aiSearch: false, home: true, search: false });
    expect(page.window.document.getElementById("zb-search-page-theme-style")).toBeNull();

    feature.destroy();
    page.window.close();
  });

  it("combines common and AI styles on zhida search without replacing either", () => {
    const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
      url: "https://www.zhihu.com/search?q=test&type=zhida",
    });
    const feature = createPageStylesFeature(page.window, PAGE_STYLE_ENTRIES);

    feature.start();

    expect(page.window.document.getElementById("zb-search-page-theme-style")?.textContent).toBe(
      SEARCH_PAGE_STYLE,
    );
    expect(page.window.document.getElementById("zb-ai-search-page-theme-style")?.textContent).toBe(
      AI_SEARCH_PAGE_STYLE,
    );
    expect(
      [...page.window.document.querySelectorAll('style[id$="-page-theme-style"]')].map(
        (style) => style.id,
      ),
    ).toEqual(
      expect.arrayContaining(["zb-search-page-theme-style", "zb-ai-search-page-theme-style"]),
    );
    expect(
      page.window.document
        .getElementById("zb-search-page-theme-style")
        ?.compareDocumentPosition(
          page.window.document.getElementById("zb-ai-search-page-theme-style"),
        ) & page.window.Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    dispatchPageContext(page, { aiSearch: false, search: true });
    expect(page.window.document.getElementById("zb-search-page-theme-style")).not.toBeNull();
    expect(page.window.document.getElementById("zb-ai-search-page-theme-style")).toBeNull();

    dispatchPageContext(page, { aiSearch: false, home: true, search: false });
    expect(page.window.document.getElementById("zb-search-page-theme-style")).toBeNull();

    feature.destroy();
    page.window.close();
  });

  it("themes search tabs and keyboard focus states", () => {
    expectRule("html[data-zb-theme] .SearchTabs", [
      "background-color: var(--zb-surface) !important;",
      "border-bottom: 1px solid var(--zb-border) !important;",
      "box-shadow: var(--zb-shadow) !important;",
    ]);
    expectRule("html[data-zb-theme] .SearchTabs .Tabs-link:focus-visible", [
      "border-radius: 6px !important;",
      "color: var(--zb-primary) !important;",
      "box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;",
    ]);
  });

  it("themes result and subtab cards with scoped interaction states", () => {
    expectRule(
      "html[data-zb-theme] .SearchMain .SearchResult-Card,\n  html[data-zb-theme] .SearchMain .List > .Card:has(> .PlaceHolder)",
      [
        "background-color: var(--zb-surface) !important;",
        "border: 1px solid var(--zb-border) !important;",
        "border-radius: 12px !important;",
        "box-shadow: var(--zb-shadow) !important;",
      ],
    );
    expectRule("html[data-zb-theme] .SearchMain .SearchResult-Card:focus-within", [
      "border-color: var(--zb-primary) !important;",
      "0 0 0 2px var(--zb-primary-soft),",
      "var(--zb-shadow) !important;",
    ]);
    expectRule("html[data-zb-theme] .SearchMain .SearchSubTabs", [
      "min-height: 58px !important;",
      "background-color: var(--zb-surface) !important;",
      "border: 1px solid var(--zb-border) !important;",
      "border-radius: 12px !important;",
    ]);
  });

  it("themes hot-search sidebar cards and footer links", () => {
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "html[data-zb-theme] :is(.Card, .HotSearchCard) {\n    box-sizing: border-box !important;\n    border: 1px solid var(--zb-border) !important;\n    border-radius: 12px !important;",
    );
    expectRule("html[data-zb-theme] .Search-container .HotSearchCard-item:focus-within", [
      "background-color: var(--zb-surface-raised) !important;",
      "box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;",
    ]);
    expectRule(
      'html[data-zb-theme]\n    .Search-container\n    footer[role="contentinfo"]\n    :is(a, button):is(:hover, :focus-visible)',
      ["color: var(--zb-primary) !important;"],
    );
  });
});
