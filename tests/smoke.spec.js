import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('renders the Web3-first editorial hierarchy', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Senior Web3 Product Engineer/);
  await expect(page.locator('h1')).toContainText('Lucas');
  await expect(page.locator('#scene')).toBeAttached();
  await expect(page.locator('.route-row')).toHaveCount(3);
  await expect(page.locator('.hero-feature, .proof-strip, [data-status-state]')).toHaveCount(0);
  await expect(page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'AI systems' })).toHaveAttribute('href', '#ai-systems');
  await expect(page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Résumé', exact: true })).toHaveAttribute('href', '/resume/');

  const sectionOrder = await page.locator('main > section[id]').evaluateAll((sections) => sections.map((section) => section.id));
  expect(sectionOrder).toEqual(['top', 'web3', 'ai-systems', 'systems', 'onchain-products', 'product-engineering', 'contact']);
});

test('features the strongest production systems with typed evidence', async ({ page }) => {
  await page.goto('/');
  const web3 = page.locator('#web3');
  await expect(web3.locator('.evidence-row')).toHaveCount(4);
  await expect(web3).toContainText('One governance product across EOAs, Safes, and embedded wallets.');
  await expect(web3).toContainText('Wallet-linked governance notifications across five channels.');
  await expect(web3).toContainText('Citizenship eligibility became an auditable state machine.');
  await expect(web3).toContainText('Trust became a user-controlled lens, not a platform-wide ranking.');
  await expect(web3).toContainText('Product write-up');
  await expect(web3).toContainText('Merged PR');
  await expect(web3).toContainText('Upstream PR · under review');
  await expect(web3.locator('.additional-evidence')).toContainText('Resumable contract publishing');
  await expect(web3.locator('.additional-evidence')).toContainText('Server-owned authorization');
  await expect(web3.locator('.additional-evidence')).toContainText('Sponsored execution reliability');
});

test('keeps architecture context visible and cases full width', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#web3 .architecture-intro')).toContainText('How the system fits together');
  await expect(page.locator('#web3 #governance-diagram-title')).toHaveText('Accounts, participation, identity, and execution.');
  await expect(page.locator('#ai-systems .architecture-intro')).toContainText('How a ticket becomes a pull request');
  await expect(page.locator('#ai-systems #takeait-diagram-title')).toHaveText('From ticket to reviewed pull request.');
  await expect(page.locator('#ai-systems .takeait-lifecycle > div')).toHaveCount(4);
  await expect(page.locator('#ai-systems .takeait-lifecycle')).toContainText('runner-owned repository check');

  for (const section of ['#web3', '#ai-systems']) {
    const order = await page.locator(`${section} .shell > .architecture-layout, ${section} .shell > .proof-columns, ${section} .shell > details.case`)
      .evaluateAll((elements) => elements.map((element) => element.matches('details') ? 'case' : element.classList.contains('proof-columns') ? 'proofs' : 'architecture'));
    expect(order.at(-1)).toBe('case');
  }
});

test('keeps metrics contextual and removes dashboard internals', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#web3')).toContainText('90+ merged public production PRs');
  await expect(page.locator('#onchain-products')).toContainText('approximately 16');
  await expect(page.locator('#onchain-products')).toContainText('4,686 Arbitrum Imbued Souls');
  await expect(page.locator('#onchain-products')).toContainText('more than 185,000 transactions');

  const body = await page.locator('body').innerText();
  expect(body).not.toContain('176 contracts');
  expect(body).not.toContain('Merkle root');
  expect(body).not.toContain('Snapshot block');
  expect(body).not.toContain('4 / 4');
});

test('shows product and onchain evidence for all three games', async ({ page }) => {
  await page.goto('/');
  const games = page.locator('#onchain-products');
  await expect(games.locator('.onchain-project')).toHaveCount(3);
  await expect(games.locator('.onchain-media img')).toHaveCount(4);
  await expect(games).toContainText('Official gameplay demo');
  await expect(games).toContainText('4,686 Imbued Souls');
  await expect(games).toContainText('BattleVersusV3 · 185k+ transactions');
  await expect(games).toContainText('Historical production system');
  await expect(games).not.toContainText('deterministic battle simulation');
  await expect(games).not.toContainText('more than 50 game domains');
  await expect(games.locator('#games-case')).toHaveClass(/takeait-case/);

  const evidenceLinkHeights = await games.locator('.onchain-evidence a').evaluateAll((links) =>
    links.map((link) => link.getBoundingClientRect().height));
  expect(evidenceLinkHeights.every((height) => height >= 40)).toBe(true);
});

test('expands the Agora case across the public governance stack', async ({ page }) => {
  await page.goto('/');
  const caseStudy = page.locator('#agora-case');
  await caseStudy.locator('summary').click();
  await expect(caseStudy.locator('.takeait-case-chapter')).toHaveCount(6);
  await expect(caseStudy).toContainText('Identity and eligibility are product state.');
  await expect(caseStudy).toContainText('Trust can be plural and contextual.');
  await expect(caseStudy).toContainText('dao-node and CPLS');
  await expect(caseStudy.locator('.case-evidence li')).toHaveCount(9);
});

test('renders the targeted AI route from shared content', async ({ page }) => {
  await page.goto('/ai/');
  await expect(page).toHaveTitle(/AI Agent Platform Engineer/);
  await expect(page.locator('.hero .eyebrow')).toHaveText('Senior Software Engineer — AI Agent Platforms');
  await expect(page.locator('.route-row').first()).toContainText('AI agent platforms');
  await expect(page.locator('#ai-systems h2')).toHaveText('TakeAIt — an AI-first ticketing system.');
  await expect(page.locator('#ai-systems')).toContainText('Agents can claim tickets');
  await expect(page.locator('#ai-systems')).toContainText('Durable workflows');
  await expect(page.locator('#ai-systems')).not.toContainText('model training');
  await expect(page.locator('#ai-systems .takeait-diagram .diagram-node').first()).toHaveText('Ticket + ordered assignment');

  const sectionOrder = await page.locator('main > section[id]').evaluateAll((sections) => sections.map((section) => section.id));
  expect(sectionOrder).toEqual(['top', 'ai-systems', 'systems', 'web3', 'product-engineering', 'contact']);
  await expect(page.locator('#onchain-products')).toHaveCount(0);
  await expect(page.locator('#product-engineering')).toContainText('ChatTCDF');
});

test('offers three role-specific résumé variants', async ({ page }) => {
  await page.goto('/resume/');
  await expect(page).toHaveTitle(/Résumé/);
  await expect(page.locator('.resume-hero .eyebrow')).toHaveText('Résumé versions');
  await expect(page.locator('.resume-hero h1')).toHaveText('Select the version that matches the role.');
  await expect(page.locator('.resume-row')).toHaveCount(3);
  await expect(page.locator('.resume-row .card-label')).toHaveText([
    'For Web3 product roles',
    'For AI-agent platform roles',
    'For backend and full-stack roles',
  ]);
  await expect(page.getByRole('link', { name: /general résumé/i })).toHaveAttribute('href', '/resume/Lucas_Franca_Senior_Software_Engineer_Resume.pdf');
});

test('presents engineering range as parallel capabilities', async ({ page }) => {
  await page.goto('/');
  const range = page.locator('.capabilities-section');
  await expect(range.locator('h2')).toHaveText('Protocol, backend, product, and operations.');
  await expect(range).toContainText('Product interfaces');
  await expect(range.locator('.capability-grid .row-number, .capability-grid dt span')).toHaveCount(0);
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

test('expands the TakeAIt architecture into the complete durable-work lifecycle', async ({ page }) => {
  await page.goto('/');
  const caseStudy = page.locator('#takeait-case');
  await caseStudy.locator('summary').click();
  await expect(caseStudy).toHaveAttribute('open', '');
  await expect(caseStudy.locator('.takeait-case-chapter')).toHaveCount(8);
  await expect(caseStudy).toContainText('The ticket outlives the model turn.');
  await expect(caseStudy).toContainText('.tai/WORKFLOW.md');
  await expect(caseStudy).toContainText('Recovery runs before any new work is claimed.');
  await expect(caseStudy).toContainText('every finding is fixed or rebutted');
  await expect(caseStudy).toContainText('33,000 lines of non-test code');
});

test('core content remains readable without JavaScript', async ({ browser }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'One semantic-content check is sufficient.');
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:8123/');
  await expect(page.locator('h1')).toContainText('Lucas');
  await expect(page.locator('#web3')).toContainText('Production Web3 systems');
  await expect(page.locator('#ai-systems')).toContainText('TakeAIt — an AI-first ticketing system.');
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
