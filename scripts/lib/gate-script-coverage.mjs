/**
 * Resolve package scripts reachable from CI and the unified CGEI gate.
 * Recognizes both shell-form npm run commands and spawnSync argument arrays.
 */
const GATED_SCRIPT = /^(?:check(?::.*)?|audit:.*|lint:.*|validate:.*)$/;

function npmRunReferences(source) {
  return [...source.matchAll(
    /(?:\bnpm\s+run\s+([a-zA-Z0-9:_-]+)|['"]npm['"]\s*,\s*\[\s*['"]run['"]\s*,\s*['"]([a-zA-Z0-9:_-]+)['"])/g,
  )].map((match) => match[1] ?? match[2]);
}

function directScriptFiles(source) {
  return new Set([...source.matchAll(/['"](scripts\/[^'"]+\.mjs)['"]/g)].map((match) => match[1]));
}

function scriptFile(command) {
  return command.match(/(scripts\/[^\s"']+\.mjs)/)?.[1];
}

export function findUnaccountedScripts({ scripts, workflow, checkCgei, allowlist }) {
  const names = Object.keys(scripts).filter((name) => GATED_SCRIPT.test(name));
  const reachable = new Set();
  const queue = [...npmRunReferences(workflow), ...npmRunReferences(checkCgei)];
  const cgeiFiles = directScriptFiles(checkCgei);

  for (const name of names) {
    const file = scriptFile(scripts[name]);
    if (file && cgeiFiles.has(file)) reachable.add(name);
  }

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
