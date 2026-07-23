import { HOME_SIDEBAR_STYLE } from "../styles/home-sidebar.js";

export const HOME_SIDEBAR_STORAGE_KEY = "zhihu-beautification:hide-home-sidebar";

const ROOT_ENABLED_ATTRIBUTE = "data-zb-hide-home-sidebar";
const ROOT_HOME_ATTRIBUTE = "data-zb-home-page";
const ROOT_QUESTION_ATTRIBUTE = "data-zb-question-page";
const ROOT_QUESTION_CONTENT_ATTRIBUTE = "data-zb-question-content-under-header";
const SIDEBAR_ATTRIBUTE = "data-zb-home-sidebar";
const STYLE_ID = "zb-home-sidebar-style";

const readPreference = (browserWindow, settings) => {
  try {
    if (settings?.getPreference) return Boolean(settings.getPreference(true));

    const storedValue = browserWindow.localStorage.getItem(HOME_SIDEBAR_STORAGE_KEY);
    return storedValue === null ? true : storedValue === "true";
  } catch {
    return true;
  }
};

export const createHomeSidebarFeature = (browserWindow, settings) => {
  const browserDocument = browserWindow.document;
  let shouldHideSidebar = readPreference(browserWindow, settings);
  let observer;
  let animationFrameId;
  let positionAnimationFrameId;
  let menuCommandId;
  let positionScheduled = false;
  let scheduled = false;
  let started = false;

  const isHomePage = () =>
    browserWindow.location.hostname === "www.zhihu.com" && browserWindow.location.pathname === "/";

  const isQuestionPage = () =>
    browserWindow.location.hostname === "www.zhihu.com" &&
    /^\/question\/\d+(?:\/answer\/\d+)?\/?$/.test(browserWindow.location.pathname);

  const updateRootState = () => {
    const root = browserDocument.documentElement;
    if (!root) return;

    root.setAttribute(ROOT_HOME_ATTRIBUTE, String(isHomePage()));
    root.setAttribute(ROOT_QUESTION_ATTRIBUTE, String(isQuestionPage()));
    root.setAttribute(ROOT_ENABLED_ATTRIBUTE, String(shouldHideSidebar));
  };

  const updateQuestionContentPosition = () => {
    const root = browserDocument.documentElement;
    if (!root) return;

    const pageHeader = browserDocument.querySelector(".PageHeader.is-shown");
    const questionContent = browserDocument.querySelector(
      ".Question-mainColumn :is(.AnswersNavWrapper, .AnswerCard, .MoreAnswers)",
    );
    const isUnderHeader =
      isQuestionPage() &&
      pageHeader &&
      questionContent &&
      questionContent.getBoundingClientRect().top <= pageHeader.getBoundingClientRect().bottom + 10;

    root.setAttribute(ROOT_QUESTION_CONTENT_ATTRIBUTE, String(Boolean(isUnderHeader)));
  };

  const injectStyle = () => {
    if (browserDocument.getElementById(STYLE_ID)) return;

    const target = browserDocument.head ?? browserDocument.documentElement;
    if (!target) return;

    const style = browserDocument.createElement("style");
    style.id = STYLE_ID;
    style.textContent = HOME_SIDEBAR_STYLE;
    target.append(style);
  };

  const findHomeSidebar = () => {
    const container = browserDocument.querySelector(".Topstory-container");
    const rightSidebar = container?.querySelector(
      '[data-za-detail-view-path-module="RightSideBar"]',
    );
    const creatorCard = container?.querySelector(
      '[role="complementary"][aria-label="创作中心卡片"]',
    );

    if (!container) return null;

    const sidebarContent = rightSidebar ?? creatorCard;
    if (!sidebarContent) return null;

    return Array.from(container.children).find((child) => child.contains(sidebarContent)) ?? null;
  };

  const findQuestionSidebar = () => browserDocument.querySelector(".Question-sideColumn");

  const markSidebar = () => {
    browserDocument.querySelectorAll(`[${SIDEBAR_ATTRIBUTE}]`).forEach((element) => {
      element.removeAttribute(SIDEBAR_ATTRIBUTE);
    });

    if (isHomePage()) {
      findHomeSidebar()?.setAttribute(SIDEBAR_ATTRIBUTE, "");
    } else if (isQuestionPage()) {
      findQuestionSidebar()?.setAttribute(SIDEBAR_ATTRIBUTE, "");
    }
  };

  const updateMenuCommand = () => {
    if (!settings?.menu?.register) return;

    if (menuCommandId !== undefined && settings.menu.unregister) {
      settings.menu.unregister(menuCommandId);
    }

    const status = shouldHideSidebar ? "已开启" : "已关闭";
    menuCommandId = settings.menu.register(`隐藏右侧栏：${status}`, () => {
      savePreference(!shouldHideSidebar);
    });
  };

  const savePreference = (value) => {
    shouldHideSidebar = value;
    try {
      if (settings?.setPreference) {
        settings.setPreference(value);
      } else {
        browserWindow.localStorage.setItem(HOME_SIDEBAR_STORAGE_KEY, String(value));
      }
    } catch {
      // 用户脚本存储不可用时，本次页面内的选择仍然有效。
    }
    updateRootState();
    markSidebar();
    updateMenuCommand();
  };

  const ensureObserver = () => {
    if (observer || !browserDocument.documentElement) return;

    observer = new browserWindow.MutationObserver(scheduleRefresh);
    observer.observe(browserDocument.documentElement, { childList: true, subtree: true });
  };

  const refresh = () => {
    updateRootState();
    updateQuestionContentPosition();
    injectStyle();
    markSidebar();
    ensureObserver();
  };

  function scheduleRefresh() {
    if (scheduled) return;
    scheduled = true;
    animationFrameId = browserWindow.requestAnimationFrame(() => {
      scheduled = false;
      refresh();
    });
  }

  function schedulePositionRefresh() {
    if (positionScheduled) return;
    positionScheduled = true;
    positionAnimationFrameId = browserWindow.requestAnimationFrame(() => {
      positionScheduled = false;
      updateQuestionContentPosition();
    });
  }

  const start = () => {
    if (started) return;
    started = true;
    refresh();
    updateMenuCommand();
    browserDocument.addEventListener("DOMContentLoaded", scheduleRefresh, { once: true });
    browserWindow.addEventListener("popstate", scheduleRefresh);
    browserWindow.addEventListener("resize", schedulePositionRefresh);
    browserWindow.addEventListener("scroll", schedulePositionRefresh, { passive: true });
  };

  const destroy = () => {
    observer?.disconnect();
    if (animationFrameId !== undefined) {
      browserWindow.cancelAnimationFrame(animationFrameId);
    }
    if (positionAnimationFrameId !== undefined) {
      browserWindow.cancelAnimationFrame(positionAnimationFrameId);
    }
    browserDocument.removeEventListener("DOMContentLoaded", scheduleRefresh);
    browserWindow.removeEventListener("popstate", scheduleRefresh);
    browserWindow.removeEventListener("resize", schedulePositionRefresh);
    browserWindow.removeEventListener("scroll", schedulePositionRefresh);
    if (menuCommandId !== undefined && settings?.menu?.unregister) {
      settings.menu.unregister(menuCommandId);
    }
    browserDocument.getElementById(STYLE_ID)?.remove();
    browserDocument.querySelectorAll(`[${SIDEBAR_ATTRIBUTE}]`).forEach((element) => {
      element.removeAttribute(SIDEBAR_ATTRIBUTE);
    });
    browserDocument.documentElement?.removeAttribute(ROOT_HOME_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_ENABLED_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_QUESTION_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_QUESTION_CONTENT_ATTRIBUTE);
  };

  return { destroy, refresh, start };
};
