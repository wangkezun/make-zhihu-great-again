import { CATPPUCCIN_THEME_STYLE } from "../styles/catppuccin-theme.js";

export const THEME_STORAGE_KEY = "zhihu-beautification:theme";
export const THEME_MODES = ["system", "latte", "frappe", "macchiato", "mocha"];

const THEME_ATTRIBUTE = "data-zb-theme";
const ARROW_PANEL_ATTRIBUTE = "data-zb-arrow-action-panel";
const ARROW_PANEL_WRAPPER_ATTRIBUTE = "data-zb-arrow-action-panel-wrapper";
const STYLE_ID = "zb-catppuccin-theme-style";
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
  const observedPortalRoots = new WeakSet();
  const menuCommandIds = [];
  let observer;
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

  const observePortalRoot = (root) => {
    if (root.nodeType !== 1 || root.id === "root" || observedPortalRoots.has(root)) return;

    observedPortalRoots.add(root);
    observer.observe(root, { childList: true, subtree: true });
    markArrowPanels(root);
  };

  const handleMutations = (records) => {
    records.forEach(({ addedNodes, target }) => {
      addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;

        if (target === browserDocument.body) {
          observePortalRoot(node);
        } else {
          markArrowPanels(node);
        }
      });
    });
  };

  const setupPortalObserver = () => {
    const body = browserDocument.body;
    if (!body) return;

    observer ??= new browserWindow.MutationObserver(handleMutations);
    observer.observe(body, { childList: true });
    Array.from(body.children).forEach(observePortalRoot);
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
    markArrowPanels();
    setupPortalObserver();
    browserDocument.addEventListener("DOMContentLoaded", setupPortalObserver, { once: true });
    updateMenuCommands();
  };

  const destroy = () => {
    observer?.disconnect();
    observer = undefined;
    browserDocument.removeEventListener("DOMContentLoaded", setupPortalObserver);
    clearMenuCommands();
    browserDocument.getElementById(STYLE_ID)?.remove();
    browserDocument.documentElement?.removeAttribute(THEME_ATTRIBUTE);
    markedArrowPanels.forEach((panel) => panel.removeAttribute(ARROW_PANEL_ATTRIBUTE));
    markedArrowPanelWrappers.forEach((wrapper) =>
      wrapper.removeAttribute(ARROW_PANEL_WRAPPER_ATTRIBUTE),
    );
    markedArrowPanels.clear();
    markedArrowPanelWrappers.clear();
    started = false;
  };

  return { destroy, setMode, start };
};
