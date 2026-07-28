import {
  CARD_FRAME_STYLE,
  CARD_SURFACE_STYLE,
  CURRENT_COLOR_ICON_STYLE,
  RAISED_CONTROL_SURFACE_STYLE,
  RAISED_STRONG_CONTROL_SURFACE_STYLE,
  SURFACE_TEXT_ONLY_STYLE,
} from "../shared-components.js";

export const DISCOVERY_COMPONENT_STYLE = `  html[data-zb-theme]
    .Topstory-mainColumnCard:is(
      :has(.Topstory-hot),
      :has(.hot-column-container)
    ),
  html[data-zb-theme]
    .Topstory-mainColumnCard:is(
      :has(.Topstory-hot),
      :has(.hot-column-container)
    )
    > .Topstory-content {
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    overflow: visible !important;
  }

  html[data-zb-theme]
    .Topstory-content
    > div
    > div:has(+ .Topstory-hot) {
    ${CARD_SURFACE_STYLE}
    margin-bottom: 12px !important;
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme]
    .Topstory-content
    > div
    > div:has(+ .Topstory-hot)
    div {
    background-color: transparent !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme]
    .Topstory-content
    > div
    > div:has(+ .Topstory-hot)
    a
    + a {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme] .Topstory-hot,
  html[data-zb-theme] .Topstory-hot .HotList-list {
    background-color: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
  }

  html[data-zb-theme] .Topstory-hot {
    padding-right: 0 !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem {
    box-sizing: border-box !important;
    width: 100% !important;
    ${CARD_FRAME_STYLE}
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    margin-left: 0 !important;
    margin-bottom: 10px !important;
    overflow: hidden !important;
    overflow: clip !important;
    padding: 16px !important;
    transition: border-color 0.16s ease !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem:hover {
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem-title {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Topstory-hot
    .HotItem
    > .HotItem-content
    > a:is(:hover, :focus-visible)
    .HotItem-title {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem-excerpt {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem-metrics,
  html[data-zb-theme] .Topstory-hot .HotItem-action .Button {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem-rank:not(.HotItem-hot) {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem-rank.HotItem-hot {
    color: var(--zb-warning) !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem-label {
    background-color: var(--zb-warning) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme] .hot-column-container {
    box-sizing: border-box !important;
    height: auto !important;
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
    margin-bottom: 12px !important;
    padding-bottom: 0 !important;
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme] .hot-column {
    background-color: transparent !important;
    border: 0 !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme] .hot-column .column-title,
  html[data-zb-theme] .hot-column .card .title {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .hot-column .sub-title,
  html[data-zb-theme] .hot-column .card :is(.name, .topic) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .hot-column .card {
    box-sizing: border-box !important;
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 10px !important;
    overflow: hidden !important;
    overflow: clip !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease !important;
  }

  html[data-zb-theme] .hot-column .card:is(:hover, :focus-within) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .hot-column .card a:focus-visible {
    outline: 2px solid var(--zb-primary) !important;
    outline-offset: 2px !important;
  }

  html[data-zb-theme] .hot-column .line {
    background-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .hot-column-container .more-container {
    box-sizing: border-box !important;
    position: static !important;
    height: auto !important;
    min-height: 0 !important;
    padding: 12px 16px 16px !important;${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme] .hot-column-container .more {
    box-sizing: border-box !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 4px !important;
    min-width: 96px !important;
    min-height: 34px !important;
    padding: 0 12px !important;
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 32px !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      box-shadow 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme]
    .hot-column-container
    .more:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .hot-column-container .more :is(svg, path) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme] .hot-column-container .more svg {
    width: 14px !important;
    height: 14px !important;
    flex: 0 0 14px !important;
  }

  html[data-zb-theme] .recommend-column {
    background-color: transparent !important;
    border: 0 !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  html[data-zb-theme] .recommend-column > div:first-child {
    padding-right: 16px !important;
    padding-left: 16px !important;
  }

  html[data-zb-theme] .recommend-column-content {
    width: 100% !important;
  }

  html[data-zb-theme] .recommend-column .subscrib-card {
    box-sizing: border-box !important;
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
    margin-bottom: 12px !important;
    overflow: hidden !important;
    overflow: clip !important;
    padding: 16px !important;
    transition: border-color 0.16s ease !important;
  }

  html[data-zb-theme]
    .recommend-column
    .subscrib-card:is(:hover, :focus-within) {
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .recommend-column .subscrib-card .card-top {
    margin-top: 0 !important;
  }

  html[data-zb-theme] .recommend-column .column-title,
  html[data-zb-theme] .recommend-column .title,
  html[data-zb-theme] .recommend-column .content-title {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .recommend-column
    :is(
      .author-name,
      .author-des,
      .column-info,
      .column-des-text,
      .article-text
    ) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .recommend-column .divider {
    background-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .recommend-column .subscrib-btn {
    background-color: var(--zb-primary-soft) !important;
    border-color: transparent !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .recommend-column
    .subscrib-btn:is(:hover, :focus-visible) {
    background-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

































































































































































































`;
