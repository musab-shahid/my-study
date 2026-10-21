import { useMemo, useState, useEffect, useCallback } from 'react';
import type { SubjectId } from '@/types';
import { RotateCcw, ChevronLeft, ChevronRight, Eye, EyeOff, Shuffle, BookOpen } from 'lucide-react';
import { useRouter } from '@/router';
import { useSubjectData } from '@/hooks/useSubjectData';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { SubjectSelector, type SubjectFilterValue } from '@/components/subject/SubjectSelector';
import { PageContainer, Card, Button, EmptyState, LoadingSpinner, ScreenHeader } from '@/components/ui';
import { MathText } from '@/components/MathText';
import {
  buildFlashcardsForTopics,
  shuffleCards,
  KIND_LABEL,
  loadKnownFlashcardIds,
  persistKnownFlashcardIds,
  type Flashcard,
  type FlashcardKind,
} from '@/lib/flashcards';
const KIND_FILTERS: Array<FlashcardKind | 'all'> = [
  'all',
  'fact',
  'formula',
  'idiom',
  'substitution',
  'mistake',
];

export function FlashcardsScreen({ topicId }: { topicId?: string }) {
  const { navigate } = useRouter();
  const sd = useSubjectData();
  const { ensureTopicsLoaded, topicsFor } = sd;
  const { getActiveSubject, setActiveSubjectForScreen } = useSubjectSelection();
  const activeSubject = getActiveSubject('learn');

  const [loading, setLoading] = useState(true);
  const [kindFilter, setKindFilter] = useState<FlashcardKind | 'all'>('all');
  const [deck, setDeck] = useState<Flashcard[]>([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownIds, setKnownIds] = useState<Set<string>>(() => loadKnownFlashcardIds());

  useEffect(() => {
    persistKnownFlashcardIds(knownIds);
  }, [knownIds]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const scope = topicId ? undefined : activeSubject;
    const load = topicId
      ? ensureTopicsLoaded('all') // ensure bank; we'll filter by topic id
      : ensureTopicsLoaded(scope === 'all' ? 'all' : (scope as SubjectId));
    Promise.resolve(load)
      .then(() => {
        if (cancelled) return;
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [activeSubject, topicId, ensureTopicsLoaded]);

  const sourceTopics = useMemo(() => {
    if (topicId) {
      const all = topicsFor('all');
      return all.filter((t) => t.id === topicId);
    }
    return topicsFor(activeSubject === 'all' ? 'all' : (activeSubject as SubjectId));
  }, [topicsFor, activeSubject, topicId]);

  const allCards = useMemo(() => buildFlashcardsForTopics(sourceTopics), [sourceTopics]);

  const filtered = useMemo(() => {
    if (kindFilter === 'all') return allCards;
    return allCards.filter((c) => c.kind === kindFilter);
  }, [allCards, kindFilter]);

  // Rebuild deck when filter/source changes
  useEffect(() => {
    setDeck(shuffleCards(filtered));
    setIdx(0);
    setFlipped(false);
  }, [filtered]);

  const card = deck[idx] ?? null;
  const total = deck.length;
  const knownCount = deck.filter((c) => knownIds.has(c.id)).length;

  const go = useCallback(
    (delta: number) => {
      if (total === 0) return;
      setFlipped(false);
      setIdx((i) => (i + delta + total) % total);
    },
    [total],
  );

  const markKnown = () => {
    if (!card) return;
    setKnownIds((prev) => new Set(prev).add(card.id));
    go(1);
  };

  const reshuffle = () => {
    setDeck(shuffleCards(filtered));
    setIdx(0);
    setFlipped(false);
  };

  const onSubjectChange = (value: SubjectFilterValue) => {
    setActiveSubjectForScreen('learn', value);
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex justify-center py-16">
          <LoadingSpinner />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ScreenHeader
        title="Flashcards"
        subtitle="Rapid recall for key facts, formulas, idioms, and common traps."
        actions={!topicId ? <SubjectSelector value={activeSubject} onChange={onSubjectChange} compact /> : undefined}
      />

      {/* Kind filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {KIND_FILTERS.map((k) => {
          const count =
            k === 'all' ? allCards.length : allCards.filter((c) => c.kind === k).length;
          if (k !== 'all' && count === 0) return null;
          const active = kindFilter === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setKindFilter(k)}
              className={`min-h-[40px] px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                active
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {k === 'all' ? 'All' : KIND_LABEL[k]} ({count})
            </button>
          );
        })}
      </div>

      {total === 0 ? (
        <Card className="p-8">
          <EmptyState
            title="No flashcards here"
            message={
              topicId
                ? 'This topic has no key facts, formulas, idioms, or traps to card yet.'
                : 'Try another subject, or open a topic rich in key facts / formulas / vocabulary.'
            }
            icon={<BookOpen className="w-12 h-12" />}
          />
          {topicId && (
            <div className="flex justify-center mt-4">
              <Button variant="secondary" onClick={() => navigate({ screen: 'topic', topicId })}>
                Back to topic
              </Button>
            </div>
          )}
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3 text-sm text-slate-500">
            <span>
              Card {idx + 1} / {total}
              {card ? ` · ${KIND_LABEL[card.kind]}` : ''}
            </span>
            <span>
              Marked known: {knownCount}/{total}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            className="w-full text-left mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl"
            aria-label={flipped ? 'Hide answer' : 'Show answer'}
          >
            <Card
              elevation="raised"
              className={`p-4 sm:p-6 sm:p-8 min-h-[220px] flex flex-col justify-center transition-colors ${
                flipped ? 'bg-sky-50/80 border-sky-200' : 'bg-white'
              }`}
            >
              {!flipped ? (
                <>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                    {card!.topicTitle}
                  </p>
                  <div className="text-lg sm:text-xl font-semibold text-slate-900 leading-snug">
                    {card!.kind === 'formula' ? (
                      <span>{card!.prompt}</span>
                    ) : (
                      <MathText text={card!.prompt} />
                    )}
                  </div>
                  <p className="mt-6 text-sm text-brand-600 font-medium flex items-center gap-1.5">
                    <Eye className="w-4 h-4" /> Tap to reveal
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 mb-2">
                    Answer
                  </p>
                  <div className="text-lg sm:text-xl font-semibold text-slate-900 leading-snug">
                    {card!.kind === 'formula' ? (
                      <MathText text={`$$${card!.answer}$$`} />
                    ) : (
                      <MathText text={card!.answer} />
                    )}
                  </div>
                  {card!.hint && (
                    <p className="mt-3 text-sm text-slate-500">{card!.hint}</p>
                  )}
                  <p className="mt-6 text-sm text-slate-400 flex items-center gap-1.5">
                    <EyeOff className="w-4 h-4" /> Tap to hide
                  </p>
                </>
              )}
            </Card>
          </button>

          <div className="flex flex-wrap gap-2 justify-between">
            <div className="flex gap-2">
              <Button size="lg" variant="secondary" onClick={() => go(-1)} aria-label="Previous card">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => go(1)} aria-label="Next card">
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="secondary" onClick={reshuffle} aria-label="Shuffle deck">
                <Shuffle className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => go(1)}>
                Still learning
              </Button>
              <Button onClick={markKnown}>
                Know it
              </Button>
            </div>
          </div>

          {topicId && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => navigate({ screen: 'topic', topicId })}
                className="text-sm text-brand-600 font-medium hover:underline"
              >
                ← Back to topic
              </button>
            </div>
          )}

          {knownCount === total && total > 0 && (
            <Card className="p-4 mt-4 border-success-200 bg-success-50/50">
              <p className="text-sm font-medium text-success-800 flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                You marked every card known — shuffle to drill again.
              </p>
            </Card>
          )}
        </>
      )}
    </PageContainer>
  );
}
