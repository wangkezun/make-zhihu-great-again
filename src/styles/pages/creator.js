import {
  PRIMARY_FOCUS_STYLE,
  RAISED_PRIMARY_HOVER_STYLE,
  SOFT_PRIMARY_STATE_STYLE,
} from "../shared/actions.js";
import { CURRENT_COLOR_ICON_STYLE } from "../shared/content.js";
import {
  RAISED_CONTROL_SURFACE_STYLE,
  SURFACE_TEXT_ONLY_STYLE,
  SURFACE_TEXT_STYLE,
} from "../shared/surfaces.js";

export const CREATOR_PAGE_STYLE = `  html[data-zb-theme][data-zb-creator-page="true"] .CreatorHome {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .SearchBar[role="search"]
    > div:first-child {
    box-sizing: border-box !important;
    min-height: 38px !important;
    padding: 8px 12px !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 8px !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .SearchBar[role="search"]
    > div:first-child
    :where(div, span) {
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    div:has(
      > div:first-child
        > div:first-child
        > div:first-child
        > span
        > .ZDI--Lightbulb24
    )
    > div:nth-child(2)
    > div,
  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    div:has(
      > div:first-child > div:first-child > div:first-child > span > .ZDI--Fire24
    )
    > div:nth-child(2)
    > div {
    box-sizing: border-box !important;
    min-height: 30px !important;
    padding: 6px 12px !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 999px !important;
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    div:has(
      > div:first-child
        > div:first-child
        > div:first-child
        > span
        > .ZDI--Lightbulb24
    )
    > div:nth-child(2)
    > div:first-child,
  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    div:has(
      > div:first-child > div:first-child > div:first-child > span > .ZDI--Fire24
    )
    > div:nth-child(2)
    > div:first-child {
    background-color: var(--zb-primary-soft) !important;
    border-color: color-mix(in srgb, var(--zb-primary) 35%, var(--zb-border)) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    a[href*="/creator/search-question/"] {
    box-sizing: border-box !important;
    min-height: 34px !important;
    padding: 6px 12px !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 999px !important;
    color: var(--zb-text-secondary) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    a[href*="/creator/search-question/"]:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    div:has(> img[alt="reward"]) {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    [data-goalkeeper-selector="creator-home__announcement"] {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    [data-goalkeeper-selector="creator-home__announcement"]
    :where(div, span, a) {
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    [data-goalkeeper-selector="creator-home__announcementMore"] {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"] .CreatorIndex-BottomBox-Item {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    box-shadow: none !important;
    color: var(--zb-text-muted) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorIndex-BottomBox-Item:is(:hover, :focus-within) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorIndex-BottomBox-Item
    > svg {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator
    > div:first-child
    .LevelInfoV2-creatorInfo {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator
    > div:first-child
    a {
    color: var(--zb-text-muted) !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator
    > div:first-child
    a
    :where(div, span) {
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator
    > div:first-child
    div:has(> .ReactCollapse--collapse)
    > div:first-child {
    color: var(--zb-text-secondary) !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator
    > div:first-child
    div:has(> .ReactCollapse--collapse)
    > div:first-child
    :where(div, span, svg) {
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator
    > div:first-child
    :is(a, div:has(> .ReactCollapse--collapse) > div:first-child)
    svg {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator
    > div:first-child
    a[href="/creator"],
  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator
    > div:first-child
    :is(
      a[href="/creator/account/rights"],
      a[href="/creator/account/growth-level"]
    ) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator
    > div:first-child
    :is(a, div:has(> .ReactCollapse--collapse) > div:first-child):is(
      :hover,
      :focus-visible
    ) {${RAISED_PRIMARY_HOVER_STYLE}
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator
    > div:first-child
    a[href="/creator"] {
    background-color: var(--zb-primary-soft) !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator
    > div:first-child
    div:has(> a[href="/zvideo/upload-video"]) {
    z-index: 20 !important;
    background: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    color: var(--zb-text-secondary) !important;
    opacity: 1 !important;
    box-shadow: var(--zb-shadow) !important;
    isolation: isolate !important;
    overflow: hidden !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator
    > div:first-child
    div:has(> a[href="/zvideo/upload-video"])
    > a {
    background-color: transparent !important;
    color: var(--zb-text-secondary) !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator
    > div:first-child
    div:has(> a[href="/zvideo/upload-video"])
    > a
    :where(div, span, svg) {
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator
    > div:first-child
    div:has(> a[href="/zvideo/upload-video"])
    > a
    svg {
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator
    > div:first-child
    div:has(> a[href="/zvideo/upload-video"])
    > a:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
    box-shadow: inset 0 0 0 1px var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .Sticky:has(> .Tabs),
  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .Tabs {${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > div:has(> [role="list"]),
  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > div:has(> [role="list"])
    .Sticky {
    background-color: var(--zb-page) !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .Tabs-item {
    min-width: max-content !important;
    flex: 0 0 auto !important;
    padding-right: 4px !important;
    padding-left: 4px !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .Tabs {
    min-width: 0 !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    scrollbar-width: none !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .Tabs::-webkit-scrollbar {
    display: none !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .Tabs-link {
    box-sizing: border-box !important;
    width: auto !important;
    min-width: max-content !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 8px 0 !important;
    padding: 6px 12px !important;
    border-radius: 8px !important;
    color: var(--zb-text-secondary) !important;
    white-space: nowrap !important;
    transition:
      background-color 0.16s ease,
      box-shadow 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .Tabs-link::after {
    display: none !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .Tabs-link:is(:hover, :focus-visible) {${RAISED_PRIMARY_HOVER_STYLE}
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .Tabs-link:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .Tabs-link.is-active {
    ${SOFT_PRIMARY_STATE_STYLE}
    font-weight: 500 !important;
    box-shadow: inset 0 0 0 1px
      color-mix(in srgb, var(--zb-primary) 35%, transparent) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card
    > div {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme][data-zb-creator-page="true"][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > .Tabs
    + div {
    box-sizing: border-box !important;
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > .Tabs
    + div
    :where(div, span, p) {
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > .Tabs
    + div
    a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > .Tabs
    + div
    + div {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme][data-zb-creator-page="true"][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > .Tabs
    + div
    + div
    > div:first-child
    .Sticky {
    background-color: var(--zb-surface-raised) !important;
    border-bottom-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > .Tabs
    + div
    + div
    > div:first-child
    .Sticky
    :where(div, span, svg) {
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > .Tabs
    + div
    + div
    > div:not(:first-child) {
    background-color: var(--zb-surface) !important;
    border-bottom-color: var(--zb-border) !important;
    color: var(--zb-text-secondary) !important;
    transition: background-color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > .Tabs
    + div
    + div
    > div:not(:first-child):hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > .Tabs
    + div
    + div
    > div:not(:first-child)
    > div:nth-child(-n + 3) {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > .Tabs
    + div
    + div
    > div:not(:first-child)
    > div:nth-child(-n + 3)
    :where(div, span) {
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > .Tabs
    + div
    + div
    > div:not(:first-child)
    label:has(> input[type="checkbox"]) {
    background-color: var(--zb-surface-hover) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > .Tabs
    + div
    + div
    > div:not(:first-child)
    label:has(> input[type="checkbox"]:checked) {
    background-color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .Popover:has(> .Select-button[role="combobox"]) {
    box-sizing: border-box !important;
    height: 34px !important;
    padding: 0 10px 0 12px !important;
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    color: var(--zb-text-secondary) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      box-shadow 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .Popover:has(
      > .Select-button[role="combobox"]:is(
          :hover,
          :focus-visible,
          [aria-expanded="true"]
        )
    ) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .Select-button[role="combobox"] {
    height: 32px !important;
    padding: 0 !important;
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 8px !important;
    color: inherit !important;
    outline: 0 !important;
    box-shadow: none !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Popover-content:has(> .Select-list) {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 8px !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Popover-content
    > .Select-list {
    padding: 6px 0 !important;
    background-color: var(--zb-surface) !important;
    border-radius: 8px !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Popover-content
    > .Select-list
    > .Select-option {
    box-sizing: border-box !important;
    width: calc(100% - 12px) !important;
    margin: 0 6px !important;
    padding: 0 12px !important;
    background-color: transparent !important;
    border-radius: 6px !important;
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Popover-content
    > .Select-list
    > .Select-option:is(:hover, :focus, :focus-visible) {${RAISED_PRIMARY_HOVER_STYLE}
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .CreatorRangePicker-Button {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .CreatorRangePicker-Button:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > div:has(> [role="list"])
    > div:has(+ [role="list"])
    .Sticky
    > div:first-child {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .CreationManage-CreationCard {
    box-sizing: border-box !important;
    margin: 0 16px 10px !important;
    padding: 20px 16px !important;
    background-color: var(--zb-surface) !important;
    background-clip: padding-box !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    color: var(--zb-text-muted) !important;
    box-shadow: var(--zb-shadow) !important;
    transition: border-color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .CreationManage-CreationCard:hover {
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .CreationManage-CreationCard:focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow:
      0 0 0 2px var(--zb-primary-soft),
      var(--zb-shadow) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .CreationManage-CreationCard
    > a:first-of-type {
    color: var(--zb-primary) !important;
    transition: color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .CreationManage-CreationCard
    > a:first-of-type
    :where(div, span) {
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .CreationManage-CreationCard
    > a:first-of-type
    > div:last-child {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .CreationManage-CreationCard
    .CreationCardTitle-wrapper
    > div
    > div:first-child {
    ${SOFT_PRIMARY_STATE_STYLE}
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .CreationManage-CreationCard
    .CreationCardTitle-wrapper
    > div
    > span:last-child {
    color: var(--zb-primary) !important;
    font-size: 18px !important;
    font-weight: 500 !important;
    line-height: 1.5 !important;
    transition: color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .CreationManage-CreationCard
    > a:first-of-type:is(:hover, :focus-visible)
    .CreationCardTitle-wrapper
    > div
    > span:last-child {
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .CreationManage-CreationCard
    > a:first-of-type:focus-visible {
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .CreationManage-CreationCard
    > a:nth-of-type(2) {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .CreationManage-CreationCard
    > a:nth-of-type(2)
    :where(div, span) {
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .CreationManage-CreationCard
    > div:last-child
    :where(div, span) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .Creator-mainColumn
    > .Card
    .CreationManage-CreationCard
    > div:last-child
    :is(a, button):is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"] .Creator .skeleton {
    background-color: var(--zb-surface-raised) !important;
    background-image: linear-gradient(
      to right,
      var(--zb-surface-raised) 0%,
      var(--zb-surface-hover) 25%,
      var(--zb-surface-hover) 75%,
      var(--zb-surface-raised) 100%
    ) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"] .Creator .skeleton::after {
    background-color: color-mix(
      in srgb,
      var(--zb-surface-hover) 80%,
      transparent
    ) !important;
    box-shadow: 0 0 70px 70px
      color-mix(in srgb, var(--zb-surface-hover) 70%, transparent) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    :is(
      .WriteArea + div,
      .WriteArea + div > div,
      .WriteArea + div + div > div > div,
      .WriteArea + div + div + div > div,
      [role="complementary"] > div:not(.Card),
      [role="complementary"] > div:not(.Card):has(> div:only-child) > div
    ) {${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    :is(
      .WriteArea + div,
      .WriteArea + div + div > div > div,
      .WriteArea + div + div + div > div,
      [role="complementary"] > div:not(.Card):not(:has(> div:only-child)),
      [role="complementary"] > div:not(.Card):has(> div:only-child) > div
    ) {
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    .WriteArea
    > div
    > div:has(> section) {
    border-bottom-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    .WriteArea
    > div
    > div:has(> section)
    + div
    > div::after {
    border-color: transparent !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    .WriteArea
    > div
    > div:has(> section)
    + div
    + div
    > div
    > div {
    background-color: transparent !important;
    border-radius: 8px !important;
    color: var(--zb-text-secondary) !important;
    transition:
      background-color 0.16s ease,
      box-shadow 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    .WriteArea
    > div
    > div:has(> section)
    + div
    + div
    > div
    > div
    :where(div, span, svg) {
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    .WriteArea
    > div
    > div:has(> section)
    + div
    + div
    > div
    > div
    svg {
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    .WriteArea
    > div
    > div:has(> section)
    + div
    + div
    > div
    > div:is(:hover, :focus-visible) {${RAISED_PRIMARY_HOVER_STYLE}
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    .WriteArea
    > div
    > div:has(> section)
    + div
    + div
    > div
    > div:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    .WriteArea
    > div
    > div:has(> section)
    + div
    + div
    > div
    > div:has(> :is(.ZDI--Earth24, .ZDI--PaperTextInitial24))
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    .WriteArea
    > div
    > div:has(> section)
    + div
    + div
    > div
    > div:has(> .ZDI--Broadcast16)
    > div:last-child {
    ${SOFT_PRIMARY_STATE_STYLE}
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    .WriteArea
    + div
    > div:first-child
    a[href^="/creator/analytics/work/"]
    > div {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    [role="complementary"]
    > div:not(.Card):not(:has(> div:only-child))
    > div:last-child {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    [role="complementary"]
    > div:not(.Card):not(:has(> div:only-child))
    > div:not(:has(a, button, img))
    div[class]:empty {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    :is(
      .WriteArea + div,
      .WriteArea + div + div > div > div,
      .WriteArea + div + div + div > div,
      [role="complementary"] > div:not(.Card),
      [role="complementary"] > div:not(.Card):has(> div:only-child) > div
    )
    :where(div, span, p, strong) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    :is(
      .WriteArea + div,
      .WriteArea + div + div > div > div,
      .WriteArea + div + div + div > div,
      [role="complementary"] > div:not(.Card),
      [role="complementary"] > div:not(.Card):has(> div:only-child) > div
    )
    a {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-creator-page="true"]
    .CreatorHome
    :is(
      .WriteArea + div,
      .WriteArea + div + div > div > div,
      .WriteArea + div + div + div > div,
      [role="complementary"] > div:not(.Card),
      [role="complementary"] > div:not(.Card):has(> div:only-child) > div
    )
    :is(a, button):is(:hover, :focus-visible) {
    color: var(--zb-primary) !important;
  }
`;
