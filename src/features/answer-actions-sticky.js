import { ANSWER_ACTIONS_STICKY_STYLE } from "../styles/answer-actions-sticky.js";
import { getPageContext, PAGE_CONTEXT_CHANGE_EVENT } from "./page-context.js";
import { ensureStyle } from "./shared.js";

const ACTION_SELECTOR =
  ".TopstoryItem .ContentItem-actions, .QuestionPage .AnswerItem .ContentItem-actions";
const FIXED_CLASS = "zb-answer-actions-fixed";
const NATIVE_FIXED_CLASS = "zb-answer-actions-native-fixed";
const PLACEHOLDER_CLASS = "zb-answer-actions-placeholder";
const PLACEHOLDER_ACTIVE_CLASS = "is-active";
const STYLE_ID = "zb-answer-actions-sticky-style";

const addClass = (element, className) => {
  if (!element.classList.contains(className)) element.classList.add(className);
};

const removeClass = (element, className) => {
  if (element.classList.contains(className)) element.classList.remove(className);
};

const removeStyleProperty = (element, property) => {
  if (element.style.getPropertyValue(property)) element.style.removeProperty(property);
};

const setStyleProperty = (element, property, value) => {
  if (element.style.getPropertyValue(property) !== value)
    element.style.setProperty(property, value);
};

export const createAnswerActionsStickyFeature = (browserWindow) => {
  const browserDocument = browserWindow.document;
  const actions = new Set();
  const actionState = new WeakMap();
  let animationFrameId;
  let mutationObserver;
  let resizeObserver;
  let active = false;
  let scheduled = false;
  let started = false;

  const clearOwnedFixedState = (action, state) => {
    removeClass(action, FIXED_CLASS);
    removeClass(action, NATIVE_FIXED_CLASS);
    removeStyleProperty(action, "--zb-answer-actions-left");
    removeStyleProperty(action, "--zb-answer-actions-width");
    removeClass(state.placeholder, PLACEHOLDER_ACTIVE_CLASS);
    removeStyleProperty(state.placeholder, "--zb-answer-actions-height");
  };

  const removeAction = (action) => {
    const state = actionState.get(action);
    if (state) {
      clearOwnedFixedState(action, state);
      resizeObserver?.unobserve(state.item);
      resizeObserver?.unobserve(state.richContent);
      resizeObserver?.unobserve(action);
      state.placeholder.remove();
    }
    actions.delete(action);
  };

  const registerAction = (action) => {
    if (actions.has(action)) return;

    const item = action.closest(".TopstoryItem, .AnswerItem");
    const richContent = action.closest(".RichContent");
    if (!item || !richContent) return;

    const placeholder = browserDocument.createElement("div");
    placeholder.className = PLACEHOLDER_CLASS;
    placeholder.setAttribute("aria-hidden", "true");
    action.before(placeholder);

    const state = {
      item,
      leftInset: 0,
      placeholder,
      richContent,
      rightInset: 0,
    };
    actions.add(action);
    actionState.set(action, state);
    mutationObserver?.observe(action, {
      attributeFilter: ["class"],
      attributes: true,
    });
    resizeObserver?.observe(item);
    resizeObserver?.observe(richContent);
    resizeObserver?.observe(action);
    scheduleRefresh();
  };

  const scanActions = (root = browserDocument) => {
    if (root.nodeType === 1 && root.matches(ACTION_SELECTOR)) {
      registerAction(root);
    }
    root.querySelectorAll?.(ACTION_SELECTOR).forEach(registerAction);
  };

  const updateFixedGeometry = (action, state, richRect) => {
    const left = richRect.left + state.leftInset;
    const width = Math.max(0, richRect.width - state.leftInset - state.rightInset);
    setStyleProperty(action, "--zb-answer-actions-left", `${left}px`);
    setStyleProperty(action, "--zb-answer-actions-width", `${width}px`);
  };

  const refreshAction = (action) => {
    const state = actionState.get(action);
    if (!state || !action.isConnected) {
      removeAction(action);
      return;
    }

    const item = action.closest(".TopstoryItem, .AnswerItem");
    const richContent = action.closest(".RichContent");
    if (!item || !richContent) {
      removeAction(action);
      return;
    }
    if (item !== state.item || richContent !== state.richContent) {
      resizeObserver?.unobserve(state.item);
      resizeObserver?.unobserve(state.richContent);
      state.item = item;
      state.richContent = richContent;
      resizeObserver?.observe(item);
      resizeObserver?.observe(richContent);
    }
    if (
      state.placeholder.parentElement !== action.parentElement ||
      state.placeholder.nextElementSibling !== action
    ) {
      action.before(state.placeholder);
    }

    const isCollapsed = state.richContent.classList.contains("is-collapsed");
    const isNativeFixed = action.classList.contains("is-fixed");
    if (isCollapsed) {
      clearOwnedFixedState(action, state);
      return;
    }

    const viewportHeight = browserWindow.innerHeight;
    const itemRect = state.item.getBoundingClientRect();
    if (itemRect.bottom <= 0 || itemRect.top >= viewportHeight) {
      clearOwnedFixedState(action, state);
      return;
    }

    const richRect = state.richContent.getBoundingClientRect();
    if (isNativeFixed) {
      const actionStyle = browserWindow.getComputedStyle(action);
      state.leftInset = -Number.parseFloat(actionStyle.paddingLeft || "0");
      state.rightInset = -Number.parseFloat(actionStyle.paddingRight || "0");
      removeClass(action, FIXED_CLASS);
      addClass(action, NATIVE_FIXED_CLASS);
      removeClass(state.placeholder, PLACEHOLDER_ACTIVE_CLASS);
      removeStyleProperty(state.placeholder, "--zb-answer-actions-height");
      updateFixedGeometry(action, state, richRect);
      return;
    }

    removeClass(action, NATIVE_FIXED_CLASS);
    const isOwnedFixed = action.classList.contains(FIXED_CLASS);
    const naturalRect = isOwnedFixed
      ? state.placeholder.getBoundingClientRect()
      : action.getBoundingClientRect();
    const intersectsViewport =
      itemRect.top <= viewportHeight - naturalRect.height && itemRect.bottom > 0;
    const shouldFix = intersectsViewport && naturalRect.bottom > viewportHeight;

    if (!shouldFix) {
      clearOwnedFixedState(action, state);
      return;
    }

    if (!isOwnedFixed) {
      state.leftInset = naturalRect.left - richRect.left;
      state.rightInset = richRect.right - naturalRect.right;
      setStyleProperty(state.placeholder, "--zb-answer-actions-height", `${naturalRect.height}px`);
      addClass(state.placeholder, PLACEHOLDER_ACTIVE_CLASS);
      addClass(action, FIXED_CLASS);
    }
    updateFixedGeometry(action, state, richRect);
  };

  const refresh = () => {
    scheduled = false;
    actions.forEach(refreshAction);
  };

  const scheduleRefresh = () => {
    if (!active || scheduled) return;
    scheduled = true;
    animationFrameId = browserWindow.requestAnimationFrame(refresh);
  };

  const handleMutations = (records) => {
    let shouldRefresh = false;
    records.forEach(({ addedNodes, target, type }) => {
      if (type === "attributes") {
        if (
          target.matches?.(".RichContent, .ContentItem-actions") &&
          !target.classList.contains(FIXED_CLASS)
        ) {
          shouldRefresh = true;
        }
        return;
      }

      if (actions.size > 0) shouldRefresh = true;
      addedNodes.forEach((node) => {
        if (node.nodeType === 1) scanActions(node);
      });
    });
    if (shouldRefresh) scheduleRefresh();
  };

  const setupObservers = () => {
    const root =
      browserDocument.querySelector("#root") ??
      browserDocument.body ??
      browserDocument.documentElement;
    if (!root || mutationObserver) return;

    mutationObserver = new browserWindow.MutationObserver(handleMutations);
    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
    });
    actions.forEach((action) => {
      mutationObserver.observe(action, {
        attributeFilter: ["class"],
        attributes: true,
      });
    });

    if (browserWindow.ResizeObserver) {
      resizeObserver = new browserWindow.ResizeObserver(scheduleRefresh);
      actions.forEach((action) => {
        const state = actionState.get(action);
        resizeObserver.observe(state.item);
        resizeObserver.observe(state.richContent);
        resizeObserver.observe(action);
      });
    }
  };

  const activate = () => {
    if (active) return;
    active = true;
    ensureStyle(browserDocument, STYLE_ID, ANSWER_ACTIONS_STICKY_STYLE);
    scanActions();
    setupObservers();
    browserWindow.addEventListener("scroll", scheduleRefresh, { passive: true });
    browserWindow.addEventListener("resize", scheduleRefresh);
    browserDocument.addEventListener("DOMContentLoaded", scheduleRefresh, { once: true });
    scheduleRefresh();
  };

  const deactivate = () => {
    if (!active) return;
    active = false;
    scheduled = false;
    mutationObserver?.disconnect();
    resizeObserver?.disconnect();
    mutationObserver = undefined;
    resizeObserver = undefined;
    if (animationFrameId !== undefined) {
      browserWindow.cancelAnimationFrame(animationFrameId);
      animationFrameId = undefined;
    }
    browserWindow.removeEventListener("scroll", scheduleRefresh);
    browserWindow.removeEventListener("resize", scheduleRefresh);
    browserDocument.removeEventListener("DOMContentLoaded", scheduleRefresh);
    Array.from(actions).forEach(removeAction);
    browserDocument.getElementById(STYLE_ID)?.remove();
  };

  const updatePageState = (context = getPageContext(browserWindow)) => {
    if (context.home || context.question) {
      activate();
    } else {
      deactivate();
    }
  };

  const handlePageContextChange = (event) => {
    updatePageState(event.detail ?? getPageContext(browserWindow));
  };

  const start = () => {
    if (started) return;
    started = true;
    browserWindow.addEventListener(PAGE_CONTEXT_CHANGE_EVENT, handlePageContextChange);
    updatePageState();
  };

  const destroy = () => {
    if (!started) return;
    browserWindow.removeEventListener(PAGE_CONTEXT_CHANGE_EVENT, handlePageContextChange);
    deactivate();
    started = false;
  };

  return { destroy, start };
};
