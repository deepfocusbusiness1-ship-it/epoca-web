import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const outDir = 'C:\\Users\\eze_s\\.gemini\\antigravity\\brain\\bb7d8399-e75d-40cc-b159-aa0c56a2080b';

async function capture() {
  const edgePath = fs.existsSync('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe')
    ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
    : 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';

  console.log('Using browser executable:', edgePath);

  const browser = await chromium.launch({
    executablePath: edgePath,
    headless: true,
  });

  // 1. Mobile at 390px (iPhone 12 / 13 / 14 standard)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(500);

  const mobileScreenshotPath = path.join(outDir, 'mobile_header_390px.png');
  await mobilePage.screenshot({ path: mobileScreenshotPath, fullPage: false });
  console.log('Mobile screenshot saved to:', mobileScreenshotPath);

  // Also check 320, 360, 412, 430 px center position
  const widths = [320, 360, 390, 412, 430];
  for (const w of widths) {
    await mobilePage.setViewportSize({ width: w, height: 800 });
    await mobilePage.waitForTimeout(100);
    const logoBox = await mobilePage.locator('header a[href="/"]').boundingBox();
    if (logoBox) {
      const logoCenter = logoBox.x + logoBox.width / 2;
      const screenCenter = w / 2;
      const diff = Math.abs(logoCenter - screenCenter);
      console.log(`Viewport ${w}px: Screen center=${screenCenter}px, Logo center=${logoCenter.toFixed(1)}px, Offset=${diff.toFixed(2)}px`);
    }
  }

  await mobileContext.close();

  // 2. Desktop at 1440px
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(500);

  const desktopScreenshotPath = path.join(outDir, 'desktop_1440px.png');
  await desktopPage.screenshot({ path: desktopScreenshotPath, fullPage: false });
  console.log('Desktop screenshot saved to:', desktopScreenshotPath);

  await desktopContext.close();
  await browser.close();
}

capture().catch(err => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
