import type { SubjectId } from '@/types';

// ── Types ──

export interface SubjectColor {
  dot: string;
  bar: string;
  tint: string;
  text: string;
  borderLeft: string;
}

export interface SubjectStyle extends SubjectColor {
  bg: string;
  border: string;
  borderActive: string;
  hoverBorder: string;
  glow: string;
  gradient: string;
  lightGradient: string;
  dotBg: string;
}

export interface TrackStyle {
  label: string;
  accent: string;
  gradient: string;
  heroGradient: string;
  heroOrb: string;
  heroOrbSecondary: string;
  iconGradient: string;
  iconGlow: string;
  accentText: string;
  borderTint: string;
  progressGradient: string;
  progressIcon: string;
  sparklesIcon: string;
  mockOrb: string;
  mockIconGradient: string;
  mockIconGlow: string;
  statIconColors: [string, string, string, string];
}

/**
 * SINGLE SOURCE OF TRUTH for all subject + track colors.
 *
 * Branding:
 * - FPSC = sky / earth (sky–cyan metal on navy). Keep FPSC chrome free of indigo/violet.
 * - HAT  = indigo / violet metal on charcoal. Indigo+violet are intentional HAT identity
 *   (track chrome + Verbal subject) — not a global ban.
 *
 * Design rules:
 * - Tracks = dark shiny heroes + one metal accent (not reused as every subject main color)
 * - Subjects = 10 distinct lively mid-saturation hues
 * - Nav / focus rings for a track should use the same scale as getTrackStyle(track)
 *
 *  T1 FPSC track     → sky metal on deep navy
 *  T2 HAT track      → indigo metal on deep charcoal
 *  1  Meteo          → Cyan
 *  2  Physics        → Sapphire / blue-violet
 *  3  Maths          → Gold amber
 *  4  Earth          → Olive / warm brown-green
 *  5  Env            → Emerald
 *  6  Research       → Rose
 *  7  English        → Fuchsia
 *  8  HAT Verbal     → Violet (distinct from HAT track indigo metal)
 *  9  HAT Analytical → Lime / chartreuse-green
 *  10 HAT Quantitative → Coral / warm orange
 */

// ── Subject styles ──

export const subjectStyles: Record<string, SubjectStyle> = {
  // 1. Meteo — Cyan (atmosphere)
  'meteo-climatology': {
    dot: '#06b6d4',
    dotBg: 'bg-cyan-500',
    bar: 'bg-cyan-500',
    tint: 'bg-cyan-50',
    text: 'text-cyan-700',
    borderLeft: 'border-l-cyan-500',
    bg: 'bg-cyan-500',
    border: 'border-cyan-200',
    borderActive: 'border-cyan-500',
    hoverBorder: 'hover:border-cyan-400',
    glow: 'shadow-cyan-500/20',
    gradient: 'from-cyan-500 to-sky-600',
    lightGradient: 'from-cyan-50 to-sky-50',
  },

  // 2. Physics — Sapphire / blue-violet
  physics: {
    dot: '#4f46e5',
    dotBg: 'bg-indigo-600',
    bar: 'bg-indigo-600',
    tint: 'bg-indigo-50',
    text: 'text-indigo-700',
    borderLeft: 'border-l-indigo-600',
    bg: 'bg-indigo-600',
    border: 'border-indigo-200',
    borderActive: 'border-indigo-600',
    hoverBorder: 'hover:border-indigo-400',
    glow: 'shadow-indigo-600/20',
    gradient: 'from-indigo-500 to-blue-700',
    lightGradient: 'from-indigo-50 to-blue-50',
  },

  // 3. Maths — Gold amber
  maths: {
    dot: '#d97706',
    dotBg: 'bg-amber-600',
    bar: 'bg-amber-600',
    tint: 'bg-amber-50',
    text: 'text-amber-700',
    borderLeft: 'border-l-amber-600',
    bg: 'bg-amber-600',
    border: 'border-amber-200',
    borderActive: 'border-amber-600',
    hoverBorder: 'hover:border-amber-400',
    glow: 'shadow-amber-600/20',
    gradient: 'from-amber-500 to-yellow-600',
    lightGradient: 'from-amber-50 to-yellow-50',
  },

  // 4. Earth — Olive / warm brown-green (NOT sky/teal)
  'earth-science': {
    dot: '#65a30d',
    dotBg: 'bg-lime-600',
    bar: 'bg-lime-600',
    tint: 'bg-lime-50',
    text: 'text-lime-800',
    borderLeft: 'border-l-lime-600',
    bg: 'bg-lime-600',
    border: 'border-lime-200',
    borderActive: 'border-lime-600',
    hoverBorder: 'hover:border-lime-500',
    glow: 'shadow-lime-600/20',
    gradient: 'from-lime-600 to-green-700',
    lightGradient: 'from-lime-50 to-green-50',
  },

  // 5. Env — Emerald
  'env-studies': {
    dot: '#059669',
    dotBg: 'bg-emerald-600',
    bar: 'bg-emerald-600',
    tint: 'bg-emerald-50',
    text: 'text-emerald-700',
    borderLeft: 'border-l-emerald-600',
    bg: 'bg-emerald-600',
    border: 'border-emerald-200',
    borderActive: 'border-emerald-600',
    hoverBorder: 'hover:border-emerald-400',
    glow: 'shadow-emerald-600/20',
    gradient: 'from-emerald-500 to-teal-600',
    lightGradient: 'from-emerald-50 to-teal-50',
  },

  // 6. Research — Rose
  'research-analysis': {
    dot: '#e11d48',
    dotBg: 'bg-rose-600',
    bar: 'bg-rose-600',
    tint: 'bg-rose-50',
    text: 'text-rose-700',
    borderLeft: 'border-l-rose-600',
    bg: 'bg-rose-600',
    border: 'border-rose-200',
    borderActive: 'border-rose-600',
    hoverBorder: 'hover:border-rose-400',
    glow: 'shadow-rose-600/20',
    gradient: 'from-rose-500 to-red-600',
    lightGradient: 'from-rose-50 to-red-50',
  },

  // 7. English — Fuchsia
  english: {
    dot: '#c026d3',
    dotBg: 'bg-fuchsia-600',
    bar: 'bg-fuchsia-600',
    tint: 'bg-fuchsia-50',
    text: 'text-fuchsia-700',
    borderLeft: 'border-l-fuchsia-600',
    bg: 'bg-fuchsia-600',
    border: 'border-fuchsia-200',
    borderActive: 'border-fuchsia-600',
    hoverBorder: 'hover:border-fuchsia-400',
    glow: 'shadow-fuchsia-600/20',
    gradient: 'from-fuchsia-500 to-pink-600',
    lightGradient: 'from-fuchsia-50 to-pink-50',
  },

  // Aggregate HAT (track-level subject chip if needed)
  hat: {
    dot: '#7c3aed',
    dotBg: 'bg-violet-600',
    bar: 'bg-violet-600',
    tint: 'bg-violet-50',
    text: 'text-violet-700',
    borderLeft: 'border-l-violet-600',
    bg: 'bg-violet-600',
    border: 'border-violet-200',
    borderActive: 'border-violet-600',
    hoverBorder: 'hover:border-violet-400',
    glow: 'shadow-violet-600/20',
    gradient: 'from-violet-500 to-purple-600',
    lightGradient: 'from-violet-50 to-purple-50',
  },

  // 8. HAT Verbal — Violet (distinct from HAT track indigo metal)
  'hat-verbal': {
    dot: '#7c3aed',
    dotBg: 'bg-violet-600',
    bar: 'bg-violet-600',
    tint: 'bg-violet-50',
    text: 'text-violet-700',
    borderLeft: 'border-l-violet-600',
    bg: 'bg-violet-600',
    border: 'border-violet-200',
    borderActive: 'border-violet-600',
    hoverBorder: 'hover:border-violet-400',
    glow: 'shadow-violet-600/20',
    gradient: 'from-violet-500 to-purple-600',
    lightGradient: 'from-violet-50 to-purple-50',
  },

  // 9. HAT Analytical — Lime / chartreuse (distinct from Earth olive)
  'hat-analytical': {
    dot: '#84cc16',
    dotBg: 'bg-lime-500',
    bar: 'bg-lime-500',
    tint: 'bg-lime-50',
    text: 'text-lime-700',
    borderLeft: 'border-l-lime-500',
    bg: 'bg-lime-500',
    border: 'border-lime-200',
    borderActive: 'border-lime-500',
    hoverBorder: 'hover:border-lime-400',
    glow: 'shadow-lime-500/20',
    gradient: 'from-lime-400 to-green-500',
    lightGradient: 'from-lime-50 to-green-50',
  },

  // 10. HAT Quantitative — Coral / warm orange (distinct from Maths gold)
  'hat-quantitative': {
    dot: '#f97316',
    dotBg: 'bg-orange-500',
    bar: 'bg-orange-500',
    tint: 'bg-orange-50',
    text: 'text-orange-700',
    borderLeft: 'border-l-orange-500',
    bg: 'bg-orange-500',
    border: 'border-orange-200',
    borderActive: 'border-orange-500',
    hoverBorder: 'hover:border-orange-400',
    glow: 'shadow-orange-500/20',
    gradient: 'from-orange-500 to-red-500',
    lightGradient: 'from-orange-50 to-red-50',
  },

  // 11. CGEI Climate science — Teal (distinct from FPSC meteo cyan / env emerald)
  'cgei-climate-science': {
    dot: '#0d9488',
    dotBg: 'bg-teal-600',
    bar: 'bg-teal-600',
    tint: 'bg-teal-50',
    text: 'text-teal-800',
    borderLeft: 'border-l-teal-600',
    bg: 'bg-teal-600',
    border: 'border-teal-200',
    borderActive: 'border-teal-600',
    hoverBorder: 'hover:border-teal-500',
    glow: 'shadow-teal-500/20',
    gradient: 'from-teal-500 to-cyan-600',
    lightGradient: 'from-teal-50 to-cyan-50',
  },

  'cgei-env-systems': {
    dot: '#78716c', dotBg: 'bg-stone-500', bar: 'bg-stone-500', tint: 'bg-stone-50',
    text: 'text-stone-700', borderLeft: 'border-l-stone-500', bg: 'bg-stone-500',
    border: 'border-stone-200', borderActive: 'border-stone-500', hoverBorder: 'hover:border-stone-400',
    glow: 'shadow-stone-500/20', gradient: 'from-stone-500 to-stone-600', lightGradient: 'from-stone-50 to-stone-100',
  },
  'cgei-geospatial': {
    dot: '#0891b2', dotBg: 'bg-cyan-600', bar: 'bg-cyan-600', tint: 'bg-cyan-50',
    text: 'text-cyan-800', borderLeft: 'border-l-cyan-600', bg: 'bg-cyan-600',
    border: 'border-cyan-200', borderActive: 'border-cyan-600', hoverBorder: 'hover:border-cyan-500',
    glow: 'shadow-cyan-500/20', gradient: 'from-cyan-500 to-teal-600', lightGradient: 'from-cyan-50 to-teal-50',
  },
  'cgei-remote-sensing': {
    dot: '#0284c7', dotBg: 'bg-sky-600', bar: 'bg-sky-600', tint: 'bg-sky-50',
    text: 'text-sky-800', borderLeft: 'border-l-sky-600', bg: 'bg-sky-600',
    border: 'border-sky-200', borderActive: 'border-sky-600', hoverBorder: 'hover:border-sky-500',
    glow: 'shadow-sky-500/20', gradient: 'from-sky-500 to-blue-600', lightGradient: 'from-sky-50 to-blue-50',
  },
  'cgei-data-science': {
    dot: '#7c3aed', dotBg: 'bg-violet-600', bar: 'bg-violet-600', tint: 'bg-violet-50',
    text: 'text-violet-800', borderLeft: 'border-l-violet-600', bg: 'bg-violet-600',
    border: 'border-violet-200', borderActive: 'border-violet-600', hoverBorder: 'hover:border-violet-500',
    glow: 'shadow-violet-500/20', gradient: 'from-violet-500 to-purple-600', lightGradient: 'from-violet-50 to-purple-50',
  },
  'cgei-ml-geoai': {
    dot: '#c026d3', dotBg: 'bg-fuchsia-600', bar: 'bg-fuchsia-600', tint: 'bg-fuchsia-50',
    text: 'text-fuchsia-800', borderLeft: 'border-l-fuchsia-600', bg: 'bg-fuchsia-600',
    border: 'border-fuchsia-200', borderActive: 'border-fuchsia-600', hoverBorder: 'hover:border-fuchsia-500',
    glow: 'shadow-fuchsia-500/20', gradient: 'from-fuchsia-500 to-pink-600', lightGradient: 'from-fuchsia-50 to-pink-50',
  },
  'cgei-climate-risk': {
    dot: '#e11d48', dotBg: 'bg-rose-600', bar: 'bg-rose-600', tint: 'bg-rose-50',
    text: 'text-rose-800', borderLeft: 'border-l-rose-600', bg: 'bg-rose-600',
    border: 'border-rose-200', borderActive: 'border-rose-600', hoverBorder: 'hover:border-rose-500',
    glow: 'shadow-rose-500/20', gradient: 'from-rose-500 to-red-600', lightGradient: 'from-rose-50 to-red-50',
  },
  'cgei-research-practice': {
    dot: '#d97706', dotBg: 'bg-amber-600', bar: 'bg-amber-600', tint: 'bg-amber-50',
    text: 'text-amber-800', borderLeft: 'border-l-amber-600', bg: 'bg-amber-600',
    border: 'border-amber-200', borderActive: 'border-amber-600', hoverBorder: 'hover:border-amber-500',
    glow: 'shadow-amber-500/20', gradient: 'from-amber-500 to-orange-600', lightGradient: 'from-amber-50 to-orange-50',
  },

};

export const allSubjectsStyle: SubjectStyle = {
  dot: '#94a3b8',
  dotBg: 'bg-slate-400',
  bar: 'bg-slate-400',
  tint: 'bg-slate-50',
  text: 'text-slate-600',
  borderLeft: 'border-l-slate-400',
  bg: 'bg-slate-400',
  border: 'border-slate-200',
  borderActive: 'border-slate-400',
  hoverBorder: 'hover:border-slate-400',
  glow: 'shadow-slate-500/20',
  gradient: 'from-slate-500 to-slate-600',
  lightGradient: 'from-slate-50 to-slate-100',
};

export function getSubjectStyle(id: string | SubjectId): SubjectStyle {
  return subjectStyles[id] ?? allSubjectsStyle;
}

// Backward-compat aliases
export const subjectColors: Record<string, SubjectColor> = subjectStyles as unknown as Record<string, SubjectColor>;
export const allSubjectsColor: SubjectColor = allSubjectsStyle;
export function getSubjectColor(id: string | SubjectId): SubjectColor {
  return getSubjectStyle(id);
}

// ── Track styles (dark shiny heroes + metal accents) ──

export const trackStyles: Record<string, TrackStyle> = {
  // T1 — FPSC: sky metal on deep navy
  fpsc: {
    label: 'FPSC Subjects',
    accent: 'text-sky-400',
    gradient: 'from-sky-500 to-cyan-600',
    heroGradient: 'from-slate-950 via-slate-900 to-sky-950',
    heroOrb: 'bg-sky-400/20',
    heroOrbSecondary: 'bg-cyan-300/10',
    iconGradient: 'from-sky-300 to-cyan-500',
    iconGlow: 'shadow-sky-400/40',
    accentText: 'text-sky-200',
    borderTint: 'border-sky-100',
    progressGradient: 'from-sky-400 to-cyan-500',
    progressIcon: 'text-sky-400',
    sparklesIcon: 'text-sky-300',
    mockOrb: 'bg-sky-400/15',
    mockIconGradient: 'from-sky-300 to-cyan-500',
    mockIconGlow: 'shadow-sky-400/30',
    statIconColors: ['text-sky-300', 'text-emerald-400', 'text-amber-400', 'text-rose-400'],
  },

  // T2 — HAT: indigo metal on deep charcoal (subjects use violet/lime/coral — not this metal)
  hat: {
    label: 'HAT Modules',
    accent: 'text-indigo-400',
    gradient: 'from-indigo-500 to-blue-600',
    heroGradient: 'from-slate-950 via-slate-900 to-indigo-950',
    heroOrb: 'bg-indigo-400/20',
    heroOrbSecondary: 'bg-blue-300/10',
    iconGradient: 'from-indigo-300 to-blue-500',
    iconGlow: 'shadow-indigo-400/40',
    accentText: 'text-indigo-200',
    borderTint: 'border-indigo-100',
    progressGradient: 'from-indigo-400 to-blue-500',
    progressIcon: 'text-indigo-400',
    sparklesIcon: 'text-indigo-300',
    mockOrb: 'bg-indigo-400/15',
    mockIconGradient: 'from-indigo-300 to-blue-500',
    mockIconGlow: 'shadow-indigo-400/30',
    statIconColors: ['text-indigo-300', 'text-lime-400', 'text-orange-400', 'text-rose-400'],
  },

  // T3 — CGEI: teal metal on deep slate (climate / geospatial identity)
  cgei: {
    label: 'CGEI Subjects',
    accent: 'text-teal-400',
    gradient: 'from-teal-500 to-cyan-600',
    heroGradient: 'from-slate-950 via-slate-900 to-teal-950',
    heroOrb: 'bg-teal-400/20',
    heroOrbSecondary: 'bg-cyan-300/10',
    iconGradient: 'from-teal-300 to-cyan-500',
    iconGlow: 'shadow-teal-400/40',
    accentText: 'text-teal-200',
    borderTint: 'border-teal-100',
    progressGradient: 'from-teal-400 to-cyan-500',
    progressIcon: 'text-teal-400',
    sparklesIcon: 'text-teal-300',
    mockOrb: 'bg-teal-400/15',
    mockIconGradient: 'from-teal-300 to-cyan-500',
    mockIconGlow: 'shadow-teal-400/30',
    statIconColors: ['text-teal-300', 'text-cyan-400', 'text-amber-400', 'text-rose-400'],
  },
};

export function getTrackStyle(track: string): TrackStyle {
  return trackStyles[track] ?? trackStyles.fpsc;
}

// ── HAT section helper ──

export function getHatSectionStyle(sectionId: string): SubjectStyle {
  // Section ids are HATV-01 / HATA-02 / HATQ-03 — map prefix to subject style keys
  const prefix = sectionId.split('-')[0]?.toUpperCase() ?? '';
  const subjectKey =
    prefix === 'HATV' ? 'hat-verbal' :
    prefix === 'HATA' ? 'hat-analytical' :
    prefix === 'HATQ' ? 'hat-quantitative' :
    sectionId.startsWith('hat-') ? sectionId : `hat-${sectionId}`;
  return getSubjectStyle(subjectKey);
}
