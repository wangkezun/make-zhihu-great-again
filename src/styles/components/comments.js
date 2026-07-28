import {
  PRIMARY_BORDER_FOCUS_STYLE,
  RAISED_CONTROL_SURFACE_STYLE,
  RAISED_STRONG_CONTROL_SURFACE_STYLE,
  SKELETON_SHIMMER_STYLE,
  SOFT_PRIMARY_STATE_STYLE,
  SURFACE_TEXT_STYLE,
  TRANSPARENT_TEXT_STYLE,
} from "../shared-components.js";

export const COMMENTS_COMPONENT_STYLE = `  html[data-zb-theme] .Comments-container::before,
  html[data-zb-theme] .Comments-container::after {
    content: none !important;
    display: none !important;
  }

  html[data-zb-theme]
    .ContentItem-action:has(.ZDI--ChatBubbleFill24)::after {
    border: 0 !important;
    content: none !important;
    display: none !important;
  }

  html[data-zb-theme] .QuestionPage .RichContent--hasHotComment {
    padding-bottom: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerItem
    .RichContent
    section
    > div:has(> a[href*="/column/"]) {
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerItem
    .RichContent
    section
    > div:has(> a[href*="/column/"])
    > a[href*="/column/"] {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerItem
    .RichContent
    section
    > div:has(> a[href*="/column/"])
    > div
    a[href*="/column/"] {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerItem
    .RichContent
    section
    > div:has(> a[href*="/column/"])
    > div
    a[href*="/column/"]
    > div
    > div:first-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerItem
    .RichContent
    section
    > div:has(> a[href*="/column/"])
    > div
    a[href*="/column/"]
    > div
    > div:nth-child(2)
    :where(div, span) {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerItem
    .RichContent
    section
    > div:has(> a[href*="/column/"])
    > div
    a[href*="/column/"]
    > div
    > div:nth-child(2)
    > div:last-child,
  html[data-zb-theme]
    .QuestionPage
    .AnswerItem
    .RichContent
    section
    > div:has(> a[href*="/column/"])
    > div
    a[href*="/column/"]
    > div
    > div:last-child {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerItem
    .RichContent
    section
    > div:has(> a[href*="/column/"])
    > div
    a[href*="/column/"]::before {
    border-bottom-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerItem
    .RichContent
    section
    > div:has(> a[href*="/column/"])
    a[href*="/column/"]:focus-visible {
    border-radius: 6px !important;
    outline: 2px solid var(--zb-primary) !important;
    outline-offset: 2px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a:is([href*="/people/"], [href*="/org/"]):not(:has(img.Avatar)),
  html[data-zb-theme]
    [data-zb-comment-modal]
    a:is([href*="/people/"], [href*="/org/"]):not(:has(img.Avatar)) {
    color: var(--zb-primary) !important;
    cursor: pointer !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a:is([href*="/people/"], [href*="/org/"]):not(:has(img.Avatar)):is(
      :hover,
      :focus-visible
    ),
  html[data-zb-theme]
    [data-zb-comment-modal]
    a:is([href*="/people/"], [href*="/org/"]):not(:has(img.Avatar)):is(
      :hover,
      :focus-visible
    ) {
    background-color: transparent !important;
    color: var(--zb-primary-hover) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .List-item:has(.Comments-container) {
    overflow: clip !important;
  }

  html[data-zb-theme]
    .QuestionPage
    img:is(.lazy, .origin_image.zh-lightbox-thumb) {
    animation: none !important;
    opacity: 1 !important;
    transition: none !important;
  }

  html[data-zb-theme] .Comments-container,
  html[data-zb-theme] .Comments-container > div {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Comments-container {
    border: 0 !important;
    border-radius: 8px !important;
    box-shadow: none !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .Comments-container > div:first-child {
    border: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    outline: 0 !important;
    padding-bottom: 0 !important;
  }

  html[data-zb-theme] .ZVideoItem-comment {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .ZVideoItem-comment
    > div:first-child
    > div:first-child:has(.InputLike.Editable) {
    position: static !important;
    inset: auto !important;
    order: 0 !important;
    margin: 0 !important;
    padding: 12px !important;
    background-color: var(--zb-surface) !important;
    border-bottom: 1px solid var(--zb-border) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme]
    .ZVideoItem-comment
    > div:first-child
    > div:nth-child(2) {
    background-color: var(--zb-surface) !important;
    border: 0 !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .ZVideoItem-comment
    > div:first-child
    > div:nth-child(2)
    :where(svg, path) {
    opacity: 0.82 !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:has(.InputLike.Editable) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:first-child:has(.InputLike.Editable) {
    bottom: 0 !important;
    border-top: 0 !important;
    box-shadow: 0 -6px 12px
      color-mix(in srgb, var(--ctp-crust) 14%, transparent) !important;
    margin-bottom: 0 !important;
    margin-inline: -20px !important;
    order: 100 !important;
    padding: 10px 20px !important;
    position: sticky !important;
    top: auto !important;
    transform: none !important;
    z-index: 3 !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:first-child:has(.InputLike.Editable)
    > div:first-child {
    margin-bottom: 0 !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:has(.InputLike.Editable):not(:has([data-id])):not(:first-child) {
    display: none !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2) {
    border: 1px solid var(--zb-border-strong) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:has(> .ZDI--ArrowRightSmall24) {
    border-radius: 6px !important;
    box-sizing: border-box !important;
    color: var(--zb-text-muted) !important;
    cursor: pointer !important;
    margin: 10px auto !important;
    min-height: 44px !important;
    padding: 6px 10px !important;
    width: fit-content !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:has(> .ZDI--ArrowRightSmall24)::before {
    border: 0 !important;
    content: none !important;
    display: none !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:has(> .ZDI--ArrowRightSmall24):is(
      :hover,
      :focus-within,
      :active
    ) {
    ${SOFT_PRIMARY_STATE_STYLE}
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child {
    border-bottom-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child
    > div:first-child
    :where(div, span) {
    color: var(--zb-text-muted) !important;
    opacity: 1 !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child
    > div:last-child
    > div {
    background-color: transparent !important;
    border-radius: 4px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child
    > div:last-child
    > .css-m0zh86,
  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child
    > div:last-child
    > div:is(:hover, :focus-visible) {
    ${SOFT_PRIMARY_STATE_STYLE}
    font-weight: 600 !important;
  }

  html[data-zb-theme] .Comments-container .CommentContent {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Comments-container
    a:not(:has(img.Avatar)) {
    color: var(--zb-primary) !important;
    cursor: pointer !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    .Comments-container
    .Button:not(.Button--blue) {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
    cursor: pointer !important;
  }

  html[data-zb-theme]
    .Comments-container
    .Button:is(.Button--withLabel, .Button--secondary) {
    box-sizing: border-box !important;
    border-radius: 6px !important;
    color: var(--zb-text-secondary) !important;
    min-height: 32px !important;
    padding-inline: 10px !important;
  }

  html[data-zb-theme]
    .Comments-container
    [data-id]
    > .Button.Button--secondary {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    margin-top: -4px !important;
  }

  html[data-zb-theme]
    .Comments-container
    .Button:is(.Button--withLabel, .Button--secondary):is(
      :hover,
      :focus-visible
    ) {
    ${SOFT_PRIMARY_STATE_STYLE}
    outline-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Comments-container
    .Button:is(
      .Button--red,
      .is-active,
      [aria-label="取消喜欢"],
      [aria-pressed="true"]
    )
    :has(:is(.Zi--Heart, .Zi--HeartFill, .ZDI--HeartFill24))
    svg {
    color: var(--zb-danger) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .Comments-container [data-id] {
    border-bottom: 1px solid var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .Comments-container [data-id] [data-id] {
    border-bottom-color: transparent !important;
    position: relative !important;
  }

  html[data-zb-theme] .Comments-container [data-id] [data-id]::before {
    border-top: 1px solid var(--zb-border-strong) !important;
    content: "" !important;
    left: 34px !important;
    position: absolute !important;
    right: 0 !important;
    top: 0 !important;
  }

  html[data-zb-theme] .Comments-container img.Avatar {
    background-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div > div > .InputLike.Editable) {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div > div > .InputLike.Editable)
    > div:first-child {
    border-radius: 6px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .Comments-container .InputLike.Editable {
    background-color: var(--zb-surface) !important;
    border-color: transparent !important;
    border-radius: 6px !important;
    box-sizing: border-box !important;
    color: var(--zb-text) !important;
    padding-inline: 8px !important;
  }

  html[data-zb-theme]
    .Comments-container
    :is(.Editable-content, .DraftEditor-root, .DraftEditor-editorContainer, .public-DraftEditor-content) {${TRANSPARENT_TEXT_STYLE}
  }

  html[data-zb-theme]
    .Comments-container
    :is(.public-DraftEditorPlaceholder-root, .public-DraftEditorPlaceholder-inner) {
    background-color: transparent !important;
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme]
    .Comments-container
    .InputLike.Editable:focus-within {
    border-color: transparent !important;
    box-shadow: none !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div > div > .InputLike.Editable:focus-within) {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme]
    .Comments-container
    :is(
      .Skeleton,
      [class*="skeleton" i],
      .PlaceHolder,
      .PlaceHolder-inner,
      [class*="placeholder" i]:not([class*="DraftEditorPlaceholder"]),
      [aria-busy="true"]
    ) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div + svg[width="656"][height="44"])
    > div:first-child,
  html[data-zb-theme]
    [data-zb-comment-modal]
    > div
    > div:nth-child(2)
    div:has(> div + svg[width="656"][height="44"])
    > div:first-child {${SKELETON_SHIMMER_STYLE}
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div + svg[width="656"][height="44"])
    > svg,
  html[data-zb-theme]
    .Comments-container
    div:has(> div + svg[width="656"][height="44"])
    > svg
    path {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div + svg[width="656"][height="44"]) {
    background-color: var(--zb-surface) !important;
    color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(
      > .BounceLoading[style*="width: 60px"][style*="height: 18px"]
    ) {
    background-color: var(--zb-surface) !important;
    border: 0 !important;
    box-shadow: none !important;
    color: var(--zb-text-muted) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .Comments-container .BounceLoading {
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
  }

  html[data-zb-theme] .Comments-container .BounceLoading-child {
    background-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Comments-container
    button:has(.ZDI--ArrowUpSmall24)
    > span:has(.ZDI--ArrowUpSmall24),
  html[data-zb-theme] .Comments-container .ZDI--ArrowUpSmall24 {
    display: none !important;
  }

  html[data-zb-theme] [data-zb-comment-modal] {
    ${SURFACE_TEXT_STYLE}
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    > div
    > div:first-child
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    > div
    > div:first-child
    > div:last-child
    > div {
    background-color: transparent !important;
    border-radius: 4px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    > div
    > div:first-child
    > div:last-child
    > .css-m0zh86 {
    ${SOFT_PRIMARY_STATE_STYLE}
    font-weight: 600 !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    > div
    > div:first-child
    > div:first-child {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    > div
    > div:first-child
    > div:first-child
    :where(div, span) {
    color: inherit !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    > div:has(> div:nth-child(2) > div:nth-child(3) [data-id])
    > div:first-child
    > div:only-child {
    box-sizing: border-box !important;
    padding: 4px 8px !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    > div
    > div:nth-child(2):has(> div:nth-child(3) [data-id])
    > div:nth-child(2)
    > div:only-child {
    color: var(--zb-text-muted) !important;
    opacity: 1 !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    > div
    > div:first-child
    > div:last-child
    > div:is(:hover, :focus-visible) {
    ${SOFT_PRIMARY_STATE_STYLE}
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    .CommentContent {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    a:not(:has(img.Avatar)) {
    color: var(--zb-primary) !important;
    cursor: pointer !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    .Button:not(.Button--blue) {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
    cursor: pointer !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    .Button:is(.Button--withLabel, .Button--secondary) {
    box-sizing: border-box !important;
    border-radius: 6px !important;
    color: var(--zb-text-secondary) !important;
    min-height: 32px !important;
    padding-inline: 10px !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    .Button:is(.Button--withLabel, .Button--secondary):is(
      :hover,
      :focus-visible
    ) {
    ${SOFT_PRIMARY_STATE_STYLE}
    outline-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    .Button:is(
      .Button--red,
      .is-active,
      [aria-label="取消喜欢"],
      [aria-pressed="true"]
    )
    :has(:is(.Zi--Heart, .Zi--HeartFill, .ZDI--HeartFill24))
    svg {
    color: var(--zb-danger) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    [data-id] {
    border-bottom: 1px solid var(--zb-border-strong) !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    [data-id]
    > div:first-child {
    animation: none !important;
    background-color: transparent !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    [data-id]
    [data-id] {
    border-bottom-color: transparent !important;
    position: relative !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    [data-id]
    [data-id]::before {
    border-top: 1px solid var(--zb-border-strong) !important;
    content: "" !important;
    left: 34px !important;
    position: absolute !important;
    right: 0 !important;
    top: 0 !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    img.Avatar {
    background-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    div:has(> div > div > .InputLike.Editable) {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    div:has(> div > div > .InputLike.Editable)
    > div:first-child {
    border-radius: 6px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    .InputLike.Editable {
    background-color: var(--zb-surface) !important;
    border-color: transparent !important;
    border-radius: 6px !important;
    box-sizing: border-box !important;
    color: var(--zb-text) !important;
    padding-inline: 8px !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    .Button.Button--primary {
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    :is(.Editable-content, .DraftEditor-root, .DraftEditor-editorContainer, .public-DraftEditor-content) {${TRANSPARENT_TEXT_STYLE}
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    .InputLike.Editable:focus-within {
    border-color: transparent !important;
    box-shadow: none !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    div:has(> div > div > .InputLike.Editable:focus-within) {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    div[data-zb-comment-composer-collapsed]
    > div:nth-child(2) {
    display: none !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    :is(.public-DraftEditorPlaceholder-root, .public-DraftEditorPlaceholder-inner) {
    background-color: transparent !important;
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    > div
    > div:nth-child(2)
    :is(
      .Skeleton,
      [class*="skeleton" i],
      .PlaceHolder,
      .PlaceHolder-inner,
      [class*="placeholder" i]:not([class*="DraftEditorPlaceholder"]),
      [class*="loading" i],
      [aria-busy="true"]
    ) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    > div
    > div:nth-child(2)
    div:has(> div + svg[width="656"][height="44"])
    > svg,
  html[data-zb-theme]
    [data-zb-comment-modal]
    > div
    > div:nth-child(2)
    div:has(> div + svg[width="656"][height="44"])
    > svg
    path {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    > div
    > div:nth-child(2)
    div:has(> div + svg[width="656"][height="44"]) {
    background-color: var(--zb-surface) !important;
    color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    [data-zb-comment-modal]
    .comment_img {
    background-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
    overflow: hidden !important;
  }
`;
