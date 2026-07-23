import { HOME_COMPOSER_STYLE } from "../styles/home-composer.js";
import { ensureStyle, persistBooleanPreference, readBooleanPreference } from "./shared.js";

export const HOME_COMPOSER_STORAGE_KEY = "zhihu-beautification:show-home-composer";

const ROOT_ATTRIBUTE = "data-zb-show-home-composer";
const STYLE_ID = "zb-home-composer-style";

export const createHomeComposerFeature = (browserWindow, settings) => {
  const browserDocument = browserWindow.document;
  let shouldShowComposer = readBooleanPreference(
    browserWindow,
    settings,
    HOME_COMPOSER_STORAGE_KEY,
  );
  let menuCommandId;
  let started = false;

  const updateRootState = () => {
    browserDocument.documentElement?.setAttribute(ROOT_ATTRIBUTE, String(shouldShowComposer));
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
    persistBooleanPreference(browserWindow, settings, HOME_COMPOSER_STORAGE_KEY, value);
    updateRootState();
    updateMenuCommand();
  };

  const start = () => {
    if (started) return;
    started = true;
    updateRootState();
    ensureStyle(browserDocument, STYLE_ID, HOME_COMPOSER_STYLE);
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
