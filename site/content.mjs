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
    id: 'citizenship',
    label: 'Identity and eligibility',
    title: 'Citizenship eligibility became an auditable state machine.',
    problem: 'Optimism Season 9 needed to resist Sybil registrations without forcing every legitimate participant through the same verification path.',
    decision: 'Combine wallet and social trust signals, explicit eligibility outcomes, conditional identity verification, and EAS-backed issuance in one staged flow.',
    outcome: 'Citizenship registration gained priority windows, audit history, revocation, and atomic persistence instead of one opaque pass-or-fail check.',
    stack: 'Human Passport · OpenRank · EAS · Privy · PostgreSQL',
    evidence: [
      ['Merged PR', 'op-atlas#1465', 'https://github.com/voteagora/op-atlas/pull/1465'],
    ],
  },
  {
    id: 'trust-graphs',
    label: 'Trust graphs',
    title: 'Trust became a user-controlled lens, not a platform-wide ranking.',
    problem: 'Token communities needed portable trust signals without one global score becoming authoritative for every user and every context.',
    decision: 'Add graph selection, EIP-712 profile vouching, explicit linked-wallet identity rules, and a contextual feed lens behind one external API boundary.',
    outcome: 'People can choose how trust shapes their feed, switch graphs without reloading, and keep content available if the optional trust service is down.',
    stack: 'EIP-712 · linked wallets · OpenAPI · trust graphs',
    evidence: [
      ['Merged PR', 'holders.vote#161', 'https://github.com/voteagora/holders.vote/pull/161'],
    ],
  },
];

export const additionalEvidence = [
  { id: 'publishing', type: 'Merged PR', title: 'Resumable contract publishing', href: 'https://github.com/voteagora/op-atlas/pull/1441' },
  { id: 'authorization', type: 'Merged PR', title: 'Server-owned authorization', href: 'https://github.com/voteagora/agora-next/pull/1437' },
  { id: 'relay', type: 'Merged PR', title: 'Sponsored execution reliability', href: 'https://github.com/voteagora/agora-next/pull/1514' },
  { id: 'webhook', type: 'Upstream PR · under review', title: 'Go webhook authentication', href: 'https://github.com/superplanehq/superplane/pull/6702' },
];

export const agoraCase = {
  eyebrow: 'Governance is more than a voting screen',
  title: 'One product boundary from identity to mined receipt.',
  intro: [
    'Agora’s products connect account models, governance state, identity and eligibility, program operations, notifications, and onchain execution across multiple live organizations.',
    'My public work spans that path—from Safe and embedded-wallet onboarding through citizenship attestations, trust graphs, contract publication, and receipt-verified completion.',
  ],
  chapters: [
    {
      number: '01',
      title: 'One multi-tenant product, different account models.',
      copy: [
        'EOAs, Safe multisigs, and embedded wallets require different onboarding, session, signature, and execution behavior. The product still has to expose one coherent proposal, voting, delegation, and transaction experience.',
        'I shipped automatic Safe detection and signer progress, reusable SIWE sessions, and tenant-gated Privy integration while preserving the existing wagmi, EIP-712, and relay paths for live organizations.',
      ],
    },
    {
      number: '02',
      title: 'Identity and eligibility are product state.',
      copy: [
        'OP Atlas connects project and team identity, linked wallets, grants, citizenship, KYC or World ID, attestations, and revocation. Those decisions must remain explainable after the registration screen disappears.',
        'For Optimism Season 9, I combined parallel wallet and social trust evaluation with explicit ALLOW, NEEDS_VERIFICATION, and BLOCKED outcomes, priority windows, atomic issuance, and a durable evaluation trail.',
      ],
    },
    {
      number: '03',
      title: 'Trust can be plural and contextual.',
      copy: [
        'Holders.vote lets a viewer choose one trust graph—or none—rather than allowing a single platform score to become universal reputation.',
        'Profiles prepare, sign, and submit EIP-712 vouches; linked wallets retain explicit raw-key identity semantics; and the feed applies the selected graph through a server-only external API boundary that fails open for content availability.',
      ],
    },
    {
      number: '04',
      title: 'Long-running operations need durable semantics.',
      copy: [
        'Publishing hundreds of contracts exceeded PostgreSQL’s bind-parameter ceiling and could not remain one browser-bound transaction.',
        'I split large publications into authenticated, persisted batches with resumable progress and a separate final metadata phase, while keeping smaller publications atomic.',
      ],
    },
    {
      number: '05',
      title: 'Submitted is not completed.',
      copy: [
        'Authorization decisions moved from client assertions into reusable SIWE-backed server boundaries with tenant, ownership, and role checks.',
        'For sponsored execution, production traces showed that a relay transaction could be submitted, mined, and still fail. Gas limits became estimate-based and the UI began treating a successful receipt—not a transaction hash—as completion.',
      ],
    },
    {
      number: '06',
      title: 'The product depends on more than contracts.',
      copy: [
        'Notification preferences, delivery permissions, indexed governance state, and canonical proposal data connect the product to users between onchain actions.',
        'My application work consumed services such as dao-node and CPLS alongside Snapshot, EAS, RPCs, indexers, relayers, and five notification channels. Those are integration dependencies, not claims that I authored every service.',
      ],
    },
  ],
  evidence: [
    ['Wallet architecture', 'Merged PR', 'agora-next#1567', 'https://github.com/voteagora/agora-next/pull/1567'],
    ['Safe workflows', 'Product write-up', 'Safe Wallet Improvements', 'https://www.agora.xyz/blogs/15-safe-wallet-improvements'],
    ['Notifications', 'Product write-up', 'Notifications Hub', 'https://www.agora.xyz/blogs/9-notification-hub'],
    ['Citizenship', 'Merged PR', 'op-atlas#1465', 'https://github.com/voteagora/op-atlas/pull/1465'],
    ['Trust graphs', 'Merged PR', 'holders.vote#161', 'https://github.com/voteagora/holders.vote/pull/161'],
    ['Contract publication', 'Merged PR', 'op-atlas#1441', 'https://github.com/voteagora/op-atlas/pull/1441'],
    ['Execution reliability', 'Merged PR', 'agora-next#1514', 'https://github.com/voteagora/agora-next/pull/1514'],
    ['Indexed state', 'Integration context', 'dao-node', 'https://github.com/voteagora/dao-node'],
    ['Proposal aggregation', 'Integration context', 'CPLS', 'https://github.com/voteagora/cpls'],
  ],
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

export const takeaitLifecycle = [
  {
    label: 'Unit of work',
    copy: 'A ticket keeps dependencies, comments, and ordered verb assignments—plan, investigate, code, review, or respond—in one durable record.',
  },
  {
    label: 'Claim',
    copy: 'The daemon atomically claims the next eligible assignment and acquires a host-wide flock slot that the kernel releases if the process dies.',
  },
  {
    label: 'Run',
    copy: 'An isolated workspace receives pinned profile and execution settings while ticket comments and human directives remain live throughout the turn.',
  },
  {
    label: 'Finish',
    copy: 'A runner-owned repository check must pass before final inspection, pull-request creation, and recorded execution provenance.',
  },
];

export const takeaitCase = {
  eyebrow: 'Agents that finish the ticket',
  title: 'The model writes the diff. TakeAIt makes the work durable.',
  intro: [
    'A useful diff is not a completed ticket. Real engineering work accumulates dependencies, comments, decisions, restarts, validation, and review.',
    'TakeAIt keeps that lifecycle in one shared record while tai-agent turns each claimable assignment into a contained, recoverable run.',
  ],
  chapters: [
    {
      number: '01',
      title: 'The ticket outlives the model turn.',
      copy: [
        'Humans and agents share tickets, threaded comments, dependencies, and assignments. Each assignment pairs a user with a verb such as plan, investigate, code, review, or respond.',
        'Assignments are ordered, so dependency state and earlier work determine what can be claimed next. The resulting run, discussion, outcome, and pull request remain attached to the same ticket.',
      ],
    },
    {
      number: '02',
      title: 'Claiming and preparation are explicit.',
      copy: [
        'The Go daemon first acquires a host-wide execution slot through a nonblocking flock lease, then atomically claims the next eligible assignment. If the daemon dies, the kernel releases the slot without a separate cleanup service.',
        'The runner creates an isolated workspace, clones the required repositories, snapshots the owner-controlled settings and skills, resolves the harness and model profile, and records those inputs with the run before execution begins.',
      ],
    },
    {
      number: '03',
      title: 'Execution stays connected to the ticket.',
      copy: [
        'The runner streams engine events while following the ticket change feed. New comments queue as context for the next turn; pause, stop, abort, restart, and redirect directives can interrupt active work.',
        'When an agent needs a decision, it posts a structured question and parks the run. The answer is journaled into the next turn even if the daemon restarts while waiting.',
      ],
    },
    {
      number: '04',
      title: 'Completion is a runner decision.',
      copy: [
        'A repository can define a runner-owned completion command in .tai/WORKFLOW.md. The runner reads and pins that policy before the first model turn, so an agent cannot weaken its own gate by editing the checkout.',
        'A failed check returns bounded, redacted diagnostics to the same session. Retry state survives restarts, and the runner inspects the repository again after a passing check before it accepts completion or opens a pull request.',
      ],
    },
    {
      number: '05',
      title: 'Different failures have different meanings.',
      copy: [
        'An engine exit, silent initialization, stalled progress, and an overlong tool call are tracked separately. SIGHUP reloads credentials, SIGTERM stops new claims and drains at a safe boundary, and SIGINT interrupts active work with an explicit operator outcome.',
        'Recovery runs before any new work is claimed. It reconciles the server row, assignment, workspace, engine session, heartbeat, and append-only journal to resume locally, take over a stale instance, continue a parked question, recreate safe early work, or begin a bounded fresh attempt.',
      ],
    },
    {
      number: '06',
      title: 'Execution is reproducible and contained.',
      copy: [
        'Owner-controlled profile repositories carry settings, skills, and hooks. Profiles are staged, checked for escaping symlinks, dangerous hooks, network-bound MCP servers, and credential-shaped environment variables, then atomically published and snapshotted per run.',
        'Production runners use private GCE VMs, separate Unix users, systemd and memory isolation, restricted egress, and a blocked metadata endpoint. Secret Manager credentials are materialized into per-agent tmpfs paths and redacted from recorded events.',
      ],
    },
    {
      number: '07',
      title: 'Humans remain accountable for the result.',
      copy: [
        'Review runs return structured findings. A follow-up code assignment cannot complete until every finding is fixed or rebutted with a recorded reason; the runner enforces coverage while a human decides whether the result is acceptable.',
        'Every run exposes its engine, model, execution profile, profile revision, runner version, source branch, activity, failures, and pull request. “The agent did it” is not treated as an audit trail.',
      ],
    },
    {
      number: '08',
      title: 'Agents can share the real backlog.',
      copy: [
        'TakeAIt now runs part of Agora’s internal engineering workflow. Agents draw from the same queue as humans without someone babysitting a terminal or runner VM, while every handoff remains interruptible and review-gated.',
        'In its first three months, the Go runner and supporting services grew to roughly 33,000 lines of non-test code, 25,000 lines of tests, and 164 commits.',
      ],
    },
  ],
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
    meta: 'Live product · 2024–2025 · part-time lead',
    title: 'Sekai Glory',
    headline: 'A mobile Web3 card game across contracts, indexed state, and real-time play.',
    copy: 'I owned the product path from an approximately 16-contract application and indexed tournament state through wallet UX, live matchmaking, recovery flows, and the Blast-to-Ronin migration.',
    points: [
      'Upgradeable game contracts for cards, packs, crafting, equipment, tournaments, and battle-pass state.',
      'A five-language mobile PWA with quests, deck management, matchmaking, and animated battles.',
      'Multi-chain state and migration work, including production fixes around gas, queues, and failed transactions.',
    ],
    media: [
      { src: '/assets/sekai-glory-gameplay.webp', alt: 'Sekai Glory mobile card battle in progress', width: 720, height: 1030, href: 'https://x.com/SekaiGlory/status/1887676591003595253', label: 'Official gameplay demo' },
    ],
    evidence: [
      ['Official product', 'Sekai Glory', 'https://www.sekaiglory.com/en'],
      ['Official gameplay demo', '2:14 mobile battle flow', 'https://x.com/SekaiGlory/status/1887676591003595253'],
      ['Official documentation', 'Game and Ronin overview', 'https://rng-1.gitbook.io/sekaiglory'],
      ['Historical collection', 'Sekai Glory TCG on Blast', 'https://opensea.io/item/blast/0x10fe37bac405b209f83ff523fb8d00c0c3f508a8/303977'],
    ],
  },
  {
    id: 'lifeverse',
    meta: 'Live ecosystem · 2023–present · DAO council',
    title: 'Lifeverse / Colosseum of Phanes',
    headline: 'Game state spanning onchain assets and seasonal application logic.',
    copy: 'I built product and data workflows around 4,686 Arbitrum Imbued Souls: registration, battles, missions, traits, rewards, and the asset pipeline that made every final character inspectable.',
    points: [
      'Server-authoritative seasonal battle workflows with recorded odds, outcomes, and transactional duplicate-action protection.',
      'Integration with onchain Soul assets and asynchronous evolution and randomness workflows.',
      'A byte-stable 4,686-asset visual and data pipeline delivered into the public collection and ecosystem.',
    ],
    media: [
      { src: '/assets/lifeverse-ecosystem.webp', alt: 'Lifeverse Web3 gaming ecosystem homepage on Arbitrum', width: 1280, height: 800, href: 'https://lifeverse.gg/', label: 'Official ecosystem' },
    ],
    evidence: [
      ['Official ecosystem', 'Lifeverse', 'https://lifeverse.gg/'],
      ['Official game documentation', 'Colosseum of Phanes', 'https://docs.lifeverse.gg/lifeverse-games/lifeverse-studio/colosseum-of-phanes'],
      ['Onchain collection', '4,686 Imbued Souls', 'https://opensea.io/collection/imbuedsoul'],
      ['Verified contract', 'SeedEvolution · 10k+ transactions', 'https://arbitrum.blockscout.com/address/0x3e455c3321Ef4861DD8492d7FC099190a846458a'],
    ],
  },
  {
    id: 'realm',
    meta: 'Historical production system · 2023–2024 · full-stack',
    title: 'Realm',
    headline: 'Wallet UX for a transaction-heavy onchain strategy game.',
    copy: 'I owned full-stack product integration across battle, equipment, missions, construction, resources, crafting, and ANIMA staking—reconciling contract writes, indexed state, local projections, and transaction lifecycle UX.',
    points: [
      'Battle and equipment workflows over a verified contract that had processed more than 185,000 transactions by August 2026.',
      'Data-heavy resource, productivity, refinery, staking, and reward interfaces.',
      'Synchronization among contract writes, three subgraphs, local simulations, and failure-aware wallet UX.',
    ],
    media: [
      { src: '/assets/realm-anima-staking.webp', alt: 'Realm ANIMA staking and rewards interface', width: 814, height: 798, label: 'Historical ANIMA staking interface' },
      { src: '/assets/realm-boost-rewards.webp', alt: 'Realm boost rewards browser with productivity and ANIMA staking data', width: 1100, height: 1359, label: 'Historical realm productivity interface' },
    ],
    evidence: [
      ['Verified contract', 'BattleVersusV3 · 185k+ transactions', 'https://arbitrum.blockscout.com/address/0x2cfcaff3289142E79173B856293D6128B6bD05c6'],
      ['Onchain transaction', 'Decoded battle and ANIMA reward', 'https://www.arbiscan.io/tx/0x850c7a5224f60f640ff9ce4582cd897fcf1d95360406969ac4de42b5b863baca'],
      ['Token', 'ANIMA on Arbitrum', 'https://arbitrum.blockscout.com/token/0xcCd05A0fcfc1380e9Da27862Adb2198E58e0D66f'],
      ['Onchain collection', '5,015 Realm NFTs', 'https://opensea.io/collection/rlmverse'],
    ],
  },
];

export const gamesCase = {
  eyebrow: 'Full-stack onchain games',
  title: 'The contract is only one state machine.',
  intro: [
    'A player experiences one product, but its state crosses wallets, contracts, indexers, servers, queues, local projections, and the interface.',
    'Across Sekai Glory, Lifeverse, and Realm, my work concentrated on keeping those boundaries coherent under real transactions, real-time expectations, and irreversible assets.',
  ],
  chapters: [
    {
      number: '01',
      title: 'Optimistic interfaces over slow finality.',
      copy: [
        'Approvals, signatures, submission, mining, indexing, and reflected UI are distinct states. The interface must stay responsive without pretending any intermediate state is final.',
        'I built transaction lifecycle UX around explicit pending, confirmed, failed, stale, and recovered states so a user could understand what the chain had actually accepted.',
      ],
    },
    {
      number: '02',
      title: 'Derived game state crosses several sources.',
      copy: [
        'Battles, equipment, tournament state, productivity, rewards, and crafting combine contract reads, subgraph data, server records, and local calculations.',
        'The hard work is defining which source owns each transition, how stale projections are reconciled, and when the product should recompute rather than trust cached state.',
      ],
    },
    {
      number: '03',
      title: 'Real-time systems live beside the chain.',
      copy: [
        'Matchmaking, queues, delivery acknowledgements, recovery, notifications, and seasonal progression cannot wait for a block explorer refresh.',
        'Sekai used atomic match creation, persisted queue state, acknowledgements, lock recovery, and health monitoring; Lifeverse used transactional server-owned battle and reward workflows around the onchain assets.',
      ],
    },
    {
      number: '04',
      title: 'Transaction-heavy gameplay changes product design.',
      copy: [
        'Realm treated battles, equipment, missions, construction, crafting, resources, and staking as onchain state transitions—not decorative mints.',
        'The application had to coordinate writes, three subgraphs, local projections, gas and receipt behavior, and data-dense resource interfaces while remaining understandable to a player.',
      ],
    },
    {
      number: '05',
      title: 'Migration is a continuity problem.',
      copy: [
        'Moving a live game between chains changes contracts, indexed data, wallets, operations, and the meaning of late transfers at once.',
        'For Sekai’s Blast-to-Ronin migration, the snapshot boundary was treated as final and product flows were updated around the new execution and indexing boundaries rather than presenting the move as a trustless bridge.',
      ],
    },
    {
      number: '06',
      title: 'Ownership differed by project.',
      copy: [
        'Sekai and Lifeverse included contract, product, data, and operational work. Realm’s strongest attributable scope is the wallet-connected application and integration layer over a large existing protocol.',
        'The public evidence below distinguishes official products, product media, verified contracts, transactions, tokens, and collections instead of treating each link as equivalent proof of authorship.',
      ],
    },
  ],
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
