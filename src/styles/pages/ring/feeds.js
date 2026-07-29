import { PRIMARY_BUTTON_HOVER_STYLE, PRIMARY_FOCUS_STYLE } from "../../shared/actions.js";
import { CURRENT_COLOR_ICON_STYLE } from "../../shared/content.js";
import {
  CARD_FRAME_STYLE,
  RAISED_CONTROL_SURFACE_STYLE,
  SURFACE_TEXT_ONLY_STYLE,
} from "../../shared/surfaces.js";

export const RING_FEEDS_STYLE = `  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    > div {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    div:has(> div > a[href="/ring"]):has(> div > a[href*="/ring/host/"]) {
    scrollbar-color: var(--zb-text-subtle) transparent !important;
    scrollbar-width: thin !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    div:has(> div > a[href="/ring"]):has(> div > a[href*="/ring/host/"])::-webkit-scrollbar {
    height: 6px !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    div:has(> div > a[href="/ring"]):has(> div > a[href*="/ring/host/"])::-webkit-scrollbar-thumb {
    background-color: var(--zb-text-subtle) !important;
    border-radius: 999px !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    a[href*="/ring/host/"]
    button:has(.ZDI--PlusFill16) {
    box-sizing: border-box !important;
    min-width: 28px !important;
    min-height: 20px !important;
    padding: 2px 5px !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-primary) !important;
    border-radius: 999px !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 1px 2px color-mix(in srgb, var(--zb-page) 48%, transparent) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    a[href*="/ring/host/"]
    button:has(.ZDI--PlusFill16)
    svg {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    div:has(> :is(.ZDI--ArrowLeft16, .ZDI--ArrowRight16)) {
    box-sizing: border-box !important;
    width: 32px !important;
    height: 32px !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 999px !important;
    color: var(--zb-text-secondary) !important;
    box-shadow: var(--zb-shadow) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    div:has(> :is(.ZDI--ArrowLeft16, .ZDI--ArrowRight16)):hover {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    div:has(> :is(.ZDI--ArrowLeft16, .ZDI--ArrowRight16))
    > svg {
    ${CURRENT_COLOR_ICON_STYLE}
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
