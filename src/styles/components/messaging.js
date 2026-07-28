import {
  CURRENT_COLOR_ICON_STYLE,
  MUTED_TEXT_PAINT_STYLE,
  PRIMARY_BORDER_FOCUS_STYLE,
  PRIMARY_FOCUS_STYLE,
  PRIMARY_TEXT_PAINT_STYLE,
  RAISED_CONTROL_SURFACE_STYLE,
  RAISED_STRONG_CONTROL_SURFACE_STYLE,
  RAISED_TEXT_STYLE,
  SECTION_HEADER_STYLE,
  SURFACE_TEXT_ONLY_STYLE,
  SURFACE_TEXT_STYLE,
  TEXT_PAINT_STYLE,
  THIN_SCROLLBAR_STYLE,
  TRANSPARENT_TEXT_STYLE,
} from "../shared-components.js";

export const MESSAGING_COMPONENT_STYLE = `  html[data-zb-theme]
    :is(.PushNotifications-menuContainer, .Messages-menuContainer) {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-menuContainer, .Messages-menuContainer)
    .Popover-arrow::after,
  html[data-zb-theme] .Popover-content > .Popover-arrow::after {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .TooltipContent,
  html[data-zb-theme] .TooltipContent.TooltipContent--white {
    background: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    .TooltipContent
    :where(.TooltipContent-children, div, span, p, strong) {
    color: inherit !important;
  }

  html[data-zb-theme] body .TooltipContent.TooltipContent--white,
  html[data-zb-theme] body .TooltipContent.TooltipContent--white * {
    ${TEXT_PAINT_STYLE}
    opacity: 1 !important;
  }

  html[data-zb-theme] .TooltipContent .TooltipContent-arrow::after,
  html[data-zb-theme]
    .TooltipContent.TooltipContent--white
    .TooltipContent-arrow::after {
    background: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme]
    :is(
      .PushNotifications-menu,
      .PushNotifications-content,
      .PushNotifications-header,
      .PushNotifications-list,
      .PushNotifications-footer,
      .Notifications-footer,
      .Messages-menu,
      .Messages-content,
      .Messages-header,
      .Messages-list,
      .Messages-footer
    ) {
    ${SURFACE_TEXT_STYLE}
    box-shadow: none !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-header, .Messages-header) {
    border-bottom: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-footer, .Notifications-footer, .Messages-footer) {
    border-top: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-list, .Messages-list) {${THIN_SCROLLBAR_STYLE}
  }

  html[data-zb-theme] .PushNotifications-tab,
  html[data-zb-theme] .Messages-tab {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .PushNotifications-tab:hover,
  html[data-zb-theme] .PushNotifications-tab:focus-visible,
  html[data-zb-theme] .Messages-tab:hover,
  html[data-zb-theme] .Messages-tab:focus-visible {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme] .PushNotifications-selectedTabIcon {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .PushNotifications-item,
  html[data-zb-theme] .Messages-item {
    background-color: transparent !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .PushNotifications-item::after,
  html[data-zb-theme] .Messages-item::after {
    background-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .PushNotifications-item:hover,
  html[data-zb-theme] .PushNotifications-item:focus-visible,
  html[data-zb-theme] .Messages-item:hover,
  html[data-zb-theme] .Messages-item:focus-visible {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme] .Messages-newItem {
    background-color: var(--zb-primary-soft) !important;
  }

  html[data-zb-theme] .PushNotifications-actor,
  html[data-zb-theme] .Messages-userName,
  html[data-zb-theme] .Messages-userName a {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .PushNotifications-item a {
    color: var(--zb-primary) !important;
    text-decoration-color: transparent !important;
    text-underline-offset: 2px !important;
  }

  html[data-zb-theme] .PushNotifications-item a:hover,
  html[data-zb-theme] .PushNotifications-item a:focus-visible {
    color: var(--zb-primary-hover) !important;
    text-decoration-color: currentColor !important;
  }

  html[data-zb-theme] .Messages-itemContent {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-menuContainer, .Messages-menuContainer)
    :is(.PushNotifications-footer, .Notifications-footer, .Messages-footer)
    :is(a.Button, button.Button) {
    background-color: transparent !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-menuContainer, .Messages-menuContainer)
    :is(.PushNotifications-footer, .Notifications-footer, .Messages-footer)
    :is(a.Button, button.Button):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme] .Messages-menuContainer .Messages-footer {
    box-sizing: border-box !important;
    min-height: 52px !important;
    height: 52px !important;
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    padding: 8px !important;
  }

  html[data-zb-theme]
    .Messages-menuContainer
    .Messages-footer
    > button.Button {
    box-sizing: border-box !important;
    min-width: 0 !important;
    height: 36px !important;
    flex: 1 1 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 12px !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 6px !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme]
    .Messages-menuContainer
    .Messages-footer
    > button.Button:first-child {
    background-color: var(--zb-primary-soft) !important;
    border-color: color-mix(
      in srgb,
      var(--zb-primary) 38%,
      var(--zb-border)
    ) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Messages-menuContainer
    .Messages-footer
    > button.Button:last-child {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme]
    .Messages-menuContainer
    .Messages-footer
    > button.Button:first-child:hover {
    background-color: color-mix(
      in srgb,
      var(--zb-primary) 20%,
      var(--zb-surface)
    ) !important;
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    .Messages-menuContainer
    .Messages-footer
    > button.Button:last-child:hover {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Messages-menuContainer
    .Messages-footer
    > button.Button:focus-visible {
    border-color: var(--zb-primary) !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme] .App-main .ChatWrapper > .Chat {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .App-main .Chat .ChatSideBar {
    background-color: var(--zb-surface) !important;
    border-right: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    :is(.ChatSideBar-Search, .ChatListGroup, .ChatListGroup-Section) {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .ChatSideBar-Search-Input
    input {
    box-sizing: border-box !important;
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .ChatSideBar-Search-Input:focus-within
    input {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme] .App-main .Chat .ChatSideBar-SearchIcon {
    color: var(--zb-text-muted) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .App-main .Chat .ChatListGroup-SectionTitle {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme] .App-main .Chat .ChatListGroup-SectionContent {${THIN_SCROLLBAR_STYLE}
  }

  html[data-zb-theme] .App-main .Chat .ChatUserListItem {
    box-sizing: border-box !important;
    width: calc(100% - 16px) !important;
    margin: 4px 8px !important;
    padding: 11px 12px !important;
    background-color: transparent !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 8px !important;
    color: var(--zb-text) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme] .App-main .Chat .ChatUserListItem::after,
  html[data-zb-theme]
    .App-main
    .Chat
    .ChatListGroup-SectionTitle--bottomBorder::after,
  html[data-zb-theme]
    .App-main
    .Chat
    .ChatListGroup-SectionTitle--topBorder::before {
    display: none !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .ChatUserListItem:is(:hover, :focus-within) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .ChatUserListItem:focus-within {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .ChatUserListItem:is(
      .is-active,
      .ChatUserListItem--active,
      [aria-selected="true"]
    ) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .ChatUserListItem
    .ChatUserListItem-Content {
    box-sizing: border-box !important;
    min-width: 0 !important;
    padding-right: 34px !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .ChatUserListItem
    .Chat-ActionMenuPopover-Button {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex: 0 0 30px !important;
    width: 30px !important;
    height: 30px !important;
    right: 6px !important;
    padding: 0 !important;
    background-image: none !important;
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .ChatUserListItem:is(
      :hover,
      :focus-within,
      .is-active,
      .ChatUserListItem--active,
      [aria-selected="true"]
    )
    .Chat-ActionMenuPopover-Button {
    opacity: 1 !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .ChatUserListItem
    .Chat-ActionMenuPopover-Button:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    background-image: none !important;
    color: var(--zb-text) !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .ChatUserListItem
    :is(.userName, .userName-nameArea) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .ChatUserListItem
    :is(time, .ChatUserListItem-Snippet) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .App-main .Chat .ChatBox-empty {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .App-main .Chat .ChatBox-emptyImage path {
    fill: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .ChatSideBar-Search--active {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .ChatSideBar-Search-ResultListWrap {
    background-color: var(--zb-surface) !important;
    border-top: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;${THIN_SCROLLBAR_STYLE}
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .ChatSideBar-Search-ResultListWrap
    .ChatUserListItem {${TRANSPARENT_TEXT_STYLE}
  }

  html[data-zb-theme]
    .App-main
    .Chat
    .ChatSideBar-Search-ResultListWrap
    .ChatUserListItem:is(:hover, :focus-within) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme][data-zb-messages-page="true"]
    [data-zb-action-menu-popover]
    > .ActionMenu {
    background-color: var(--zb-surface) !important;
    border-radius: 8px !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-messages-page="true"]
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

  html[data-zb-theme][data-zb-messages-page="true"]
    [data-zb-action-menu-popover]
    > .ActionMenu
    > .ActionMenu-item:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-messages-page="true"]
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

  html[data-zb-theme][data-zb-messages-page="true"]
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

  html[data-zb-theme]
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

  html[data-zb-theme] .ChatBoxModal > div:has(> .Modal-content) {
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
  }
`;
