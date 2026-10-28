/**
 * Material-aware interleaving policy (L-06 / Brunmair & Richter 2019).
 * Interleave confusable conceptual/quantitative material; avoid default
 * interleaving of isolated fact/vocabulary cards with problem-solving.
 */

export type MaterialKind =
  | 'quantitative'
  | 'analytical'
  | 'verbal_expository'
  | 'fact_vocab'
  | 'spatial_geo'
  | 'unknown';

export interface InterleaveItem {
  id: string;
  /** Subject or topic id for heuristics */
  subjectId?: string;
  topicId?: string;
  /** Optional explicit kind from content metadata */
  materialKind?: MaterialKind;
}

const QUANT_RE =
  /quant|math|numer|calcul|stat|algebra|geom|physic|chem|formula|measurement|elo|fsrs/i;
const ANALYTICAL_RE = /analytic|logic|reason|argument|critical|puzzle|deduc/i;
const VERBAL_RE = /verbal|reading|comprehens|passage|english|grammar/i;
const FACT_RE = /vocab|flashcard|definition|memor|fact|date|term|glossary/i;
const SPATIAL_RE =
  /geo|gis|spatial|remote.?sens|climate|earth|raster|vector|crs|dem|modis|landsat/i;

export function inferMaterialKind(item: InterleaveItem): MaterialKind {
  if (item.materialKind && item.materialKind !== 'unknown') return item.materialKind;
  const blob = `${item.subjectId ?? ''} ${item.topicId ?? ''} ${item.id}`;
  if (FACT_RE.test(blob)) return 'fact_vocab';
  if (QUANT_RE.test(blob)) return 'quantitative';
  if (ANALYTICAL_RE.test(blob)) return 'analytical';
  if (SPATIAL_RE.test(blob)) return 'spatial_geo';
  if (VERBAL_RE.test(blob)) return 'verbal_expository';
  return 'unknown';
}

/** Kinds that benefit from mixing with each other within a session. */
const INTERLEAVE_FRIENDLY: ReadonlySet<MaterialKind> = new Set([
  'quantitative',
  'analytical',
  'spatial_geo',
  'unknown',
]);

/**
 * Whether two items should be interleaved (adjacent mixing encouraged).
 * Fact/vocab should not be mixed into quant/analytical blocks by default.
 */
export function shouldInterleave(a: InterleaveItem, b: InterleaveItem): boolean {
  const ka = inferMaterialKind(a);
  const kb = inferMaterialKind(b);
  if (ka === 'fact_vocab' || kb === 'fact_vocab') return ka === kb;
  if (ka === 'verbal_expository' || kb === 'verbal_expository') {
    // Mild: verbal with verbal OK; not with quant by default
    return ka === kb || (ka === 'verbal_expository' && kb === 'unknown');
  }
  return INTERLEAVE_FRIENDLY.has(ka) && INTERLEAVE_FRIENDLY.has(kb);
}

/**
 * Reorder a scored list to break long runs of the same material kind,
 * while preserving relative priority as much as possible (greedy).
 */
export function interleaveByMaterial<T extends InterleaveItem>(
  items: T[],
  maxRun = 2,
): T[] {
  if (items.length <= 2) return [...items];
  const remaining = [...items];
  const out: T[] = [];
  let lastKind: MaterialKind | null = null;
  let run = 0;

  while (remaining.length > 0) {
    let pick = 0;
    if (lastKind != null && run >= maxRun) {
      const alt = remaining.findIndex((it) => {
        const k = inferMaterialKind(it);
        return k !== lastKind && shouldInterleave({ id: 'x', materialKind: lastKind }, it);
      });
      // Prefer a different interleave-compatible kind; else any different kind; else first
      if (alt >= 0) pick = alt;
      else {
        const anyDiff = remaining.findIndex((it) => inferMaterialKind(it) !== lastKind);
        if (anyDiff >= 0) pick = anyDiff;
      }
    }
    const [chosen] = remaining.splice(pick, 1);
    if (!chosen) break;
    const kind = inferMaterialKind(chosen);
    if (kind === lastKind) run += 1;
    else {
      lastKind = kind;
      run = 1;
    }
    out.push(chosen);
  }
  return out;
}
