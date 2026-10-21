import type { ScreenName } from '@/router';

const ALIASES: Record<string, ScreenName> = {
  'dashboard': 'home',
  'study': 'learn',
  'revision': 'review',
  'formula-vault': 'formulas',
  'flash-cards': 'flashcards',
  cards: 'flashcards',
};

export function resolveScreen(screen: string): ScreenName {
  return ALIASES[screen] ?? (screen as ScreenName);
}
