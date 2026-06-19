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
  await expect(page.frameLocator('[data-preview-frame]').locator('.case-preview')).toHaveCount(7);
});

test('hero care cards link to matching case previews', async ({ page }) => {
  await page.goto('/index.html#what-i-care-about');

  await expect(page.locator('.care-card').nth(0)).toHaveAttribute('href', '#project-proptech');
  await expect(page.locator('.care-card').nth(1)).toHaveAttribute('href', 'https://nihaoserica.com/');
  await expect(page.locator('.care-card').nth(2)).toHaveAttribute('href', '#project-depology');
});

test('hero nav tabs and care cards remain clickable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/index.html');

  await page.waitForFunction(() => document.querySelectorAll('[data-hero-tab]').length > 0);
  await page.locator('#hero-tab-care').evaluate((tab) => tab.click());
  await expect(page.locator('#hero-panel-care')).toBeVisible();

  await expect(page.locator('.care-card[href="#project-proptech"]')).toBeVisible();
  await page.locator('.care-card[href="#project-proptech"]').click();
  await expect(page).toHaveURL(/#project-proptech$/);
  await expect(page.locator('#project-proptech')).toBeInViewport();
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
