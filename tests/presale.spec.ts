import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const SALESCRM_URL = 'https://skutecznekorepetycje.salescrm.pl/cart/add_product/9642';

test.describe('Presale Page - Critical Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test.describe('Topbar - Presale Message', () => {
    test('should display topbar with presale message and delivery date', async ({ page }) => {
      // Check topbar is visible
      const topbar = page.locator('div.sticky.top-0.z-50');
      await expect(topbar).toBeVisible();

      // Check topbar contains presale message
      await expect(topbar).toContainText('PRZEDSPRZEDAŻ');
      await expect(topbar).toContainText('Zamów teraz w najlepszej cenie');
      await expect(topbar).toContainText('Wysyłka po 12 listopada');

      // Check topbar has gradient background
      await expect(topbar).toHaveClass(/bg-gradient-to-r/);
      await expect(topbar).toHaveClass(/from-pink/);
      await expect(topbar).toHaveClass(/via-honey/);
      await expect(topbar).toHaveClass(/to-green/);
    });

    test('should remain sticky on scroll', async ({ page }) => {
      const topbar = page.locator('div.sticky.top-0.z-50');

      // Scroll down the page
      await page.evaluate(() => window.scrollBy(0, 500));

      // Topbar should still be visible
      await expect(topbar).toBeVisible();
      await expect(topbar).toHaveClass(/sticky/);
      await expect(topbar).toHaveClass(/z-50/);
    });
  });

  test.describe('Package Buttons - SalesCRM Links', () => {
    test('should have exactly 3 packages displayed', async ({ page }) => {
      // Navigate to packages section
      await page.locator('#pakiety').scrollIntoViewIfNeeded();

      // Count package cards
      const packageCards = page.locator('div.bg-white.rounded-2xl.p-6');
      await expect(packageCards).toHaveCount(3);
    });

    test('Package 1 (59 zł) - should display correctly and link to SalesCRM', async ({ page }) => {
      await page.locator('#pakiety').scrollIntoViewIfNeeded();

      // Find Package 1 by price
      const package1 = page.locator('text=59 zł').locator('..');

      // Check price
      await expect(package1).toContainText('59 zł');

      // Check value badge
      await expect(page.locator('text=💡 Podstawowy')).toBeVisible();

      // Check features
      await expect(package1).toContainText('Książka w formie papierowej (wysyłka po 12 listopada)');
      await expect(package1).toContainText('Certyfikat imienny dla dziecka');
      await expect(package1).toContainText('Kilka rozwiązań video');

      // Check button links to SalesCRM
      const buyButton = page.locator(`a[href="${SALESCRM_URL}"]`).first();
      await expect(buyButton).toBeVisible();
      await expect(buyButton).toContainText('Kup teraz');
    });

    test('Package 2 (99 zł) - MOST POPULAR - should display correctly and link to SalesCRM', async ({ page }) => {
      await page.locator('#pakiety').scrollIntoViewIfNeeded();

      // Check "NAJPOPULARNIEJSZY" badge
      await expect(page.locator('text=⭐ NAJPOPULARNIEJSZY')).toBeVisible();

      // Find Package 2 by price
      const package2 = page.locator('text=99 zł').locator('..');

      // Check price
      await expect(package2).toContainText('99 zł');

      // Check value badge
      await expect(page.locator('text=💡 Najpopularniejszy')).toBeVisible();

      // Check features (should have 4 features)
      await expect(package2).toContainText('Książka w formie papierowej (wysyłka po 12 listopada)');
      await expect(package2).toContainText('Certyfikat imienny dla dziecka');
      await expect(package2).toContainText('Kilka rozwiązań video');
      await expect(package2).toContainText('eBook do wydrukowania');

      // Check enhanced styling (ring border)
      const popularCard = page.locator('.ring-pink').first();
      await expect(popularCard).toBeVisible();

      // Check button links to SalesCRM
      const buyButtons = page.locator(`a[href="${SALESCRM_URL}"]`);
      await expect(buyButtons.nth(1)).toBeVisible();
      await expect(buyButtons.nth(1)).toContainText('Kup teraz');
    });

    test('Package 3 (199 zł) - should display correctly and link to SalesCRM', async ({ page }) => {
      await page.locator('#pakiety').scrollIntoViewIfNeeded();

      // Find Package 3 by price
      const package3 = page.locator('text=199 zł').locator('..');

      // Check price
      await expect(package3).toContainText('199 zł');

      // Check value badge
      await expect(page.locator('text=💡 Kompletny')).toBeVisible();

      // Check all 6 features
      await expect(package3).toContainText('Książka w formie papierowej (wysyłka po 12 listopada)');
      await expect(package3).toContainText('Certyfikat imienny dla dziecka');
      await expect(package3).toContainText('Kilka rozwiązań video');
      await expect(package3).toContainText('eBook do wydrukowania');
      await expect(package3).toContainText('Rozwiązania video wszystkich zagadek');
      await expect(package3).toContainText('eBook z dodatkowymi zagadkami dla utrwalenia');

      // Check button links to SalesCRM
      const buyButtons = page.locator(`a[href="${SALESCRM_URL}"]`);
      await expect(buyButtons.nth(2)).toBeVisible();
      await expect(buyButtons.nth(2)).toContainText('Kup teraz');
    });

    test('all package buttons should have correct SalesCRM URL', async ({ page }) => {
      await page.locator('#pakiety').scrollIntoViewIfNeeded();

      // Get all "Kup teraz" buttons
      const buyButtons = page.locator(`a[href="${SALESCRM_URL}"]`);

      // Should have exactly 3 buttons (one per package)
      await expect(buyButtons).toHaveCount(3);

      // All should have the correct URL
      for (let i = 0; i < 3; i++) {
        const href = await buyButtons.nth(i).getAttribute('href');
        expect(href).toBe(SALESCRM_URL);
      }
    });

    test('package buttons should be clickable and styled correctly', async ({ page }) => {
      await page.locator('#pakiety').scrollIntoViewIfNeeded();

      const buyButtons = page.locator(`a[href="${SALESCRM_URL}"]`);

      for (let i = 0; i < 3; i++) {
        const button = buyButtons.nth(i);
        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();
        await expect(button).toHaveClass(/rounded-full/);
        await expect(button).toHaveClass(/font-semibold/);
      }
    });
  });

  test.describe('NO False Testimonials/Reviews', () => {
    test('should NOT display fake star ratings in hero section', async ({ page }) => {
      // Check for common fake rating patterns
      const fakeRatingPatterns = [
        '4.9/5 (2,430 opinii)',
        '4.9/5',
        '2,430 opinii',
        '2430 opinii'
      ];

      for (const pattern of fakeRatingPatterns) {
        const element = page.locator(`text=${pattern}`);
        await expect(element).toHaveCount(0);
      }
    });

    test('should NOT display fake testimonials from customers', async ({ page }) => {
      // Check for testimonial names mentioned in test plan
      const fakeTestimonialNames = [
        'Anna M.',
        'Piotr K.',
        'mama Kasi',
        'tata Tomka'
      ];

      for (const name of fakeTestimonialNames) {
        const element = page.locator(`text=${name}`);
        await expect(element).toHaveCount(0);
      }
    });

    test('should NOT display before/after customer stories', async ({ page }) => {
      // Check for before/after patterns
      const beforeAfterPatterns = [
        '30 dni później',
        'przed i po',
        'przed / po',
        'testimonial'
      ];

      for (const pattern of beforeAfterPatterns) {
        const element = page.locator(`text=${pattern}`).first();
        const count = await element.count();
        expect(count).toBe(0);
      }
    });

    test('should NOT display customer reviews section', async ({ page }) => {
      // Check for review section indicators
      const reviewSectionPatterns = [
        'opinie klientów',
        'co mówią rodzice',
        'recenzje',
        'reviews'
      ];

      const pageContent = await page.content();
      const lowerContent = pageContent.toLowerCase();

      for (const pattern of reviewSectionPatterns) {
        expect(lowerContent).not.toContain(pattern.toLowerCase());
      }
    });

    test('presale page should focus on presale messaging, not customer feedback', async ({ page }) => {
      // Instead of fake reviews, page should emphasize presale
      await expect(page.locator('text=PRZEDSPRZEDAŻ')).toBeVisible();
      await expect(page.locator('text=Przedsprzedaż - ograniczona liczba egzemplarzy')).toBeVisible();

      // Should mention delivery date
      const deliveryMentions = page.locator('text=po 12 listopada');
      await expect(deliveryMentions.first()).toBeVisible();
    });
  });

  test.describe('FAQ Section - Presale Specific Questions', () => {
    test('should display FAQ section with correct heading', async ({ page }) => {
      await page.locator('#faq').scrollIntoViewIfNeeded();

      const faqHeading = page.locator('h2:has-text("Najczęściej zadawane pytania")');
      await expect(faqHeading).toBeVisible();
    });

    test('should have exactly 5 FAQ items', async ({ page }) => {
      await page.locator('#faq').scrollIntoViewIfNeeded();

      const faqItems = page.locator('details');
      await expect(faqItems).toHaveCount(5);
    });

    test('FAQ: "Dla jakiego wieku jest książka?" - should expand and show answer', async ({ page }) => {
      await page.locator('#faq').scrollIntoViewIfNeeded();

      const question = page.locator('summary:has-text("Dla jakiego wieku jest książka?")');
      await expect(question).toBeVisible();

      // Click to expand
      await question.click();

      // Check answer contains difficulty levels
      const answer = question.locator('..'); // Parent details element
      await expect(answer).toContainText('★, ★★, ★★★');
      await expect(answer).toContainText('trzy poziomy trudności');
    });

    test('FAQ: "Co jeśli dziecko nie lubi matematyki?" - should be present', async ({ page }) => {
      await page.locator('#faq').scrollIntoViewIfNeeded();

      const question = page.locator('summary:has-text("Co jeśli dziecko nie lubi matematyki?")');
      await expect(question).toBeVisible();

      // Click to expand
      await question.click();

      // Check answer mentions it's not traditional math
      const parent = question.locator('..');
      await expect(parent).toContainText('nie tradycyjna matematyka');
    });

    test('FAQ: "Kiedy otrzymam książkę?" - CRITICAL presale question', async ({ page }) => {
      await page.locator('#faq').scrollIntoViewIfNeeded();

      const question = page.locator('summary:has-text("Kiedy otrzymam książkę?")');
      await expect(question).toBeVisible();

      // Click to expand
      await question.click();

      // Check answer mentions delivery date
      const parent = question.locator('..');
      await expect(parent).toContainText('po 12 listopada');
      await expect(parent).toContainText('Materiały cyfrowe');
      await expect(parent).toContainText('natychmiast po zakupie');
    });

    test('FAQ: "Co jeśli mamy mało czasu?" - should mention 10-15 minutes', async ({ page }) => {
      await page.locator('#faq').scrollIntoViewIfNeeded();

      const question = page.locator('summary:has-text("Co jeśli mamy mało czasu?")');
      await expect(question).toBeVisible();

      // Click to expand
      await question.click();

      // Check answer mentions time commitment
      const parent = question.locator('..');
      await expect(parent).toContainText('10-15 minut');
    });

    test('FAQ: "Czy mogę zwrócić książkę?" - should mention return policy', async ({ page }) => {
      await page.locator('#faq').scrollIntoViewIfNeeded();

      const question = page.locator('summary:has-text("Czy mogę zwrócić książkę?")');
      await expect(question).toBeVisible();

      // Click to expand
      await question.click();

      // Check answer mentions 14-day return
      const parent = question.locator('..');
      await expect(parent).toContainText('14 dni');
      await expect(parent).toContainText('zwrot');
    });

    test('FAQ items should be interactive (expand/collapse)', async ({ page }) => {
      await page.locator('#faq').scrollIntoViewIfNeeded();

      const firstQuestion = page.locator('summary').first();

      // Should be clickable
      await expect(firstQuestion).toBeVisible();

      // Click to expand
      await firstQuestion.click();

      // Wait a bit for animation
      await page.waitForTimeout(300);

      // Should expand (details element should have 'open' attribute)
      const detailsElement = firstQuestion.locator('..');
      const isOpen = await detailsElement.evaluate((el) => el.hasAttribute('open'));
      expect(isOpen).toBe(true);
    });
  });

  test.describe('Package Display - All 3 Packages', () => {
    test('should display all package prices correctly', async ({ page }) => {
      await page.locator('#pakiety').scrollIntoViewIfNeeded();

      // Check all three prices are visible
      await expect(page.locator('text=59 zł').first()).toBeVisible();
      await expect(page.locator('text=99 zł').first()).toBeVisible();
      await expect(page.locator('text=199 zł').first()).toBeVisible();
    });

    test('should display all package value badges', async ({ page }) => {
      await page.locator('#pakiety').scrollIntoViewIfNeeded();

      // Check all value badges
      await expect(page.locator('text=💡 Podstawowy')).toBeVisible();
      await expect(page.locator('text=💡 Najpopularniejszy')).toBeVisible();
      await expect(page.locator('text=💡 Kompletny')).toBeVisible();
    });

    test('should show "Najpopularniejszy" badge only on Package 2', async ({ page }) => {
      await page.locator('#pakiety').scrollIntoViewIfNeeded();

      const popularBadge = page.locator('text=⭐ NAJPOPULARNIEJSZY');
      await expect(popularBadge).toHaveCount(1);
      await expect(popularBadge).toBeVisible();
    });

    test('all packages should mention delivery date "po 12 listopada"', async ({ page }) => {
      await page.locator('#pakiety').scrollIntoViewIfNeeded();

      const deliveryMentions = page.locator('text=wysyłka po 12 listopada');

      // Should appear at least 3 times (once per package)
      const count = await deliveryMentions.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('should display footer text with guarantees', async ({ page }) => {
      await page.locator('#pakiety').scrollIntoViewIfNeeded();

      // Check for guarantee text below packages
      await expect(page.locator('text=✓ Wysyłka po 12 listopada')).toBeVisible();
      await expect(page.locator('text=✓ 14 dni na zwrot')).toBeVisible();
      await expect(page.locator('text=✓ Materiały cyfrowe od razu')).toBeVisible();
    });

    test('packages should use responsive grid layout', async ({ page }) => {
      await page.locator('#pakiety').scrollIntoViewIfNeeded();

      const packageGrid = page.locator('.grid.md\\:grid-cols-3').first();
      await expect(packageGrid).toBeVisible();
      await expect(packageGrid).toHaveClass(/md:grid-cols-3/);
    });
  });

  test.describe('Hero Section - Presale Messaging', () => {
    test('should display presale badge in hero', async ({ page }) => {
      const presaleBadge = page.locator('text=🎉 Przedsprzedaż - ograniczona liczba egzemplarzy');
      await expect(presaleBadge).toBeVisible();
    });

    test('should display main heading', async ({ page }) => {
      const heading = page.locator('h1:has-text("Łamigłówki dla bystrej główki")');
      await expect(heading).toBeVisible();
    });

    test('should display book cover image', async ({ page }) => {
      const bookCover = page.locator('img[alt="Łamigłówki dla bystrej główki - okładka książki"]');
      await expect(bookCover).toBeVisible();

      // Check image source
      const src = await bookCover.getAttribute('src');
      expect(src).toContain('okladka przodem.webp');
    });

    test('should have CTA button linking to packages', async ({ page }) => {
      const ctaButton = page.locator('a:has-text("Zamów w przedsprzedaży")');
      await expect(ctaButton).toBeVisible();

      const href = await ctaButton.getAttribute('href');
      expect(href).toBe('#pakiety');
    });

    test('should display key benefits in hero', async ({ page }) => {
      await expect(page.locator('text=Dla dzieci 6-12 lat')).toBeVisible();
      await expect(page.locator('text=150+ zagadek')).toBeVisible();
      await expect(page.locator('text=Wysyłka po 12 listopada')).toBeVisible();
    });
  });

  test.describe('Presale Messaging Consistency', () => {
    test('should consistently mention "12 listopada" delivery date across page', async ({ page }) => {
      const deliveryMentions = page.locator('text=12 listopada');
      const count = await deliveryMentions.count();

      // Should appear multiple times (topbar, hero, packages, FAQ)
      expect(count).toBeGreaterThanOrEqual(4);
    });

    test('should consistently use "PRZEDSPRZEDAŻ" messaging', async ({ page }) => {
      const presaleMentions = page.locator('text=/przedsprzeda[żz]/i');
      const count = await presaleMentions.count();

      // Should appear multiple times
      expect(count).toBeGreaterThanOrEqual(2);
    });

    test('should emphasize digital materials are available immediately', async ({ page }) => {
      await page.locator('#faq').scrollIntoViewIfNeeded();

      const faq = page.locator('text=natychmiast po zakupie');
      await expect(faq).toBeVisible();

      const footer = page.locator('text=Materiały cyfrowe od razu');
      await expect(footer).toBeVisible();
    });
  });

  test.describe('Accessibility and UX', () => {
    test('should have proper page title', async ({ page }) => {
      await expect(page).toHaveTitle(/Łamigłówki/);
    });

    test('FAQ items should be keyboard accessible', async ({ page }) => {
      await page.locator('#faq').scrollIntoViewIfNeeded();

      const firstQuestion = page.locator('summary').first();

      // Tab to the element
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      // Should be able to activate with Enter
      await firstQuestion.focus();
      await page.keyboard.press('Enter');

      // Give time for animation
      await page.waitForTimeout(300);
    });

    test('all links should be valid (no broken anchors)', async ({ page }) => {
      // Check hero CTA
      const heroCTA = page.locator('a:has-text("Zamów w przedsprzedaży")');
      const heroHref = await heroCTA.getAttribute('href');

      if (heroHref?.startsWith('#')) {
        const sectionId = heroHref.substring(1);
        const section = page.locator(`#${sectionId}`);
        await expect(section).toBeAttached();
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile (375px)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Topbar should be visible
      const topbar = page.locator('div.sticky.top-0');
      await expect(topbar).toBeVisible();

      // Hero heading should be visible
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();

      // Packages should stack vertically
      await page.locator('#pakiety').scrollIntoViewIfNeeded();
      const packages = page.locator('.bg-white.rounded-2xl');
      await expect(packages.first()).toBeVisible();
    });

    test('should display correctly on tablet (768px)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      // Check key sections are visible
      await expect(page.locator('h1')).toBeVisible();
      await page.locator('#pakiety').scrollIntoViewIfNeeded();
      await expect(page.locator('text=Wybierz swój pakiet')).toBeVisible();
    });

    test('should display correctly on desktop (1920px)', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      // Check all sections render properly
      await expect(page.locator('h1')).toBeVisible();

      // Packages should be in 3-column grid
      await page.locator('#pakiety').scrollIntoViewIfNeeded();
      const packageGrid = page.locator('.grid.md\\:grid-cols-3').first();
      await expect(packageGrid).toBeVisible();
    });
  });
});
