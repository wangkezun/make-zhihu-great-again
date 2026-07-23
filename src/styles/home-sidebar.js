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
    width: min(var(--zb-home-main-width, 694px), calc(100vw - 32px)) !important;
  }

  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="true"]
    .Topstory-mainColumn {
    width: 100% !important;
    min-width: 0 !important;
  }

  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .Question-sideColumn,
  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    [data-zb-home-sidebar] {
    display: none !important;
  }

  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .QuestionHeader-side {
    display: none !important;
  }

  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .QuestionHeader-content,
  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .QuestionHeader-footer-inner {
    box-sizing: border-box !important;
    width: min(var(--zb-home-main-width, 694px), calc(100vw - 32px)) !important;
    margin-inline: auto !important;
    padding-inline: 16px !important;
  }

  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .QuestionHeader-content
    > .QuestionHeader-main,
  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .QuestionHeader-footer-main {
    width: 100% !important;
    min-width: 0 !important;
  }

  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .QuestionPage
    > div:has(.Question-mainColumn) {
    box-sizing: border-box !important;
    justify-content: center !important;
    width: min(var(--zb-home-main-width, 694px), calc(100vw - 32px)) !important;
    margin-inline: auto !important;
  }

  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .QuestionPage
    > div:has(.Question-mainColumn)
    > div:has(.Question-mainColumn),
  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .Question-mainColumn {
    width: 100% !important;
    min-width: 0 !important;
  }
`;
