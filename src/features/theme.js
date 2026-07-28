import { CATPPUCCIN_THEME_STYLE } from "../styles/catppuccin-theme.js";
import { CRITICAL_THEME_STYLE } from "../styles/critical-theme.js";
import { clearMenuCommands, ensureStyle, persistMode, readStoredMode } from "./shared.js";

export const THEME_STORAGE_KEY = "zhihu-beautification:theme";
export const THEME_MODES = ["system", "latte", "frappe", "macchiato", "mocha"];

const THEME_ATTRIBUTE = "data-zb-theme";
const ARROW_PANEL_ATTRIBUTE = "data-zb-arrow-action-panel";
const ARROW_PANEL_WRAPPER_ATTRIBUTE = "data-zb-arrow-action-panel-wrapper";
const ACTION_MENU_POPOVER_ATTRIBUTE = "data-zb-action-menu-popover";
const CHAT_MODAL_OPEN_ATTRIBUTE = "data-zb-chat-modal-open";
const COMMENT_MODAL_ATTRIBUTE = "data-zb-comment-modal";
const POLL_MODAL_OPEN_ATTRIBUTE = "data-zb-poll-modal-open";
const POLL_OPTION_POPOVER_ATTRIBUTE = "data-zb-poll-option-popover";
const HOVER_CARD_ATTRIBUTE = "data-zb-hover-card";
const HOVER_CARD_AVATAR_ROW_ATTRIBUTE = "data-zb-hover-card-avatar-row";
const HOVER_CARD_SINGLE_ACTION_ATTRIBUTE = "data-zb-hover-card-single-action";
const RELATED_QUESTION_TOOLTIP_ATTRIBUTE = "data-zb-related-question-tooltip";
const RELATED_QUESTION_LINK_SELECTOR = [
  ".RelatedQuestions-item > a[href^='/question/']",
  ".RelatedQuestions-listItem > a[href^='/question/']",
  ".SimilarQuestions-item > a[href^='/question/']",
].join(",");
const STYLE_ID = "zb-catppuccin-theme-style";
const CRITICAL_STYLE_ID = "zb-critical-theme-style";
const THEME_LABELS = {
  system: "跟随系统（Latte / Mocha）",
  latte: "Latte",
  frappe: "Frappé",
  macchiato: "Macchiato",
  mocha: "Mocha",
};

const isThemeMode = (value) => THEME_MODES.includes(value);

export const createThemeFeature = (browserWindow, settings) => {
  const browserDocument = browserWindow.document;
  const markedArrowPanels = new Set();
  const markedArrowPanelWrappers = new Set();
  const markedActionMenuPopovers = new Set();
  const markedCommentModals = new Set();
  const markedPollOptionPopovers = new Set();
  const markedHoverCardAvatarRows = new Set();
  const markedHoverCards = new Set();
  const markedHoverCardSingleActions = new Set();
  const markedRelatedQuestionLinks = new Set();
  const observedPortalRoots = new WeakSet();
  const menuCommandIds = [];
  let observer;
  let mode;
  let started = false;

  const markArrowPanelFromIcon = (icon) => {
    const button = icon.closest("button");
    const thirdRow = button?.parentElement;
    const panel = thirdRow?.parentElement;
    const firstRow = panel?.firstElementChild;
    const secondRow = panel?.children[1];
    if (
      !panel ||
      panel.children[2] !== thirdRow ||
      button?.parentElement !== thirdRow ||
      firstRow?.childElementCount !== 1 ||
      firstRow.firstElementChild?.tagName !== "SPAN" ||
      secondRow?.hasChildNodes()
    ) {
      return;
    }

    panel.setAttribute(ARROW_PANEL_ATTRIBUTE, "");
    markedArrowPanels.add(panel);

    const wrapper = panel.parentElement;
    if (wrapper) {
      wrapper.setAttribute(ARROW_PANEL_WRAPPER_ATTRIBUTE, "");
      markedArrowPanelWrappers.add(wrapper);
    }
  };

  const markArrowPanels = (root = browserDocument) => {
    if (root.nodeType === 1 && root.matches(".ZDI--ArrowRight24")) {
      markArrowPanelFromIcon(root);
    }
    root.querySelectorAll?.(".ZDI--ArrowRight24").forEach(markArrowPanelFromIcon);
  };

  const markActionMenuPopoverFromMenu = (menu) => {
    const popover = menu.parentElement;
    if (!popover?.matches(".Popover-content")) return;

    popover.setAttribute(ACTION_MENU_POPOVER_ATTRIBUTE, "");
    markedActionMenuPopovers.add(popover);
  };

  const markActionMenuPopovers = (root) => {
    if (root.nodeType !== 1) return;

    if (root.matches(".ActionMenu")) markActionMenuPopoverFromMenu(root);
    root.querySelectorAll?.(".ActionMenu").forEach(markActionMenuPopoverFromMenu);
  };

  const markHoverCardFromItem = (item) => {
    const hoverCard = item.parentElement;
    if (!hoverCard) return;

    hoverCard.setAttribute(HOVER_CARD_ATTRIBUTE, "");
    markedHoverCards.add(hoverCard);

    item.querySelectorAll(".Avatar").forEach((avatar) => {
      const avatarRow = avatar.parentElement;
      if (!avatarRow) return;
      avatarRow.setAttribute(HOVER_CARD_AVATAR_ROW_ATTRIBUTE, "");
      markedHoverCardAvatarRows.add(avatarRow);
    });

    const actionRow = item.querySelector(".HoverCard-buttons");
    if (!actionRow) return;

    const hasSingleButton =
      actionRow.childElementCount === 1 && actionRow.firstElementChild?.matches(".Button");
    if (hasSingleButton) {
      actionRow.setAttribute(HOVER_CARD_SINGLE_ACTION_ATTRIBUTE, "");
      markedHoverCardSingleActions.add(actionRow);
    } else if (actionRow.hasAttribute(HOVER_CARD_SINGLE_ACTION_ATTRIBUTE)) {
      actionRow.removeAttribute(HOVER_CARD_SINGLE_ACTION_ATTRIBUTE);
      markedHoverCardSingleActions.delete(actionRow);
    }
  };

  const markHoverCards = (root) => {
    if (root.nodeType !== 1) return;

    const closestItem = root.matches(".HoverCard-item") ? root : root.closest?.(".HoverCard-item");
    if (closestItem) markHoverCardFromItem(closestItem);
    root.querySelectorAll?.(".HoverCard-item").forEach(markHoverCardFromItem);
  };

  const markCommentModal = (modalContent) => {
    const isCommentModal =
      modalContent.querySelector(".CommentContent") ||
      (modalContent.querySelector(".InputLike.Editable") &&
        modalContent.querySelector("img.Avatar"));
    if (!isCommentModal) return;

    modalContent.setAttribute(COMMENT_MODAL_ATTRIBUTE, "");
    markedCommentModals.add(modalContent);
  };

  const markCommentModals = (root) => {
    if (root.nodeType !== 1) return;

    const closestModalContent = root.matches(".Modal-content")
      ? root
      : root.closest?.(".Modal-content");
    if (closestModalContent) markCommentModal(closestModalContent);
    root.querySelectorAll?.(".Modal-content").forEach(markCommentModal);
  };

  const markPollOptionPopover = (popover) => {
    const arrow = popover.firstElementChild;
    const content = arrow?.nextElementSibling;
    if (!arrow?.matches("svg") || content?.tagName !== "DIV" || content.childElementCount !== 8) {
      return;
    }

    popover.setAttribute(POLL_OPTION_POPOVER_ATTRIBUTE, "");
    markedPollOptionPopovers.add(popover);
  };

  const markPollOptionPopovers = (root) => {
    if (root.nodeType !== 1) return;

    if (root.tagName === "DIV") markPollOptionPopover(root);
    root.querySelectorAll?.("div").forEach(markPollOptionPopover);
  };

  const updatePollModalState = () => {
    const isOpen = Boolean(
      browserDocument.querySelector(
        '.Modal input[placeholder*="PK 标题"], .Modal input[placeholder*="投票 标题"]',
      ),
    );
    browserDocument.documentElement?.setAttribute(POLL_MODAL_OPEN_ATTRIBUTE, String(isOpen));
  };

  const updateChatModalState = () => {
    const isOpen = Boolean(browserDocument.querySelector(".ChatBoxModal"));
    browserDocument.body?.setAttribute(CHAT_MODAL_OPEN_ATTRIBUTE, String(isOpen));
  };

  const markPortalComponents = (root) => {
    markActionMenuPopovers(root);
    markArrowPanels(root);
    markCommentModals(root);
    markHoverCards(root);
    markPollOptionPopovers(root);
  };

  const observePortalRoot = (root) => {
    if (root.nodeType !== 1 || root.id === "root" || observedPortalRoots.has(root)) return;

    observedPortalRoots.add(root);
    observer.observe(root, { childList: true, subtree: true });
    markPortalComponents(root);
  };

  const handleMutations = (records) => {
    records.forEach(({ addedNodes, target }) => {
      const closestModalContent = target.closest?.(".Modal-content");
      if (closestModalContent) markCommentModal(closestModalContent);
      const closestHoverCardItem = target.closest?.(".HoverCard-item");
      if (closestHoverCardItem) markHoverCardFromItem(closestHoverCardItem);

      addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;

        if (target === browserDocument.body) {
          observePortalRoot(node);
        } else {
          markPortalComponents(node);
        }
      });
    });
    updateChatModalState();
    updatePollModalState();
  };

  const setupPortalObserver = () => {
    const body = browserDocument.body;
    if (!body) return;

    observer ??= new browserWindow.MutationObserver(handleMutations);
    observer.observe(body, { childList: true });
    Array.from(body.children).forEach(observePortalRoot);
    updateChatModalState();
    updatePollModalState();
  };

  const addRelatedQuestionTooltip = ({ target }) => {
    const link = target?.closest?.(RELATED_QUESTION_LINK_SELECTOR);
    if (!link) return;

    const title = link.textContent.trim();
    if (!title) return;

    if (!link.hasAttribute("title") || link.hasAttribute(RELATED_QUESTION_TOOLTIP_ATTRIBUTE)) {
      link.title = title;
      link.setAttribute(RELATED_QUESTION_TOOLTIP_ATTRIBUTE, "");
      markedRelatedQuestionLinks.add(link);
    }
  };

  const updateMenuCommands = () => {
    if (!settings?.menu?.register) return;

    clearMenuCommands(settings.menu, menuCommandIds);
    THEME_MODES.forEach((themeMode) => {
      const marker = themeMode === mode ? "✓" : "○";
      const commandId = settings.menu.register(`${marker} 主题：${THEME_LABELS[themeMode]}`, () =>
        setMode(themeMode),
      );
      menuCommandIds.push(commandId);
    });
  };

  function setMode(nextMode) {
    mode = isThemeMode(nextMode) ? nextMode : "system";
    browserDocument.documentElement?.setAttribute(THEME_ATTRIBUTE, mode);
    persistMode(settings, mode);
    updateMenuCommands();
  }

  const start = () => {
    if (started) return;
    started = true;
    mode = readStoredMode(settings, isThemeMode, "system");
    ensureStyle(browserDocument, CRITICAL_STYLE_ID, CRITICAL_THEME_STYLE);
    browserDocument.documentElement?.setAttribute(THEME_ATTRIBUTE, mode);
    ensureStyle(browserDocument, STYLE_ID, CATPPUCCIN_THEME_STYLE);
    markArrowPanels();
    setupPortalObserver();
    browserDocument.addEventListener("DOMContentLoaded", setupPortalObserver, { once: true });
    browserDocument.addEventListener("focusin", addRelatedQuestionTooltip);
    browserDocument.addEventListener("mouseover", addRelatedQuestionTooltip);
    updateMenuCommands();
  };

  const destroy = () => {
    observer?.disconnect();
    observer = undefined;
    browserDocument.removeEventListener("DOMContentLoaded", setupPortalObserver);
    browserDocument.removeEventListener("focusin", addRelatedQuestionTooltip);
    browserDocument.removeEventListener("mouseover", addRelatedQuestionTooltip);
    clearMenuCommands(settings?.menu, menuCommandIds);
    browserDocument.getElementById(STYLE_ID)?.remove();
    browserDocument.getElementById(CRITICAL_STYLE_ID)?.remove();
    browserDocument.documentElement?.removeAttribute(THEME_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(POLL_MODAL_OPEN_ATTRIBUTE);
    browserDocument.body?.removeAttribute(CHAT_MODAL_OPEN_ATTRIBUTE);
    markedArrowPanels.forEach((panel) => panel.removeAttribute(ARROW_PANEL_ATTRIBUTE));
    markedArrowPanelWrappers.forEach((wrapper) =>
      wrapper.removeAttribute(ARROW_PANEL_WRAPPER_ATTRIBUTE),
    );
    markedArrowPanels.clear();
    markedArrowPanelWrappers.clear();
    markedActionMenuPopovers.forEach((popover) =>
      popover.removeAttribute(ACTION_MENU_POPOVER_ATTRIBUTE),
    );
    markedActionMenuPopovers.clear();
    markedCommentModals.forEach((modalContent) =>
      modalContent.removeAttribute(COMMENT_MODAL_ATTRIBUTE),
    );
    markedCommentModals.clear();
    markedPollOptionPopovers.forEach((popover) =>
      popover.removeAttribute(POLL_OPTION_POPOVER_ATTRIBUTE),
    );
    markedPollOptionPopovers.clear();
    markedHoverCards.forEach((hoverCard) => hoverCard.removeAttribute(HOVER_CARD_ATTRIBUTE));
    markedHoverCardAvatarRows.forEach((avatarRow) =>
      avatarRow.removeAttribute(HOVER_CARD_AVATAR_ROW_ATTRIBUTE),
    );
    markedHoverCardSingleActions.forEach((actionRow) =>
      actionRow.removeAttribute(HOVER_CARD_SINGLE_ACTION_ATTRIBUTE),
    );
    markedHoverCards.clear();
    markedHoverCardAvatarRows.clear();
    markedHoverCardSingleActions.clear();
    markedRelatedQuestionLinks.forEach((link) => {
      link.removeAttribute("title");
      link.removeAttribute(RELATED_QUESTION_TOOLTIP_ATTRIBUTE);
    });
    markedRelatedQuestionLinks.clear();
    started = false;
  };

  return { destroy, setMode, start };
};
