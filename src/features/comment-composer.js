const BOTTOM_COMPOSER_SELECTOR = ":scope > div > div:last-child .InputLike.Editable";
const COMPOSER_CONTAINER_SELECTOR = "div:has(> div > div > .InputLike.Editable)";
const COLLAPSED_ATTRIBUTE = "data-zb-comment-composer-collapsed";

export const createCommentComposerFeature = (browserWindow) => {
  const browserDocument = browserWindow.document;
  const interactedModals = new WeakSet();
  const pendingModals = new WeakSet();
  const processedModals = new WeakSet();
  const scheduledModals = new WeakSet();
  const pendingAnimationFrames = new Set();
  const pendingTimers = new Set();
  let pendingInlineComposer;
  let started = false;

  const isCommentModal = (modal) =>
    modal?.querySelector(".InputLike.Editable") && modal.querySelector("img.Avatar");

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
    if (processedModals.has(modal) || pendingModals.has(modal)) return true;

    const composer = modal.querySelector(BOTTOM_COMPOSER_SELECTOR);
    if (!composer) return false;

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
    return true;
  };

  const handlePointerDown = (event) => {
    const modal = event.target.closest?.(".Modal-content");
    if (isCommentModal(modal)) {
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
    const modal = event.target.closest?.(".Modal-content");
    if (!isCommentModal(modal)) return;

    if (pendingModals.has(modal)) {
      blurProgrammaticFocus(modal, event.target);
      return;
    }

    if (scheduledModals.has(modal)) return;
    scheduledModals.add(modal);
    const animationFrameId = browserWindow.requestAnimationFrame(() => {
      pendingAnimationFrames.delete(animationFrameId);
      if (!started) return;
      if (!collapseAutofocusedComposer(modal)) scheduledModals.delete(modal);
    });
    pendingAnimationFrames.add(animationFrameId);
  };

  const start = () => {
    if (started) return;
    started = true;

    const target = browserDocument.body ?? browserDocument.documentElement;
    if (!target) return;

    browserDocument.addEventListener("pointerdown", handlePointerDown, true);
    browserDocument.addEventListener("pointerup", handlePointerUp, true);
    browserDocument.addEventListener("pointercancel", handlePointerCancel, true);
    browserDocument.addEventListener("focusin", handleFocusIn, true);

    const activeModal = browserDocument.activeElement?.closest?.(".Modal-content");
    if (isCommentModal(activeModal)) {
      collapseAutofocusedComposer(activeModal);
    }
  };

  const destroy = () => {
    browserDocument.removeEventListener("pointerdown", handlePointerDown, true);
    browserDocument.removeEventListener("pointerup", handlePointerUp, true);
    browserDocument.removeEventListener("pointercancel", handlePointerCancel, true);
    browserDocument.removeEventListener("focusin", handleFocusIn, true);
    pendingTimers.forEach((timerId) => browserWindow.clearTimeout(timerId));
    pendingTimers.clear();
    pendingAnimationFrames.forEach((animationFrameId) =>
      browserWindow.cancelAnimationFrame(animationFrameId),
    );
    pendingAnimationFrames.clear();
    pendingInlineComposer = undefined;
    started = false;
  };

  return { destroy, start };
};
