import { PRIMARY_TEXT_PAINT_STYLE, TEXT_PAINT_STYLE } from "../../shared/content.js";
import { RAISED_STRONG_CONTROL_SURFACE_STYLE } from "../../shared/surfaces.js";

export const ARROW_ACTION_PANEL_OVERLAY_STYLE = `  html[data-zb-theme] [data-zb-arrow-action-panel-wrapper] {
    background-color: transparent !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme] [data-zb-arrow-action-panel] {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    [data-zb-arrow-action-panel]
    > div:nth-child(2) {
    background-color: transparent !important;
  }

  html[data-zb-theme]
    [data-zb-arrow-action-panel]
    > div:first-child
    span {
    ${TEXT_PAINT_STYLE}
    font-weight: 600 !important;
  }

  html[data-zb-theme]
    [data-zb-arrow-action-panel]
    > div:nth-child(3)
    button {
    ${PRIMARY_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    [data-zb-arrow-action-panel]
    button {
    box-sizing: border-box !important;
    min-width: max-content !important;
    padding: 4px 8px !important;
    border-radius: 6px !important;
    white-space: nowrap !important;
  }

  html[data-zb-theme]
    [data-zb-arrow-action-panel]
    button:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-radius: 6px !important;
    box-shadow: inset 0 0 0 1px var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    [data-zb-arrow-action-panel]
    :is(svg, path) {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
  }

`;
