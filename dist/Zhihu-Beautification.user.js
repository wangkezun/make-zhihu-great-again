// ==UserScript==
// @name         知乎美化 v5
// @namespace    https://github.com/wangkezun/zhihu-beautification
// @version      5.2.69
// @description  提供可自由开关的知乎页面美化功能
// @match        https://www.zhihu.com/*
// @run-at       document-start
// @early-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// ==/UserScript==
(function () {
  'use strict';

  const COMMENT_MODAL_SELECTOR = ".Modal-content:has(.InputLike.Editable):has(img.Avatar)";
  const BOTTOM_COMPOSER_SELECTOR = ":scope > div > div:last-child .InputLike.Editable";
  const COMPOSER_CONTAINER_SELECTOR = "div:has(> div > div > .InputLike.Editable)";
  const COLLAPSED_ATTRIBUTE = "data-zb-comment-composer-collapsed";

  const createCommentComposerFeature = (browserWindow) => {
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

  const HOME_COMPOSER_STYLE = `
  html[data-zb-home-page="true"][data-zb-show-home-composer="false"]
    .Topstory-mainColumn > .WriteArea {
    display: none !important;
  }
`;

  const HOME_COMPOSER_STORAGE_KEY = "zhihu-beautification:show-home-composer";

  const ROOT_ATTRIBUTE = "data-zb-show-home-composer";
  const STYLE_ID$3 = "zb-home-composer-style";

  const readPreference$1 = (browserWindow, settings) => {
    try {
      if (settings?.getPreference) return Boolean(settings.getPreference(true));

      const storedValue = browserWindow.localStorage.getItem(HOME_COMPOSER_STORAGE_KEY);
      return storedValue === null ? true : storedValue === "true";
    } catch {
      return true;
    }
  };

  const createHomeComposerFeature = (browserWindow, settings) => {
    const browserDocument = browserWindow.document;
    let shouldShowComposer = readPreference$1(browserWindow, settings);
    let menuCommandId;
    let started = false;

    const updateRootState = () => {
      browserDocument.documentElement?.setAttribute(ROOT_ATTRIBUTE, String(shouldShowComposer));
    };

    const injectStyle = () => {
      if (browserDocument.getElementById(STYLE_ID$3)) return;

      const target = browserDocument.head ?? browserDocument.documentElement;
      if (!target) return;

      const style = browserDocument.createElement("style");
      style.id = STYLE_ID$3;
      style.textContent = HOME_COMPOSER_STYLE;
      target.append(style);
    };

    const updateMenuCommand = () => {
      if (!settings?.menu?.register) return;

      if (menuCommandId !== undefined && settings.menu.unregister) {
        settings.menu.unregister(menuCommandId);
      }

      const status = shouldShowComposer ? "已开启" : "已关闭";
      menuCommandId = settings.menu.register(`显示首页分享想法：${status}`, () => {
        savePreference(!shouldShowComposer);
      });
    };

    const savePreference = (value) => {
      shouldShowComposer = value;
      try {
        if (settings?.setPreference) {
          settings.setPreference(value);
        } else {
          browserWindow.localStorage.setItem(HOME_COMPOSER_STORAGE_KEY, String(value));
        }
      } catch {
        // 用户脚本存储不可用时，本次页面内的选择仍然有效。
      }
      updateRootState();
      updateMenuCommand();
    };

    const start = () => {
      if (started) return;
      started = true;
      updateRootState();
      injectStyle();
      updateMenuCommand();
    };

    const destroy = () => {
      if (menuCommandId !== undefined && settings?.menu?.unregister) {
        settings.menu.unregister(menuCommandId);
      }
      browserDocument.getElementById(STYLE_ID$3)?.remove();
      browserDocument.documentElement?.removeAttribute(ROOT_ATTRIBUTE);
    };

    return { destroy, start };
  };

  const HOME_SIDEBAR_STYLE = `
  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="true"]
    .Topstory-container > [data-zb-home-sidebar],
  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="true"]
    .Topstory-container > .Topstory-mainColumn ~ div,
  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="true"]
    [data-za-detail-view-path-module="RightSideBar"],
  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="true"]
    .Topstory-container > :has([role="complementary"][aria-label="创作中心卡片"]) {
    display: none !important;
  }

  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="true"]
    .Topstory-container {
    width: min(var(--zb-home-main-width, 694px), calc(100vw - 32px)) !important;
  }

  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="true"]
    .Topstory-mainColumn {
    width: 100% !important;
    min-width: 0 !important;
  }

  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .Question-sideColumn,
  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    [data-zb-home-sidebar] {
    display: none !important;
  }

  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .QuestionHeader-side {
    display: none !important;
  }

  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .QuestionHeader-content,
  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .QuestionHeader-footer-inner {
    box-sizing: border-box !important;
    width: min(var(--zb-home-main-width, 694px), calc(100vw - 32px)) !important;
    margin-inline: auto !important;
    padding-inline: 16px !important;
  }

  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .QuestionHeader-content
    > .QuestionHeader-main,
  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .QuestionHeader-footer-main {
    width: 100% !important;
    min-width: 0 !important;
  }

  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .QuestionPage
    > div:has(.Question-mainColumn) {
    box-sizing: border-box !important;
    justify-content: center !important;
    width: min(var(--zb-home-main-width, 694px), calc(100vw - 32px)) !important;
    margin-inline: auto !important;
  }

  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .QuestionPage
    > div:has(.Question-mainColumn)
    > div:has(.Question-mainColumn),
  html[data-zb-question-page="true"][data-zb-hide-home-sidebar="true"]
    .Question-mainColumn {
    width: 100% !important;
    min-width: 0 !important;
  }
`;

  const HOME_SIDEBAR_STORAGE_KEY = "zhihu-beautification:hide-home-sidebar";

  const ROOT_ENABLED_ATTRIBUTE = "data-zb-hide-home-sidebar";
  const ROOT_HOME_ATTRIBUTE = "data-zb-home-page";
  const ROOT_QUESTION_ATTRIBUTE = "data-zb-question-page";
  const ROOT_QUESTION_CONTENT_ATTRIBUTE = "data-zb-question-content-under-header";
  const SIDEBAR_ATTRIBUTE = "data-zb-home-sidebar";
  const STYLE_ID$2 = "zb-home-sidebar-style";

  const readPreference = (browserWindow, settings) => {
    try {
      if (settings?.getPreference) return Boolean(settings.getPreference(true));

      const storedValue = browserWindow.localStorage.getItem(HOME_SIDEBAR_STORAGE_KEY);
      return storedValue === null ? true : storedValue === "true";
    } catch {
      return true;
    }
  };

  const createHomeSidebarFeature = (browserWindow, settings) => {
    const browserDocument = browserWindow.document;
    let shouldHideSidebar = readPreference(browserWindow, settings);
    let observer;
    let animationFrameId;
    let positionAnimationFrameId;
    let menuCommandId;
    let positionScheduled = false;
    let scheduled = false;
    let started = false;

    const isHomePage = () =>
      browserWindow.location.hostname === "www.zhihu.com" && browserWindow.location.pathname === "/";

    const isQuestionPage = () =>
      browserWindow.location.hostname === "www.zhihu.com" &&
      /^\/question\/\d+(?:\/answer\/\d+)?\/?$/.test(browserWindow.location.pathname);

    const updateRootState = () => {
      const root = browserDocument.documentElement;
      if (!root) return;

      root.setAttribute(ROOT_HOME_ATTRIBUTE, String(isHomePage()));
      root.setAttribute(ROOT_QUESTION_ATTRIBUTE, String(isQuestionPage()));
      root.setAttribute(ROOT_ENABLED_ATTRIBUTE, String(shouldHideSidebar));
    };

    const updateQuestionContentPosition = () => {
      const root = browserDocument.documentElement;
      if (!root) return;

      const pageHeader = browserDocument.querySelector(".PageHeader.is-shown");
      const questionContent = browserDocument.querySelector(
        ".Question-mainColumn :is(.AnswersNavWrapper, .AnswerCard, .MoreAnswers)",
      );
      const isUnderHeader =
        isQuestionPage() &&
        pageHeader &&
        questionContent &&
        questionContent.getBoundingClientRect().top <= pageHeader.getBoundingClientRect().bottom + 10;

      root.setAttribute(ROOT_QUESTION_CONTENT_ATTRIBUTE, String(Boolean(isUnderHeader)));
    };

    const injectStyle = () => {
      if (browserDocument.getElementById(STYLE_ID$2)) return;

      const target = browserDocument.head ?? browserDocument.documentElement;
      if (!target) return;

      const style = browserDocument.createElement("style");
      style.id = STYLE_ID$2;
      style.textContent = HOME_SIDEBAR_STYLE;
      target.append(style);
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

    const markSidebar = () => {
      browserDocument.querySelectorAll(`[${SIDEBAR_ATTRIBUTE}]`).forEach((element) => {
        element.removeAttribute(SIDEBAR_ATTRIBUTE);
      });

      if (isHomePage()) {
        findHomeSidebar()?.setAttribute(SIDEBAR_ATTRIBUTE, "");
      } else if (isQuestionPage()) {
        findQuestionSidebar()?.setAttribute(SIDEBAR_ATTRIBUTE, "");
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
      updateQuestionContentPosition();
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

    function schedulePositionRefresh() {
      if (positionScheduled) return;
      positionScheduled = true;
      positionAnimationFrameId = browserWindow.requestAnimationFrame(() => {
        positionScheduled = false;
        updateQuestionContentPosition();
      });
    }

    const start = () => {
      if (started) return;
      started = true;
      refresh();
      updateMenuCommand();
      browserDocument.addEventListener("DOMContentLoaded", scheduleRefresh, { once: true });
      browserWindow.addEventListener("popstate", scheduleRefresh);
      browserWindow.addEventListener("resize", schedulePositionRefresh);
      browserWindow.addEventListener("scroll", schedulePositionRefresh, { passive: true });
    };

    const destroy = () => {
      observer?.disconnect();
      if (animationFrameId !== undefined) {
        browserWindow.cancelAnimationFrame(animationFrameId);
      }
      if (positionAnimationFrameId !== undefined) {
        browserWindow.cancelAnimationFrame(positionAnimationFrameId);
      }
      browserDocument.removeEventListener("DOMContentLoaded", scheduleRefresh);
      browserWindow.removeEventListener("popstate", scheduleRefresh);
      browserWindow.removeEventListener("resize", schedulePositionRefresh);
      browserWindow.removeEventListener("scroll", schedulePositionRefresh);
      if (menuCommandId !== undefined && settings?.menu?.unregister) {
        settings.menu.unregister(menuCommandId);
      }
      browserDocument.getElementById(STYLE_ID$2)?.remove();
      browserDocument.querySelectorAll(`[${SIDEBAR_ATTRIBUTE}]`).forEach((element) => {
        element.removeAttribute(SIDEBAR_ATTRIBUTE);
      });
      browserDocument.documentElement?.removeAttribute(ROOT_HOME_ATTRIBUTE);
      browserDocument.documentElement?.removeAttribute(ROOT_ENABLED_ATTRIBUTE);
      browserDocument.documentElement?.removeAttribute(ROOT_QUESTION_ATTRIBUTE);
      browserDocument.documentElement?.removeAttribute(ROOT_QUESTION_CONTENT_ATTRIBUTE);
    };

    return { destroy, refresh, start };
  };

  const HOME_WIDTH_STYLE = `
  html[data-zb-home-width="standard"] {
    --zb-home-main-width: 694px;
  }

  html[data-zb-home-width="comfortable"] {
    --zb-home-main-width: 820px;
  }

  html[data-zb-home-width="wide"] {
    --zb-home-main-width: 960px;
  }

  html[data-zb-home-width="fluid"] {
    --zb-home-main-width: calc(100vw - 32px);
  }

  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="false"]
    .Topstory-container {
    width: min(calc(var(--zb-home-main-width, 694px) + 306px), calc(100vw - 32px)) !important;
  }

  html[data-zb-home-page="true"][data-zb-hide-home-sidebar="false"]
    .Topstory-mainColumn {
    width: min(var(--zb-home-main-width, 694px), calc(100% - 306px)) !important;
    min-width: 0 !important;
  }
`;

  const HOME_WIDTH_STORAGE_KEY = "zhihu-beautification:home-width";
  const HOME_WIDTH_MODES = ["standard", "comfortable", "wide", "fluid"];

  const WIDTH_ATTRIBUTE = "data-zb-home-width";
  const STYLE_ID$1 = "zb-home-width-style";
  const WIDTH_LABELS = {
    standard: "标准（694px）",
    comfortable: "舒适（820px）",
    wide: "宽屏（960px）",
    fluid: "自适应窗口",
  };

  const isWidthMode = (value) => HOME_WIDTH_MODES.includes(value);

  const createHomeWidthFeature = (browserWindow, settings) => {
    const browserDocument = browserWindow.document;
    const menuCommandIds = [];
    let mode;
    let started = false;

    const readMode = () => {
      try {
        const storedMode = settings?.getMode?.("standard") ?? "standard";
        return isWidthMode(storedMode) ? storedMode : "standard";
      } catch {
        return "standard";
      }
    };

    const injectStyle = () => {
      if (browserDocument.getElementById(STYLE_ID$1)) return;

      const target = browserDocument.head ?? browserDocument.documentElement;
      if (!target) return;

      const style = browserDocument.createElement("style");
      style.id = STYLE_ID$1;
      style.textContent = HOME_WIDTH_STYLE;
      target.append(style);
    };

    const clearMenuCommands = () => {
      if (settings?.menu?.unregister) {
        menuCommandIds.splice(0).forEach((commandId) => {
          settings.menu.unregister(commandId);
        });
        return;
      }
      menuCommandIds.length = 0;
    };

    const updateMenuCommands = () => {
      if (!settings?.menu?.register) return;

      clearMenuCommands();
      HOME_WIDTH_MODES.forEach((widthMode) => {
        const marker = widthMode === mode ? "✓" : "○";
        const commandId = settings.menu.register(
          `${marker} 首页宽度：${WIDTH_LABELS[widthMode]}`,
          () => setMode(widthMode),
        );
        menuCommandIds.push(commandId);
      });
    };

    function setMode(nextMode) {
      mode = isWidthMode(nextMode) ? nextMode : "standard";
      browserDocument.documentElement?.setAttribute(WIDTH_ATTRIBUTE, mode);
      try {
        settings?.setMode?.(mode);
      } catch {
        // 用户脚本存储不可用时，本次页面内的选择仍然有效。
      }
      updateMenuCommands();
    }

    const start = () => {
      if (started) return;
      started = true;
      mode = readMode();
      browserDocument.documentElement?.setAttribute(WIDTH_ATTRIBUTE, mode);
      injectStyle();
      updateMenuCommands();
    };

    const destroy = () => {
      clearMenuCommands();
      browserDocument.getElementById(STYLE_ID$1)?.remove();
      browserDocument.documentElement?.removeAttribute(WIDTH_ATTRIBUTE);
    };

    return { destroy, setMode, start };
  };

  const definitions = {
      "version": "1.8.0",
      "latte": {
          "name": "Latte",
          "emoji": "🌻",
          "order": 0,
          "dark": false,
          "colors": {
              "rosewater": {
                  "name": "Rosewater",
                  "order": 0,
                  "hex": "#dc8a78",
                  "rgb": {
                      "r": 220,
                      "g": 138,
                      "b": 120
                  },
                  "hsl": {
                      "h": 10.799999999999995,
                      "s": 0.5882352941176472,
                      "l": 0.6666666666666667
                  },
                  "oklch": {
                      "l": 0.7141334177439316,
                      "c": 0.10454308131901496,
                      "h": 33.09671972159322
                  },
                  "accent": true
              },
              "flamingo": {
                  "name": "Flamingo",
                  "order": 1,
                  "hex": "#dd7878",
                  "rgb": {
                      "r": 221,
                      "g": 120,
                      "b": 120
                  },
                  "hsl": {
                      "h": 0,
                      "s": 0.5976331360946746,
                      "l": 0.6686274509803922
                  },
                  "oklch": {
                      "l": 0.6856400855348588,
                      "c": 0.12594048943036812,
                      "h": 20.867035334230025
                  },
                  "accent": true
              },
              "pink": {
                  "name": "Pink",
                  "order": 2,
                  "hex": "#ea76cb",
                  "rgb": {
                      "r": 234,
                      "g": 118,
                      "b": 203
                  },
                  "hsl": {
                      "h": 316.0344827586207,
                      "s": 0.7341772151898731,
                      "l": 0.6901960784313725
                  },
                  "oklch": {
                      "l": 0.7255597313429507,
                      "c": 0.17393264562602528,
                      "h": 338.4333428586893
                  },
                  "accent": true
              },
              "mauve": {
                  "name": "Mauve",
                  "order": 3,
                  "hex": "#8839ef",
                  "rgb": {
                      "r": 136,
                      "g": 57,
                      "b": 239
                  },
                  "hsl": {
                      "h": 266.0439560439561,
                      "s": 0.8504672897196262,
                      "l": 0.5803921568627451
                  },
                  "oklch": {
                      "l": 0.5546698483756871,
                      "c": 0.25034607990295016,
                      "h": 297.0156483500495
                  },
                  "accent": true
              },
              "red": {
                  "name": "Red",
                  "order": 4,
                  "hex": "#d20f39",
                  "rgb": {
                      "r": 210,
                      "g": 15,
                      "b": 57
                  },
                  "hsl": {
                      "h": 347.0769230769231,
                      "s": 0.8666666666666666,
                      "l": 0.4411764705882353
                  },
                  "oklch": {
                      "l": 0.5504744142539229,
                      "c": 0.21551430760195764,
                      "h": 19.809464044160393
                  },
                  "accent": true
              },
              "maroon": {
                  "name": "Maroon",
                  "order": 5,
                  "hex": "#e64553",
                  "rgb": {
                      "r": 230,
                      "g": 69,
                      "b": 83
                  },
                  "hsl": {
                      "h": 354.78260869565213,
                      "s": 0.76303317535545,
                      "l": 0.5862745098039216
                  },
                  "oklch": {
                      "l": 0.6252005804874908,
                      "c": 0.19674637699385977,
                      "h": 20.27238075293735
                  },
                  "accent": true
              },
              "peach": {
                  "name": "Peach",
                  "order": 6,
                  "hex": "#fe640b",
                  "rgb": {
                      "r": 254,
                      "g": 100,
                      "b": 11
                  },
                  "hsl": {
                      "h": 21.975308641975307,
                      "s": 0.9918367346938776,
                      "l": 0.5196078431372549
                  },
                  "oklch": {
                      "l": 0.6919766433363157,
                      "c": 0.20405156758527304,
                      "h": 42.4292658007281
                  },
                  "accent": true
              },
              "yellow": {
                  "name": "Yellow",
                  "order": 7,
                  "hex": "#df8e1d",
                  "rgb": {
                      "r": 223,
                      "g": 142,
                      "b": 29
                  },
                  "hsl": {
                      "h": 34.948453608247426,
                      "s": 0.7698412698412698,
                      "l": 0.49411764705882355
                  },
                  "oklch": {
                      "l": 0.7139917309504697,
                      "c": 0.14944164080684152,
                      "h": 67.77665534753208
                  },
                  "accent": true
              },
              "green": {
                  "name": "Green",
                  "order": 8,
                  "hex": "#40a02b",
                  "rgb": {
                      "r": 64,
                      "g": 160,
                      "b": 43
                  },
                  "hsl": {
                      "h": 109.23076923076923,
                      "s": 0.5763546798029556,
                      "l": 0.39803921568627454
                  },
                  "oklch": {
                      "l": 0.6250443904295363,
                      "c": 0.17715816108762134,
                      "h": 140.44483759142634
                  },
                  "accent": true
              },
              "teal": {
                  "name": "Teal",
                  "order": 9,
                  "hex": "#179299",
                  "rgb": {
                      "r": 23,
                      "g": 146,
                      "b": 153
                  },
                  "hsl": {
                      "h": 183.23076923076923,
                      "s": 0.7386363636363636,
                      "l": 0.34509803921568627
                  },
                  "oklch": {
                      "l": 0.6022689684480229,
                      "c": 0.09811495789237053,
                      "h": 201.1047483772147
                  },
                  "accent": true
              },
              "sky": {
                  "name": "Sky",
                  "order": 10,
                  "hex": "#04a5e5",
                  "rgb": {
                      "r": 4,
                      "g": 165,
                      "b": 229
                  },
                  "hsl": {
                      "h": 197.0666666666667,
                      "s": 0.965665236051502,
                      "l": 0.45686274509803926
                  },
                  "oklch": {
                      "l": 0.6820196727415445,
                      "c": 0.14481893950526162,
                      "h": 235.38221876463177
                  },
                  "accent": true
              },
              "sapphire": {
                  "name": "Sapphire",
                  "order": 11,
                  "hex": "#209fb5",
                  "rgb": {
                      "r": 32,
                      "g": 159,
                      "b": 181
                  },
                  "hsl": {
                      "h": 188.85906040268458,
                      "s": 0.6995305164319249,
                      "l": 0.4176470588235294
                  },
                  "oklch": {
                      "l": 0.6477443602548549,
                      "c": 0.1067685254795326,
                      "h": 212.88928055980793
                  },
                  "accent": true
              },
              "blue": {
                  "name": "Blue",
                  "order": 12,
                  "hex": "#1e66f5",
                  "rgb": {
                      "r": 30,
                      "g": 102,
                      "b": 245
                  },
                  "hsl": {
                      "h": 219.90697674418607,
                      "s": 0.9148936170212768,
                      "l": 0.5392156862745098
                  },
                  "oklch": {
                      "l": 0.5586168519157438,
                      "c": 0.22550252265688878,
                      "h": 262.08665056049813
                  },
                  "accent": true
              },
              "lavender": {
                  "name": "Lavender",
                  "order": 13,
                  "hex": "#7287fd",
                  "rgb": {
                      "r": 114,
                      "g": 135,
                      "b": 253
                  },
                  "hsl": {
                      "h": 230.93525179856115,
                      "s": 0.9720279720279721,
                      "l": 0.7196078431372549
                  },
                  "oklch": {
                      "l": 0.6637628995344029,
                      "c": 0.17510330354646367,
                      "h": 273.1346035067078
                  },
                  "accent": true
              },
              "text": {
                  "name": "Text",
                  "order": 14,
                  "hex": "#4c4f69",
                  "rgb": {
                      "r": 76,
                      "g": 79,
                      "b": 105
                  },
                  "hsl": {
                      "h": 233.79310344827587,
                      "s": 0.16022099447513813,
                      "l": 0.3549019607843137
                  },
                  "oklch": {
                      "l": 0.4354696280914242,
                      "c": 0.043007957904862906,
                      "h": 279.325020951234
                  },
                  "accent": false
              },
              "subtext1": {
                  "name": "Subtext 1",
                  "order": 15,
                  "hex": "#5c5f77",
                  "rgb": {
                      "r": 92,
                      "g": 95,
                      "b": 119
                  },
                  "hsl": {
                      "h": 233.33333333333334,
                      "s": 0.1279620853080569,
                      "l": 0.4137254901960784
                  },
                  "oklch": {
                      "l": 0.4920027877673451,
                      "c": 0.038490502533791375,
                      "h": 279.299160578886
                  },
                  "accent": false
              },
              "subtext0": {
                  "name": "Subtext 0",
                  "order": 16,
                  "hex": "#6c6f85",
                  "rgb": {
                      "r": 108,
                      "g": 111,
                      "b": 133
                  },
                  "hsl": {
                      "h": 232.79999999999998,
                      "s": 0.10373443983402494,
                      "l": 0.4725490196078431
                  },
                  "oklch": {
                      "l": 0.5470776379676476,
                      "c": 0.034342788375285344,
                      "h": 279.0836971153176
                  },
                  "accent": false
              },
              "overlay2": {
                  "name": "Overlay 2",
                  "order": 17,
                  "hex": "#7c7f93",
                  "rgb": {
                      "r": 124,
                      "g": 127,
                      "b": 147
                  },
                  "hsl": {
                      "h": 232.17391304347825,
                      "s": 0.09623430962343092,
                      "l": 0.5313725490196078
                  },
                  "oklch": {
                      "l": 0.6008781390594233,
                      "c": 0.030490464162269262,
                      "h": 278.694364334887
                  },
                  "accent": false
              },
              "overlay1": {
                  "name": "Overlay 1",
                  "order": 18,
                  "hex": "#8c8fa1",
                  "rgb": {
                      "r": 140,
                      "g": 143,
                      "b": 161
                  },
                  "hsl": {
                      "h": 231.42857142857144,
                      "s": 0.10047846889952144,
                      "l": 0.5901960784313726
                  },
                  "oklch": {
                      "l": 0.6535536290493023,
                      "c": 0.026878770771298608,
                      "h": 278.1208159631207
                  },
                  "accent": false
              },
              "overlay0": {
                  "name": "Overlay 0",
                  "order": 19,
                  "hex": "#9ca0b0",
                  "rgb": {
                      "r": 156,
                      "g": 160,
                      "b": 176
                  },
                  "hsl": {
                      "h": 228.00000000000003,
                      "s": 0.11235955056179768,
                      "l": 0.6509803921568628
                  },
                  "oklch": {
                      "l": 0.7076684584948777,
                      "c": 0.02366986561429199,
                      "h": 274.6008348717119
                  },
                  "accent": false
              },
              "surface2": {
                  "name": "Surface 2",
                  "order": 20,
                  "hex": "#acb0be",
                  "rgb": {
                      "r": 172,
                      "g": 176,
                      "b": 190
                  },
                  "hsl": {
                      "h": 226.6666666666667,
                      "s": 0.12162162162162159,
                      "l": 0.7098039215686275
                  },
                  "oklch": {
                      "l": 0.7583943521589962,
                      "c": 0.020453440241571547,
                      "h": 273.1535522460353
                  },
                  "accent": false
              },
              "surface1": {
                  "name": "Surface 1",
                  "order": 21,
                  "hex": "#bcc0cc",
                  "rgb": {
                      "r": 188,
                      "g": 192,
                      "b": 204
                  },
                  "hsl": {
                      "h": 225.00000000000003,
                      "s": 0.13559322033898308,
                      "l": 0.7686274509803922
                  },
                  "oklch": {
                      "l": 0.8083070110182754,
                      "c": 0.01739330880861526,
                      "h": 271.1981554317899
                  },
                  "accent": false
              },
              "surface0": {
                  "name": "Surface 0",
                  "order": 22,
                  "hex": "#ccd0da",
                  "rgb": {
                      "r": 204,
                      "g": 208,
                      "b": 218
                  },
                  "hsl": {
                      "h": 222.85714285714292,
                      "s": 0.1590909090909089,
                      "l": 0.8274509803921568
                  },
                  "oklch": {
                      "l": 0.8574770848204982,
                      "c": 0.014479984436494493,
                      "h": 268.47559171847894
                  },
                  "accent": false
              },
              "base": {
                  "name": "Base",
                  "order": 23,
                  "hex": "#eff1f5",
                  "rgb": {
                      "r": 239,
                      "g": 241,
                      "b": 245
                  },
                  "hsl": {
                      "h": 220.00000000000009,
                      "s": 0.23076923076923136,
                      "l": 0.9490196078431372
                  },
                  "oklch": {
                      "l": 0.9577608870760925,
                      "c": 0.005766802410310334,
                      "h": 264.532151644555
                  },
                  "accent": false
              },
              "mantle": {
                  "name": "Mantle",
                  "order": 24,
                  "hex": "#e6e9ef",
                  "rgb": {
                      "r": 230,
                      "g": 233,
                      "b": 239
                  },
                  "hsl": {
                      "h": 220.00000000000006,
                      "s": 0.21951219512195116,
                      "l": 0.919607843137255
                  },
                  "oklch": {
                      "l": 0.9334593324109276,
                      "c": 0.00871379906203183,
                      "h": 264.52060223534073
                  },
                  "accent": false
              },
              "crust": {
                  "name": "Crust",
                  "order": 25,
                  "hex": "#dce0e8",
                  "rgb": {
                      "r": 220,
                      "g": 224,
                      "b": 232
                  },
                  "hsl": {
                      "h": 220.00000000000006,
                      "s": 0.20689655172413762,
                      "l": 0.8862745098039215
                  },
                  "oklch": {
                      "l": 0.905964995559709,
                      "c": 0.011716507677813338,
                      "h": 264.50710516682375
                  },
                  "accent": false
              }
          },
          "ansiColors": {
              "black": {
                  "name": "Black",
                  "order": 0,
                  "normal": {
                      "name": "Black",
                      "hex": "#5c5f77",
                      "rgb": {
                          "r": 92,
                          "g": 95,
                          "b": 119
                      },
                      "hsl": {
                          "h": 233.33333333333334,
                          "s": 0.1279620853080569,
                          "l": 0.4137254901960784
                      },
                      "oklch": {
                          "l": 0.4920027877673451,
                          "c": 0.038490502533791375,
                          "h": 279.299160578886
                      },
                      "code": 0
                  },
                  "bright": {
                      "name": "Bright Black",
                      "hex": "#6c6f85",
                      "rgb": {
                          "r": 108,
                          "g": 111,
                          "b": 133
                      },
                      "hsl": {
                          "h": 232.79999999999998,
                          "s": 0.10373443983402494,
                          "l": 0.4725490196078431
                      },
                      "oklch": {
                          "l": 0.5470776379676476,
                          "c": 0.034342788375285344,
                          "h": 279.0836971153176
                      },
                      "code": 8
                  }
              },
              "red": {
                  "name": "Red",
                  "order": 1,
                  "normal": {
                      "name": "Red",
                      "hex": "#d20f39",
                      "rgb": {
                          "r": 210,
                          "g": 15,
                          "b": 57
                      },
                      "hsl": {
                          "h": 347.0769230769231,
                          "s": 0.8666666666666666,
                          "l": 0.4411764705882353
                      },
                      "oklch": {
                          "l": 0.5504744142539229,
                          "c": 0.21551430760195764,
                          "h": 19.809464044160393
                      },
                      "code": 1
                  },
                  "bright": {
                      "name": "Bright Red",
                      "hex": "#de293e",
                      "rgb": {
                          "r": 222,
                          "g": 41,
                          "b": 62
                      },
                      "hsl": {
                          "h": 353.0386740331492,
                          "s": 0.7327935222672065,
                          "l": 0.515686274509804
                      },
                      "oklch": {
                          "l": 0.5851016605590609,
                          "c": 0.2127118759940762,
                          "h": 21.74179370451583
                      },
                      "code": 9
                  }
              },
              "green": {
                  "name": "Green",
                  "order": 2,
                  "normal": {
                      "name": "Green",
                      "hex": "#40a02b",
                      "rgb": {
                          "r": 64,
                          "g": 160,
                          "b": 43
                      },
                      "hsl": {
                          "h": 109.23076923076923,
                          "s": 0.5763546798029556,
                          "l": 0.39803921568627454
                      },
                      "oklch": {
                          "l": 0.6250443904295363,
                          "c": 0.17715816108762134,
                          "h": 140.44483759142634
                      },
                      "code": 2
                  },
                  "bright": {
                      "name": "Bright Green",
                      "hex": "#49af3d",
                      "rgb": {
                          "r": 73,
                          "g": 175,
                          "b": 61
                      },
                      "hsl": {
                          "h": 113.68421052631581,
                          "s": 0.48305084745762705,
                          "l": 0.4627450980392157
                      },
                      "oklch": {
                          "l": 0.6698469705486776,
                          "c": 0.17928615242745732,
                          "h": 141.59851848453542
                      },
                      "code": 10
                  }
              },
              "yellow": {
                  "name": "Yellow",
                  "order": 3,
                  "normal": {
                      "name": "Yellow",
                      "hex": "#df8e1d",
                      "rgb": {
                          "r": 223,
                          "g": 142,
                          "b": 29
                      },
                      "hsl": {
                          "h": 34.948453608247426,
                          "s": 0.7698412698412698,
                          "l": 0.49411764705882355
                      },
                      "oklch": {
                          "l": 0.7139917309504697,
                          "c": 0.14944164080684152,
                          "h": 67.77665534753208
                      },
                      "code": 3
                  },
                  "bright": {
                      "name": "Bright Yellow",
                      "hex": "#eea02d",
                      "rgb": {
                          "r": 238,
                          "g": 160,
                          "b": 45
                      },
                      "hsl": {
                          "h": 35.751295336787564,
                          "s": 0.8502202643171807,
                          "l": 0.5549019607843138
                      },
                      "oklch": {
                          "l": 0.7645858699860659,
                          "c": 0.1514923972600861,
                          "h": 70.84714818002743
                      },
                      "code": 11
                  }
              },
              "blue": {
                  "name": "Blue",
                  "order": 4,
                  "normal": {
                      "name": "Blue",
                      "hex": "#1e66f5",
                      "rgb": {
                          "r": 30,
                          "g": 102,
                          "b": 245
                      },
                      "hsl": {
                          "h": 219.90697674418607,
                          "s": 0.9148936170212768,
                          "l": 0.5392156862745098
                      },
                      "oklch": {
                          "l": 0.5586168519157438,
                          "c": 0.22550252265688878,
                          "h": 262.08665056049813
                      },
                      "code": 4
                  },
                  "bright": {
                      "name": "Bright Blue",
                      "hex": "#456eff",
                      "rgb": {
                          "r": 69,
                          "g": 110,
                          "b": 255
                      },
                      "hsl": {
                          "h": 226.77419354838707,
                          "s": 1,
                          "l": 0.6352941176470588
                      },
                      "oklch": {
                          "l": 0.5950039604688844,
                          "c": 0.2210327623285269,
                          "h": 267.30927997425636
                      },
                      "code": 12
                  }
              },
              "magenta": {
                  "name": "Magenta",
                  "order": 5,
                  "normal": {
                      "name": "Magenta",
                      "hex": "#ea76cb",
                      "rgb": {
                          "r": 234,
                          "g": 118,
                          "b": 203
                      },
                      "hsl": {
                          "h": 316.0344827586207,
                          "s": 0.7341772151898731,
                          "l": 0.6901960784313725
                      },
                      "oklch": {
                          "l": 0.7255597313429507,
                          "c": 0.17393264562602528,
                          "h": 338.4333428586893
                      },
                      "code": 5
                  },
                  "bright": {
                      "name": "Bright Magenta",
                      "hex": "#fe85d8",
                      "rgb": {
                          "r": 254,
                          "g": 133,
                          "b": 216
                      },
                      "hsl": {
                          "h": 318.8429752066116,
                          "s": 0.983739837398374,
                          "l": 0.7588235294117647
                      },
                      "oklch": {
                          "l": 0.7763650410770642,
                          "c": 0.1745724461980881,
                          "h": 340.3388720937725
                      },
                      "code": 13
                  }
              },
              "cyan": {
                  "name": "Cyan",
                  "order": 6,
                  "normal": {
                      "name": "Cyan",
                      "hex": "#179299",
                      "rgb": {
                          "r": 23,
                          "g": 146,
                          "b": 153
                      },
                      "hsl": {
                          "h": 183.23076923076923,
                          "s": 0.7386363636363636,
                          "l": 0.34509803921568627
                      },
                      "oklch": {
                          "l": 0.6022689684480229,
                          "c": 0.09811495789237053,
                          "h": 201.1047483772147
                      },
                      "code": 6
                  },
                  "bright": {
                      "name": "Bright Cyan",
                      "hex": "#2d9fa8",
                      "rgb": {
                          "r": 45,
                          "g": 159,
                          "b": 168
                      },
                      "hsl": {
                          "h": 184.39024390243904,
                          "s": 0.5774647887323943,
                          "l": 0.4176470588235294
                      },
                      "oklch": {
                          "l": 0.6450436398455724,
                          "c": 0.09825512577461509,
                          "h": 202.85528917380952
                      },
                      "code": 14
                  }
              },
              "white": {
                  "name": "White",
                  "order": 7,
                  "normal": {
                      "name": "White",
                      "hex": "#acb0be",
                      "rgb": {
                          "r": 172,
                          "g": 176,
                          "b": 190
                      },
                      "hsl": {
                          "h": 226.6666666666667,
                          "s": 0.12162162162162159,
                          "l": 0.7098039215686275
                      },
                      "oklch": {
                          "l": 0.7583943521589962,
                          "c": 0.020453440241571547,
                          "h": 273.1535522460353
                      },
                      "code": 7
                  },
                  "bright": {
                      "name": "Bright White",
                      "hex": "#bcc0cc",
                      "rgb": {
                          "r": 188,
                          "g": 192,
                          "b": 204
                      },
                      "hsl": {
                          "h": 225.00000000000003,
                          "s": 0.13559322033898308,
                          "l": 0.7686274509803922
                      },
                      "oklch": {
                          "l": 0.8083070110182754,
                          "c": 0.01739330880861526,
                          "h": 271.1981554317899
                      },
                      "code": 15
                  }
              }
          }
      },
      "frappe": {
          "name": "Frappé",
          "emoji": "🪴",
          "order": 1,
          "dark": true,
          "colors": {
              "rosewater": {
                  "name": "Rosewater",
                  "order": 0,
                  "hex": "#f2d5cf",
                  "rgb": {
                      "r": 242,
                      "g": 213,
                      "b": 207
                  },
                  "hsl": {
                      "h": 10.2857142857143,
                      "s": 0.5737704918032784,
                      "l": 0.8803921568627451
                  },
                  "oklch": {
                      "l": 0.8954521063112798,
                      "c": 0.03354879422590268,
                      "h": 31.599559788706813
                  },
                  "accent": true
              },
              "flamingo": {
                  "name": "Flamingo",
                  "order": 1,
                  "hex": "#eebebe",
                  "rgb": {
                      "r": 238,
                      "g": 190,
                      "b": 190
                  },
                  "hsl": {
                      "h": 0,
                      "s": 0.5853658536585367,
                      "l": 0.8392156862745098
                  },
                  "oklch": {
                      "l": 0.8439398206825613,
                      "c": 0.055308872078461885,
                      "h": 18.30664847438885
                  },
                  "accent": true
              },
              "pink": {
                  "name": "Pink",
                  "order": 2,
                  "hex": "#f4b8e4",
                  "rgb": {
                      "r": 244,
                      "g": 184,
                      "b": 228
                  },
                  "hsl": {
                      "h": 316,
                      "s": 0.7317073170731713,
                      "l": 0.8392156862745098
                  },
                  "oklch": {
                      "l": 0.8503687095114205,
                      "c": 0.08924205653299735,
                      "h": 336.2633054560008
                  },
                  "accent": true
              },
              "mauve": {
                  "name": "Mauve",
                  "order": 3,
                  "hex": "#ca9ee6",
                  "rgb": {
                      "r": 202,
                      "g": 158,
                      "b": 230
                  },
                  "hsl": {
                      "h": 276.66666666666663,
                      "s": 0.5901639344262294,
                      "l": 0.7607843137254902
                  },
                  "oklch": {
                      "l": 0.7647530497131694,
                      "c": 0.11077097472095544,
                      "h": 311.7436047203909
                  },
                  "accent": true
              },
              "red": {
                  "name": "Red",
                  "order": 4,
                  "hex": "#e78284",
                  "rgb": {
                      "r": 231,
                      "g": 130,
                      "b": 132
                  },
                  "hsl": {
                      "h": 358.8118811881188,
                      "s": 0.6778523489932885,
                      "l": 0.7078431372549019
                  },
                  "oklch": {
                      "l": 0.7170987221827118,
                      "c": 0.12436813455187178,
                      "h": 19.385905224426494
                  },
                  "accent": true
              },
              "maroon": {
                  "name": "Maroon",
                  "order": 5,
                  "hex": "#ea999c",
                  "rgb": {
                      "r": 234,
                      "g": 153,
                      "b": 156
                  },
                  "hsl": {
                      "h": 357.77777777777777,
                      "s": 0.6585365853658534,
                      "l": 0.7588235294117647
                  },
                  "oklch": {
                      "l": 0.7646391705871649,
                      "c": 0.09755979410903914,
                      "h": 17.177051946309064
                  },
                  "accent": true
              },
              "peach": {
                  "name": "Peach",
                  "order": 6,
                  "hex": "#ef9f76",
                  "rgb": {
                      "r": 239,
                      "g": 159,
                      "b": 118
                  },
                  "hsl": {
                      "h": 20.33057851239669,
                      "s": 0.7908496732026143,
                      "l": 0.7
                  },
                  "oklch": {
                      "l": 0.7727223424880441,
                      "c": 0.11057154322068624,
                      "h": 47.72638197276791
                  },
                  "accent": true
              },
              "yellow": {
                  "name": "Yellow",
                  "order": 7,
                  "hex": "#e5c890",
                  "rgb": {
                      "r": 229,
                      "g": 200,
                      "b": 144
                  },
                  "hsl": {
                      "h": 39.52941176470588,
                      "s": 0.6204379562043796,
                      "l": 0.7313725490196079
                  },
                  "oklch": {
                      "l": 0.8443164755548738,
                      "c": 0.07954344021788197,
                      "h": 83.47165006341226
                  },
                  "accent": true
              },
              "green": {
                  "name": "Green",
                  "order": 8,
                  "hex": "#a6d189",
                  "rgb": {
                      "r": 166,
                      "g": 209,
                      "b": 137
                  },
                  "hsl": {
                      "h": 95.83333333333331,
                      "s": 0.4390243902439024,
                      "l": 0.6784313725490196
                  },
                  "oklch": {
                      "l": 0.8123739062207741,
                      "c": 0.10706091888011615,
                      "h": 133.3919208933964
                  },
                  "accent": true
              },
              "teal": {
                  "name": "Teal",
                  "order": 9,
                  "hex": "#81c8be",
                  "rgb": {
                      "r": 129,
                      "g": 200,
                      "b": 190
                  },
                  "hsl": {
                      "h": 171.5492957746479,
                      "s": 0.3922651933701657,
                      "l": 0.6450980392156862
                  },
                  "oklch": {
                      "l": 0.7829803045651632,
                      "c": 0.07296064976718789,
                      "h": 184.64497275512372
                  },
                  "accent": true
              },
              "sky": {
                  "name": "Sky",
                  "order": 10,
                  "hex": "#99d1db",
                  "rgb": {
                      "r": 153,
                      "g": 209,
                      "b": 219
                  },
                  "hsl": {
                      "h": 189.09090909090907,
                      "s": 0.47826086956521735,
                      "l": 0.7294117647058823
                  },
                  "oklch": {
                      "l": 0.8255022028154195,
                      "c": 0.059159987893492826,
                      "h": 209.75611106861479
                  },
                  "accent": true
              },
              "sapphire": {
                  "name": "Sapphire",
                  "order": 11,
                  "hex": "#85c1dc",
                  "rgb": {
                      "r": 133,
                      "g": 193,
                      "b": 220
                  },
                  "hsl": {
                      "h": 198.62068965517244,
                      "s": 0.5541401273885351,
                      "l": 0.692156862745098
                  },
                  "oklch": {
                      "l": 0.7795534342225096,
                      "c": 0.07267540614929018,
                      "h": 227.87968935766042
                  },
                  "accent": true
              },
              "blue": {
                  "name": "Blue",
                  "order": 12,
                  "hex": "#8caaee",
                  "rgb": {
                      "r": 140,
                      "g": 170,
                      "b": 238
                  },
                  "hsl": {
                      "h": 221.6326530612245,
                      "s": 0.7424242424242424,
                      "l": 0.7411764705882353
                  },
                  "oklch": {
                      "l": 0.7420101171888788,
                      "c": 0.10444355128774586,
                      "h": 265.6631926560932
                  },
                  "accent": true
              },
              "lavender": {
                  "name": "Lavender",
                  "order": 13,
                  "hex": "#babbf1",
                  "rgb": {
                      "r": 186,
                      "g": 187,
                      "b": 241
                  },
                  "hsl": {
                      "h": 238.90909090909093,
                      "s": 0.6626506024096385,
                      "l": 0.8372549019607842
                  },
                  "oklch": {
                      "l": 0.809899271286186,
                      "c": 0.0758827742129732,
                      "h": 283.7404935833554
                  },
                  "accent": true
              },
              "text": {
                  "name": "Text",
                  "order": 14,
                  "hex": "#c6d0f5",
                  "rgb": {
                      "r": 198,
                      "g": 208,
                      "b": 245
                  },
                  "hsl": {
                      "h": 227.2340425531915,
                      "s": 0.7014925373134333,
                      "l": 0.8686274509803922
                  },
                  "oklch": {
                      "l": 0.8619159037222056,
                      "c": 0.05255329213917172,
                      "h": 273.34736107719544
                  },
                  "accent": false
              },
              "subtext1": {
                  "name": "Subtext 1",
                  "order": 15,
                  "hex": "#b5bfe2",
                  "rgb": {
                      "r": 181,
                      "g": 191,
                      "b": 226
                  },
                  "hsl": {
                      "h": 226.66666666666669,
                      "s": 0.43689320388349495,
                      "l": 0.7980392156862746
                  },
                  "oklch": {
                      "l": 0.808435081185243,
                      "c": 0.05066982227484447,
                      "h": 272.677974625096
                  },
                  "accent": false
              },
              "subtext0": {
                  "name": "Subtext 0",
                  "order": 16,
                  "hex": "#a5adce",
                  "rgb": {
                      "r": 165,
                      "g": 173,
                      "b": 206
                  },
                  "hsl": {
                      "h": 228.29268292682926,
                      "s": 0.2949640287769784,
                      "l": 0.7274509803921569
                  },
                  "oklch": {
                      "l": 0.7523838177085279,
                      "c": 0.0482828906614922,
                      "h": 274.47259293675626
                  },
                  "accent": false
              },
              "overlay2": {
                  "name": "Overlay 2",
                  "order": 17,
                  "hex": "#949cbb",
                  "rgb": {
                      "r": 148,
                      "g": 156,
                      "b": 187
                  },
                  "hsl": {
                      "h": 227.69230769230768,
                      "s": 0.22285714285714275,
                      "l": 0.6568627450980392
                  },
                  "oklch": {
                      "l": 0.6969741545288725,
                      "c": 0.04636983219122424,
                      "h": 273.7769117853428
                  },
                  "accent": false
              },
              "overlay1": {
                  "name": "Overlay 1",
                  "order": 18,
                  "hex": "#838ba7",
                  "rgb": {
                      "r": 131,
                      "g": 139,
                      "b": 167
                  },
                  "hsl": {
                      "h": 226.66666666666669,
                      "s": 0.16981132075471703,
                      "l": 0.584313725490196
                  },
                  "oklch": {
                      "l": 0.6400554586080385,
                      "c": 0.04300015035444563,
                      "h": 272.61370125840324
                  },
                  "accent": false
              },
              "overlay0": {
                  "name": "Overlay 0",
                  "order": 19,
                  "hex": "#737994",
                  "rgb": {
                      "r": 115,
                      "g": 121,
                      "b": 148
                  },
                  "hsl": {
                      "h": 229.0909090909091,
                      "s": 0.13360323886639683,
                      "l": 0.515686274509804
                  },
                  "oklch": {
                      "l": 0.5808544233961552,
                      "c": 0.04205242988335905,
                      "h": 275.1981828283078
                  },
                  "accent": false
              },
              "surface2": {
                  "name": "Surface 2",
                  "order": 20,
                  "hex": "#626880",
                  "rgb": {
                      "r": 98,
                      "g": 104,
                      "b": 128
                  },
                  "hsl": {
                      "h": 228.00000000000003,
                      "s": 0.1327433628318584,
                      "l": 0.44313725490196076
                  },
                  "oklch": {
                      "l": 0.5211171663617943,
                      "c": 0.03858957890599293,
                      "h": 273.9992016671519
                  },
                  "accent": false
              },
              "surface1": {
                  "name": "Surface 1",
                  "order": 21,
                  "hex": "#51576d",
                  "rgb": {
                      "r": 81,
                      "g": 87,
                      "b": 109
                  },
                  "hsl": {
                      "h": 227.14285714285714,
                      "s": 0.14736842105263157,
                      "l": 0.37254901960784315
                  },
                  "oklch": {
                      "l": 0.46005660421566386,
                      "c": 0.03666144991754971,
                      "h": 272.9657987360858
                  },
                  "accent": false
              },
              "surface0": {
                  "name": "Surface 0",
                  "order": 22,
                  "hex": "#414559",
                  "rgb": {
                      "r": 65,
                      "g": 69,
                      "b": 89
                  },
                  "hsl": {
                      "h": 230.00000000000003,
                      "s": 0.15584415584415584,
                      "l": 0.30196078431372547
                  },
                  "oklch": {
                      "l": 0.39491884471449196,
                      "c": 0.0342392761201927,
                      "h": 275.8999274586916
                  },
                  "accent": false
              },
              "base": {
                  "name": "Base",
                  "order": 23,
                  "hex": "#303446",
                  "rgb": {
                      "r": 48,
                      "g": 52,
                      "b": 70
                  },
                  "hsl": {
                      "h": 229.0909090909091,
                      "s": 0.18644067796610175,
                      "l": 0.23137254901960785
                  },
                  "oklch": {
                      "l": 0.3290740019408592,
                      "c": 0.032391310923960054,
                      "h": 274.75804633082976
                  },
                  "accent": false
              },
              "mantle": {
                  "name": "Mantle",
                  "order": 24,
                  "hex": "#292c3c",
                  "rgb": {
                      "r": 41,
                      "g": 44,
                      "b": 60
                  },
                  "hsl": {
                      "h": 230.52631578947367,
                      "s": 0.18811881188118806,
                      "l": 0.19803921568627453
                  },
                  "oklch": {
                      "l": 0.29734161780455115,
                      "c": 0.02937840533895502,
                      "h": 276.2143947434498
                  },
                  "accent": false
              },
              "crust": {
                  "name": "Crust",
                  "order": 25,
                  "hex": "#232634",
                  "rgb": {
                      "r": 35,
                      "g": 38,
                      "b": 52
                  },
                  "hsl": {
                      "h": 229.41176470588238,
                      "s": 0.19540229885057467,
                      "l": 0.17058823529411765
                  },
                  "oklch": {
                      "l": 0.2720018849839785,
                      "c": 0.02638666944332517,
                      "h": 275.1154048191657
                  },
                  "accent": false
              }
          },
          "ansiColors": {
              "black": {
                  "name": "Black",
                  "order": 0,
                  "normal": {
                      "name": "Black",
                      "hex": "#51576d",
                      "rgb": {
                          "r": 81,
                          "g": 87,
                          "b": 109
                      },
                      "hsl": {
                          "h": 227.14285714285714,
                          "s": 0.14736842105263157,
                          "l": 0.37254901960784315
                      },
                      "oklch": {
                          "l": 0.46005660421566386,
                          "c": 0.03666144991754971,
                          "h": 272.9657987360858
                      },
                      "code": 0
                  },
                  "bright": {
                      "name": "Bright Black",
                      "hex": "#626880",
                      "rgb": {
                          "r": 98,
                          "g": 104,
                          "b": 128
                      },
                      "hsl": {
                          "h": 228.00000000000003,
                          "s": 0.1327433628318584,
                          "l": 0.44313725490196076
                      },
                      "oklch": {
                          "l": 0.5211171663617943,
                          "c": 0.03858957890599293,
                          "h": 273.9992016671519
                      },
                      "code": 8
                  }
              },
              "red": {
                  "name": "Red",
                  "order": 1,
                  "normal": {
                      "name": "Red",
                      "hex": "#e78284",
                      "rgb": {
                          "r": 231,
                          "g": 130,
                          "b": 132
                      },
                      "hsl": {
                          "h": 358.8118811881188,
                          "s": 0.6778523489932885,
                          "l": 0.7078431372549019
                      },
                      "oklch": {
                          "l": 0.7170987221827118,
                          "c": 0.12436813455187178,
                          "h": 19.385905224426494
                      },
                      "code": 1
                  },
                  "bright": {
                      "name": "Bright Red",
                      "hex": "#e67172",
                      "rgb": {
                          "r": 230,
                          "g": 113,
                          "b": 114
                      },
                      "hsl": {
                          "h": 359.4871794871795,
                          "s": 0.7005988023952096,
                          "l": 0.6725490196078432
                      },
                      "oklch": {
                          "l": 0.6847864369537,
                          "c": 0.14569740231177408,
                          "h": 20.884497376350453
                      },
                      "code": 9
                  }
              },
              "green": {
                  "name": "Green",
                  "order": 2,
                  "normal": {
                      "name": "Green",
                      "hex": "#a6d189",
                      "rgb": {
                          "r": 166,
                          "g": 209,
                          "b": 137
                      },
                      "hsl": {
                          "h": 95.83333333333331,
                          "s": 0.4390243902439024,
                          "l": 0.6784313725490196
                      },
                      "oklch": {
                          "l": 0.8123739062207741,
                          "c": 0.10706091888011615,
                          "h": 133.3919208933964
                      },
                      "code": 2
                  },
                  "bright": {
                      "name": "Bright Green",
                      "hex": "#8ec772",
                      "rgb": {
                          "r": 142,
                          "g": 199,
                          "b": 114
                      },
                      "hsl": {
                          "h": 100.23529411764706,
                          "s": 0.431472081218274,
                          "l": 0.6137254901960785
                      },
                      "oklch": {
                          "l": 0.7691274525920667,
                          "c": 0.12860090489376133,
                          "h": 135.82263156334375
                      },
                      "code": 10
                  }
              },
              "yellow": {
                  "name": "Yellow",
                  "order": 3,
                  "normal": {
                      "name": "Yellow",
                      "hex": "#e5c890",
                      "rgb": {
                          "r": 229,
                          "g": 200,
                          "b": 144
                      },
                      "hsl": {
                          "h": 39.52941176470588,
                          "s": 0.6204379562043796,
                          "l": 0.7313725490196079
                      },
                      "oklch": {
                          "l": 0.8443164755548738,
                          "c": 0.07954344021788197,
                          "h": 83.47165006341226
                      },
                      "code": 3
                  },
                  "bright": {
                      "name": "Bright Yellow",
                      "hex": "#d9ba73",
                      "rgb": {
                          "r": 217,
                          "g": 186,
                          "b": 115
                      },
                      "hsl": {
                          "h": 41.764705882352935,
                          "s": 0.5730337078651685,
                          "l": 0.6509803921568628
                      },
                      "oklch": {
                          "l": 0.8012176676303334,
                          "c": 0.09668632119827153,
                          "h": 86.79242257830037
                      },
                      "code": 11
                  }
              },
              "blue": {
                  "name": "Blue",
                  "order": 4,
                  "normal": {
                      "name": "Blue",
                      "hex": "#8caaee",
                      "rgb": {
                          "r": 140,
                          "g": 170,
                          "b": 238
                      },
                      "hsl": {
                          "h": 221.6326530612245,
                          "s": 0.7424242424242424,
                          "l": 0.7411764705882353
                      },
                      "oklch": {
                          "l": 0.7420101171888788,
                          "c": 0.10444355128774586,
                          "h": 265.6631926560932
                      },
                      "code": 4
                  },
                  "bright": {
                      "name": "Bright Blue",
                      "hex": "#7b9ef0",
                      "rgb": {
                          "r": 123,
                          "g": 158,
                          "b": 240
                      },
                      "hsl": {
                          "h": 222.05128205128207,
                          "s": 0.7959183673469388,
                          "l": 0.711764705882353
                      },
                      "oklch": {
                          "l": 0.708313326481911,
                          "c": 0.12709001896855227,
                          "h": 265.5701385899763
                      },
                      "code": 12
                  }
              },
              "magenta": {
                  "name": "Magenta",
                  "order": 5,
                  "normal": {
                      "name": "Magenta",
                      "hex": "#f4b8e4",
                      "rgb": {
                          "r": 244,
                          "g": 184,
                          "b": 228
                      },
                      "hsl": {
                          "h": 316,
                          "s": 0.7317073170731713,
                          "l": 0.8392156862745098
                      },
                      "oklch": {
                          "l": 0.8503687095114205,
                          "c": 0.08924205653299735,
                          "h": 336.2633054560008
                      },
                      "code": 5
                  },
                  "bright": {
                      "name": "Bright Magenta",
                      "hex": "#f2a4db",
                      "rgb": {
                          "r": 242,
                          "g": 164,
                          "b": 219
                      },
                      "hsl": {
                          "h": 317.6923076923077,
                          "s": 0.7499999999999998,
                          "l": 0.7960784313725491
                      },
                      "oklch": {
                          "l": 0.811252788366002,
                          "c": 0.1136535219958786,
                          "h": 338.1840863673275
                      },
                      "code": 13
                  }
              },
              "cyan": {
                  "name": "Cyan",
                  "order": 6,
                  "normal": {
                      "name": "Cyan",
                      "hex": "#81c8be",
                      "rgb": {
                          "r": 129,
                          "g": 200,
                          "b": 190
                      },
                      "hsl": {
                          "h": 171.5492957746479,
                          "s": 0.3922651933701657,
                          "l": 0.6450980392156862
                      },
                      "oklch": {
                          "l": 0.7829803045651632,
                          "c": 0.07296064976718789,
                          "h": 184.64497275512372
                      },
                      "code": 6
                  },
                  "bright": {
                      "name": "Bright Cyan",
                      "hex": "#5abfb5",
                      "rgb": {
                          "r": 90,
                          "g": 191,
                          "b": 181
                      },
                      "hsl": {
                          "h": 174.05940594059405,
                          "s": 0.44104803493449785,
                          "l": 0.5509803921568628
                      },
                      "oklch": {
                          "l": 0.7416297495642946,
                          "c": 0.09587368197181634,
                          "h": 186.55018355066426
                      },
                      "code": 14
                  }
              },
              "white": {
                  "name": "White",
                  "order": 7,
                  "normal": {
                      "name": "White",
                      "hex": "#a5adce",
                      "rgb": {
                          "r": 165,
                          "g": 173,
                          "b": 206
                      },
                      "hsl": {
                          "h": 228.29268292682926,
                          "s": 0.2949640287769784,
                          "l": 0.7274509803921569
                      },
                      "oklch": {
                          "l": 0.7523838177085279,
                          "c": 0.0482828906614922,
                          "h": 274.47259293675626
                      },
                      "code": 7
                  },
                  "bright": {
                      "name": "Bright White",
                      "hex": "#b5bfe2",
                      "rgb": {
                          "r": 181,
                          "g": 191,
                          "b": 226
                      },
                      "hsl": {
                          "h": 226.66666666666669,
                          "s": 0.43689320388349495,
                          "l": 0.7980392156862746
                      },
                      "oklch": {
                          "l": 0.808435081185243,
                          "c": 0.05066982227484447,
                          "h": 272.677974625096
                      },
                      "code": 15
                  }
              }
          }
      },
      "macchiato": {
          "name": "Macchiato",
          "emoji": "🌺",
          "order": 2,
          "dark": true,
          "colors": {
              "rosewater": {
                  "name": "Rosewater",
                  "order": 0,
                  "hex": "#f4dbd6",
                  "rgb": {
                      "r": 244,
                      "g": 219,
                      "b": 214
                  },
                  "hsl": {
                      "h": 9.999999999999963,
                      "s": 0.5769230769230775,
                      "l": 0.8980392156862745
                  },
                  "oklch": {
                      "l": 0.9105206834324908,
                      "c": 0.028643502421314793,
                      "h": 31.132554974921163
                  },
                  "accent": true
              },
              "flamingo": {
                  "name": "Flamingo",
                  "order": 1,
                  "hex": "#f0c6c6",
                  "rgb": {
                      "r": 240,
                      "g": 198,
                      "b": 198
                  },
                  "hsl": {
                      "h": 0,
                      "s": 0.5833333333333333,
                      "l": 0.8588235294117648
                  },
                  "oklch": {
                      "l": 0.8628787473200895,
                      "c": 0.0478940487275183,
                      "h": 18.12031084594571
                  },
                  "accent": true
              },
              "pink": {
                  "name": "Pink",
                  "order": 2,
                  "hex": "#f5bde6",
                  "rgb": {
                      "r": 245,
                      "g": 189,
                      "b": 230
                  },
                  "hsl": {
                      "h": 316.0714285714286,
                      "s": 0.7368421052631583,
                      "l": 0.8509803921568628
                  },
                  "oklch": {
                      "l": 0.8608041132344519,
                      "c": 0.08302750894629703,
                      "h": 336.1798930360514
                  },
                  "accent": true
              },
              "mauve": {
                  "name": "Mauve",
                  "order": 3,
                  "hex": "#c6a0f6",
                  "rgb": {
                      "r": 198,
                      "g": 160,
                      "b": 246
                  },
                  "hsl": {
                      "h": 266.51162790697674,
                      "s": 0.8269230769230772,
                      "l": 0.7960784313725491
                  },
                  "oklch": {
                      "l": 0.7715226080326442,
                      "c": 0.12589563475537238,
                      "h": 303.8983945913919
                  },
                  "accent": true
              },
              "red": {
                  "name": "Red",
                  "order": 4,
                  "hex": "#ed8796",
                  "rgb": {
                      "r": 237,
                      "g": 135,
                      "b": 150
                  },
                  "hsl": {
                      "h": 351.1764705882353,
                      "s": 0.7391304347826088,
                      "l": 0.7294117647058824
                  },
                  "oklch": {
                      "l": 0.7369998199535772,
                      "c": 0.12515625744540987,
                      "h": 11.194318367960136
                  },
                  "accent": true
              },
              "maroon": {
                  "name": "Maroon",
                  "order": 5,
                  "hex": "#ee99a0",
                  "rgb": {
                      "r": 238,
                      "g": 153,
                      "b": 160
                  },
                  "hsl": {
                      "h": 355.05882352941177,
                      "s": 0.7142857142857143,
                      "l": 0.7666666666666666
                  },
                  "oklch": {
                      "l": 0.7702321084161985,
                      "c": 0.10236712493806045,
                      "h": 14.370734317026404
                  },
                  "accent": true
              },
              "peach": {
                  "name": "Peach",
                  "order": 6,
                  "hex": "#f5a97f",
                  "rgb": {
                      "r": 245,
                      "g": 169,
                      "b": 127
                  },
                  "hsl": {
                      "h": 21.355932203389827,
                      "s": 0.8550724637681162,
                      "l": 0.7294117647058824
                  },
                  "oklch": {
                      "l": 0.7988230700616009,
                      "c": 0.10605555431677852,
                      "h": 49.637586270904706
                  },
                  "accent": true
              },
              "yellow": {
                  "name": "Yellow",
                  "order": 7,
                  "hex": "#eed49f",
                  "rgb": {
                      "r": 238,
                      "g": 212,
                      "b": 159
                  },
                  "hsl": {
                      "h": 40.253164556962034,
                      "s": 0.6991150442477877,
                      "l": 0.7784313725490196
                  },
                  "oklch": {
                      "l": 0.8789890327288896,
                      "c": 0.0744419390304426,
                      "h": 84.75097618734304
                  },
                  "accent": true
              },
              "green": {
                  "name": "Green",
                  "order": 8,
                  "hex": "#a6da95",
                  "rgb": {
                      "r": 166,
                      "g": 218,
                      "b": 149
                  },
                  "hsl": {
                      "h": 105.21739130434783,
                      "s": 0.4825174825174825,
                      "l": 0.7196078431372549
                  },
                  "oklch": {
                      "l": 0.83498496943401,
                      "c": 0.10790977641295874,
                      "h": 138.15032984729226
                  },
                  "accent": true
              },
              "teal": {
                  "name": "Teal",
                  "order": 9,
                  "hex": "#8bd5ca",
                  "rgb": {
                      "r": 139,
                      "g": 213,
                      "b": 202
                  },
                  "hsl": {
                      "h": 171.08108108108107,
                      "s": 0.46835443037974706,
                      "l": 0.6901960784313725
                  },
                  "oklch": {
                      "l": 0.8213577752485862,
                      "c": 0.07550599534583141,
                      "h": 184.1000281519273
                  },
                  "accent": true
              },
              "sky": {
                  "name": "Sky",
                  "order": 10,
                  "hex": "#91d7e3",
                  "rgb": {
                      "r": 145,
                      "g": 215,
                      "b": 227
                  },
                  "hsl": {
                      "h": 188.78048780487802,
                      "s": 0.5942028985507245,
                      "l": 0.7294117647058823
                  },
                  "oklch": {
                      "l": 0.8369354925722358,
                      "c": 0.07186937944833319,
                      "h": 209.36577404997735
                  },
                  "accent": true
              },
              "sapphire": {
                  "name": "Sapphire",
                  "order": 11,
                  "hex": "#7dc4e4",
                  "rgb": {
                      "r": 125,
                      "g": 196,
                      "b": 228
                  },
                  "hsl": {
                      "h": 198.64077669902912,
                      "s": 0.6560509554140128,
                      "l": 0.692156862745098
                  },
                  "oklch": {
                      "l": 0.7850772061793015,
                      "c": 0.08452088556014221,
                      "h": 228.37797484060187
                  },
                  "accent": true
              },
              "blue": {
                  "name": "Blue",
                  "order": 12,
                  "hex": "#8aadf4",
                  "rgb": {
                      "r": 138,
                      "g": 173,
                      "b": 244
                  },
                  "hsl": {
                      "h": 220.188679245283,
                      "s": 0.8281250000000003,
                      "l": 0.7490196078431373
                  },
                  "oklch": {
                      "l": 0.7497278222544072,
                      "c": 0.11009557584502845,
                      "h": 263.81032920326925
                  },
                  "accent": true
              },
              "lavender": {
                  "name": "Lavender",
                  "order": 13,
                  "hex": "#b7bdf8",
                  "rgb": {
                      "r": 183,
                      "g": 189,
                      "b": 248
                  },
                  "hsl": {
                      "h": 234.46153846153848,
                      "s": 0.8227848101265824,
                      "l": 0.8450980392156863
                  },
                  "oklch": {
                      "l": 0.8143649130003514,
                      "c": 0.08335197207697617,
                      "h": 279.85366741174835
                  },
                  "accent": true
              },
              "text": {
                  "name": "Text",
                  "order": 14,
                  "hex": "#cad3f5",
                  "rgb": {
                      "r": 202,
                      "g": 211,
                      "b": 245
                  },
                  "hsl": {
                      "h": 227.4418604651163,
                      "s": 0.6825396825396831,
                      "l": 0.8764705882352941
                  },
                  "oklch": {
                      "l": 0.8708250855113037,
                      "c": 0.04807752154773134,
                      "h": 273.6650906813544
                  },
                  "accent": false
              },
              "subtext1": {
                  "name": "Subtext 1",
                  "order": 15,
                  "hex": "#b8c0e0",
                  "rgb": {
                      "r": 184,
                      "g": 192,
                      "b": 224
                  },
                  "hsl": {
                      "h": 228,
                      "s": 0.39215686274509803,
                      "l": 0.8
                  },
                  "oklch": {
                      "l": 0.8119771834676274,
                      "c": 0.0459417988044203,
                      "h": 274.2671845519773
                  },
                  "accent": false
              },
              "subtext0": {
                  "name": "Subtext 0",
                  "order": 16,
                  "hex": "#a5adcb",
                  "rgb": {
                      "r": 165,
                      "g": 173,
                      "b": 203
                  },
                  "hsl": {
                      "h": 227.36842105263156,
                      "s": 0.2676056338028167,
                      "l": 0.7215686274509804
                  },
                  "oklch": {
                      "l": 0.7512805402700846,
                      "c": 0.044055856671799086,
                      "h": 273.5326554713311
                  },
                  "accent": false
              },
              "overlay2": {
                  "name": "Overlay 2",
                  "order": 17,
                  "hex": "#939ab7",
                  "rgb": {
                      "r": 147,
                      "g": 154,
                      "b": 183
                  },
                  "hsl": {
                      "h": 228.33333333333331,
                      "s": 0.2000000000000001,
                      "l": 0.6470588235294117
                  },
                  "oklch": {
                      "l": 0.6904882909259856,
                      "c": 0.04333473031418524,
                      "h": 274.53877114095746
                  },
                  "accent": false
              },
              "overlay1": {
                  "name": "Overlay 1",
                  "order": 18,
                  "hex": "#8087a2",
                  "rgb": {
                      "r": 128,
                      "g": 135,
                      "b": 162
                  },
                  "hsl": {
                      "h": 227.6470588235294,
                      "s": 0.1545454545454545,
                      "l": 0.5686274509803921
                  },
                  "oklch": {
                      "l": 0.6271536692008017,
                      "c": 0.041472890534250864,
                      "h": 273.7328248238706
                  },
                  "accent": false
              },
              "overlay0": {
                  "name": "Overlay 0",
                  "order": 19,
                  "hex": "#6e738d",
                  "rgb": {
                      "r": 110,
                      "g": 115,
                      "b": 141
                  },
                  "hsl": {
                      "h": 230.32258064516128,
                      "s": 0.12350597609561753,
                      "l": 0.49215686274509807
                  },
                  "oklch": {
                      "l": 0.5607916124513305,
                      "c": 0.04067153987841284,
                      "h": 276.47475286657203
                  },
                  "accent": false
              },
              "surface2": {
                  "name": "Surface 2",
                  "order": 20,
                  "hex": "#5b6078",
                  "rgb": {
                      "r": 91,
                      "g": 96,
                      "b": 120
                  },
                  "hsl": {
                      "h": 229.65517241379308,
                      "s": 0.13744075829383887,
                      "l": 0.4137254901960784
                  },
                  "oklch": {
                      "l": 0.49385227914892854,
                      "c": 0.038872292496244895,
                      "h": 275.68331564144205
                  },
                  "accent": false
              },
              "surface1": {
                  "name": "Surface 1",
                  "order": 21,
                  "hex": "#494d64",
                  "rgb": {
                      "r": 73,
                      "g": 77,
                      "b": 100
                  },
                  "hsl": {
                      "h": 231.11111111111114,
                      "s": 0.15606936416184972,
                      "l": 0.3392156862745098
                  },
                  "oklch": {
                      "l": 0.42590353818195015,
                      "c": 0.03850857889914222,
                      "h": 276.94767625318656
                  },
                  "accent": false
              },
              "surface0": {
                  "name": "Surface 0",
                  "order": 22,
                  "hex": "#363a4f",
                  "rgb": {
                      "r": 54,
                      "g": 58,
                      "b": 79
                  },
                  "hsl": {
                      "h": 230.4,
                      "s": 0.1879699248120301,
                      "l": 0.2607843137254902
                  },
                  "oklch": {
                      "l": 0.35379036656186486,
                      "c": 0.03694667541124954,
                      "h": 275.98509635448147
                  },
                  "accent": false
              },
              "base": {
                  "name": "Base",
                  "order": 23,
                  "hex": "#24273a",
                  "rgb": {
                      "r": 36,
                      "g": 39,
                      "b": 58
                  },
                  "hsl": {
                      "h": 231.8181818181818,
                      "s": 0.23404255319148934,
                      "l": 0.1843137254901961
                  },
                  "oklch": {
                      "l": 0.27880829786684175,
                      "c": 0.035341158295048546,
                      "h": 276.93681538212826
                  },
                  "accent": false
              },
              "mantle": {
                  "name": "Mantle",
                  "order": 24,
                  "hex": "#1e2030",
                  "rgb": {
                      "r": 30,
                      "g": 32,
                      "b": 48
                  },
                  "hsl": {
                      "h": 233.33333333333334,
                      "s": 0.23076923076923075,
                      "l": 0.15294117647058825
                  },
                  "oklch": {
                      "l": 0.24925076581247296,
                      "c": 0.030480700717862394,
                      "h": 278.43503418733405
                  },
                  "accent": false
              },
              "crust": {
                  "name": "Crust",
                  "order": 25,
                  "hex": "#181926",
                  "rgb": {
                      "r": 24,
                      "g": 25,
                      "b": 38
                  },
                  "hsl": {
                      "h": 235.71428571428572,
                      "s": 0.22580645161290322,
                      "l": 0.12156862745098039
                  },
                  "oklch": {
                      "l": 0.21880556699663556,
                      "c": 0.025457407896893474,
                      "h": 280.65723682308646
                  },
                  "accent": false
              }
          },
          "ansiColors": {
              "black": {
                  "name": "Black",
                  "order": 0,
                  "normal": {
                      "name": "Black",
                      "hex": "#494d64",
                      "rgb": {
                          "r": 73,
                          "g": 77,
                          "b": 100
                      },
                      "hsl": {
                          "h": 231.11111111111114,
                          "s": 0.15606936416184972,
                          "l": 0.3392156862745098
                      },
                      "oklch": {
                          "l": 0.42590353818195015,
                          "c": 0.03850857889914222,
                          "h": 276.94767625318656
                      },
                      "code": 0
                  },
                  "bright": {
                      "name": "Bright Black",
                      "hex": "#5b6078",
                      "rgb": {
                          "r": 91,
                          "g": 96,
                          "b": 120
                      },
                      "hsl": {
                          "h": 229.65517241379308,
                          "s": 0.13744075829383887,
                          "l": 0.4137254901960784
                      },
                      "oklch": {
                          "l": 0.49385227914892854,
                          "c": 0.038872292496244895,
                          "h": 275.68331564144205
                      },
                      "code": 8
                  }
              },
              "red": {
                  "name": "Red",
                  "order": 1,
                  "normal": {
                      "name": "Red",
                      "hex": "#ed8796",
                      "rgb": {
                          "r": 237,
                          "g": 135,
                          "b": 150
                      },
                      "hsl": {
                          "h": 351.1764705882353,
                          "s": 0.7391304347826088,
                          "l": 0.7294117647058824
                      },
                      "oklch": {
                          "l": 0.7369998199535772,
                          "c": 0.12515625744540987,
                          "h": 11.194318367960136
                      },
                      "code": 1
                  },
                  "bright": {
                      "name": "Bright Red",
                      "hex": "#ec7486",
                      "rgb": {
                          "r": 236,
                          "g": 116,
                          "b": 134
                      },
                      "hsl": {
                          "h": 351,
                          "s": 0.759493670886076,
                          "l": 0.6901960784313725
                      },
                      "oklch": {
                          "l": 0.7038748505165371,
                          "c": 0.14823674019755922,
                          "h": 12.744597066695633
                      },
                      "code": 9
                  }
              },
              "green": {
                  "name": "Green",
                  "order": 2,
                  "normal": {
                      "name": "Green",
                      "hex": "#a6da95",
                      "rgb": {
                          "r": 166,
                          "g": 218,
                          "b": 149
                      },
                      "hsl": {
                          "h": 105.21739130434783,
                          "s": 0.4825174825174825,
                          "l": 0.7196078431372549
                      },
                      "oklch": {
                          "l": 0.83498496943401,
                          "c": 0.10790977641295874,
                          "h": 138.15032984729226
                      },
                      "code": 2
                  },
                  "bright": {
                      "name": "Bright Green",
                      "hex": "#8ccf7f",
                      "rgb": {
                          "r": 140,
                          "g": 207,
                          "b": 127
                      },
                      "hsl": {
                          "h": 110.24999999999999,
                          "s": 0.45454545454545453,
                          "l": 0.6549019607843137
                      },
                      "oklch": {
                          "l": 0.7902284425235074,
                          "c": 0.12976592850489116,
                          "h": 140.3670401931882
                      },
                      "code": 10
                  }
              },
              "yellow": {
                  "name": "Yellow",
                  "order": 3,
                  "normal": {
                      "name": "Yellow",
                      "hex": "#eed49f",
                      "rgb": {
                          "r": 238,
                          "g": 212,
                          "b": 159
                      },
                      "hsl": {
                          "h": 40.253164556962034,
                          "s": 0.6991150442477877,
                          "l": 0.7784313725490196
                      },
                      "oklch": {
                          "l": 0.8789890327288896,
                          "c": 0.0744419390304426,
                          "h": 84.75097618734304
                      },
                      "code": 3
                  },
                  "bright": {
                      "name": "Bright Yellow",
                      "hex": "#e1c682",
                      "rgb": {
                          "r": 225,
                          "g": 198,
                          "b": 130
                      },
                      "hsl": {
                          "h": 42.94736842105264,
                          "s": 0.6129032258064515,
                          "l": 0.696078431372549
                      },
                      "oklch": {
                          "l": 0.8337291856046483,
                          "c": 0.09217507435336263,
                          "h": 88.08738541313335
                      },
                      "code": 11
                  }
              },
              "blue": {
                  "name": "Blue",
                  "order": 4,
                  "normal": {
                      "name": "Blue",
                      "hex": "#8aadf4",
                      "rgb": {
                          "r": 138,
                          "g": 173,
                          "b": 244
                      },
                      "hsl": {
                          "h": 220.188679245283,
                          "s": 0.8281250000000003,
                          "l": 0.7490196078431373
                      },
                      "oklch": {
                          "l": 0.7497278222544072,
                          "c": 0.11009557584502845,
                          "h": 263.81032920326925
                      },
                      "code": 4
                  },
                  "bright": {
                      "name": "Bright Blue",
                      "hex": "#78a1f6",
                      "rgb": {
                          "r": 120,
                          "g": 161,
                          "b": 246
                      },
                      "hsl": {
                          "h": 220.47619047619048,
                          "s": 0.8750000000000002,
                          "l": 0.7176470588235294
                      },
                      "oklch": {
                          "l": 0.7155487456704475,
                          "c": 0.13299725961930478,
                          "h": 263.6557594827569
                      },
                      "code": 12
                  }
              },
              "magenta": {
                  "name": "Magenta",
                  "order": 5,
                  "normal": {
                      "name": "Magenta",
                      "hex": "#f5bde6",
                      "rgb": {
                          "r": 245,
                          "g": 189,
                          "b": 230
                      },
                      "hsl": {
                          "h": 316.0714285714286,
                          "s": 0.7368421052631583,
                          "l": 0.8509803921568628
                      },
                      "oklch": {
                          "l": 0.8608041132344519,
                          "c": 0.08302750894629703,
                          "h": 336.1798930360514
                      },
                      "code": 5
                  },
                  "bright": {
                      "name": "Bright Magenta",
                      "hex": "#f2a9dd",
                      "rgb": {
                          "r": 242,
                          "g": 169,
                          "b": 221
                      },
                      "hsl": {
                          "h": 317.26027397260276,
                          "s": 0.7373737373737372,
                          "l": 0.8058823529411765
                      },
                      "oklch": {
                          "l": 0.8209986065798357,
                          "c": 0.10734316823199659,
                          "h": 338.0967569569639
                      },
                      "code": 13
                  }
              },
              "cyan": {
                  "name": "Cyan",
                  "order": 6,
                  "normal": {
                      "name": "Cyan",
                      "hex": "#8bd5ca",
                      "rgb": {
                          "r": 139,
                          "g": 213,
                          "b": 202
                      },
                      "hsl": {
                          "h": 171.08108108108107,
                          "s": 0.46835443037974706,
                          "l": 0.6901960784313725
                      },
                      "oklch": {
                          "l": 0.8213577752485862,
                          "c": 0.07550599534583141,
                          "h": 184.1000281519273
                      },
                      "code": 6
                  },
                  "bright": {
                      "name": "Bright Cyan",
                      "hex": "#63cbc0",
                      "rgb": {
                          "r": 99,
                          "g": 203,
                          "b": 192
                      },
                      "hsl": {
                          "h": 173.65384615384616,
                          "s": 0.4999999999999998,
                          "l": 0.592156862745098
                      },
                      "oklch": {
                          "l": 0.7776748423660773,
                          "c": 0.09840189226176546,
                          "h": 185.99744304387175
                      },
                      "code": 14
                  }
              },
              "white": {
                  "name": "White",
                  "order": 7,
                  "normal": {
                      "name": "White",
                      "hex": "#a5adcb",
                      "rgb": {
                          "r": 165,
                          "g": 173,
                          "b": 203
                      },
                      "hsl": {
                          "h": 227.36842105263156,
                          "s": 0.2676056338028167,
                          "l": 0.7215686274509804
                      },
                      "oklch": {
                          "l": 0.7512805402700846,
                          "c": 0.044055856671799086,
                          "h": 273.5326554713311
                      },
                      "code": 7
                  },
                  "bright": {
                      "name": "Bright White",
                      "hex": "#b8c0e0",
                      "rgb": {
                          "r": 184,
                          "g": 192,
                          "b": 224
                      },
                      "hsl": {
                          "h": 228,
                          "s": 0.39215686274509803,
                          "l": 0.8
                      },
                      "oklch": {
                          "l": 0.8119771834676274,
                          "c": 0.0459417988044203,
                          "h": 274.2671845519773
                      },
                      "code": 15
                  }
              }
          }
      },
      "mocha": {
          "name": "Mocha",
          "emoji": "🌿",
          "order": 3,
          "dark": true,
          "colors": {
              "rosewater": {
                  "name": "Rosewater",
                  "order": 0,
                  "hex": "#f5e0dc",
                  "rgb": {
                      "r": 245,
                      "g": 224,
                      "b": 220
                  },
                  "hsl": {
                      "h": 9.599999999999968,
                      "s": 0.555555555555556,
                      "l": 0.911764705882353
                  },
                  "oklch": {
                      "l": 0.922570149778013,
                      "c": 0.02383481197417794,
                      "h": 30.49185525998905
                  },
                  "accent": true
              },
              "flamingo": {
                  "name": "Flamingo",
                  "order": 1,
                  "hex": "#f2cdcd",
                  "rgb": {
                      "r": 242,
                      "g": 205,
                      "b": 205
                  },
                  "hsl": {
                      "h": 0,
                      "s": 0.587301587301587,
                      "l": 0.8764705882352941
                  },
                  "oklch": {
                      "l": 0.879744246442704,
                      "c": 0.04181252912346382,
                      "h": 17.975025052424655
                  },
                  "accent": true
              },
              "pink": {
                  "name": "Pink",
                  "order": 2,
                  "hex": "#f5c2e7",
                  "rgb": {
                      "r": 245,
                      "g": 194,
                      "b": 231
                  },
                  "hsl": {
                      "h": 316.4705882352941,
                      "s": 0.7183098591549301,
                      "l": 0.8607843137254902
                  },
                  "oklch": {
                      "l": 0.8700326070585575,
                      "c": 0.0751577539668794,
                      "h": 336.30408455199915
                  },
                  "accent": true
              },
              "mauve": {
                  "name": "Mauve",
                  "order": 3,
                  "hex": "#cba6f7",
                  "rgb": {
                      "r": 203,
                      "g": 166,
                      "b": 247
                  },
                  "hsl": {
                      "h": 267.4074074074074,
                      "s": 0.8350515463917528,
                      "l": 0.8098039215686275
                  },
                  "oklch": {
                      "l": 0.7871462525760659,
                      "c": 0.11867011135986587,
                      "h": 304.7693043767238
                  },
                  "accent": true
              },
              "red": {
                  "name": "Red",
                  "order": 4,
                  "hex": "#f38ba8",
                  "rgb": {
                      "r": 243,
                      "g": 139,
                      "b": 168
                  },
                  "hsl": {
                      "h": 343.2692307692308,
                      "s": 0.8124999999999998,
                      "l": 0.7490196078431373
                  },
                  "oklch": {
                      "l": 0.7555920111610426,
                      "c": 0.12970214251394938,
                      "h": 2.76416484470991
                  },
                  "accent": true
              },
              "maroon": {
                  "name": "Maroon",
                  "order": 5,
                  "hex": "#eba0ac",
                  "rgb": {
                      "r": 235,
                      "g": 160,
                      "b": 172
                  },
                  "hsl": {
                      "h": 350.4,
                      "s": 0.6521739130434779,
                      "l": 0.7745098039215685
                  },
                  "oklch": {
                      "l": 0.7820502016253794,
                      "c": 0.09032993747998593,
                      "h": 8.848164866005845
                  },
                  "accent": true
              },
              "peach": {
                  "name": "Peach",
                  "order": 6,
                  "hex": "#fab387",
                  "rgb": {
                      "r": 250,
                      "g": 179,
                      "b": 135
                  },
                  "hsl": {
                      "h": 22.95652173913043,
                      "s": 0.92,
                      "l": 0.7549019607843137
                  },
                  "oklch": {
                      "l": 0.8236782337309648,
                      "c": 0.10146034154738652,
                      "h": 52.62941686191107
                  },
                  "accent": true
              },
              "yellow": {
                  "name": "Yellow",
                  "order": 7,
                  "hex": "#f9e2af",
                  "rgb": {
                      "r": 249,
                      "g": 226,
                      "b": 175
                  },
                  "hsl": {
                      "h": 41.35135135135135,
                      "s": 0.8604651162790699,
                      "l": 0.8313725490196078
                  },
                  "oklch": {
                      "l": 0.9193028538212243,
                      "c": 0.07041462719493903,
                      "h": 86.52808223272405
                  },
                  "accent": true
              },
              "green": {
                  "name": "Green",
                  "order": 8,
                  "hex": "#a6e3a1",
                  "rgb": {
                      "r": 166,
                      "g": 227,
                      "b": 161
                  },
                  "hsl": {
                      "h": 115.45454545454544,
                      "s": 0.5409836065573769,
                      "l": 0.7607843137254902
                  },
                  "oklch": {
                      "l": 0.8577042231793516,
                      "c": 0.109228579658491,
                      "h": 142.71528901553893
                  },
                  "accent": true
              },
              "teal": {
                  "name": "Teal",
                  "order": 9,
                  "hex": "#94e2d5",
                  "rgb": {
                      "r": 148,
                      "g": 226,
                      "b": 213
                  },
                  "hsl": {
                      "h": 170.00000000000003,
                      "s": 0.5735294117647057,
                      "l": 0.7333333333333334
                  },
                  "oklch": {
                      "l": 0.8584890398993206,
                      "c": 0.07920670052090036,
                      "h": 182.74951302554985
                  },
                  "accent": true
              },
              "sky": {
                  "name": "Sky",
                  "order": 10,
                  "hex": "#89dceb",
                  "rgb": {
                      "r": 137,
                      "g": 220,
                      "b": 235
                  },
                  "hsl": {
                      "h": 189.18367346938774,
                      "s": 0.7101449275362316,
                      "l": 0.7294117647058823
                  },
                  "oklch": {
                      "l": 0.8467113913728485,
                      "c": 0.08333608100880854,
                      "h": 210.25454148097614
                  },
                  "accent": true
              },
              "sapphire": {
                  "name": "Sapphire",
                  "order": 11,
                  "hex": "#74c7ec",
                  "rgb": {
                      "r": 116,
                      "g": 199,
                      "b": 236
                  },
                  "hsl": {
                      "h": 198.5,
                      "s": 0.759493670886076,
                      "l": 0.6901960784313725
                  },
                  "oklch": {
                      "l": 0.790649687529011,
                      "c": 0.09649039960036986,
                      "h": 228.65267891585813
                  },
                  "accent": true
              },
              "blue": {
                  "name": "Blue",
                  "order": 12,
                  "hex": "#89b4fa",
                  "rgb": {
                      "r": 137,
                      "g": 180,
                      "b": 250
                  },
                  "hsl": {
                      "h": 217.1681415929203,
                      "s": 0.9186991869918699,
                      "l": 0.7588235294117647
                  },
                  "oklch": {
                      "l": 0.7664203616291358,
                      "c": 0.11134426678812931,
                      "h": 259.88497602028025
                  },
                  "accent": true
              },
              "lavender": {
                  "name": "Lavender",
                  "order": 13,
                  "hex": "#b4befe",
                  "rgb": {
                      "r": 180,
                      "g": 190,
                      "b": 254
                  },
                  "hsl": {
                      "h": 231.89189189189187,
                      "s": 0.9736842105263159,
                      "l": 0.8509803921568628
                  },
                  "oklch": {
                      "l": 0.8165960070600968,
                      "c": 0.09095182921926764,
                      "h": 277.3092428314159
                  },
                  "accent": true
              },
              "text": {
                  "name": "Text",
                  "order": 14,
                  "hex": "#cdd6f4",
                  "rgb": {
                      "r": 205,
                      "g": 214,
                      "b": 244
                  },
                  "hsl": {
                      "h": 226.15384615384616,
                      "s": 0.6393442622950825,
                      "l": 0.8803921568627451
                  },
                  "oklch": {
                      "l": 0.8786600793473718,
                      "c": 0.04255199903517194,
                      "h": 272.2767378415369
                  },
                  "accent": false
              },
              "subtext1": {
                  "name": "Subtext 1",
                  "order": 15,
                  "hex": "#bac2de",
                  "rgb": {
                      "r": 186,
                      "g": 194,
                      "b": 222
                  },
                  "hsl": {
                      "h": 226.66666666666669,
                      "s": 0.35294117647058837,
                      "l": 0.8
                  },
                  "oklch": {
                      "l": 0.8168227787478934,
                      "c": 0.04034456468443787,
                      "h": 272.86218933640856
                  },
                  "accent": false
              },
              "subtext0": {
                  "name": "Subtext 0",
                  "order": 16,
                  "hex": "#a6adc8",
                  "rgb": {
                      "r": 166,
                      "g": 173,
                      "b": 200
                  },
                  "hsl": {
                      "h": 227.6470588235294,
                      "s": 0.23611111111111102,
                      "l": 0.7176470588235294
                  },
                  "oklch": {
                      "l": 0.7509605472605528,
                      "c": 0.03956498596177885,
                      "h": 273.9319903727045
                  },
                  "accent": false
              },
              "overlay2": {
                  "name": "Overlay 2",
                  "order": 17,
                  "hex": "#9399b2",
                  "rgb": {
                      "r": 147,
                      "g": 153,
                      "b": 178
                  },
                  "hsl": {
                      "h": 228.38709677419354,
                      "s": 0.16756756756756758,
                      "l": 0.6372549019607843
                  },
                  "oklch": {
                      "l": 0.6865207430554462,
                      "c": 0.037354896315760076,
                      "h": 274.72527650549966
                  },
                  "accent": false
              },
              "overlay1": {
                  "name": "Overlay 1",
                  "order": 18,
                  "hex": "#7f849c",
                  "rgb": {
                      "r": 127,
                      "g": 132,
                      "b": 156
                  },
                  "hsl": {
                      "h": 229.65517241379308,
                      "s": 0.12775330396475776,
                      "l": 0.5549019607843138
                  },
                  "oklch": {
                      "l": 0.6175671510185836,
                      "c": 0.036669743168859285,
                      "h": 276.0047079409003
                  },
                  "accent": false
              },
              "overlay0": {
                  "name": "Overlay 0",
                  "order": 19,
                  "hex": "#6c7086",
                  "rgb": {
                      "r": 108,
                      "g": 112,
                      "b": 134
                  },
                  "hsl": {
                      "h": 230.7692307692308,
                      "s": 0.10743801652892565,
                      "l": 0.4745098039215686
                  },
                  "oklch": {
                      "l": 0.549691183767789,
                      "c": 0.03449390827002124,
                      "h": 277.0950746058613
                  },
                  "accent": false
              },
              "surface2": {
                  "name": "Surface 2",
                  "order": 20,
                  "hex": "#585b70",
                  "rgb": {
                      "r": 88,
                      "g": 91,
                      "b": 112
                  },
                  "hsl": {
                      "h": 232.5,
                      "s": 0.12,
                      "l": 0.39215686274509803
                  },
                  "oklch": {
                      "l": 0.4765064666638717,
                      "c": 0.033993540442005726,
                      "h": 278.6430397483062
                  },
                  "accent": false
              },
              "surface1": {
                  "name": "Surface 1",
                  "order": 21,
                  "hex": "#45475a",
                  "rgb": {
                      "r": 69,
                      "g": 71,
                      "b": 90
                  },
                  "hsl": {
                      "h": 234.2857142857143,
                      "s": 0.13207547169811326,
                      "l": 0.31176470588235294
                  },
                  "oklch": {
                      "l": 0.4036914196944409,
                      "c": 0.03195464132822365,
                      "h": 280.1520036072935
                  },
                  "accent": false
              },
              "surface0": {
                  "name": "Surface 0",
                  "order": 22,
                  "hex": "#313244",
                  "rgb": {
                      "r": 49,
                      "g": 50,
                      "b": 68
                  },
                  "hsl": {
                      "h": 236.84210526315792,
                      "s": 0.16239316239316234,
                      "l": 0.22941176470588237
                  },
                  "oklch": {
                      "l": 0.3240218874463015,
                      "c": 0.03188455239399239,
                      "h": 281.9784417412653
                  },
                  "accent": false
              },
              "base": {
                  "name": "Base",
                  "order": 23,
                  "hex": "#1e1e2e",
                  "rgb": {
                      "r": 30,
                      "g": 30,
                      "b": 46
                  },
                  "hsl": {
                      "h": 240,
                      "s": 0.21052631578947367,
                      "l": 0.14901960784313725
                  },
                  "oklch": {
                      "l": 0.24286694183838442,
                      "c": 0.03035736275944967,
                      "h": 283.91097023641396
                  },
                  "accent": false
              },
              "mantle": {
                  "name": "Mantle",
                  "order": 24,
                  "hex": "#181825",
                  "rgb": {
                      "r": 24,
                      "g": 24,
                      "b": 37
                  },
                  "hsl": {
                      "h": 240,
                      "s": 0.2131147540983607,
                      "l": 0.11960784313725491
                  },
                  "oklch": {
                      "l": 0.2155216079500624,
                      "c": 0.02541687089919072,
                      "h": 284.06469902193265
                  },
                  "accent": false
              },
              "crust": {
                  "name": "Crust",
                  "order": 25,
                  "hex": "#11111b",
                  "rgb": {
                      "r": 17,
                      "g": 17,
                      "b": 27
                  },
                  "hsl": {
                      "h": 240,
                      "s": 0.22727272727272727,
                      "l": 0.08627450980392157
                  },
                  "oklch": {
                      "l": 0.18278246200466305,
                      "c": 0.02037484440642812,
                      "h": 284.2038483902186
                  },
                  "accent": false
              }
          },
          "ansiColors": {
              "black": {
                  "name": "Black",
                  "order": 0,
                  "normal": {
                      "name": "Black",
                      "hex": "#45475a",
                      "rgb": {
                          "r": 69,
                          "g": 71,
                          "b": 90
                      },
                      "hsl": {
                          "h": 234.2857142857143,
                          "s": 0.13207547169811326,
                          "l": 0.31176470588235294
                      },
                      "oklch": {
                          "l": 0.4036914196944409,
                          "c": 0.03195464132822365,
                          "h": 280.1520036072935
                      },
                      "code": 0
                  },
                  "bright": {
                      "name": "Bright Black",
                      "hex": "#585b70",
                      "rgb": {
                          "r": 88,
                          "g": 91,
                          "b": 112
                      },
                      "hsl": {
                          "h": 232.5,
                          "s": 0.12,
                          "l": 0.39215686274509803
                      },
                      "oklch": {
                          "l": 0.4765064666638717,
                          "c": 0.033993540442005726,
                          "h": 278.6430397483062
                      },
                      "code": 8
                  }
              },
              "red": {
                  "name": "Red",
                  "order": 1,
                  "normal": {
                      "name": "Red",
                      "hex": "#f38ba8",
                      "rgb": {
                          "r": 243,
                          "g": 139,
                          "b": 168
                      },
                      "hsl": {
                          "h": 343.2692307692308,
                          "s": 0.8124999999999998,
                          "l": 0.7490196078431373
                      },
                      "oklch": {
                          "l": 0.7555920111610426,
                          "c": 0.12970214251394938,
                          "h": 2.76416484470991
                      },
                      "code": 1
                  },
                  "bright": {
                      "name": "Bright Red",
                      "hex": "#f37799",
                      "rgb": {
                          "r": 243,
                          "g": 119,
                          "b": 153
                      },
                      "hsl": {
                          "h": 343.54838709677415,
                          "s": 0.8378378378378376,
                          "l": 0.7098039215686274
                      },
                      "oklch": {
                          "l": 0.7217428993342391,
                          "c": 0.15414679130645687,
                          "h": 4.389693527883992
                      },
                      "code": 9
                  }
              },
              "green": {
                  "name": "Green",
                  "order": 2,
                  "normal": {
                      "name": "Green",
                      "hex": "#a6e3a1",
                      "rgb": {
                          "r": 166,
                          "g": 227,
                          "b": 161
                      },
                      "hsl": {
                          "h": 115.45454545454544,
                          "s": 0.5409836065573769,
                          "l": 0.7607843137254902
                      },
                      "oklch": {
                          "l": 0.8577042231793516,
                          "c": 0.109228579658491,
                          "h": 142.71528901553893
                      },
                      "code": 2
                  },
                  "bright": {
                      "name": "Bright Green",
                      "hex": "#89d88b",
                      "rgb": {
                          "r": 137,
                          "g": 216,
                          "b": 139
                      },
                      "hsl": {
                          "h": 121.51898734177213,
                          "s": 0.5031847133757963,
                          "l": 0.692156862745098
                      },
                      "oklch": {
                          "l": 0.8114606411671731,
                          "c": 0.13124595694065,
                          "h": 144.75794205397312
                      },
                      "code": 10
                  }
              },
              "yellow": {
                  "name": "Yellow",
                  "order": 3,
                  "normal": {
                      "name": "Yellow",
                      "hex": "#f9e2af",
                      "rgb": {
                          "r": 249,
                          "g": 226,
                          "b": 175
                      },
                      "hsl": {
                          "h": 41.35135135135135,
                          "s": 0.8604651162790699,
                          "l": 0.8313725490196078
                      },
                      "oklch": {
                          "l": 0.9193028538212243,
                          "c": 0.07041462719493903,
                          "h": 86.52808223272405
                      },
                      "code": 3
                  },
                  "bright": {
                      "name": "Bright Yellow",
                      "hex": "#ebd391",
                      "rgb": {
                          "r": 235,
                          "g": 211,
                          "b": 145
                      },
                      "hsl": {
                          "h": 44,
                          "s": 0.692307692307692,
                          "l": 0.7450980392156863
                      },
                      "oklch": {
                          "l": 0.8715235071537292,
                          "c": 0.08865613632867986,
                          "h": 89.86758726732972
                      },
                      "code": 11
                  }
              },
              "blue": {
                  "name": "Blue",
                  "order": 4,
                  "normal": {
                      "name": "Blue",
                      "hex": "#89b4fa",
                      "rgb": {
                          "r": 137,
                          "g": 180,
                          "b": 250
                      },
                      "hsl": {
                          "h": 217.1681415929203,
                          "s": 0.9186991869918699,
                          "l": 0.7588235294117647
                      },
                      "oklch": {
                          "l": 0.7664203616291358,
                          "c": 0.11134426678812931,
                          "h": 259.88497602028025
                      },
                      "code": 4
                  },
                  "bright": {
                      "name": "Bright Blue",
                      "hex": "#74a8fc",
                      "rgb": {
                          "r": 116,
                          "g": 168,
                          "b": 252
                      },
                      "hsl": {
                          "h": 217.05882352941174,
                          "s": 0.9577464788732396,
                          "l": 0.7215686274509804
                      },
                      "oklch": {
                          "l": 0.7309959277391279,
                          "c": 0.13483339482417311,
                          "h": 259.6926272923047
                      },
                      "code": 12
                  }
              },
              "magenta": {
                  "name": "Magenta",
                  "order": 5,
                  "normal": {
                      "name": "Magenta",
                      "hex": "#f5c2e7",
                      "rgb": {
                          "r": 245,
                          "g": 194,
                          "b": 231
                      },
                      "hsl": {
                          "h": 316.4705882352941,
                          "s": 0.7183098591549301,
                          "l": 0.8607843137254902
                      },
                      "oklch": {
                          "l": 0.8700326070585575,
                          "c": 0.0751577539668794,
                          "h": 336.30408455199915
                      },
                      "code": 5
                  },
                  "bright": {
                      "name": "Bright Magenta",
                      "hex": "#f2aede",
                      "rgb": {
                          "r": 242,
                          "g": 174,
                          "b": 222
                      },
                      "hsl": {
                          "h": 317.6470588235294,
                          "s": 0.7234042553191488,
                          "l": 0.8156862745098039
                      },
                      "oklch": {
                          "l": 0.8295922565294424,
                          "c": 0.09937171080080995,
                          "h": 338.2151942405669
                      },
                      "code": 13
                  }
              },
              "cyan": {
                  "name": "Cyan",
                  "order": 6,
                  "normal": {
                      "name": "Cyan",
                      "hex": "#94e2d5",
                      "rgb": {
                          "r": 148,
                          "g": 226,
                          "b": 213
                      },
                      "hsl": {
                          "h": 170.00000000000003,
                          "s": 0.5735294117647057,
                          "l": 0.7333333333333334
                      },
                      "oklch": {
                          "l": 0.8584890398993206,
                          "c": 0.07920670052090036,
                          "h": 182.74951302554985
                      },
                      "code": 6
                  },
                  "bright": {
                      "name": "Bright Cyan",
                      "hex": "#6bd7ca",
                      "rgb": {
                          "r": 107,
                          "g": 215,
                          "b": 202
                      },
                      "hsl": {
                          "h": 172.77777777777777,
                          "s": 0.5744680851063831,
                          "l": 0.6313725490196078
                      },
                      "oklch": {
                          "l": 0.8125207918878411,
                          "c": 0.10203371842442319,
                          "h": 184.63421832134114
                      },
                      "code": 14
                  }
              },
              "white": {
                  "name": "White",
                  "order": 7,
                  "normal": {
                      "name": "White",
                      "hex": "#a6adc8",
                      "rgb": {
                          "r": 166,
                          "g": 173,
                          "b": 200
                      },
                      "hsl": {
                          "h": 227.6470588235294,
                          "s": 0.23611111111111102,
                          "l": 0.7176470588235294
                      },
                      "oklch": {
                          "l": 0.7509605472605528,
                          "c": 0.03956498596177885,
                          "h": 273.9319903727045
                      },
                      "code": 7
                  },
                  "bright": {
                      "name": "Bright White",
                      "hex": "#bac2de",
                      "rgb": {
                          "r": 186,
                          "g": 194,
                          "b": 222
                      },
                      "hsl": {
                          "h": 226.66666666666669,
                          "s": 0.35294117647058837,
                          "l": 0.8
                      },
                      "oklch": {
                          "l": 0.8168227787478934,
                          "c": 0.04034456468443787,
                          "h": 272.86218933640856
                      },
                      "code": 15
                  }
              }
          }
      }
  };

  const entriesFromObject = (obj) => Object.entries(obj);
  const { version: _, ...jsonFlavors } = definitions;
  /**
   * All flavors of Catppuccin.
   */
  const flavors = entriesFromObject(jsonFlavors).reduce((acc, [flavorName, flavor]) => {
      acc[flavorName] = {
          ...flavor,
          colorEntries: entriesFromObject(flavor.colors),
          ansiColorEntries: entriesFromObject(flavor.ansiColors),
      };
      return acc;
  }, {});
  /**
   * A typed `Object.entries()` iterable of all Catppuccin flavors.
   */
  entriesFromObject(flavors);

  const createPaletteVariables = (flavor) =>
    Object.entries(flavor.colors)
      .map(([name, color]) => `    --ctp-${name}: ${color.hex};`)
      .join("\n");

  const createFlavorRule = (name) => `
  html[data-zb-theme="${name}"] {
${createPaletteVariables(flavors[name])}
    color-scheme: ${flavors[name].dark ? "dark" : "light"};
  }`;

  const flavorRules = ["latte", "frappe", "macchiato", "mocha"].map(createFlavorRule).join("\n");

  const CATPPUCCIN_THEME_STYLE = `
${flavorRules}

  html[data-zb-theme="system"] {
${createPaletteVariables(flavors.latte)}
    color-scheme: light;
  }

  @media (prefers-color-scheme: dark) {
    html[data-zb-theme="system"] {
${createPaletteVariables(flavors.mocha)}
      color-scheme: dark;
    }
  }

  html[data-zb-theme] {
    --zb-page: var(--ctp-mantle);
    --zb-surface: var(--ctp-base);
    --zb-surface-raised: var(--ctp-surface0);
    --zb-surface-hover: var(--ctp-surface1);
    --zb-border: var(--ctp-surface0);
    --zb-border-strong: var(--ctp-surface1);
    --zb-text: var(--ctp-text);
    --zb-text-secondary: var(--ctp-subtext1);
    --zb-text-muted: var(--ctp-subtext0);
    --zb-text-subtle: var(--ctp-overlay0);
    --zb-primary: var(--ctp-blue);
    --zb-primary-hover: var(--ctp-sapphire);
    --zb-primary-soft: color-mix(in srgb, var(--ctp-blue) 16%, transparent);
    --zb-danger: var(--ctp-red);
    --zb-danger-soft: color-mix(in srgb, var(--ctp-red) 14%, transparent);
    --zb-success: var(--ctp-green);
    --zb-warning: var(--ctp-peach);
    --zb-shadow: 0 1px 3px color-mix(in srgb, var(--ctp-crust) 28%, transparent);
    background: var(--zb-page) !important;
    scrollbar-color: var(--ctp-overlay0) var(--zb-page);
  }

  html[data-zb-theme] body,
  html[data-zb-theme] #root,
  html[data-zb-theme] .App-main,
  html[data-zb-theme] .Topstory-body {
    background-color: var(--zb-page) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] ::selection {
    background: var(--ctp-lavender) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme] :focus-visible {
    outline-color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .AppHeader,
  html[data-zb-theme] .AppHeader-inner,
  html[data-zb-theme] .Sticky.is-fixed {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
    border-color: var(--zb-border) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .AppHeader a,
  html[data-zb-theme] .AppHeader button,
  html[data-zb-theme] .AppHeader svg,
  html[data-zb-theme] .AppHeader-Tabs a {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .AppHeader a:hover,
  html[data-zb-theme] .AppHeader button:hover,
  html[data-zb-theme] .AppHeader-Tab--active a,
  html[data-zb-theme] .AppHeader-Tabs a[aria-current="page"] {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .AppHeader
    .SearchBar-searchButton
    .SearchBar-searchIcon {
    color: var(--zb-text-muted) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .AppHeader
    .SearchBar-searchButton
    .SearchBar-searchIcon.isFocus {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .AppHeader
    .SearchBar-input--focus
    .SearchBar-searchButton {
    background-color: transparent !important;
    border-color: transparent !important;
  }

  html[data-zb-theme]
    .AppHeader
    .SearchBar-askDropdownButton
    .ZDI--PlusFill24 {
    color: var(--ctp-crust) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .SearchBar-menu .Menu-item:hover,
  html[data-zb-theme] .SearchBar-menu .Menu-item.is-active,
  html[data-zb-theme] .SearchBar-menu .Menu-item:focus,
  html[data-zb-theme] .SearchBar-menu .Menu-item:focus-within {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .SearchBar-input,
  html[data-zb-theme] .Input-wrapper,
  html[data-zb-theme] input,
  html[data-zb-theme] textarea,
  html[data-zb-theme] select,
  html[data-zb-theme] [contenteditable="true"] {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    caret-color: var(--zb-primary) !important;
  }

  html[data-zb-theme] input::placeholder,
  html[data-zb-theme] textarea::placeholder,
  html[data-zb-theme] [contenteditable="true"]:empty::before {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .AskTitle-input,
  html[data-zb-theme] .Modal:has(.Ask-form) .AskDetail-input {
    box-sizing: border-box !important;
    width: 100% !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .AskTitle-input {
    min-height: 46px !important;
    padding: 9px 12px !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .AskDetail-input {
    min-height: 104px !important;
    padding: 11px 12px !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .AskTitle-input:focus-within,
  html[data-zb-theme] .Modal:has(.Ask-form) .AskDetail-input:focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .AskTitle-input textarea,
  html[data-zb-theme] .Modal:has(.Ask-form) .AskDetail-input .Editable-content,
  html[data-zb-theme] .Modal:has(.Ask-form) .AskDetail-input .DraftEditor-root,
  html[data-zb-theme]
    .Modal:has(.Ask-form)
    .AskDetail-input
    .DraftEditor-editorContainer,
  html[data-zb-theme]
    .Modal:has(.Ask-form)
    .AskDetail-input
    .public-DraftEditor-content,
  html[data-zb-theme]
    .Modal:has(.Ask-form)
    .AskDetail-input
    .public-DraftEditorPlaceholder-root,
  html[data-zb-theme]
    .Modal:has(.Ask-form)
    .AskDetail-input
    .public-DraftEditorPlaceholder-inner {
    background-color: transparent !important;
    border: 0 !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .AskTitle-input textarea {
    width: 100% !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .AskDetail-input .Editable-content {
    min-height: 80px !important;
  }

  html[data-zb-theme]
    .Modal:has(.Ask-form)
    .public-DraftEditorPlaceholder-inner {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .Editable-toolbar {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .Editable-toolbar-controls {
    background-color: transparent !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .Editable-toolbar .Editable-control {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .Editable-toolbar .Editable-control:hover,
  html[data-zb-theme]
    .Modal:has(.Ask-form)
    .Editable-toolbar
    .Editable-control.is-active,
  html[data-zb-theme]
    .Modal:has(.Ask-form)
    .Editable-toolbar
    .Editable-control[aria-pressed="true"] {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .Editable-toolbar-separator {
    background-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .WriteArea :where(section, div, span) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .WriteArea > div > section {
    flex: 1 1 auto !important;
    width: auto !important;
    min-width: 0 !important;
  }

  html[data-zb-theme] .WriteArea > div > section > div,
  html[data-zb-theme] .WriteArea .WritePinV2-Form,
  html[data-zb-theme] .WriteArea .WritePinToolbar,
  html[data-zb-theme] .WriteArea .TitleArea,
  html[data-zb-theme] .WriteArea .EditorArea,
  html[data-zb-theme] .WriteArea .InputLike.Editable {
    box-sizing: border-box !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
  }

  html[data-zb-theme] .WriteArea textarea,
  html[data-zb-theme] .WriteArea .TitleArea,
  html[data-zb-theme] .WriteArea .InputLike.Editable,
  html[data-zb-theme] .WriteArea .DraftEditor-root,
  html[data-zb-theme] .WriteArea .DraftEditor-editorContainer,
  html[data-zb-theme] .WriteArea .public-DraftEditor-content,
  html[data-zb-theme] .WriteArea .public-DraftEditorPlaceholder-root,
  html[data-zb-theme] .WriteArea .public-DraftEditorPlaceholder-inner {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .WriteArea .InputLike.Editable:focus-within {
    border-color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .TitleArea,
  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .EditorArea .InputLike.Editable {
    box-sizing: border-box !important;
    width: 100% !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .TitleArea {
    min-height: 46px !important;
    padding: 8px 12px !important;
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .AppHeader-profileAvatar {
    align-self: flex-start !important;
    margin-top: 11px !important;
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .EditorArea {
    margin-top: 10px !important;
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .EditorArea .InputLike.Editable {
    min-height: 84px !important;
    padding: 10px 12px !important;
    scrollbar-color: var(--zb-text-subtle) transparent !important;
    scrollbar-width: thin !important;
  }

  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable::-webkit-scrollbar {
    width: 8px !important;
    background-color: transparent !important;
  }

  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable::-webkit-scrollbar-track {
    background-color: transparent !important;
    margin-block: 8px !important;
  }

  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable::-webkit-scrollbar-thumb {
    background-color: var(--zb-text-subtle) !important;
    background-clip: content-box !important;
    border: 2px solid transparent !important;
    border-radius: 999px !important;
  }

  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable::-webkit-scrollbar-thumb:hover {
    background-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable::-webkit-scrollbar-corner {
    background-color: transparent !important;
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .TitleArea:focus-within,
  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable:focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .TitleArea textarea,
  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable
    .Editable-content,
  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable
    .DraftEditor-root,
  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable
    .DraftEditor-editorContainer,
  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable
    .public-DraftEditor-content,
  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable
    .public-DraftEditorPlaceholder-root,
  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable
    .public-DraftEditorPlaceholder-inner {
    background-color: transparent !important;
    border: 0 !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .Editable-content {
    min-height: 62px !important;
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .TitleArea > div:last-child,
  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable
    .public-DraftEditorPlaceholder-inner {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme] .Card,
  html[data-zb-theme] .TopstoryItem,
  html[data-zb-theme] .Topstory-mainColumnCard,
  html[data-zb-theme] .Topstory-mainColumnCard > div,
  html[data-zb-theme] .WriteArea,
  html[data-zb-theme] .HotSearchCard,
  html[data-zb-theme] .CreatorEntrance,
  html[data-zb-theme] .KfeCollection-CreateSaltCard,
  html[data-zb-theme] .Modal-inner,
  html[data-zb-theme] .Popover-content,
  html[data-zb-theme] .Menu,
  html[data-zb-theme] .Dropdown-menu,
  html[data-zb-theme] .Select-list,
  html[data-zb-theme] .AutoComplete-menu {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] div:has(> .Modal-content) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .Modal .Topbar {
    background-color: var(--zb-surface) !important;
    border-bottom-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.SendGiftModal-GiftListWrapper)
    .Modal-content
    > div
    > div:has(+ div + div > .SendGiftModal-GiftListWrapper),
  html[data-zb-theme]
    .Modal:has(.SendGiftModal-RedpacketListWrapper)
    .Modal-content
    > div
    > div:has(+ div > .SendGiftModal-RedpacketListWrapper) {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.SendGiftModal-RedpacketListWrapper)
    .Modal-content
    > div
    > div:has(+ div > .SendGiftModal-RedpacketListWrapper)
    > button {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(.SendGiftModal-RedpacketListWrapper)
    .Modal-content
    > div
    > div:has(+ div > .SendGiftModal-RedpacketListWrapper)
    > button:is(:hover, :focus-visible) {
    color: var(--zb-primary) !important;
    -webkit-text-fill-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(.SendGiftModal-GiftListWrapper)
    .Modal-content
    > div
    > div:has(+ div > .SendGiftModal-GiftListWrapper),
  html[data-zb-theme]
    .Modal:has(.SendGiftModal-GiftListWrapper)
    .SendGiftModal-GiftListWrapper
    > div
    > div:last-child {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal
    .SendGiftModal-GiftListWrapper
    > div
    > div:not(:last-child),
  html[data-zb-theme]
    .Modal
    .SendGiftModal-RedpacketListWrapper
    > div
    > div {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal
    .SendGiftModal-RedpacketListWrapper
    > div:not(:empty) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:not(:last-child) {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:not(:last-child)
    :where(div, span) {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:first-child
    > div:nth-child(2),
  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:nth-child(2)
    span {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:last-child {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(> button):last-child
    > div:first-child {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    a[href*="/grapp/protocol/payment"] {
    color: var(--zb-primary) !important;
    -webkit-text-fill-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(> button):last-child
    > div:nth-child(2),
  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:first-child
    > div:last-child {
    color: var(--zb-danger) !important;
    -webkit-text-fill-color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    )
    .Modal-closeIcon {
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder="0"])
    .Modal-content
    > div
    > div:nth-child(2),
  html[data-zb-theme]
    .Modal:has(input[placeholder="0"])
    input[placeholder="0"] {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder="0"])
    input[placeholder="0"]::placeholder {
    color: var(--zb-text-subtle) !important;
    -webkit-text-fill-color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme] .FavlistsModal .Modal-inner {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .FavlistsModal :is(.Modal-title, .Favlists-itemNameText) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    :is(.Modal-subtitle, .Favlists-itemContent, .Favlists-itemIcon) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-items {
    scrollbar-color: var(--zb-text-subtle) transparent !important;
    scrollbar-width: thin !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-item {
    box-sizing: border-box !important;
    width: 100% !important;
    min-width: 0 !important;
    padding: 8px 10px !important;
    background-color: transparent !important;
    border-bottom-color: var(--zb-border) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    .Favlists-item:is(:hover, :focus-within) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-itemInner {
    flex: 1 1 auto !important;
    min-width: 0 !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-itemName {
    min-width: 0 !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-itemNameText {
    min-width: 0 !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-updateButton {
    flex: 0 0 76px !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-updateButton.Button--blue,
  html[data-zb-theme] .FavlistsModal .Favlists-addButton {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    border-radius: 6px !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    :is(.Favlists-updateButton.Button--blue, .Favlists-addButton):hover {
    background-color: var(--zb-primary-hover) !important;
    border-color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    :is(.Favlists-updateButton, .Favlists-addButton):focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-actions {
    background-color: var(--zb-surface) !important;
    border-top-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .FavlistsModal .Modal-closeButton {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    .Modal-closeButton:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    .Favlists-updateButton.Button--grey {
    position: relative !important;
    border-radius: 6px !important;
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    .Favlists-updateButton.Button--grey:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: transparent !important;
    -webkit-text-fill-color: transparent !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    .Favlists-updateButton.Button--grey:is(:hover, :focus-visible)::after {
    content: "取消收藏" !important;
    position: absolute !important;
    inset: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: var(--zb-danger) !important;
    -webkit-text-fill-color: var(--zb-danger) !important;
    font-size: 14px !important;
    line-height: normal !important;
  }

  html[data-zb-theme]:is(
      [data-zb-question-page="true"],
      [data-zb-home-page="true"]
    )
    body
    div:has(> div > div:first-child > span:only-child):has(
      > div > div:nth-child(2):empty
    ):has(> div > div:nth-child(3) > button .ZDI--ArrowRight24) {
    background-color: transparent !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme]:is(
      [data-zb-question-page="true"],
      [data-zb-home-page="true"]
    )
    body
    div:has(> div:first-child > span:only-child):has(
      > div:nth-child(2):empty
    ):has(> div:nth-child(3) > button .ZDI--ArrowRight24) {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]:is(
      [data-zb-question-page="true"],
      [data-zb-home-page="true"]
    )
    body
    div:has(> div:first-child > span:only-child):has(
      > div:nth-child(2):empty
    ):has(> div:nth-child(3) > button .ZDI--ArrowRight24)
    > div:nth-child(2) {
    background-color: transparent !important;
  }

  html[data-zb-theme]:is(
      [data-zb-question-page="true"],
      [data-zb-home-page="true"]
    )
    body
    div:has(> div:first-child > span:only-child):has(
      > div:nth-child(2):empty
    ):has(> div:nth-child(3) > button .ZDI--ArrowRight24)
    :is(span, button) {
    color: var(--zb-primary) !important;
    -webkit-text-fill-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]:is(
      [data-zb-question-page="true"],
      [data-zb-home-page="true"]
    )
    body
    div:has(> div:first-child > span:only-child):has(
      > div:nth-child(2):empty
    ):has(> div:nth-child(3) > button .ZDI--ArrowRight24)
    button {
    box-sizing: border-box !important;
    min-width: max-content !important;
    padding: 4px 8px !important;
    border-radius: 6px !important;
    white-space: nowrap !important;
  }

  html[data-zb-theme]:is(
      [data-zb-question-page="true"],
      [data-zb-home-page="true"]
    )
    body
    div:has(> div:first-child > span:only-child):has(
      > div:nth-child(2):empty
    ):has(> div:nth-child(3) > button .ZDI--ArrowRight24)
    button:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-radius: 6px !important;
    box-shadow: inset 0 0 0 1px var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]:is(
      [data-zb-question-page="true"],
      [data-zb-home-page="true"]
    )
    body
    div:has(> div:first-child > span:only-child):has(
      > div:nth-child(2):empty
    ):has(> div:nth-child(3) > button .ZDI--ArrowRight24)
    :is(svg, path) {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .WriteArea,
  html[data-zb-theme] .Topstory-mainColumnCard {
    background-clip: padding-box !important;
    border-radius: 12px !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-menuContainer, .Messages-menuContainer) {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-menuContainer, .Messages-menuContainer)
    .Popover-arrow::after {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .Popover-content > .Popover-arrow::after {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .TooltipContent,
  html[data-zb-theme] .TooltipContent.TooltipContent--white {
    background: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    .TooltipContent
    :where(.TooltipContent-children, div, span, p, strong) {
    color: inherit !important;
  }

  html[data-zb-theme] body .TooltipContent.TooltipContent--white,
  html[data-zb-theme] body .TooltipContent.TooltipContent--white * {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
    opacity: 1 !important;
  }

  html[data-zb-theme] .TooltipContent .TooltipContent-arrow::after,
  html[data-zb-theme]
    .TooltipContent.TooltipContent--white
    .TooltipContent-arrow::after {
    background: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme]
    :is(
      .PushNotifications-menu,
      .PushNotifications-content,
      .PushNotifications-header,
      .PushNotifications-list,
      .PushNotifications-footer,
      .Notifications-footer,
      .Messages-menu,
      .Messages-content,
      .Messages-header,
      .Messages-list,
      .Messages-footer
    ) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-header, .Messages-header) {
    border-bottom: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-footer, .Notifications-footer, .Messages-footer) {
    border-top: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-list, .Messages-list) {
    scrollbar-color: var(--zb-text-subtle) transparent !important;
    scrollbar-width: thin !important;
  }

  html[data-zb-theme] .PushNotifications-tab,
  html[data-zb-theme] .Messages-tab {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .PushNotifications-tab:hover,
  html[data-zb-theme] .PushNotifications-tab:focus-visible,
  html[data-zb-theme] .Messages-tab:hover,
  html[data-zb-theme] .Messages-tab:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .PushNotifications-selectedTabIcon {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .PushNotifications-item,
  html[data-zb-theme] .Messages-item {
    background-color: transparent !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .PushNotifications-item::after,
  html[data-zb-theme] .Messages-item::after {
    background-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .PushNotifications-item:hover,
  html[data-zb-theme] .PushNotifications-item:focus-visible,
  html[data-zb-theme] .Messages-item:hover,
  html[data-zb-theme] .Messages-item:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Messages-newItem {
    background-color: var(--zb-primary-soft) !important;
  }

  html[data-zb-theme] .PushNotifications-actor,
  html[data-zb-theme] .Messages-userName,
  html[data-zb-theme] .Messages-userName a {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .PushNotifications-item a {
    color: var(--zb-primary) !important;
    text-decoration-color: transparent !important;
    text-underline-offset: 2px !important;
  }

  html[data-zb-theme] .PushNotifications-item a:hover,
  html[data-zb-theme] .PushNotifications-item a:focus-visible {
    color: var(--zb-primary-hover) !important;
    text-decoration-color: currentColor !important;
  }

  html[data-zb-theme] .Messages-itemContent {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-menuContainer, .Messages-menuContainer)
    :is(.PushNotifications-footer, .Notifications-footer, .Messages-footer)
    :is(a.Button, button.Button) {
    background-color: transparent !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-menuContainer, .Messages-menuContainer)
    :is(.PushNotifications-footer, .Notifications-footer, .Messages-footer)
    :is(a.Button, button.Button):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme] .Topstory-mainColumnCard {
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme] .TopstoryItem,
  html[data-zb-theme] .ContentItem,
  html[data-zb-theme] .List-item,
  html[data-zb-theme] .Menu-item,
  html[data-zb-theme] .Menu-divider {
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme] h1,
  html[data-zb-theme] h2,
  html[data-zb-theme] h3,
  html[data-zb-theme] h4,
  html[data-zb-theme] h5,
  html[data-zb-theme] h6,
  html[data-zb-theme] .ContentItem-title,
  html[data-zb-theme] .AuthorInfo-name,
  html[data-zb-theme] .RichContent,
  html[data-zb-theme] .RichText {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .TopstoryItem .RichContent-inner,
  html[data-zb-theme] .TopstoryItem .RichContent-inner .RichText {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme] .ContentItem-meta,
  html[data-zb-theme] .ContentItem-time,
  html[data-zb-theme] .AuthorInfo-badgeText,
  html[data-zb-theme] .RichContent-actions,
  html[data-zb-theme] .Button:not(.Button--blue):not(.VoteButton) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] a:hover,
  html[data-zb-theme] .ContentItem-title a:hover,
  html[data-zb-theme] .RichText a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Button:not(.Button--blue):not(.VoteButton):hover,
  html[data-zb-theme] .Menu-item:hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Popover-content .Menu > .Menu-item {
    box-sizing: border-box !important;
    width: calc(100% - 12px) !important;
    margin-right: 6px !important;
    margin-left: 6px !important;
    padding-right: 14px !important;
    padding-left: 14px !important;
    border-radius: 4px !important;
  }

  html[data-zb-theme]
    .Popover-content
    .Menu
    > .Menu-item:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .Editable-languageSuggestions,
  html[data-zb-theme] .Editable-languageSuggestions .Popover-content,
  html[data-zb-theme] .Editable-languageSuggestionsMenu,
  html[data-zb-theme] .TopicSuggestion-Popover,
  html[data-zb-theme] .TopicSuggestion-Popover-container {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Editable-languageSuggestionsInput,
  html[data-zb-theme] .Editable-languageSuggestionsInput input {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Editable-languageSuggestions .Menu-item,
  html[data-zb-theme] .TopicSuggestion-Popover .Menu-item {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .TopicSuggestion-TopicItem,
  html[data-zb-theme] .TopicSuggestion-TopicItem .topic-name {
    background-color: transparent !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .TopicSuggestion-TopicItem .pin-count {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .TopicSuggestion-TopicItem .new-topic {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .TopicInputAlias-suggestionContainer,
  html[data-zb-theme] .MentionSuggestions-menu {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .TopicInputAlias-suggestionContainer .Menu-item,
  html[data-zb-theme] .MentionSuggestions-menu .Menu-item {
    background-color: transparent !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .TopicInputAlias-suggestionContainer .AutoComplete-DefaultItem,
  html[data-zb-theme] .MentionSuggestions-menu .AutoComplete-UserItem,
  html[data-zb-theme] .MentionSuggestions-menu .AutoComplete-UserDetail {
    background-color: transparent !important;
    color: inherit !important;
  }

  html[data-zb-theme] .TopicInputAlias-suggestionContainer .Menu-item:hover,
  html[data-zb-theme] .TopicInputAlias-suggestionContainer .Menu-item:focus,
  html[data-zb-theme] .TopicInputAlias-suggestionContainer .Menu-item.is-active,
  html[data-zb-theme] .MentionSuggestions-menu .Menu-item:hover,
  html[data-zb-theme] .MentionSuggestions-menu .Menu-item:focus,
  html[data-zb-theme] .MentionSuggestions-menu .Menu-item.is-active {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .MentionSuggestions-menu .AutoComplete-UserName {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .MentionSuggestions-menu .AutoComplete-UserHeadline {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .MentionSuggestions-menu .AutoComplete-UserSocialTag {
    background-color: var(--zb-primary-soft) !important;
    border-color: color-mix(in srgb, var(--zb-primary) 35%, transparent) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Editable-languageSuggestions .Menu-item:hover,
  html[data-zb-theme] .Editable-languageSuggestions .Menu-item.is-active,
  html[data-zb-theme] .TopicSuggestion-Popover .Menu-item:hover,
  html[data-zb-theme] .TopicSuggestion-Popover .Menu-item.is-active {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .EmoticonPopover {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 8px !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .EmoticonPopover > svg {
    fill: var(--zb-surface) !important;
    color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    .EmoticonPopover
    > div:last-child
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    border-top: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme]
    .EmoticonPopover
    > div:last-child
    > div:last-child
    > ul {
    background-color: transparent !important;
  }

  html[data-zb-theme]
    .EmoticonPopover
    > div:last-child
    > div:first-child
    li {
    padding-block: 2px !important;
    padding-inline: 3px !important;
  }

  html[data-zb-theme]
    .EmoticonPopover
    > div:last-child
    > div:last-child
    > ul
    > li {
    background-color: transparent !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .EmoticonPopover
    > div:last-child
    > div:last-child
    > ul
    > .css-1c21y8s {
    background-color: var(--zb-primary-soft) !important;
  }

  html[data-zb-theme] .EmoticonPopover li:hover,
  html[data-zb-theme] .EmoticonPopover li:focus-visible {
    background-color: var(--zb-surface-hover) !important;
    outline-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> button.Button--primary) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> button.Button--primary)
    :where(div, label, svg) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> button.Button--primary)
    a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    .Modal-content
    > div
    > div:last-child
    > div:last-child:has(> button) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    .Modal-content
    > div
    > div:last-child
    > div:last-child:has(> button)
    > div,
  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    .Modal-content
    > div
    > div:last-child
    > div:last-child:has(> button)
    > div
    :where(div, span) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> input[placeholder="输入关键字查找图片"]) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> input[placeholder="输入关键字查找图片"]):focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    input[placeholder="输入关键字查找图片"] {
    box-sizing: border-box !important;
    min-width: 0 !important;
    padding: 0 !important;
    background-color: transparent !important;
    border: 0 !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    input[placeholder="输入关键字查找图片"]
    + button {
    background-color: transparent !important;
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    input[placeholder="输入关键字查找图片"]
    + button:hover {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> div > input[type="file"][multiple])
    > div
    > div:last-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal
    :is(.MaterialLibraryNav-Mine, .MaterialLibraryNav-Folder) {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal
    :is(.MaterialLibraryNav-Mine, .MaterialLibraryNav-Folder):is(
      :hover,
      :focus-within
    ) {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal
    :is(.MaterialLibraryNav-Mine, .MaterialLibraryNav-Folder).active {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Modal .MaterialLibraryNav-Folder .nav-name {
    color: inherit !important;
  }

  html[data-zb-theme]
    .Modal
    :is(.MaterialLibraryNav-Mine, .MaterialLibraryNav-Folder)
    .nav-num {
    min-width: 20px !important;
    padding-inline: 6px !important;
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 10px !important;
  }

  html[data-zb-theme]
    .Modal
    :is(.MaterialLibraryNav-Mine, .MaterialLibraryNav-Folder).active
    .nav-num {
    background-color: var(--zb-surface) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .ReferenceModal :is(.InputLike, .Select-button) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .ReferenceModal
    :is(.InputLike, .Select-button):is(:hover, :focus, :focus-within) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    ) {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
    border-radius: 8px !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:first-child
    :where(h1, h2, h3, p, div, span, label) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:first-child
    a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    border-top: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:last-child
    > div:first-child,
  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:last-child
    > div:first-child
    :where(div, span, label) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:last-child
    a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    > div:first-child {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    [dir="auto"] {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    [tabindex="0"] {
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    [tabindex="0"]:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    [tabindex="0"]
    [dir="auto"] {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Modal:has(canvas[alt="二维码"]) .Modal-content div {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(canvas[alt="二维码"])
    .Modal-content
    > div
    > div
    > div
    > div:first-child
    > div:first-child
    > div:first-child {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(canvas[alt="二维码"])
    .Modal-content
    > div
    > div
    > div
    > div:first-child
    > div:first-child
    > div:last-child,
  html[data-zb-theme]
    .Modal:has(canvas[alt="二维码"])
    .Modal-content
    > div
    > div
    > div
    > div:nth-last-child(2) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:first-child,
  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:has(> svg + div)
    > svg
    + div {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:has(> svg + div) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:has(> svg + div)
    > svg {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:last-child,
  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:last-child
    div {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:last-child
    a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Editable-videoModal .Modal-inner,
  html[data-zb-theme] .Editable-videoModal .Modal-content {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Editable-videoModal-title,
  html[data-zb-theme] .Editable-videoModal-uploader-text {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Editable-videoModal-uploader {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .Editable-videoModal-uploader:hover {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Editable-videoModal-uploader-icon {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Editable-videoModal-uploader-tip,
  html[data-zb-theme] .Editable-videoModal .Modal-footer,
  html[data-zb-theme] .Editable-videoModal .Modal-footer p {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .Editable-videoModal .Modal-footer {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .Editable-videoModal .Modal-footer a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Editable-videoModal .Modal-closeButton {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .VoteTypeSelectorPopover,
  html[data-zb-theme] .VoteTypeSelectorPopover > div > div {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .VoteTypeSelectorPopover > div > div:hover,
  html[data-zb-theme] .VoteTypeSelectorPopover > div > div:focus,
  html[data-zb-theme] .VoteTypeSelectorPopover > div > div:focus-within {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .CommentSetting-submenuBox,
  html[data-zb-theme] .RingSetting-submenuBox {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .CommentSetting-submenuBox > div {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .CommentSetting-submenuBox > div:hover,
  html[data-zb-theme] .CommentSetting-submenuBox > div:focus,
  html[data-zb-theme] .CommentSetting-submenuBox > div:focus-within {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .CommentSetting-submenuBox .ZDI--Check24 {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox > div:first-child,
  html[data-zb-theme] .RingSetting-submenuBox > div:nth-child(3) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox > div:first-child div {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox > div:first-child > div:first-child,
  html[data-zb-theme] .RingSetting-submenuBox > div:nth-child(3) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox > div:first-child svg {
    color: var(--zb-text-muted) !important;
    fill: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox .Input-wrapper {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox .Input-wrapper:focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox .Input-wrapper input {
    background-color: transparent !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img) {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img):hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img)
    > div:nth-child(2)
    > div:first-child
    > div:first-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img)
    > div:nth-child(2)
    > div:last-child {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img)
    > div:nth-child(2)
    > div:first-child
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img)
    > div:last-child {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .VoteTypeSelectorPopover
    > div
    > div
    > div:first-child
    > div:last-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .VoteTypeSelectorPopover
    > div
    > div
    > div:last-child:not(:first-child) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    .Modal-content
    > div
    > div:first-child {
    background-color: transparent !important;
    border: 0 !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    div:has(> input[type="text"]) {
    box-sizing: border-box !important;
    min-width: 0 !important;
    padding: 0 10px !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 4px !important;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    div:has(> input[type="text"]):focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    input[type="text"] {
    box-sizing: border-box !important;
    width: 100% !important;
    min-width: 0 !important;
    padding: 0 !important;
    background-color: transparent !important;
    border: 0 !important;
    outline: 0 !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    input[type="text"]::placeholder {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    .Modal-content
    > div
    > div:nth-child(2)
    > div:first-child {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    .Modal-content
    > div
    > div:nth-child(2)
    > div:first-child
    div {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    .Modal-content
    > div
    > div:nth-child(2)
    > div:first-child
    svg {
    color: var(--zb-text-muted) !important;
    fill: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    div:has(> div > input[placeholder^="请填写选项"])
    > div:first-child {
    background-color: var(--zb-surface-hover) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    div:has(> div > input[placeholder^="请填写选项"])
    > div:first-child
    div {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    .Modal-content
    div:has(> svg.ZDI--Plus24 + div) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    .Modal-content
    div:has(> svg.ZDI--Plus24 + div):hover {
    background-color: var(--zb-surface-hover) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    .Modal-content
    div:has(> svg.ZDI--Plus24 + div)
    :where(svg, div) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]:has(
      .Modal input[placeholder*="PK 标题"],
      .Modal input[placeholder*="投票 标题"]
    )
    body
    div:has(> svg + div > div:nth-child(8)):not(
      :has(> svg + div > div:nth-child(9))
    ) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    scrollbar-color: var(--ctp-overlay0) transparent;
  }

  html[data-zb-theme]:has(
      .Modal input[placeholder*="PK 标题"],
      .Modal input[placeholder*="投票 标题"]
    )
    body
    div:has(> svg + div > div:nth-child(8)):not(
      :has(> svg + div > div:nth-child(9))
    )
    > svg {
    color: var(--zb-surface) !important;
    fill: var(--zb-surface) !important;
  }

  html[data-zb-theme]:has(
      .Modal input[placeholder*="PK 标题"],
      .Modal input[placeholder*="投票 标题"]
    )
    body
    div:has(> svg + div > div:nth-child(8)):not(
      :has(> svg + div > div:nth-child(9))
    )
    > svg
    + div
    > div {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]:has(
      .Modal input[placeholder*="PK 标题"],
      .Modal input[placeholder*="投票 标题"]
    )
    body
    div:has(> svg + div > div:nth-child(8)):not(
      :has(> svg + div > div:nth-child(9))
    )
    > svg
    + div
    > div:hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Button--blue {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme] .Button--blue:hover {
    background-color: var(--zb-primary-hover) !important;
    border-color: var(--zb-primary-hover) !important;
  }

  /* Question page */
  html[data-zb-theme] .QuestionHeader,
  html[data-zb-theme] .QuestionHeader-content,
  html[data-zb-theme] .QuestionHeader-main,
  html[data-zb-theme] .QuestionHeader-side,
  html[data-zb-theme] .QuestionHeader-footer,
  html[data-zb-theme] .QuestionHeader-footer-inner,
  html[data-zb-theme] .QuestionHeader-footer-main {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionHeader {
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .QuestionHeader-title,
  html[data-zb-theme] .QuestionHeader-title a,
  html[data-zb-theme] .QuestionHeader-detail,
  html[data-zb-theme] .QuestionHeader-detail .RichText,
  html[data-zb-theme] .QuestionHeader .NumberBoard-itemValue {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionHeader .NumberBoard-itemName,
  html[data-zb-theme] .QuestionHeader .QuestionFollowStatus-counts,
  html[data-zb-theme] .QuestionHeader .QuestionFollowStatus-counts div,
  html[data-zb-theme] .QuestionHeader .QuestionHeaderActions-label {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .QuestionHeader .NumberBoard-item {
    border-radius: 8px !important;
  }

  html[data-zb-theme] .QuestionHeader .QuestionFollowStatus-counts {
    column-gap: 8px !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .QuestionFollowStatus-counts
    .NumberBoard-itemInner {
    border-left-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .QuestionHeader .NumberBoard-item.Button:hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .NumberBoard-item.Button:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .QuestionHeader .QuestionFollowStatus-people {
    padding-right: 8px !important;
    padding-left: 8px !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme] .QuestionHeader .QuestionFollowStatus-people:hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .QuestionFollowStatus-people:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  /* Latest-progress cards use generated class names and receive analytics
     attributes during hydration. Anchor to the server-rendered semantic icon
     so the title color applies on the first paint instead of after hydration. */
  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a
    > div:last-child,
  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a
    > div:last-child
    :where(div, span) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a
    > div:last-child
    svg {
    color: var(--zb-text-muted) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a:is(:hover, :focus-visible)
    > div:last-child,
  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a:is(:hover, :focus-visible)
    > div:last-child
    :where(div, span, svg) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a:focus-visible {
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  /* Question and answer page links follow semantic roles instead of Zhihu's
     native blue palette. Keep identity links calm, metadata subdued, and
     reserve the accent color for topics, content links, and interaction. */
  html[data-zb-theme] .QuestionHeader-topics :is(a, .TopicLink, .Tag-content),
  html[data-zb-theme]
    .QuestionHeader-topics
    :is(a, .TopicLink, .Tag-content)
    :where(span, div) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionHeader-topics
    :is(a, .TopicLink, .Tag-content):hover,
  html[data-zb-theme]
    .QuestionHeader-topics
    :is(a, .TopicLink, .Tag-content):hover
    :where(span, div) {
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"]) {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 10px !important;
    box-shadow: var(--zb-shadow) !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    > svg {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a {
    box-sizing: border-box !important;
    width: calc(100% - 12px) !important;
    margin-right: 6px !important;
    margin-left: 6px !important;
    background-color: transparent !important;
    border-radius: 6px !important;
    color: var(--zb-text) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a:focus-visible {
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a
    > div:first-of-type {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a
    > div:last-of-type {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a
    > svg:first-child {
    color: var(--zb-warning) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a
    > svg:last-child {
    color: var(--zb-text-muted) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(
      .BrandQuestionSymbol-brandLink,
      .BrandQuestionSymbol-name,
      .AuthorInfo-name a,
      .UserLink-link
    ) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(
      .BrandQuestionSymbol-brandLink,
      .BrandQuestionSymbol-name,
      .AuthorInfo-name a,
      .UserLink-link
    ):hover {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-time, .ContentItem-time a) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-time
    a:hover {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.RichText, .RichContent-inner)
    a:not(.UserLink-link):not(.TopicLink):not(.LinkCard):not(.tag),
  html[data-zb-theme] .QuestionHeader-detail .RichText a,
  html[data-zb-theme] .QuestionPage a.RichContent-EntityWord {
    color: var(--zb-primary) !important;
    text-decoration-color: transparent !important;
    text-decoration-thickness: 1px !important;
    text-underline-offset: 2px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.RichText, .RichContent-inner)
    a:not(.UserLink-link):not(.TopicLink):not(.LinkCard):not(.tag):hover,
  html[data-zb-theme]
    .QuestionPage
    :is(.RichText, .RichContent-inner)
    a:not(.UserLink-link):not(.TopicLink):not(.LinkCard):not(.tag):focus-visible,
  html[data-zb-theme] .QuestionHeader-detail .RichText a:hover,
  html[data-zb-theme] .QuestionHeader-detail .RichText a:focus-visible,
  html[data-zb-theme] .QuestionPage a.RichContent-EntityWord:hover,
  html[data-zb-theme] .QuestionPage a.RichContent-EntityWord:focus-visible {
    color: var(--zb-primary-hover) !important;
    text-decoration: underline !important;
    text-decoration-color: currentColor !important;
    text-decoration-thickness: 1px !important;
    text-underline-offset: 2px !important;
  }

  html[data-zb-theme] .QuestionPage .RichText a.LinkCard {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    text-decoration: none !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .RichText
    a.LinkCard:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme] .QuestionPage .RichText .LinkCard-title {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionPage .RichText .LinkCard-desc {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .QuestionPage .RichText .LinkCard-image {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme] .QuestionPage .RichText .LinkCard .tag {
    background-color: var(--zb-primary-soft) !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme] .QuestionPage .RichText table {
    border: 1px solid var(--zb-border) !important;
    border-collapse: separate !important;
    border-spacing: 0 !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .QuestionPage .RichText :is(th, td) {
    background-color: transparent !important;
    border: 0 !important;
    border-right: 1px solid var(--zb-border) !important;
    border-bottom: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionPage .RichText th {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionPage .RichText tr > :last-child {
    border-right: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .RichText
    tbody
    tr:last-child
    > td {
    border-bottom: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    div:has(
      > div
        > a[href*="zhida_source=below_banner_question"]
    ) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    border-radius: 12px !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a[href*="zhida_source=below_banner_question"] {
    border-radius: 6px !important;
    color: var(--zb-text-secondary) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a[href*="zhida_source=below_banner_question"]
    > p {
    color: inherit !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a[href*="zhida_source=below_banner_question"]:is(
      :hover,
      :focus-visible
    ) {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-primary) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a[href*="zhida_source=below_banner_question"]:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a[href*="zhida_source=below_banner_question"]
    :is(svg, path) {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
    stroke: currentColor !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(
      .BrandQuestionSymbol-brandLink,
      .AuthorInfo-name a,
      .UserLink-link,
      .ContentItem-time a,
      .QuestionHeader-topics a,
      .RelatedQuestions-item a,
      .NumberBoard-item
    ):focus-visible {
    color: var(--zb-primary) !important;
    outline: 2px solid var(--zb-primary) !important;
    outline-offset: 2px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .BrandQuestionSymbol-brandLink:is(:hover, :focus-visible)
    .BrandQuestionSymbol-name {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .QuestionPage img.Avatar {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem .AuthorInfo, .AnswerAuthor)
    img.Avatar {
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AuthorInfo
    .UserLink:focus-visible {
    border-radius: 6px !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .QuestionHeader-footer .Button:not(.Button--blue),
  html[data-zb-theme] .QuestionHeaderActions .Button:not(.Button--blue) {
    background-color: transparent !important;
    border-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .QuestionHeader-footer .Button:not(.Button--blue):hover,
  html[data-zb-theme] .QuestionHeaderActions .Button:not(.Button--blue):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    :is(.FollowButton, .WriteAnswerButton),
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    :is(.FollowButton, .WriteAnswerButton) {
    min-height: 34px !important;
    border-radius: 6px !important;
    font-weight: 500 !important;
  }

  html[data-zb-theme] .QuestionHeader .FollowButton.Button--blue,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    .FollowButton.Button--blue {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme] .QuestionHeader .FollowButton.Button--blue:hover,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    .FollowButton.Button--blue:hover {
    background-color: var(--zb-primary-hover) !important;
    border-color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme] .QuestionHeader .WriteAnswerButton,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    .WriteAnswerButton {
    background-color: transparent !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .QuestionHeader .WriteAnswerButton:hover,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    .WriteAnswerButton:hover {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary-hover) !important;
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme] .QuestionHeader .FollowButton.Button--grey,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    .FollowButton.Button--grey {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .FollowButton.Button--grey:is(:hover, :focus-visible),
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    .FollowButton.Button--grey:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    :is(.FollowButton, .WriteAnswerButton):focus-visible,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    :is(.FollowButton, .WriteAnswerButton):focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .FollowButton.Button--grey:focus-visible,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    .FollowButton.Button--grey:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-danger-soft) !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    :is(.FollowButton, .WriteAnswerButton)
    svg,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    :is(.FollowButton, .WriteAnswerButton)
    svg {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .QuestionHeader-footer-main {
    column-gap: 12px !important;
  }

  html[data-zb-theme] .QuestionHeader-footer .QuestionButtonGroup {
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
  }

  html[data-zb-theme] .QuestionHeader-footer .QuestionButtonGroup .Button {
    min-height: 34px !important;
    margin: 0 !important;
    font-size: 14px !important;
    line-height: 32px !important;
  }

  html[data-zb-theme] .QuestionHeader-footer .QuestionHeaderActions {
    align-items: center !important;
    gap: 4px !important;
  }

  html[data-zb-theme] .QuestionHeader-footer .QuestionHeaderActions > * {
    margin: 0 !important;
  }

  html[data-zb-theme] .QuestionHeader-footer .QuestionHeaderActions .Button {
    box-sizing: border-box !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-height: 34px !important;
    margin: 0 !important;
    padding: 0 10px !important;
    border: 1px solid transparent !important;
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 32px !important;
  }

  html[data-zb-theme]
    .QuestionHeader-footer
    .QuestionHeaderActions
    .Button--iconOnly {
    width: 34px !important;
    padding: 0 !important;
  }

  html[data-zb-theme]
    .QuestionHeader-footer
    .QuestionHeaderActions
    .Button
    svg {
    width: 16px !important;
    height: 16px !important;
    margin-right: 6px !important;
    color: inherit !important;
    fill: currentColor !important;
    flex: 0 0 16px !important;
  }

  html[data-zb-theme]
    .QuestionHeader-footer
    .QuestionHeaderActions
    .Button--iconOnly
    svg {
    margin-right: 0 !important;
  }

  html[data-zb-theme] .PageHeader .QuestionHeader-title {
    font-size: 22px !important;
    font-weight: 600 !important;
    line-height: 32px !important;
  }

  html[data-zb-theme][data-zb-question-content-under-header="true"]
    .AppHeader:has(.PageHeader.is-shown) {
    box-shadow:
      0 10px 0 var(--zb-page),
      var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    :is(.FollowButton, .WriteAnswerButton)
    svg {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard-title,
  html[data-zb-theme] .Question-sideColumn .HotSearchCard-item > a,
  html[data-zb-theme] .Question-sideColumn .HotSearchCard-itemText,
  html[data-zb-theme] .Question-sideColumn .HotSearchCard-itemText a {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard {
    border-radius: 12px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard-heat {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard-item:hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard-item,
  html[data-zb-theme] .Question-sideColumn .HotSearchCard-itemLink {
    border-radius: 10px !important;
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard-item {
    box-sizing: border-box !important;
    margin: 6px -8px !important;
    padding: 6px 8px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard-itemLink {
    min-width: 0 !important;
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard-tag {
    box-sizing: border-box !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex: 0 0 auto !important;
    width: auto !important;
    min-width: 24px !important;
    padding: 0 5px !important;
    white-space: nowrap !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .HotSearchCard-itemLink:focus-visible {
    color: var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .HotSearchCard-item:focus-within {
    background-color: var(--zb-surface-raised) !important;
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .HotSearchCard-item:hover
    .HotSearchCard-itemText,
  html[data-zb-theme]
    .Question-sideColumn
    .HotSearchCard-item:hover
    .HotSearchCard-itemText
    :where(a, span),
  html[data-zb-theme]
    .Question-sideColumn
    .HotSearchCard-item:focus-within
    .HotSearchCard-itemText,
  html[data-zb-theme]
    .Question-sideColumn
    .HotSearchCard-item:focus-within
    .HotSearchCard-itemText
    :where(a, span) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    :is(.RelatedQuestions-item, .RelatedQuestions-listItem)
    :is(a, span) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .RelatedQuestions
    a[href^="/question/"] {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    :is(.RelatedQuestions-item, .RelatedQuestions-listItem):hover
    :is(a, span),
  html[data-zb-theme]
    .Question-sideColumn
    .RelatedQuestions
    a[href^="/question/"]:is(:hover, :focus-visible) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    :is(.AnswerAuthor, .NumberBoard)
    .NumberBoard-item {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor
    .NumberBoard-itemName {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor
    .NumberBoard-itemValue {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor
    .NumberBoard-item {
    border-radius: 8px !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor
    .NumberBoard-item:hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor
    .NumberBoard-item:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    :is(.AnswerAuthor, .NumberBoard)
    .NumberBoard-item:hover
    .NumberBoard-itemValue {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) {
    background-color: var(--zb-surface) !important;
    background-clip: padding-box !important;
    padding-right: 16px !important;
    padding-left: 16px !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) .Avatar {
    top: -8px !important;
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-surface) !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) div:has(> .Avatar) {
    padding-bottom: 21px !important;
    border-bottom-color: var(--zb-border) !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) .HoverCard-description {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) .UserLink-link {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .UserLink-link:is(:hover, :focus-visible) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .NumberBoard-itemName {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .NumberBoard-itemValue {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .NumberBoard-item:hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) .HoverCard-buttons {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) .HoverCard-buttons .Button {
    box-sizing: border-box !important;
    min-width: 0 !important;
    width: auto !important;
    margin: 0 !important;
    border-radius: 6px !important;
    flex: 1 1 0 !important;
    font-weight: 500 !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) .NumberBoard-item {
    border-radius: 8px !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) .NumberBoard-item:hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .NumberBoard-item:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons
    .FollowButton.Button--blue {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons
    .FollowButton.Button--grey {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons
    .FollowButton.Button--grey:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons
    .Button:not(.FollowButton) {
    background-color: transparent !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons
    .Button:not(.FollowButton):is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary-hover) !important;
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons:has(> .Button:only-child)
    > .Button.Button--blue {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons:has(> .Button:only-child)
    > .Button.Button--grey {
    position: relative !important;
    height: 34px !important;
    min-height: 34px !important;
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons:has(> .Button:only-child)
    > .Button.Button--grey:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: transparent !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons:has(> .Button:only-child)
    > .Button.Button--grey:is(:hover, :focus-visible)::after {
    content: "取消关注" !important;
    position: absolute !important;
    inset: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: var(--zb-danger) !important;
    font-size: 14px !important;
    line-height: normal !important;
  }

  html[data-zb-theme] .AnswerList .List-headerOptions .Button,
  html[data-zb-theme] .AnswerList .Select-button {
    background-color: transparent !important;
    border-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .AnswerList .List-headerOptions .Button:hover,
  html[data-zb-theme] .AnswerList .Select-button:hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .AnswersNavWrapper
    .List-headerOptions
    .Select-button {
    box-sizing: border-box !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-height: 34px !important;
    padding-inline: 12px !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 32px !important;
    transition:
      background-color 160ms ease,
      border-color 160ms ease,
      color 160ms ease !important;
  }

  html[data-zb-theme]
    .AnswersNavWrapper
    .List-headerOptions
    .Select-button:hover,
  html[data-zb-theme]
    .AnswersNavWrapper
    .List-headerOptions
    .Select-button:focus-visible,
  html[data-zb-theme]
    .AnswersNavWrapper
    .List-headerOptions
    .Select-button[aria-expanded="true"] {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .AnswersNavWrapper
    .List-headerOptions
    .Select-button:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .AnswersNavWrapper
    .List-headerOptions
    .Select-button
    svg {
    width: 14px !important;
    height: 14px !important;
    margin-left: 6px !important;
    color: inherit !important;
    fill: currentColor !important;
    flex: 0 0 14px !important;
  }

  html[data-zb-theme] .Select-option {
    background-color: transparent !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Select-option:hover,
  html[data-zb-theme] .Select-option.is-selected,
  html[data-zb-theme] .Select-option[aria-selected="true"] {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Question-sideColumn {
    min-width: 0 !important;
  }

  html[data-zb-theme]
    .Question-mainColumn
    :is(.AnswerCard, .ViewAll, .MoreAnswers) {
    background-clip: padding-box !important;
    border-radius: 12px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .Question-mainColumn
    .ViewAll
    :is(a, .Button) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Question-mainColumn
    .ViewAll
    :is(a, .Button):is(:hover, :focus-visible) {
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:not(.VoteButton) {
    box-sizing: border-box !important;
    min-height: 28px !important;
    padding: 4px 6px !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    body
    .QuestionPage
    .AnswerItem
    .ContentItem-expandButton.Button {
    display: block !important;
    box-sizing: border-box !important;
    width: max-content !important;
    min-height: 28px !important;
    margin: 8px auto 0 !important;
    padding: 3px 8px !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    -webkit-text-fill-color: var(--zb-primary) !important;
    font-size: 14px !important;
    line-height: 22px !important;
  }

  html[data-zb-theme]
    body
    .QuestionPage
    .AnswerItem
    .ContentItem-expandButton.Button:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    -webkit-text-fill-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    body
    .QuestionPage
    .AnswerItem
    .ContentItem-expandButton.Button:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .QuestionPage .VoteButton {
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .RichContent-actions.is-fixed {
    box-sizing: border-box !important;
    background-clip: padding-box !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:not(.VoteButton):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:not(.VoteButton):focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-actions, .RichContent-actions)
    .Button[aria-label="收藏"]:is(:hover, :focus-visible)
    .Zi--Star,
  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-actions, .RichContent-actions)
    .Button[aria-label="已收藏"]
    .Zi--Star {
    color: var(--zb-warning) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:has(:is(.Zi--HeartFill, .ZDI--HeartFill24))
    svg,
  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:has(:is(.Zi--Heart, .Zi--HeartFill, .ZDI--HeartFill24)):is(
      :hover,
      :focus-visible,
      .Button--red,
      .is-active,
      [aria-label="取消喜欢"],
      [aria-pressed="true"]
    )
    svg {
    color: var(--zb-danger) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .Question-mainColumn .AnswersNavWrapper,
  html[data-zb-theme] .Question-mainColumn .AnswersNavWrapper > .List {
    background-color: transparent !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    overflow: visible !important;
  }

  html[data-zb-theme]
    .Question-mainColumn
    .AnswersNavWrapper
    .List-header {
    box-sizing: border-box !important;
    width: 100% !important;
    min-height: 50px !important;
    margin: 0 0 10px !important;
    padding: 0 20px !important;
    background-color: var(--zb-surface) !important;
    border: 0 !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .Question-mainColumn
    .AnswersNavWrapper
    .List-item {
    margin-bottom: 10px !important;
    background-color: var(--zb-surface) !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .Question-mainColumn
    .AnswersNavWrapper
    .List-item::after {
    display: none !important;
  }

  html[data-zb-theme] .Question-mainColumn .MoreAnswers .List-header {
    margin-bottom: 8px !important;
  }

  html[data-zb-theme] .Question-mainColumn .MoreAnswers .List-headerText {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Question-mainColumn
    .MoreAnswers
    :is(.List-header, .List-item)::after {
    border-bottom-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .Question-sideColumn .AnswerAuthor .Card-section::after {
    border-bottom-color: var(--zb-border) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)
    .FollowButton {
    min-height: 34px !important;
    border-radius: 6px !important;
    font-weight: 500 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)
    .FollowButton.Button--blue {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)
    .FollowButton.Button--blue:hover {
    background-color: var(--zb-primary-hover) !important;
    border-color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)
    .FollowButton.Button--grey {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)
    .FollowButton.Button--grey:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)
    .FollowButton.Button--blue:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)
    .FollowButton.Button--grey:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-danger-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)
    .FollowButton
    svg {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor-buttons
    .Button:not(.FollowButton) {
    min-height: 34px !important;
    background-color: transparent !important;
    border-color: var(--zb-primary) !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    font-weight: 500 !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor-buttons
    .Button:not(.FollowButton):hover {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary-hover) !important;
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor-buttons
    .Button:not(.FollowButton):focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor-buttons
    .Button:not(.FollowButton)
    svg {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    > div[style*="position: sticky"][style*="overflow: auto"] {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    > div[style*="position: sticky"][style*="overflow: auto"]::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }

  html[data-zb-theme] .Question-sideColumn :is(.Footer, footer) {
    box-sizing: border-box !important;
    width: 100% !important;
    max-width: 100% !important;
    color: var(--zb-text-muted) !important;
    overflow-x: hidden !important;
    overflow-wrap: anywhere !important;
  }

  html[data-zb-theme] .Question-sideColumn .Footer a,
  html[data-zb-theme] .Question-sideColumn .Footer-item,
  html[data-zb-theme] .Question-sideColumn .Footer-copyright,
  html[data-zb-theme] .Question-sideColumn .Footer-certificate,
  html[data-zb-theme] .Question-sideColumn .Footer-zhihuIntegrity {
    max-width: 100% !important;
    color: var(--zb-text-muted) !important;
    white-space: normal !important;
    overflow-wrap: anywhere !important;
  }

  html[data-zb-theme] .Question-sideColumn .Footer a:hover,
  html[data-zb-theme] .Question-sideColumn .Footer a:focus-visible,
  html[data-zb-theme]
    .Question-sideColumn
    .Footer
    a:is(:hover, :focus-visible)
    :where(span, svg),
  html[data-zb-theme]
    .Question-sideColumn
    footer
    a:is(:hover, :focus-visible)
    :where(span, svg) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    footer
    :where(a, button, div, span, p, svg) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .Question-sideColumn footer :where(a, button):hover {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    footer
    :where(a, button):is(:hover, :focus-visible),
  html[data-zb-theme]
    .Question-sideColumn
    footer
    :where(a, button):is(:hover, :focus-visible)
    :where(span, div, svg) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .CornerButton {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .CornerButton:hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .CornerButton svg {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .Comments-container::before,
  html[data-zb-theme] .Comments-container::after {
    content: none !important;
    display: none !important;
  }

  html[data-zb-theme]
    .ContentItem-action:has(.ZDI--ChatBubbleFill24)::after {
    border: 0 !important;
    content: none !important;
    display: none !important;
  }

  html[data-zb-theme] .QuestionPage .RichContent--hasHotComment {
    padding-bottom: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a:is([href*="/people/"], [href*="/org/"]):not(:has(img.Avatar)),
  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    a:is([href*="/people/"], [href*="/org/"]):not(:has(img.Avatar)) {
    color: var(--zb-primary) !important;
    cursor: pointer !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a:is([href*="/people/"], [href*="/org/"]):not(:has(img.Avatar)):is(
      :hover,
      :focus-visible
    ),
  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    a:is([href*="/people/"], [href*="/org/"]):not(:has(img.Avatar)):is(
      :hover,
      :focus-visible
    ) {
    background-color: transparent !important;
    color: var(--zb-primary-hover) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .List-item:has(.Comments-container) {
    overflow: clip !important;
  }

  html[data-zb-theme]
    .QuestionPage
    img:is(.lazy, .origin_image.zh-lightbox-thumb) {
    animation: none !important;
    opacity: 1 !important;
    transition: none !important;
  }

  html[data-zb-theme] .Comments-container,
  html[data-zb-theme] .Comments-container > div {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Comments-container {
    border: 0 !important;
    border-radius: 8px !important;
    box-shadow: none !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .Comments-container > div:first-child {
    border: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    outline: 0 !important;
    padding-bottom: 0 !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:has(.InputLike.Editable) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:first-child:has(.InputLike.Editable) {
    bottom: 0 !important;
    border-top: 0 !important;
    box-shadow: 0 -6px 12px
      color-mix(in srgb, var(--ctp-crust) 14%, transparent) !important;
    margin-bottom: 0 !important;
    margin-inline: -20px !important;
    order: 100 !important;
    padding: 10px 20px !important;
    position: sticky !important;
    top: auto !important;
    transform: none !important;
    z-index: 3 !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:first-child:has(.InputLike.Editable)
    > div:first-child {
    margin-bottom: 0 !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:has(.InputLike.Editable):not(:has([data-id])):not(:first-child) {
    display: none !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2) {
    border: 1px solid var(--zb-border-strong) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:has(> .ZDI--ArrowRightSmall24) {
    border-radius: 6px !important;
    box-sizing: border-box !important;
    color: var(--zb-text-muted) !important;
    cursor: pointer !important;
    margin: 10px auto !important;
    min-height: 44px !important;
    padding: 6px 10px !important;
    width: fit-content !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:has(> .ZDI--ArrowRightSmall24)::before {
    border: 0 !important;
    content: none !important;
    display: none !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:has(> .ZDI--ArrowRightSmall24):is(
      :hover,
      :focus-within,
      :active
    ) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child {
    border-bottom-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child
    > div:first-child
    :where(div, span) {
    color: var(--zb-text-muted) !important;
    opacity: 1 !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child
    > div:last-child
    > div {
    background-color: transparent !important;
    border-radius: 4px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child
    > div:last-child
    > .css-m0zh86,
  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child
    > div:last-child
    > div:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    font-weight: 600 !important;
  }

  html[data-zb-theme] .Comments-container .CommentContent {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Comments-container
    a:not(:has(img.Avatar)) {
    color: var(--zb-primary) !important;
    cursor: pointer !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    .Comments-container
    .Button:not(.Button--blue) {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
    cursor: pointer !important;
  }

  html[data-zb-theme]
    .Comments-container
    .Button:is(.Button--withLabel, .Button--secondary) {
    box-sizing: border-box !important;
    border-radius: 6px !important;
    color: var(--zb-text-secondary) !important;
    min-height: 32px !important;
    padding-inline: 10px !important;
  }

  html[data-zb-theme]
    .Comments-container
    .Button:is(.Button--withLabel, .Button--secondary):is(
      :hover,
      :focus-visible
    ) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    outline-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Comments-container
    .Button:is(.Button--withLabel, .Button--secondary):is(
      :hover,
      :focus-visible
    )
    svg {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Comments-container
    .Button:has(:is(.Zi--Heart, .Zi--HeartFill, .ZDI--HeartFill24)):is(
      :hover,
      :focus-visible,
      .Button--red,
      .is-active,
      [aria-label="取消喜欢"],
      [aria-pressed="true"]
    )
    svg {
    color: var(--zb-danger) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .Comments-container [data-id] {
    border-bottom: 1px solid var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .Comments-container [data-id] [data-id] {
    border-bottom-color: transparent !important;
    position: relative !important;
  }

  html[data-zb-theme] .Comments-container [data-id] [data-id]::before {
    border-top: 1px solid var(--zb-border-strong) !important;
    content: "" !important;
    left: 34px !important;
    position: absolute !important;
    right: 0 !important;
    top: 0 !important;
  }

  html[data-zb-theme] .Comments-container img.Avatar {
    background-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div > div > .InputLike.Editable) {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div > div > .InputLike.Editable)
    > div:first-child {
    border-radius: 6px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .Comments-container .InputLike.Editable {
    background-color: var(--zb-surface) !important;
    border-color: transparent !important;
    border-radius: 6px !important;
    box-sizing: border-box !important;
    color: var(--zb-text) !important;
    padding-inline: 8px !important;
  }

  html[data-zb-theme]
    .Comments-container
    :is(.Editable-content, .DraftEditor-root, .DraftEditor-editorContainer, .public-DraftEditor-content) {
    background-color: transparent !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Comments-container
    :is(.public-DraftEditorPlaceholder-root, .public-DraftEditorPlaceholder-inner) {
    background-color: transparent !important;
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme]
    .Comments-container
    .InputLike.Editable:focus-within {
    border-color: transparent !important;
    box-shadow: none !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div > div > .InputLike.Editable:focus-within) {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .Comments-container
    :is(
      .Skeleton,
      [class*="skeleton" i],
      .PlaceHolder,
      .PlaceHolder-inner,
      [class*="placeholder" i]:not([class*="DraftEditorPlaceholder"]),
      [aria-busy="true"]
    ) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .Comments-container .PlaceHolder-bg {
    background: linear-gradient(
      to right,
      var(--zb-surface-raised) 0%,
      var(--zb-surface-hover) 20%,
      var(--zb-surface-raised) 40%,
      var(--zb-surface-raised) 100%
    ) !important;
  }

  html[data-zb-theme]
    .Comments-container
    :is(.PlaceHolder-mask, .PlaceHolder-mask path) {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div + svg[width="656"][height="44"]) {
    background-color: var(--zb-surface) !important;
    color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div + svg[width="656"][height="44"])
    > div:first-child {
    background: linear-gradient(
      to right,
      var(--zb-surface-raised) 0%,
      var(--zb-surface-hover) 20%,
      var(--zb-surface-raised) 40%,
      var(--zb-surface-raised) 100%
    ) !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div + svg[width="656"][height="44"])
    > svg,
  html[data-zb-theme]
    .Comments-container
    div:has(> div + svg[width="656"][height="44"])
    > svg
    path {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(
      > .BounceLoading[style*="width: 60px"][style*="height: 18px"]
    ) {
    background-color: var(--zb-surface) !important;
    border: 0 !important;
    box-shadow: none !important;
    color: var(--zb-text-muted) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .Comments-container .BounceLoading {
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
  }

  html[data-zb-theme] .Comments-container .BounceLoading-child {
    background-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Comments-container
    button:has(.ZDI--ArrowUpSmall24)
    > span:has(.ZDI--ArrowUpSmall24),
  html[data-zb-theme] .Comments-container .ZDI--ArrowUpSmall24 {
    display: none !important;
  }

  html[data-zb-theme] .Modal-content:has(.CommentContent) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Modal-content:has(.CommentContent) {
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    > div
    > div:first-child
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    > div
    > div:first-child
    > div:last-child
    > div {
    background-color: transparent !important;
    border-radius: 4px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    > div
    > div:first-child
    > div:last-child
    > .css-m0zh86 {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    font-weight: 600 !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    > div
    > div:first-child
    > div:first-child {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    > div
    > div:first-child
    > div:first-child
    :where(div, span) {
    color: inherit !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    > div:has(> div:nth-child(2) > div:nth-child(3) [data-id])
    > div:first-child
    > div:only-child {
    box-sizing: border-box !important;
    padding: 4px 8px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    > div
    > div:nth-child(2):has(> div:nth-child(3) [data-id])
    > div:nth-child(2)
    > div:only-child {
    color: var(--zb-text-muted) !important;
    opacity: 1 !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    > div
    > div:first-child
    > div:last-child
    > div:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .CommentContent {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    a:not(:has(img.Avatar)) {
    color: var(--zb-primary) !important;
    cursor: pointer !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .Button:not(.Button--blue) {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
    cursor: pointer !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .Button:is(.Button--withLabel, .Button--secondary) {
    box-sizing: border-box !important;
    border-radius: 6px !important;
    color: var(--zb-text-secondary) !important;
    min-height: 32px !important;
    padding-inline: 10px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .Button:is(.Button--withLabel, .Button--secondary):is(
      :hover,
      :focus-visible
    ) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    outline-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .Button:is(.Button--withLabel, .Button--secondary):is(
      :hover,
      :focus-visible
    )
    svg {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .Button:has(:is(.Zi--Heart, .Zi--HeartFill, .ZDI--HeartFill24)):is(
      :hover,
      :focus-visible,
      .Button--red,
      .is-active,
      [aria-label="取消喜欢"],
      [aria-pressed="true"]
    )
    svg {
    color: var(--zb-danger) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    [data-id] {
    border-bottom: 1px solid var(--zb-border-strong) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    [data-id]
    > div:first-child {
    animation: none !important;
    background-color: transparent !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    [data-id]
    [data-id] {
    border-bottom-color: transparent !important;
    position: relative !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    [data-id]
    [data-id]::before {
    border-top: 1px solid var(--zb-border-strong) !important;
    content: "" !important;
    left: 34px !important;
    position: absolute !important;
    right: 0 !important;
    top: 0 !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    img.Avatar {
    background-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    div:has(> div > div > .InputLike.Editable) {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    div:has(> div > div > .InputLike.Editable)
    > div:first-child {
    border-radius: 6px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .InputLike.Editable {
    background-color: var(--zb-surface) !important;
    border-color: transparent !important;
    border-radius: 6px !important;
    box-sizing: border-box !important;
    color: var(--zb-text) !important;
    padding-inline: 8px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .Button.Button--primary {
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    :is(.Editable-content, .DraftEditor-root, .DraftEditor-editorContainer, .public-DraftEditor-content) {
    background-color: transparent !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .InputLike.Editable:focus-within {
    border-color: transparent !important;
    box-shadow: none !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    div:has(> div > div > .InputLike.Editable:focus-within) {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    div[data-zb-comment-composer-collapsed]
    > div:nth-child(2) {
    display: none !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    :is(.public-DraftEditorPlaceholder-root, .public-DraftEditorPlaceholder-inner) {
    background-color: transparent !important;
    color: var(--zb-text-subtle) !important;
  }

  /* Keep the comment theme active while sorting temporarily unmounts CommentContent. */
  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:first-child
    > div:first-child {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:first-child
    > div:first-child
    :where(div, span) {
    color: inherit !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:first-child
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:first-child
    > div:last-child
    > div {
    background-color: transparent !important;
    border-radius: 4px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:first-child
    > div:last-child
    > .css-m0zh86 {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    font-weight: 600 !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:nth-child(2)
    :is(
      .Skeleton,
      [class*="skeleton" i],
      .PlaceHolder,
      .PlaceHolder-inner,
      [class*="placeholder" i]:not([class*="DraftEditorPlaceholder"]),
      [class*="loading" i],
      [aria-busy="true"]
    ) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:nth-child(2)
    .PlaceHolder-bg {
    background: linear-gradient(
      to right,
      var(--zb-surface-raised) 0%,
      var(--zb-surface-hover) 20%,
      var(--zb-surface-raised) 40%,
      var(--zb-surface-raised) 100%
    ) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:nth-child(2)
    :is(.PlaceHolder-mask, .PlaceHolder-mask path) {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:nth-child(2)
    div:has(> div + svg[width="656"][height="44"]) {
    background-color: var(--zb-surface) !important;
    color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:nth-child(2)
    div:has(> div + svg[width="656"][height="44"])
    > div:first-child {
    background: linear-gradient(
      to right,
      var(--zb-surface-raised) 0%,
      var(--zb-surface-hover) 20%,
      var(--zb-surface-raised) 40%,
      var(--zb-surface-raised) 100%
    ) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:nth-child(2)
    div:has(> div + svg[width="656"][height="44"])
    > svg,
  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:nth-child(2)
    div:has(> div + svg[width="656"][height="44"])
    > svg
    path {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    img.Avatar {
    background-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    .comment_img {
    background-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .QuestionPage .AnswerFormPortalContainer,
  html[data-zb-theme] .QuestionPage .QuestionAnswers-statusWrapper,
  html[data-zb-theme] .QuestionPage .AnswerAdd,
  html[data-zb-theme] .QuestionPage .AnswerForm,
  html[data-zb-theme] .QuestionPage .AnswerFormEditorContainer,
  html[data-zb-theme] .QuestionPage .AnswerForm-editor {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionPage .AnswerFormEditorContainer {
    background-color: var(--zb-page) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer
    .Catalog
    > div:first-child
    > div:first-child {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer
    .Catalog
    > div:first-child
    > div:first-child
    :where(div, span, svg) {
    color: inherit !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer
    .Catalog
    .Catalog-Title {
    color: var(--zb-text-subtle) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer
    .Catalog
    .Catalog-Title
    > div {
    background-color: transparent !important;
    color: inherit !important;
    border-radius: inherit !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer
    .Catalog
    .Catalog-Title:is(:hover, :focus-within) {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer
    .Catalog
    .Catalog-Title::before {
    background-color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer
    .Catalog
    .Catalog-Title:is(:hover, :focus-within)::before {
    background-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer:has(.Catalog)
    .toolbarV3
    .ToolbarButton:has(.ZDI--Catalog24) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer:has(.Catalog)
    .toolbarV3
    .ToolbarButton:has(.ZDI--Catalog24)
    :where(div, span, svg) {
    color: inherit !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .QuestionAnswers-answerAdd
    > .AnswerAdd
    > div:first-child {
    background-color: var(--zb-surface) !important;
    border-bottom: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .QuestionAnswers-answerAdd
    > .AnswerAdd
    > div:first-child
    :where(div, span, button, svg) {
    color: inherit !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .QuestionAnswers-answerAdd
    > .AnswerAdd
    > div:nth-child(2) {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionPage .toolbarV3,
  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerFormPortalContainer, .AnswerForm)
    :is(.Sticky, .Editable-toolbar) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .QuestionPage .ToolbarButton,
  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerFormPortalContainer, .AnswerForm)
    :is(.Editable-control, .Button:not(.Button--blue)) {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .QuestionPage .ToolbarButton:hover,
  html[data-zb-theme] .QuestionPage .ToolbarButton:focus-visible,
  html[data-zb-theme] .QuestionPage .ToolbarButton.is-active,
  html[data-zb-theme] .QuestionPage .ToolbarButton[aria-pressed="true"],
  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerFormPortalContainer, .AnswerForm)
    :is(.Editable-control, .Button:not(.Button--blue)):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionPage .ToolbarDivider {
    background-color: var(--zb-border) !important;
  }

  html[data-zb-theme]
    .ToolbarV3Menu-container
    .Button
    > span:last-child {
    padding: 2px 6px !important;
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerForm-editor.InputLike.Editable,
  html[data-zb-theme] .QuestionPage .AnswerForm-editor {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    caret-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerForm-editor
    :is(.Editable-content, .DraftEditor-root, .DraftEditor-editorContainer, .public-DraftEditor-content) {
    background-color: transparent !important;
    color: var(--zb-text) !important;
    caret-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerForm-editor
    :is(.public-DraftEditorPlaceholder-root, .public-DraftEditorPlaceholder-inner) {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormEditorContainer
    > div:has([role="combobox"]) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormEditorContainer
    > div:has([role="combobox"])
    [role="combobox"] {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionPage .AIAssistantPanelV2-container,
  html[data-zb-theme] .QuestionPage .AIAssistantPanelV2-container > div {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:first-child {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:first-child
    > div:last-child
    > div
    > div:first-child
    :where(div, span, svg) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:first-child
    > div:last-child
    > div
    > :last-child {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:first-child
    > div:first-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:first-child
    > div:first-child
    :where(div, span, button, svg) {
    color: inherit !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:first-child {
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-primary) !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2) {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
    border-radius: 10px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    :where(div, span, svg, button) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    > div:first-child
    > div:first-child
    button {
    background-color: var(--zb-surface-hover) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    > div:first-child
    > div:first-child
    button:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    > div:first-child
    > div:first-child
    button
    :is(svg, path) {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    > div:first-child
    > div:nth-child(2) {
    padding: 8px 10px !important;
    background-color: var(--zb-surface) !important;
    border-left: 3px solid var(--zb-primary) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    > div:first-child
    > div:nth-child(3)
    > div {
    background-color: var(--zb-surface-hover) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 8px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    > div:first-child
    > div:nth-child(3)
    > div:is(:hover, :focus-within) {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    > div:first-child
    > div:nth-child(3)
    img {
    border-radius: inherit !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    > div:first-child
    > div:nth-child(4)
    > div {
    padding: 2px 6px !important;
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    border-radius: 999px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    .CircleLoadingBar
    .path {
    stroke: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:first-child
    > div:nth-child(2) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:first-child
    > div:last-child
    > div {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:first-child
    > div:last-child
    > div:is(:hover, :focus-within) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    div:has(> div > textarea[placeholder="请描述你想要配图的内容"])
    > div:first-child {
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-primary) !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    div:has(> textarea[placeholder="请描述你想要配图的内容"]) {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    border-radius: 10px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    div:has(
      > textarea[placeholder="请描述你想要配图的内容"]
    ):focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    textarea[placeholder="请描述你想要配图的内容"] {
    background-color: transparent !important;
    color: var(--zb-text) !important;
    caret-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    textarea[placeholder="请描述你想要配图的内容"]::placeholder {
    color: var(--zb-text-subtle) !important;
    opacity: 1 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    [role="button"][aria-label^="选择"] {
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid transparent !important;
    color: var(--zb-primary) !important;
    border-radius: 999px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    [role="button"][aria-label^="选择"]:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary-hover) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    div:has(> textarea[placeholder="请描述你想要配图的内容"])
    > div:last-child
    > div:last-child
    > div {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    div:has(> textarea[placeholder="请描述你想要配图的内容"])
    > div:last-child
    > div:last-child
    > div
    > div {
    color: inherit !important;
  }

  html[data-zb-theme]
    .Popover-content:has(.Menu-item > div > div:first-child:empty)
    .Menu-item
    > div
    > div:last-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Popover-content:has(.Menu-item > div > div:first-child:empty)
    .Menu-item:is(:hover, :focus-visible)
    > div
    > div:last-child {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .DraftHistoryModal .DraftHistory,
  html[data-zb-theme] .DraftHistoryModal .DraftHistory-side,
  html[data-zb-theme] .DraftHistoryModal .DraftHistory-main {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .DraftHistoryModal .DraftHistory-side {
    border-right: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme] .DraftHistoryModal .DraftHistory-title,
  html[data-zb-theme] .DraftHistoryModal .DraftHistory-versionDate {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .DraftHistoryModal
    .DraftHistory-history
    > div:not(:empty):is(:hover, :focus-within) {
    background-color: var(--zb-surface-hover) !important;
  }

  html[data-zb-theme]
    .DraftHistoryModal
    .DraftHistory-history
    .DraftHistory-versionDate[style*="rgb(23, 114, 246)"] {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .DraftHistoryModal .DraftHistory-draft {
    background-color: var(--zb-page) !important;
  }

  html[data-zb-theme]
    .DraftHistoryModal
    .PreviewEditableInstance.InputLike.Editable {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme]
    .DraftHistoryModal
    .PreviewEditableInstance
    :is(.Editable-content, .DraftEditor-root, .DraftEditor-editorContainer, .public-DraftEditor-content) {
    background-color: transparent !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .DraftHistoryModal .DraftHistory-actions {
    background-color: var(--zb-surface) !important;
    border-top: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .QuestionPage .EditorHelpDoc {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .QuestionPage .EditorHelpDoc > div {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .EditorHelpDoc
    :where(div, h1, h2, h3, p, span) {
    background-color: transparent !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .EditorHelpDoc
    :where(h1, h2, h3, p, div, span, svg) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionPage .EditorHelpDoc button {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 999px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .EditorHelpDoc
    button:is(:hover, :focus, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .EditorHelpDoc
    div:has(> svg.ZDI)
    > div:nth-child(n + 3) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 4px !important;
  }

  html[data-zb-theme] .Answers-select,
  html[data-zb-theme] .Answers-select .Select-option {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Answers-select {
    min-width: 116px !important;
    padding: 4px !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .Answers-select .Select-option {
    height: 34px !important;
    min-height: 34px !important;
    padding: 0 12px !important;
    border-radius: 4px !important;
    font-size: 14px !important;
    line-height: 34px !important;
  }

  html[data-zb-theme] .Answers-select .Select-option:hover,
  html[data-zb-theme] .Answers-select .Select-option:focus,
  html[data-zb-theme] .Answers-select .Select-option:focus-visible,
  html[data-zb-theme] .Answers-select .Select-option.is-selected,
  html[data-zb-theme] .Answers-select .Select-option[aria-selected="true"] {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .ShareMenu-content,
  html[data-zb-theme] .ShareMenu-menuItems,
  html[data-zb-theme] .ShareMenu-qrcodeBox {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .ShareMenu-button {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .ShareMenu-button:hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .ShareMenu-qrcodeSection {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .ShareMenu-divider {
    background-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .ShareMenu-qrcodeText {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-container
    .FollowButton.Button--blue {
    box-sizing: border-box !important;
    border: 1px solid var(--zb-primary) !important;
    border-radius: 999px !important;
    font-weight: 500 !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-container
    .FollowButton.Button--blue:hover {
    border-color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-container
    .FollowButton.Button--blue:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:not(.VoteButton) {
    box-sizing: border-box !important;
    min-height: 28px !important;
    padding: 4px 6px !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-more {
    box-sizing: border-box !important;
    min-height: 28px !important;
    padding: 3px 8px !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    font-size: 14px !important;
    line-height: 22px !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-more:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-more:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:not(.VoteButton):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:not(.VoteButton):focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button[aria-label="收藏"]:is(:hover, :focus-visible)
    .Zi--Star,
  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button[aria-label="已收藏"]
    .Zi--Star {
    color: var(--zb-warning) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:has(:is(.Zi--HeartFill, .ZDI--HeartFill24))
    svg,
  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:has(:is(.Zi--Heart, .Zi--HeartFill, .ZDI--HeartFill24)):is(
      :hover,
      :focus-visible
    )
    svg,
  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:is([aria-label="取消喜欢"], [aria-pressed="true"]):has(
      :is(.Zi--Heart, .Zi--HeartFill, .ZDI--HeartFill24)
    )
    svg {
    color: var(--zb-danger) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .VoteButton {
    background-color: var(--zb-primary-soft) !important;
    border-color: transparent !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .VoteButton:hover,
  html[data-zb-theme] .VoteButton[aria-pressed="true"],
  html[data-zb-theme] .VoteButton.is-active {
    background-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme] .ProfileSideCreator-analytics,
  html[data-zb-theme] .KfeCollection-CreateSaltCard-content {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .Topstory-container > .Topstory-mainColumn + *,
  html[data-zb-theme] [data-zb-home-sidebar] {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] [data-zb-home-sidebar] :where(div, span) {
    color: inherit !important;
  }

  html[data-zb-theme] .Topstory-container > .Topstory-mainColumn + * .Card > div {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    [data-za-detail-view-path-module="RightSideBar"]
    .Card,
  html[data-zb-theme]
    [data-za-detail-view-path-module="RightSideBar"]
    .Card
    > div {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Topstory-container > .Topstory-mainColumn + * .Card,
  html[data-zb-theme] [data-zb-home-sidebar] .Card,
  html[data-zb-theme] [aria-label="创作中心卡片"] {
    background-color: var(--zb-surface) !important;
    background-clip: padding-box !important;
    border-color: var(--zb-border) !important;
    border-radius: 12px !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme] [data-zb-home-sidebar] .CreatorEntrance-hint,
  html[data-zb-theme] [data-zb-home-sidebar] .ProfileSideCreator-readCountNumber,
  html[data-zb-theme] [data-zb-home-sidebar] .HotSearchCard-title,
  html[data-zb-theme] [data-zb-home-sidebar] .HotSearchCard-itemText,
  html[data-zb-theme] [data-zb-home-sidebar] .KfeCollection-CreateSaltCard-content-title {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] [data-zb-home-sidebar] .HotSearchCard-heat,
  html[data-zb-theme] [data-zb-home-sidebar] .KfeCollection-CreateSaltCard-content-sub-title {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    [data-zb-home-sidebar]
    .Card:has(.FollowButton)
    > div:has(> div > div > .FollowButton) {
    box-sizing: border-box !important;
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
  }

  html[data-zb-theme]
    [data-zb-home-sidebar]
    .Card:has(.FollowButton)
    > div:has(> div > div > .FollowButton)
    > div:has(.FollowButton) {
    box-sizing: border-box !important;
    flex: 0 0 100% !important;
    width: 100% !important;
    min-width: 100% !important;
    padding-right: 8px !important;
  }

  html[data-zb-theme] .HotSearchCard-tagHot {
    background-color: var(--zb-danger-soft) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme] .HotSearchCard-tagActivity {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .HotSearchCard-dot {
    background-color: var(--zb-warning) !important;
  }

  html[data-zb-theme]
    [role="dialog"]:is(
      :has(.OrgCreateButton),
      :has(a[href^="/term/"]),
      :has(a[href*="/certificates"]),
      :has(a[href="/question/19581624"])
    ) {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    scrollbar-color: var(--zb-text-subtle) transparent !important;
    scrollbar-width: thin !important;
  }

  html[data-zb-theme]
    div:has(> [role="dialog"][id^="react-aria-"]) {
    background-color: var(--zb-surface) !important;
    border: 0 !important;
    border-radius: 10px !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    div:has(> [role="dialog"][id^="react-aria-"])
    > svg {
    color: var(--zb-surface) !important;
    fill: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[width="26"][height="10"] + div) {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    box-shadow: var(--zb-shadow) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[width="26"][height="10"] + div)
    > svg {
    color: var(--zb-surface-raised) !important;
    fill: var(--zb-surface-raised) !important;
    filter: drop-shadow(0 1px 0 var(--zb-border-strong)) !important;
    left: 50% !important;
    margin-top: 4px !important;
    stroke: none !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[width="26"][height="10"] + div)
    > div {
    background-color: transparent !important;
    padding-block: 4px !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[width="26"][height="10"] + div)
    > svg
    + div {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
    opacity: 1 !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[width="26"][height="10"] + div)
    > div
    > div {
    background-color: transparent !important;
    border-radius: 4px !important;
    box-sizing: border-box !important;
    color: var(--zb-text-muted) !important;
    cursor: pointer !important;
    margin-inline: 4px !important;
    min-height: 36px !important;
    padding-inline: 10px !important;
    width: calc(100% - 8px) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[width="26"][height="10"] + div)
    > div
    > div:is(:hover, :focus, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    [role="dialog"]:is(
      :has(.OrgCreateButton),
      :has(a[href^="/term/"]),
      :has(a[href*="/certificates"]),
      :has(a[href="/question/19581624"])
    )
    > :where(a, div) {
    box-sizing: border-box !important;
    width: calc(100% - 12px) !important;
    margin-right: 6px !important;
    margin-left: 6px !important;
    background-color: transparent !important;
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    [role="dialog"]:is(
      :has(.OrgCreateButton),
      :has(a[href^="/term/"]),
      :has(a[href*="/certificates"]),
      :has(a[href="/question/19581624"])
    )
    > :where(a, div):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    [role="dialog"]:has(.OrgCreateButton)
    .OrgCreateButton {
    width: 100% !important;
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    color: inherit !important;
  }

  html[data-zb-theme]
    [role="dialog"]:has(.OrgCreateButton)
    .OrgCreateButton:hover {
    background-color: transparent !important;
    color: inherit !important;
  }

  html[data-zb-theme]
    [role="dialog"]:has(a[href*="/certificates"])
    > div:last-child {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme] blockquote {
    border-color: var(--ctp-lavender) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] pre,
  html[data-zb-theme] code,
  html[data-zb-theme] .highlight {
    background-color: var(--ctp-crust) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] hr {
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .LoadingBar {
    background-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    div:has(
      > .BounceLoading[style*="width: 60px"][style*="height: 18px"]
    ) {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    div:has(
      > .BounceLoading[style*="width: 60px"][style*="height: 18px"]
    )
    .BounceLoading-child {
    background-color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Skeleton,
  html[data-zb-theme] [class*="Skeleton"],
  html[data-zb-theme] .PlaceHolder,
  html[data-zb-theme] .PlaceHolder-inner {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme] .QuestionPage .PlaceHolder,
  html[data-zb-theme] .QuestionPage .PlaceHolder-inner {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme] .QuestionPage .PlaceHolder {
    border-radius: 12px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .QuestionPage .PlaceHolder-bg {
    background: linear-gradient(
      to right,
      var(--zb-surface-raised) 0%,
      var(--zb-surface-hover) 20%,
      var(--zb-surface-raised) 40%,
      var(--zb-surface-raised) 100%
    ) !important;
  }

  html[data-zb-theme] .QuestionPage .PlaceHolder-mask,
  html[data-zb-theme] .QuestionPage .PlaceHolder-mask path {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.LinkCard-title.loading, .LinkCard-desc.loading) {
    background-color: var(--zb-surface-raised) !important;
    border-radius: 4px !important;
  }

  html[data-zb-theme] .skeleton {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .skeleton__line {
    background: linear-gradient(
      to right,
      var(--zb-surface-raised) 0%,
      var(--zb-surface-hover) 25%,
      var(--zb-surface-hover) 75%,
      var(--zb-surface-raised) 100%
    ) !important;
  }

  html[data-zb-theme] .skeleton__line::after {
    background-color: color-mix(
      in srgb,
      var(--zb-surface-hover) 80%,
      transparent
    ) !important;
    box-shadow: 0 0 20px 20px
      color-mix(in srgb, var(--zb-surface-hover) 70%, transparent) !important;
  }

  html[data-zb-theme] .Topstory-mainColumnCard:empty {
    background-color: var(--zb-page) !important;
    box-shadow: none !important;
  }
`;

  const THEME_STORAGE_KEY = "zhihu-beautification:theme";
  const THEME_MODES = ["system", "latte", "frappe", "macchiato", "mocha"];

  const THEME_ATTRIBUTE = "data-zb-theme";
  const STYLE_ID = "zb-catppuccin-theme-style";
  const THEME_LABELS = {
    system: "跟随系统（Latte / Mocha）",
    latte: "Latte",
    frappe: "Frappé",
    macchiato: "Macchiato",
    mocha: "Mocha",
  };

  const isThemeMode = (value) => THEME_MODES.includes(value);

  const createThemeFeature = (browserWindow, settings) => {
    const browserDocument = browserWindow.document;
    const menuCommandIds = [];
    let mode;
    let started = false;

    const readMode = () => {
      try {
        const storedMode = settings?.getMode?.("system") ?? "system";
        return isThemeMode(storedMode) ? storedMode : "system";
      } catch {
        return "system";
      }
    };

    const injectStyle = () => {
      if (browserDocument.getElementById(STYLE_ID)) return;

      const target = browserDocument.head ?? browserDocument.documentElement;
      if (!target) return;

      const style = browserDocument.createElement("style");
      style.id = STYLE_ID;
      style.textContent = CATPPUCCIN_THEME_STYLE;
      target.append(style);
    };

    const clearMenuCommands = () => {
      if (settings?.menu?.unregister) {
        menuCommandIds.splice(0).forEach((commandId) => {
          settings.menu.unregister(commandId);
        });
        return;
      }
      menuCommandIds.length = 0;
    };

    const updateMenuCommands = () => {
      if (!settings?.menu?.register) return;

      clearMenuCommands();
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
      try {
        settings?.setMode?.(mode);
      } catch {
        // 用户脚本存储不可用时，本次页面内的选择仍然有效。
      }
      updateMenuCommands();
    }

    const start = () => {
      if (started) return;
      started = true;
      mode = readMode();
      browserDocument.documentElement?.setAttribute(THEME_ATTRIBUTE, mode);
      injectStyle();
      updateMenuCommands();
    };

    const destroy = () => {
      clearMenuCommands();
      browserDocument.getElementById(STYLE_ID)?.remove();
      browserDocument.documentElement?.removeAttribute(THEME_ATTRIBUTE);
    };

    return { destroy, setMode, start };
  };

  const startWhenDocumentElementReady = (browserWindow, start) => {
    const browserDocument = browserWindow.document;

    if (browserDocument.documentElement) {
      start();
      return;
    }

    const observer = new browserWindow.MutationObserver(() => {
      if (!browserDocument.documentElement) return;

      observer.disconnect();
      start();
    });
    observer.observe(browserDocument, { childList: true });
  };

  const createMenuAdapter = () => ({
    register: (label, callback) => GM_registerMenuCommand(label, callback),
    unregister: (commandId) => GM_unregisterMenuCommand(commandId),
  });

  const userscriptSettings = {
    getPreference: (defaultValue) => GM_getValue(HOME_SIDEBAR_STORAGE_KEY, defaultValue),
    menu: createMenuAdapter(),
    setPreference: (value) => GM_setValue(HOME_SIDEBAR_STORAGE_KEY, value),
  };

  const themeSettings = {
    getMode: (defaultValue) => GM_getValue(THEME_STORAGE_KEY, defaultValue),
    menu: createMenuAdapter(),
    setMode: (value) => GM_setValue(THEME_STORAGE_KEY, value),
  };

  const homeWidthSettings = {
    getMode: (defaultValue) => GM_getValue(HOME_WIDTH_STORAGE_KEY, defaultValue),
    menu: createMenuAdapter(),
    setMode: (value) => GM_setValue(HOME_WIDTH_STORAGE_KEY, value),
  };

  const homeComposerSettings = {
    getPreference: (defaultValue) => GM_getValue(HOME_COMPOSER_STORAGE_KEY, defaultValue),
    menu: createMenuAdapter(),
    setPreference: (value) => GM_setValue(HOME_COMPOSER_STORAGE_KEY, value),
  };

  startWhenDocumentElementReady(window, () => {
    createThemeFeature(window, themeSettings).start();
    createCommentComposerFeature(window).start();
    createHomeSidebarFeature(window, userscriptSettings).start();
    createHomeWidthFeature(window, homeWidthSettings).start();
    createHomeComposerFeature(window, homeComposerSettings).start();
  });

})();
