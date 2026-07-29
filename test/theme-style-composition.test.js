import { describe, expect, it } from "vitest";

import { CATPPUCCIN_THEME_STYLE } from "../src/styles/catppuccin-theme.js";
import { APP_HEADER_COMPONENT_STYLE } from "../src/styles/components/app-header.js";
import {
  CORNER_BUTTON_COMPONENT_STYLE,
  PRIMARY_BUTTON_COMPONENT_STYLE,
  VOTE_BUTTON_COMPONENT_STYLE,
} from "../src/styles/components/base-buttons.js";
import {
  BASE_SURFACES_COMPONENT_STYLE,
  SECONDARY_SURFACES_COMPONENT_STYLE,
} from "../src/styles/components/base-surfaces.js";
import { COMMENTS_COMPONENT_STYLE } from "../src/styles/components/comments.js";
import { EDITOR_FOUNDATION_COMPONENT_STYLE } from "../src/styles/components/editor-foundation.js";
import { FORM_CONTROLS_COMPONENT_STYLE } from "../src/styles/components/form-controls.js";
import { OVERLAYS_COMPONENT_STYLE } from "../src/styles/components/overlays.js";
import { PIN_DETAIL_COMPONENT_STYLE } from "../src/styles/components/pin-detail.js";
import { QUESTION_CONTENT_COMPONENT_STYLE } from "../src/styles/components/question-content.js";
import { THEME_FOUNDATION_STYLE } from "../src/styles/components/theme-foundation.js";

const expectIncludedOnce = (styleText) => {
  expect(CATPPUCCIN_THEME_STYLE.split(styleText)).toHaveLength(2);
};

describe("Catppuccin theme style composition", () => {
  it.each([
    THEME_FOUNDATION_STYLE,
    APP_HEADER_COMPONENT_STYLE,
    FORM_CONTROLS_COMPONENT_STYLE,
    BASE_SURFACES_COMPONENT_STYLE,
    PRIMARY_BUTTON_COMPONENT_STYLE,
    CORNER_BUTTON_COMPONENT_STYLE,
    VOTE_BUTTON_COMPONENT_STYLE,
    SECONDARY_SURFACES_COMPONENT_STYLE,
  ])("includes each base component once", expectIncludedOnce);

  it("preserves the component order that controls the global cascade", () => {
    const componentOrder = [
      THEME_FOUNDATION_STYLE,
      APP_HEADER_COMPONENT_STYLE,
      FORM_CONTROLS_COMPONENT_STYLE,
      EDITOR_FOUNDATION_COMPONENT_STYLE,
      BASE_SURFACES_COMPONENT_STYLE,
      OVERLAYS_COMPONENT_STYLE,
      PRIMARY_BUTTON_COMPONENT_STYLE,
      QUESTION_CONTENT_COMPONENT_STYLE,
      CORNER_BUTTON_COMPONENT_STYLE,
      COMMENTS_COMPONENT_STYLE,
      VOTE_BUTTON_COMPONENT_STYLE,
      PIN_DETAIL_COMPONENT_STYLE,
      SECONDARY_SURFACES_COMPONENT_STYLE,
    ].map((styleText) => CATPPUCCIN_THEME_STYLE.indexOf(styleText));

    expect(componentOrder.every((index) => index >= 0)).toBe(true);
    expect(componentOrder).toEqual([...componentOrder].sort((left, right) => left - right));
  });
});
