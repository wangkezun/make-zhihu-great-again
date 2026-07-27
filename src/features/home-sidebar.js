import { HOME_SIDEBAR_STYLE } from "../styles/home-sidebar.js";
import { ensureStyle, persistBooleanPreference, readBooleanPreference } from "./shared.js";

export const HOME_SIDEBAR_STORAGE_KEY = "zhihu-beautification:hide-home-sidebar";

const ROOT_ENABLED_ATTRIBUTE = "data-zb-hide-home-sidebar";
const ROOT_HOME_ATTRIBUTE = "data-zb-home-page";
const ROOT_COLUMN_ATTRIBUTE = "data-zb-column-page";
const ROOT_COLUMN_TABS_STUCK_ATTRIBUTE = "data-zb-column-tabs-stuck";
const ROOT_PROFILE_ATTRIBUTE = "data-zb-profile-page";
const ROOT_QUESTION_ATTRIBUTE = "data-zb-question-page";
const ROOT_QUESTION_CONTENT_ATTRIBUTE = "data-zb-question-content-under-header";
const ROOT_RING_FEEDS_ATTRIBUTE = "data-zb-ring-feeds-page";
const ROOT_PAPER_ATTRIBUTE = "data-zb-paper-page";
const ROOT_PAPER_PREVIEW_ATTRIBUTE = "data-zb-paper-preview-page";
const ROOT_AI_SEARCH_ATTRIBUTE = "data-zb-ai-search-page";
const SIDEBAR_ATTRIBUTE = "data-zb-home-sidebar";
const AI_SOURCE_PANEL_ATTRIBUTE = "data-zb-ai-source-panel";
const AI_CONTENT_DISCOVERY_HEADING_ATTRIBUTE = "data-zb-ai-content-discovery-heading";
const AI_USER_QUESTION_ATTRIBUTE = "data-zb-ai-user-question";
const AI_SCROLL_TO_BOTTOM_ATTRIBUTE = "data-zb-ai-scroll-to-bottom";
const AI_ANSWER_ACTIONS_ATTRIBUTE = "data-zb-ai-answer-actions";
const AI_SHARE_ACTIONS_ATTRIBUTE = "data-zb-ai-share-actions";
const AI_SHARE_CHECKBOX_ATTRIBUTE = "data-zb-ai-share-checkbox";
const AI_SHARE_CHECKBOX_CHECKED_ATTRIBUTE = "data-zb-ai-share-checkbox-checked";
const AI_SOURCE_BUTTON_SELECTOR = '[data-testid="Button:reference_card_block_more_btn"]';
const AI_INPUT_SELECTOR = '[data-testid="Block:zhida_input_box"]';
const AI_SOURCE_TITLE_PATTERN = /^参考来源\s*\d+$/;
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
  let markedAiSourcePanel;
  const markedAiContentDiscoveryHeadings = new Set();
  const markedAiUserQuestions = new Set();
  const markedAiScrollToBottomButtons = new Set();
  const markedAiAnswerActionRows = new Set();
  const markedAiShareActionRows = new Set();
  const markedAiShareCheckboxes = new Set();
  let observedAiSearchMain;
  let observedPageHeader;
  let observedQuestionContent;
  let pageKind;
  let originalPushState;
  let originalReplaceState;
  let wrappedPushState;
  let wrappedReplaceState;
  let columnScrollListening = false;
  let positionScheduled = false;
  let scheduled = false;
  let started = false;

  const isHomeFeedPage = () =>
    browserWindow.location.hostname === "www.zhihu.com" &&
    /^\/(?:follow\/?)?$/.test(browserWindow.location.pathname);

  const isQuestionPage = () =>
    browserWindow.location.hostname === "www.zhihu.com" &&
    /^\/question\/\d+(?:\/answer\/\d+)?\/?$/.test(browserWindow.location.pathname);

  const isColumnPage = () =>
    browserWindow.location.hostname === "www.zhihu.com" &&
    /^\/column\/[^/]+\/?$/.test(browserWindow.location.pathname);

  const isRingFeedsPage = () =>
    browserWindow.location.hostname === "www.zhihu.com" &&
    /^\/ring-feeds\/?$/.test(browserWindow.location.pathname);

  const isProfilePage = () =>
    browserWindow.location.hostname === "www.zhihu.com" &&
    /^\/people\/[^/]+(?:\/.*)?$/.test(browserWindow.location.pathname);

  const isPaperPage = () =>
    browserWindow.location.hostname === "www.zhihu.com" &&
    /^\/kvip\/sku\/paper\/\d+\/?$/.test(browserWindow.location.pathname);

  const isPaperPreviewPage = () =>
    browserWindow.location.hostname === "www.zhihu.com" &&
    /^\/kvip\/pdf\/paper\/\d+\/?$/.test(browserWindow.location.pathname);

  const isAiSearchPage = () =>
    browserWindow.location.hostname === "www.zhihu.com" &&
    /^\/search\/?$/.test(browserWindow.location.pathname) &&
    new browserWindow.URLSearchParams(browserWindow.location.search).get("type") === "zhida";

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
    setRootAttribute(ROOT_COLUMN_ATTRIBUTE, isColumnPage());
    setRootAttribute(ROOT_PROFILE_ATTRIBUTE, isProfilePage());
    setRootAttribute(ROOT_QUESTION_ATTRIBUTE, pageKind === "question");
    setRootAttribute(ROOT_RING_FEEDS_ATTRIBUTE, isRingFeedsPage());
    setRootAttribute(ROOT_PAPER_ATTRIBUTE, isPaperPage());
    setRootAttribute(ROOT_PAPER_PREVIEW_ATTRIBUTE, isPaperPreviewPage());
    setRootAttribute(ROOT_AI_SEARCH_ATTRIBUTE, isAiSearchPage());
    setRootAttribute(ROOT_ENABLED_ATTRIBUTE, shouldHideSidebar);
  };

  const updateColumnTabsPosition = () => {
    if (!isColumnPage()) {
      setRootAttribute(ROOT_COLUMN_TABS_STUCK_ATTRIBUTE, false);
      return;
    }

    const columnTabs = browserDocument.querySelector(".App-main > div > .Card + div");
    if (!columnTabs) {
      setRootAttribute(ROOT_COLUMN_TABS_STUCK_ATTRIBUTE, false);
      return;
    }

    const stickyTop = Number.parseFloat(browserWindow.getComputedStyle(columnTabs).top);
    const isStuck =
      Number.isFinite(stickyTop) &&
      browserWindow.scrollY > 0 &&
      columnTabs.getBoundingClientRect().top <= stickyTop + 1;
    setRootAttribute(ROOT_COLUMN_TABS_STUCK_ATTRIBUTE, isStuck);
  };

  const configureColumnScrollListener = () => {
    const shouldListen = isColumnPage();
    if (shouldListen === columnScrollListening) return;

    columnScrollListening = shouldListen;
    if (shouldListen) {
      browserWindow.addEventListener("scroll", schedulePositionRefresh, { passive: true });
    } else {
      browserWindow.removeEventListener("scroll", schedulePositionRefresh);
    }
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

  const findAiSourcePanel = () => {
    if (!isAiSearchPage()) return null;

    const searchMain = browserDocument.querySelector(".SearchMain");
    const sourceButton = searchMain?.querySelector(AI_SOURCE_BUTTON_SELECTOR);
    if (!searchMain || !sourceButton) return null;

    for (
      let current = sourceButton;
      current && current !== searchMain;
      current = current.parentElement
    ) {
      const parent = current.parentElement;
      if (!parent) break;

      for (const sibling of parent.children) {
        if (sibling === current) continue;

        const candidates = [sibling, ...sibling.querySelectorAll("div")];
        const title = candidates.find(
          (element) =>
            element.children.length === 0 &&
            AI_SOURCE_TITLE_PATTERN.test(element.textContent?.trim() ?? ""),
        );
        const panel = title?.parentElement?.parentElement;
        if (panel) return panel;
      }
    }

    return null;
  };

  const markAiSourcePanel = () => {
    const nextPanel = findAiSourcePanel();
    if (nextPanel === markedAiSourcePanel) return;

    markedAiSourcePanel?.removeAttribute(AI_SOURCE_PANEL_ATTRIBUTE);
    markedAiSourcePanel = nextPanel;
    markedAiSourcePanel?.setAttribute(AI_SOURCE_PANEL_ATTRIBUTE, "");
  };

  const markAiDynamicElements = (root = browserDocument) => {
    if (!isAiSearchPage()) {
      markedAiContentDiscoveryHeadings.forEach((heading) =>
        heading.removeAttribute(AI_CONTENT_DISCOVERY_HEADING_ATTRIBUTE),
      );
      markedAiContentDiscoveryHeadings.clear();
      markedAiUserQuestions.forEach((question) =>
        question.removeAttribute(AI_USER_QUESTION_ATTRIBUTE),
      );
      markedAiUserQuestions.clear();
      markedAiScrollToBottomButtons.forEach((button) =>
        button.removeAttribute(AI_SCROLL_TO_BOTTOM_ATTRIBUTE),
      );
      markedAiScrollToBottomButtons.clear();
      markedAiAnswerActionRows.forEach((row) => row.removeAttribute(AI_ANSWER_ACTIONS_ATTRIBUTE));
      markedAiAnswerActionRows.clear();
      markedAiShareActionRows.forEach((row) => row.removeAttribute(AI_SHARE_ACTIONS_ATTRIBUTE));
      markedAiShareActionRows.clear();
      markedAiShareCheckboxes.forEach((checkbox) => {
        checkbox.removeAttribute(AI_SHARE_CHECKBOX_ATTRIBUTE);
        checkbox.removeAttribute(AI_SHARE_CHECKBOX_CHECKED_ATTRIBUTE);
      });
      markedAiShareCheckboxes.clear();
      return;
    }

    const candidates = [];
    if (root.nodeType === 1 && root.matches('div[dir="auto"]')) {
      candidates.push(root);
    }
    root.querySelectorAll?.('div[dir="auto"]').forEach((element) => candidates.push(element));

    candidates.forEach((heading) => {
      if (heading.textContent?.trim() === "分享到想法") {
        const shareActionRow = heading.parentElement?.parentElement;
        const labels = Array.from(shareActionRow?.querySelectorAll('div[dir="auto"]') ?? []).map(
          (element) => element.textContent?.trim(),
        );
        if (
          shareActionRow?.querySelectorAll('[tabindex="0"]').length === 4 &&
          labels.includes("生成图片") &&
          labels.includes("复制链接")
        ) {
          shareActionRow.setAttribute(AI_SHARE_ACTIONS_ATTRIBUTE, "");
          markedAiShareActionRows.add(shareActionRow);
        }
      }

      const questionBubble = heading.parentElement;
      const bubbleStyle = questionBubble?.getAttribute("style") ?? "";
      if (
        bubbleStyle.includes("background-color: rgba(90, 77, 248, 0.15)") &&
        bubbleStyle.includes("padding: 12px") &&
        questionBubble.parentElement?.getAttribute("style")?.includes("align-self: flex-end")
      ) {
        questionBubble.setAttribute(AI_USER_QUESTION_ATTRIBUTE, "");
        markedAiUserQuestions.add(questionBubble);
      }

      const headingRow = heading.parentElement;
      if (
        heading.textContent?.trim() !== "内容发现" ||
        heading.closest(AI_INPUT_SELECTOR) ||
        headingRow?.firstElementChild?.tagName !== "svg" ||
        headingRow.lastElementChild !== heading
      ) {
        return;
      }

      heading.setAttribute(AI_CONTENT_DISCOVERY_HEADING_ATTRIBUTE, "");
      markedAiContentDiscoveryHeadings.add(heading);
    });

    const scrollButtons = [];
    const scrollButtonSelector = 'div[tabindex="0"][style*="transform: rotate(90deg)"]';
    if (root.nodeType === 1 && root.matches(scrollButtonSelector)) {
      scrollButtons.push(root);
    }
    root.querySelectorAll?.(scrollButtonSelector).forEach((element) => scrollButtons.push(element));

    scrollButtons.forEach((button) => {
      const style = button.getAttribute("style") ?? "";
      if (
        !style.includes("width: 32px") ||
        !style.includes("height: 32px") ||
        !button.querySelector('svg[viewBox="0 0 20 20"] > path')
      ) {
        return;
      }

      button.setAttribute(AI_SCROLL_TO_BOTTOM_ATTRIBUTE, "");
      markedAiScrollToBottomButtons.add(button);
    });

    const copyButtons = [];
    const copyButtonSelector = '[data-testid="Button:zhida_message_copy_btn"]';
    if (root.nodeType === 1 && root.matches(copyButtonSelector)) {
      copyButtons.push(root);
    }
    root.querySelectorAll?.(copyButtonSelector).forEach((element) => copyButtons.push(element));

    copyButtons.forEach((copyButton) => {
      const actionRow = copyButton.parentElement?.parentElement;
      if (
        !actionRow?.querySelector('[data-testid="Button:Share:zhida_message_share_btn"]') ||
        !actionRow.querySelector('[data-testid="Button:zhida_upvote_button"]')
      ) {
        return;
      }

      actionRow.setAttribute(AI_ANSWER_ACTIONS_ATTRIBUTE, "");
      markedAiAnswerActionRows.add(actionRow);
    });

    const checkboxSelector =
      'div[tabindex="0"][style*="align-self: flex-start"][style*="margin-right: 12px"]';
    const checkboxCandidates = new Set();
    if (root.nodeType === 1) {
      if (root.matches(checkboxSelector)) checkboxCandidates.add(root);
      const ancestor = root.closest(checkboxSelector);
      if (ancestor) checkboxCandidates.add(ancestor);
    }
    root.querySelectorAll?.(checkboxSelector).forEach((element) => checkboxCandidates.add(element));

    checkboxCandidates.forEach((checkbox) => {
      const icon = checkbox.querySelector('svg[viewBox="0 0 24 24"]:has(> path)');
      if (!icon || !browserDocument.querySelector(`[${AI_SHARE_ACTIONS_ATTRIBUTE}]`)) return;

      checkbox.setAttribute(AI_SHARE_CHECKBOX_ATTRIBUTE, "");
      checkbox.setAttribute(
        AI_SHARE_CHECKBOX_CHECKED_ATTRIBUTE,
        String(icon.getAttribute("fill")?.toLowerCase() === "#373a40"),
      );
      markedAiShareCheckboxes.add(checkbox);
    });
  };

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

  const handleMutations = (records) => {
    if (isAiSearchPage()) {
      records.forEach(({ addedNodes }) => {
        addedNodes.forEach((node) => {
          if (node.nodeType === 1) markAiDynamicElements(node);
        });
      });
      if (!observedAiSearchMain?.isConnected && browserDocument.querySelector(".SearchMain")) {
        scheduleRefresh();
      }
      return;
    }

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
    observedAiSearchMain = undefined;
    if (!browserDocument.documentElement) return;

    observer = new browserWindow.MutationObserver(handleMutations);
    if (isAiSearchPage()) {
      observedAiSearchMain = browserDocument.querySelector(".SearchMain");
      observer.observe(observedAiSearchMain ?? browserDocument.documentElement, {
        childList: true,
        subtree: true,
      });
      return;
    }
    if (pageKind === "other") return;

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
    configureColumnScrollListener();
    updateColumnTabsPosition();
    ensureStyle(browserDocument, STYLE_ID, HOME_SIDEBAR_STYLE);
    markSidebar();
    markAiSourcePanel();
    markAiDynamicElements();
    setupQuestionPositionObserver();
    configureObserver();
  };

  const handleAiSourcePanelInteraction = ({ target }) => {
    if (
      !isAiSearchPage() ||
      (!target?.closest?.(AI_SOURCE_BUTTON_SELECTOR) && !markedAiSourcePanel?.contains(target))
    ) {
      return;
    }

    scheduleRefresh();
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
      updateColumnTabsPosition();
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
    browserDocument.addEventListener("click", handleAiSourcePanelInteraction, true);
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
    browserDocument.removeEventListener("click", handleAiSourcePanelInteraction, true);
    removeRouteListeners();
    browserWindow.removeEventListener("resize", schedulePositionRefresh);
    browserWindow.removeEventListener("scroll", schedulePositionRefresh);
    columnScrollListening = false;
    if (menuCommandId !== undefined && settings?.menu?.unregister) {
      settings.menu.unregister(menuCommandId);
    }
    browserDocument.getElementById(STYLE_ID)?.remove();
    markedSidebar?.removeAttribute(SIDEBAR_ATTRIBUTE);
    markedSidebar = undefined;
    markedAiSourcePanel?.removeAttribute(AI_SOURCE_PANEL_ATTRIBUTE);
    markedAiSourcePanel = undefined;
    markedAiContentDiscoveryHeadings.forEach((heading) =>
      heading.removeAttribute(AI_CONTENT_DISCOVERY_HEADING_ATTRIBUTE),
    );
    markedAiContentDiscoveryHeadings.clear();
    markedAiUserQuestions.forEach((question) =>
      question.removeAttribute(AI_USER_QUESTION_ATTRIBUTE),
    );
    markedAiUserQuestions.clear();
    markedAiScrollToBottomButtons.forEach((button) =>
      button.removeAttribute(AI_SCROLL_TO_BOTTOM_ATTRIBUTE),
    );
    markedAiScrollToBottomButtons.clear();
    markedAiAnswerActionRows.forEach((row) => row.removeAttribute(AI_ANSWER_ACTIONS_ATTRIBUTE));
    markedAiAnswerActionRows.clear();
    markedAiShareActionRows.forEach((row) => row.removeAttribute(AI_SHARE_ACTIONS_ATTRIBUTE));
    markedAiShareActionRows.clear();
    markedAiShareCheckboxes.forEach((checkbox) => {
      checkbox.removeAttribute(AI_SHARE_CHECKBOX_ATTRIBUTE);
      checkbox.removeAttribute(AI_SHARE_CHECKBOX_CHECKED_ATTRIBUTE);
    });
    markedAiShareCheckboxes.clear();
    observedAiSearchMain = undefined;
    observedPageHeader = undefined;
    observedQuestionContent = undefined;
    browserDocument.documentElement?.removeAttribute(ROOT_HOME_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_COLUMN_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_COLUMN_TABS_STUCK_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_ENABLED_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_PROFILE_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_QUESTION_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_QUESTION_CONTENT_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_RING_FEEDS_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_PAPER_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_PAPER_PREVIEW_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_AI_SEARCH_ATTRIBUTE);
    started = false;
  };

  return { destroy, refresh, start };
};
