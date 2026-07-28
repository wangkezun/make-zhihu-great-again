import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";

import { chromium } from "playwright-core";

const projectRoot = resolve(import.meta.dirname, "..");
const fixtures = ["browser-performance.fixture.html", "browser-sidebar.fixture.html"];
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const filePath = resolve(projectRoot, pathname.replace(/^\/+/, ""));
    if (filePath !== projectRoot && !filePath.startsWith(`${projectRoot}${sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error("Not a file");
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath)] ?? "application/octet-stream",
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404).end("Not Found");
  }
});

await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
const address = server.address();
const browser = await chromium.launch({ channel: "chrome", headless: true });

try {
  const page = await browser.newPage();
  for (const fixture of fixtures) {
    const url = `http://127.0.0.1:${address.port}/test/${fixture}`;
    await page.goto(url);
    await page.waitForFunction('document.title === "PASS" || document.title === "FAIL"');
    const result = await page.locator("html").getAttribute("data-probe-result");
    if ((await page.title()) !== "PASS") {
      throw new Error(`${fixture} failed: ${result ?? "missing probe result"}`);
    }
    console.log(`PASS ${fixture}: ${result}`);
  }
} finally {
  await browser.close();
  await new Promise((resolveClose, rejectClose) => {
    server.close((error) => (error ? rejectClose(error) : resolveClose()));
  });
}
