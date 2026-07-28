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

  it("marks topic subpages and clears the marker after SPA navigation", async () => {
    const page = createPage("https://www.zhihu.com/topic/19559593/hot");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    expect(page.window.document.documentElement.dataset.zbTopicPage).toBe("true");

    page.window.history.pushState({}, "", "/topic/19559593/newest");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(page.window.document.documentElement.dataset.zbTopicPage).toBe("true");

    page.window.history.replaceState({}, "", "/hot");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(page.window.document.documentElement.dataset.zbTopicPage).toBe("false");

    feature.destroy();
    expect(page.window.document.documentElement.hasAttribute("data-zb-topic-page")).toBe(false);
  });

  it("marks ring feed and host routes independently across SPA navigation", async () => {
    const page = createPage("https://www.zhihu.com/ring-feeds");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    expect(page.window.document.documentElement.dataset.zbRingFeedsPage).toBe("true");
    expect(page.window.document.documentElement.dataset.zbRingHostPage).toBe("false");
    expect(page.window.document.documentElement.dataset.zbRingHostReady).toBe("false");

    page.window.history.pushState({}, "", "/ring/host/123");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));

    expect(page.window.document.documentElement.dataset.zbRingFeedsPage).toBe("false");
    expect(page.window.document.documentElement.dataset.zbRingHostPage).toBe("true");
    expect(page.window.document.documentElement.dataset.zbRingHostReady).toBe("false");

    page.window.document.querySelector("main").className = "App-main";
    page.window.document.querySelector("main").innerHTML = `
      <div>
        <div>
          <div>
            <div></div>
            <div><div></div><div><button>加入圈子</button></div></div>
            <div></div>
            <div><div>最新</div><div>最热</div><div>精华</div></div>
            <div class="List">
              <div class="List-item"><div class="PinItem">动态</div></div>
            </div>
          </div>
        </div>
      </div>
    `;
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(page.window.document.documentElement.dataset.zbRingHostReady).toBe("true");
    const hostAction = page.window.document.querySelector("button");
    expect(hostAction.dataset.zbRingHostAction).toBe("join");

    hostAction.textContent = "已加入";
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(hostAction.dataset.zbRingHostAction).toBe("joined");

    page.window.history.replaceState({}, "", "/ring-feeds/");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));

    expect(page.window.document.documentElement.dataset.zbRingFeedsPage).toBe("true");
    expect(page.window.document.documentElement.dataset.zbRingHostPage).toBe("false");
    expect(page.window.document.documentElement.dataset.zbRingHostReady).toBe("false");
    expect(hostAction.hasAttribute("data-zb-ring-host-action")).toBe(false);

    page.window.history.pushState({}, "", "/ring/host/not-a-number");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));

    expect(page.window.document.documentElement.dataset.zbRingFeedsPage).toBe("false");
    expect(page.window.document.documentElement.dataset.zbRingHostPage).toBe("false");

    feature.destroy();
    expect(page.window.document.documentElement.hasAttribute("data-zb-ring-feeds-page")).toBe(
      false,
    );
    expect(page.window.document.documentElement.hasAttribute("data-zb-ring-host-page")).toBe(false);
    expect(page.window.document.documentElement.hasAttribute("data-zb-ring-host-ready")).toBe(
      false,
    );
  });

  it("marks the ring index route without matching ring subpages", async () => {
    const page = createPage("https://www.zhihu.com/ring");
    page.window.document.querySelector("main").className = "App-main";
    page.window.document.querySelector("main").innerHTML = `
      <a href="/ring/host/1"><button><span>加入</span></button></a>
      <a href="/ring/host/2"><button><span>已加入</span></button></a>
    `;
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    expect(page.window.document.documentElement.dataset.zbRingIndexPage).toBe("true");
    const buttons = page.window.document.querySelectorAll("button");
    expect(buttons[0].dataset.zbRingIndexAction).toBe("join");
    expect(buttons[1].dataset.zbRingIndexAction).toBe("joined");

    buttons[0].querySelector("span").textContent = "取消加入";
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(buttons[0].dataset.zbRingIndexAction).toBe("joined");

    page.window.history.pushState({}, "", "/ring/host/123");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(page.window.document.documentElement.dataset.zbRingIndexPage).toBe("false");
    expect(buttons[0].hasAttribute("data-zb-ring-index-action")).toBe(false);
    expect(buttons[1].hasAttribute("data-zb-ring-index-action")).toBe(false);

    page.window.history.replaceState({}, "", "/ring/");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(page.window.document.documentElement.dataset.zbRingIndexPage).toBe("true");

    feature.destroy();
    expect(buttons[0].hasAttribute("data-zb-ring-index-action")).toBe(false);
    expect(buttons[1].hasAttribute("data-zb-ring-index-action")).toBe(false);
    expect(page.window.document.documentElement.hasAttribute("data-zb-ring-index-page")).toBe(
      false,
    );
  });

  it("marks paper detail routes and clears the marker after SPA navigation", async () => {
    const page = createPage("https://www.zhihu.com/kvip/sku/paper/1828155156228923392");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    expect(page.window.document.documentElement.dataset.zbPaperPage).toBe("true");

    page.window.history.pushState({}, "", "/search?q=%E6%90%BA%E7%A8%8B&type=scholar");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));

    expect(page.window.document.documentElement.dataset.zbPaperPage).toBe("false");

    feature.destroy();
    expect(page.window.document.documentElement.hasAttribute("data-zb-paper-page")).toBe(false);
  });

  it("marks AI search routes and clears the marker after SPA navigation", async () => {
    const page = createPage("https://www.zhihu.com/search?q=%E6%90%BA%E7%A8%8B&type=zhida");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    expect(page.window.document.documentElement.dataset.zbAiSearchPage).toBe("true");

    page.window.history.pushState({}, "", "/search?q=%E6%90%BA%E7%A8%8B&type=content");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));

    expect(page.window.document.documentElement.dataset.zbAiSearchPage).toBe("false");

    feature.destroy();
    expect(page.window.document.documentElement.hasAttribute("data-zb-ai-search-page")).toBe(false);
  });

  it("marks the AI source panel after it opens and clears owned state after it closes", async () => {
    const page = createPage("https://www.zhihu.com/search?q=%E6%90%BA%E7%A8%8B&type=zhida");
    page.window.document.body.innerHTML = `
      <div class="SearchMain">
        <div class="ai-layout">
          <div class="ai-content">
            <button data-testid="Button:reference_card_block_more_btn">全部来源 30</button>
          </div>
        </div>
      </div>
    `;
    const layout = page.window.document.querySelector(".ai-layout");
    const sourceButton = page.window.document.querySelector(
      '[data-testid="Button:reference_card_block_more_btn"]',
    );
    const panelWrapper = page.window.document.createElement("div");
    panelWrapper.innerHTML = `
      <div class="source-panel">
        <div class="source-header">
          <div>参考来源 30</div>
          <button class="source-close">关闭</button>
        </div>
        <div class="source-list"></div>
      </div>
    `;
    const panel = panelWrapper.querySelector(".source-panel");
    const closeButton = panelWrapper.querySelector(".source-close");
    sourceButton.addEventListener("click", () => layout.append(panelWrapper), { once: true });
    closeButton.addEventListener("click", () => panelWrapper.remove(), { once: true });
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    sourceButton.click();
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(panel.hasAttribute("data-zb-ai-source-panel")).toBe(true);

    closeButton.click();
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(panel.hasAttribute("data-zb-ai-source-panel")).toBe(false);

    feature.destroy();
  });

  it("marks the content-discovery heading as soon as it loads", async () => {
    const page = createPage("https://www.zhihu.com/search?q=%E6%90%BA%E7%A8%8B&type=zhida");
    page.window.document.body.innerHTML = '<div class="SearchMain"></div>';
    const searchMain = page.window.document.querySelector(".SearchMain");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    const headingRow = page.window.document.createElement("div");
    headingRow.innerHTML = '<svg></svg><div dir="auto">内容发现</div>';
    searchMain.append(headingRow);
    await new Promise((resolve) => page.window.queueMicrotask(resolve));

    const heading = headingRow.querySelector('div[dir="auto"]');
    expect(heading.hasAttribute("data-zb-ai-content-discovery-heading")).toBe(true);

    feature.destroy();
    expect(heading.hasAttribute("data-zb-ai-content-discovery-heading")).toBe(false);
  });

  it("marks a right-aligned user question as soon as it is inserted", async () => {
    const page = createPage("https://www.zhihu.com/search?q=%E6%90%BA%E7%A8%8B&type=zhida");
    page.window.document.body.innerHTML = '<div class="SearchMain"></div>';
    const searchMain = page.window.document.querySelector(".SearchMain");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    const questionRow = page.window.document.createElement("div");
    questionRow.innerHTML = `
      <div style="align-self: flex-end">
        <div
          style="max-width: 100%; padding: 12px; border-radius: 8px; background-color: rgba(90, 77, 248, 0.15); position: relative"
        >
          <div dir="auto">推荐问题生成的提问</div>
        </div>
      </div>
    `;
    searchMain.append(questionRow);
    await new Promise((resolve) => page.window.queueMicrotask(resolve));

    const question = questionRow.querySelector('div[style*="background-color"]');
    expect(question.hasAttribute("data-zb-ai-user-question")).toBe(true);

    feature.destroy();
    expect(question.hasAttribute("data-zb-ai-user-question")).toBe(false);
  });

  it("marks a dynamically loaded AI scroll-to-bottom button", async () => {
    const page = createPage("https://www.zhihu.com/search?q=%E6%90%BA%E7%A8%8B&type=zhida");
    page.window.document.body.innerHTML = '<div class="SearchMain"></div>';
    const searchMain = page.window.document.querySelector(".SearchMain");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    const button = page.window.document.createElement("div");
    button.tabIndex = 0;
    button.setAttribute(
      "style",
      "width: 32px; height: 32px; transform: rotate(90deg); background-color: rgb(255, 255, 255)",
    );
    button.innerHTML = '<svg viewBox="0 0 20 20"><path d="M11.979 14.55"></path></svg>';
    searchMain.append(button);
    await new Promise((resolve) => page.window.queueMicrotask(resolve));

    expect(button.hasAttribute("data-zb-ai-scroll-to-bottom")).toBe(true);

    feature.destroy();
    expect(button.hasAttribute("data-zb-ai-scroll-to-bottom")).toBe(false);
  });

  it("marks the complete expanded-answer action row", async () => {
    const page = createPage("https://www.zhihu.com/search?q=%E6%90%BA%E7%A8%8B&type=zhida");
    page.window.document.body.innerHTML = '<div class="SearchMain"></div>';
    const searchMain = page.window.document.querySelector(".SearchMain");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    const actionRow = page.window.document.createElement("div");
    actionRow.innerHTML = `
      <div><div tabindex="0" data-testid="Button:zhida_upvote_button"></div></div>
      <div><div tabindex="0"><svg></svg></div></div>
      <div><div tabindex="0" data-testid="Button:zhida_message_copy_btn">复制</div></div>
      <div><div tabindex="0" data-testid="Button:Share:zhida_message_share_btn">分享</div></div>
    `;
    searchMain.append(actionRow);
    await new Promise((resolve) => page.window.queueMicrotask(resolve));

    expect(actionRow.hasAttribute("data-zb-ai-answer-actions")).toBe(true);

    feature.destroy();
    expect(actionRow.hasAttribute("data-zb-ai-answer-actions")).toBe(false);
  });

  it("marks the share-mode action group", async () => {
    const page = createPage("https://www.zhihu.com/search?q=%E6%90%BA%E7%A8%8B&type=zhida");
    page.window.document.body.innerHTML = '<div class="SearchMain"></div>';
    const searchMain = page.window.document.querySelector(".SearchMain");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    const shareActionRow = page.window.document.createElement("div");
    shareActionRow.innerHTML = `
      <div tabindex="0"><div dir="auto">分享到想法</div></div>
      <div tabindex="0"><div dir="auto">生成图片</div></div>
      <div tabindex="0"><div dir="auto">复制链接</div></div>
      <div tabindex="0"><svg></svg></div>
    `;
    searchMain.append(shareActionRow);
    await new Promise((resolve) => page.window.queueMicrotask(resolve));

    expect(shareActionRow.hasAttribute("data-zb-ai-share-actions")).toBe(true);

    feature.destroy();
    expect(shareActionRow.hasAttribute("data-zb-ai-share-actions")).toBe(false);
  });

  it("marks share-mode checkboxes and updates their selected state", async () => {
    const page = createPage("https://www.zhihu.com/search?q=%E6%90%BA%E7%A8%8B&type=zhida");
    page.window.document.body.innerHTML = '<div class="SearchMain"></div>';
    const searchMain = page.window.document.querySelector(".SearchMain");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    const shareMode = page.window.document.createElement("div");
    shareMode.innerHTML = `
      <div class="share-actions">
        <div tabindex="0"><div dir="auto">分享到想法</div></div>
        <div tabindex="0"><div dir="auto">生成图片</div></div>
        <div tabindex="0"><div dir="auto">复制链接</div></div>
        <div tabindex="0"><svg></svg></div>
      </div>
      <div
        tabindex="0"
        style="align-self: flex-start; margin-right: 12px"
        class="share-checkbox"
      >
        <svg fill="#373a40" viewBox="0 0 24 24"><path d="M3 5.4"></path></svg>
      </div>
    `;
    searchMain.append(shareMode);
    await new Promise((resolve) => page.window.queueMicrotask(resolve));

    const checkbox = shareMode.querySelector(".share-checkbox");
    expect(checkbox.dataset.zbAiShareCheckboxChecked).toBe("true");

    checkbox.innerHTML =
      '<svg fill="#c4c7ce" viewBox="0 0 24 24"><path d="M18.6 4.5"></path></svg>';
    await new Promise((resolve) => page.window.queueMicrotask(resolve));
    expect(checkbox.dataset.zbAiShareCheckboxChecked).toBe("false");

    feature.destroy();
    expect(checkbox.hasAttribute("data-zb-ai-share-checkbox")).toBe(false);
    expect(checkbox.hasAttribute("data-zb-ai-share-checkbox-checked")).toBe(false);
  });

  it("marks paper preview routes and keeps detail and preview markers separate", async () => {
    const page = createPage("https://www.zhihu.com/kvip/pdf/paper/1828155156228923392");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    expect(page.window.document.documentElement.dataset.zbPaperPreviewPage).toBe("true");
    expect(page.window.document.documentElement.dataset.zbPaperPage).toBe("false");

    page.window.history.pushState({}, "", "/kvip/sku/paper/1828155156228923392");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));

    expect(page.window.document.documentElement.dataset.zbPaperPreviewPage).toBe("false");
    expect(page.window.document.documentElement.dataset.zbPaperPage).toBe("true");

    feature.destroy();
    expect(page.window.document.documentElement.hasAttribute("data-zb-paper-preview-page")).toBe(
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

  it("keeps the creator-page marker in sync across SPA navigation", async () => {
    const page = createPage("https://www.zhihu.com/creator/account/associated-account");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    expect(page.window.document.documentElement.dataset.zbCreatorPage).toBe("true");
    expect(page.window.document.documentElement.dataset.zbCreatorAssociatedAccountPage).toBe(
      "true",
    );

    page.window.history.pushState({}, "", "/creator/analytics");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(page.window.document.documentElement.dataset.zbCreatorPage).toBe("true");
    expect(page.window.document.documentElement.dataset.zbCreatorAssociatedAccountPage).toBe(
      "false",
    );

    page.window.history.pushState({}, "", "/hot");
    await new Promise((resolve) => page.window.requestAnimationFrame(resolve));
    expect(page.window.document.documentElement.dataset.zbCreatorPage).toBe("false");

    feature.destroy();
    expect(page.window.document.documentElement.dataset.zbCreatorPage).toBeUndefined();
    expect(
      page.window.document.documentElement.dataset.zbCreatorAssociatedAccountPage,
    ).toBeUndefined();
  });
});
