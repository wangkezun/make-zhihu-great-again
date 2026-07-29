import { FLAVOR_NAMES, PALETTE_HEX } from "./catppuccin-palette.js";
import { APP_HEADER_COMPONENT_STYLE } from "./components/app-header.js";
import {
  CORNER_BUTTON_COMPONENT_STYLE,
  PRIMARY_BUTTON_COMPONENT_STYLE,
  VOTE_BUTTON_COMPONENT_STYLE,
} from "./components/base-buttons.js";
import {
  BASE_SURFACES_COMPONENT_STYLE,
  SECONDARY_SURFACES_COMPONENT_STYLE,
} from "./components/base-surfaces.js";
import { COMMENTS_COMPONENT_STYLE } from "./components/comments.js";
import { CONTENT_MENUS_COMPONENT_STYLE } from "./components/content-menus.js";
import { CROSS_PAGE_CONTROLS_STYLE } from "./components/cross-page-controls.js";
import { CROSS_PAGE_SURFACES_STYLE } from "./components/cross-page-surfaces.js";
import { DISCOVERY_COMPONENT_STYLE } from "./components/discovery.js";
import { EDITOR_FOUNDATION_COMPONENT_STYLE } from "./components/editor-foundation.js";
import { FOLLOWING_FEED_COMPONENT_STYLE } from "./components/following-feed.js";
import { FORM_CONTROLS_COMPONENT_STYLE } from "./components/form-controls.js";
import { HOME_SIDEBAR_COMPONENT_STYLE } from "./components/home-sidebar.js";
import { LOADING_FEEDBACK_COMPONENT_STYLE } from "./components/loading-feedback.js";
import { OVERLAYS_COMPONENT_STYLE } from "./components/overlays.js";
import { PIN_DETAIL_COMPONENT_STYLE } from "./components/pin-detail.js";
import { QUESTION_CONTENT_COMPONENT_STYLE } from "./components/question-content.js";
import { QUESTION_EDITOR_COMPONENT_STYLE } from "./components/question-editor.js";
import { THEME_FOUNDATION_STYLE } from "./components/theme-foundation.js";

const paletteVariables = Object.fromEntries(
  Object.entries(PALETTE_HEX).map(([flavor, colors]) => [
    flavor,
    colors
      .split(",")
      .map((color) => color.split(":"))
      .map(([name, hex]) => `    --ctp-${name}: ${hex};`)
      .join("\n"),
  ]),
);

const createPaletteVariables = (name) => paletteVariables[name];

const createFlavorRule = (name) => `
  html[data-zb-theme="${name}"] {
${createPaletteVariables(name)}
    color-scheme: ${name === "latte" ? "light" : "dark"};
  }`;

const flavorRules = FLAVOR_NAMES.map(createFlavorRule).join("\n");

export const CATPPUCCIN_THEME_STYLE = `
${flavorRules}

  html[data-zb-theme="system"] {
${createPaletteVariables("latte")}
    color-scheme: light;
  }

  @media (prefers-color-scheme: dark) {
    html[data-zb-theme="system"] {
${createPaletteVariables("mocha")}
      color-scheme: dark;
    }
  }

${THEME_FOUNDATION_STYLE}
${APP_HEADER_COMPONENT_STYLE}
${FORM_CONTROLS_COMPONENT_STYLE}
${EDITOR_FOUNDATION_COMPONENT_STYLE}
${BASE_SURFACES_COMPONENT_STYLE}
${OVERLAYS_COMPONENT_STYLE}
${PRIMARY_BUTTON_COMPONENT_STYLE}
  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[viewBox="0 0 26 10"]):has(
      div[style*="cursor: default"]
    )
    div[style*="cursor: default"]
    + div,
  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[viewBox="0 0 26 10"]):has(
      div[style*="cursor: default"]
    )
    div[style*="cursor: default"]
    + div
    * {
    color: var(--zb-text-secondary) !important;
    font-weight: 400 !important;
  }

${QUESTION_CONTENT_COMPONENT_STYLE}
${CROSS_PAGE_CONTROLS_STYLE}
${CORNER_BUTTON_COMPONENT_STYLE}
${COMMENTS_COMPONENT_STYLE}
${QUESTION_EDITOR_COMPONENT_STYLE}
${CONTENT_MENUS_COMPONENT_STYLE}
${DISCOVERY_COMPONENT_STYLE}
${FOLLOWING_FEED_COMPONENT_STYLE}
${VOTE_BUTTON_COMPONENT_STYLE}
${PIN_DETAIL_COMPONENT_STYLE}
${SECONDARY_SURFACES_COMPONENT_STYLE}
${HOME_SIDEBAR_COMPONENT_STYLE}
${LOADING_FEEDBACK_COMPONENT_STYLE}
${CROSS_PAGE_SURFACES_STYLE}
`;
