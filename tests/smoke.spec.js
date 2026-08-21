import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('renders hero, canvas, and public-engineering cards', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Lucas Franca/);
  await expect(page.locator('h1')).toContainText('Lucas');
  await expect(page.locator('#scene')).toBeAttached();
  await expect(page.locator('.s-code .prs li')).toHaveCount(7);
});

test('case studies open and close', async ({ page }) => {
  await page.goto('/');
  const first = page.locator('details.case').first();
  await first.locator('summary').click();
  await expect(first).toHaveAttribute('open', '');
});

test('no critical accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(v => v.impact === 'critical')).toEqual([]);
});
