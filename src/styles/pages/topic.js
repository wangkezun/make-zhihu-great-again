export const TOPIC_PAGE_STYLE = `  html[data-zb-theme][data-zb-topic-page="true"]
    :is(
      .Card:has(.TopicMetaCard),
      .Card:has(> .NumberBoard),
      .Card:has(.TopicRelativeBoard-item),
      .TopicFeedList
    ) {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    :is(.TopicMetaCard-title, .ContentItem-title),
  html[data-zb-theme][data-zb-topic-page="true"]
    :is(.TopicMetaCard-title, .ContentItem-title)
    a {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    :is(.TopicMetaCard-title, .ContentItem-title)
    a:is(:hover, :focus-visible) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    :is(.TopicMetaCard-description, .TopicHotIntroItem-item, .ContentItem-meta) {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"] .TopicMetaCard-image {
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"] .TopicMetaCard-linkIcon {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicMetaCard-linkIcon:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-radius: 6px !important;
    color: var(--zb-primary-hover) !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"] .TopicActions .Button {
    box-sizing: border-box !important;
    min-height: 34px !important;
    border-radius: 6px !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicActions
    .FollowButton.Button--blue {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicActions
    .FollowButton.Button--blue:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-hover) !important;
    border-color: var(--zb-primary-hover) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicActions
    .FollowButton.Button--grey {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicActions
    .FollowButton.Button--grey:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicActions
    .Button--plain:is(:hover, :focus-visible),
  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicActions
    .ShareMenu-toggler[aria-expanded="true"]
    .Button {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicActions
    .Button
    :where(svg, path) {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    :is(.Topic-pageHeader, .Topic-pageHeaderMain, .Topic-bar) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"] .Topic-bar {
    box-sizing: border-box !important;
    height: 50px !important;
    border-bottom: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .Topic-tabs
    .Tabs-item {
    padding-right: 15px !important;
    padding-left: 15px !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"] .Topic-tabs .Tabs-link {
    padding: 14px 0 !important;
    background-color: transparent !important;
    border-radius: 0 !important;
    color: var(--zb-text-muted) !important;
    font-size: 16px !important;
    font-weight: 400 !important;
    line-height: 22px !important;
    transition: color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .Topic-tabs
    .Tabs-link:hover {
    background-color: transparent !important;
    color: var(--zb-primary) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .Topic-tabs
    .Tabs-link:focus-visible {
    background-color: transparent !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .Topic-tabs
    .Tabs-link.is-active {
    color: var(--zb-primary) !important;
    font-weight: 500 !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"] .Topic-headerLink {
    display: inline-flex !important;
    align-items: center !important;
    gap: 4px !important;
    height: 50px !important;
    padding: 0 20px !important;
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
    font-size: 14px !important;
    line-height: 20px !important;
    transition: color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .Topic-headerLink:hover {
    background-color: transparent !important;
    color: var(--zb-primary) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .Topic-headerLink:focus-visible {
    background-color: transparent !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .Topic-headerLink
    :where(span, svg, path) {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    :is(.TopicHotIntroItem-item, .TopicHot-introItem) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    :is(.TopicHotIntroItem-item, .TopicHot-introItem)
    a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    :is(.TopicHotIntroItem-item, .TopicHot-introItem)
    a:is(:hover, :focus-visible) {
    color: var(--zb-primary-hover) !important;
    text-decoration: underline !important;
    text-underline-offset: 2px !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"] .TopicFeedItem {
    background-color: var(--zb-surface) !important;
    border-bottom: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"] .TopicFeedItem:last-child {
    border-bottom: 0 !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    :is(.RichContent-inner, .RichText) {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    :is(.AuthorInfo-name, .AuthorInfo-name a) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    :is(.AuthorInfo-name, .AuthorInfo-name a):is(:hover, :focus-visible) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    :is(.AuthorInfo-badgeText, .ContentItem-time) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    :is(.ContentItem-actions, .RichContent-actions) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    > .ContentItem
    > :is(.ContentItem-actions, .RichContent-actions) {
    border-top: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:not(.VoteButton) {
    box-sizing: border-box !important;
    min-height: 28px !important;
    padding: 4px 6px !important;
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:not(.VoteButton):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    :is(.ContentItem-actions, .RichContent-actions)
    :is(
      .Button:not(.VoteButton):focus-visible,
      .ShareMenu-toggler[aria-expanded="true"] .Button
    ) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    :is(.ContentItem-actions, .RichContent-actions)
    .VoteButton {
    box-sizing: border-box !important;
    min-height: 32px !important;
    background-color: var(--zb-primary-soft) !important;
    border-color: transparent !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    :is(.ContentItem-actions, .RichContent-actions)
    .VoteButton:is(:hover, :focus-visible) {
    background-color: color-mix(
      in srgb,
      var(--zb-primary) 24%,
      transparent
    ) !important;
    color: var(--zb-primary-hover) !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    :is(.ContentItem-actions, .RichContent-actions)
    .Button
    :where(svg, path) {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    .Button[aria-label="收藏"]:is(:hover, :focus-visible),
  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    .Button[aria-label="已收藏"] {
    color: var(--zb-warning) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    .Button[aria-label="喜欢"]:is(:hover, :focus-visible),
  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    .Button:is(
      .Button--red,
      .is-active,
      [aria-label="取消喜欢"],
      [aria-pressed="true"]
    ):has(:is(.Zi--Heart, .Zi--HeartFill, .ZDI--HeartFill24)) {
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"] .TopicFeedItem .ContentItem-more {
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    .ContentItem-more:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary-hover) !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    .Comments-container {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    .Comments-container
    :is(.InputLike, .Editable) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    .Comments-container
    :is(.InputLike, .Editable):focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    .Comments-container
    button {
    border-radius: 6px !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"] .NumberBoard-item {
    border-radius: 8px !important;
    color: var(--zb-text-muted) !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .NumberBoard-item
    strong {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .NumberBoard-item:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .NumberBoard-item:is(:hover, :focus-visible)
    strong {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .NumberBoard--divider
    .NumberBoard-item + .NumberBoard-item::before {
    background-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"] .TopicRelativeBoard-title {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicRelativeBoard-topics
    .TopicTag {
    display: inline-block !important;
    height: 30px !important;
    line-height: 30px !important;
    vertical-align: top !important;
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 999px !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
    box-shadow: none !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicRelativeBoard-topics
    .TopicTag
    > div {
    display: inline-block !important;
    height: 30px !important;
    line-height: 30px !important;
    vertical-align: top !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicRelativeBoard-topics
    .TopicTag
    .Tag {
    box-sizing: border-box !important;
    height: 30px !important;
    padding: 0 12px !important;
    background-color: var(--zb-primary-soft) !important;
    border: 0 !important;
    border-radius: 999px !important;
    color: var(--zb-primary) !important;
    line-height: 30px !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicRelativeBoard-topics
    .TopicTag
    .Tag-content {
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicRelativeBoard-topics
    .TopicTag:hover
    .Tag {
    background-color: color-mix(
      in srgb,
      var(--zb-primary) 24%,
      transparent
    ) !important;
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicRelativeBoard-topics
    .TopicTag:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicRelativeBoard-topics
    .TopicTag:focus-visible
    .Tag {
    background-color: color-mix(
      in srgb,
      var(--zb-primary) 24%,
      transparent
    ) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"] .TopicRelativeBoard-link {
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicRelativeBoard-link:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .Popover-content:has(.ShareMenu-content),
  html[data-zb-theme][data-zb-topic-page="true"]
    .Popover-content:has(.Menu-item[aria-label="举报"]) {
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    :is(.ShareMenu-content, .ShareMenu-menuItems) {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedList
    :is(.PlaceHolder, .PlaceHolder-inner) {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedList
    .PlaceHolder-bg {
    background: linear-gradient(
      to right,
      var(--zb-surface-raised) 0%,
      var(--zb-surface-hover) 20%,
      var(--zb-surface-raised) 40%,
      var(--zb-surface-raised) 100%
    ) !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedList
    :is(.PlaceHolder-mask, .PlaceHolder-mask path) {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
  }

`;
