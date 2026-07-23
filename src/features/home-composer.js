import { HOME_COMPOSER_STYLE } from "../styles/home-composer.js";

export const HOME_COMPOSER_STORAGE_KEY = "zhihu-beautification:show-home-composer";

const ROOT_ATTRIBUTE = "data-zb-show-home-composer";
const STYLE_ID = "zb-home-composer-style";

const readPreference = (browserWindow, settings) => {
  try {
    if (settings?.getPreference) return Boolean(settings.getPreference(true));

    const storedValue = browserWindow.localStorage.getItem(HOME_COMPOSER_STORAGE_KEY);
    return storedValue === null ? true : storedValue === "true";
  } catch {
    return true;
  }
};

export const createHomeComposerFeature = (browserWindow, settings) => {
  const browserDocument = browserWindow.document;
  let shouldShowComposer = readPreference(browserWindow, settings);
  let menuCommandId;
  let started = false;

  const updateRootState = () => {
    browserDocument.documentElement?.setAttribute(ROOT_ATTRIBUTE, String(shouldShowComposer));
  };

  const injectStyle = () => {
    if (browserDocument.getElementById(STYLE_ID)) return;

    const target = browserDocument.head ?? browserDocument.documentElement;
    if (!target) return;

    const style = browserDocument.createElement("style");
    style.id = STYLE_ID;
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
    browserDocument.getElementById(STYLE_ID)?.remove();
    browserDocument.documentElement?.removeAttribute(ROOT_ATTRIBUTE);
  };

  return { destroy, start };
};
