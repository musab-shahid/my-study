/**
 * Canonical feature → Lucide icon mapping for primary destinations.
 * Desktop nav, mobile bottom bar, More tray, and feature previews must import
 * from here so the same destination never gets two different symbols.
 *
 * Learn = BookOpen (study). Tracks = Library (catalog). Do not conflate them.
 */
import {
  Home,
  Library,
  BookOpen,
  Brain,
  RotateCcw,
  FunctionSquare,
  TrendingUp,
  Search,
  Settings,
  Layers,
  Clock,
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
  | 'settings'
  | 'flashcards'
  | 'mockExam';

export const FEATURE_ICONS: Record<FeatureIconId, LucideIcon> = {
  home: Home,
  tracks: Library,
  learn: BookOpen,
  practice: Brain,
  review: RotateCcw,
  formulas: FunctionSquare,
  progress: TrendingUp,
  search: Search,
  settings: Settings,
  flashcards: Layers,
  mockExam: Clock,
};

export function featureIcon(id: FeatureIconId): LucideIcon {
  return FEATURE_ICONS[id];
}
