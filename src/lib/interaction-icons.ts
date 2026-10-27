/**
 * Canonical interaction → Lucide icon mapping (chrome, not destinations).
 * Back, close, expand/collapse, and overflow should reuse these symbols.
 */
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  MoreHorizontal,
  Check,
  type LucideIcon,
} from 'lucide-react';

export type InteractionIconId =
  | 'back'
  | 'forward'
  | 'expand'
  | 'close'
  | 'more'
  | 'check';

export const INTERACTION_ICONS: Record<InteractionIconId, LucideIcon> = {
  back: ChevronLeft,
  forward: ChevronRight,
  expand: ChevronDown,
  close: X,
  more: MoreHorizontal,
  check: Check,
};

export function interactionIcon(id: InteractionIconId): LucideIcon {
  return INTERACTION_ICONS[id];
}
