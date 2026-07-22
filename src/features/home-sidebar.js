import { HOME_SIDEBAR_STYLE } from "../styles/home-sidebar.js";

export const HOME_SIDEBAR_STORAGE_KEY = "zhihu-beautification:hide-home-sidebar";

const ROOT_ENABLED_ATTRIBUTE = "data-zb-hide-home-sidebar";
const ROOT_HOME_ATTRIBUTE = "data-zb-home-page";
const SIDEBAR_ATTRIBUTE = "data-zb-home-sidebar";
const STYLE_ID = "zb-home-sidebar-style";

const readPreference = (browserWindow, settings) => {
  try {
    if (settings?.getPreference) return Boolean(settings.getPreference(true));

    const storedValue = browserWindow.localStorage.getItem(HOME_SIDEBAR_STORAGE_KEY);
    return storedValue === null ? true : storedValue === "true";
  } catch {
    return true;
  }
};

export const createHomeSidebarFeature = (browserWindow, settings) => {
  const browserDocument = browserWindow.document;
  let shouldHideSidebar = readPreference(browserWindow, settings);
  let observer;
  let animationFrameId;
  let menuCommandId;
  let scheduled = false;
  let started = false;

  const isHomePage = () =>
    browserWindow.location.hostname === "www.zhihu.com" && browserWindow.location.pathname === "/";

  const updateRootState = () => {
    const root = browserDocument.documentElement;
    if (!root) return;

    root.setAttribute(ROOT_HOME_ATTRIBUTE, String(isHomePage()));
    root.setAttribute(ROOT_ENABLED_ATTRIBUTE, String(shouldHideSidebar));
  };

  const injectStyle = () => {
    if (browserDocument.getElementById(STYLE_ID)) return;

    const target = browserDocument.head ?? browserDocument.documentElement;
    if (!target) return;

    const style = browserDocument.createElement("style");
    style.id = STYLE_ID;
    style.textContent = HOME_SIDEBAR_STYLE;
    target.append(style);
  };

  const findSidebar = () => {
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

  const markSidebar = () => {
    browserDocument.querySelectorAll(`[${SIDEBAR_ATTRIBUTE}]`).forEach((element) => {
      element.removeAttribute(SIDEBAR_ATTRIBUTE);
    });

    if (!isHomePage()) return;
    findSidebar()?.setAttribute(SIDEBAR_ATTRIBUTE, "");
  };

  const updateMenuCommand = () => {
    if (!settings?.menu?.register) return;

    if (menuCommandId !== undefined && settings.menu.unregister) {
      settings.menu.unregister(menuCommandId);
    }

    const status = shouldHideSidebar ? "已开启" : "已关闭";
    menuCommandId = settings.menu.register(`隐藏首页右栏：${status}`, () => {
      savePreference(!shouldHideSidebar);
    });
  };

  const savePreference = (value) => {
    shouldHideSidebar = value;
    try {
      if (settings?.setPreference) {
        settings.setPreference(value);
      } else {
        browserWindow.localStorage.setItem(HOME_SIDEBAR_STORAGE_KEY, String(value));
      }
    } catch {
      // 用户脚本存储不可用时，本次页面内的选择仍然有效。
    }
    updateRootState();
    markSidebar();
    updateMenuCommand();
  };

  const ensureObserver = () => {
    if (observer || !browserDocument.documentElement) return;

    observer = new browserWindow.MutationObserver(scheduleRefresh);
    observer.observe(browserDocument.documentElement, { childList: true, subtree: true });
  };

  const refresh = () => {
    updateRootState();
    injectStyle();
    markSidebar();
    ensureObserver();
  };

  function scheduleRefresh() {
    if (scheduled) return;
    scheduled = true;
    animationFrameId = browserWindow.requestAnimationFrame(() => {
      scheduled = false;
      refresh();
    });
  }

  const start = () => {
    if (started) return;
    started = true;
    refresh();
    updateMenuCommand();
    browserDocument.addEventListener("DOMContentLoaded", scheduleRefresh, { once: true });
    browserWindow.addEventListener("popstate", scheduleRefresh);
  };

  const destroy = () => {
    observer?.disconnect();
    if (animationFrameId !== undefined) {
      browserWindow.cancelAnimationFrame(animationFrameId);
    }
    browserDocument.removeEventListener("DOMContentLoaded", scheduleRefresh);
    browserWindow.removeEventListener("popstate", scheduleRefresh);
    if (menuCommandId !== undefined && settings?.menu?.unregister) {
      settings.menu.unregister(menuCommandId);
    }
    browserDocument.getElementById(STYLE_ID)?.remove();
    browserDocument.querySelectorAll(`[${SIDEBAR_ATTRIBUTE}]`).forEach((element) => {
      element.removeAttribute(SIDEBAR_ATTRIBUTE);
    });
    browserDocument.documentElement?.removeAttribute(ROOT_HOME_ATTRIBUTE);
    browserDocument.documentElement?.removeAttribute(ROOT_ENABLED_ATTRIBUTE);
  };

  return { destroy, refresh, start };
};
