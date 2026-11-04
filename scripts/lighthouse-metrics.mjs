const REQUIRED_AUDITS = {
  lcp: 'largest-contentful-paint',
  cls: 'cumulative-layout-shift',
  tbt: 'total-blocking-time',
};

const ADDITIONAL_AUDITS = {
  fcp: 'first-contentful-paint',
  speedIndex: 'speed-index',
  interactive: 'interactive',
  serverResponseTime: 'server-response-time',
  maxPotentialFid: 'max-potential-fid',
  totalByteWeight: 'total-byte-weight',
  bootupTime: 'bootup-time',
};

export function extractLighthouseMetrics(lhr) {
  if (!lhr?.categories || !lhr?.audits) {
    throw new Error('Lighthouse report is missing categories or audits');
  }

  const scores = {
    performance: lhr.categories.performance?.score,
    accessibility: lhr.categories.accessibility?.score,
  };
  for (const [name, score] of Object.entries(scores)) {
    if (!Number.isFinite(score)) {
      throw new Error(`Lighthouse ${name} category score is missing or invalid`);
    }
  }

  const metrics = {};
  for (const [key, auditId] of Object.entries({ ...REQUIRED_AUDITS, ...ADDITIONAL_AUDITS })) {
    const audit = lhr.audits[auditId];
    if (!audit || !Number.isFinite(audit.numericValue)) {
      if (Object.hasOwn(REQUIRED_AUDITS, key)) {
        throw new Error(`Lighthouse required metric ${auditId} is missing or non-finite`);
      }
      continue;
    }
    metrics[key] = {
      auditId,
      numericValue: audit.numericValue,
      numericUnit: audit.numericUnit ?? null,
      displayValue: audit.displayValue ?? String(audit.numericValue),
      score: Number.isFinite(audit.score) ? audit.score : null,
    };
  }

  return { scores, metrics };
}
