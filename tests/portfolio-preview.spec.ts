import { expect, test } from '@playwright/test';

test('open portfolio preview in inspector', async ({ page }) => {
  await page.goto(process.env.PLAYWRIGHT_PREVIEW_PATH || '/index.html');
  await expect(page).toHaveTitle(/Joe|Portfolio|Tao/i);
  if (process.env.PLAYWRIGHT_INSPECTOR === '1') {
    await page.pause();
  }
});

test('preview shells load focused homepage sections', async ({ page }) => {
  await page.goto('/preview-hero.html');
  await expect(page.frameLocator('[data-preview-frame]').locator('.hero-stage')).toBeVisible();

  await page.goto('/preview-selected-work.html');
  await expect(page.frameLocator('[data-preview-frame]').locator('#work')).toBeVisible();
  await expect(page.frameLocator('[data-preview-frame]').locator('.case-preview')).toHaveCount(8);
});

test('hero care cards link to matching case previews', async ({ page }) => {
  await page.goto('/index.html#what-i-care-about');

  await expect(page.locator('.care-card').nth(0)).toHaveAttribute('href', '#project-mobile-work');
  await expect(page.locator('.care-card').nth(1)).toHaveAttribute('href', 'https://nihaoserica.com/');
  await expect(page.locator('.care-card').nth(2)).toHaveAttribute('href', '#project-depology');
});

test('daily life lightbox supports direct anchor links', async ({ page }) => {
  await page.goto('/index.html#life-industry-event');

  const lightbox = page.locator('[data-life-lightbox]');
  await expect(lightbox).toBeVisible();
  await expect(lightbox.locator('[data-life-lightbox-caption]')).toHaveText('Industry event');
  await expect(lightbox.locator('[data-life-lightbox-counter]')).toHaveText('4 / 6');
  await expect(lightbox.locator('[data-life-lightbox-image]')).toHaveAttribute('src', 'assets/daily-life/michelin-event.webp');

  await lightbox.locator('[data-life-lightbox-next]').click();
  await expect(page).toHaveURL(/#life-community-event$/);
  await lightbox.locator('[data-life-lightbox-close]').click();
  await expect(page).not.toHaveURL(/#life-/);
  await expect(lightbox).toBeHidden();
});

test('homepage experience accordions are collapsed by default', async ({ page }) => {
  await page.goto('/index.html#experience');

  const accordions = page.locator('.support-desktop .support-accordion');
  await expect(accordions).toHaveCount(2);
  await expect(accordions.nth(0)).not.toHaveAttribute('open', '');
  await expect(accordions.nth(1)).not.toHaveAttribute('open', '');

  await accordions.nth(0).locator('summary').click();
  await expect(accordions.nth(0)).toHaveAttribute('open', '');
  await expect(accordions.nth(0).getByRole('heading', { name: 'TUTU VIEW' })).toBeVisible();
});

test('hero nav tabs and care cards remain clickable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/index.html');

  await page.waitForFunction(() => document.querySelectorAll('[data-hero-tab]').length > 0);
  await page.locator('#hero-tab-care').evaluate((tab) => tab.click());
  await expect(page.locator('#hero-panel-care')).toBeVisible();

  await expect(page.locator('.care-card[href="#project-mobile-work"]')).toBeVisible();
  await page.locator('.care-card[href="#project-mobile-work"]').click();
  await expect(page).toHaveURL(/#project-mobile-work$/);
  await expect(page.locator('#project-mobile-work')).toBeInViewport();
});

test('recent mobile work ticker opens and navigates its lightbox', async ({ page }) => {
  await page.goto('/recent-mobile-work-case-study.html');
  await expect(page.getByRole('heading', { name: 'Designing decisions and journeys for mobile' })).toBeVisible();
  const ticker = page.locator('[data-mobile-ticker]');
  await expect(ticker.locator('[data-ticker-group]')).toHaveCount(2);
  await expect(ticker.locator('[data-mobile-bundle]')).toHaveCount(2);
  await expect(ticker.locator('.mobile-bundle__labels span')).toHaveCount(8);
  await expect(ticker.getByText('Blurred due to confidentiality, available upon request')).toHaveCount(4);
  await expect(ticker.locator('[data-open-lightbox]')).toHaveCount(8);
  await expect(ticker.locator('[data-ticker-group]:not([data-ticker-duplicate]) .mobile-bundle__image')).toHaveAttribute('src', 'assets/case_study_images_mobile_work/mobile-work-bundle.png');
  await expect(ticker.locator('[data-ticker-previous], [data-ticker-next]')).toHaveCount(0);
  await expect(ticker).toHaveAttribute('data-speed', 'fast');
  await ticker.hover();
  await expect(ticker).toHaveAttribute('data-speed', 'hover');
  await page.mouse.move(0, 0);
  await expect(ticker).toHaveAttribute('data-speed', 'fast');
  const startTransform = await ticker.locator('[data-ticker-track]').evaluate((track) => getComputedStyle(track).transform);
  await page.waitForTimeout(500);
  const movedTransform = await ticker.locator('[data-ticker-track]').evaluate((track) => getComputedStyle(track).transform);
  expect(movedTransform).not.toBe(startTransform);
  await ticker.locator('[data-ticker-group]:not([data-ticker-duplicate]) [data-open-lightbox][data-slide-index="1"]').click();
  const lightbox = page.locator('[data-lightbox]');
  await expect(lightbox).toHaveAttribute('aria-hidden', 'false');
  await expect(lightbox.getByText('Confidential design exercise')).toBeVisible();
  await expect(lightbox.getByRole('heading', { name: 'TripUp' })).toBeVisible();
  await expect(lightbox.getByText('Blurred due to confidentiality', { exact: true })).toBeVisible();
  await lightbox.locator('[data-lightbox-next]').click();
  await expect(lightbox.getByRole('heading', { name: 'Sushi Code: mobile decision wireflow' })).toBeVisible();
  await expect(lightbox.getByText('Blurred due to confidentiality', { exact: true })).toBeHidden();
  await lightbox.locator('[data-lightbox-close]').click();
  await expect(lightbox).toHaveAttribute('aria-hidden', 'true');
});

test('recent mobile work homepage card uses the exported thumbnail', async ({ page }) => {
  await page.goto('/index.html#project-mobile-work');
  const thumbnail = page.locator('#project-mobile-work img[alt*="Recent mobile product work"]');
  await expect(thumbnail).toBeVisible();
  await expect(thumbnail).toHaveAttribute('src', 'assets/case_study_images_mobile_work/mobile-work-thumbnail.png');
  const outlines = await page.locator('.case-visual img').evaluateAll((images) => images.map((image) => getComputedStyle(image).outlineStyle));
  expect(outlines.every((style) => style === 'none')).toBeTruthy();
});


test('TripMi protected page uses access gate', async ({ page }) => {
  await page.goto('/index.html#project-tripmi');

  await expect(page.locator('#project-tripmi .case-link')).toHaveAttribute('href', 'tripmi-case-study.html');

  await page.goto('/tripmi-case-study.html');
  await expect(page.getByRole('heading', { name: 'TripMi' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'This project is password protected.' })).toBeVisible();
  await expect(page.getByLabel('Password field:')).toHaveAttribute('placeholder', 'Enter password');
  await expect(page.getByRole('button', { name: 'View project' })).toBeVisible();
  await expect(page.getByText('Need access? Contact me to view.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Email' })).toHaveAttribute('href', /TripMi%20case%20study%20access/);
  await expect(page.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/joetao/');
});
