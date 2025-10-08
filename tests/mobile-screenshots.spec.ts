import { test } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

const devices = [
  { name: 'iPhone-SE', width: 375, height: 667 },
  { name: 'iPhone-12', width: 390, height: 844 },
  { name: 'iPhone-14-Pro-Max', width: 430, height: 932 },
  { name: 'Samsung-Galaxy-S20', width: 360, height: 800 },
  { name: 'iPad-Mini', width: 768, height: 1024 }
];

test.describe('Mobile Screenshots', () => {
  for (const device of devices) {
    test(`capture ${device.name} screenshots`, async ({ page }) => {
      await page.setViewportSize({ width: device.width, height: device.height });
      await page.goto(BASE_URL);

      // Hero section
      await page.screenshot({
        path: `screenshots/${device.name}-01-hero.png`,
        fullPage: false
      });

      // Packages section
      await page.locator('#pakiety').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `screenshots/${device.name}-02-packages.png`,
        fullPage: false
      });

      // FAQ section
      await page.locator('#faq').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `screenshots/${device.name}-03-faq.png`,
        fullPage: false
      });

      // Full page
      await page.goto(BASE_URL);
      await page.screenshot({
        path: `screenshots/${device.name}-04-fullpage.png`,
        fullPage: true
      });
    });
  }
});
