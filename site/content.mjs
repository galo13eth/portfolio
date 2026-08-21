export const links = {
  email: 'mailto:lucasagfranca@gmail.com',
  github: 'https://github.com/galo13eth',
  linkedin: 'https://linkedin.com/in/lucasagfranca',
  web3Resume: '/resume/Lucas_Franca_Web3_Resume.pdf',
  aiResume: '/resume/Lucas_Franca_AI_Agent_Platforms_Resume.pdf',
  softwareResume: '/resume/Lucas_Franca_Senior_Software_Engineer_Resume.pdf',
  migrationRepo: 'https://github.com/galo13eth/evm-migration-lab',
  migrationLive: 'https://web-production-fab71.up.railway.app',
  migrationCanary: 'https://github.com/galo13eth/evm-migration-lab/blob/v0.1.0/docs/canary-sepolia-base-sepolia.md',
  migrationRelease: 'https://github.com/galo13eth/evm-migration-lab/releases/tag/v0.1.0',
};

export const heroes = {
  home: {
    eyebrow: 'Senior Web3 Product Engineer',
    copy: 'I build smart contracts, indexed chain data, backend services, and wallet-connected products as one production system. Beyond Web3, I build secure AI-agent platforms, Go services, and Rust/EVM tooling.',
    stack: 'Solidity · Go · TypeScript · React · Rust',
    proof: '12+ years shipping software · 4+ years shipping Web3 · Brasília, UTC−3 · full-time remote',
    actions: [
      ['View selected work', '#web3', 'primary'],
      ['Web3 résumé', links.web3Resume, 'secondary'],
      ['AI/platform résumé', links.aiResume, 'text-action'],
    ],
    routeOrder: ['web3', 'ai', 'systems'],
    formation: 0,
    accent: '#93a8e8',
  },
  ai: {
    eyebrow: 'Senior Software Engineer — AI Agent Platforms',
    copy: 'I build secure, durable execution platforms for coding agents: control planes, private Go runners, cloud provisioning, crash recovery, and human supervision.',
    stack: 'Go · TypeScript · PostgreSQL · GCP · React',
    proof: '12+ years shipping software · Brasília, UTC−3 · full-time remote',
    actions: [
      ['View AI systems', '#ai-systems', 'primary'],
      ['AI/platform résumé', links.aiResume, 'secondary'],
      ['General résumé', links.softwareResume, 'text-action'],
    ],
    routeOrder: ['ai', 'systems', 'web3'],
    formation: 2,
    accent: '#ffab5e',
  },
};

export const engineeringRoutes = {
  web3: {
    number: '01',
    label: 'Production Web3',
    copy: 'Governance infrastructure for Optimism, ENS & Uniswap',
    href: '#web3',
    action: 'Public engineering',
    formation: 1,
    accent: '#5d86ff',
  },
  ai: {
    number: '02',
    label: 'AI agent platforms',
    copy: 'TakeAIt · Go runners · GCP · durable execution',
    href: '#ai-systems',
    action: 'Agent-platform case study',
    formation: 2,
    accent: '#ffab5e',
  },
  systems: {
    number: '03',
    label: 'Systems & open source',
    copy: 'EVM Migration Lab · Rust · Solidity · React',
    href: '#systems',
    action: 'Repository and live reference',
    formation: 0,
    accent: '#93a8e8',
  },
};

export const web3Stories = [
  {
    id: 'wallets',
    label: 'Wallet architecture',
    title: 'One governance product across EOAs, Safes, and embedded wallets.',
    problem: 'Three fundamentally different account models needed to use the same proposal, voting, delegation, and transaction flows.',
    decision: 'Build account-aware wallet flows: automatic Safe detection and signer progress, reusable SIWE sessions, and tenant-gated Privy integration that reused the existing wagmi and EIP-712 infrastructure.',
    outcome: 'Multisig and email/social users gained first-class workflows without breaking the wallet and relay behavior existing tenants depended on.',
    stack: 'Safe · Privy · wagmi · SIWE · EIP-712',
    evidence: [
      ['Product write-up', 'Safe Wallet Improvements', 'https://www.agora.xyz/blogs/15-safe-wallet-improvements'],
      ['Merged PR', 'agora-next#1567', 'https://github.com/voteagora/agora-next/pull/1567'],
    ],
  },
  {
    id: 'notifications',
    label: 'Notification infrastructure',
    title: 'Wallet-linked governance notifications across five channels.',
    problem: 'Governance users needed event-specific alerts across email, Discord, Slack, Telegram, and browser push, without duplicate, unauthorized, or unverified delivery.',
    decision: 'Centralize channel verification, wallet-linked preferences, event permissions, retries, deduplication, failure isolation, and delivery analytics.',
    outcome: 'One reusable notification platform serving multiple governance products and tenant DAOs.',
    stack: 'TypeScript · queues · multichannel delivery',
    evidence: [
      ['Product write-up', 'Notifications Hub', 'https://www.agora.xyz/blogs/9-notification-hub'],
    ],
  },
  {
    id: 'authorization',
    label: 'Authorization',
    title: 'Authorization decisions belong on the server.',
    problem: 'Forum actions trusted per-action client signatures and client-supplied authorization flags.',
    decision: 'Reuse SIWE JWT authentication and move ownership plus RBAC checks server-side.',
    outcome: 'Smaller clients and gated administrative APIs with one authorization boundary.',
    stack: 'SIWE · JWT · RBAC',
    evidence: [
      ['Merged PR', 'agora-next#1437', 'https://github.com/voteagora/agora-next/pull/1437'],
    ],
  },
  {
    id: 'relay',
    label: 'Production debugging',
    title: 'A transaction hash was not success.',
    problem: 'Relayed delegateBySig transactions submitted successfully but reverted out of gas.',
    decision: 'Trace real receipts, replace fixed limits with estimate-based buffers, and verify completion.',
    outcome: 'The UI reports success only after the sponsored transaction actually succeeds.',
    stack: 'EIP-712 · gas relays · tracing',
    evidence: [
      ['Merged PR', 'agora-next#1514', 'https://github.com/voteagora/agora-next/pull/1514'],
    ],
  },
];

export const additionalEvidence = [
  ['Merged PR', 'Optimism citizenship and Sybil resistance', 'https://github.com/voteagora/op-atlas/pull/1465'],
  ['Merged PR', 'Resumable contract publishing', 'https://github.com/voteagora/op-atlas/pull/1441'],
  ['Upstream PR · under review', 'Go webhook authentication', 'https://github.com/superplanehq/superplane/pull/6702'],
];

export const agoraCase = {
  problem: 'Optimism, ENS, and Uniswap needed one product covering proposals, voting, delegation, grants, and identity across EOAs, Safe multisigs, and embedded wallets.',
  ownership: 'Architecture and end-to-end delivery of multi-tenant governance features: Safe-native signing, notifications, authentication, attestation-backed eligibility, and citizenship registration.',
  constraints: 'One codebase serving live DAOs behind per-tenant flags; every change backward-compatible; security stakes measured in treasuries.',
  architecture: 'A multi-tenant React and TypeScript product over indexed onchain data, reusable SIWE authorization, Safe-aware signing, and receipt-verified execution.',
  decisions: 'Move authorization server-side, isolate embedded-wallet adoption behind tenant boundaries, and size sponsored transaction gas from production traces.',
  outcome: 'Shipped across a dozen-plus tenant DAOs, with 90+ merged production pull requests in Agora public repositories.',
};

export const takeaitProofs = [
  {
    title: 'Secure execution',
    items: ['Zero-inbound, poll-only runners', 'Rotating hashed keys and per-secret IAM', 'Private VMs and per-agent Unix users', 'Temporary secret materialization and controlled egress'],
  },
  {
    title: 'Durable workflows',
    items: ['Atomic work claiming', 'Run journaling and replay', 'Crash recovery and host lifecycle management', 'Concurrency controls, reconciliation, and redacted logs'],
  },
  {
    title: 'Human supervision',
    items: ['Pause and redirect during execution', 'Mention-to-wake conversations and question handling', 'Web and Go CLI supervision', 'Review-gated pull requests'],
  },
];

export const takeaitCase = {
  problem: 'Coding agents need isolation, auditability, and human control when they work against production repositories.',
  ownership: 'The platform end to end: Next.js/PostgreSQL control plane, GCP provisioning layer, and multi-daemon Go runner runtime.',
  constraints: 'No inbound runner path, no secrets at rest on execution hosts, crash-safe recovery, and in-flight human redirection.',
  architecture: 'Poll-only Go runners on private GCP VMs use rotating keys, per-agent Unix users, atomic work claiming, journal/replay recovery, and automated pull-request creation.',
  decisions: 'Choose polling over push, verb-based atomic claiming over optimistic ownership, and journaled replay over stateless retries.',
  outcome: 'Claude Code and Codex agents ship reviewed pull requests through a durable workflow with explicit human control.',
};

export const migrationProofs = [
  {
    title: 'Deterministic source evidence',
    copy: 'Resumable Rust reconstruction, canonical manifests, Merkle proofs, source-chain authorizations, and atomic artifact bundles.',
  },
  {
    title: 'Narrow destination authority',
    copy: 'Typed ERC-721/ERC-1155 claim contracts, frozen roots, fixed recipients, and direct, batch, delegated, and smart-wallet claims.',
  },
  {
    title: 'Fail-closed verification',
    copy: 'A React application recomputes artifacts, compares complete campaign state, and disables actions on any disagreement.',
  },
];

export const onchainProducts = [
  {
    id: 'sekai',
    meta: '2024–2025 · part-time lead',
    title: 'Sekai Glory',
    copy: 'Led a trading-card game across approximately 16 upgradeable contracts, real-time matchmaking and recovery, a five-language PWA, and a live Blast-to-Ronin migration.',
  },
  {
    id: 'lifeverse',
    meta: '2023–present · DAO council',
    title: 'Lifeverse',
    copy: 'Built deterministic battle simulation, commit-reveal systems, DAO and data infrastructure, and the pipeline that generated a 4,686-token asset collection.',
  },
  {
    id: 'realm',
    meta: '2023–2024 · full-stack',
    title: 'Realm',
    copy: 'Worked across a Solidity monorepo spanning more than 50 game domains, three subgraphs, wallet-connected gameplay, and AWS rewards infrastructure.',
  },
];

export const gamesCase = {
  problem: "Onchain games fail differently from web products: source chains can be abandoned, NFT state is too slow for real-time play, and randomness cannot trust a server.",
  ownership: 'Product architecture, contracts, indexing, backend workflows, real-time interfaces, operations, and migration planning across three games.',
  constraints: 'Mainnet assets, irreversible transactions, real-time player expectations, heterogeneous wallets, and zero-downtime migrations.',
  architecture: 'Hybrid systems mirror chain state into PostgreSQL and subgraphs, drive deterministic simulation offchain, and reconcile results through idempotent onchain workflows.',
  decisions: 'Use commit-reveal randomness, persist queue state and acknowledgements, and treat snapshot boundaries as final during chain migrations.',
  outcome: 'Shipped production games across Ronin and Arbitrum while eliminating stuck-queue and restart failure modes rather than masking them.',
};

export const productSystems = [
  {
    id: 'pingou',
    meta: 'Solo product · closed pilot',
    title: 'Pingou',
    copy: 'Built a paid-alerts product for Brazilian streamers: Pix and card checkout, asynchronous content generation, SSE-driven OBS delivery, real-time controls, and automated tests.',
    href: 'https://pingou.xyz',
    action: 'Visit Pingou',
  },
  {
    id: 'tcdf',
    meta: '2014–present · long-term part-time',
    title: 'TCDF and ChatTCDF',
    copy: "Twelve years delivering government audit workflows across backend services and Vue/TypeScript interfaces, plus the Court's internal RAG chatbot with Python, LangChain, Elasticsearch, SQL Server, and Docker.",
  },
];

export const capabilities = [
  {
    title: 'Protocol and wallet systems',
    copy: 'Solidity, EVM, Foundry, Safe, SIWE, EAS, wagmi, viem, The Graph, Ponder.',
  },
  {
    title: 'Backend and distributed workflows',
    copy: 'Go, TypeScript, Python, PostgreSQL, Redis, queues, SSE, WebSockets, durable execution, idempotency.',
  },
  {
    title: 'Product interfaces',
    copy: 'React, Next.js, Vue, wallet onboarding, real-time state, accessibility, i18n, responsive interfaces.',
  },
  {
    title: 'Infrastructure and operations',
    copy: 'GCP, AWS, Docker, Terraform, private networking, observability, deployment and recovery.',
  },
];

export const resumes = [
  {
    label: 'For Web3 product roles',
    title: 'Senior Web3 Product Engineer',
    copy: 'Contracts, indexed chain data, backend systems, wallet products, and production Web3 operations.',
    href: links.web3Resume,
    action: 'Download Web3 résumé',
  },
  {
    label: 'For AI-agent platform roles',
    title: 'Senior Software Engineer — AI Agent Platforms',
    copy: 'Secure and durable agent execution, Go runners, GCP provisioning, and human supervision.',
    href: links.aiResume,
    action: 'Download AI/platform résumé',
  },
  {
    label: 'For backend and full-stack roles',
    title: 'Senior Software Engineer — Backend & Product Systems',
    copy: 'Go and TypeScript services, real-time workflows, cloud operations, and full-stack product ownership.',
    href: links.softwareResume,
    action: 'Download general résumé',
  },
];
