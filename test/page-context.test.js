import { JSDOM } from "jsdom";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  createPageContextFeature,
  getPageContext,
  PAGE_CONTEXT_CHANGE_EVENT,
} from "../src/features/page-context.js";

const activePages = [];

const createPage = (url = "https://www.zhihu.com/") => {
  const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
    pretendToBeVisual: true,
    url,
  });
  activePages.push(page);
  return page;
};

const waitForAnimationFrame = (browserWindow) =>
  new Promise((resolve) => browserWindow.requestAnimationFrame(resolve));

afterEach(() => {
  activePages.splice(0).forEach((page) => page.window.close());
});

describe("page context feature", () => {
  it.each([
    ["https://www.zhihu.com/", "home"],
    ["https://www.zhihu.com/follow/", "home"],
    ["https://www.zhihu.com/messages", "messages"],
    ["https://www.zhihu.com/question/123/answer/456", "question"],
    ["https://www.zhihu.com/column/example", "column"],
    ["https://www.zhihu.com/people/example/answers", "profile"],
    ["https://www.zhihu.com/topic/19559593/newest", "topic"],
    ["https://www.zhihu.com/ring", "ringIndex"],
    ["https://www.zhihu.com/ring-feeds", "ringFeeds"],
    ["https://www.zhihu.com/ring/host/123", "ringHost"],
    ["https://www.zhihu.com/kvip/sku/paper/123", "paper"],
    ["https://www.zhihu.com/kvip/pdf/paper/123", "paperPreview"],
    ["https://www.zhihu.com/search?type=content&q=test", "search"],
    ["https://www.zhihu.com/search?type=zhida&q=test", "aiSearch"],
    ["https://www.zhihu.com/creator/content", "creator"],
    ["https://www.zhihu.com/creator/account/associated-account", "creatorAssociatedAccount"],
  ])("recognizes %s as %s", (url, expectedKey) => {
    const page = createPage(url);

    expect(getPageContext(page.window)[expectedKey]).toBe(true);
  });

  it("does not mark routes on other hosts", () => {
    const page = createPage("https://example.com/question/123");

    expect(Object.values(getPageContext(page.window))).not.toContain(true);
  });

  it("marks AI search as a subset of the common search route", () => {
    const commonSearch = createPage("https://www.zhihu.com/search?type=content&q=test");
    const aiSearch = createPage("https://www.zhihu.com/search?type=zhida&q=test");
    const nonSearch = createPage("https://www.zhihu.com/searching?q=test");

    expect(getPageContext(commonSearch.window)).toEqual(
      expect.objectContaining({ aiSearch: false, search: true }),
    );
    expect(getPageContext(aiSearch.window)).toEqual(
      expect.objectContaining({ aiSearch: true, search: true }),
    );
    expect(getPageContext(nonSearch.window)).toEqual(
      expect.objectContaining({ aiSearch: false, search: false }),
    );
  });

  it("keeps root markers in sync across SPA navigation and emits a change event", async () => {
    const page = createPage();
    const listener = vi.fn();
    page.window.addEventListener(PAGE_CONTEXT_CHANGE_EVENT, listener);
    const feature = createPageContextFeature(page.window);

    feature.start();
    expect(page.window.document.documentElement.dataset.zbHomePage).toBe("true");
    expect(page.window.document.documentElement.dataset.zbQuestionPage).toBe("false");

    page.window.history.pushState({}, "", "/question/123");
    await waitForAnimationFrame(page.window);

    expect(page.window.document.documentElement.dataset.zbHomePage).toBe("false");
    expect(page.window.document.documentElement.dataset.zbQuestionPage).toBe("true");
    expect(listener).toHaveBeenLastCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({ home: false, question: true }),
      }),
    );

    feature.destroy();
  });

  it("keeps the common and AI search markers in sync across SPA navigation", async () => {
    const page = createPage("https://www.zhihu.com/search?type=content&q=test");
    const feature = createPageContextFeature(page.window);

    feature.start();
    expect(page.window.document.documentElement.dataset.zbSearchPage).toBe("true");
    expect(page.window.document.documentElement.dataset.zbAiSearchPage).toBe("false");

    page.window.history.pushState({}, "", "/search?type=zhida&q=test");
    await waitForAnimationFrame(page.window);
    expect(page.window.document.documentElement.dataset.zbSearchPage).toBe("true");
    expect(page.window.document.documentElement.dataset.zbAiSearchPage).toBe("true");

    page.window.history.pushState({}, "", "/topic/19559593");
    await waitForAnimationFrame(page.window);
    expect(page.window.document.documentElement.dataset.zbSearchPage).toBe("false");
    expect(page.window.document.documentElement.dataset.zbAiSearchPage).toBe("false");

    feature.destroy();
  });

  it("starts idempotently and restores only its own History wrappers", () => {
    const page = createPage();
    const originalReplaceState = page.window.history.replaceState;
    const feature = createPageContextFeature(page.window);

    feature.start();
    const wrappedPushState = page.window.history.pushState;
    feature.start();
    expect(page.window.history.pushState).toBe(wrappedPushState);

    const laterWrapper = vi.fn();
    page.window.history.pushState = laterWrapper;
    feature.destroy();

    expect(page.window.history.pushState).toBe(laterWrapper);
    expect(page.window.history.replaceState).toBe(originalReplaceState);
    expect(page.window.document.documentElement.hasAttribute("data-zb-home-page")).toBe(false);
  });
});
