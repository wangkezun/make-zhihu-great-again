import { PRIMARY_BUTTON_HOVER_STYLE, PRIMARY_FOCUS_STYLE } from "../../../shared/actions.js";
import { CURRENT_COLOR_ICON_STYLE, MUTED_TEXT_PAINT_STYLE } from "../../../shared/content.js";
import { RAISED_STRONG_CONTROL_SURFACE_STYLE } from "../../../shared/surfaces.js";

export const RING_HOST_HEADER_STYLE = `  html[data-zb-theme][data-zb-ring-host-page="true"] .App-main > div:first-child {
    background-color: var(--zb-page) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child {
    min-width: 0 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(-n + 5) {
    background-color: var(--zb-surface) !important;
    border-inline: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :first-child {
    border-top: 1px solid var(--zb-border) !important;
    border-radius: 12px 12px 0 0 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(4) {
    border-bottom: 1px solid var(--zb-border) !important;
    border-radius: 0 0 12px 12px !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :is(:nth-child(2), :nth-child(4))
    :where(div, span, a) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(2)
    > div:nth-child(2)
    > :first-child {
    box-sizing: border-box !important;
    display: inline-flex !important;
    min-height: 36px !important;
    padding: 6px 16px !important;
    align-items: center !important;
    justify-content: center !important;
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 999px !important;
    color: var(--zb-primary) !important;
    cursor: pointer !important;
    transition: none !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(2)
    > div:nth-child(2)
    > :first-child:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(2)
    > div:nth-child(2)
    > button {
    box-sizing: border-box !important;
    display: inline-flex !important;
    min-height: 36px !important;
    padding: 6px 12px !important;
    align-items: center !important;
    justify-content: center !important;
    background-color: var(--zb-primary) !important;
    border: 1px solid var(--zb-primary) !important;
    border-radius: 999px !important;
    color: var(--ctp-crust) !important;
    white-space: nowrap !important;
    transition: none !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(2)
    > div:nth-child(2)
    > button
    :where(div, span, svg) {
    ${CURRENT_COLOR_ICON_STYLE}
    white-space: inherit !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(2)
    > div:nth-child(2)
    > button:hover {
    ${PRIMARY_BUTTON_HOVER_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(2)
    > div:nth-child(2)
    > button[data-zb-ring-host-action="joined"] {
    position: relative !important;
    min-width: 80px !important;
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: transparent !important;
    -webkit-text-fill-color: transparent !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(2)
    > div:nth-child(2)
    > button[data-zb-ring-host-action="joined"]
    > * {
    visibility: hidden !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(2)
    > div:nth-child(2)
    > button[data-zb-ring-host-action="joined"]::after {
    position: absolute !important;
    inset: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    ${MUTED_TEXT_PAINT_STYLE}
    content: "已加入" !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(2)
    > div:nth-child(2)
    > button[data-zb-ring-host-action="joined"]:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: transparent !important;
    -webkit-text-fill-color: transparent !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(2)
    > div:nth-child(2)
    > button[data-zb-ring-host-action="joined"]:is(:hover, :focus-visible)::after {
    color: var(--zb-danger) !important;
    -webkit-text-fill-color: var(--zb-danger) !important;
    content: "取消加入" !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(2)
    > div:nth-child(2)
    > button[data-zb-ring-host-action="joined"]:focus-visible {
    outline: 2px solid var(--zb-danger) !important;
    outline-offset: 2px !important;
    box-shadow: 0 0 0 2px var(--zb-danger-soft) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(2)
    > div:nth-child(2)
    > button:disabled {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-subtle) !important;
    cursor: not-allowed !important;
    opacity: 0.72 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"][data-zb-ring-host-ready="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(2)
    > div:nth-child(2)
    > :is(:first-child, button) {
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(4)
    > * {
    transition: none !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"][data-zb-ring-host-ready="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(4)
    > * {
    transition:
      background-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(4)
    :is(:hover, :focus-visible) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    > div:nth-child(2)
    > :nth-child(4)
    :focus-visible {
    border-radius: 6px !important;
    ${PRIMARY_FOCUS_STYLE}
  }

`;
