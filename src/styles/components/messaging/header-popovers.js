import { PRIMARY_FOCUS_STYLE } from "../../shared/actions.js";
import { TEXT_PAINT_STYLE, THIN_SCROLLBAR_STYLE } from "../../shared/content.js";
import { RAISED_TEXT_STYLE, SURFACE_TEXT_STYLE } from "../../shared/surfaces.js";

export const HEADER_MESSAGING_POPOVERS_STYLE = `  html[data-zb-theme]
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

`;
