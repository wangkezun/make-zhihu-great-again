import {
  PRIMARY_BORDER_FOCUS_STYLE,
  PRIMARY_BUTTON_HOVER_STYLE,
  SOFT_PRIMARY_STATE_STYLE,
} from "../../shared/actions.js";
import { MUTED_TEXT_PAINT_STYLE } from "../../shared/content.js";
import { CARD_FRAME_STYLE, RAISED_CONTROL_SURFACE_STYLE } from "../../shared/surfaces.js";

export const RING_INDEX_STYLE = `  html[data-zb-theme][data-zb-ring-index-page="true"] .App-main,
  html[data-zb-theme][data-zb-ring-index-page="true"] .App-main > div {
    min-height: calc(100vh - 52px) !important;
    background-color: var(--zb-page) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    > div
    > div {
    box-sizing: border-box !important;
    width: min(982px, calc(100vw - 32px)) !important;
    min-width: 0 !important;
    padding: 28px 0 40px !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    > div
    > div
    > div:first-of-type {
    color: var(--zb-text) !important;
    font-size: 18px !important;
    font-weight: 600 !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    > div
    > div
    > div:first-of-type
    > * {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    > div
    > div
    > div:first-of-type
    svg {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    div:has(> div > .css-f1fy25) {
    box-sizing: border-box !important;
    min-height: 50px !important;
    padding: 12px 16px !important;
    gap: 16px !important;
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    div:has(> div > .css-f1fy25)
    > div:first-of-type {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    div:has(> div > .css-f1fy25)
    > div:nth-of-type(2)
    > * {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-secondary) !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    div:has(> div > .css-f1fy25)
    > div:nth-of-type(2)
    > :is(.css-f1fy25, :hover) {
    ${SOFT_PRIMARY_STATE_STYLE}
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    > div
    > div
    > div:has(> div > div > div > a[href*="/ring/host/"][href*="tab_id"])
    > div:first-of-type {
    color: var(--zb-text-secondary) !important;
    font-size: 15px !important;
    font-weight: 600 !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    > div
    > div
    > div:has(> div > div > div > a[href*="/ring/host/"][href*="tab_id"])
    > div:nth-of-type(2)
    > div:first-of-type {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 16px !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href*="/ring/host/"][href*="tab_id"] {
    box-sizing: border-box !important;
    min-height: 64px !important;
    padding: 10px 12px !important;
    overflow: hidden !important;
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
    color: var(--zb-text) !important;
    transition:
      border-color 0.16s ease,
      background-color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href*="/ring/host/"][href*="tab_id"]::before {
    content: none !important;
    border: 0 !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href*="/ring/host/"][href*="tab_id"]:hover {
    background-color: var(--zb-surface) !important;
    border-color: color-mix(in srgb, var(--zb-primary) 36%, var(--zb-border)) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href*="/ring/host/"][href*="tab_id"]:focus-visible {
    border-color: var(--zb-primary) !important;
    outline: 2px solid var(--zb-primary) !important;
    outline-offset: 2px !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href*="/ring/host/"][href*="tab_id"]
    > div {
    box-sizing: border-box !important;
    width: 100% !important;
    padding: 0 !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href*="/ring/host/"][href*="tab_id"]
    img {
    flex: 0 0 auto !important;
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href*="/ring/host/"][href*="tab_id"]
    img
    + div
    > div:first-of-type,
  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href*="/ring/host/"][href*="tab_id"]
    img
    + div
    > div:first-of-type
    * {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href*="/ring/host/"][href*="tab_id"]
    img
    + div
    > div:nth-of-type(2) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"] {
    box-sizing: border-box !important;
    overflow: hidden !important;
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
    color: var(--zb-text) !important;
    transition:
      border-color 0.16s ease,
      background-color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]::before {
    content: none !important;
    border: 0 !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]:hover {
    background-color: var(--zb-surface) !important;
    border-color: color-mix(in srgb, var(--zb-primary) 36%, var(--zb-border)) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]:focus-visible {
    outline: 2px solid var(--zb-primary) !important;
    outline-offset: 2px !important;${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]
    > :nth-child(2) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]
    img {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]
    > :nth-child(2)
    > :first-child
    > :first-child
    > :first-child {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]
    > :nth-child(2)
    > :first-child
    > :first-child
    > :nth-child(2)
    > :first-child {
    color: var(--zb-primary) !important;
    transition: color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]:hover
    > :nth-child(2)
    > :first-child
    > :first-child
    > :nth-child(2)
    > :first-child {
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]
    > :nth-child(2)
    > :first-child
    > :first-child
    > :nth-child(2)
    > :nth-child(2),
  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]
    > :nth-child(2)
    > :nth-child(2) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]
    button {
    box-sizing: border-box !important;
    position: relative !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-width: 66px !important;
    min-height: 28px !important;
    padding: 0 12px !important;
    background-color: var(--zb-primary) !important;
    border: 1px solid var(--zb-primary) !important;
    border-radius: 999px !important;
    color: var(--ctp-crust) !important;
    transition:
      border-color 0.16s ease,
      background-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]
    button:hover {
    ${PRIMARY_BUTTON_HOVER_STYLE}
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]
    button:focus-visible {
    outline: 2px solid var(--zb-primary) !important;
    outline-offset: 2px !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]
    button:is([data-zb-ring-index-action="joined"], [aria-pressed="true"]) {
    min-width: 80px !important;
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: transparent !important;
    -webkit-text-fill-color: transparent !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]
    button:is([data-zb-ring-index-action="joined"], [aria-pressed="true"])
    > * {
    visibility: hidden !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]
    button:is([data-zb-ring-index-action="joined"], [aria-pressed="true"])::after {
    position: absolute !important;
    inset: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    ${MUTED_TEXT_PAINT_STYLE}
    content: "已加入" !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]
    button:is([data-zb-ring-index-action="joined"], [aria-pressed="true"]):is(
      :hover,
      :focus-visible
    ) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: transparent !important;
    -webkit-text-fill-color: transparent !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]
    button:is([data-zb-ring-index-action="joined"], [aria-pressed="true"]):is(
      :hover,
      :focus-visible
    )::after {
    color: var(--zb-danger) !important;
    -webkit-text-fill-color: var(--zb-danger) !important;
    content: "取消加入" !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]
    button:is([data-zb-ring-index-action="joined"], [aria-pressed="true"]):focus-visible {
    outline-color: var(--zb-danger) !important;
    box-shadow: 0 0 0 2px var(--zb-danger-soft) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"]
    .App-main
    a[href^="/ring/host/"]
    button:disabled {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-text-subtle) !important;
    cursor: not-allowed !important;
  }

`;
