import {
  OUTLINED_PRIMARY_BUTTON_STYLE,
  PRIMARY_FOCUS_STYLE,
  RAISED_MUTED_CONTROL_STYLE,
} from "../shared/actions.js";
import {
  CURRENT_COLOR_ICON_STYLE,
  MUTED_TEXT_PAINT_STYLE,
  PRIMARY_TEXT_PAINT_STYLE,
  SECONDARY_TEXT_PAINT_STYLE,
  TEXT_PAINT_STYLE,
} from "../shared/content.js";
import { RAISED_TEXT_STYLE, SURFACE_TEXT_STYLE } from "../shared/surfaces.js";

export const PROFILE_PAGE_STYLE = `  html[data-zb-theme][data-zb-profile-page="true"] .ProfileHeader > .Card,
  html[data-zb-theme][data-zb-profile-page="true"] .ProfileHeader-wrapper,
  html[data-zb-theme][data-zb-profile-page="true"] .ProfileHeader-content {${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"] .ProfileHeader > .Card {
    background-clip: padding-box !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader-userCover
    :is(.UserCover, .UserCoverGuide) {
    border-radius: 12px 12px 0 0 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader-userCover
    .UserCoverGuide {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader-userCover
    .UserCoverGuide-buttonContainer
    > button {
    box-sizing: border-box !important;
    min-height: 36px !important;
    padding: 6px 12px !important;
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    color: var(--zb-text-secondary) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader-userCover
    .UserCoverGuide-buttonContainer
    > button:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader-userCover
    .UserCoverGuide-buttonContainer
    > button:focus-visible {
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"] .ProfileHeader-wrapper {
    border-radius: 0 0 12px 12px !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .ProfileHeader .UserAvatar {
    background-color: var(--zb-surface) !important;
    box-shadow: 0 0 0 4px var(--zb-surface) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader
    :is(.ProfileHeader-name, .ProfileHeader-detailValue) {
    ${TEXT_PAINT_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader
    :is(.ProfileHeader-headline, .ProfileHeader-info, .ProfileHeader-detailItem) {${SECONDARY_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader
    :is(.ProfileHeader-detailLabel, .ProfileHeader-expandButton) {
    ${MUTED_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader
    .ProfileHeader-expandButton:hover {
    background-color: transparent !important;
    ${PRIMARY_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader
    .ProfileHeader-expandButton:focus-visible {
    border-radius: 6px !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader
    .ProfileHeader-iconWrapper {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader
    .ProfileHeader-iconWrapper
    svg {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"] .ProfileHeader-divider {
    background-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .UserCoverGuide-dialog {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .UserCoverGuide-dialog
    :is(.UserCoverGuide-dialogHead, h4) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .UserCoverGuide-dialog
    :is(.UserCoverGuide-dialogContent, .UserCoverGuide-dialogDescription) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .UserCoverGuide-dialog a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader-buttons
    .Button {
    box-sizing: border-box !important;
    min-height: 34px !important;
    border-radius: 6px !important;
    font-weight: 500 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader-buttons
    .FollowButton
    + .Button {${OUTLINED_PRIMARY_BUTTON_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"] .ProfileMain {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    background-clip: padding-box !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    :is(.ProfileMain-header, .ProfileMain-tabsWrapper, .ProfileMain-tabs) {${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"] .ProfileMain-header {
    border-bottom: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-tabs
    .Tabs-link {
    color: var(--zb-text-secondary) !important;
    transition: color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-tabs
    .Tabs-link:hover {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-tabs
    .Tabs-link.is-active {
    color: var(--zb-primary) !important;
    font-weight: 600 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-tabs
    .Tabs-link:focus-visible {
    border-radius: 6px !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-tabs
    .Tabs-meta {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-header
    div:has(> button :is(.Zi--Search, .ZDI--Search24, [class*="Search"])) {
    background: linear-gradient(
      to left,
      var(--zb-surface) 0,
      var(--zb-surface) 56px,
      transparent 100%
    ) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-header
    button:has(:is(.Zi--Search, .ZDI--Search24, [class*="Search"])) {${RAISED_MUTED_CONTROL_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-header
    button:has(:is(.Zi--Search, .ZDI--Search24, [class*="Search"])):hover {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .ProfileMain .List-header {
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    :is(.List-header, .List-item)::after {
    background-color: var(--zb-border) !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .ProfileMain .List-item {
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-lineComments
    .List-item
    > div
    > div
    > div
    > a:first-child
    > div {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-lineComments
    .List-item
    > div
    > div
    > div
    > div:last-child
    > div:last-child
    > a
    > div {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-lineComments
    .List-item
    > div
    > div
    > div
    > div:last-child
    > div:last-child
    > div:last-child,
  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-lineComments
    .List-item
    > div
    > div
    > div
    > div:last-child
    > div:last-child
    > div:last-child
    > div {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-lineComments
    .List-item
    a:hover
    > div {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .Button:not(.VoteButton) {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .Button--iconOnly:not(.VoteButton) {
    min-width: 28px !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .VoteButton {
    box-sizing: border-box !important;
    height: 34px !important;
    padding-inline: 10px !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .VoteButton:disabled {
    background-color: var(--zb-surface-raised) !important;
    border-color: transparent !important;
    color: var(--zb-text-subtle) !important;
    cursor: not-allowed !important;
    opacity: 0.72 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .Profile-sideColumn {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .Profile-sideColumn .Card,
  html[data-zb-theme][data-zb-profile-page="true"] .Profile-sideColumn .Profile-lightList {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    background-clip: padding-box !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(a[href="/creator"], a[href="/question/waiting"]) {
    box-sizing: border-box !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-height: 40px !important;
    background-color: transparent !important;
    border: 1px solid var(--zb-primary) !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    font-weight: 500 !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      box-shadow 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(a[href="/creator"], a[href="/question/waiting"])
    svg {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(
      .Profile-sideColumnTitle,
      .Profile-sideColumnItemValue,
      .Profile-lightItemValue,
      .NumberBoard-itemValue,
      .ProfileSideCreator-readCountNumber
    ) {
    ${TEXT_PAINT_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(
      .Profile-sideColumnItemTitle,
      .Profile-lightItemName,
      .NumberBoard-itemName,
      .ProfileSideCreator-readCountTitle
    ) {
    ${MUTED_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(
      .NumberBoard-itemInner,
      .Profile-sideColumnItem,
      .Profile-lightItem
    ),
  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(
      .Card-header,
      .Profile-footerOperations,
      .ProfileSideCreator-readCountItem
    ) {
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    .Profile-lightItem {
    border-top: 1px solid var(--zb-border) !important;
    border-bottom: 0 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    .Profile-lightItem:first-child {
    border-top: 0 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(.NumberBoard-item.Button, .Profile-lightItem):hover {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(.NumberBoard-item.Button, .Profile-lightItem):focus-visible {
    border-radius: 6px !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(.Footer, footer) {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(.Footer, footer)
    :where(a, button, div, span, p, svg) {
    color: inherit !important;
  }

`;
