import {
  CARD_SURFACE_STYLE,
  CARD_FRAME_STYLE,
  MUTED_TEXT_PAINT_STYLE,
  PRIMARY_FOCUS_STYLE,
  PRIMARY_TEXT_PAINT_STYLE,
  RAISED_STRONG_CONTROL_SURFACE_STYLE,
  TEXT_PAINT_STYLE,
} from "../shared-components.js";

export const PAPER_PAGE_STYLE = `  html[data-zb-theme][data-zb-paper-page="true"],
  html[data-zb-theme][data-zb-paper-page="true"] body,
  html[data-zb-theme][data-zb-paper-page="true"] body > div:first-child {
    background-color: var(--zb-page) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section) {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    border-inline: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > div:first-child {
    background-color: var(--zb-surface-raised) !important;
    background-image: none !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > div:first-child
    > div:first-child {
    background: transparent !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > div:first-child
    > div:last-child {
    box-sizing: border-box !important;
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > div:first-child
    > div
    > div:last-child {${CARD_SURFACE_STYLE}
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > div:first-child
    > div
    > div:last-child
    > div:last-child
    > div:first-child {
    ${TEXT_PAINT_STYLE}
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > div:first-child
    > div
    > div:last-child
    > div:last-child
    > div:nth-child(2) {
    ${MUTED_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > div:first-child
    > div
    > div:last-child
    > div:last-child
    > div:last-child
    > div:first-child {
    ${PRIMARY_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > div:first-child
    > div
    > div:last-child
    > div:last-child
    > div:last-child
    > div:last-child {
    color: var(--zb-text-subtle) !important;
    -webkit-text-fill-color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > section {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    border-top: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > section
    h2 {
    ${TEXT_PAINT_STYLE}
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > section
    :is(p, li, div) {
    color: inherit !important;
    -webkit-text-fill-color: currentColor !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > section:nth-of-type(1)
    p,
  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > section:nth-of-type(3) {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > section:nth-of-type(4) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > section:nth-of-type(2)
    button {
    box-sizing: border-box !important;
    padding: 2px 6px !important;
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > section:nth-of-type(2)
    button:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary-hover) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > div:has(> button .ZDI--BookOpen24):has(> button + button + button) {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    border-top: 1px solid var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: 0 -6px 14px
      color-mix(in srgb, var(--ctp-crust) 14%, transparent) !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > div:has(> button .ZDI--BookOpen24):has(> button + button + button)
    > button {
    box-sizing: border-box !important;
    border-radius: 999px !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > div:has(> button .ZDI--BookOpen24):has(> button + button + button)
    > button:has(.ZDI--BookOpen24) {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > div:has(> button .ZDI--BookOpen24):has(> button + button + button)
    > button:nth-child(2) {
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid var(--zb-primary) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > div:has(> button .ZDI--BookOpen24):has(> button + button + button)
    > button:last-child {
    background-color: var(--zb-primary) !important;
    border: 1px solid var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > div:has(> button .ZDI--BookOpen24):has(> button + button + button)
    > button:is(:hover, :focus-visible) {
    border-color: var(--zb-primary-hover) !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-paper-page="true"]
    body
    div:has(> section + section)
    > div:has(> svg[viewBox="0 0 150 50"])
    :where(svg, path) {
    color: var(--zb-text-subtle) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-paper-preview-page="true"],
  html[data-zb-theme][data-zb-paper-preview-page="true"] body,
  html[data-zb-theme][data-zb-paper-preview-page="true"] #app {
    background-color: var(--zb-page) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-paper-preview-page="true"]
    [class^="ShelfTopNav-module-root_"] {
    background-color: var(--zb-surface) !important;
    border-bottom: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme][data-zb-paper-preview-page="true"]
    [class^="ShelfTopNav-module-logo_"] {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-paper-preview-page="true"]
    [class^="ShelfTopNav-module-avatar_"] {
    border: 1px solid var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-paper-preview-page="true"]
    #app
    > div:has(input[size="1"]) {
    background-color: var(--zb-surface) !important;
    border-bottom: 1px solid var(--zb-border) !important;
    color: var(--zb-text-secondary) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme][data-zb-paper-preview-page="true"]
    #app
    > div:has(input[size="1"])
    > div {
    background-color: var(--zb-surface) !important;
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-paper-preview-page="true"]
    #app
    > div:has(input[size="1"])
    div {
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-paper-preview-page="true"]
    #app
    > div:has(input[size="1"])
    input {
    box-sizing: border-box !important;
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 6px !important;
    color: var(--zb-text) !important;
    caret-color: var(--zb-primary) !important;
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-paper-preview-page="true"]
    #app
    > div:has(input[size="1"])
    input:focus-visible {
    border-color: var(--zb-primary) !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-paper-preview-page="true"]
    #app
    > div:has(> button .ZDI--ArrowRightSmall16) {
    background-color: var(--zb-primary-soft) !important;
    border-bottom: 1px solid
      color-mix(in srgb, var(--zb-primary) 42%, var(--zb-border)) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-paper-preview-page="true"]
    #app
    > div:has(> button .ZDI--ArrowRightSmall16)
    > button {
    color: inherit !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-paper-preview-page="true"]
    #app
    > div:has(> button .ZDI--ArrowRightSmall16)
    > button:is(:hover, :focus-visible) {
    background-color: color-mix(
      in srgb,
      var(--zb-primary-soft) 72%,
      var(--zb-surface-hover)
    ) !important;
    color: var(--zb-primary-hover) !important;
    box-shadow: inset 0 0 0 1px var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-paper-preview-page="true"]
    #app
    > div:has(.pdfViewer) {
    background-color: var(--zb-page) !important;
  }

  html[data-zb-theme][data-zb-paper-preview-page="true"]
    #app
    button[aria-label="放大"],
  html[data-zb-theme][data-zb-paper-preview-page="true"]
    #app
    button[aria-label="缩小"],
  html[data-zb-theme][data-zb-paper-preview-page="true"]
    #app
    button[aria-label="下载"] {
    box-sizing: border-box !important;
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    color: var(--zb-text-muted) !important;
    box-shadow: var(--zb-shadow) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-paper-preview-page="true"]
    #app
    button[aria-label="放大"]:is(:hover, :focus-visible),
  html[data-zb-theme][data-zb-paper-preview-page="true"]
    #app
    button[aria-label="缩小"]:is(:hover, :focus-visible),
  html[data-zb-theme][data-zb-paper-preview-page="true"]
    #app
    button[aria-label="下载"]:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-paper-preview-page="true"] .pdfViewer .page {
    background-color: #fff !important;
  }

`;
