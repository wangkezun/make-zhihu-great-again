import { getPageContext, PAGE_CONTEXT_CHANGE_EVENT, PAGE_CONTEXT_KEYS } from "./page-context.js";
import { ensureStyle } from "./shared.js";

const VALID_PAGE_KEYS = new Set(PAGE_CONTEXT_KEYS);

const normalizeEntries = (entries) => {
  if (!Array.isArray(entries)) {
    throw new TypeError("Page style entries must be an array.");
  }

  const styleIds = new Set();
  return entries.map((entry) => {
    if (!entry || typeof entry.styleId !== "string" || entry.styleId.length === 0) {
      throw new TypeError("Each page style entry must have a non-empty styleId.");
    }
    if (styleIds.has(entry.styleId)) {
      throw new TypeError(`Duplicate page style id: ${entry.styleId}`);
    }
    if (typeof entry.styleText !== "string") {
      throw new TypeError(`Page style "${entry.styleId}" must have string styleText.`);
    }
    if (entry.matches !== undefined && typeof entry.matches !== "function") {
      throw new TypeError(`Page style "${entry.styleId}" must have a function matches predicate.`);
    }
    if (entry.matches && entry.pageKeys !== undefined) {
      throw new TypeError(`Page style "${entry.styleId}" cannot define matches and pageKeys.`);
    }

    const pageKeys =
      entry.pageKeys === undefined
        ? undefined
        : Array.isArray(entry.pageKeys)
          ? [...entry.pageKeys]
          : [entry.pageKeys];
    if (
      pageKeys?.length === 0 ||
      pageKeys?.some(
        (pageKey) =>
          typeof pageKey !== "string" || pageKey.length === 0 || !VALID_PAGE_KEYS.has(pageKey),
      )
    ) {
      throw new TypeError(`Page style "${entry.styleId}" has invalid pageKeys.`);
    }

    styleIds.add(entry.styleId);
    return { ...entry, pageKeys };
  });
};

const matchesPageContext = (entry, context) => {
  if (entry.matches) return Boolean(entry.matches(context));
  if (entry.pageKeys) return entry.pageKeys.some((pageKey) => Boolean(context[pageKey]));
  return true;
};

export const createPageStylesFeature = (browserWindow, entries) => {
  const browserDocument = browserWindow.document;
  const normalizedEntries = normalizeEntries(entries);
  const ownedStyles = new Map();
  let started = false;

  const removeOwnedStyle = (styleId) => {
    const style = ownedStyles.get(styleId);
    if (!style) return;
    style.remove();
    ownedStyles.delete(styleId);
  };

  const ensureOwnedStyle = (entry) => {
    const ownedStyle = ownedStyles.get(entry.styleId);
    if (ownedStyle?.isConnected && browserDocument.getElementById(entry.styleId) === ownedStyle) {
      return;
    }
    ownedStyle?.remove();
    ownedStyles.delete(entry.styleId);

    if (browserDocument.getElementById(entry.styleId)) return;
    ensureStyle(browserDocument, entry.styleId, entry.styleText);
    const style = browserDocument.getElementById(entry.styleId);
    if (style) ownedStyles.set(entry.styleId, style);
  };

  const refresh = (context = getPageContext(browserWindow)) => {
    normalizedEntries.forEach((entry) => {
      if (matchesPageContext(entry, context)) {
        ensureOwnedStyle(entry);
      } else {
        removeOwnedStyle(entry.styleId);
      }
    });
  };

  const handlePageContextChange = (event) => {
    refresh(event.detail ?? getPageContext(browserWindow));
  };

  const start = () => {
    if (started) return;
    started = true;
    refresh();
    browserWindow.addEventListener(PAGE_CONTEXT_CHANGE_EVENT, handlePageContextChange);
  };

  const destroy = () => {
    if (!started) return;
    browserWindow.removeEventListener(PAGE_CONTEXT_CHANGE_EVENT, handlePageContextChange);
    ownedStyles.forEach((style) => style.remove());
    ownedStyles.clear();
    started = false;
  };

  return { destroy, start };
};
