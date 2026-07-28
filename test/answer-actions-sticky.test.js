import { JSDOM } from "jsdom";
import { afterEach, describe, expect, it } from "vitest";

import { createAnswerActionsStickyFeature } from "../src/features/answer-actions-sticky.js";
import { ANSWER_ACTIONS_STICKY_STYLE } from "../src/styles/answer-actions-sticky.js";

const activePages = [];

const createPage = ({
  actionClass = "ContentItem-actions",
  itemClass = "ContentItem AnswerItem",
  pageClass = "QuestionPage",
  richClass = "RichContent",
  url = "https://www.zhihu.com/question/123",
} = {}) => {
  const page = new JSDOM(
    `<!doctype html>
      <html data-zb-theme="latte">
        <head></head>
        <body>
          <main class="${pageClass}">
            <article class="${itemClass}">
              <div class="${richClass}">
                <div class="RichContent-inner">答案正文</div>
                <div class="${actionClass}">赞同与其他操作</div>
              </div>
            </article>
          </main>
        </body>
      </html>`,
    { pretendToBeVisual: true, url },
  );
  Object.defineProperty(page.window, "innerHeight", { configurable: true, value: 900 });
  activePages.push(page);
  return page;
};

const rect = ({ bottom, height, left = 100, top, width = 600 }) => ({
  bottom,
  height,
  left,
  right: left + width,
  top,
  width,
});

const waitForFrame = (page) => new Promise((resolve) => page.window.requestAnimationFrame(resolve));

const setRects = (
  page,
  {
    actionRect = rect({ bottom: 1250, height: 54, top: 1196 }),
    itemRect = rect({ bottom: 1260, height: 660, top: 600 }),
    placeholderRect = actionRect,
    richRect = rect({ bottom: 1260, height: 660, top: 600 }),
  } = {},
) => {
  const item = page.window.document.querySelector(".TopstoryItem, .AnswerItem");
  const richContent = page.window.document.querySelector(".RichContent");
  const action = page.window.document.querySelector(".ContentItem-actions");
  const placeholder = page.window.document.querySelector(".zb-answer-actions-placeholder");
  item.getBoundingClientRect = () => itemRect;
  richContent.getBoundingClientRect = () => richRect;
  action.getBoundingClientRect = () => actionRect;
  placeholder.getBoundingClientRect = () => placeholderRect;
  return { action, item, placeholder, richContent };
};

afterEach(() => {
  activePages.splice(0).forEach((page) => page.window.close());
});

describe("answer actions sticky feature", () => {
  it.each([
    {
      itemClass: "ContentItem AnswerItem",
      pageClass: "QuestionPage",
      url: "https://www.zhihu.com/question/123",
    },
    {
      itemClass: "TopstoryItem",
      pageClass: "Topstory-mainColumn",
      url: "https://www.zhihu.com/",
    },
  ])("fixes an operation row below the viewport on $url", async (options) => {
    const page = createPage(options);
    const feature = createAnswerActionsStickyFeature(page.window);

    feature.start();
    const { action, placeholder } = setRects(page);
    await waitForFrame(page);

    expect(action.classList.contains("zb-answer-actions-fixed")).toBe(true);
    expect(action.style.getPropertyValue("--zb-answer-actions-left")).toBe("100px");
    expect(action.style.getPropertyValue("--zb-answer-actions-width")).toBe("600px");
    expect(placeholder.classList.contains("is-active")).toBe(true);
    expect(placeholder.style.getPropertyValue("--zb-answer-actions-height")).toBe("54px");
    feature.destroy();
  });

  it("returns the operation row to normal flow when its natural position becomes visible", async () => {
    const page = createPage();
    const feature = createAnswerActionsStickyFeature(page.window);
    feature.start();
    const elements = setRects(page);
    await waitForFrame(page);
    expect(elements.action.classList.contains("zb-answer-actions-fixed")).toBe(true);

    elements.item.getBoundingClientRect = () => rect({ bottom: 850, height: 660, top: 190 });
    elements.richContent.getBoundingClientRect = () => rect({ bottom: 850, height: 660, top: 190 });
    elements.placeholder.getBoundingClientRect = () => rect({ bottom: 850, height: 54, top: 796 });
    page.window.dispatchEvent(new page.window.Event("scroll"));
    await waitForFrame(page);

    expect(elements.action.classList.contains("zb-answer-actions-fixed")).toBe(false);
    expect(elements.placeholder.classList.contains("is-active")).toBe(false);
    feature.destroy();
  });

  it("normalizes the geometry of Zhihu's native fixed operation row", async () => {
    const page = createPage({
      actionClass: "ContentItem-actions Sticky RichContent-actions is-fixed is-bottom",
    });
    const feature = createAnswerActionsStickyFeature(page.window);
    feature.start();
    const { action, placeholder } = setRects(page);
    action.style.padding = "10px 20px";
    await waitForFrame(page);

    expect(action.classList.contains("is-fixed")).toBe(true);
    expect(action.classList.contains("zb-answer-actions-fixed")).toBe(false);
    expect(action.classList.contains("zb-answer-actions-native-fixed")).toBe(true);
    expect(action.style.getPropertyValue("--zb-answer-actions-left")).toBe("80px");
    expect(action.style.getPropertyValue("--zb-answer-actions-width")).toBe("640px");
    expect(placeholder.classList.contains("is-active")).toBe(false);
    feature.destroy();
  });

  it("does not fix a collapsed answer", async () => {
    const page = createPage({ richClass: "RichContent is-collapsed" });
    const feature = createAnswerActionsStickyFeature(page.window);
    feature.start();
    const { action } = setRects(page);
    await waitForFrame(page);

    expect(action.classList.contains("zb-answer-actions-fixed")).toBe(false);
    feature.destroy();
  });

  it("does not show an operation row before its answer enters the viewport", async () => {
    const page = createPage();
    const feature = createAnswerActionsStickyFeature(page.window);
    feature.start();
    const { action } = setRects(page, {
      actionRect: rect({ bottom: 1550, height: 54, top: 1496 }),
      itemRect: rect({ bottom: 1560, height: 560, top: 1000 }),
      richRect: rect({ bottom: 1560, height: 560, top: 1000 }),
    });
    await waitForFrame(page);

    expect(action.classList.contains("zb-answer-actions-fixed")).toBe(false);
    feature.destroy();
  });

  it("waits until a full operation-row height of the next answer is visible", async () => {
    const page = createPage();
    const feature = createAnswerActionsStickyFeature(page.window);
    feature.start();
    const { action } = setRects(page, {
      actionRect: rect({ bottom: 1450, height: 54, top: 1396 }),
      itemRect: rect({ bottom: 1450, height: 575, top: 875 }),
      richRect: rect({ bottom: 1450, height: 575, top: 875 }),
    });
    await waitForFrame(page);

    expect(action.classList.contains("zb-answer-actions-fixed")).toBe(false);
    feature.destroy();
  });

  it("restores its placeholder after an answer subtree is reconciled", async () => {
    const page = createPage();
    const feature = createAnswerActionsStickyFeature(page.window);
    feature.start();
    const { action, placeholder } = setRects(page);
    placeholder.remove();
    page.window.dispatchEvent(new page.window.Event("scroll"));
    await waitForFrame(page);

    expect(placeholder.isConnected).toBe(true);
    expect(placeholder.nextElementSibling).toBe(action);
    expect(action.classList.contains("zb-answer-actions-fixed")).toBe(true);
    feature.destroy();
  });

  it("does not rewrite stable fixed-row attributes on every refresh", async () => {
    const page = createPage();
    const feature = createAnswerActionsStickyFeature(page.window);
    feature.start();
    const { action, placeholder } = setRects(page);
    await waitForFrame(page);
    await waitForFrame(page);
    const mutations = [];
    const observer = new page.window.MutationObserver((records) => mutations.push(...records));
    observer.observe(action, { attributes: true });
    observer.observe(placeholder, { attributes: true });

    page.window.dispatchEvent(new page.window.Event("scroll"));
    await waitForFrame(page);
    await new Promise((resolve) => page.window.queueMicrotask(resolve));

    expect(mutations).toEqual([]);
    observer.disconnect();
    feature.destroy();
  });

  it("discovers answers added after startup and removes owned state on destroy", async () => {
    const page = new JSDOM(
      "<!doctype html><html data-zb-theme='latte'><head></head><body><main class='QuestionPage'></main></body></html>",
      {
        pretendToBeVisual: true,
        url: "https://www.zhihu.com/question/123",
      },
    );
    Object.defineProperty(page.window, "innerHeight", { configurable: true, value: 900 });
    activePages.push(page);
    const feature = createAnswerActionsStickyFeature(page.window);
    feature.start();

    page.window.document.querySelector("main").insertAdjacentHTML(
      "beforeend",
      `<article class="ContentItem AnswerItem">
        <div class="RichContent">
          <div class="RichContent-inner">动态答案</div>
          <div class="ContentItem-actions">赞同与其他操作</div>
        </div>
      </article>`,
    );
    await new Promise((resolve) => page.window.queueMicrotask(resolve));
    const { action, placeholder } = setRects(page);
    await waitForFrame(page);
    expect(action.classList.contains("zb-answer-actions-fixed")).toBe(true);

    feature.destroy();
    expect(action.classList.contains("zb-answer-actions-fixed")).toBe(false);
    expect(placeholder.isConnected).toBe(false);
    expect(page.window.document.getElementById("zb-answer-actions-sticky-style")).toBeNull();
  });

  it("defines a viewport-fixed operation row with reserved layout space", () => {
    expect(ANSWER_ACTIONS_STICKY_STYLE).toContain(".zb-answer-actions-native-fixed");
    expect(ANSWER_ACTIONS_STICKY_STYLE).toContain("position: fixed !important");
    expect(ANSWER_ACTIONS_STICKY_STYLE).toContain("bottom: 0 !important");
    expect(ANSWER_ACTIONS_STICKY_STYLE).toContain("margin: 0 !important");
    expect(ANSWER_ACTIONS_STICKY_STYLE).toMatch(
      /\.ContentItem-actions:is\([\s\S]*?\.zb-answer-actions-fixed,[\s\S]*?\.zb-answer-actions-native-fixed[\s\S]*?\)\s*\{[^}]*border: 0 !important;[^}]*border-top: 1px solid var\(--zb-border, #ebebeb\) !important;[^}]*border-radius: 0 !important;/,
    );
    expect(ANSWER_ACTIONS_STICKY_STYLE).toMatch(
      /> \.ContentItem-action:not\(\.ContentItem-rightButton\)\s*\{[^}]*margin-left: 16px !important;/,
    );
    expect(ANSWER_ACTIONS_STICKY_STYLE).toMatch(
      /> \.ContentItem-rightButton\s*\{[^}]*flex: 0 0 auto !important;[^}]*margin-left: auto !important;/,
    );
    expect(ANSWER_ACTIONS_STICKY_STYLE).toContain(".zb-answer-actions-placeholder.is-active");
  });

  it("themes a pin toolbar only inside a normalized fixed operation row", () => {
    expect(ANSWER_ACTIONS_STICKY_STYLE).toMatch(
      /\.ContentItem-actions:is\([\s\S]*?\.zb-answer-actions-fixed,[\s\S]*?\.zb-answer-actions-native-fixed[\s\S]*?\)\s+\.PinToolbar-actions\s*\{[^}]*background-color: var\(--zb-surface, #fff\) !important;[^}]*border-color: var\(--zb-border, #ebebeb\) !important;[^}]*color: var\(--zb-text, #121212\) !important;[^}]*\}/,
    );
    expect(ANSWER_ACTIONS_STICKY_STYLE).not.toMatch(
      /html\[data-zb-theme\]\s+\.PinToolbar-actions\s*\{/,
    );
  });
});
