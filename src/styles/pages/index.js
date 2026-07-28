import { AI_SEARCH_PAGE_STYLE } from "./ai-search.js";
import { COLUMN_PAGE_STYLE } from "./column.js";
import { CREATOR_PAGE_STYLE } from "./creator.js";
import { HOME_PAGE_STYLE } from "./home.js";
import { PAPER_PAGE_STYLE } from "./paper.js";
import { PROFILE_PAGE_STYLE } from "./profile.js";
import { QUESTION_PAGE_STYLE } from "./question.js";
import { RING_PAGE_STYLE } from "./ring.js";
import { SEARCH_PAGE_STYLE } from "./search.js";
import { TOPIC_PAGE_STYLE } from "./topic.js";

export const PAGE_STYLE_ENTRIES = [
  {
    pageKeys: "column",
    styleId: "zb-column-page-theme-style",
    styleText: COLUMN_PAGE_STYLE,
  },
  {
    pageKeys: "creator",
    styleId: "zb-creator-page-theme-style",
    styleText: CREATOR_PAGE_STYLE,
  },
  {
    pageKeys: "home",
    styleId: "zb-home-page-theme-style",
    styleText: HOME_PAGE_STYLE,
  },
  {
    pageKeys: "search",
    styleId: "zb-search-page-theme-style",
    styleText: SEARCH_PAGE_STYLE,
  },
  {
    pageKeys: "aiSearch",
    styleId: "zb-ai-search-page-theme-style",
    styleText: AI_SEARCH_PAGE_STYLE,
  },
  {
    pageKeys: ["paper", "paperPreview"],
    styleId: "zb-paper-page-theme-style",
    styleText: PAPER_PAGE_STYLE,
  },
  {
    pageKeys: "profile",
    styleId: "zb-profile-page-theme-style",
    styleText: PROFILE_PAGE_STYLE,
  },
  {
    pageKeys: "question",
    styleId: "zb-question-page-theme-style",
    styleText: QUESTION_PAGE_STYLE,
  },
  {
    pageKeys: ["ringIndex", "ringFeeds", "ringHost"],
    styleId: "zb-ring-page-theme-style",
    styleText: RING_PAGE_STYLE,
  },
  {
    pageKeys: "topic",
    styleId: "zb-topic-page-theme-style",
    styleText: TOPIC_PAGE_STYLE,
  },
];
