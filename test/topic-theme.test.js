import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

import { createPageStylesFeature } from "../src/features/page-styles.js";
import { CATPPUCCIN_THEME_STYLE } from "../src/styles/catppuccin-theme.js";
import { PAGE_STYLE_ENTRIES } from "../src/styles/pages/index.js";
import { TOPIC_PAGE_STYLE } from "../src/styles/pages/topic.js";
import {
  createRuleExpectation,
  dispatchPageContext,
  expectStyleInjected,
  expectStyleRemoved,
} from "./helpers/style-rules.js";

const expectRule = createRuleExpectation(TOPIC_PAGE_STYLE);

describe("topic page theme", () => {
  it("loads only on topic routes and unloads after SPA navigation", () => {
    const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
      url: "https://www.zhihu.com/topic/19559593/hot",
    });
    const feature = createPageStylesFeature(page.window, PAGE_STYLE_ENTRIES);

    feature.start();

    expectStyleInjected(page, "zb-topic-page-theme-style", TOPIC_PAGE_STYLE);

    page.window.history.pushState({}, "", "/question/123");
    dispatchPageContext(page, { question: true, topic: false });

    expectStyleRemoved(page, "zb-topic-page-theme-style");

    feature.destroy();
    page.window.close();
  });

  it("keeps topic rules out of the always-loaded theme", () => {
    expect(CATPPUCCIN_THEME_STYLE).not.toContain('[data-zb-topic-page="true"]');
    expect(CATPPUCCIN_THEME_STYLE).not.toContain(TOPIC_PAGE_STYLE);
  });

  it("themes the topic header, tabs and primary action", () => {
    expectRule(
      '  html[data-zb-theme][data-zb-topic-page="true"]\n    :is(.Topic-pageHeader, .Topic-pageHeaderMain, .Topic-bar)',
      [
        "background-color: var(--zb-surface) !important;",
        "border-color: var(--zb-border) !important;",
        "color: var(--zb-text) !important;",
      ],
    );
    expectRule(
      '  html[data-zb-theme][data-zb-topic-page="true"]\n    .Topic-tabs\n    .Tabs-link.is-active',
      ["color: var(--zb-primary) !important;", "font-weight: 500 !important;"],
    );
    expectRule(
      '  html[data-zb-theme][data-zb-topic-page="true"]\n    .TopicActions\n    .FollowButton.Button--blue',
      [
        "background-color: var(--zb-primary) !important;",
        "border-color: var(--zb-primary) !important;",
        "color: var(--ctp-crust) !important;",
      ],
    );
  });

  it("themes feed cards, action buttons and the relative-topic board", () => {
    expectRule('  html[data-zb-theme][data-zb-topic-page="true"] .TopicFeedItem', [
      "background-color: var(--zb-surface) !important;",
      "border-bottom: 1px solid var(--zb-border) !important;",
      "color: var(--zb-text) !important;",
    ]);
    expectRule(
      '  html[data-zb-theme][data-zb-topic-page="true"]\n    .TopicFeedItem\n    :is(.ContentItem-actions, .RichContent-actions)\n    .VoteButton',
      [
        "background-color: var(--zb-primary-soft) !important;",
        "border-radius: 6px !important;",
        "color: var(--zb-primary) !important;",
      ],
    );
    expectRule(
      '  html[data-zb-theme][data-zb-topic-page="true"]\n    .TopicRelativeBoard-topics\n    .TopicTag\n    .Tag',
      [
        "height: 30px !important;",
        "background-color: var(--zb-primary-soft) !important;",
        "border-radius: 999px !important;",
        "color: var(--zb-primary) !important;",
      ],
    );
    expectRule(
      '  html[data-zb-theme][data-zb-topic-page="true"]\n    .TopicFeedList\n    .PlaceHolder-bg',
      ["background: linear-gradient(", "var(--zb-surface-hover) 20%"],
    );
  });
});
