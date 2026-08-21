const STATUS_URL = 'https://raw.githubusercontent.com/galo13eth/evm-migration-lab/main/status.json';
const decimal = /^\d+$/;
const hex = (bytes) => new RegExp(`^0x[0-9a-fA-F]{${bytes * 2}}$`);

function parseStatus(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('invalid status');
  if (value.environment !== 'base-sepolia' || value.chainId !== '84532' || value.live !== true) throw new Error('wrong campaign');
  if (!decimal.test(value.snapshotBlock) || !decimal.test(value.manifestEntries) || !decimal.test(value.claimsCompleted)) throw new Error('invalid counts');
  if (!hex(32).test(value.snapshotBlockHash) || !hex(32).test(value.merkleRoot)) throw new Error('invalid commitment');
  if (!['sample-consistent', 'consistent'].includes(value.reconciliationStatus)) throw new Error('invalid reconciliation');
  if (!/^[0-9a-fA-F]{40}$/.test(value.lastVerifiedCommit)) throw new Error('invalid commit');

  const entries = BigInt(value.manifestEntries);
  const claims = BigInt(value.claimsCompleted);
  if (claims > entries) throw new Error('claims exceed manifest');

  return { ...value, entries, claims };
}

const setText = (selector, text) => {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
};

function renderStatus(status) {
  const badge = document.querySelector('[data-status-state]');
  badge?.classList.add('is-live');
  setText('[data-status-state]', 'Live · Base Sepolia');
  setText('[data-status-claims]', `${status.claims.toLocaleString('en-US')} / ${status.entries.toLocaleString('en-US')}`);
  setText('[data-status-block]', BigInt(status.snapshotBlock).toLocaleString('en-US'));
  setText('[data-status-reconciliation]', status.reconciliationStatus === 'sample-consistent' ? 'Sample-consistent' : 'Consistent');
  setText('[data-status-commit]', status.lastVerifiedCommit.slice(0, 8));
  setText('[data-status-root]', `${status.merkleRoot.slice(0, 12)}…${status.merkleRoot.slice(-8)}`);
}

function renderUnavailable() {
  const badge = document.querySelector('[data-status-state]');
  badge?.classList.add('is-unavailable');
  setText('[data-status-state]', 'Live artifact unavailable');
}

fetch(STATUS_URL, { cache: 'no-store' })
  .then((response) => {
    if (!response.ok) throw new Error('status request failed');
    return response.json();
  })
  .then(parseStatus)
  .then(renderStatus)
  .catch(renderUnavailable);
