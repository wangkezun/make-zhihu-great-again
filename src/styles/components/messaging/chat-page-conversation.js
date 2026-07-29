import { PRIMARY_FOCUS_STYLE } from "../../shared/actions.js";
import {
  CURRENT_COLOR_ICON_STYLE,
  MUTED_TEXT_PAINT_STYLE,
  TEXT_PAINT_STYLE,
  THIN_SCROLLBAR_STYLE,
} from "../../shared/content.js";
import {
  RAISED_CONTROL_SURFACE_STYLE,
  SECTION_HEADER_STYLE,
  SURFACE_TEXT_ONLY_STYLE,
} from "../../shared/surfaces.js";

export const CHAT_PAGE_CONVERSATION_STYLE = `  html[data-zb-theme]
    .App-main
    .Chat
    :is(.Chat-ChatBox, .MessagesBox, .InputBox) {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme] .App-main .Chat .Chat-ChatBox > header {
    ${SECTION_HEADER_STYLE}
  }

  html[data-zb-theme] .App-main .Chat .MessagesBox {${THIN_SCROLLBAR_STYLE}
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .Chat-ChatBox
    .Chat-ActionMenuPopover-Button {
    background-image: none !important;
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .Chat-ChatBox
    .Chat-ActionMenuPopover-Button:is(:hover, :focus-visible, :active) {
    background-color: var(--zb-surface-hover) !important;
    background-image: none !important;
    color: var(--zb-text) !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .Chat-ChatBox
    .Chat-ActionMenuPopover-Button
    :where(svg, path) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .AbnormalAlert.ChatBox-alert {
    box-sizing: border-box !important;
    width: min(488px, calc(100% - 32px)) !important;
    min-height: 50px !important;
    padding: 10px 12px 10px 16px !important;
    background-color: color-mix(
      in srgb,
      var(--zb-danger) 12%,
      var(--zb-surface-raised)
    ) !important;
    border: 1px solid var(--zb-danger) !important;
    border-radius: 8px !important;
    color: var(--zb-danger) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .AbnormalAlert
    .AbnormalAlert-message {
    min-width: 0 !important;
    color: inherit !important;
    -webkit-text-fill-color: currentColor !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .AbnormalAlert
    .AbnormalAlert-icon {
    box-sizing: border-box !important;
    flex: 0 0 28px !important;
    width: 28px !important;
    height: 28px !important;
    padding: 5px !important;
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
    fill: currentColor !important;
    cursor: pointer !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .AbnormalAlert
    .AbnormalAlert-icon:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    color: var(--zb-danger) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .App-main .Chat .CardMessage {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 10px !important;
    box-shadow: var(--zb-shadow) !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .App-main .Chat .CardMessage::before {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme] .App-main .Chat .CardMessage > :first-child {
    background-color: var(--zb-surface) !important;
    border-bottom: 1px solid var(--zb-border-strong) !important;
    box-shadow: none !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .CardMessage
    > :first-child
    :where(div, span, svg) {
    color: inherit !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .CardMessage
    > :first-child
    svg {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .CardMessage
    > :first-child
    > :last-child {
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .CardMessage
    > :first-child
    > :last-child:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary-hover) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .App-main .Chat .CardMessage > :last-child {
    display: grid !important;
    gap: 2px !important;
    padding: 8px !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .CardMessage
    > :last-child
    > div,
  html[data-zb-theme] .App-main .Chat .IconListMessage > div {
    background-color: transparent !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 8px !important;
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .CardMessage
    > :last-child
    > div {
    box-shadow: none !important;
    cursor: pointer !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .CardMessage
    > :last-child
    > div
    :where(div, span),
  html[data-zb-theme]
    .App-main
    .Chat
    .IconListMessage
    > div
    :where(div, span) {
    color: inherit !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .CardMessage
    > :last-child
    > div:is(:hover, :focus-visible),
  html[data-zb-theme]
    .App-main
    .Chat
    .IconListMessage
    > div:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .CardMessage
    > :last-child
    > div:focus-visible,
  html[data-zb-theme]
    .App-main
    .Chat
    .IconListMessage
    > div:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme] .App-main .Chat .IconListMessage > div {
    overflow: hidden !important;
  }

  html[data-zb-theme] .App-main .Chat .IconListMessage > div > img {
    clip-path: inset(0 -32px 0 100%) !important;
    filter: drop-shadow(32px 0 0 var(--zb-primary)) !important;
    transform: translateX(-32px) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .IconListMessage
    > div:is(:hover, :focus-visible)
    > img {
    filter: drop-shadow(32px 0 0 var(--zb-primary-hover)) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .IconListMessage
    > div
    :where(svg, path) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .Chat-ChatBox
    > div:has(.ZDI--ChatBubbleTwo24) {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .Chat-ChatBox
    > div:has(.ZDI--ChatBubbleTwo24)
    > div {
    background-color: transparent !important;
    border: 0 !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .Chat-ChatBox
    > div:has(.ZDI--ChatBubbleTwo24)
    > div
    > div {
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 999px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .Chat-ChatBox
    > div:has(.ZDI--ChatBubbleTwo24)
    > div
    > div
    :where(div, span, svg, path) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .Chat-ChatBox
    > div:has(.ZDI--ChatBubbleTwo24)
    .ZDI--ChatBubbleTwo24 {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .App-main .Chat .InputBox-input {
    box-sizing: border-box !important;
    width: 100% !important;
    padding: 0 14px !important;
    background-color: transparent !important;
    border-color: transparent !important;
    box-shadow: none !important;
  }

  html[data-zb-theme] .App-main .Chat .InputBox > .ToolBar {
    border-top-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .App-main .Chat .InputBox-footer {
    box-sizing: border-box !important;
    width: 100% !important;
    min-height: 51px !important;
    padding: 9px 16px 10px !important;
    background-color: var(--zb-surface) !important;
    border-top: 0 !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .InputBox
    :is(textarea, input, [contenteditable="true"]) {
    box-sizing: border-box !important;
    padding: 10px 12px !important;
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    color: var(--zb-text) !important;
    caret-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .InputBox
    :is(textarea, input, [contenteditable="true"]):focus {
    border-color: var(--zb-primary) !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme] .App-main .Chat .TextMessage {
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 10px !important;
    ${TEXT_PAINT_STYLE}
    box-shadow: none !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .TextMessage.TextMessage-receiver {
    background-color: var(--zb-primary-soft) !important;
    border-color: color-mix(
      in srgb,
      var(--zb-primary) 38%,
      var(--zb-border)
    ) !important;
  }

  html[data-zb-theme] .App-main .Chat .MessagesBox .css-1oxfz4p {
    box-sizing: border-box !important;
    max-width: calc(100% - 32px) !important;
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    ${MUTED_TEXT_PAINT_STYLE}
    box-shadow: none !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    :is(time, .Message-status, .InputBox-footerDesc) {
    ${MUTED_TEXT_PAINT_STYLE}
  }

`;
