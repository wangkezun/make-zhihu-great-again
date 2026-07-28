import { FLAVOR_NAMES, PALETTE_HEX } from "./catppuccin-palette.js";
import { COMMENTS_COMPONENT_STYLE } from "./components/comments.js";
import { CONTENT_MENUS_COMPONENT_STYLE } from "./components/content-menus.js";
import { CROSS_PAGE_CONTROLS_STYLE } from "./components/cross-page-controls.js";
import { CROSS_PAGE_SURFACES_STYLE } from "./components/cross-page-surfaces.js";
import { DISCOVERY_COMPONENT_STYLE } from "./components/discovery.js";
import { EDITOR_FOUNDATION_COMPONENT_STYLE } from "./components/editor-foundation.js";
import { FOLLOWING_FEED_COMPONENT_STYLE } from "./components/following-feed.js";
import { HOME_SIDEBAR_COMPONENT_STYLE } from "./components/home-sidebar.js";
import { LOADING_FEEDBACK_COMPONENT_STYLE } from "./components/loading-feedback.js";
import { OVERLAYS_COMPONENT_STYLE } from "./components/overlays.js";
import { PIN_DETAIL_COMPONENT_STYLE } from "./components/pin-detail.js";
import { QUESTION_CONTENT_COMPONENT_STYLE } from "./components/question-content.js";
import { QUESTION_EDITOR_COMPONENT_STYLE } from "./components/question-editor.js";
import {
  CURRENT_COLOR_ICON_STYLE,
  PRIMARY_BUTTON_HOVER_STYLE,
  PRIMARY_BUTTON_STYLE,
  RAISED_TEXT_STYLE,
  SURFACE_TEXT_ONLY_STYLE,
  SURFACE_TEXT_STYLE,
} from "./shared-components.js";

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

  html[data-zb-theme] {
    --zb-page: var(--ctp-mantle);
    --zb-surface: var(--ctp-base);
    --zb-surface-raised: var(--ctp-surface0);
    --zb-surface-hover: var(--ctp-surface1);
    --zb-border: var(--ctp-surface0);
    --zb-border-strong: var(--ctp-surface1);
    --zb-text: var(--ctp-text);
    --zb-text-secondary: var(--ctp-subtext1);
    --zb-text-muted: var(--ctp-subtext0);
    --zb-text-subtle: var(--ctp-overlay0);
    --zb-primary: var(--ctp-blue);
    --zb-primary-hover: var(--ctp-sapphire);
    --zb-primary-soft: color-mix(in srgb, var(--ctp-blue) 16%, transparent);
    --zb-danger: var(--ctp-red);
    --zb-danger-soft: color-mix(in srgb, var(--ctp-red) 14%, transparent);
    --zb-success: var(--ctp-green);
    --zb-warning: var(--ctp-peach);
    --zb-shadow: 0 1px 3px color-mix(in srgb, var(--ctp-crust) 28%, transparent);
    background: var(--zb-page) !important;
    scrollbar-color: var(--ctp-overlay0) var(--zb-page);
  }

  html[data-zb-theme] body,
  html[data-zb-theme] #root,
  html[data-zb-theme] .App-main,
  html[data-zb-theme] .Topstory-body {
    background-color: var(--zb-page) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] ::selection {
    background: var(--ctp-lavender) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme] :focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .AppHeader,
  html[data-zb-theme] .AppHeader-inner,
  html[data-zb-theme] .Sticky.is-fixed {${SURFACE_TEXT_ONLY_STYLE}
    border-color: var(--zb-border) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .AppHeader a,
  html[data-zb-theme] .AppHeader button,
  html[data-zb-theme] .AppHeader svg,
  html[data-zb-theme] .AppHeader-Tabs a {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .AppHeader a:hover,
  html[data-zb-theme] .AppHeader button:hover,
  html[data-zb-theme] .AppHeader-Tab--active a,
  html[data-zb-theme] .AppHeader-Tabs a[aria-current="page"] {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .AppHeader
    .SearchBar-searchButton
    .SearchBar-searchIcon {
    color: var(--zb-text-muted) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .AppHeader
    .SearchBar-searchButton
    .SearchBar-searchIcon.isFocus {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .AppHeader
    .SearchBar-input--focus
    .SearchBar-searchButton {
    background-color: transparent !important;
    border-color: transparent !important;
  }

  html[data-zb-theme]
    .AppHeader
    .SearchBar-askDropdownButton
    .ZDI--PlusFill24 {
    color: var(--ctp-crust) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .SearchBar-menu .Menu-item:hover,
  html[data-zb-theme] .SearchBar-menu .Menu-item.is-active,
  html[data-zb-theme] .SearchBar-menu .Menu-item:focus,
  html[data-zb-theme] .SearchBar-menu .Menu-item:focus-within {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme] .SearchBar-input,
  html[data-zb-theme] .Input-wrapper,
  html[data-zb-theme] input,
  html[data-zb-theme] textarea,
  html[data-zb-theme] select,
  html[data-zb-theme] [contenteditable="true"] {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    caret-color: var(--zb-primary) !important;
  }

  html[data-zb-theme] input::placeholder,
  html[data-zb-theme] textarea::placeholder,
  html[data-zb-theme] [contenteditable="true"]:empty::before {
    color: var(--zb-text-subtle) !important;
  }

${EDITOR_FOUNDATION_COMPONENT_STYLE}
  html[data-zb-theme] .Card,
  html[data-zb-theme] .TopstoryItem,
  html[data-zb-theme] .Topstory-mainColumnCard,
  html[data-zb-theme] .Topstory-mainColumnCard > div,
  html[data-zb-theme] .WriteArea,
  html[data-zb-theme] .HotSearchCard,
  html[data-zb-theme] .CreatorEntrance,
  html[data-zb-theme] .KfeCollection-CreateSaltCard,
  html[data-zb-theme] .Modal-inner,
  html[data-zb-theme] .Popover-content,
  html[data-zb-theme] .Menu,
  html[data-zb-theme] .Dropdown-menu,
  html[data-zb-theme] .Select-list,
  html[data-zb-theme] .AutoComplete-menu {
    ${SURFACE_TEXT_STYLE}
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] :is(.Card, .HotSearchCard) {
    box-sizing: border-box !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
  }


${OVERLAYS_COMPONENT_STYLE}
  html[data-zb-theme] .Button--blue {${PRIMARY_BUTTON_STYLE}
  }

  html[data-zb-theme] .Button--blue:hover {${PRIMARY_BUTTON_HOVER_STYLE}
  }

  html[data-zb-theme] :is(.Button, button) :where(svg, path) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

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
  html[data-zb-theme] .CornerButton {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .CornerButton:hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .CornerButton svg {
    ${CURRENT_COLOR_ICON_STYLE}
  }

${COMMENTS_COMPONENT_STYLE}
${QUESTION_EDITOR_COMPONENT_STYLE}
${CONTENT_MENUS_COMPONENT_STYLE}
${DISCOVERY_COMPONENT_STYLE}
${FOLLOWING_FEED_COMPONENT_STYLE}
  html[data-zb-theme] .VoteButton {
    background-color: var(--zb-primary-soft) !important;
    border-color: transparent !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .VoteButton:hover,
  html[data-zb-theme] .VoteButton[aria-pressed="true"],
  html[data-zb-theme] .VoteButton.is-active {
    background-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

${PIN_DETAIL_COMPONENT_STYLE}
  html[data-zb-theme] .ProfileSideCreator-analytics,
  html[data-zb-theme] .KfeCollection-CreateSaltCard-content {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
  }

${HOME_SIDEBAR_COMPONENT_STYLE}
${LOADING_FEEDBACK_COMPONENT_STYLE}
${CROSS_PAGE_SURFACES_STYLE}
`;
