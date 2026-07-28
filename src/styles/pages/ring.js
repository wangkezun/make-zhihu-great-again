import {
  CARD_FRAME_STYLE,
  CURRENT_COLOR_ICON_STYLE,
  MUTED_TEXT_PAINT_STYLE,
  PRIMARY_BORDER_FOCUS_STYLE,
  PRIMARY_BUTTON_HOVER_STYLE,
  PRIMARY_BUTTON_STYLE,
  PRIMARY_FOCUS_STYLE,
  RAISED_CONTROL_SURFACE_STYLE,
  RAISED_STRONG_CONTROL_SURFACE_STYLE,
  SECTION_HEADER_STYLE,
  SOFT_PRIMARY_STATE_STYLE,
  SURFACE_TEXT_ONLY_STYLE,
  TRANSPARENT_TEXT_STYLE,
} from "../shared-components.js";

export const RING_PAGE_STYLE = `

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div
    > :first-child
    > :first-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ring-index-page="true"] .App-main,
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

  html[data-zb-theme][data-zb-ring-host-page="true"] .App-main > div:first-child {
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

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    .List {
    background-color: transparent !important;
    padding-top: 12px !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    .List
    > .List-item {
    box-sizing: border-box !important;
    margin-bottom: 12px !important;
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
    overflow: clip !important;
    transition: border-color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    .List
    > .List-item:is(:hover, :focus-within) {
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    .List
    > .List-item::after {
    display: none !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    .PinToolbar-actions {
    background-color: transparent !important;
    border-top: 0 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:first-child,
  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div {
    box-sizing: border-box !important;
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div {
    padding: 16px !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2) {
    gap: 16px !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:first-child {
    min-height: 214px !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div {
    padding-top: 20px !important;
    gap: 16px !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)::before {
    display: none !important;
    content: none !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:first-child {
    padding: 16px 12px !important;
    gap: 12px !important;
    margin-bottom: 0 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:first-child
    > :first-child {
    flex: 0 0 auto !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:first-child
    > div:nth-child(2) {
    box-sizing: border-box !important;
    display: flex !important;
    width: auto !important;
    min-width: 0 !important;
    min-height: 36px !important;
    flex: 1 1 auto !important;
    align-items: center !important;
    justify-content: center !important;
    background-color: var(--zb-primary) !important;
    border: 1px solid var(--zb-primary) !important;
    border-radius: 999px !important;
    color: var(--ctp-crust) !important;
    cursor: pointer !important;
    transition: none !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:first-child
    > div:nth-child(2)
    :where(div, span, svg) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:first-child
    > div:nth-child(2):hover {
    ${PRIMARY_BUTTON_HOVER_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"][data-zb-ring-host-ready="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:first-child
    > div:nth-child(2) {
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div
    > :first-child {
    margin-bottom: 12px !important;
    color: var(--zb-text) !important;
    font-weight: 600 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div
    > :first-child
    > :last-child:not(:only-child) {
    color: var(--zb-primary) !important;
    font-weight: 400 !important;
    transition:
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div
    > :first-child
    > :last-child:not(:only-child):is(:hover, :focus-visible) {
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:first-child
    > :nth-child(2) {
    margin-top: 0 !important;
    padding: 12px !important;
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:first-child
    > :nth-child(2)
    > :first-child
    > :first-child
    > :nth-child(odd) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:first-child
    > :nth-child(2)
    > :first-child
    > :first-child
    > :nth-child(even) {
    background-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:first-child
    > :nth-child(2)
    > :first-child
    > :nth-child(2) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:first-child
    > :nth-child(2)
    > :nth-child(2) {
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid transparent !important;
    color: var(--zb-primary) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:first-child
    > :nth-child(2)
    > :nth-child(2)
    :where(div, span, svg) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:first-child
    > :nth-child(2)
    > :nth-child(2):is(:hover, :focus-visible) {${PRIMARY_BUTTON_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:nth-child(2)
    > :nth-child(2) {
    color: var(--zb-text-secondary) !important;
    line-height: 1.65 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:nth-child(3)
    > :is(:nth-child(2), :nth-child(3))
    > :first-child {
    color: var(--zb-text-muted) !important;
    font-weight: 500 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:nth-child(3)
    > :nth-child(2)
    a {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:nth-child(3)
    > :nth-child(2)
    button {
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid transparent !important;
    border-radius: 999px !important;
    color: var(--zb-primary) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:nth-child(3)
    > :nth-child(2)
    button:is(:hover, :focus-visible) {${PRIMARY_BUTTON_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:nth-child(3)
    > :nth-child(3)
    img {
    border: 1px solid var(--zb-border) !important;
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:nth-child(3)
    > :nth-child(3)
    a:is(:hover, :focus-visible)
    img {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div
    a:is(:hover, :focus-visible) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div
    a:focus-visible {
    border-radius: 6px !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .PinItem
    .ContentItem-actions
    > .PinToolbar-actions {
    box-sizing: border-box !important;
    width: calc(100% + 40px) !important;
    margin: -10px -20px !important;
    padding: 10px 20px !important;
    background-color: transparent !important;
    border-top: 0 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    div:has(> .Modal-content input[placeholder="搜索你想邀请的人"]) {
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"]) {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :first-child {${SECTION_HEADER_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :first-child
    > div
    > :first-child {
    color: var(--zb-text) !important;
    font-weight: 600 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    .Input-wrapper {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    .Input-wrapper:focus-within {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    input[placeholder="搜索你想邀请的人"] {${TRANSPARENT_TEXT_STYLE}
    caret-color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    input[placeholder="搜索你想邀请的人"]::placeholder {
    color: var(--zb-text-subtle) !important;
    opacity: 1 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2) {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :nth-child(2):has(button)
    > div
    > div
    > div {
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :first-child {
    background-color: var(--zb-surface) !important;
    border-bottom: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :first-child
    > :is(:first-child, :last-child) {
    color: var(--zb-text-secondary) !important;
    transition:
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :first-child
    > :is(:first-child, :last-child)
    :where(div, span) {
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :first-child
    > :is(:first-child, :last-child):is(:hover, :focus-within) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :nth-child(3) {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :nth-child(3)
    :where(a, div, span) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :nth-child(3)
    > div
    > div
    > div {
    border-bottom-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :nth-child(3)
    img {
    border: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    button {
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid transparent !important;
    border-radius: 999px !important;
    color: var(--zb-primary) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    button:is(:hover, :focus-visible) {${PRIMARY_BUTTON_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    button:disabled {
    background-color: var(--zb-surface-hover) !important;
    border-color: transparent !important;
    color: var(--zb-text-subtle) !important;
    cursor: not-allowed !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    div:has(> div > .Modal-content input[placeholder="搜索你想邀请的人"])
    > button[aria-label="关闭"] {
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 999px !important;
    color: var(--zb-text-muted) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    div:has(> div > .Modal-content input[placeholder="搜索你想邀请的人"])
    > button[aria-label="关闭"]:is(:hover, :focus-visible) {
    background-color: color-mix(in srgb, var(--zb-danger) 14%, var(--zb-surface-raised)) !important;
    border-color: var(--zb-danger) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    div:has(> div > .Modal-content input[placeholder="搜索你想邀请的人"])
    > button[aria-label="关闭"]:focus-visible {
    outline: 0 !important;
    box-shadow: 0 0 0 2px
      color-mix(in srgb, var(--zb-danger) 22%, transparent) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    > div {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    :is(a[href="/ring"], a[href*="/ring/host/"]) {
    color: var(--zb-text) !important;
    transition:
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    :is(a[href="/ring"], a[href*="/ring/host/"]):is(:hover, :focus-visible) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    :is(a[href="/ring"], a[href*="/ring/host/"]):focus-visible {
    border-radius: 8px !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    a[href^="https://www.zhihu.com/pin/"]
    > div {
    ${RAISED_CONTROL_SURFACE_STYLE}
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .Modal-inner {
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .WritePinV2-Form {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    :is(.TitleArea, .EditorArea .InputLike.Editable) {
    box-sizing: border-box !important;
    background-color: var(--zb-surface-raised) !important;
    border: 0 !important;
    color: var(--zb-text) !important;
    transition:
      background-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .TitleArea {
    border-bottom: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    :is(.TitleArea, .EditorArea .InputLike.Editable):focus-within {
    background-color: var(--zb-surface-hover) !important;
    box-shadow: inset 0 0 0 1px var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    :is(
      .TitleArea textarea,
      .Editable-content,
      .DraftEditor-root,
      .DraftEditor-editorContainer,
      .public-DraftEditor-content
    ) {
    background-color: transparent !important;
    border: 0 !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    :is(
      .TitleArea textarea::placeholder,
      .public-DraftEditorPlaceholder-root,
      .public-DraftEditorPlaceholder-inner
    ) {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .RingSetting
    > div,
  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .RingSetting
    + div
    > div {
    box-sizing: border-box !important;
    ${RAISED_CONTROL_SURFACE_STYLE}
    color: var(--zb-text-secondary) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .RingSetting
    > div
    :where(div, span, svg),
  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .RingSetting
    + div
    > div
    :where(div, span, svg) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .RingSetting
    > div:is(:hover, :focus-within),
  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .RingSetting
    + div
    > div:is(:hover, :focus-within) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .WritePinToolbar {
    border-top: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .WritePinToolbar
    .Button--plain {
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .WritePinToolbar
    .Button--plain:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .Modal-closeButton {
    border-radius: 999px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .Modal-closeButton:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"] #TopstoryContent .List {
    padding: 0 10px 10px !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    :has(> .List)
    > :first-child
    > div
    > div
    > div {
    ${RAISED_CONTROL_SURFACE_STYLE}
    box-shadow: var(--zb-shadow) !important;
    color: var(--zb-text-muted) !important;
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    :has(> .List)
    > :first-child
    > div
    > div
    > div:is(:hover, :focus-within) {
    border-color: var(--zb-primary) !important;
    box-shadow:
      var(--zb-shadow),
      0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item {
    box-sizing: border-box !important;
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
    margin-bottom: 10px !important;
    overflow: hidden !important;
    overflow: clip !important;
    transition: border-color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item:is(:hover, :focus-within) {
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item::after {
    display: none !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item
    .PinToolbar-actions {
    background-color: transparent !important;
    border-top: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .PinItem
    button:not(.Button) {
    background-color: var(--zb-primary) !important;
    border: 1px solid var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .PinItem
    button:not(.Button):hover {
    ${PRIMARY_BUTTON_HOVER_STYLE}
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item
    .ContentItem-actions
    .Button:not(.VoteButton) {
    border-radius: 6px !important;
    min-height: 28px !important;
    padding: 4px 6px !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item
    .ContentItem-actions
    .Button:not(.VoteButton):is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item
    :is(.ContentItem-more, .RichContent-inner a) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item
    :is(.ContentItem-more, .RichContent-inner a):is(:hover, :focus-visible) {
    color: var(--zb-primary-hover) !important;
  }

`;
