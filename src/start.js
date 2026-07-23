export const startWhenDocumentElementReady = (browserWindow, start) => {
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
