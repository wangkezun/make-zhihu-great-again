import {
  CARD_FRAME_STYLE,
  CARD_SURFACE_STYLE,
  CURRENT_COLOR_ICON_STYLE,
  MUTED_TEXT_PAINT_STYLE,
  PRIMARY_BUTTON_HOVER_STYLE,
  PRIMARY_BUTTON_STYLE,
  PRIMARY_FOCUS_STYLE,
  PRIMARY_TEXT_PAINT_STYLE,
  RAISED_CONTROL_SURFACE_STYLE,
  RAISED_STRONG_CONTROL_SURFACE_STYLE,
  SECONDARY_TEXT_PAINT_STYLE,
  SURFACE_TEXT_ONLY_STYLE,
} from "../shared-components.js";

export const SEARCH_PAGE_STYLE = `  html[data-zb-theme] .SearchTabs {
    background-color: var(--zb-surface) !important;
    border-bottom: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .SearchTabs .Tabs-link,
  html[data-zb-theme] .SearchTabs-customFilterEntry {
    color: var(--zb-text-muted) !important;
    transition: color 0.16s ease !important;
  }

  html[data-zb-theme] .SearchTabs .Tabs-link:hover,
  html[data-zb-theme] .SearchTabs .Tabs-link.is-active,
  html[data-zb-theme] .SearchTabs-customFilterEntry:hover,
  html[data-zb-theme] .SearchTabs-customFilterEntry:focus-visible {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .SearchTabs .Tabs-link:focus-visible {
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme] .Search-container,
  html[data-zb-theme] .SearchMain,
  html[data-zb-theme] .HotLanding {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .SearchMain :is(.PlaceHolder, .PlaceHolder-inner) {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme] .SearchMain > .ListShortcut,
  html[data-zb-theme] .SearchMain > .ListShortcut > .List {
    background-color: transparent !important;
  }

  html[data-zb-theme] .SearchMain .SearchResult-Card,
  html[data-zb-theme] .SearchMain .List > .Card:has(> .PlaceHolder) {
    box-sizing: border-box !important;
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .SearchMain .SearchResult-Card {
    padding-top: 0 !important;
    transition: border-color 0.16s ease !important;
  }

  html[data-zb-theme] .SearchMain .SearchResult-Card:hover {
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .SearchMain .SearchResult-Card:focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow:
      0 0 0 2px var(--zb-primary-soft),
      var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    .SearchMain
    .List-item:has(.HotLanding-title)
    > div
    > div:has(.ZDI--BrandZhihuLabelSparkleAlt) {
    box-sizing: border-box !important;
    min-height: 34px !important;
    padding: 8px 12px !important;
    background-color: var(--zb-surface-raised) !important;
    border-top: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .SearchMain
    .List-item:has(.HotLanding-title)
    > div
    > div:has(.ZDI--BrandZhihuLabelSparkleAlt)
    :where(div, span) {
    color: inherit !important;
  }

  html[data-zb-theme]
    .SearchMain
    :is(
      .KfeCollection-PcCollegeCard-wrapper,
      .KfeCollection-PcCollegeCard-root,
      .KfeCollection-PcCollegeCard
    ) {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme]
    .SearchMain
    .SearchResult-Card
    :is(.ContentItem-title, .ContentItem-title a) {
    color: var(--zb-primary) !important;
    transition: color 0.16s ease !important;
  }

  html[data-zb-theme]
    .SearchMain
    .SearchResult-Card
    :is(
      .ContentItem-title:hover,
      .ContentItem-title:focus-within,
      .ContentItem-title a:hover,
      .ContentItem-title a:focus-visible
    ) {
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    .SearchMain
    .SearchResult-Card
    :is(
      .RichContent-inner,
      .RichContent-inner .RichText,
      .SearchItem-meta.Highlight
    ) {${SECONDARY_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .SearchMain
    .SearchResult-Card
    .FollowButton.Button--grey {
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .SearchMain
    .SearchResult-Card
    .FollowButton.Button--grey:is(:hover, :focus-visible),
  html[data-zb-theme]
    .SearchMain
    .SearchResult-Card:has(
      > .List-item h2 a:is([href*="/people/"], [href*="/org/"])
    )
    .FollowButton.Button--grey:is(:hover, :focus-visible) {
    -webkit-text-fill-color: var(--zb-danger) !important;
  }

  html[data-zb-theme] .SearchMain .List > .Card:has(> .PlaceHolder) {
    margin-bottom: 12px !important;
  }

  html[data-zb-theme] .SearchMain .SearchSubTabs {
    box-sizing: border-box !important;
    display: flex !important;
    height: auto !important;
    min-height: 58px !important;
    padding: 12px 16px !important;
    align-items: center !important;
    ${CARD_FRAME_STYLE}
    color: var(--zb-text) !important;
    line-height: normal !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .SearchMain .SearchSubTabs .Tabs {
    display: flex !important;
    height: auto !important;
    width: 100% !important;
    align-items: center !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
    border-bottom: 0 !important;
    line-height: normal !important;
  }

  html[data-zb-theme] .SearchMain .SearchSubTabs .Tabs-item {
    display: flex !important;
    height: auto !important;
    padding: 0 !important;
    align-items: center !important;
    line-height: normal !important;
  }

  html[data-zb-theme] .SearchMain .SearchSubTabs .Tabs-link {
    box-sizing: border-box !important;
    display: inline-flex !important;
    min-height: 32px !important;
    padding: 5px 12px !important;
    align-items: center !important;
    justify-content: center !important;
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    color: var(--zb-text-muted) !important;
    font-weight: 400 !important;
    line-height: 20px !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme]
    .SearchMain
    .SearchSubTabs
    .Tabs-link:hover {
    background-color: var(--zb-primary-soft) !important;
    border-color: color-mix(
      in srgb,
      var(--zb-primary) 36%,
      transparent
    ) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .SearchMain
    .SearchSubTabs
    .Tabs-link.is-active {${PRIMARY_BUTTON_STYLE}
    font-weight: 600 !important;
  }

  html[data-zb-theme]
    .SearchMain
    .SearchSubTabs
    .Tabs-link.is-active:hover {
    ${PRIMARY_BUTTON_HOVER_STYLE}
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme] .SearchMain .SearchSubTabs .Tabs-link:focus-visible {
    border-color: var(--zb-primary) !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      + .SearchNoContent-wrap
    ) {${CARD_SURFACE_STYLE}
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      + .SearchNoContent-wrap
    )
    > div:first-child {
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      + .SearchNoContent-wrap
    )
    > div:first-child
    > div {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    border-radius: 8px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      + .SearchNoContent-wrap
    )
    > div:first-child
    > div
    > div:first-child {
    color: inherit !important;
    -webkit-text-fill-color: currentColor !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      + .SearchNoContent-wrap
    )
    > div:first-child
    > div
    > svg {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      + .SearchNoContent-wrap
    )
    > div:first-child
    > div:is(:hover, :focus-within) {
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      + .SearchNoContent-wrap
    )
    > div:has(> div > .Button.Button--secondary) {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 0 0 12px 12px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      + .SearchNoContent-wrap
    )
    > div:has(> div > .Button.Button--secondary)
    > div {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      + .SearchNoContent-wrap
    )
    > div:has(> div > .Button.Button--secondary)
    > div:last-child {
    border-top: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      + .SearchNoContent-wrap
    )
    > div:has(> div > .Button.Button--secondary)
    .Button {
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      + .SearchNoContent-wrap
    )
    > div:has(> div > .Button.Button--secondary)
    .Button--secondary:not(.Button--blue) {
    ${RAISED_CONTROL_SURFACE_STYLE}
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      + .SearchNoContent-wrap
    )
    > div:has(> div > .Button.Button--secondary)
    .Button--secondary:not(.Button--blue):is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      + .SearchNoContent-wrap
    )
    > div:has(> div > .Button.Button--secondary)
    > div:last-child
    .Button:not(.Button--blue) {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      + .SearchNoContent-wrap
    )
    > div:has(> div > .Button.Button--secondary)
    > div:last-child
    .Button:not(.Button--blue):is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      a[href*="/kvip/sku/paper/"]
    )
    > div:has(> div > div > .Zi--TriangleUp) {${CARD_SURFACE_STYLE}
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      a[href*="/kvip/sku/paper/"]
    )
    > div:has(> div > div > .Zi--TriangleUp)
    > div:first-child {
    background-color: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      a[href*="/kvip/sku/paper/"]
    )
    > div:has(> div > div > .Zi--TriangleUp)
    > div:first-child
    > div {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      a[href*="/kvip/sku/paper/"]
    )
    > div:has(> div > div > .Zi--TriangleUp)
    > div:first-child
    > div
    > div:first-child {
    color: inherit !important;
    -webkit-text-fill-color: currentColor !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      a[href*="/kvip/sku/paper/"]
    )
    > div:has(> div > div > .Zi--TriangleUp)
    > div:first-child
    > div
    > svg {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      a[href*="/kvip/sku/paper/"]
    )
    > div:has(> div > div > .Zi--TriangleUp)
    > div:first-child
    > div:is(:hover, :focus-within) {
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      a[href*="/kvip/sku/paper/"]
    )
    > div:has(> div > div > .Zi--TriangleUp)
    > div:has(> div > .Button.Button--secondary) {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 0 0 12px 12px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      a[href*="/kvip/sku/paper/"]
    )
    > div:has(> div > div > .Zi--TriangleUp)
    > div:has(> div > .Button.Button--secondary)
    > div {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      a[href*="/kvip/sku/paper/"]
    )
    > div:has(> div > div > .Zi--TriangleUp)
    > div:has(> div > .Button.Button--secondary)
    > div:last-child {
    border-top: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      a[href*="/kvip/sku/paper/"]
    )
    > div:has(> div > div > .Zi--TriangleUp)
    > div:has(> div > .Button.Button--secondary)
    .Button {
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      a[href*="/kvip/sku/paper/"]
    )
    > div:has(> div > div > .Zi--TriangleUp)
    > div:has(> div > .Button.Button--secondary)
    .Button--secondary:not(.Button--blue) {
    ${RAISED_CONTROL_SURFACE_STYLE}
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      a[href*="/kvip/sku/paper/"]
    )
    > div:has(> div > div > .Zi--TriangleUp)
    > div:has(> div > .Button.Button--secondary)
    .Button--secondary:not(.Button--blue):is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      a[href*="/kvip/sku/paper/"]
    )
    > div:has(> a[href*="/kvip/sku/paper/"]) {
    ${CARD_SURFACE_STYLE}
    overflow: hidden !important;
    transition: border-color 0.16s ease !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]:has(
      a[href*="/kvip/sku/paper/"]
    )
    > div:has(> a[href*="/kvip/sku/paper/"]):is(:hover, :focus-within) {
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]
    a[href*="/kvip/sku/paper/"] {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-za-detail-view-path-module="SearchResultList"]
    a[href*="/kvip/sku/paper/"]:focus-visible {
    outline: 0 !important;
  }

  html[data-zb-theme]
    .SearchMain
    a[href*="/kvip/sku/paper/"]
    > div:first-child {
    ${PRIMARY_TEXT_PAINT_STYLE}
    font-weight: 600 !important;
    transition: color 0.16s ease !important;
  }

  html[data-zb-theme]
    .SearchMain
    a[href*="/kvip/sku/paper/"]:is(:hover, :focus-visible)
    > div:first-child {
    color: var(--zb-primary-hover) !important;
    -webkit-text-fill-color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    .SearchMain
    a[href*="/kvip/sku/paper/"]
    > div:nth-child(2),
  html[data-zb-theme]
    .SearchMain
    a[href*="/kvip/sku/paper/"]
    > div:nth-child(4),
  html[data-zb-theme]
    .SearchMain
    a[href*="/kvip/sku/paper/"]
    > div:nth-child(5) {
    ${MUTED_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .SearchMain
    a[href*="/kvip/sku/paper/"]
    > div:nth-child(3),
  html[data-zb-theme]
    .SearchMain
    a[href*="/kvip/sku/paper/"]
    > div:nth-child(3)
    span {${SECONDARY_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .SearchMain
    a[href*="/kvip/sku/paper/"]
    > div:nth-child(3)
    span:has(.ZDI--ArrowRight24) {
    ${PRIMARY_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme] .SearchMain a[href*="/kvip/sku/paper/"] em {
    color: var(--zb-danger) !important;
    -webkit-text-fill-color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    .SearchMain
    a[href*="/kvip/sku/paper/"]
    :where(svg, path) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme]
    .HotLanding
    > .List-item
    > div
    > div:has(+ div .HotLanding-title) {
    background: var(--zb-surface-raised) !important;
    border-bottom: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme] .HotLanding-title,
  html[data-zb-theme] .HotLanding-ListTitle,
  html[data-zb-theme] .HotLanding-contentItemTitle {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .HotLanding-title + div,
  html[data-zb-theme] .HotLanding-contentItemCount,
  html[data-zb-theme] .SearchItem-time {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .HotLanding-content {
    border-left-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .HotLanding-contentItem {
    border-bottom-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .HotLanding .Highlight em {
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    .HotLanding
    :is(.ContentItem-actions, .RichContent-actions) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .HotLanding
    .RichContent-actions.is-fixed
    > .ContentItem-actions.ContentItem-action {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .HotLanding
    :is(.ContentItem-actions, .RichContent-actions)
    .VoteButton {
    border-radius: 6px !important;
  }

  html[data-zb-theme] .Search-container .HotSearchCard-title,
  html[data-zb-theme] .Search-container .HotSearchCard-itemText,
  html[data-zb-theme] .Search-container .HotSearchCard-itemLink {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Search-container .HotSearchCard-heat {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Search-container
    :is(.HotSearchCard-item, .HotSearchCard-itemLink) {
    border-radius: 10px !important;
  }

  html[data-zb-theme] .Search-container .HotSearchCard-item {
    box-sizing: border-box !important;
    margin: 4px -8px !important;
    padding: 6px 8px !important;
    overflow: hidden !important;
    transition:
      background-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme] .Search-container .HotSearchCard-item:hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme] .Search-container .HotSearchCard-item:focus-within {
    background-color: var(--zb-surface-raised) !important;
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme] .Search-container .HotSearchCard-itemLink:focus-visible {
    color: var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .Search-container footer[role="contentinfo"],
  html[data-zb-theme]
    .Search-container
    footer[role="contentinfo"]
    :is(a, button, div, span, svg) {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme]
    .Search-container
    footer[role="contentinfo"]
    :is(a, button):is(:hover, :focus-visible) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Search-container
    footer[role="contentinfo"]
    svg {
    fill: currentColor !important;
  }
`;
