import { JSDOM } from "jsdom";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  createHomeSidebarFeature,
  HOME_SIDEBAR_STORAGE_KEY,
} from "../src/features/home-sidebar.js";
import { HOME_SIDEBAR_STYLE } from "../src/styles/home-sidebar.js";

const activePages = [];

const createPage = (url = "https://www.zhihu.com/") => {
  const page = new JSDOM(
    `<!doctype html>
      <html>
        <head></head>
        <body>
          <main>
            <div class="Topstory-container">
              <div class="Topstory-mainColumn">问题列表</div>
              <div class="right-column" data-za-detail-view-path-module="RightSideBar">
                <div role="complementary" aria-label="创作中心卡片">创作中心</div>
              </div>
            </div>
          </main>
        </body>
      </html>`,
    { pretendToBeVisual: true, url },
  );
  activePages.push(page);
  return page;
};

const createQuestionPage = (url = "https://www.zhihu.com/question/123") => {
  const page = new JSDOM(
    `<!doctype html>
      <html>
        <head></head>
        <body>
          <main>
            <header class="AppHeader">
              <div class="PageHeader is-shown">吸附标题</div>
            </header>
            <div class="QuestionPage">
              <div class="question-layout">
                <div class="answer-wrapper">
                  <div class="Question-mainColumn">
                    <div class="AnswersNavWrapper">答案正文</div>
                  </div>
                </div>
                <div class="Question-sideColumn">答案右栏</div>
              </div>
            </div>
          </main>
        </body>
      </html>`,
    {
      pretendToBeVisual: true,
      url,
    },
  );
  activePages.push(page);
  return page;
};

afterEach(() => {
  activePages.splice(0).forEach((page) => page.window.close());
});

describe("home sidebar feature", () => {
  it("contains an immediate structural selector to prevent first-paint flicker", () => {
    expect(HOME_SIDEBAR_STYLE).toContain(".Topstory-mainColumn ~ div");
    expect(HOME_SIDEBAR_STYLE).toContain('[data-za-detail-view-path-module="RightSideBar"]');
    expect(HOME_SIDEBAR_STYLE).toContain("var(--zb-home-main-width, 694px)");
    expect(HOME_SIDEBAR_STYLE).toContain('html[data-zb-question-page="true"]');
    expect(HOME_SIDEBAR_STYLE).toContain(".Question-sideColumn");
    expect(HOME_SIDEBAR_STYLE).toContain(".QuestionHeader-side");
    expect(HOME_SIDEBAR_STYLE).toContain(".QuestionHeader-content");
    expect(HOME_SIDEBAR_STYLE).toContain(".QuestionHeader-footer-inner");
    expect(HOME_SIDEBAR_STYLE).toContain(".QuestionHeader-footer-main");
    expect(HOME_SIDEBAR_STYLE).toContain("box-sizing: border-box !important");
    expect(HOME_SIDEBAR_STYLE).toContain("padding-inline: 16px !important");
    expect(HOME_SIDEBAR_STYLE).toContain(".QuestionPage\n    > div:has(.Question-mainColumn)");
    expect(HOME_SIDEBAR_STYLE).not.toContain(":has(> .Question-sideColumn)");
  });

  it("hides the semantic right column by default", () => {
    const page = createPage();
    const feature = createHomeSidebarFeature(page.window);

    feature.start();

    expect(page.window.document.documentElement.dataset.zbHideHomeSidebar).toBe("true");
    expect(
      page.window.document.querySelector(".right-column").hasAttribute("data-zb-home-sidebar"),
    ).toBe(true);

    feature.destroy();
  });

  it.each(["https://www.zhihu.com/follow", "https://www.zhihu.com/follow/"])(
    "treats %s as a home feed and marks its semantic right column",
    (url) => {
      const page = createPage(url);
      const feature = createHomeSidebarFeature(page.window);

      feature.start();

      expect(page.window.document.documentElement.dataset.zbHomePage).toBe("true");
      expect(page.window.document.documentElement.dataset.zbQuestionPage).toBe("false");
      expect(
        page.window.document.querySelector(".right-column").hasAttribute("data-zb-home-sidebar"),
      ).toBe(true);

      feature.destroy();
    },
  );

  it("restores a saved preference to show the right column", () => {
    const page = createPage();
    page.window.localStorage.setItem(HOME_SIDEBAR_STORAGE_KEY, "false");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    expect(page.window.document.documentElement.dataset.zbHideHomeSidebar).toBe("false");
    expect(page.window.localStorage.getItem(HOME_SIDEBAR_STORAGE_KEY)).toBe("false");

    feature.destroy();
  });

  it("does not alter unrelated pages", () => {
    const page = createPage("https://www.zhihu.com/hot");
    const feature = createHomeSidebarFeature(page.window);

    feature.start();

    expect(page.window.document.documentElement.dataset.zbHomePage).toBe("false");
    expect(
      page.window.document.querySelector(".right-column").hasAttribute("data-zb-home-sidebar"),
    ).toBe(false);

    feature.destroy();
  });

  it.each(["https://www.zhihu.com/question/123", "https://www.zhihu.com/question/123/answer/456"])(
    "hides and marks the question sidebar on %s",
    (url) => {
      const page = createQuestionPage(url);
      const feature = createHomeSidebarFeature(page.window);

      feature.start();

      expect(page.window.document.documentElement.dataset.zbQuestionPage).toBe("true");
      expect(
        page.window.document
          .querySelector(".Question-sideColumn")
          .hasAttribute("data-zb-home-sidebar"),
      ).toBe(true);

      feature.destroy();
      expect(page.window.document.documentElement.dataset.zbQuestionPage).toBeUndefined();
    },
  );

  it("adds the header gap only after question content reaches the sticky header", async () => {
    const page = createQuestionPage();
    const pageHeader = page.window.document.querySelector(".PageHeader");
    const questionContent = page.window.document.querySelector(".AnswersNavWrapper");
    let contentTop = 120;
    pageHeader.getBoundingClientRect = () => ({ bottom: 62 });
    questionContent.getBoundingClientRect = () => ({ top: contentTop });
    const feature = createHomeSidebarFeature(page.window);

    feature.start();
    expect(page.window.document.documentElement.dataset.zbQuestionContentUnderHeader).toBe("false");

    contentTop = 72;
    page.window.dispatchEvent(new page.window.Event("scroll"));
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(page.window.document.documentElement.dataset.zbQuestionContentUnderHeader).toBe("true");

    contentTop = 120;
    page.window.dispatchEvent(new page.window.Event("scroll"));
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(page.window.document.documentElement.dataset.zbQuestionContentUnderHeader).toBe("false");

    feature.destroy();
    expect(
      page.window.document.documentElement.dataset.zbQuestionContentUnderHeader,
    ).toBeUndefined();
  });

  it("uses IntersectionObserver instead of polling scroll position when available", () => {
    const page = createQuestionPage();
    const pageHeader = page.window.document.querySelector(".PageHeader");
    const questionContent = page.window.document.querySelector(".AnswersNavWrapper");
    pageHeader.getBoundingClientRect = () => ({ bottom: 62 });
    let positionObserver;
    page.window.IntersectionObserver = class {
      constructor(callback, options) {
        this.callback = callback;
        this.options = options;
        this.disconnected = false;
        positionObserver = this;
      }

      observe(target) {
        this.target = target;
      }

      disconnect() {
        this.disconnected = true;
      }
    };
    const addEventListener = vi.spyOn(page.window, "addEventListener");
    const feature = createHomeSidebarFeature(page.window);

    feature.start();

    expect(positionObserver.target).toBe(questionContent);
    expect(positionObserver.options.rootMargin).toBe("-72px 0px 0px 0px");
    expect(addEventListener.mock.calls.some(([eventName]) => eventName === "scroll")).toBe(false);

    positionObserver.callback([
      {
        target: questionContent,
        boundingClientRect: { top: 70 },
        rootBounds: { top: 72 },
      },
    ]);
    expect(page.window.document.documentElement.dataset.zbQuestionContentUnderHeader).toBe("true");

    feature.destroy();
    expect(positionObserver.disconnected).toBe(true);
  });

  it("refreshes route state after history.pushState and restores history on destroy", async () => {
    const page = createPage();
    const originalPushState = page.window.history.pushState;
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    page.window.history.pushState({}, "", "/question/123");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));

    expect(page.window.document.documentElement.dataset.zbHomePage).toBe("false");
    expect(page.window.document.documentElement.dataset.zbQuestionPage).toBe("true");

    feature.destroy();
    expect(page.window.history.pushState).toBe(originalPushState);
  });

  it("updates the home-feed state when SPA navigation enters and leaves /follow", async () => {
    const page = createPage("https://www.zhihu.com/hot");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    page.window.history.replaceState({}, "", "/follow");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));

    expect(page.window.document.documentElement.dataset.zbHomePage).toBe("true");
    expect(
      page.window.document.querySelector(".right-column").hasAttribute("data-zb-home-sidebar"),
    ).toBe(true);

    page.window.history.pushState({}, "", "/hot");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));

    expect(page.window.document.documentElement.dataset.zbHomePage).toBe("false");
    expect(
      page.window.document.querySelector(".right-column").hasAttribute("data-zb-home-sidebar"),
    ).toBe(false);

    feature.destroy();
  });

  it("marks column routes and clears the marker after SPA navigation", async () => {
    const page = createPage("https://www.zhihu.com/column/c_155611518");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    expect(page.window.document.documentElement.dataset.zbColumnPage).toBe("true");

    page.window.history.pushState({}, "", "/hot");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));

    expect(page.window.document.documentElement.dataset.zbColumnPage).toBe("false");

    feature.destroy();
    expect(page.window.document.documentElement.hasAttribute("data-zb-column-page")).toBe(false);
  });

  it("marks only the ring feeds route and keeps the marker in sync across SPA navigation", async () => {
    const page = createPage("https://www.zhihu.com/ring-feeds");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    expect(page.window.document.documentElement.dataset.zbRingFeedsPage).toBe("true");

    page.window.history.pushState({}, "", "/ring/host/123");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));

    expect(page.window.document.documentElement.dataset.zbRingFeedsPage).toBe("false");

    page.window.history.replaceState({}, "", "/ring-feeds/");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));

    expect(page.window.document.documentElement.dataset.zbRingFeedsPage).toBe("true");

    feature.destroy();
    expect(page.window.document.documentElement.hasAttribute("data-zb-ring-feeds-page")).toBe(
      false,
    );
  });

  it.each([
    "https://www.zhihu.com/people/tai-rui-er-de-jian-bing",
    "https://www.zhihu.com/people/tai-rui-er-de-jian-bing/",
    "https://www.zhihu.com/people/tai-rui-er-de-jian-bing/answers",
    "https://www.zhihu.com/people/tai-rui-er-de-jian-bing/following/topics",
  ])("marks %s as a profile page", (url) => {
    const page = createPage(url);
    const feature = createHomeSidebarFeature(page.window);

    feature.start();

    expect(page.window.document.documentElement.dataset.zbProfilePage).toBe("true");

    feature.destroy();
    expect(page.window.document.documentElement.hasAttribute("data-zb-profile-page")).toBe(false);
  });

  it.each(["https://www.zhihu.com/people", "https://www.zhihu.com/hot"])(
    "does not mark %s as a profile page",
    (url) => {
      const page = createPage(url);
      const feature = createHomeSidebarFeature(page.window);

      feature.start();

      expect(page.window.document.documentElement.dataset.zbProfilePage).toBe("false");

      feature.destroy();
    },
  );

  it("keeps the profile marker in sync across SPA navigation", async () => {
    const page = createPage("https://www.zhihu.com/hot");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    page.window.history.pushState({}, "", "/people/tai-rui-er-de-jian-bing");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(page.window.document.documentElement.dataset.zbProfilePage).toBe("true");

    page.window.history.replaceState({}, "", "/question/123");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(page.window.document.documentElement.dataset.zbProfilePage).toBe("false");

    feature.destroy();
  });

  it("marks column tabs only while they are stuck below the header", async () => {
    const page = createPage("https://www.zhihu.com/column/c_155611518");
    page.window.document.body.innerHTML = `
      <main class="App-main">
        <div>
          <div class="Card"></div>
          <div class="column-tabs" style="position: sticky; top: 52px"></div>
          <div></div>
        </div>
      </main>
    `;
    const columnTabs = page.window.document.querySelector(".column-tabs");
    let tabsTop = 180;
    columnTabs.getBoundingClientRect = () => ({ top: tabsTop });
    Object.defineProperty(page.window, "scrollY", { configurable: true, value: 0, writable: true });
    const feature = createHomeSidebarFeature(page.window);

    feature.start();
    expect(page.window.document.documentElement.dataset.zbColumnTabsStuck).toBe("false");

    page.window.scrollY = 160;
    tabsTop = 52;
    page.window.dispatchEvent(new page.window.Event("scroll"));
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(page.window.document.documentElement.dataset.zbColumnTabsStuck).toBe("true");

    page.window.scrollY = 20;
    tabsTop = 160;
    page.window.dispatchEvent(new page.window.Event("scroll"));
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(page.window.document.documentElement.dataset.zbColumnTabsStuck).toBe("false");

    feature.destroy();
    expect(page.window.document.documentElement.hasAttribute("data-zb-column-tabs-stuck")).toBe(
      false,
    );
  });

  it("registers a userscript menu command and keeps its status in sync", () => {
    const page = createPage();
    const commands = new Map();
    let nextCommandId = 1;
    let storedPreference = true;
    const settings = {
      getPreference: () => storedPreference,
      menu: {
        register: (label, callback) => {
          const commandId = nextCommandId++;
          commands.set(commandId, { callback, label });
          return commandId;
        },
        unregister: (commandId) => commands.delete(commandId),
      },
      setPreference: (value) => {
        storedPreference = value;
      },
    };
    const feature = createHomeSidebarFeature(page.window, settings);

    feature.start();
    const enabledCommand = [...commands.values()][0];
    expect(enabledCommand.label).toBe("隐藏右侧栏：已开启");

    enabledCommand.callback();
    const disabledCommand = [...commands.values()][0];
    expect(disabledCommand.label).toBe("隐藏右侧栏：已关闭");
    expect(storedPreference).toBe(false);
    expect(page.window.document.documentElement.dataset.zbHideHomeSidebar).toBe("false");

    feature.destroy();
    expect(commands.size).toBe(0);
  });

  it("does not refresh an already marked sidebar for unrelated mutations", async () => {
    const page = createPage();
    const feature = createHomeSidebarFeature(page.window);
    feature.start();
    await new Promise((resolve) => globalThis.setTimeout(resolve, 0));
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    const query = vi.spyOn(page.window.document, "querySelector");

    page.window.document.body.append(page.window.document.createElement("section"));
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));

    expect(query).not.toHaveBeenCalled();
    feature.destroy();
  });

  it("skips question-page queries while scrolling on the home page", async () => {
    const page = createPage();
    const feature = createHomeSidebarFeature(page.window);
    feature.start();
    await new Promise((resolve) => globalThis.setTimeout(resolve, 0));
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    const query = vi.spyOn(page.window.document, "querySelector");

    page.window.dispatchEvent(new page.window.Event("scroll"));
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));

    expect(query).not.toHaveBeenCalled();
    feature.destroy();
  });
});
