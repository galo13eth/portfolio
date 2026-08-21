import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const statusUrl = 'https://raw.githubusercontent.com/galo13eth/evm-migration-lab/main/status.json';
const validStatus = {
  environment: 'base-sepolia',
  chainId: '84532',
  live: true,
  generatedAt: '1787292636',
  snapshotBlock: '11533768',
  snapshotBlockHash: '0xa6472000959ac4f2d2632e418405d3b6dbc8ef3b003683c6c5b1bf2d2fc3ff2c',
  manifestEntries: '4',
  merkleRoot: '0xc13128996bc0d6ffe808e4715c61c31baca6c9d06211f41920136d2117c3591f',
  claimsCompleted: '4',
  reconciliationStatus: 'sample-consistent',
  lastVerifiedCommit: '70905f0ce48a1ad9ddae18d1938f81872cb305c8',
};

test.beforeEach(async ({ page }) => {
  await page.route(statusUrl, route => route.fulfill({ json: validStatus }));
});

test('renders the proof-forward hero and public work', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Lucas Franca/);
  await expect(page.locator('h1')).toContainText('Lucas');
  await expect(page.locator('#scene')).toBeAttached();
  await expect(page.locator('.proof-strip > div')).toHaveCount(4);
  await expect(page.locator('.flagship img')).toHaveAttribute('src', 'assets/evm-migration-lab-claim-app.png');
  await expect(page.locator('.pr-grid .work-card')).toHaveCount(6);
  await expect(page.locator('.utility a[href="#flagship"]')).toHaveText('Work');
});

test('renders validated live migration status', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-status-state]')).toHaveText('Live · Base Sepolia');
  await expect(page.locator('[data-status-claims]')).toHaveText('4 / 4');
  await expect(page.locator('[data-status-block]')).toHaveText('11,533,768');
  await expect(page.locator('[data-status-reconciliation]')).toHaveText('Sample-consistent');
  await expect(page.locator('[data-status-commit]')).toHaveText('70905f0c');
});

test('fails closed on an invalid status artifact', async ({ page }) => {
  await page.unroute(statusUrl);
  await page.route(statusUrl, route => route.fulfill({ json: { ...validStatus, chainId: '1' } }));
  await page.goto('/');
  await expect(page.locator('[data-status-state]')).toHaveText('Live artifact unavailable');
  await expect(page.locator('[data-status-claims]')).toHaveText('—');
  await expect(page.getByRole('link', { name: 'Repository', exact: true })).toBeVisible();
});

test('retains release evidence when status loading fails', async ({ page }) => {
  await page.unroute(statusUrl);
  await page.route(statusUrl, route => route.abort());
  await page.goto('/');
  await expect(page.locator('[data-status-state]')).toHaveText('Live artifact unavailable');
  await expect(page.getByRole('link', { name: 'Live verification' })).toBeVisible();
});

test('case studies open and close', async ({ page }) => {
  await page.goto('/');
  const first = page.locator('details.case').first();
  await first.locator('summary').click();
  await expect(first).toHaveAttribute('open', '');
});

test('mobile layout preserves reading order without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const desktopLinks = page.locator('.nav-links .desktop-nav');
  await expect(desktopLinks.first()).toBeHidden();
  await expect(desktopLinks.last()).toBeHidden();
  await expect(page.locator('.proof-strip > div')).toHaveCount(4);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('has no critical accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(v => v.impact === 'critical')).toEqual([]);
});
