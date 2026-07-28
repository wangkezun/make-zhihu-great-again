export const HOME_PAGE_STYLE = `  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-mainColumnCard,
  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-mainColumnCard
    > .Topstory-content {
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    overflow: visible !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-mainColumn
    > .WriteArea {
    box-sizing: border-box !important;
    border: 1px solid var(--zb-border) !important;
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-mainColumn
    > .WriteArea:hover {
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-mainColumn
    > .WriteArea:focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow:
      var(--zb-shadow),
      0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-mainColumn
    > .WriteArea
    > div
    > div:has(> img[src*="/heifetz/assets/"])::after {
    border-top-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-recommend
    > .TopstoryItem {
    box-sizing: border-box !important;
    margin-bottom: 10px !important;
    background-clip: padding-box !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
    overflow: clip !important;
    transition: border-color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-recommend
    > .TopstoryItem:hover {
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-recommend
    > .TopstoryItem:focus-visible {
    border-color: var(--zb-primary) !important;
    box-shadow:
      var(--zb-shadow),
      0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-title,
  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-title
    a {
    color: var(--zb-primary) !important;
    transition: color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-title:is(:hover, :focus-within),
  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-title
    a:is(:hover, :focus-visible) {
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-container
    .FollowButton.Button--blue {
    box-sizing: border-box !important;
    border: 1px solid var(--zb-primary) !important;
    border-radius: 999px !important;
    font-weight: 500 !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-container
    .FollowButton.Button--blue:hover {
    border-color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-container
    .FollowButton.Button--blue:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:not(.VoteButton) {
    box-sizing: border-box !important;
    min-height: 28px !important;
    padding: 4px 6px !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-more {
    box-sizing: border-box !important;
    min-height: 28px !important;
    padding: 3px 8px !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    font-size: 14px !important;
    line-height: 22px !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-more:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-more:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:not(.VoteButton):not(.Button--blue):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:not(.VoteButton):not(.Button--blue):focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button[aria-label="收藏"]:is(:hover, :focus-visible)
    .Zi--Star,
  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button[aria-label="已收藏"]
    .Zi--Star {
    color: var(--zb-warning) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:is(
      .Button--red,
      .is-active,
      [aria-label="取消喜欢"],
      [aria-pressed="true"]
    ):has(
      :is(.Zi--Heart, .Zi--HeartFill, .ZDI--HeartFill24)
    )
    svg {
    color: var(--zb-danger) !important;
    fill: currentColor !important;
  }
`;
