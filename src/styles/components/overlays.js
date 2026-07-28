import { MESSAGING_COMPONENT_STYLE } from "./messaging.js";
import {
  CARD_FRAME_STYLE,
  CURRENT_COLOR_ICON_STYLE,
  MUTED_TEXT_PAINT_STYLE,
  PRIMARY_BORDER_FOCUS_STYLE,
  PRIMARY_BUTTON_HOVER_STYLE,
  PRIMARY_TEXT_PAINT_STYLE,
  RAISED_MUTED_CONTROL_STYLE,
  RAISED_STRONG_CONTROL_SURFACE_STYLE,
  RAISED_TEXT_STYLE,
  SECTION_HEADER_STYLE,
  SOFT_PRIMARY_STATE_STYLE,
  SURFACE_TEXT_ONLY_STYLE,
  SURFACE_TEXT_STYLE,
  TEXT_PAINT_STYLE,
  THIN_SCROLLBAR_STYLE,
  TRANSPARENT_TEXT_STYLE,
} from "../shared-components.js";

export const OVERLAYS_COMPONENT_STYLE = `  html[data-zb-theme] div:has(> .Modal-content) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .Modal .Topbar {
    background-color: var(--zb-surface) !important;
    border-bottom-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    div:has(> .Modal-content > .VoterList) {
    box-sizing: border-box !important;
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .Modal-content:has(> .VoterList) {
    background-color: var(--zb-surface) !important;
    border-radius: inherit !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .VoterList > .Topbar {
    ${SECTION_HEADER_STYLE}
  }

  html[data-zb-theme] .VoterList-content {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme]
    .VoterList-content
    :is(
      .Skeleton,
      [class*="skeleton" i],
      .PlaceHolder,
      .PlaceHolder-inner,
      [class*="placeholder" i],
      [class*="loading" i],
      [aria-busy="true"]
    ) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .VoterList-content
    img.Avatar:is(:not([src]), [src=""]) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme] .VoterList-content .List-item {
    background-color: transparent !important;
    transition: background-color 0.16s ease !important;
  }

  html[data-zb-theme]
    .VoterList-content
    .List-item:is(:hover, :focus-within) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme] .VoterList-content .List-item::after {
    border-bottom-color: var(--zb-border) !important;
  }

  html[data-zb-theme]
    .VoterList-content
    :is(.ContentItem-title, .UserItem-title, .UserLink-link) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .VoterList-content
    :is(.ContentItem-meta, .ContentItem-statusItem) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .VoterList-content img.Avatar {
    background-color: var(--zb-surface-raised) !important;
    border-radius: 50% !important;
  }

  html[data-zb-theme]
    .VoterList-content
    .FollowButton.Button--grey {
    -webkit-text-fill-color: var(--zb-text-muted) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme]
    .VoterList-content
    .FollowButton.Button--grey:is(:hover, :focus-visible) {
    -webkit-text-fill-color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    .VoterList-content
    .FollowButton.Button--grey:is(:hover, :focus-visible)
    :where(span, svg, path) {
    ${CURRENT_COLOR_ICON_STYLE}
    -webkit-text-fill-color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    .Modal:has(.SendGiftModal-GiftListWrapper)
    .Modal-content
    > div
    > div:has(+ div + div > .SendGiftModal-GiftListWrapper),
  html[data-zb-theme]
    .Modal:has(.SendGiftModal-RedpacketListWrapper)
    .Modal-content
    > div
    > div:has(+ div > .SendGiftModal-RedpacketListWrapper) {
    ${TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(.SendGiftModal-RedpacketListWrapper)
    .Modal-content
    > div
    > div:has(+ div > .SendGiftModal-RedpacketListWrapper)
    > button {
    ${MUTED_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(.SendGiftModal-RedpacketListWrapper)
    .Modal-content
    > div
    > div:has(+ div > .SendGiftModal-RedpacketListWrapper)
    > button:is(:hover, :focus-visible) {
    ${PRIMARY_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(.SendGiftModal-GiftListWrapper)
    .Modal-content
    > div
    > div:has(+ div > .SendGiftModal-GiftListWrapper),
  html[data-zb-theme]
    .Modal:has(.SendGiftModal-GiftListWrapper)
    .SendGiftModal-GiftListWrapper
    > div
    > div:last-child {
    ${MUTED_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal
    .SendGiftModal-GiftListWrapper
    > div
    > div:not(:last-child),
  html[data-zb-theme]
    .Modal
    .SendGiftModal-RedpacketListWrapper
    > div
    > div,
  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:not(:last-child)
    :where(div, span) {
    ${TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal
    .SendGiftModal-RedpacketListWrapper
    > div:not(:empty) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:not(:last-child) {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:first-child
    > div:nth-child(2),
  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:nth-child(2)
    span,
  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:last-child {
    ${MUTED_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(> button):last-child
    > div:first-child {
    ${TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    a[href*="/grapp/protocol/payment"] {
    ${PRIMARY_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(> button):last-child
    > div:nth-child(2),
  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:first-child
    > div:last-child {
    color: var(--zb-danger) !important;
    -webkit-text-fill-color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    )
    .Modal-closeIcon {
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder="0"])
    .Modal-content
    > div
    > div:nth-child(2),
  html[data-zb-theme]
    .Modal:has(input[placeholder="0"])
    input[placeholder="0"] {
    ${TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder="0"])
    input[placeholder="0"]::placeholder {
    color: var(--zb-text-subtle) !important;
    -webkit-text-fill-color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme] .FavlistsModal .Modal-inner {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .FavlistsModal :is(.Modal-title, .Favlists-itemNameText) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    :is(.Modal-subtitle, .Favlists-itemContent, .Favlists-itemIcon) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-items {${THIN_SCROLLBAR_STYLE}
  }

  html[data-zb-theme] .FavlistsModal .Favlists-item {
    box-sizing: border-box !important;
    width: 100% !important;
    min-width: 0 !important;
    padding: 8px 10px !important;
    background-color: transparent !important;
    border-bottom-color: var(--zb-border) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    .Favlists-item:is(:hover, :focus-within) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-itemInner {
    flex: 1 1 auto !important;
    min-width: 0 !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-itemName {
    min-width: 0 !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-itemNameText {
    min-width: 0 !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-updateButton {
    flex: 0 0 76px !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-updateButton.Button--blue,
  html[data-zb-theme] .FavlistsModal .Favlists-addButton {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    border-radius: 6px !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    :is(.Favlists-updateButton.Button--blue, .Favlists-addButton):hover {
    ${PRIMARY_BUTTON_HOVER_STYLE}
  }

  html[data-zb-theme] .FavlistsModal .Favlists-actions {
    background-color: var(--zb-surface) !important;
    border-top-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .FavlistsModal .Modal-closeButton {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    .Modal-closeButton:is(:hover, :focus-visible) {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme]
    .FavlistsModal
    .Favlists-updateButton.Button--grey {
    position: relative !important;
    border-radius: 6px !important;
    ${RAISED_MUTED_CONTROL_STYLE}
  }

  html[data-zb-theme]
    body
    .FavlistsModal
    .Favlists-updateButton.Button--grey:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: transparent !important;
    -webkit-text-fill-color: transparent !important;
  }

  html[data-zb-theme]
    body
    .FavlistsModal
    .Favlists-updateButton.Button--grey:is(:hover, :focus-visible)::after {
    content: "取消收藏" !important;
    position: absolute !important;
    inset: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: var(--zb-danger) !important;
    -webkit-text-fill-color: var(--zb-danger) !important;
    font-size: 14px !important;
    line-height: normal !important;
  }

  html[data-zb-theme]
    body
    .FavlistsModal
    .Favlists-updateButton.Button--grey:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-danger-soft) !important;
  }

  html[data-zb-theme] [data-zb-arrow-action-panel-wrapper] {
    background-color: transparent !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme] [data-zb-arrow-action-panel] {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    [data-zb-arrow-action-panel]
    > div:nth-child(2) {
    background-color: transparent !important;
  }

  html[data-zb-theme]
    [data-zb-arrow-action-panel]
    > div:first-child
    span {
    ${TEXT_PAINT_STYLE}
    font-weight: 600 !important;
  }

  html[data-zb-theme]
    [data-zb-arrow-action-panel]
    > div:nth-child(3)
    button {
    ${PRIMARY_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    [data-zb-arrow-action-panel]
    button {
    box-sizing: border-box !important;
    min-width: max-content !important;
    padding: 4px 8px !important;
    border-radius: 6px !important;
    white-space: nowrap !important;
  }

  html[data-zb-theme]
    [data-zb-arrow-action-panel]
    button:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-radius: 6px !important;
    box-shadow: inset 0 0 0 1px var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    [data-zb-arrow-action-panel]
    :is(svg, path) {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .WriteArea,
  html[data-zb-theme] .Topstory-mainColumnCard {
    background-clip: padding-box !important;
    border-radius: 12px !important;
  }

${MESSAGING_COMPONENT_STYLE}
  html[data-zb-theme] .Topstory-mainColumnCard {
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme] .TopstoryItem,
  html[data-zb-theme] .ContentItem,
  html[data-zb-theme] .List-item,
  html[data-zb-theme] .Menu-item,
  html[data-zb-theme] .Menu-divider {
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme] h1,
  html[data-zb-theme] h2,
  html[data-zb-theme] h3,
  html[data-zb-theme] h4,
  html[data-zb-theme] h5,
  html[data-zb-theme] h6,
  html[data-zb-theme] .ContentItem-title,
  html[data-zb-theme] .AuthorInfo-name,
  html[data-zb-theme] .RichContent,
  html[data-zb-theme] .RichText {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .TopstoryItem .RichContent-inner,
  html[data-zb-theme] .TopstoryItem .RichContent-inner .RichText {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme] .ContentItem-meta,
  html[data-zb-theme] .ContentItem-time,
  html[data-zb-theme] .AuthorInfo-badgeText,
  html[data-zb-theme] .RichContent-actions,
  html[data-zb-theme] .Button:not(.Button--blue):not(.VoteButton) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] a:hover,
  html[data-zb-theme] .ContentItem-title a:hover,
  html[data-zb-theme] .RichText a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Button:not(.Button--blue):not(.VoteButton):hover,
  html[data-zb-theme] .Menu-item:hover {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme] .Popover-content .Menu > .Menu-item {
    box-sizing: border-box !important;
    width: calc(100% - 12px) !important;
    margin-right: 6px !important;
    margin-left: 6px !important;
    padding-right: 14px !important;
    padding-left: 14px !important;
    border-radius: 4px !important;
  }

  html[data-zb-theme]
    .Popover-content
    .Menu
    > .Menu-item:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .Editable-languageSuggestions,
  html[data-zb-theme] .Editable-languageSuggestions .Popover-content,
  html[data-zb-theme] .Editable-languageSuggestionsMenu,
  html[data-zb-theme] .TopicSuggestion-Popover,
  html[data-zb-theme] .TopicSuggestion-Popover-container {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme] .Editable-languageSuggestions .Menu-item,
  html[data-zb-theme] .TopicSuggestion-Popover .Menu-item {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme] .TopicSuggestion-TopicItem,
  html[data-zb-theme] .TopicSuggestion-TopicItem .topic-name {${TRANSPARENT_TEXT_STYLE}
  }

  html[data-zb-theme] .TopicSuggestion-TopicItem .pin-count {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .TopicSuggestion-TopicItem .new-topic {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .TopicInputAlias-suggestionContainer,
  html[data-zb-theme] .MentionSuggestions-menu {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme] .TopicInputAlias-suggestionContainer .Menu-item,
  html[data-zb-theme] .MentionSuggestions-menu .Menu-item {${TRANSPARENT_TEXT_STYLE}
  }

  html[data-zb-theme] .TopicInputAlias-suggestionContainer .AutoComplete-DefaultItem,
  html[data-zb-theme] .MentionSuggestions-menu .AutoComplete-UserItem,
  html[data-zb-theme] .MentionSuggestions-menu .AutoComplete-UserDetail {
    background-color: transparent !important;
    color: inherit !important;
  }

  html[data-zb-theme] .TopicInputAlias-suggestionContainer .Menu-item:hover,
  html[data-zb-theme] .TopicInputAlias-suggestionContainer .Menu-item:focus,
  html[data-zb-theme] .TopicInputAlias-suggestionContainer .Menu-item.is-active,
  html[data-zb-theme] .MentionSuggestions-menu .Menu-item:hover,
  html[data-zb-theme] .MentionSuggestions-menu .Menu-item:focus,
  html[data-zb-theme] .MentionSuggestions-menu .Menu-item.is-active {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme] .MentionSuggestions-menu .AutoComplete-UserName {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .MentionSuggestions-menu .AutoComplete-UserHeadline {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .MentionSuggestions-menu .AutoComplete-UserSocialTag {
    background-color: var(--zb-primary-soft) !important;
    border-color: color-mix(in srgb, var(--zb-primary) 35%, transparent) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Editable-languageSuggestions .Menu-item:hover,
  html[data-zb-theme] .Editable-languageSuggestions .Menu-item.is-active,
  html[data-zb-theme] .TopicSuggestion-Popover .Menu-item:hover,
  html[data-zb-theme] .TopicSuggestion-Popover .Menu-item.is-active {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme] .EmoticonPopover {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .EmoticonPopover > svg {
    fill: var(--zb-surface) !important;
    color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    .EmoticonPopover
    > div:last-child
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    border-top: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme]
    .EmoticonPopover
    > div:last-child
    > div:last-child
    > ul {
    background-color: transparent !important;
  }

  html[data-zb-theme]
    .EmoticonPopover
    > div:last-child
    > div:first-child
    li {
    padding-block: 2px !important;
    padding-inline: 3px !important;
  }

  html[data-zb-theme]
    .EmoticonPopover
    > div:last-child
    > div:last-child
    > ul
    > li {
    background-color: transparent !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .EmoticonPopover
    > div:last-child
    > div:last-child
    > ul
    > .css-1c21y8s {
    background-color: var(--zb-primary-soft) !important;
  }

  html[data-zb-theme] .EmoticonPopover li:hover,
  html[data-zb-theme] .EmoticonPopover li:focus-visible {
    background-color: var(--zb-surface-hover) !important;
    outline-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
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

  html[data-zb-theme] .ReferenceModal :is(.InputLike, .Select-button) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .ReferenceModal
    :is(.InputLike, .Select-button):is(:hover, :focus, :focus-within) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    ) {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
    border-radius: 8px !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:first-child
    :where(h1, h2, h3, p, div, span, label) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:first-child
    a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    border-top: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:last-child
    > div:first-child,
  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:last-child
    > div:first-child
    :where(div, span, label) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:last-child
    a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    > div:first-child {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    [dir="auto"] {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    [tabindex="0"] {
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    [tabindex="0"]:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    [tabindex="0"]
    [dir="auto"] {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Modal:has(canvas[alt="二维码"]) .Modal-content div {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(canvas[alt="二维码"])
    .Modal-content
    > div
    > div
    > div
    > div:first-child
    > div:first-child
    > div:first-child {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(canvas[alt="二维码"])
    .Modal-content
    > div
    > div
    > div
    > div:first-child
    > div:first-child
    > div:last-child,
  html[data-zb-theme]
    .Modal:has(canvas[alt="二维码"])
    .Modal-content
    > div
    > div
    > div
    > div:nth-last-child(2),
  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:first-child,
  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:has(> svg + div)
    > svg
    + div {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:has(> svg + div) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:has(> svg + div)
    > svg {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:last-child,
  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:last-child
    div {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:last-child
    a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Editable-videoModal .Modal-inner,
  html[data-zb-theme] .Editable-videoModal .Modal-content {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme] .Editable-videoModal-title,
  html[data-zb-theme] .Editable-videoModal-uploader-text {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Editable-videoModal-uploader {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .Editable-videoModal-uploader:hover {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Editable-videoModal-uploader-icon {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Editable-videoModal-uploader-tip,
  html[data-zb-theme] .Editable-videoModal .Modal-footer,
  html[data-zb-theme] .Editable-videoModal .Modal-footer p {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .Editable-videoModal .Modal-footer {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .Editable-videoModal .Modal-footer a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Editable-videoModal .Modal-closeButton {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .VoteTypeSelectorPopover,
  html[data-zb-theme] .VoteTypeSelectorPopover > div > div {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme] .VoteTypeSelectorPopover > div > div:hover,
  html[data-zb-theme] .VoteTypeSelectorPopover > div > div:focus,
  html[data-zb-theme] .VoteTypeSelectorPopover > div > div:focus-within {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme] .CommentSetting-submenuBox,
  html[data-zb-theme] .RingSetting-submenuBox {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .CommentSetting-submenuBox > div {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme] .CommentSetting-submenuBox > div:hover,
  html[data-zb-theme] .CommentSetting-submenuBox > div:focus,
  html[data-zb-theme] .CommentSetting-submenuBox > div:focus-within {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .CommentSetting-submenuBox .ZDI--Check24 {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox > div:first-child,
  html[data-zb-theme] .RingSetting-submenuBox > div:nth-child(3) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox > div:first-child div {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox > div:first-child > div:first-child,
  html[data-zb-theme] .RingSetting-submenuBox > div:nth-child(3) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox > div:first-child svg {
    color: var(--zb-text-muted) !important;
    fill: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox .Input-wrapper {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox .Input-wrapper:focus-within {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme] .RingSetting-submenuBox .Input-wrapper input {${TRANSPARENT_TEXT_STYLE}
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img) {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img):hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img)
    > div:nth-child(2)
    > div:first-child
    > div:first-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img)
    > div:nth-child(2)
    > div:last-child {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img)
    > div:nth-child(2)
    > div:first-child
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img)
    > div:last-child {
    ${SOFT_PRIMARY_STATE_STYLE}
  }

  html[data-zb-theme]
    .VoteTypeSelectorPopover
    > div
    > div
    > div:first-child
    > div:last-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .VoteTypeSelectorPopover
    > div
    > div
    > div:last-child:not(:first-child) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    .Modal-content
    > div
    > div:first-child {
    background-color: transparent !important;
    border: 0 !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    div:has(> input[type="text"]) {
    box-sizing: border-box !important;
    min-width: 0 !important;
    padding: 0 10px !important;
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 4px !important;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    div:has(> input[type="text"]):focus-within {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    input[type="text"] {
    box-sizing: border-box !important;
    width: 100% !important;
    min-width: 0 !important;
    padding: 0 !important;
    background-color: transparent !important;
    border: 0 !important;
    outline: 0 !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    input[type="text"]::placeholder {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    .Modal-content
    > div
    > div:nth-child(2)
    > div:first-child
    div {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    .Modal-content
    > div
    > div:nth-child(2)
    > div:first-child
    svg {
    color: var(--zb-text-muted) !important;
    fill: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    div:has(> div > input[placeholder^="请填写选项"])
    > div:first-child {
    background-color: var(--zb-surface-hover) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    div:has(> div > input[placeholder^="请填写选项"])
    > div:first-child
    div {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    .Modal-content
    div:has(> svg.ZDI--Plus24 + div) {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    .Modal-content
    div:has(> svg.ZDI--Plus24 + div):hover {
    background-color: var(--zb-surface-hover) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    .Modal-content
    div:has(> svg.ZDI--Plus24 + div)
    :where(svg, div) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-poll-modal-open="true"]
    [data-zb-poll-option-popover] {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    scrollbar-color: var(--ctp-overlay0) transparent;
  }

  html[data-zb-theme][data-zb-poll-modal-open="true"]
    [data-zb-poll-option-popover]
    > svg {
    color: var(--zb-surface) !important;
    fill: var(--zb-surface) !important;
  }

  html[data-zb-theme][data-zb-poll-modal-open="true"]
    [data-zb-poll-option-popover]
    > svg
    + div
    > div {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme][data-zb-poll-modal-open="true"]
    [data-zb-poll-option-popover]
    > svg
    + div
    > div:hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }
`;
