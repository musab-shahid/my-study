/**
 * Canonical feature → Lucide icon mapping for primary navigation surfaces.
 * Sidebar stages, mobile bottom bar, and ToolsTray must import from here
 * so the same destination never gets two different symbols.
 */
import {
  Home,
  Library,
  BookCopy,
  Brain,
  RotateCcw,
  FunctionSquare,
  TrendingUp,
  Search,
  Settings,
  type LucideIcon,
} from 'lucide-react';

export type FeatureIconId =
  | 'home'
  | 'tracks'
  | 'learn'
  | 'practice'
  | 'review'
  | 'formulas'
  | 'progress'
  | 'search'
  | 'settings';

export const FEATURE_ICONS: Record<FeatureIconId, LucideIcon> = {
  home: Home,
  tracks: Library,
  learn: BookCopy,
  /** Unified: Brain for Practice on sidebar stages and bottom nav (was Dumbbell on mobile). */
  practice: Brain,
  review: RotateCcw,
  formulas: FunctionSquare,
  progress: TrendingUp,
  search: Search,
  settings: Settings,
};

export function featureIcon(id: FeatureIconId): LucideIcon {
  return FEATURE_ICONS[id];
}
