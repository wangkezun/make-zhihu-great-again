import { PRIMARY_BORDER_FOCUS_STYLE, PRIMARY_FOCUS_STYLE } from "../../shared/actions.js";
import { THIN_SCROLLBAR_STYLE } from "../../shared/content.js";
import {
  RAISED_STRONG_CONTROL_SURFACE_STYLE,
  SURFACE_TEXT_ONLY_STYLE,
  TRANSPARENT_TEXT_STYLE,
} from "../../shared/surfaces.js";

export const CHAT_PAGE_SIDEBAR_STYLE = `  html[data-zb-theme] .App-main .ChatWrapper > .Chat {
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

`;
