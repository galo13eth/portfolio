import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  additionalEvidence,
  agoraCase,
  capabilities,
  engineeringRoutes,
  gamesCase,
  heroes,
  links,
  migrationProofs,
  onchainProducts,
  productSystems,
  resumes,
  takeaitCase,
  takeaitProofs,
  web3Stories,
} from './content.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');

const h = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const link = (label, href, className = '') =>
  '<a' + (className ? ' class="' + className + '"' : '') + ' href="' + h(href) + '">' + label + '</a>';

function renderHeader(page) {
  const local = page !== 'resume';
  const href = (id, route = '') => local ? '#' + id : '/' + route + '#' + id;
  const aiHref = page === 'resume' ? '/ai/#ai-systems' : '#ai-systems';
  return [
    '<header class="site-header">',
      '<nav class="utility shell" aria-label="Primary navigation">',
        '<a class="brand" href="/" aria-label="Lucas Franca, homepage">LF/</a>',
        '<div class="nav-links">',
          link('Work', href('work')),
          link('Web3', href('web3'), 'nav-detail'),
          link('AI systems', aiHref),
          link('Systems', href('systems'), 'nav-detail'),
          link('Résumé', '/resume/'),
          link('Email', links.email),
        '</div>',
      '</nav>',
    '</header>',
  ].join('');
}

function renderActions(actions) {
  return '<div class="hero-actions">' + actions.map(([label, href, style]) =>
    link(h(label) + (style === 'primary' ? ' <span aria-hidden="true">↓</span>' : ''), href, style === 'text-action' ? style : 'button ' + style)
  ).join('') + '</div>';
}

function renderHero(kind) {
  const hero = heroes[kind];
  return [
    '<section id="top" class="hero" data-formation="', hero.formation, '" data-accent="', hero.accent, '">',
      '<div class="hero-grid shell">',
        '<div class="hero-copy">',
          '<p class="eyebrow">', h(hero.eyebrow), '</p>',
          '<h1><span>Lucas</span><span>Franca</span></h1>',
          '<p class="lede">', h(hero.copy), '</p>',
          '<p class="hero-stack">', h(hero.stack), '</p>',
          '<p class="hero-proof">', h(hero.proof), '</p>',
          renderActions(hero.actions),
        '</div>',
        '<nav id="work" class="route-index" aria-label="Selected engineering routes">',
          '<p class="route-label">Selected engineering</p>',
          hero.routeOrder.map((key) => {
            const route = engineeringRoutes[key];
            return [
              '<a class="route-row" href="', route.href, '" data-preview-formation="', route.formation,
                '" data-preview-accent="', route.accent, '">',
                '<span class="route-number">', route.number, '</span>',
                '<span class="route-content"><strong>', h(route.label), '</strong><span>', h(route.copy),
                  '</span><small>', h(route.action), ' →</small></span>',
                '<span class="route-arrow" aria-hidden="true">↘</span>',
              '</a>',
            ].join('');
          }).join(''),
        '</nav>',
      '</div>',
    '</section>',
  ].join('');
}

function renderCase(title, content, id) {
  const labels = {
    problem: 'Problem',
    ownership: 'Ownership',
    constraints: 'Constraints',
    architecture: 'Architecture',
    decisions: 'Hard decisions',
    outcome: 'Outcome',
  };
  return [
    '<details id="', id, '" class="case surface">',
      '<summary>', h(title), '</summary>',
      '<div class="case-body">',
        Object.entries(content).map(([key, copy]) => '<div><h3>' + labels[key] + '</h3><p>' + h(copy) + '</p></div>').join(''),
      '</div>',
    '</details>',
  ].join('');
}

function renderGovernanceDiagram() {
  return [
    '<figure class="system-diagram surface" role="img" aria-labelledby="governance-diagram-title governance-diagram-caption">',
      '<p class="card-label">Wallet-aware governance flow</p>',
      '<h3 id="governance-diagram-title">One governance product, three wallet models.</h3>',
      '<div class="diagram-inputs"><span>EOA</span><span>Safe</span><span>Embedded wallet</span></div>',
      '<span class="diagram-arrow" aria-hidden="true">↓</span>',
      '<div class="diagram-node accent-node">Wallet-aware product layer</div>',
      '<span class="diagram-arrow" aria-hidden="true">↓</span>',
      '<div class="diagram-split"><span>SIWE authorization</span><span>EIP-712 signing</span></div>',
      '<span class="diagram-arrow" aria-hidden="true">↓</span>',
      '<div class="diagram-split"><span>Indexed governance</span><span>Onchain execution</span></div>',
      '<figcaption id="governance-diagram-caption">Account-specific onboarding and signing converge on shared authorization, indexed governance state, and receipt-verified execution.</figcaption>',
    '</figure>',
  ].join('');
}

function renderWeb3() {
  return [
    '<section id="web3" class="content-section s-web3" data-formation="1" data-accent="#5d86ff">',
      '<div class="shell">',
        '<header class="section-heading">',
          '<p class="eyebrow">Selected production systems · Agora · 2025 — now</p>',
          '<h2>Production Web3 systems</h2>',
          '<p>Contracts, chain data, backend workflows, and wallet UX shipped together. <strong>90+ merged public production PRs</strong> across governance systems used by Optimism, ENS, and Uniswap.</p>',
        '</header>',
        '<ol class="evidence-grid">',
          web3Stories.map((story, index) => [
            '<li class="evidence-row">',
              '<span class="row-number">0', index + 1, '</span>',
              '<article>',
                '<p class="card-label">', h(story.label), '</p>',
                '<h3>', h(story.title), '</h3>',
                '<dl class="decision-list">',
                  '<div><dt>Problem</dt><dd>', h(story.problem), '</dd></div>',
                  '<div><dt>Decision</dt><dd>', h(story.decision), '</dd></div>',
                  '<div><dt>Outcome</dt><dd>', h(story.outcome), '</dd></div>',
                '</dl>',
                '<p class="evidence-meta">', h(story.stack), '</p>',
                '<div class="evidence-sources">', story.evidence.map(([type, label, href]) => [
                  '<span><small>', h(type), '</small>', link(h(label) + ' ↗', href), '</span>',
                ].join('')).join(''), '</div>',
              '</article>',
            '</li>',
          ].join('')).join(''),
        '</ol>',
        '<aside class="additional-evidence" aria-label="Additional engineering evidence">',
          '<p class="card-label">Additional engineering evidence</p>',
          '<ul>', additionalEvidence.map(([type, label, href]) => [
            '<li><span>', h(type), '</span>', link(h(label) + ' ↗', href), '</li>',
          ].join('')).join(''), '</ul>',
        '</aside>',
        '<div class="architecture-layout">',
          '<div class="architecture-intro">',
            '<p class="card-label">How the system fits together</p>',
            '<h3>One governance product across three wallet models.</h3>',
            '<p>EOAs, Safes, and embedded wallets need different onboarding and signing experiences. They converge on shared server-owned authorization, indexed governance state, and receipt-verified execution.</p>',
            '<dl class="architecture-facts">',
              '<div><dt>My role</dt><dd>Architecture and end-to-end implementation</dd></div>',
              '<div><dt>Constraint</dt><dd>One backward-compatible multi-tenant product</dd></div>',
              '<div><dt>Result</dt><dd>Wallet-aware workflows across live governance deployments</dd></div>',
            '</dl>',
          '</div>',
          renderGovernanceDiagram(),
        '</div>',
        renderCase('Read the full Agora case study', agoraCase, 'agora-case'),
      '</div>',
    '</section>',
  ].join('');
}

function renderTakeaitDiagram() {
  return [
    '<figure class="system-diagram surface takeait-diagram" role="img" aria-labelledby="takeait-diagram-title takeait-diagram-caption">',
      '<p class="card-label">Durable agent execution</p>',
      '<h3 id="takeait-diagram-title">From ticket to reviewed pull request.</h3>',
      '<div class="diagram-node">Ticket</div>',
      '<span class="diagram-arrow" aria-hidden="true">↓</span>',
      '<div class="diagram-node">Web control plane</div>',
      '<span class="diagram-arrow" aria-hidden="true">↓</span>',
      '<div class="diagram-node">GCP provisioning</div>',
      '<span class="diagram-arrow" aria-hidden="true">↓ poll only</span>',
      '<div class="diagram-node accent-node">Private Go runner host</div>',
      '<span class="diagram-arrow" aria-hidden="true">↓</span>',
      '<div class="diagram-node">Isolated agent workspace</div>',
      '<span class="diagram-arrow" aria-hidden="true">↓</span>',
      '<div class="diagram-node">Pull request</div>',
      '<span class="diagram-return" aria-hidden="true">Human pause · question · redirect · review ↑</span>',
      '<figcaption id="takeait-diagram-caption">Execution runs on private, zero-inbound hosts.</figcaption>',
    '</figure>',
  ].join('');
}

function renderAiSystems(page) {
  return [
    '<section id="ai-systems" class="content-section s-ai" data-formation="2" data-accent="#ffab5e">',
      '<div class="shell">',
        '<header class="section-heading">',
          '<p class="eyebrow">AI agent platforms</p>',
          '<h2>TakeAIt — an AI-first ticketing system.</h2>',
          '<div class="section-copy">',
            '<p>Humans and coding agents are first-class users. Agents can claim tickets, create isolated workspaces, run tools, stream progress, ask for input, open pull requests, and pause for human review.</p>',
            '<p>I built the Next.js/PostgreSQL control plane, GCP provisioning layer, and multi-daemon Go runner runtime that make those long-running workflows secure, durable, and recoverable.</p>',
          '</div>',
          '<div class="project-actions">',
            page === 'home' ? link('Open AI-focused portfolio →', '/ai/', 'text-action') : '',
            link('AI/platform résumé →', links.aiResume, 'text-action'),
          '</div>',
        '</header>',
        '<div class="architecture-layout">',
          '<div class="architecture-intro">',
            '<p class="card-label">How a ticket becomes a pull request</p>',
            '<h3>Agents own work; humans retain control.</h3>',
            '<p>Humans create and supervise work through the control plane. Agents claim tickets and execute inside private, poll-only Go runners, with durable state and explicit intervention points throughout the run.</p>',
          '</div>',
          renderTakeaitDiagram(),
        '</div>',
        '<div class="proof-columns takeait-proofs">',
          takeaitProofs.map((proof, index) => [
            '<article>',
              '<span class="row-number">0', index + 1, '</span><h3>', h(proof.title), '</h3>',
              '<ul>', proof.items.map((item) => '<li>' + h(item) + '</li>').join(''), '</ul>',
            '</article>',
          ].join('')).join(''),
        '</div>',
        renderCase('Read the full TakeAIt architecture case study', takeaitCase, 'takeait-case'),
      '</div>',
    '</section>',
  ].join('');
}

function renderMigration() {
  return [
    '<section id="systems" class="content-section s-systems" data-formation="0" data-accent="#93a8e8">',
      '<div class="shell">',
        '<header class="section-heading">',
          '<p class="eyebrow">Original open-source systems project · Rust, Solidity, React</p>',
          '<h2>EVM Migration Lab</h2>',
          '<p>A public reference system for migrating ERC-721 and ERC-1155 state between EVM chains, with every snapshot and destination claim independently inspectable.</p>',
        '</header>',
        '<div class="flagship-layout">',
          '<figure class="product-shot surface">',
            '<img src="/assets/evm-migration-lab-claim-app.png" alt="EVM Migration Lab reconciliation view showing the verified Base Sepolia campaign" width="1280" height="1970">',
            '<figcaption>Fail-closed verification against the released Sepolia → Base Sepolia reference deployment.</figcaption>',
          '</figure>',
          '<div class="flagship-copy">',
            '<p class="release-label"><span aria-hidden="true"></span>Original open-source project · v0.1.0</p>',
            '<p class="verified-line">Verified Sepolia → Base Sepolia reference deployment</p>',
            '<ol class="proof-list">',
              migrationProofs.map((proof, index) => [
                '<li><span>0', index + 1, '</span><div><strong>', h(proof.title), '</strong><p>', h(proof.copy), '</p></div></li>',
              ].join('')).join(''),
            '</ol>',
            '<nav class="project-links" aria-label="EVM Migration Lab evidence">',
              link('Open-source repository', links.migrationRepo),
              link('Verified reference deployment', links.migrationLive),
              link('Canary evidence', links.migrationCanary),
              link('Tagged release', links.migrationRelease),
            '</nav>',
          '</div>',
        '</div>',
      '</div>',
    '</section>',
  ].join('');
}

function renderOnchain() {
  return [
    '<section id="onchain-products" class="content-section s-onchain" data-formation="3" data-accent="#ff6490">',
      '<div class="shell">',
        '<header class="section-heading">',
          '<p class="eyebrow">2023 — present · production games</p>',
          '<h2>Onchain products that stay up</h2>',
          '<p>Real-time gameplay, irreversible assets, and live chain migrations treated as product and operations problems—not contract demos.</p>',
        '</header>',
        '<div class="editorial-list">',
          onchainProducts.map((product, index) => [
            '<article class="editorial-row">',
              '<span class="row-number">0', index + 1, '</span>',
              '<p class="card-label">', h(product.meta), '</p>',
              '<h3>', h(product.title), '</h3>',
              '<p>', h(product.copy), '</p>',
            '</article>',
          ].join('')).join(''),
        '</div>',
        renderCase('Read the onchain-products case study', gamesCase, 'games-case'),
      '</div>',
    '</section>',
  ].join('');
}

function renderProductSystems(onlyTcdf = false) {
  const products = onlyTcdf ? productSystems.filter((product) => product.id === 'tcdf') : productSystems;
  return [
    '<section id="product-engineering" class="content-section s-product" data-formation="0" data-accent="#66e2c0">',
      '<div class="shell">',
        '<header class="section-heading">',
          '<p class="eyebrow">Product systems beyond the protocol layer</p>',
          '<h2>Products beyond Web3</h2>',
          '<p>Backend, full-stack, real-time, payments, and applied-AI systems with product ownership from requirements through operations.</p>',
        '</header>',
        '<div class="editorial-list product-list">',
          products.map((product, index) => [
            '<article class="editorial-row">',
              '<span class="row-number">0', index + 1, '</span>',
              '<p class="card-label">', h(product.meta), '</p>',
              '<h3>', h(product.title), '</h3>',
              '<p>', h(product.copy), '</p>',
              product.href ? link(h(product.action) + ' ↗', product.href, 'evidence-link') : '',
            '</article>',
          ].join('')).join(''),
        '</div>',
      '</div>',
    '</section>',
  ].join('');
}

function renderDurableSystems() {
  const relay = web3Stories.find((story) => story.id === 'relay');
  const stories = [
    {
      meta: relay.label,
      title: relay.title,
      copy: relay.decision + ' ' + relay.outcome,
      href: relay.evidence[0][2],
      evidence: 'Merged PR',
    },
    {
      meta: 'Recovery',
      title: 'Publishing that survives restarts.',
      copy: 'Batch writes, persisted progress, and idempotently resumable steps let interrupted contract-publication runs recover instead of starting over.',
      href: 'https://github.com/voteagora/op-atlas/pull/1441',
      evidence: 'Merged PR',
    },
    {
      meta: onchainProducts[0].meta,
      title: 'Recoverable real-time matchmaking',
      copy: 'Atomic match creation, persisted queue state, delivery acknowledgements, lock recovery, and health monitoring for a live multiplayer game.',
    },
    {
      meta: onchainProducts[1].meta,
      title: 'Deterministic long-running simulation',
      copy: 'A 60-second server tick, deterministic battle engine, SSE state delivery, audit ledgers, and recoverable transaction workflows.',
    },
  ];
  return [
    '<section id="web3" class="content-section s-web3" data-formation="1" data-accent="#5d86ff">',
      '<div class="shell">',
        '<header class="section-heading">',
          '<p class="eyebrow">Reliability evidence from production Web3</p>',
          '<h2>Durable systems under irreversible constraints</h2>',
          '<p>Web3 supplied unusually strict environments for the same backend concerns: concurrency, recovery, authorization, observability, and real-time state.</p>',
        '</header>',
        '<div class="editorial-list">',
          stories.map((story, index) => [
            '<article class="editorial-row">',
              '<span class="row-number">0', index + 1, '</span>',
              '<p class="card-label">', h(story.meta), '</p>',
              '<h3>', h(story.title), '</h3>',
              '<p>', h(story.copy), '</p>',
              story.href ? link(h(story.evidence) + ' ↗', story.href, 'evidence-link') : '',
            '</article>',
          ].join('')).join(''),
        '</div>',
      '</div>',
    '</section>',
  ].join('');
}

function renderCapabilities() {
  return [
    '<section class="content-section capabilities-section" data-formation="0" data-accent="#66e2c0">',
      '<div class="shell">',
        '<header class="section-heading compact-heading">',
          '<p class="eyebrow">Engineering range</p>',
          '<h2>Protocol, backend, product, and operations.</h2>',
          '<p>The systems I ship usually cross all four—from contracts and indexed data through durable services, user-facing interfaces, and production infrastructure.</p>',
        '</header>',
        '<dl class="capability-grid">',
          capabilities.map((capability) => [
            '<div><dt>', h(capability.title), '</dt><dd>', h(capability.copy), '</dd></div>',
          ].join('')).join(''),
        '</dl>',
      '</div>',
    '</section>',
  ].join('');
}

function renderContact() {
  return [
    '<section id="contact" class="content-section s-contact" data-formation="0" data-accent="#66e2c0">',
      '<div class="contact-layout shell">',
        '<div>',
          '<p class="eyebrow">Full-time remote · international contractor</p>',
          '<h2>Build the whole system.</h2>',
          '<p>Available from Brasília, UTC−3, with four or more hours of U.S. Eastern overlap.</p>',
        '</div>',
        '<div class="contact-block surface">',
          link('lucasagfranca@gmail.com', links.email, 'email'),
          '<nav class="contact-links" aria-label="Contact and profiles">',
            link('GitHub', links.github), link('LinkedIn', links.linkedin), link('Résumé versions', '/resume/'),
          '</nav>',
        '</div>',
        '<footer>The field behind this page is one set of particles reorganizing into a constellation, governance quorum, execution lattice, and game world.</footer>',
      '</div>',
    '</section>',
  ].join('');
}

function renderResumePage() {
  return [
    '<main id="main-content" class="resume-main">',
      '<section class="resume-hero">',
        '<div class="shell">',
          '<p class="eyebrow">Résumé versions</p>',
          '<h1>Select the version that matches the role.</h1>',
          '<p class="lede">The experience is the same; each version emphasizes the work most relevant to Web3 product, AI-agent platform, or backend and full-stack positions.</p>',
          '<div class="resume-list">',
            resumes.map((resume, index) => [
              '<article class="resume-row">',
                '<span class="row-number">0', index + 1, '</span>',
                '<div><p class="card-label">', h(resume.label), '</p><h2>', h(resume.title), '</h2><p>', h(resume.copy), '</p></div>',
                link(h(resume.action) + ' ↓', resume.href, 'button secondary'),
              '</article>',
            ].join('')).join(''),
          '</div>',
        '</div>',
      '</section>',
      renderContact(),
    '</main>',
  ].join('');
}

const pageMeta = {
  home: {
    title: 'Lucas Franca — Senior Web3 Product Engineer',
    description: 'Senior Web3 product engineer shipping smart contracts, indexed chain data, backend services, wallet products, and secure AI-agent platforms.',
    canonical: 'https://lucasfranca.dev/',
    image: 'https://lucasfranca.dev/og.png',
  },
  ai: {
    title: 'Lucas Franca — AI Agent Platform Engineer',
    description: 'Secure and durable AI-agent platforms: Go runners, GCP provisioning, isolated execution, crash recovery, and human supervision.',
    canonical: 'https://lucasfranca.dev/ai/',
    image: 'https://lucasfranca.dev/ai/og.png',
  },
  resume: {
    title: 'Résumé — Lucas Franca',
    description: 'Résumé variants for Web3 product engineering, AI-agent platforms, and backend and product systems.',
    canonical: 'https://lucasfranca.dev/resume/',
    image: 'https://lucasfranca.dev/og.png',
  },
};

function document(page, body) {
  const meta = pageMeta[page];
  const particles = page !== 'resume';
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
      '<meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      '<title>', h(meta.title), '</title>',
      '<meta name="description" content="', h(meta.description), '">',
      '<link rel="canonical" href="', meta.canonical, '">',
      '<meta property="og:type" content="website">',
      '<meta property="og:url" content="', meta.canonical, '">',
      '<meta property="og:title" content="', h(meta.title), '">',
      '<meta property="og:description" content="', h(meta.description), '">',
      '<meta property="og:image" content="', meta.image, '">',
      '<meta name="twitter:card" content="summary_large_image">',
      '<meta name="twitter:title" content="', h(meta.title), '">',
      '<meta name="twitter:description" content="', h(meta.description), '">',
      '<meta name="twitter:image" content="', meta.image, '">',
      '<script type="application/ld+json">{"@context":"https://schema.org","@type":"Person","name":"Lucas Franca","jobTitle":"Senior Web3 Product Engineer","url":"https://lucasfranca.dev","email":"mailto:lucasagfranca@gmail.com","address":{"@type":"PostalAddress","addressLocality":"Brasília","addressCountry":"BR"},"sameAs":["https://github.com/galo13eth","https://linkedin.com/in/lucasagfranca"]}</script>',
      '<link rel="icon" href="data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'><circle cx=\'10\' cy=\'12\' r=\'4\' fill=\'%235D86FF\'/><circle cx=\'22\' cy=\'9\' r=\'3\' fill=\'%23FFAB5E\'/><circle cx=\'19\' cy=\'22\' r=\'5\' fill=\'%23FF6490\'/></svg>">',
      '<link rel="preconnect" href="https://fonts.googleapis.com">',
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
      '<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=Instrument+Sans:wght@400;500;600&family=Spline+Sans+Mono:wght@400;500&display=swap" rel="stylesheet">',
      '<link rel="stylesheet" href="/style.css">',
      particles ? '<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js"}}</script>' : '',
    '</head>',
    '<body class="page-', page, '">',
      '<a class="skip-link" href="#main-content">Skip to content</a>',
      particles ? '<canvas id="scene" aria-hidden="true"></canvas>' : '',
      renderHeader(page),
      body,
      particles ? '<script type="module" src="/main.js"></script>' : '',
    '</body>',
    '</html>',
  ].join('');
}

const home = document('home', [
  '<main id="main-content">',
    renderHero('home'),
    renderWeb3(),
    renderAiSystems('home'),
    renderMigration(),
    renderOnchain(),
    renderProductSystems(),
    renderCapabilities(),
    renderContact(),
  '</main>',
].join(''));

const ai = document('ai', [
  '<main id="main-content">',
    renderHero('ai'),
    renderAiSystems('ai'),
    renderMigration(),
    renderDurableSystems(),
    renderProductSystems(true),
    renderCapabilities(),
    renderContact(),
  '</main>',
].join(''));

const outputs = new Map([
  ['index.html', home],
  ['ai/index.html', ai],
  ['resume/index.html', document('resume', renderResumePage())],
]);

let stale = false;
for (const [path, contents] of outputs) {
  const target = resolve(root, path);
  if (check) {
    let current = '';
    try { current = readFileSync(target, 'utf8'); } catch {}
    if (current !== contents) {
      console.error(path + ' is stale; run node site/render.mjs');
      stale = true;
    }
  } else {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, contents);
    console.log('generated ' + path);
  }
}

if (stale) process.exitCode = 1;
