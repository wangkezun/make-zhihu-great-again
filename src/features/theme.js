import { CATPPUCCIN_THEME_STYLE } from "../styles/catppuccin-theme.js";

export const THEME_STORAGE_KEY = "zhihu-beautification:theme";
export const THEME_MODES = ["system", "latte", "frappe", "macchiato", "mocha"];

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

export const createThemeFeature = (browserWindow, settings) => {
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
