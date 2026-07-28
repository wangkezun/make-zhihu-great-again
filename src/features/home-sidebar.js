import { HOME_SIDEBAR_STYLE } from "../styles/home-sidebar.js";
import { getPageContext, PAGE_CONTEXT_CHANGE_EVENT } from "./page-context.js";
import { ensureStyle, persistBooleanPreference, readBooleanPreference } from "./shared.js";

export const HOME_SIDEBAR_STORAGE_KEY = "zhihu-beautification:hide-home-sidebar";

const ROOT_ENABLED_ATTRIBUTE = "data-zb-hide-home-sidebar";
const ROOT_COLUMN_TABS_STUCK_ATTRIBUTE = "data-zb-column-tabs-stuck";
const ROOT_QUESTION_CONTENT_ATTRIBUTE = "data-zb-question-content-under-header";
const ROOT_RING_HOST_READY_ATTRIBUTE = "data-zb-ring-host-ready";
const SIDEBAR_ATTRIBUTE = "data-zb-home-sidebar";
const FOLLOW_CARD_ATTRIBUTE = "data-zb-follow-card";
const FOLLOW_CARD_TRACK_ATTRIBUTE = "data-zb-follow-card-track";
const FOLLOW_CARD_SLIDE_ATTRIBUTE = "data-zb-follow-card-slide";
const AUTHOR_FOLLOW_ROW_ATTRIBUTE = "data-zb-author-follow-row";
const AI_SOURCE_PANEL_ATTRIBUTE = "data-zb-ai-source-panel";
const AI_CONTENT_DISCOVERY_HEADING_ATTRIBUTE = "data-zb-ai-content-discovery-heading";
const AI_USER_QUESTION_ATTRIBUTE = "data-zb-ai-user-question";
const AI_SCROLL_TO_BOTTOM_ATTRIBUTE = "data-zb-ai-scroll-to-bottom";
const AI_ANSWER_ACTIONS_ATTRIBUTE = "data-zb-ai-answer-actions";
const AI_SHARE_ACTIONS_ATTRIBUTE = "data-zb-ai-share-actions";
const AI_SHARE_CHECKBOX_ATTRIBUTE = "data-zb-ai-share-checkbox";
const AI_SHARE_CHECKBOX_CHECKED_ATTRIBUTE = "data-zb-ai-share-checkbox-checked";
const RING_INDEX_ACTION_ATTRIBUTE = "data-zb-ring-index-action";
const RING_INDEX_ACTION_SELECTOR = 'a[href^="/ring/host/"] button';
const RING_HOST_ACTION_ATTRIBUTE = "data-zb-ring-host-action";
const RING_HOST_ACTION_SELECTOR = "main.App-main button";
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
  let ringHostReadyAnimationFrameId;
  let positionAnimationFrameId;
  let menuCommandId;
  let markedSidebar;
  let markedAiSourcePanel;
  const markedFollowCards = new Set();
  const markedFollowCardTracks = new Set();
  const markedFollowCardSlides = new Set();
  const markedAuthorFollowRows = new Set();
  const markedAiContentDiscoveryHeadings = new Set();
  const markedAiUserQuestions = new Set();
  const markedAiScrollToBottomButtons = new Set();
  const markedAiAnswerActionRows = new Set();
  const markedAiShareActionRows = new Set();
  const markedAiShareCheckboxes = new Set();
  const markedRingIndexActions = new Set();
  const markedRingHostActions = new Set();
  let observedAiSearchMain;
  let observedPageHeader;
  let observedQuestionContent;
  let pageContext = getPageContext(browserWindow);
  let pageKind;
  let columnScrollListening = false;
  let positionScheduled = false;
  let scheduled = false;
  let started = false;
  let ringHostReady = false;

  const isColumnPage = () => pageContext.column;
  const isRingIndexPage = () => pageContext.ringIndex;
  const isRingHostPage = () => pageContext.ringHost;
  const isAiSearchPage = () => pageContext.aiSearch;

  const getPageKind = () => {
    if (pageContext.home) return "home";
    if (pageContext.question) return "question";
    return "other";
  };

  const setRootAttribute = (name, value) => {
    const root = browserDocument.documentElement;
    const nextValue = String(value);
    if (root?.getAttribute(name) !== nextValue) {
      root?.setAttribute(name, nextValue);
    }
  };

  const hasStableRingHostDom = () => {
    const ringContent = browserDocument.querySelector(
      ".App-main > div:first-child > div:first-child > div:has(.PinItem)",
    );
    const headerActions = ringContent?.children[1]?.children[1];
    const tabs = ringContent?.children[3];
    return Boolean(
      headerActions?.querySelector("button") &&
      tabs?.childElementCount >= 3 &&
      ringContent.querySelector(".List > .List-item .PinItem"),
    );
  };

  const updateRingHostReadyState = (isRingHost) => {
    if (!isRingHost) {
      if (ringHostReadyAnimationFrameId !== undefined) {
        browserWindow.cancelAnimationFrame(ringHostReadyAnimationFrameId);
        ringHostReadyAnimationFrameId = undefined;
      }
      ringHostReady = false;
      setRootAttribute(ROOT_RING_HOST_READY_ATTRIBUTE, false);
      return;
    }

    if (ringHostReady || ringHostReadyAnimationFrameId !== undefined) return;

    setRootAttribute(ROOT_RING_HOST_READY_ATTRIBUTE, false);
    ringHostReadyAnimationFrameId = browserWindow.requestAnimationFrame(() => {
      ringHostReadyAnimationFrameId = browserWindow.requestAnimationFrame(() => {
        ringHostReadyAnimationFrameId = undefined;
        if (!isRingHostPage()) return;
        if (!hasStableRingHostDom()) return;

        ringHostReady = true;
        setRootAttribute(ROOT_RING_HOST_READY_ATTRIBUTE, true);
        markRingHostActions();
        configureObserver();
      });
    });
  };

  const updateRootState = () => {
    pageContext = getPageContext(browserWindow);
    const nextPageKind = getPageKind();
    const isRingHost = isRingHostPage();
    if (nextPageKind !== pageKind) {
      markedSidebar?.removeAttribute(SIDEBAR_ATTRIBUTE);
      markedSidebar = undefined;
    }
    pageKind = nextPageKind;
    updateRingHostReadyState(isRingHost);
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

  const clearSidebarFollowMarkers = () => {
    markedFollowCards.forEach((card) => card.removeAttribute(FOLLOW_CARD_ATTRIBUTE));
    markedFollowCardTracks.forEach((track) => track.removeAttribute(FOLLOW_CARD_TRACK_ATTRIBUTE));
    markedFollowCardSlides.forEach((slide) => slide.removeAttribute(FOLLOW_CARD_SLIDE_ATTRIBUTE));
    markedAuthorFollowRows.forEach((row) => row.removeAttribute(AUTHOR_FOLLOW_ROW_ATTRIBUTE));
    markedFollowCards.clear();
    markedFollowCardTracks.clear();
    markedFollowCardSlides.clear();
    markedAuthorFollowRows.clear();
  };

  const markSidebarFollowCards = () => {
    if (!markedSidebar) return;

    markedSidebar.querySelectorAll(".FollowButton").forEach((button) => {
      const card = button.closest(".Card");
      if (!card || !markedSidebar.contains(card)) return;

      card.setAttribute(FOLLOW_CARD_ATTRIBUTE, "");
      markedFollowCards.add(card);

      const authorRow = button.parentElement;
      if (button.previousElementSibling?.matches(".AuthorInfo") && authorRow) {
        authorRow.setAttribute(AUTHOR_FOLLOW_ROW_ATTRIBUTE, "");
        markedAuthorFollowRows.add(authorRow);
      }

      let track = button.parentElement;
      while (track && track.parentElement !== card) {
        track = track.parentElement;
      }
      if (!track) return;

      const buttonDepthFromTrack = (() => {
        let depth = 0;
        for (let current = button; current && current !== track; current = current.parentElement) {
          depth += 1;
        }
        return depth;
      })();
      if (buttonDepthFromTrack < 3) return;

      track.setAttribute(FOLLOW_CARD_TRACK_ATTRIBUTE, "");
      markedFollowCardTracks.add(track);

      let slide = button;
      while (slide.parentElement && slide.parentElement !== track) {
        slide = slide.parentElement;
      }
      if (slide.parentElement === track) {
        slide.setAttribute(FOLLOW_CARD_SLIDE_ATTRIBUTE, "");
        markedFollowCardSlides.add(slide);
      }
    });
  };

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

    if (nextSidebar === markedSidebar) {
      markSidebarFollowCards();
      return;
    }

    markedSidebar?.removeAttribute(SIDEBAR_ATTRIBUTE);
    clearSidebarFollowMarkers();
    markedSidebar = nextSidebar;
    markedSidebar?.setAttribute(SIDEBAR_ATTRIBUTE, "");
    markSidebarFollowCards();
  };

  const markRingIndexActions = (root = browserDocument) => {
    const candidates = new Set();
    const element = root?.nodeType === 1 ? root : root?.parentElement;
    if (element?.matches?.(RING_INDEX_ACTION_SELECTOR)) candidates.add(element);
    const ancestor = element?.closest?.(RING_INDEX_ACTION_SELECTOR);
    if (ancestor) candidates.add(ancestor);
    element
      ?.querySelectorAll?.(RING_INDEX_ACTION_SELECTOR)
      .forEach((button) => candidates.add(button));
    if (root === browserDocument) {
      browserDocument
        .querySelectorAll(RING_INDEX_ACTION_SELECTOR)
        .forEach((button) => candidates.add(button));
    }

    candidates.forEach((button) => {
      const label = button.textContent?.trim().replace(/\s+/g, "") ?? "";
      const state = /^(?:已加入|取消加入|退出圈子)$/.test(label) ? "joined" : "join";
      button.setAttribute(RING_INDEX_ACTION_ATTRIBUTE, state);
      markedRingIndexActions.add(button);
    });
  };

  const clearRingIndexActions = () => {
    markedRingIndexActions.forEach((button) => button.removeAttribute(RING_INDEX_ACTION_ATTRIBUTE));
    markedRingIndexActions.clear();
  };

  const markRingHostActions = (root = browserDocument) => {
    const candidates = new Set();
    const element = root?.nodeType === 1 ? root : root?.parentElement;
    if (element?.matches?.(RING_HOST_ACTION_SELECTOR)) candidates.add(element);
    const ancestor = element?.closest?.(RING_HOST_ACTION_SELECTOR);
    if (ancestor) candidates.add(ancestor);
    element
      ?.querySelectorAll?.(RING_HOST_ACTION_SELECTOR)
      .forEach((button) => candidates.add(button));
    if (root === browserDocument) {
      browserDocument
        .querySelectorAll(RING_HOST_ACTION_SELECTOR)
        .forEach((button) => candidates.add(button));
    }

    candidates.forEach((button) => {
      const label = button.textContent?.trim().replace(/\s+/g, "") ?? "";
      if (!/^(?:加入|加入圈子|已加入|取消加入|退出圈子)$/.test(label)) return;

      const state = /^(?:已加入|取消加入|退出圈子)$/.test(label) ? "joined" : "join";
      button.setAttribute(RING_HOST_ACTION_ATTRIBUTE, state);
      markedRingHostActions.add(button);
    });
  };

  const clearRingHostActions = () => {
    markedRingHostActions.forEach((button) => button.removeAttribute(RING_HOST_ACTION_ATTRIBUTE));
    markedRingHostActions.clear();
  };

  const handleMutations = (records) => {
    if (!started) return;

    if (isRingHostPage() && !ringHostReady) {
      updateRingHostReadyState(true);
      return;
    }

    if (isRingHostPage()) {
      records.forEach(({ addedNodes, target }) => {
        markRingHostActions(target);
        addedNodes.forEach((node) => markRingHostActions(node));
      });
      if (![...markedRingHostActions].some((button) => button.isConnected)) scheduleRefresh();
      return;
    }

    if (isRingIndexPage()) {
      records.forEach(({ addedNodes, target }) => {
        markRingIndexActions(target);
        addedNodes.forEach((node) => markRingIndexActions(node));
      });
      if (!browserDocument.querySelector(".App-main")) scheduleRefresh();
      return;
    }

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
    if (isRingHostPage() && !ringHostReady) {
      observer.observe(browserDocument.documentElement, { childList: true, subtree: true });
      return;
    }
    if (isRingHostPage()) {
      const action = [...markedRingHostActions].find((button) => button.isConnected);
      observer.observe(action?.parentElement ?? browserDocument.documentElement, {
        childList: true,
        subtree: true,
        characterData: true,
      });
      return;
    }
    if (isRingIndexPage()) {
      observer.observe(
        browserDocument.querySelector(".App-main") ?? browserDocument.documentElement,
        {
          childList: true,
          subtree: true,
          characterData: true,
        },
      );
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
    if (isRingIndexPage()) {
      markRingIndexActions();
    } else {
      clearRingIndexActions();
    }
    if (isRingHostPage()) {
      markRingHostActions();
    } else {
      clearRingHostActions();
    }
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

  const start = () => {
    if (started) return;
    started = true;
    refresh();
    updateMenuCommand();
    browserDocument.addEventListener("DOMContentLoaded", scheduleRefresh, { once: true });
    browserDocument.addEventListener("click", handleAiSourcePanelInteraction, true);
    browserWindow.addEventListener(PAGE_CONTEXT_CHANGE_EVENT, refresh);
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
    if (ringHostReadyAnimationFrameId !== undefined) {
      browserWindow.cancelAnimationFrame(ringHostReadyAnimationFrameId);
    }
    browserDocument.removeEventListener("DOMContentLoaded", scheduleRefresh);
    browserDocument.removeEventListener("click", handleAiSourcePanelInteraction, true);
    browserWindow.removeEventListener(PAGE_CONTEXT_CHANGE_EVENT, refresh);
    browserWindow.removeEventListener("resize", schedulePositionRefresh);
    browserWindow.removeEventListener("scroll", schedulePositionRefresh);
    columnScrollListening = false;
    if (menuCommandId !== undefined && settings?.menu?.unregister) {
      settings.menu.unregister(menuCommandId);
    }
    browserDocument.getElementById(STYLE_ID)?.remove();
    markedSidebar?.removeAttribute(SIDEBAR_ATTRIBUTE);
    markedSidebar = undefined;
    clearSidebarFollowMarkers();
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
    clearRingIndexActions();
    clearRingHostActions();
    observedAiSearchMain = undefined;
    observedPageHeader = undefined;
    observedQuestionContent = undefined;
    browserDocument.documentElement?.removeAttribute(ROOT_COLUMN_TABS_STUCK_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_ENABLED_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_QUESTION_CONTENT_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_RING_HOST_READY_ATTRIBUTE);
    started = false;
  };

  return { destroy, refresh, start };
};
