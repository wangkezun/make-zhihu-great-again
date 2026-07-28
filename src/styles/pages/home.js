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

`;
