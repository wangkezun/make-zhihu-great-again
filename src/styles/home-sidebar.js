export const HOME_SIDEBAR_STYLE = `
  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="true"]
    .Topstory-container > [data-zb-home-sidebar],
  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="true"]
    .Topstory-container > .Topstory-mainColumn ~ div,
  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="true"]
    [data-za-detail-view-path-module="RightSideBar"],
  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="true"]
    .Topstory-container > :has([role="complementary"][aria-label="创作中心卡片"]) {
    display: none !important;
  }

  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="true"]
    .Topstory-container {
    width: min(694px, calc(100vw - 32px)) !important;
  }

  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="true"]
    .Topstory-mainColumn {
    width: 100% !important;
    min-width: 0 !important;
  }
`;
