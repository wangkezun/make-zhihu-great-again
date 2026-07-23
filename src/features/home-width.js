import { HOME_WIDTH_STYLE } from "../styles/home-width.js";

export const HOME_WIDTH_STORAGE_KEY = "zhihu-beautification:home-width";
export const HOME_WIDTH_MODES = ["standard", "comfortable", "wide", "fluid"];

const WIDTH_ATTRIBUTE = "data-zb-home-width";
const STYLE_ID = "zb-home-width-style";
const WIDTH_LABELS = {
  standard: "标准（694px）",
  comfortable: "舒适（820px）",
  wide: "宽屏（960px）",
  fluid: "自适应窗口",
};

const isWidthMode = (value) => HOME_WIDTH_MODES.includes(value);

export const createHomeWidthFeature = (browserWindow, settings) => {
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
    if (browserDocument.getElementById(STYLE_ID)) return;

    const target = browserDocument.head ?? browserDocument.documentElement;
    if (!target) return;

    const style = browserDocument.createElement("style");
    style.id = STYLE_ID;
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
    browserDocument.getElementById(STYLE_ID)?.remove();
    browserDocument.documentElement?.removeAttribute(WIDTH_ATTRIBUTE);
  };

  return { destroy, setMode, start };
};
