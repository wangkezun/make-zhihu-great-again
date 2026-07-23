import { HOME_WIDTH_STYLE } from "../styles/home-width.js";
import { clearMenuCommands, ensureStyle, persistMode, readStoredMode } from "./shared.js";

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

  const updateMenuCommands = () => {
    if (!settings?.menu?.register) return;

    clearMenuCommands(settings.menu, menuCommandIds);
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
    persistMode(settings, mode);
    updateMenuCommands();
  }

  const start = () => {
    if (started) return;
    started = true;
    mode = readStoredMode(settings, isWidthMode, "standard");
    browserDocument.documentElement?.setAttribute(WIDTH_ATTRIBUTE, mode);
    ensureStyle(browserDocument, STYLE_ID, HOME_WIDTH_STYLE);
    updateMenuCommands();
  };

  const destroy = () => {
    clearMenuCommands(settings?.menu, menuCommandIds);
    browserDocument.getElementById(STYLE_ID)?.remove();
    browserDocument.documentElement?.removeAttribute(WIDTH_ATTRIBUTE);
  };

  return { destroy, setMode, start };
};
