export const AI_SEARCH_PAGE_STYLE = `  html[data-zb-theme]
    .SearchMain:has(
      :is(
        [data-testid="Block:thinking_blcok"],
        [data-testid="Block:zhida_answer_result_block"]
      )
    )
    > div,
  html[data-zb-theme]
    .SearchMain:has(
      :is(
        [data-testid="Block:thinking_blcok"],
        [data-testid="Block:zhida_answer_result_block"]
      )
    )
    > div
    > div {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .SearchMain
    :is(
      [data-testid="Block:thinking_blcok"],
      [data-testid="Block:zhida_answer_result_block"]
    )
    :is(.Render-markdown, div[dir="auto"]) {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme] .SearchMain .Render-markdown :is(a, sup) {
    color: var(--zb-primary) !important;
    -webkit-text-fill-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .SearchMain
    :is(
      [data-testid="Button:thinking_node"],
      [data-testid="Button:reference_card_block_more_btn"],
      [data-testid="Button:zhida_message_corner_mark_btn"][tabindex="0"]
    ) {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .SearchMain
    :is(
      [data-testid="Button:thinking_node"],
      [data-testid="Button:reference_card_block_more_btn"],
      [data-testid="Button:zhida_message_corner_mark_btn"][tabindex="0"]
    ):is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-testid="Button:zhida_message_corner_mark_btn"]:not([tabindex]) {
    background-color: transparent !important;
    border: 0 !important;
    color: inherit !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-testid="Button:zhida_message_corner_mark_btn"][tabindex="0"]
    :where(div, span) {
    color: inherit !important;
    -webkit-text-fill-color: currentColor !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-testid="Button:zhida_message_corner_mark_btn"][tabindex="0"]
    :where(svg, path) {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .SearchMain
    [data-testid="Button:zhida_message_corner_mark_btn"][tabindex="0"]:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .Popover-content:has(
      [data-testid="Button:zhida_message_corner_mark_float_window_btn"]
    ) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-testid="Button:zhida_message_corner_mark_float_window_btn"]
    > div:nth-child(3) {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-testid="Button:zhida_message_corner_mark_float_window_btn"]
    > div:nth-child(4) {
    color: var(--zb-text-secondary) !important;
    -webkit-text-fill-color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-testid="Button:zhida_message_corner_mark_float_window_btn"]
    > div:last-child
    :where(div, span) {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-testid="Button:zhida_message_corner_mark_float_window_btn"]
    > div:last-child
    :where(svg, path) {
    color: var(--zb-text-muted) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .SearchMain
    .SearchResult-Card:has(> .List-item[tabindex="0"] h1)
    > .List-item {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .SearchMain
    .SearchResult-Card:has(> .List-item[tabindex="0"] h1)
    h1 {
    color: var(--zb-primary) !important;
    transition: color 0.16s ease !important;
  }

  html[data-zb-theme]
    .SearchMain
    .SearchResult-Card:has(> .List-item[tabindex="0"] h1)
    > .List-item:is(:hover, :focus-visible)
    h1 {
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    .SearchMain
    .SearchResult-Card:has(> .List-item[tabindex="0"] h1)
    h1
    + div {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 999px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .SearchMain
    .SearchResult-Card:has(> .List-item[tabindex="0"] h1)
    div:has(> h1)
    + div,
  html[data-zb-theme]
    .SearchMain
    .SearchResult-Card:has(> .List-item[tabindex="0"] h1)
    > .List-item
    > div
    > div:last-child {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme]
    .SearchMain
    .SearchResult-Card:has(> .List-item[tabindex="0"] h1)
    > .List-item
    > div
    > div:first-child
    > div:last-child {
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid
      color-mix(in srgb, var(--zb-primary) 36%, transparent) !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .SearchMain
    .SearchResult-Card:has(> .List-item[tabindex="0"] h1)
    > .List-item:focus-visible {
    outline: 0 !important;
  }

  html[data-zb-theme]
    .SearchMain
    :is(
      .KfeCollection-PcCollegeCard-wrapper,
      .KfeCollection-PcCollegeCard-root,
      .KfeCollection-PcCollegeCard
    ) {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .SearchMain
    :is(.KfeCollection-PcCollegeCard-title, .KfeCollection-PcCollegeCard-link) {
    color: var(--zb-primary) !important;
    -webkit-text-fill-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .SearchMain
    .KfeCollection-PcCollegeCard-link:is(:hover, :focus-visible) {
    color: var(--zb-primary-hover) !important;
    -webkit-text-fill-color: var(--zb-primary-hover) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .SearchMain
    :is(.KfeCollection-PcCollegeCard-meta, .KfeCollection-PcCollegeCard-status) {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .SearchMain .KfeCollection-PcCollegeCard-description {
    color: var(--zb-text-secondary) !important;
    -webkit-text-fill-color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme] .SearchMain .KfeCollection-PcCollegeCard-point {
    color: var(--zb-primary) !important;
    -webkit-text-fill-color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    > div
    > div
    > div:has(
      :is(
        [data-testid="Block:thinking_blcok"],
        [data-testid="Block:zhida_answer_result_block"],
        [data-testid="Block:zhida_input_box"]
      )
    ) {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    :is(
      [data-testid="Block:zhida_answer_result_block"],
      [data-testid="Block:zhida_answer_result_block"] :where(div, span, p, h1, h2, h3, strong)
    ) {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="discovery-answer-fade-mask"] {
    background: linear-gradient(transparent, var(--zb-surface)) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Button:expand_btn"]
    > div {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Button:expand_btn"]
    :where(span, svg, path) {
    color: inherit !important;
    fill: currentColor !important;
    -webkit-text-fill-color: currentColor !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Button:expand_btn"]:is(:hover, :focus-visible, :focus-within)
    > div {
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-content-discovery-heading] {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    div[style*="height: 10px"][style*="background-color: rgb(235, 236, 237)"] {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-surface-hover) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    .zhida-rn-skeleton-motion::after {
    background-image: linear-gradient(
      110deg,
      transparent 0%,
      transparent 35%,
      color-mix(in srgb, var(--zb-text-subtle) 22%, transparent) 50%,
      transparent 65%,
      transparent 100%
    ) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="answer-thinking-text"] {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-scroll-to-bottom] {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
    box-shadow: var(--zb-shadow) !important;
    outline: 0 !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-scroll-to-bottom]
    :where(svg, path) {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-scroll-to-bottom]:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-answer-actions]
    > div
    > [tabindex="0"] {
    box-sizing: border-box !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
    box-shadow: none !important;
    outline: 0 !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-answer-actions]
    > div
    > [tabindex="0"]
    :where(div, span, svg, path) {
    color: inherit !important;
    fill: currentColor !important;
    -webkit-text-fill-color: currentColor !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-answer-actions]
    > div
    > [tabindex="0"]:is(:hover, :focus-visible, [aria-pressed="true"]) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-share-actions]
    > [tabindex="0"],
  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-share-actions]
    > div
    > [tabindex="0"] {
    box-sizing: border-box !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
    box-shadow: none !important;
    outline: 0 !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-share-actions]
    > [tabindex="0"]
    :where(div, span, svg, path),
  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-share-actions]
    > div
    > [tabindex="0"]
    :where(div, span, svg, path) {
    color: inherit !important;
    fill: currentColor !important;
    -webkit-text-fill-color: currentColor !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-share-actions]
    > [tabindex="0"]:is(:hover, :focus-visible),
  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-share-actions]
    > div
    > [tabindex="0"]:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-share-checkbox] {
    background-color: transparent !important;
    border-radius: 6px !important;
    color: var(--zb-text-subtle) !important;
    box-shadow: none !important;
    outline: 0 !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-share-checkbox][data-zb-ai-share-checkbox-checked="true"] {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-share-checkbox]
    :where(svg, path) {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-share-checkbox]:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-user-question] {
    box-sizing: border-box !important;
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid color-mix(in srgb, var(--zb-primary) 28%, transparent) !important;
    border-radius: 8px !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-zb-ai-user-question]
    :where(div, span) {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    div:has(> [data-testid="Block:thinking_blcok"]) {
    justify-content: center !important;
    height: auto !important;
    border: 0 !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Block:thinking_blcok"] {
    flex: 0 1 auto !important;
    width: auto !important;
    height: auto !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Block:thinking_blcok"]
    > div {
    box-sizing: border-box !important;
    align-items: center !important;
    gap: 8px !important;
    width: auto !important;
    min-height: 44px !important;
    padding: 4px !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    :is(
      [data-testid="Button:thinking_node"],
      [data-testid="Button:reference_card_block_more_btn"]
    ) {
    box-sizing: border-box !important;
    min-width: 0 !important;
    height: 34px !important;
    padding: 7px 8px !important;
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
    box-shadow: none !important;
    outline: 0 !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Button:reference_card_block_more_btn"] {
    flex: 0 0 auto !important;
    background-color: var(--zb-surface-hover) !important;
    border: 1px solid var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    :is(
      [data-testid="Button:thinking_node"],
      [data-testid="Button:reference_card_block_more_btn"]
    )
    > div {
    box-sizing: border-box !important;
    width: auto !important;
    padding: 0 !important;
    background-color: transparent !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    :is(
      [data-testid="Button:thinking_node"],
      [data-testid="Button:reference_card_block_more_btn"]
    )
    :where(div, span) {
    color: inherit !important;
    -webkit-text-fill-color: currentColor !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    :is(
      [data-testid="Button:thinking_node"],
      [data-testid="Button:reference_card_block_more_btn"]
    ):is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"] [data-zb-ai-source-panel] {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 12px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    :where(div, span) {
    color: var(--zb-text-secondary) !important;
    -webkit-text-fill-color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    > div:first-child {
    background-color: var(--zb-surface) !important;
    border-bottom: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    > div:first-child
    > div:first-child {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    > div:first-child
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 8px !important;
    color: var(--zb-text-muted) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    > div:first-child
    > div:last-child:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    > div:first-child
    > div:last-child
    > div {
    background-color: transparent !important;
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    > div:first-child
    > div:last-child
    :where(svg, path) {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    > div:last-child
    > div
    > div {
    scrollbar-color: var(--zb-text-subtle) transparent !important;
    scrollbar-width: thin !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    div[style*="border-bottom-width"] {
    background-color: var(--zb-surface) !important;
    border-bottom-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    div[style*="border-bottom-width"]
    > div {
    box-sizing: border-box !important;
    padding: 8px !important;
    border-radius: 8px !important;
    transition:
      background-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    div[style*="border-bottom-width"]
    > div:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    outline: 0 !important;
    box-shadow: inset 0 0 0 1px var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    div[style*="border-bottom-width"]
    > div
    > div:first-child
    :where(div, span) {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    div[style*="border-bottom-width"]
    > div
    > div:first-child
    span:first-child {
    color: var(--zb-primary) !important;
    -webkit-text-fill-color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    div[style*="border-bottom-width"]
    > div
    > div:last-child
    :where(div, span) {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    [data-testid="Card:reference_card"]
    div[style*="cursor: pointer"]
    div[style*="width: 24px"][style*="height: 24px"] {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    [data-testid="Card:reference_card"]
    div[style*="cursor: pointer"]:is(:hover, :focus-visible)
    div[style*="width: 24px"][style*="height: 24px"] {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
    box-shadow: inset 0 0 0 1px var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    [data-testid="Card:reference_card"]
    div[style*="cursor: pointer"]
    :where(svg, path) {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    [data-zb-ai-source-panel]
    [style*="color: rgb(23, 114, 246)"] {
    color: var(--zb-primary) !important;
    -webkit-text-fill-color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    div:has(
      + div
        > div
        > div
        > [data-testid^="Button:ai_search_content_discovery_navigation_tab:"]
    )
    :where(div, span) {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    div:has(
      > div
        > div
        > [data-testid^="Button:ai_search_content_discovery_navigation_tab:"]
    ) {
    background-color: var(--zb-surface) !important;
    border-bottom: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid^="Button:ai_search_content_discovery_navigation_tab:"]
    > div {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text-secondary) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid^="Button:ai_search_content_discovery_navigation_tab:"]
    > div
    > div {
    color: inherit !important;
    -webkit-text-fill-color: currentColor !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid^="Button:ai_search_content_discovery_navigation_tab:"]:is(
      :hover,
      :focus-visible
    )
    > div {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid^="Button:ai_search_content_discovery_navigation_tab:"]
    > div:not([style*="background-color: rgb(248, 248, 250)"]) {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-surface) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    div:has(> [data-testid="Card:OpenUrl:ai_search_content_card"]):not(
      :has(
        > [data-testid="Card:OpenUrl:ai_search_content_card"]
          + [data-testid="Card:OpenUrl:ai_search_content_card"]
      )
    ) {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    div:has(> [data-testid="Card:OpenUrl:ai_search_content_card"]):not(
      :has(
        > [data-testid="Card:OpenUrl:ai_search_content_card"]
          + [data-testid="Card:OpenUrl:ai_search_content_card"]
      )
    )
    > [data-testid="Card:OpenUrl:ai_search_content_card"] {
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    overflow: visible !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    div:has(> [data-testid="Card:OpenUrl:ai_search_content_card"]):not(
      :has(
        > [data-testid="Card:OpenUrl:ai_search_content_card"]
          + [data-testid="Card:OpenUrl:ai_search_content_card"]
      )
    )
    > [data-testid="Card:OpenUrl:ai_search_content_card"]:hover {
    background-color: var(--zb-surface-hover) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    div:has(> [data-testid="Card:OpenUrl:ai_search_content_card"]):not(
      :has(
        > [data-testid="Card:OpenUrl:ai_search_content_card"]
          + [data-testid="Card:OpenUrl:ai_search_content_card"]
      )
    )
    > [data-testid="Card:OpenUrl:ai_search_content_card"]:focus-visible {
    background-color: var(--zb-primary-soft) !important;
    outline: 0 !important;
    box-shadow: none !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    div:has(
      > [data-testid="Card:OpenUrl:ai_search_content_card"]:focus-visible
    ):not(
      :has(
        > [data-testid="Card:OpenUrl:ai_search_content_card"]
          + [data-testid="Card:OpenUrl:ai_search_content_card"]
      )
    ) {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    div:has(> [data-testid="Card:OpenUrl:ai_search_content_card"])
    > div:first-child:not([data-testid]) {
    background: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Card:OpenUrl:ai_search_content_card"] {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 8px !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    div:has(
      > [data-testid="Card:OpenUrl:ai_search_content_card"]
        + [data-testid="Card:OpenUrl:ai_search_content_card"]
    ) {
    padding: 0 12px !important;
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    div:has(
      > [data-testid="Card:OpenUrl:ai_search_content_card"]
        + [data-testid="Card:OpenUrl:ai_search_content_card"]
    )
    > [data-testid="Card:OpenUrl:ai_search_content_card"] {
    background-color: transparent !important;
    border: 0 !important;
    border-bottom: 1px solid var(--zb-border) !important;
    border-radius: 0 !important;
    overflow: visible !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    div:has(
      > [data-testid="Card:OpenUrl:ai_search_content_card"]
        + [data-testid="Card:OpenUrl:ai_search_content_card"]
    )
    > [data-testid="Card:OpenUrl:ai_search_content_card"]:last-child {
    border-bottom: 0 !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    div:has(
      > [data-testid="Card:OpenUrl:ai_search_content_card"]
        + [data-testid="Card:OpenUrl:ai_search_content_card"]
    )
    > [data-testid="Card:OpenUrl:ai_search_content_card"]
    > div:last-child[style*="background-color"] {
    display: none !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Card:OpenUrl:ai_search_content_card"]
    > div {
    background-color: transparent !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Card:OpenUrl:ai_search_content_card"]
    :where(div, span, p, h1, h2, h3, strong) {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    div:has(
      > [data-testid="Card:OpenUrl:ai_search_content_card"]
        + [data-testid="Card:OpenUrl:ai_search_content_card"]
    )
    > [data-testid="Card:OpenUrl:ai_search_content_card"]
    > div:first-child
    > :is(div:nth-child(2), div:nth-child(4)) {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    div:has(
      > [data-testid="Card:OpenUrl:ai_search_content_card"]
        + [data-testid="Card:OpenUrl:ai_search_content_card"]
    )
    > [data-testid="Card:OpenUrl:ai_search_content_card"]
    > div:first-child
    > div:nth-child(3) {
    color: var(--zb-text-secondary) !important;
    -webkit-text-fill-color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Card:OpenUrl:ai_search_content_card"]:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="SearchExpansionWord:Button:related_question_word"],
  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Block:zhida_input_box"] {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Button:ai_search_input_field_button"]
    > div {
    background-color: var(--zb-surface-hover) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Button:ai_search_input_field_button"]
    > div
    :where(div, span, svg, path) {
    color: inherit !important;
    fill: currentColor !important;
    -webkit-text-fill-color: currentColor !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Button:ai_search_input_field_button"]:is(:hover, :focus-visible)
    > div {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Button:ai_search_input_field_button"]
    > div[style*="background-color: rgba(23, 114, 246, 0.12)"] {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Block:zhida_input_box"]
    .InputLike.Editable {
    background-color: transparent !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    :is(
      [data-testid="SearchExpansionWord:Button:related_question_word"],
      [data-testid="Block:zhida_input_box"]
    )
    :where(div, span) {
    color: var(--zb-text-secondary) !important;
    -webkit-text-fill-color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    :is(
      [data-testid="SearchExpansionWord:Button:related_question_word"],
      [data-testid="Block:zhida_input_box"]
    ):is(:hover, :focus-visible, :focus-within) {
    border-color: var(--zb-primary) !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Block:zhida_input_box"]
    div[style*="background-color: rgb(173, 176, 183)"] {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme][data-zb-ai-search-page="true"]
    .SearchMain
    [data-testid="Block:zhida_input_box"]
    div[style*="background-color: rgb(173, 176, 183)"]
    :where(svg, path) {
    color: inherit !important;
    fill: currentColor !important;
  }

`;
