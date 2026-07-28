export const PAGE_CONTEXT_CHANGE_EVENT = "zb:page-context-change";

const PAGE_ATTRIBUTES = {
  aiSearch: "data-zb-ai-search-page",
  column: "data-zb-column-page",
  creator: "data-zb-creator-page",
  creatorAssociatedAccount: "data-zb-creator-associated-account-page",
  home: "data-zb-home-page",
  messages: "data-zb-messages-page",
  paper: "data-zb-paper-page",
  paperPreview: "data-zb-paper-preview-page",
  profile: "data-zb-profile-page",
  question: "data-zb-question-page",
  ringFeeds: "data-zb-ring-feeds-page",
  ringHost: "data-zb-ring-host-page",
  ringIndex: "data-zb-ring-index-page",
  search: "data-zb-search-page",
  topic: "data-zb-topic-page",
};

export const PAGE_CONTEXT_KEYS = Object.freeze(Object.keys(PAGE_ATTRIBUTES));

export const getPageContext = (browserWindow) => {
  const { hostname, pathname, search } = browserWindow.location;
  const isZhihu = hostname === "www.zhihu.com";
  const matches = (pattern) => isZhihu && pattern.test(pathname);

  return {
    aiSearch:
      matches(/^\/search\/?$/) && new browserWindow.URLSearchParams(search).get("type") === "zhida",
    column: matches(/^\/column\/[^/]+\/?$/),
    creator: matches(/^\/creator(?:\/.*)?$/),
    creatorAssociatedAccount: matches(/^\/creator\/account\/associated-account\/?$/),
    home: matches(/^\/(?:follow\/?)?$/),
    messages: matches(/^\/messages(?:\/.*)?$/),
    paper: matches(/^\/kvip\/sku\/paper\/\d+\/?$/),
    paperPreview: matches(/^\/kvip\/pdf\/paper\/\d+\/?$/),
    profile: matches(/^\/people\/[^/]+(?:\/.*)?$/),
    question: matches(/^\/question\/\d+(?:\/answer\/\d+)?\/?$/),
    ringFeeds: matches(/^\/ring-feeds\/?$/),
    ringHost: matches(/^\/ring\/host\/\d+\/?$/),
    ringIndex: matches(/^\/ring\/?$/),
    search: matches(/^\/search\/?$/),
    topic: matches(/^\/topic\/\d+(?:\/(?:intro|hot|newest|top-answers|unanswered|questions))?\/?$/),
  };
};

export const createPageContextFeature = (browserWindow) => {
  const browserDocument = browserWindow.document;
  let animationFrameId;
  let originalPushState;
  let originalReplaceState;
  let wrappedPushState;
  let wrappedReplaceState;
  let scheduled = false;
  let started = false;

  const refresh = () => {
    const root = browserDocument.documentElement;
    if (!root) return;

    const context = getPageContext(browserWindow);
    Object.entries(PAGE_ATTRIBUTES).forEach(([key, attribute]) => {
      root.setAttribute(attribute, String(context[key]));
    });
    browserWindow.dispatchEvent(
      new browserWindow.CustomEvent(PAGE_CONTEXT_CHANGE_EVENT, { detail: context }),
    );
  };

  const scheduleRefresh = () => {
    if (scheduled) return;
    scheduled = true;
    animationFrameId = browserWindow.requestAnimationFrame(() => {
      scheduled = false;
      animationFrameId = undefined;
      refresh();
    });
  };

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
    installRouteListeners();
  };

  const destroy = () => {
    if (!started) return;
    removeRouteListeners();
    if (animationFrameId !== undefined) {
      browserWindow.cancelAnimationFrame(animationFrameId);
    }
    Object.values(PAGE_ATTRIBUTES).forEach((attribute) => {
      browserDocument.documentElement?.removeAttribute(attribute);
    });
    animationFrameId = undefined;
    scheduled = false;
    started = false;
  };

  return { destroy, refresh, start };
};
