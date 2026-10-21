/**
 * Phase D — quantitative item templates.
 * Sample parameters, evaluate a small formula AST (no eval), build a concrete Question.
 * Strength / cooldown stay on the base question.id (or variantGroupId), not the instance.
 */
import type { Question, QuestionType, QuantTemplate, TemplateFormula, TemplateParamSpec } from '@/types';

export type { QuantTemplate, TemplateFormula, TemplateParamSpec } from '@/types';

export interface InstantiatedQuant {
  /** Concrete question for the session UI */
  question: Question;
  /** Sampled params (for debug / explanation) */
  params: Record<string, number>;
  /** Base bank id — use for strength / results */
  baseId: string;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Deterministic RNG from string seed (mulberry32) */
export function rngFromSeed(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let a = h >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function sampleParam(spec: TemplateParamSpec, rnd: () => number): number {
  const rawStep = spec.step ?? 1;
  const step = rawStep === 0 || !Number.isFinite(rawStep) ? 1 : rawStep;
  const min = spec.min;
  const max = spec.max;
  if (max < min) return min;
  const steps = Math.floor((max - min) / step + 1e-9);
  const i = Math.floor(rnd() * (steps + 1));
  const v = min + i * step;
  // Avoid float junk for common steps
  const decimals = String(step).includes('.') ? (String(step).split('.')[1]?.length ?? 0) : 0;
  return decimals > 0 ? Number(v.toFixed(decimals)) : v;
}

export function sampleParams(
  specs: Record<string, TemplateParamSpec>,
  rnd: () => number,
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [k, spec] of Object.entries(specs)) {
    out[k] = sampleParam(spec, rnd);
  }
  return out;
}

export function evalFormula(f: TemplateFormula, params: Record<string, number>): number {
  switch (f.op) {
    case 'param': {
      const v = params[f.name];
      if (v === undefined || !Number.isFinite(v)) {
        throw new Error(`quant-template: missing param "${f.name}"`);
      }
      return v;
    }
    case 'const':
      return f.value;
    case 'add':
      return evalFormula(f.a, params) + evalFormula(f.b, params);
    case 'sub':
      return evalFormula(f.a, params) - evalFormula(f.b, params);
    case 'mul':
      return evalFormula(f.a, params) * evalFormula(f.b, params);
    case 'div': {
      const d = evalFormula(f.b, params);
      if (d === 0) throw new Error('quant-template: division by zero');
      return evalFormula(f.a, params) / d;
    }
    case 'neg':
      return -evalFormula(f.a, params);
    case 'abs':
      return Math.abs(evalFormula(f.a, params));
    case 'round': {
      const digits = f.digits ?? 0;
      const x = evalFormula(f.a, params);
      const m = 10 ** digits;
      return Math.round(x * m) / m;
    }
    default: {
      const _exhaustive: never = f;
      return _exhaustive;
    }
  }
}

export function fillTemplate(text: string, params: Record<string, number>, extra?: Record<string, string | number>): string {
  const map: Record<string, string> = {};
  for (const [k, v] of Object.entries(params)) {
    map[k] = String(v);
  }
  if (extra) {
    for (const [k, v] of Object.entries(extra)) {
      map[k] = String(v);
    }
  }
  return text.replace(/\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g, (_, name: string) =>
    map[name] !== undefined ? map[name] : `{{${name}}}`,
  );
}

function formatOption(value: number, optionFormat?: string): string {
  if (!optionFormat) return String(value);
  return fillTemplate(optionFormat, {}, { value });
}

/**
 * Build a concrete Question from a template + base metadata.
 * Resamples a few times if distractors collide with the correct value.
 */
export function instantiateQuantTemplate(
  base: Question,
  template: QuantTemplate,
  seed: string,
): InstantiatedQuant {
  const rnd = rngFromSeed(seed);
  let params = sampleParams(template.params, rnd);
  let correct = 0;
  let distractorVals: number[] = [];
  let ok = false;

  for (let attempt = 0; attempt < 12; attempt++) {
    params = sampleParams(template.params, rnd);
    try {
      correct = evalFormula(template.answer, params);
      distractorVals = template.distractors.map((d) => evalFormula(d, params));
    } catch {
      continue;
    }
    const uniq = new Set([correct, ...distractorVals].map((x) => Number(x)));
    if (uniq.size === 1 + distractorVals.length) {
      ok = true;
      break;
    }
  }

  if (!ok) {
    // Last resort: still emit with whatever we have
    params = sampleParams(template.params, rnd);
    correct = evalFormula(template.answer, params);
    distractorVals = template.distractors.map((d) => evalFormula(d, params));
  }

  const fmt = template.optionFormat;
  const optionValues = [correct, ...distractorVals];
  // Stable order before UI shuffle: correct first in bank, QuizScreen will shuffle
  const options = optionValues.map((v) => formatOption(v, fmt));
  const explanation = template.explanation
    ? fillTemplate(template.explanation, params, { answer: correct })
    : base.explanation;

  const question: Question = {
    ...base,
    // Keep base.id for adaptive strength / results
    question: fillTemplate(template.stem, params),
    options,
    correctAnswer: 0, // correct is first; session shuffle remaps
    explanation,
    type: template.type ?? base.type ?? 'single',
  };

  return { question, params, baseId: base.id };
}

/**
 * If the question carries a quantTemplate, instantiate; otherwise return as-is.
 */
export function maybeInstantiateQuant(
  q: Question,
  sessionSeed: string,
): Question {
  const tmpl = q.quantTemplate;
  if (!tmpl) return q;
  try {
    return instantiateQuantTemplate(q, tmpl, `${sessionSeed}:${q.id}`).question;
  } catch {
    return q; // fail open to static stem
  }
}

/** Apply to a whole session pool */
export function instantiatePool(pool: Question[], sessionSeed: string): Question[] {
  return pool.map((q) => maybeInstantiateQuant(q, sessionSeed));
}

// ── Authoring helpers (readable formula builders) ──

export const F = {
  param: (name: string): TemplateFormula => ({ op: 'param', name }),
  const: (value: number): TemplateFormula => ({ op: 'const', value }),
  add: (a: TemplateFormula, b: TemplateFormula): TemplateFormula => ({ op: 'add', a, b }),
  sub: (a: TemplateFormula, b: TemplateFormula): TemplateFormula => ({ op: 'sub', a, b }),
  mul: (a: TemplateFormula, b: TemplateFormula): TemplateFormula => ({ op: 'mul', a, b }),
  div: (a: TemplateFormula, b: TemplateFormula): TemplateFormula => ({ op: 'div', a, b }),
  neg: (a: TemplateFormula): TemplateFormula => ({ op: 'neg', a }),
  abs: (a: TemplateFormula): TemplateFormula => ({ op: 'abs', a }),
  round: (a: TemplateFormula, digits = 0): TemplateFormula => ({ op: 'round', a, digits }),
};

/**
 * Example template (documentation / tests) — dry adiabatic cool-down style.
 * T_final = T - gamma * dz
 */
export const EXAMPLE_LAPSE_TEMPLATE: QuantTemplate = {
  stem:
    'An air parcel at {{T}}°C is lifted {{dz}} km. If the lapse rate is {{gamma}}°C/km, what is its temperature at the new level (assuming constant Γ)?',
  params: {
    T: { min: 15, max: 35, step: 1 },
    dz: { min: 1, max: 4, step: 1 },
    gamma: { min: 6, max: 10, step: 0.5 },
  },
  answer: F.round(F.sub(F.param('T'), F.mul(F.param('gamma'), F.param('dz'))), 1),
  distractors: [
    // forgot to multiply by dz → T − gamma (never equals T − gamma*dz for dz≥1)
    F.round(F.sub(F.param('T'), F.param('gamma')), 1),
    // added instead of subtracted
    F.round(F.add(F.param('T'), F.mul(F.param('gamma'), F.param('dz'))), 1),
    // used (dz+1) km by off-by-one height error — distinct from correct for all dz in range
    F.round(F.sub(F.param('T'), F.mul(F.param('gamma'), F.add(F.param('dz'), F.const(1)))), 1),
  ],
  optionFormat: '{{value}}°C',
  explanation:
    'Under a constant lapse rate Γ, ΔT = −Γ × Δz. So T_final = {{T}} − {{gamma}} × {{dz}} = {{answer}}°C.',
};
