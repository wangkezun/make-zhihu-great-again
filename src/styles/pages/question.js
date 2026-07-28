import {
  CURRENT_COLOR_ICON_STYLE,
  PRIMARY_BORDER_FOCUS_STYLE,
  PRIMARY_FOCUS_STYLE,
  RAISED_CONTROL_SURFACE_STYLE,
  RAISED_STRONG_CONTROL_SURFACE_STYLE,
  RAISED_TEXT_STYLE,
  SOFT_PRIMARY_STATE_STYLE,
  SURFACE_TEXT_STYLE,
} from "../shared-components.js";

export const QUESTION_PAGE_STYLE = `  /* Question page */
  html[data-zb-theme] .QuestionHeader,
  html[data-zb-theme] .QuestionHeader-content,
  html[data-zb-theme] .QuestionHeader-main,
  html[data-zb-theme] .QuestionHeader-side,
  html[data-zb-theme] .QuestionHeader-footer,
  html[data-zb-theme] .QuestionHeader-footer-inner,
  html[data-zb-theme] .QuestionHeader-footer-main {${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme] .QuestionHeader {
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .QuestionHeader-title,
  html[data-zb-theme] .QuestionHeader-title a,
  html[data-zb-theme] .QuestionHeader-detail,
  html[data-zb-theme] .QuestionHeader-detail .RichText,
  html[data-zb-theme] .QuestionHeader .NumberBoard-itemValue {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionHeader .NumberBoard-itemName,
  html[data-zb-theme] .QuestionHeader .QuestionFollowStatus-counts,
  html[data-zb-theme] .QuestionHeader .QuestionFollowStatus-counts div,
  html[data-zb-theme] .QuestionHeader .QuestionHeaderActions-label {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .QuestionHeader .NumberBoard-item {
    border-radius: 8px !important;
  }

  html[data-zb-theme] .QuestionHeader .QuestionFollowStatus-counts {
    column-gap: 8px !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .QuestionFollowStatus-counts
    .NumberBoard-itemInner {
    border-left-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .QuestionHeader .NumberBoard-item.Button:hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .NumberBoard-item.Button:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme] .QuestionHeader .QuestionFollowStatus-people {
    padding-right: 8px !important;
    padding-left: 8px !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme] .QuestionHeader .QuestionFollowStatus-people:hover {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme]
    .QuestionHeader
    .QuestionFollowStatus-people:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  /* Topic entity cards use generated class names. Target the semantic label
     and direct-child position so the selector survives Zhihu CSS rebuilds
     without also matching the compact topic chips above the question. */
  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"] {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-text) !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]
    > div:first-of-type,
  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]
    .topicMetaTitle {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]
    > div:first-of-type
    > div:last-child,
  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]
    > div:first-of-type
    > div:first-child
    > div:not(.topicMetaTitle) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]
    > div:first-of-type
    span {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]
    > div:last-of-type
    > button {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]
    > div:last-of-type
    > button:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]
    > div:last-of-type
    > button[aria-pressed="true"] {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
  }

  /* Latest-progress cards use generated class names and receive analytics
     attributes during hydration. Anchor to the server-rendered semantic icon
     so the title color applies on the first paint instead of after hydration. */
  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a
    > div:last-child,
  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a
    > div:last-child
    :where(div, span) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a
    > div:last-child
    svg {
    color: var(--zb-text-muted) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a:is(:hover, :focus-visible)
    > div:last-child,
  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a:is(:hover, :focus-visible)
    > div:last-child
    :where(div, span, svg) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a:focus-visible {
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  /* Question and answer page links follow semantic roles instead of Zhihu's
     native blue palette. Keep identity links calm, metadata subdued, and
     reserve the accent color for topics, content links, and interaction. */
  html[data-zb-theme] .QuestionHeader-topics :is(a, .TopicLink, .Tag-content),
  html[data-zb-theme]
    .QuestionHeader-topics
    :is(a, .TopicLink, .Tag-content)
    :where(span, div) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionHeader-topics
    :is(a, .TopicLink, .Tag-content):hover,
  html[data-zb-theme]
    .QuestionHeader-topics
    :is(a, .TopicLink, .Tag-content):hover
    :where(span, div) {
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme] .QuestionHeader-topics .QuestionTopic {
    background-color: var(--zb-primary-soft) !important;
    border-color: transparent !important;
  }

  html[data-zb-theme]
    .QuestionHeader-topics
    .QuestionTopic:is(:hover, :focus-within) {
    background-color: color-mix(
      in srgb,
      var(--zb-primary) 24%,
      transparent
    ) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"]) {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 10px !important;
    box-shadow: var(--zb-shadow) !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    > svg {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a {
    box-sizing: border-box !important;
    width: calc(100% - 12px) !important;
    margin-right: 6px !important;
    margin-left: 6px !important;
    background-color: transparent !important;
    border-radius: 6px !important;
    color: var(--zb-text) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a:is(:hover, :focus-visible) {${RAISED_TEXT_STYLE}
    text-decoration: none !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a:focus-visible {
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a
    > div:first-of-type {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a
    > div:last-of-type {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a
    > svg:first-child {
    color: var(--zb-warning) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a
    > svg:last-child {
    color: var(--zb-text-muted) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(
      .BrandQuestionSymbol-brandLink,
      .BrandQuestionSymbol-name,
      .AuthorInfo-name a,
      .UserLink-link
    ) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(
      .BrandQuestionSymbol-brandLink,
      .BrandQuestionSymbol-name,
      .AuthorInfo-name a,
      .UserLink-link
    ):hover {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-time, .ContentItem-time a) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-time
    a:hover {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.RichText, .RichContent-inner)
    a:not(.UserLink-link):not(.TopicLink):not(.LinkCard):not(.tag),
  html[data-zb-theme] .QuestionHeader-detail .RichText a,
  html[data-zb-theme] .QuestionPage a.RichContent-EntityWord {
    color: var(--zb-primary) !important;
    text-decoration-color: transparent !important;
    text-decoration-thickness: 1px !important;
    text-underline-offset: 2px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.RichText, .RichContent-inner)
    a:not(.UserLink-link):not(.TopicLink):not(.LinkCard):not(.tag):hover,
  html[data-zb-theme]
    .QuestionPage
    :is(.RichText, .RichContent-inner)
    a:not(.UserLink-link):not(.TopicLink):not(.LinkCard):not(.tag):focus-visible,
  html[data-zb-theme] .QuestionHeader-detail .RichText a:hover,
  html[data-zb-theme] .QuestionHeader-detail .RichText a:focus-visible,
  html[data-zb-theme] .QuestionPage a.RichContent-EntityWord:hover,
  html[data-zb-theme] .QuestionPage a.RichContent-EntityWord:focus-visible {
    color: var(--zb-primary-hover) !important;
    text-decoration: underline !important;
    text-decoration-color: currentColor !important;
    text-decoration-thickness: 1px !important;
    text-underline-offset: 2px !important;
  }

  html[data-zb-theme] .QuestionPage .RichText a.LinkCard {
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    text-decoration: none !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .RichText
    a.LinkCard:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme] .QuestionPage .RichText .LinkCard-title {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionPage .RichText .LinkCard-desc {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .QuestionPage .RichText .LinkCard-image {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme] .QuestionPage .RichText .LinkCard .tag {
    background-color: var(--zb-primary-soft) !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme] .QuestionPage .RichText table {
    border: 1px solid var(--zb-border) !important;
    border-collapse: separate !important;
    border-spacing: 0 !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .QuestionPage .RichText :is(th, td) {
    background-color: transparent !important;
    border: 0 !important;
    border-right: 1px solid var(--zb-border) !important;
    border-bottom: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionPage .RichText th {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme] .QuestionPage .RichText tr > :last-child {
    border-right: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .RichText
    tbody
    tr:last-child
    > td {
    border-bottom: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    div:has(
      > div
        > a[href*="zhida_source=below_banner_question"]
    ) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    border-radius: 12px !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a[href*="zhida_source=below_banner_question"] {
    border-radius: 6px !important;
    color: var(--zb-text-secondary) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a[href*="zhida_source=below_banner_question"]
    > p {
    color: inherit !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a[href*="zhida_source=below_banner_question"]:is(
      :hover,
      :focus-visible
    ) {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-primary) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a[href*="zhida_source=below_banner_question"]
    :is(svg, path) {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
    stroke: currentColor !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(
      .BrandQuestionSymbol-brandLink,
      .AuthorInfo-name a,
      .UserLink-link,
      .ContentItem-time a,
      .QuestionHeader-topics a,
      .RelatedQuestions-item a,
      .SimilarQuestions-item a,
      .NumberBoard-item
    ):focus-visible {
    color: var(--zb-primary) !important;
    outline: 2px solid var(--zb-primary) !important;
    outline-offset: 2px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .BrandQuestionSymbol-brandLink:is(:hover, :focus-visible)
    .BrandQuestionSymbol-name {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .QuestionPage img.Avatar {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem .AuthorInfo, .AnswerAuthor)
    img.Avatar {
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AuthorInfo
    .UserLink:focus-visible {
    border-radius: 6px !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-meta
    div[style*="cursor: pointer"]:has(
      > svg.Zi:is(.Zi--ArrowDown, .Zi--ArrowUp)
    ) {
    box-sizing: border-box !important;
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid color-mix(in srgb, var(--zb-primary) 28%, transparent) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-meta
    div[style*="cursor: pointer"]:has(
      > svg.Zi:is(.Zi--ArrowDown, .Zi--ArrowUp)
    )
    :is(div, svg, path) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-meta
    div[style*="cursor: pointer"]:has(
      > svg.Zi:is(.Zi--ArrowDown, .Zi--ArrowUp)
    ):hover {
    background-color: color-mix(in srgb, var(--zb-primary) 24%, transparent) !important;
    border-color: color-mix(in srgb, var(--zb-primary) 48%, transparent) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-meta
    :is(
      a:has(> .ZDI--CrabFill24):has(> .Zi--ArrowRight),
      a:has(> .ZDI--ColumnFill24):has(> .ZDI--ArrowRight16)
    ) {
    box-sizing: border-box !important;
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid color-mix(in srgb, var(--zb-primary) 28%, transparent) !important;
    color: var(--zb-primary) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-meta
    :is(
      a:has(> .ZDI--CrabFill24):has(> .Zi--ArrowRight),
      a:has(> .ZDI--ColumnFill24):has(> .ZDI--ArrowRight16)
    )
    :is(div, svg, path) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-meta
    :is(
      a:has(> .ZDI--CrabFill24):has(> .Zi--ArrowRight),
      a:has(> .ZDI--ColumnFill24):has(> .ZDI--ArrowRight16)
    ):is(:hover, :focus-visible) {
    background-color: color-mix(in srgb, var(--zb-primary) 24%, transparent) !important;
    border-color: color-mix(in srgb, var(--zb-primary) 48%, transparent) !important;
    color: var(--zb-primary) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-meta
    :is(
      a:has(> .ZDI--CrabFill24):has(> .Zi--ArrowRight),
      a:has(> .ZDI--ColumnFill24):has(> .ZDI--ArrowRight16)
    ):focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 2px solid var(--zb-primary) !important;
    outline-offset: 2px !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[viewBox="0 0 26 10"]):has(
      div[style*="cursor: default"]
    ) {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    box-shadow: var(--zb-shadow) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[viewBox="0 0 26 10"]):has(
      div[style*="cursor: default"]
    )
    > svg {
    color: var(--zb-surface-raised) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[viewBox="0 0 26 10"]):has(
      div[style*="cursor: default"]
    )
    div[style*="cursor: default"],
  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[viewBox="0 0 26 10"]):has(
      div[style*="cursor: default"]
    )
    div[style*="cursor: default"]
    * {
    color: var(--zb-text) !important;
    font-weight: 600 !important;
  }


  html[data-zb-theme][data-zb-question-page="true"]
    body
    div:has(
      > div
        > div
        > div
        > .QuestionStatus-notification-inner
    ) {
    box-sizing: border-box !important;
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    color: var(--zb-text-secondary) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionStatus-notification-inner,
  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionStatus-notification-content {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionStatus-notification-content
    .UserLink-link {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionStatus-notification-actions
    .Button {
    min-height: 24px !important;
    padding: 2px 6px !important;
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
    outline: 0 !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionStatus-notification-actions
    .QuestionStatus-notification-primary {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionStatus-notification-actions
    .Button:is(:hover, :focus-visible) {
    ${SOFT_PRIMARY_STATE_STYLE}
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionStatus-notification-divider {
    margin: 0 2px !important;
    background-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionStatus-notification-closeButton {
    width: 24px !important;
    min-width: 24px !important;
    padding: 2px !important;
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionStatus-notification-closeButton
    :where(svg, path) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme][data-zb-question-page="true"] .QuestionInvitation {
    background-color: var(--zb-surface) !important;
    border-radius: inherit !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .Modal:has(.QuestionInvitation) {
    background-color: transparent !important;
    border-radius: 12px !important;
    box-shadow: none !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .Modal-inner:has(.QuestionInvitation) {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .Modal-content:has(> .QuestionInvitation) {
    border-radius: inherit !important;
    overflow: hidden !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionInvitation
    > .Topbar {
    background-color: var(--zb-surface) !important;
    border-bottom-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionInvitation-input:focus-within {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionInvitation-input
    :is(.Input, svg) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionInvitation-content
    .AutoInviteItem-wrapper--desktop {
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionInvitation-content
    > .List
    > .List-item {
    box-sizing: border-box !important;
    width: calc(100% - 24px) !important;
    margin: 0 12px !important;
    padding: 12px !important;
    background-color: transparent !important;
    border-radius: 8px !important;
    transition:
      background-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionInvitation-content
    > .List
    > .List-item::after {
    border-bottom-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionInvitation-content
    > .List
    > .List-item:is(:hover, :focus-within) {
    background-color: var(--zb-surface-hover) !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionInvitation
    :is(.ContentItem-statusItem, .ContentItem-meta) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionInvitation
    .ContentItem-extra
    .Button:not(.Button--blue) {
    background-color: transparent !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionInvitation
    .ContentItem-extra
    .Button:not(.Button--blue):is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionInvitation
    .AutoInviteItem-wrapper--desktop
    .ContentItem-extra
    .AutoInviteItem-button--closed.Button.Button--link {
    min-width: 80px !important;
    min-height: 32px !important;
    padding: 0 8px !important;
    background-color: transparent !important;
    border: 1px solid var(--zb-primary) !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    font-weight: 500 !important;
    outline: 0 !important;
    white-space: nowrap !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionInvitation
    .AutoInviteItem-wrapper--desktop
    .ContentItem-extra
    .AutoInviteItem-button--closed.Button.Button--link:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

`;
