import { PRIMARY_BORDER_FOCUS_STYLE, SOFT_PRIMARY_STATE_STYLE } from "../../shared/actions.js";
import { SURFACE_TEXT_STYLE } from "../../shared/surfaces.js";

export const MATERIAL_LIBRARY_MODAL_OVERLAY_STYLE = `  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> button.Button--primary) {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> button.Button--primary)
    :where(div, label, svg) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> button.Button--primary)
    a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    .Modal-content
    > div
    > div:last-child
    > div:last-child:has(> button) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    .Modal-content
    > div
    > div:last-child
    > div:last-child:has(> button)
    > div,
  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    .Modal-content
    > div
    > div:last-child
    > div:last-child:has(> button)
    > div
    :where(div, span) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> input[placeholder="输入关键字查找图片"]) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> input[placeholder="输入关键字查找图片"]):focus-within {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    input[placeholder="输入关键字查找图片"] {
    box-sizing: border-box !important;
    min-width: 0 !important;
    padding: 0 !important;
    background-color: transparent !important;
    border: 0 !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    input[placeholder="输入关键字查找图片"]
    + button {
    background-color: transparent !important;
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    input[placeholder="输入关键字查找图片"]
    + button:hover {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> div > input[type="file"][multiple])
    > div
    > div:last-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal
    :is(.MaterialLibraryNav-Mine, .MaterialLibraryNav-Folder) {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal
    :is(.MaterialLibraryNav-Mine, .MaterialLibraryNav-Folder):is(
      :hover,
      :focus-within
    ) {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal
    :is(.MaterialLibraryNav-Mine, .MaterialLibraryNav-Folder).active {
    ${SOFT_PRIMARY_STATE_STYLE}
  }

  html[data-zb-theme] .Modal .MaterialLibraryNav-Folder .nav-name {
    color: inherit !important;
  }

  html[data-zb-theme]
    .Modal
    :is(.MaterialLibraryNav-Mine, .MaterialLibraryNav-Folder)
    .nav-num {
    min-width: 20px !important;
    padding-inline: 6px !important;
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 10px !important;
  }

  html[data-zb-theme]
    .Modal
    :is(.MaterialLibraryNav-Mine, .MaterialLibraryNav-Folder).active
    .nav-num {
    background-color: var(--zb-surface) !important;
    color: var(--zb-primary) !important;
  }

`;
