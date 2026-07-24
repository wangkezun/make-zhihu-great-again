import { ANSWER_ACTIONS_STICKY_STYLE } from "../styles/answer-actions-sticky.js";
import { ensureStyle } from "./shared.js";

const ACTION_SELECTOR =
  ".TopstoryItem .ContentItem-actions, .QuestionPage .AnswerItem .ContentItem-actions";
const FIXED_CLASS = "zb-answer-actions-fixed";
const PLACEHOLDER_CLASS = "zb-answer-actions-placeholder";
const PLACEHOLDER_ACTIVE_CLASS = "is-active";
const STYLE_ID = "zb-answer-actions-sticky-style";

export const createAnswerActionsStickyFeature = (browserWindow) => {
  const browserDocument = browserWindow.document;
  const actions = new Set();
  const actionState = new WeakMap();
  let animationFrameId;
  let mutationObserver;
  let resizeObserver;
  let scheduled = false;
  let started = false;

  const clearOwnedFixedState = (action, state) => {
    action.classList.remove(FIXED_CLASS);
    action.style.removeProperty("--zb-answer-actions-left");
    action.style.removeProperty("--zb-answer-actions-width");
    state.placeholder.classList.remove(PLACEHOLDER_ACTIVE_CLASS);
    state.placeholder.style.removeProperty("--zb-answer-actions-height");
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
    resizeObserver?.observe(item);
    resizeObserver?.observe(richContent);
    resizeObserver?.observe(action);
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
    action.style.setProperty("--zb-answer-actions-left", `${left}px`);
    action.style.setProperty("--zb-answer-actions-width", `${width}px`);
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
    if (isCollapsed || isNativeFixed) {
      clearOwnedFixedState(action, state);
      return;
    }

    const viewportHeight = browserWindow.innerHeight;
    const itemRect = state.item.getBoundingClientRect();
    const richRect = state.richContent.getBoundingClientRect();
    const isOwnedFixed = action.classList.contains(FIXED_CLASS);
    const naturalRect = isOwnedFixed
      ? state.placeholder.getBoundingClientRect()
      : action.getBoundingClientRect();
    const intersectsViewport = itemRect.top < viewportHeight && itemRect.bottom > 0;
    const shouldFix = intersectsViewport && naturalRect.bottom > viewportHeight;

    if (!shouldFix) {
      clearOwnedFixedState(action, state);
      return;
    }

    if (!isOwnedFixed) {
      state.leftInset = naturalRect.left - richRect.left;
      state.rightInset = richRect.right - naturalRect.right;
      state.placeholder.style.setProperty("--zb-answer-actions-height", `${naturalRect.height}px`);
      state.placeholder.classList.add(PLACEHOLDER_ACTIVE_CLASS);
      action.classList.add(FIXED_CLASS);
    }
    updateFixedGeometry(action, state, richRect);
  };

  const refresh = () => {
    scheduled = false;
    actions.forEach(refreshAction);
  };

  const scheduleRefresh = () => {
    if (!started || scheduled) return;
    scheduled = true;
    animationFrameId = browserWindow.requestAnimationFrame(refresh);
  };

  const handleMutations = (records) => {
    records.forEach(({ addedNodes, target, type }) => {
      if (type === "attributes") {
        if (
          target.matches?.(".RichContent, .ContentItem-actions") &&
          !target.classList.contains(FIXED_CLASS)
        ) {
          scheduleRefresh();
        }
        return;
      }

      addedNodes.forEach((node) => {
        if (node.nodeType === 1) scanActions(node);
      });
    });
    scheduleRefresh();
  };

  const setupObservers = () => {
    const root = browserDocument.documentElement;
    if (!root || mutationObserver) return;

    mutationObserver = new browserWindow.MutationObserver(handleMutations);
    mutationObserver.observe(root, {
      attributeFilter: ["class"],
      attributes: true,
      childList: true,
      subtree: true,
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

  const start = () => {
    if (started) return;
    started = true;
    ensureStyle(browserDocument, STYLE_ID, ANSWER_ACTIONS_STICKY_STYLE);
    scanActions();
    setupObservers();
    browserWindow.addEventListener("scroll", scheduleRefresh, { passive: true });
    browserWindow.addEventListener("resize", scheduleRefresh);
    browserDocument.addEventListener("DOMContentLoaded", scheduleRefresh, { once: true });
    scheduleRefresh();
  };

  const destroy = () => {
    started = false;
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

  return { destroy, start };
};
