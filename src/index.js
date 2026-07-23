import { createCommentComposerFeature } from "./features/comment-composer.js";
import { createHomeComposerFeature, HOME_COMPOSER_STORAGE_KEY } from "./features/home-composer.js";
import { createHomeSidebarFeature, HOME_SIDEBAR_STORAGE_KEY } from "./features/home-sidebar.js";
import { createHomeWidthFeature, HOME_WIDTH_STORAGE_KEY } from "./features/home-width.js";
import { createThemeFeature, THEME_STORAGE_KEY } from "./features/theme.js";
import { startWhenDocumentElementReady } from "./start.js";

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
