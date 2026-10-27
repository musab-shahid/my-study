/**
 * Documented chart / SVG palette for Progress analytics.
 * Maps visualization roles to fixed hex that align with brand/slate/status tokens.
 * Ordinary UI chrome must not import this — use Tailwind semantic tokens instead.
 */
export const CHART_COLORS = {
  brand: '#0ea5e9', // brand-500
  brandDeep: '#0284c7', // brand-600
  brandSoft: '#0ea5e9',
  grid: '#f1f5f9', // slate-100
  axis: '#94a3b8', // slate-400
  axisMuted: '#cbd5e1', // slate-300
  tooltipBg: '#1e293b', // slate-800
  tooltipFg: '#ffffff',
  tooltipMuted: '#94a3b8',
  pointFill: '#ffffff',
  success: '#059669', // emerald-600 ≈ success
  warning: '#d97706', // amber-600
  danger: '#dc2626', // red-600
} as const;
