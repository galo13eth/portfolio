import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('renders the Web3-first editorial hierarchy', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Senior Web3 Product Engineer/);
  await expect(page.locator('h1')).toContainText('Lucas');
  await expect(page.locator('#scene')).toBeAttached();
  await expect(page.locator('.route-row')).toHaveCount(3);
  await expect(page.locator('.hero-feature, .proof-strip, [data-status-state]')).toHaveCount(0);

  const sectionOrder = await page.locator('main > section[id]').evaluateAll((sections) => sections.map((section) => section.id));
  expect(sectionOrder).toEqual(['top', 'web3', 'ai-systems', 'systems', 'onchain-products', 'product-engineering', 'contact']);
});

test('keeps metrics contextual and removes dashboard internals', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#web3')).toContainText('90+ merged public production PRs');
  await expect(page.locator('#onchain-products')).toContainText('approximately 16');
  await expect(page.locator('#onchain-products')).toContainText('4,686-token');
  await expect(page.locator('#onchain-products')).toContainText('more than 50 game domains');

  const body = await page.locator('body').innerText();
  expect(body).not.toContain('176 contracts');
  expect(body).not.toContain('Merkle root');
  expect(body).not.toContain('Snapshot block');
  expect(body).not.toContain('4 / 4');
});

test('renders the targeted AI route from shared content', async ({ page }) => {
  await page.goto('/ai/');
  await expect(page).toHaveTitle(/AI Agent Platform Engineer/);
  await expect(page.locator('.hero .eyebrow')).toHaveText('Senior Software Engineer — AI Agent Platforms');
  await expect(page.locator('.route-row').first()).toContainText('AI agent platforms');

  const sectionOrder = await page.locator('main > section[id]').evaluateAll((sections) => sections.map((section) => section.id));
  expect(sectionOrder).toEqual(['top', 'ai-systems', 'systems', 'web3', 'product-engineering', 'contact']);
  await expect(page.locator('#onchain-products')).toHaveCount(0);
  await expect(page.locator('#product-engineering')).toContainText('ChatTCDF');
});

test('offers three role-specific résumé variants', async ({ page }) => {
  await page.goto('/resume/');
  await expect(page).toHaveTitle(/Résumés/);
  await expect(page.locator('.resume-row')).toHaveCount(3);
  await expect(page.getByRole('link', { name: /general résumé/i })).toHaveAttribute('href', '/resume/Lucas_Franca_Senior_Software_Engineer_Resume.pdf');
});

test('previews particle formations on pointer and keyboard focus', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'Touch layouts keep scroll-driven particles.');
  await page.goto('/');
  const web3 = page.locator('[data-preview-formation="1"]');
  const ai = page.locator('[data-preview-formation="2"]');

  await web3.hover();
  await expect(page.locator('#scene')).toHaveAttribute('data-preview-formation', '1');
  await ai.focus();
  await expect(page.locator('#scene')).toHaveAttribute('data-preview-formation', '2');
  await page.locator('.brand').focus();
  await expect(page.locator('#scene')).not.toHaveAttribute('data-preview-formation');
});

test('suppresses route previews for reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('[data-preview-formation="1"]').hover();
  await expect(page.locator('#scene')).not.toHaveAttribute('data-preview-formation');
});

test('case studies open and close', async ({ page }) => {
  await page.goto('/');
  const first = page.locator('details.case').first();
  await first.locator('summary').click();
  await expect(first).toHaveAttribute('open', '');
});

test('core content remains readable without JavaScript', async ({ browser }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'One semantic-content check is sufficient.');
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:8123/');
  await expect(page.locator('h1')).toContainText('Lucas');
  await expect(page.locator('#web3')).toContainText('Production Web3 systems');
  await expect(page.locator('#ai-systems')).toContainText('AI agents as first-class system users');
  await expect(page.locator('#systems')).toContainText('EVM Migration Lab');
  await context.close();
});

test('mobile layout preserves reading order without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('.nav-links .nav-detail').first()).toBeHidden();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('has no serious or critical accessibility violations', async ({ page }) => {
  for (const path of ['/', '/ai/', '/resume/']) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact))).toEqual([]);
  }
});
