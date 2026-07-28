export const FOLLOWING_FEED_COMPONENT_STYLE = `  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-title,
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-title
    a {
    color: var(--zb-primary) !important;
    transition: color 0.16s ease !important;
  }

  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-title:is(:hover, :focus-within),
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-title
    a:is(:hover, :focus-visible) {
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    .TopstoryItem-isFollow
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

  html[data-zb-theme]
    .TopstoryItem-isFollow
    .FollowButton.Button--blue:hover {
    border-color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    .TopstoryItem-isFollow
    .FollowButton.Button--blue:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

`;
