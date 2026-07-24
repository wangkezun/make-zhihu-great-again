import { HOME_SIDEBAR_STYLE } from "../styles/home-sidebar.js";
import { ensureStyle, persistBooleanPreference, readBooleanPreference } from "./shared.js";

export const HOME_SIDEBAR_STORAGE_KEY = "zhihu-beautification:hide-home-sidebar";

const ROOT_ENABLED_ATTRIBUTE = "data-zb-hide-home-sidebar";
const ROOT_HOME_ATTRIBUTE = "data-zb-home-page";
const ROOT_QUESTION_ATTRIBUTE = "data-zb-question-page";
const ROOT_QUESTION_CONTENT_ATTRIBUTE = "data-zb-question-content-under-header";
const SIDEBAR_ATTRIBUTE = "data-zb-home-sidebar";
const STYLE_ID = "zb-home-sidebar-style";

export const createHomeSidebarFeature = (browserWindow, settings) => {
  const browserDocument = browserWindow.document;
  let shouldHideSidebar = readBooleanPreference(browserWindow, settings, HOME_SIDEBAR_STORAGE_KEY);
  let observer;
  let questionPositionObserver;
  let animationFrameId;
  let positionAnimationFrameId;
  let menuCommandId;
  let markedSidebar;
  let observedPageHeader;
  let observedQuestionContent;
  let pageKind;
  let originalPushState;
  let originalReplaceState;
  let wrappedPushState;
  let wrappedReplaceState;
  let positionScheduled = false;
  let scheduled = false;
  let started = false;

  const isHomeFeedPage = () =>
    browserWindow.location.hostname === "www.zhihu.com" &&
    /^\/(?:follow\/?)?$/.test(browserWindow.location.pathname);

  const isQuestionPage = () =>
    browserWindow.location.hostname === "www.zhihu.com" &&
    /^\/question\/\d+(?:\/answer\/\d+)?\/?$/.test(browserWindow.location.pathname);

  const getPageKind = () => {
    if (isHomeFeedPage()) return "home";
    if (isQuestionPage()) return "question";
    return "other";
  };

  const setRootAttribute = (name, value) => {
    const root = browserDocument.documentElement;
    const nextValue = String(value);
    if (root?.getAttribute(name) !== nextValue) {
      root?.setAttribute(name, nextValue);
    }
  };

  const updateRootState = () => {
    const nextPageKind = getPageKind();
    if (nextPageKind !== pageKind) {
      markedSidebar?.removeAttribute(SIDEBAR_ATTRIBUTE);
      markedSidebar = undefined;
    }
    pageKind = nextPageKind;
    setRootAttribute(ROOT_HOME_ATTRIBUTE, pageKind === "home");
    setRootAttribute(ROOT_QUESTION_ATTRIBUTE, pageKind === "question");
    setRootAttribute(ROOT_ENABLED_ATTRIBUTE, shouldHideSidebar);
  };

  const updateQuestionContentPosition = () => {
    if (getPageKind() !== "question") {
      observedPageHeader = undefined;
      observedQuestionContent = undefined;
      setRootAttribute(ROOT_QUESTION_CONTENT_ATTRIBUTE, false);
      return;
    }

    const pageHeader = browserDocument.querySelector(".PageHeader.is-shown");
    const questionContent = browserDocument.querySelector(
      ".Question-mainColumn :is(.AnswersNavWrapper, .AnswerCard, .MoreAnswers)",
    );
    observedPageHeader = pageHeader;
    observedQuestionContent = questionContent;
    const isUnderHeader =
      pageHeader &&
      questionContent &&
      questionContent.getBoundingClientRect().top <= pageHeader.getBoundingClientRect().bottom + 10;

    setRootAttribute(ROOT_QUESTION_CONTENT_ATTRIBUTE, Boolean(isUnderHeader));
  };

  const findQuestionContent = () =>
    browserDocument.querySelector(
      ".Question-mainColumn :is(.AnswersNavWrapper, .AnswerCard, .MoreAnswers)",
    );

  const setupQuestionPositionObserver = (force = false) => {
    if (!browserWindow.IntersectionObserver) {
      updateQuestionContentPosition();
      return;
    }

    if (pageKind !== "question") {
      questionPositionObserver?.disconnect();
      questionPositionObserver = undefined;
      observedPageHeader = undefined;
      observedQuestionContent = undefined;
      setRootAttribute(ROOT_QUESTION_CONTENT_ATTRIBUTE, false);
      return;
    }

    const pageHeader = browserDocument.querySelector(".PageHeader.is-shown");
    const questionContent = findQuestionContent();
    if (
      !force &&
      questionPositionObserver &&
      pageHeader === observedPageHeader &&
      questionContent === observedQuestionContent
    ) {
      return;
    }

    questionPositionObserver?.disconnect();
    questionPositionObserver = undefined;
    observedPageHeader = pageHeader;
    observedQuestionContent = questionContent;
    if (!pageHeader || !questionContent) {
      setRootAttribute(ROOT_QUESTION_CONTENT_ATTRIBUTE, false);
      return;
    }

    const headerBoundary = Math.max(0, Math.ceil(pageHeader.getBoundingClientRect().bottom + 10));
    questionPositionObserver = new browserWindow.IntersectionObserver(
      (entries) => {
        const entry = entries.find(({ target }) => target === observedQuestionContent);
        if (!entry) return;

        const boundary = entry.rootBounds?.top ?? headerBoundary;
        setRootAttribute(ROOT_QUESTION_CONTENT_ATTRIBUTE, entry.boundingClientRect.top <= boundary);
      },
      {
        root: null,
        rootMargin: `-${headerBoundary}px 0px 0px 0px`,
        threshold: [0, 1],
      },
    );
    questionPositionObserver.observe(questionContent);
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
    let nextSidebar;
    if (pageKind === "home") {
      nextSidebar = findHomeSidebar();
    } else if (pageKind === "question") {
      nextSidebar = findQuestionSidebar();
    }

    if (nextSidebar === markedSidebar) return;

    markedSidebar?.removeAttribute(SIDEBAR_ATTRIBUTE);
    markedSidebar = nextSidebar;
    markedSidebar?.setAttribute(SIDEBAR_ATTRIBUTE, "");
  };

  const handleMutations = () => {
    const needsSidebar = pageKind === "home" || pageKind === "question";
    const needsQuestionContent = pageKind === "question";
    if (
      (needsSidebar && !markedSidebar?.isConnected) ||
      (needsQuestionContent && !observedQuestionContent?.isConnected)
    ) {
      scheduleRefresh();
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
    persistBooleanPreference(browserWindow, settings, HOME_SIDEBAR_STORAGE_KEY, value);
    updateRootState();
    markSidebar();
    updateMenuCommand();
  };

  const configureObserver = () => {
    observer?.disconnect();
    observer = undefined;
    if (pageKind === "other" || !browserDocument.documentElement) return;

    observer = new browserWindow.MutationObserver(handleMutations);
    const needsSidebarDiscovery = !markedSidebar?.isConnected;
    const needsContentDiscovery = pageKind === "question" && !observedQuestionContent?.isConnected;
    if (needsSidebarDiscovery || needsContentDiscovery) {
      observer.observe(browserDocument.documentElement, { childList: true, subtree: true });
      return;
    }

    if (markedSidebar?.parentElement) {
      observer.observe(markedSidebar.parentElement, { childList: true });
    }
    if (
      pageKind === "question" &&
      observedQuestionContent?.parentElement &&
      observedQuestionContent.parentElement !== markedSidebar?.parentElement
    ) {
      observer.observe(observedQuestionContent.parentElement, { childList: true });
    }
  };

  const refresh = () => {
    updateRootState();
    ensureStyle(browserDocument, STYLE_ID, HOME_SIDEBAR_STYLE);
    markSidebar();
    setupQuestionPositionObserver();
    configureObserver();
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
      setupQuestionPositionObserver(true);
    });
  }

  const installRouteListeners = () => {
    browserWindow.addEventListener("popstate", scheduleRefresh);
    if (browserWindow.navigation?.addEventListener) {
      browserWindow.navigation.addEventListener("currententrychange", scheduleRefresh);
      return;
    }

    const history = browserWindow.history;
    if (!history?.pushState || !history?.replaceState) return;

    originalPushState = history.pushState;
    originalReplaceState = history.replaceState;
    wrappedPushState = function (...args) {
      const result = originalPushState.apply(this, args);
      scheduleRefresh();
      return result;
    };
    wrappedReplaceState = function (...args) {
      const result = originalReplaceState.apply(this, args);
      scheduleRefresh();
      return result;
    };
    history.pushState = wrappedPushState;
    history.replaceState = wrappedReplaceState;
  };

  const removeRouteListeners = () => {
    browserWindow.removeEventListener("popstate", scheduleRefresh);
    browserWindow.navigation?.removeEventListener?.("currententrychange", scheduleRefresh);
    const history = browserWindow.history;
    if (history && wrappedPushState && history.pushState === wrappedPushState) {
      history.pushState = originalPushState;
    }
    if (history && wrappedReplaceState && history.replaceState === wrappedReplaceState) {
      history.replaceState = originalReplaceState;
    }
  };

  const start = () => {
    if (started) return;
    started = true;
    refresh();
    updateMenuCommand();
    browserDocument.addEventListener("DOMContentLoaded", scheduleRefresh, { once: true });
    installRouteListeners();
    browserWindow.addEventListener("resize", schedulePositionRefresh);
    if (!browserWindow.IntersectionObserver) {
      browserWindow.addEventListener("scroll", schedulePositionRefresh, { passive: true });
    }
  };

  const destroy = () => {
    observer?.disconnect();
    observer = undefined;
    questionPositionObserver?.disconnect();
    questionPositionObserver = undefined;
    if (animationFrameId !== undefined) {
      browserWindow.cancelAnimationFrame(animationFrameId);
    }
    if (positionAnimationFrameId !== undefined) {
      browserWindow.cancelAnimationFrame(positionAnimationFrameId);
    }
    browserDocument.removeEventListener("DOMContentLoaded", scheduleRefresh);
    removeRouteListeners();
    browserWindow.removeEventListener("resize", schedulePositionRefresh);
    browserWindow.removeEventListener("scroll", schedulePositionRefresh);
    if (menuCommandId !== undefined && settings?.menu?.unregister) {
      settings.menu.unregister(menuCommandId);
    }
    browserDocument.getElementById(STYLE_ID)?.remove();
    markedSidebar?.removeAttribute(SIDEBAR_ATTRIBUTE);
    markedSidebar = undefined;
    observedPageHeader = undefined;
    observedQuestionContent = undefined;
    browserDocument.documentElement?.removeAttribute(ROOT_HOME_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_ENABLED_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_QUESTION_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_QUESTION_CONTENT_ATTRIBUTE);
    started = false;
  };

  return { destroy, refresh, start };
};
