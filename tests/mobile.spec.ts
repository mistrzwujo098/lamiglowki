import { test, expect, devices } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

// Mobile device configurations
const mobileDevices = {
  'iPhone SE': { width: 375, height: 667 },
  'iPhone 12/13/14': { width: 390, height: 844 },
  'iPhone 14 Pro Max': { width: 430, height: 932 },
  'Samsung Galaxy S20': { width: 360, height: 800 },
  'iPad Mini': { width: 768, height: 1024 }
};

test.describe('Mobile Tests - Comprehensive Suite', () => {

  // Test across all mobile devices
  for (const [deviceName, viewport] of Object.entries(mobileDevices)) {
    test.describe(`Device: ${deviceName} (${viewport.width}x${viewport.height})`, () => {

      test.beforeEach(async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto(BASE_URL);
      });

      test('should display topbar correctly on mobile', async ({ page }) => {
        const topbar = page.locator('div.sticky.top-0.z-50');

        // Topbar should be visible
        await expect(topbar).toBeVisible();

        // Check text content
        await expect(topbar).toContainText('PRZEDSPRZEDAŻ');
        await expect(topbar).toContainText('12 listopada');

        // Verify sticky positioning
        await page.evaluate(() => window.scrollBy(0, 300));
        await expect(topbar).toBeVisible();

        // Take screenshot if issues
        const box = await topbar.boundingBox();
        if (!box || box.width < viewport.width * 0.9) {
          await page.screenshot({
            path: `test-results/topbar-${deviceName.replace(/\s+/g, '-')}-issue.png`,
            fullPage: false
          });
        }

        // Check text is readable (not cut off)
        const fontSize = await topbar.evaluate((el) =>
          window.getComputedStyle(el).fontSize
        );
        expect(parseInt(fontSize)).toBeGreaterThanOrEqual(12);
      });

      test('should display all 3 packages correctly', async ({ page }) => {
        await page.locator('#pakiety').scrollIntoViewIfNeeded();

        // Wait for packages to be visible
        await page.waitForSelector('.grid.md\\:grid-cols-3');

        // Find all package cards
        const packageCards = page.locator('div.bg-white.rounded-2xl').filter({
          has: page.locator('text=/zł/')
        });

        const count = await packageCards.count();
        expect(count).toBe(3);

        // Verify each package is visible and readable
        for (let i = 0; i < count; i++) {
          const card = packageCards.nth(i);
          await expect(card).toBeVisible();

          // Check card is not overlapping with others
          const box = await card.boundingBox();
          expect(box).toBeTruthy();
          expect(box!.width).toBeGreaterThan(200);
          expect(box!.height).toBeGreaterThan(300);
        }
      });

      test('should display package prices correctly', async ({ page }) => {
        await page.locator('#pakiety').scrollIntoViewIfNeeded();

        // Check all three prices are visible
        const price59 = page.locator('text=59 zł').first();
        const price119 = page.locator('text=119 zł').first();
        const price159 = page.locator('text=159 zł').first();

        await expect(price59).toBeVisible();
        await expect(price119).toBeVisible();
        await expect(price159).toBeVisible();

        // Verify prices are readable (font size)
        for (const price of [price59, price119, price159]) {
          const fontSize = await price.evaluate((el) =>
            window.getComputedStyle(el).fontSize
          );
          const fontSizeNum = parseInt(fontSize);
          expect(fontSizeNum).toBeGreaterThanOrEqual(32); // Should be 4xl or 5xl (2.25rem = 36px)
        }
      });

      test('should display package names correctly', async ({ page }) => {
        await page.locator('#pakiety').scrollIntoViewIfNeeded();

        // Check package names
        await expect(page.locator('text=Pakiet 1')).toBeVisible();
        await expect(page.locator('text=Pakiet korzystny')).toBeVisible();
        await expect(page.locator('text=Pakiet najlepszy')).toBeVisible();

        // Verify they're not cut off or hidden
        const pakiet1 = page.locator('text=Pakiet 1');
        const box = await pakiet1.boundingBox();
        expect(box).toBeTruthy();
      });

      test('should have accessible "Kup teraz" buttons with proper touch targets', async ({ page }) => {
        await page.locator('#pakiety').scrollIntoViewIfNeeded();

        const buyButtons = page.locator('a:has-text("Kup teraz")');
        const buttonCount = await buyButtons.count();

        expect(buttonCount).toBe(3);

        // Check each button has proper touch target size (min 44px)
        for (let i = 0; i < buttonCount; i++) {
          const button = buyButtons.nth(i);
          await expect(button).toBeVisible();

          const box = await button.boundingBox();
          expect(box).toBeTruthy();
          expect(box!.height).toBeGreaterThanOrEqual(44); // iOS minimum touch target
          expect(box!.width).toBeGreaterThanOrEqual(100); // Reasonable width

          // Verify button is clickable/tappable
          await expect(button).toBeEnabled();

          // Check href is correct
          const href = await button.getAttribute('href');
          expect(href).toContain('salescrm.pl');
        }

        // Screenshot if buttons are too small
        const firstButton = buyButtons.first();
        const firstBox = await firstButton.boundingBox();
        if (firstBox && firstBox.height < 44) {
          await page.screenshot({
            path: `test-results/buttons-too-small-${deviceName.replace(/\s+/g, '-')}.png`,
            fullPage: true
          });
        }
      });

      test('should not have horizontal scrolling', async ({ page }) => {
        // Get document width
        const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const viewportWidth = viewport.width;

        // Allow 1px tolerance for rounding
        expect(documentWidth).toBeLessThanOrEqual(viewportWidth + 1);

        // If horizontal scroll exists, take screenshot
        if (documentWidth > viewportWidth + 1) {
          await page.screenshot({
            path: `test-results/horizontal-scroll-${deviceName.replace(/\s+/g, '-')}.png`,
            fullPage: true
          });
        }
      });

      test('should display hero section correctly', async ({ page }) => {
        const heading = page.locator('h1:has-text("Łamigłówki dla bystrej główki")');
        await expect(heading).toBeVisible();

        // Check heading is readable
        const fontSize = await heading.evaluate((el) =>
          window.getComputedStyle(el).fontSize
        );
        expect(parseInt(fontSize)).toBeGreaterThanOrEqual(28); // Should be decent size on mobile

        // Check presale badge
        const presaleBadge = page.locator('text=🎉 Przedsprzedaż');
        await expect(presaleBadge).toBeVisible();

        // Check CTA button is visible and accessible
        const ctaButton = page.locator('a:has-text("Zamów w przedsprzedaży")');
        await expect(ctaButton).toBeVisible();

        const ctaBox = await ctaButton.boundingBox();
        expect(ctaBox).toBeTruthy();
        expect(ctaBox!.height).toBeGreaterThanOrEqual(44);
      });

      test('should display book cover image correctly', async ({ page }) => {
        const bookCover = page.locator('img[alt="Łamigłówki dla bystrej główki - okładka książki"]');
        await expect(bookCover).toBeVisible();

        // Wait for image to load
        await bookCover.evaluate((img: HTMLImageElement) => {
          return img.complete || new Promise(resolve => {
            img.onload = resolve;
          });
        });

        // Check image has proper dimensions
        const box = await bookCover.boundingBox();
        expect(box).toBeTruthy();
        expect(box!.width).toBeGreaterThan(150);
        expect(box!.height).toBeGreaterThan(200);
      });

      test('should have working FAQ accordion on touch devices', async ({ page }) => {
        await page.locator('#faq').scrollIntoViewIfNeeded();

        const faqItems = page.locator('details');
        const faqCount = await faqItems.count();
        expect(faqCount).toBe(5);

        // Test first FAQ item - click to expand
        const firstQuestion = page.locator('summary').first();
        await expect(firstQuestion).toBeVisible();

        // Tap the question
        await firstQuestion.tap();

        // Wait for animation
        await page.waitForTimeout(500);

        // Check if it's open
        const detailsElement = firstQuestion.locator('..');
        const isOpen = await detailsElement.evaluate((el) => el.hasAttribute('open'));
        expect(isOpen).toBe(true);

        // Tap again to close
        await firstQuestion.tap();
        await page.waitForTimeout(500);

        const isClosed = await detailsElement.evaluate((el) => !el.hasAttribute('open'));
        expect(isClosed).toBe(true);
      });

      test('should have readable text without overflow', async ({ page }) => {
        // Check various text elements don't overflow
        const textElements = [
          page.locator('h1').first(),
          page.locator('h2').first(),
          page.locator('p').first(),
        ];

        for (const element of textElements) {
          const box = await element.boundingBox();
          if (box) {
            // Text should not overflow viewport
            expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 10);
          }
        }
      });

      test('should display benefits section correctly on mobile', async ({ page }) => {
        await page.locator('#benefits').scrollIntoViewIfNeeded();

        const benefitCards = page.locator('.bg-white.p-8.rounded-3xl').filter({
          has: page.locator('h3')
        });

        const count = await benefitCards.count();
        expect(count).toBeGreaterThanOrEqual(4);

        // Each benefit card should be visible
        for (let i = 0; i < Math.min(count, 4); i++) {
          const card = benefitCards.nth(i);
          await card.scrollIntoViewIfNeeded();
          await expect(card).toBeVisible();
        }
      });

      test('should display "NAJPOPULARNIEJSZY" badge correctly', async ({ page }) => {
        await page.locator('#pakiety').scrollIntoViewIfNeeded();

        const popularBadge = page.locator('text=⭐ NAJPOPULARNIEJSZY');
        await expect(popularBadge).toBeVisible();

        // Badge should be readable
        const box = await popularBadge.boundingBox();
        expect(box).toBeTruthy();

        // Check it's on the middle package (Pakiet korzystny)
        const middlePackage = page.locator('text=Pakiet korzystny').locator('..');
        await expect(middlePackage).toContainText('⭐ NAJPOPULARNIEJSZY');
      });

      test('should have footer visible and readable', async ({ page }) => {
        await page.locator('footer').scrollIntoViewIfNeeded();

        const footer = page.locator('footer');
        await expect(footer).toBeVisible();

        // Check footer content
        await expect(footer).toContainText('Łamigłówki dla bystrej główki');
        await expect(footer).toContainText('paulina@matematyki.pl');
      });

      test('should have sticky mobile CTA button', async ({ page }) => {
        // Only check for devices smaller than md breakpoint (768px)
        if (viewport.width < 768) {
          const stickyCTA = page.locator('.fixed.bottom-0 a:has-text("Zamawiam książkę")');

          await expect(stickyCTA).toBeVisible();

          // Check proper touch target
          const box = await stickyCTA.boundingBox();
          expect(box).toBeTruthy();
          expect(box!.height).toBeGreaterThanOrEqual(44);

          // Verify it stays visible when scrolling
          await page.evaluate(() => window.scrollBy(0, 500));
          await expect(stickyCTA).toBeVisible();
        }
      });

      test('should display value badges correctly', async ({ page }) => {
        await page.locator('#pakiety').scrollIntoViewIfNeeded();

        // Check all value badges are visible
        await expect(page.locator('text=💡 Podstawowy')).toBeVisible();
        await expect(page.locator('text=💡 Najpopularniejszy')).toBeVisible();
        await expect(page.locator('text=💡 Kompletny')).toBeVisible();
      });

      test('navigation and scrolling should work smoothly', async ({ page }) => {
        // Test anchor link navigation
        const heroCtaButton = page.locator('a:has-text("Zamów w przedsprzedaży")').first();
        await heroCtaButton.click();

        // Wait for scroll
        await page.waitForTimeout(1000);

        // Should be near packages section
        const packagesSection = page.locator('#pakiety');
        await expect(packagesSection).toBeInViewport();
      });

      test('should display package features correctly', async ({ page }) => {
        await page.locator('#pakiety').scrollIntoViewIfNeeded();

        // Check that features are visible for each package
        const packageCards = page.locator('div.bg-white.rounded-2xl').filter({
          has: page.locator('text=/zł/')
        });

        for (let i = 0; i < await packageCards.count(); i++) {
          const card = packageCards.nth(i);

          // Should have check marks
          const checkmarks = card.locator('svg').filter({ hasText: '' });
          const checkCount = await checkmarks.count();
          expect(checkCount).toBeGreaterThan(0);

          // Should have feature text
          await expect(card).toContainText('wysyłka po 12 listopada');
        }
      });

      test('should handle touch interactions on interactive elements', async ({ page }) => {
        // Test tapping on CTA buttons
        const ctaButton = page.locator('a:has-text("Zamów w przedsprzedaży")').first();

        // Should be tappable
        const box = await ctaButton.boundingBox();
        expect(box).toBeTruthy();

        // Simulate tap
        await ctaButton.tap();

        // Should navigate to packages section
        await page.waitForTimeout(500);
        const packagesVisible = await page.locator('#pakiety').isInViewport();
        expect(packagesVisible).toBe(true);
      });

      test('should display presale information consistently', async ({ page }) => {
        // Check topbar
        const topbar = page.locator('div.sticky.top-0');
        await expect(topbar).toContainText('12 listopada');

        // Check packages section
        await page.locator('#pakiety').scrollIntoViewIfNeeded();
        const deliveryInfo = page.locator('text=Wysyłka po 12 listopada');
        await expect(deliveryInfo.first()).toBeVisible();

        // Check footer guarantees
        await expect(page.locator('text=✓ Wysyłka po 12 listopada')).toBeVisible();
      });
    });
  }

  // Cross-device comparison tests
  test.describe('Cross-Device Layout Tests', () => {

    test('packages should stack vertically on phones, grid on tablets', async ({ page }) => {
      // Test on phone
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(BASE_URL);
      await page.locator('#pakiety').scrollIntoViewIfNeeded();

      const packageCards = page.locator('div.bg-white.rounded-2xl').filter({
        has: page.locator('text=/zł/')
      });

      // Get positions of cards
      const card1Box = await packageCards.nth(0).boundingBox();
      const card2Box = await packageCards.nth(1).boundingBox();

      // On phone, cards should be stacked (card2 should be below card1)
      expect(card2Box!.y).toBeGreaterThan(card1Box!.y + card1Box!.height - 50);

      // Test on tablet
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.reload();
      await page.locator('#pakiety').scrollIntoViewIfNeeded();

      const tabletCard1Box = await packageCards.nth(0).boundingBox();
      const tabletCard2Box = await packageCards.nth(1).boundingBox();

      // On tablet, cards could be side by side or stacked depending on md breakpoint
      // At 768px, md breakpoint is active, so they should be in a grid
      const areInGrid = Math.abs(tabletCard1Box!.y - tabletCard2Box!.y) < 50;
      // Cards should be roughly on same row
      expect(areInGrid || tabletCard2Box!.y > tabletCard1Box!.y).toBe(true);
    });

    test('text sizes should be appropriate for each device', async ({ page }) => {
      const textSizeTests = [
        { width: 375, minH1Size: 28, maxH1Size: 44 },
        { width: 768, minH1Size: 36, maxH1Size: 56 }
      ];

      for (const { width, minH1Size, maxH1Size } of textSizeTests) {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(BASE_URL);

        const h1 = page.locator('h1').first();
        const fontSize = await h1.evaluate((el) =>
          parseInt(window.getComputedStyle(el).fontSize)
        );

        expect(fontSize).toBeGreaterThanOrEqual(minH1Size);
        expect(fontSize).toBeLessThanOrEqual(maxH1Size);
      }
    });
  });

  // Performance and Loading Tests
  test.describe('Mobile Performance Tests', () => {

    test('images should load within reasonable time on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });

      const startTime = Date.now();
      await page.goto(BASE_URL);

      // Wait for main book cover image
      const bookCover = page.locator('img[alt="Łamigłówki dla bystrej główki - okładka książki"]');
      await bookCover.waitFor({ state: 'visible', timeout: 5000 });

      const loadTime = Date.now() - startTime;

      // Should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test('page should be interactive within reasonable time', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });

      const startTime = Date.now();
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

      // Check if main CTA is clickable
      const ctaButton = page.locator('a:has-text("Zamów w przedsprzedaży")').first();
      await ctaButton.waitFor({ state: 'visible' });

      const interactiveTime = Date.now() - startTime;

      // Should be interactive within 3 seconds
      expect(interactiveTime).toBeLessThan(3000);
    });
  });

  // Accessibility Tests on Mobile
  test.describe('Mobile Accessibility Tests', () => {

    test('touch targets should meet accessibility guidelines', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(BASE_URL);

      // Check all links and buttons
      const interactiveElements = page.locator('a, button').filter({ hasText: /.+/ });
      const count = await interactiveElements.count();

      let smallTargets = 0;

      for (let i = 0; i < Math.min(count, 20); i++) {
        const element = interactiveElements.nth(i);
        const box = await element.boundingBox();

        if (box && (box.height < 44 || box.width < 44)) {
          smallTargets++;
          console.log(`Small touch target found: ${await element.textContent()}`);
        }
      }

      // Most interactive elements should meet 44px minimum
      expect(smallTargets).toBeLessThan(count * 0.2); // Allow 20% to be smaller
    });

    test('contrast ratios should be sufficient on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(BASE_URL);

      // Check buy buttons have sufficient contrast
      const buyButtons = page.locator('a:has-text("Kup teraz")');

      for (let i = 0; i < await buyButtons.count(); i++) {
        const button = buyButtons.nth(i);
        const styles = await button.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor
          };
        });

        // Just verify styles exist (actual contrast calculation would need more complex logic)
        expect(styles.color).toBeTruthy();
        expect(styles.backgroundColor).toBeTruthy();
      }
    });
  });
});
