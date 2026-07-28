export const ensureStyle = (browserDocument, styleId, styleText) => {
  if (browserDocument.getElementById(styleId)) return;

  const target = browserDocument.head ?? browserDocument.documentElement;
  if (!target) return;

  const style = browserDocument.createElement("style");
  style.id = styleId;
  style.textContent = styleText;
  target.append(style);
};

export const readBooleanPreference = (browserWindow, settings, storageKey, defaultValue = true) => {
  try {
    if (settings?.getPreference) {
      const storedValue = settings.getPreference(defaultValue);
      return typeof storedValue === "boolean" ? storedValue : defaultValue;
    }

    const storedValue = browserWindow.localStorage.getItem(storageKey);
    if (storedValue === "true") return true;
    if (storedValue === "false") return false;
    return defaultValue;
  } catch {
    return defaultValue;
  }
};

export const persistBooleanPreference = (browserWindow, settings, storageKey, value) => {
  try {
    if (settings?.setPreference) {
      settings.setPreference(value);
    } else {
      browserWindow.localStorage.setItem(storageKey, String(value));
    }
  } catch {
    // 用户脚本存储不可用时，本次页面内的选择仍然有效。
  }
};

export const readStoredMode = (settings, isValidMode, defaultMode) => {
  try {
    const storedMode = settings?.getMode?.(defaultMode) ?? defaultMode;
    return isValidMode(storedMode) ? storedMode : defaultMode;
  } catch {
    return defaultMode;
  }
};

export const persistMode = (settings, mode) => {
  try {
    settings?.setMode?.(mode);
  } catch {
    // 用户脚本存储不可用时，本次页面内的选择仍然有效。
  }
};

export const clearMenuCommands = (menu, commandIds) => {
  if (menu?.unregister) {
    commandIds.splice(0).forEach((commandId) => {
      menu.unregister(commandId);
    });
    return;
  }
  commandIds.length = 0;
};
