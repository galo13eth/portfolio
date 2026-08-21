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
