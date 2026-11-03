/**
 * Resolve the package scripts reachable from CI and the unified CGEI gate.
 * Script names are discovered from npm-run references rather than a second
 * hand-maintained list of delegated checks.
 */
const GATED_SCRIPT = /^(?:check(?::.*)?|audit:.*|lint:.*|validate:.*)$/;

function npmRunReferences(source) {
  return [...source.matchAll(/\bnpm\s+run\s+([a-zA-Z0-9:_-]+)/g)].map((match) => match[1]);
}

export function findUnaccountedScripts({ scripts, workflow, checkCgei, allowlist }) {
  const names = Object.keys(scripts).filter((name) => GATED_SCRIPT.test(name));
  const reachable = new Set();
  const queue = [...npmRunReferences(workflow), ...npmRunReferences(checkCgei)];

  while (queue.length) {
    const name = queue.shift();
    if (reachable.has(name) || !Object.hasOwn(scripts, name)) continue;
    reachable.add(name);
    for (const child of npmRunReferences(scripts[name])) queue.push(child);
  }

  const violations = [];
  for (const name of names) {
    if (reachable.has(name)) continue;
    const reason = allowlist[name];
    if (typeof reason === 'string' && reason.trim() && !/[\r\n]/.test(reason)) continue;
    violations.push(name + (Object.hasOwn(allowlist, name)
      ? ' (allowlist reason must be one non-empty line)'
      : ''));
  }

  for (const name of Object.keys(allowlist)) {
    if (!names.includes(name)) violations.push(name + ' (stale allowlist entry)');
  }

  return violations.sort();
}
