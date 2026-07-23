export const HOME_WIDTH_STYLE = `
  html[data-zb-home-width="standard"] {
    --zb-home-main-width: 694px;
  }

  html[data-zb-home-width="comfortable"] {
    --zb-home-main-width: 820px;
  }

  html[data-zb-home-width="wide"] {
    --zb-home-main-width: 960px;
  }

  html[data-zb-home-width="fluid"] {
    --zb-home-main-width: calc(100vw - 32px);
  }

  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="false"]
    .Topstory-container {
    width: min(calc(var(--zb-home-main-width, 694px) + 306px), calc(100vw - 32px)) !important;
  }

  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="false"]
    .Topstory-mainColumn {
    width: min(var(--zb-home-main-width, 694px), calc(100% - 306px)) !important;
    min-width: 0 !important;
  }
`;
