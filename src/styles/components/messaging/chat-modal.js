import { PRIMARY_FOCUS_STYLE } from "../../shared/actions.js";
import {
  CURRENT_COLOR_ICON_STYLE,
  MUTED_TEXT_PAINT_STYLE,
  PRIMARY_TEXT_PAINT_STYLE,
  TEXT_PAINT_STYLE,
  THIN_SCROLLBAR_STYLE,
} from "../../shared/content.js";
import {
  RAISED_CONTROL_SURFACE_STYLE,
  RAISED_STRONG_CONTROL_SURFACE_STYLE,
  RAISED_TEXT_STYLE,
  SECTION_HEADER_STYLE,
  SURFACE_TEXT_ONLY_STYLE,
} from "../../shared/surfaces.js";

export const CHAT_MODAL_STYLE = `  html[data-zb-theme] .ChatBoxModal > div:has(> .Modal-content) {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    :is(.Modal-content, .Chat-ChatBox, .MessagesBox, .InputBox) {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme] .ChatBoxModal .Chat-ChatBox > header {
    ${SECTION_HEADER_STYLE}
  }

  html[data-zb-theme] .ChatBoxModal .MessagesBox {${THIN_SCROLLBAR_STYLE}
  }

  html[data-zb-theme] .ChatBoxModal .TextMessage {
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 10px !important;
    ${TEXT_PAINT_STYLE}
    box-shadow: none !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .TextMessage.TextMessage-receiver {
    background-color: var(--zb-primary-soft) !important;
    border-color: color-mix(
      in srgb,
      var(--zb-primary) 38%,
      var(--zb-border)
    ) !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .TextMessage
    :where(div, span, p, strong, em) {
    color: inherit !important;
    -webkit-text-fill-color: inherit !important;
  }

  html[data-zb-theme] .ChatBoxModal .TextMessage a {
    ${PRIMARY_TEXT_PAINT_STYLE}
    text-decoration-color: transparent !important;
    text-underline-offset: 2px !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .TextMessage
    a:is(:hover, :focus-visible) {
    color: var(--zb-primary-hover) !important;
    -webkit-text-fill-color: var(--zb-primary-hover) !important;
    text-decoration-color: currentColor !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    :is(time, .Message-status, .InputBox-footerDesc) {
    ${MUTED_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme] .ChatBoxModal .InputBox-input {
    background-color: transparent !important;
    border-color: transparent !important;
    box-shadow: none !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    :is(textarea, input, [contenteditable="true"]) {
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    color: var(--zb-text) !important;
    caret-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    :is(textarea, input, [contenteditable="true"]):focus {
    border-color: var(--zb-primary) !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme] .Emoticons.EmoticonTool-panel {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    box-shadow: var(--zb-shadow) !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .Emoticons.EmoticonTool-panel
    :is(.Emoticons-panelContainer, .EmoticonPanel) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .Emoticons.EmoticonTool-panel
    .EmoticonPanel-item {
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Emoticons.EmoticonTool-panel
    .EmoticonPanel-item:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .Emoticons.EmoticonTool-panel .EmoticonsFooter {
    background-color: var(--zb-surface) !important;
    border-top: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme]
    .Emoticons.EmoticonTool-panel
    .EmoticonsFooter-item {
    background-color: transparent !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Emoticons.EmoticonTool-panel
    .EmoticonsFooter-item--selected {
    background-color: var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .Emoticons.EmoticonTool-panel
    .EmoticonsFooter-item:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .Emoticons.EmoticonTool-panel
    .EmoticonPagination-bullet {
    background-color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme]
    .Emoticons.EmoticonTool-panel
    .EmoticonPagination-bullet--active {
    background-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .Chat-ActionMenuPopover-Button {
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .Chat-ActionMenuPopover-Button:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-text) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    body[data-zb-chat-modal-open="true"]
    [data-zb-action-menu-popover]
    > .ActionMenu {
    background-color: var(--zb-surface) !important;
    border-radius: 8px !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    body[data-zb-chat-modal-open="true"]
    [data-zb-action-menu-popover]
    > .ActionMenu
    > .ActionMenu-item {
    box-sizing: border-box !important;
    width: calc(100% - 12px) !important;
    margin-right: 6px !important;
    margin-left: 6px !important;
    padding-right: 14px !important;
    padding-left: 14px !important;
    background-color: transparent !important;
    border-radius: 6px !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    body[data-zb-chat-modal-open="true"]
    [data-zb-action-menu-popover]
    > .ActionMenu
    > .ActionMenu-item:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    body[data-zb-chat-modal-open="true"]
    [data-zb-action-menu-popover]
    > .ActionMenu
    > .ActionMenu-item:first-child {
    background-color: color-mix(
      in srgb,
      var(--zb-danger) 12%,
      transparent
    ) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    body[data-zb-chat-modal-open="true"]
    [data-zb-action-menu-popover]
    > .ActionMenu
    > .ActionMenu-item:first-child:is(:hover, :focus-visible) {
    background-color: color-mix(
      in srgb,
      var(--zb-danger) 20%,
      transparent
    ) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .ChatBoxModal .Chat-ChatBox:has(.Checkbox-input) {
    display: flex !important;
    flex-direction: column !important;
    min-height: 0 !important;
    height: 100% !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .Chat-ChatBox:has(.Checkbox-input)
    > header {
    flex: 0 0 50px !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .Chat-ChatBox:has(.Checkbox-input)
    > div:has(.MessagesBox) {
    min-height: 0 !important;
    height: auto !important;
    flex: 1 1 auto !important;
    overflow: clip !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .Chat-ChatBox:has(.Checkbox-input)
    .MessagesBox {
    height: 100% !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .Chat-ChatBox:has(.Checkbox-input)
    > :last-child {
    box-sizing: border-box !important;
    min-height: 88px !important;
    height: 88px !important;
    flex: 0 0 88px !important;
    background-color: var(--zb-surface) !important;
    border-top: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .Chat-ChatBox:has(.Checkbox-input)
    > :last-child
    > button:has(.ZDI--ExclamationTriangle24) {
    width: 72px !important;
    height: 72px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 4px !important;
    border-radius: 8px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .Chat-ChatBox:has(.Checkbox-input)
    > :last-child
    > button:has(.ZDI--ExclamationTriangle24)
    > div:first-child {
    width: 36px !important;
    height: 36px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 999px !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .Chat-ChatBox:has(.Checkbox-input)
    > :last-child
    > button:has(.ZDI--ExclamationTriangle24)
    > div:last-child {
    height: 20px !important;
    line-height: 20px !important;
    color: inherit !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .Chat-ChatBox:has(.Checkbox-input)
    > :last-child
    > button:has(.ZDI--ExclamationTriangle24):is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-text) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .Chat-ChatBox:has(.Checkbox-input)
    > :last-child
    > button:has(.ZDI--Xmark24) {
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .Chat-ChatBox:has(.Checkbox-input)
    > :last-child
    > button:has(.ZDI--Xmark24):is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-text) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .Chat-ChatBox:has(.Checkbox-input)
    .Checkbox {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .ChatBoxModal
    .Chat-ChatBox:has(.Checkbox-input)
    .Checkbox:has(.Checkbox-input:checked) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .ChatBoxModal-closeButton {
    border-radius: 8px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .ChatBoxModal-closeButton:is(:hover, :focus-visible) {${RAISED_TEXT_STYLE}
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme]
    .ChatBoxModal
    :is(.ChatBoxModal-closeButton, .Chat-ActionMenuPopover-Button)
    :where(svg, path),
  html[data-zb-theme]
    .ChatBoxModal-closeButton
    :where(svg, path) {
    ${CURRENT_COLOR_ICON_STYLE}
  }`;
