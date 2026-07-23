const COMMENT_MODAL_SELECTOR = ".Modal-content:has(.InputLike.Editable):has(img.Avatar)";
const BOTTOM_COMPOSER_SELECTOR = ":scope > div > div:last-child .InputLike.Editable";
const COMPOSER_CONTAINER_SELECTOR = "div:has(> div > div > .InputLike.Editable)";
const COLLAPSED_ATTRIBUTE = "data-zb-comment-composer-collapsed";

export const createCommentComposerFeature = (browserWindow) => {
  const browserDocument = browserWindow.document;
  const interactedModals = new WeakSet();
  const pendingModals = new WeakSet();
  const processedModals = new WeakSet();
  const pendingTimers = new Set();
  let pendingInlineComposer;
  let observer;
  let started = false;

  const blurProgrammaticFocus = (modal, activeElement = browserDocument.activeElement) => {
    const composer = modal.querySelector(BOTTOM_COMPOSER_SELECTOR);
    const editor = composer?.querySelector('[contenteditable="true"]');
    if (
      !interactedModals.has(modal) &&
      !editor?.textContent.trim() &&
      composer?.contains(activeElement)
    ) {
      composer.closest(COMPOSER_CONTAINER_SELECTOR)?.setAttribute(COLLAPSED_ATTRIBUTE, "");
      activeElement.blur();
    }
  };

  const collapseAutofocusedComposer = (modal) => {
    if (processedModals.has(modal) || pendingModals.has(modal)) return;

    const composer = modal.querySelector(BOTTOM_COMPOSER_SELECTOR);
    if (!composer) return;

    pendingModals.add(modal);
    blurProgrammaticFocus(modal);

    const timerId = browserWindow.setTimeout(() => {
      pendingTimers.delete(timerId);
      pendingModals.delete(modal);
      if (!started) return;

      blurProgrammaticFocus(modal);
      processedModals.add(modal);
    }, 250);
    pendingTimers.add(timerId);
  };

  const handlePointerDown = (event) => {
    const modal = event.target.closest?.(COMMENT_MODAL_SELECTOR);
    if (modal) {
      interactedModals.add(modal);
      event.target.closest?.(COMPOSER_CONTAINER_SELECTOR)?.removeAttribute(COLLAPSED_ATTRIBUTE);
      return;
    }

    const inlineComposer = event.target.closest?.(".InputLike.Editable");
    const comments = inlineComposer?.closest(".Comments-container");
    const footer = comments?.firstElementChild?.firstElementChild;
    const editor = inlineComposer?.querySelector('[contenteditable="true"]');
    if (!editor || !footer?.contains(inlineComposer) || inlineComposer.matches(":focus-within"))
      return;

    event.preventDefault();
    pendingInlineComposer = { editor, inlineComposer };
  };

  const handlePointerUp = (event) => {
    const pendingComposer = pendingInlineComposer;
    pendingInlineComposer = undefined;
    if (!pendingComposer?.inlineComposer.contains(event.target)) return;

    browserWindow.requestAnimationFrame(() => pendingComposer.editor.focus());
  };

  const handlePointerCancel = () => {
    pendingInlineComposer = undefined;
  };

  const handleFocusIn = (event) => {
    const modal = event.target.closest?.(COMMENT_MODAL_SELECTOR);
    if (modal && pendingModals.has(modal)) {
      blurProgrammaticFocus(modal, event.target);
    }
  };

  const refresh = () => {
    browserDocument.querySelectorAll(COMMENT_MODAL_SELECTOR).forEach(collapseAutofocusedComposer);
  };

  const start = () => {
    if (started) return;
    started = true;
    refresh();

    const target = browserDocument.body ?? browserDocument.documentElement;
    if (!target) return;

    browserDocument.addEventListener("pointerdown", handlePointerDown, true);
    browserDocument.addEventListener("pointerup", handlePointerUp, true);
    browserDocument.addEventListener("pointercancel", handlePointerCancel, true);
    browserDocument.addEventListener("focusin", handleFocusIn, true);
    observer = new browserWindow.MutationObserver(refresh);
    observer.observe(target, { childList: true, subtree: true });
  };

  const destroy = () => {
    browserDocument.removeEventListener("pointerdown", handlePointerDown, true);
    browserDocument.removeEventListener("pointerup", handlePointerUp, true);
    browserDocument.removeEventListener("pointercancel", handlePointerCancel, true);
    browserDocument.removeEventListener("focusin", handleFocusIn, true);
    pendingTimers.forEach((timerId) => browserWindow.clearTimeout(timerId));
    pendingTimers.clear();
    observer?.disconnect();
    observer = undefined;
    pendingInlineComposer = undefined;
    started = false;
  };

  return { destroy, start };
};
