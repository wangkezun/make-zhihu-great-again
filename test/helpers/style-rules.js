import { expect } from "vitest";

import { PAGE_CONTEXT_CHANGE_EVENT } from "../../src/features/page-context.js";

export const createRuleExpectation = (styleText) => (selector, declarations) => {
  const ruleStart = styleText.indexOf(`${selector} {`);
  expect(ruleStart, `missing selector: ${selector}`).toBeGreaterThanOrEqual(0);

  const ruleEnd = styleText.indexOf("\n  }", ruleStart);
  expect(ruleEnd, `unterminated rule: ${selector}`).toBeGreaterThan(ruleStart);
  const rule = styleText.slice(ruleStart, ruleEnd);

  declarations.forEach((declaration) => {
    expect(rule).toContain(declaration);
  });
};

export const expectStyleInjected = (page, styleId, styleText) => {
  expect(page.window.document.getElementById(styleId)?.textContent).toBe(styleText);
};

export const expectStyleRemoved = (page, styleId) => {
  expect(page.window.document.getElementById(styleId)).toBeNull();
};

export const dispatchPageContext = (page, detail) => {
  page.window.dispatchEvent(
    new page.window.CustomEvent(PAGE_CONTEXT_CHANGE_EVENT, {
      detail,
    }),
  );
};
