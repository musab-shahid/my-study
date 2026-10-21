import { useState, useMemo, useEffect } from 'react';
import { useDropdownKeyboard } from '@/hooks/useDropdownKeyboard';
import { Zap, Target, RotateCcw, ChevronRight, ArrowLeft, GraduationCap, CheckCircle2, Dumbbell, ChevronDown, Check, AlertTriangle } from 'lucide-react';
import { useRouter } from '@/router';
import { useData } from '@/hooks/useData';
import { useSubjectData } from '@/hooks/useSubjectData';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { SubjectSelector, type SubjectFilterValue } from '@/components/subject/SubjectSelector';
import { subjectMap, subjects } from '@/data/subjects';
import { topicsBySection } from '@/data/topics';
import { questionsByTopic } from '@/data/questions';
import { SectionBadge } from '@/components/subject/SubjectBadge';
import { PageContainer, Card, EmptyState, PurposeLine, LoadingSpinner, Button, ScreenHeader, SectionLabel } from '@/components/ui';

import type { SubjectId } from '@/types';
import { getTopicStatusFromProgress } from '@/lib/constants';

type MockCount = 30 | 50 | 75 | 100;
type ChallengeDifficulty = 'easy' | 'medium' | 'hard';

const MOCK_COUNT_OPTIONS: MockCount[] = [30, 50, 75, 100];
const CHALLENGE_DIFFICULTY_OPTIONS: { value: ChallengeDifficulty; label: string }[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

const PRACTICE_PREFS_KEY = 'examprep-practice-prefs';

interface PracticePrefs {
  mockCount: MockCount;
  challengeDifficulty: ChallengeDifficulty;
}

const DEFAULT_PREFS: PracticePrefs = {
  mockCount: 50,
  challengeDifficulty: 'hard',
};

function loadPrefs(): PracticePrefs {
  try {
    const raw = localStorage.getItem(PRACTICE_PREFS_KEY);
    if (raw) return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_PREFS };
}

function savePrefs(prefs: PracticePrefs): void {
  try { localStorage.setItem(PRACTICE_PREFS_KEY, JSON.stringify(prefs)); } catch { /* ignore */ }
}

function computeMockTimerMinutes(count: number): number {
  return Math.ceil((count * 45) / 60);
}

function relativeDate(timestamp: number): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const d = new Date(timestamp);
  d.setHours(0, 0, 0, 0);
  const diff = Math.round((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff} days ago`;
  return d.toLocaleDateString();
}

type ModeType = 'quick' | 'focus' | 'mock' | 'review' | 'challenge';

export function PracticeScreen({ mode: initialMode }: { mode?: 'topic' | 'quick' | 'mock' }) {
  const { navigate } = useRouter();
  const { data } = useData();
  const sd = useSubjectData();
  const { ensureQuestionsLoaded } = sd;
  const { getActiveSubject, setActiveSubjectForScreen } = useSubjectSelection();
  const activeSubject = getActiveSubject('practice');
  const subjectId = activeSubject === 'all' ? 'all' : (activeSubject as SubjectId);

  const [view, setView] = useState<'modes' | 'focus'>('modes');
  const [selectedFocusTopics, setSelectedFocusTopics] = useState<Set<string>>(new Set());
  const [prefs, setPrefs] = useState<PracticePrefs>(() => loadPrefs());
  const [expandedMode, setExpandedMode] = useState<ModeType | null>(initialMode === 'mock' ? 'mock' : null);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setQuestionsLoading(true);
    setLoadError(false);
    ensureQuestionsLoaded(subjectId)
      .then(() => { if (!cancelled) setQuestionsLoading(false); })
      .catch(() => { if (!cancelled) { setQuestionsLoading(false); setLoadError(true); } });
    return () => { cancelled = true; };
  }, [subjectId, ensureQuestionsLoaded]);

  const updatePrefs = (patch: Partial<PracticePrefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch };
      savePrefs(next);
      return next;
    });
  };

  const handleSubjectChange = (value: SubjectFilterValue) => {
    setActiveSubjectForScreen('practice', value);
  };

  const subjectTopics = sd.topicsFor(subjectId);
  const hasContent = subjectTopics.length > 0;
  const subjectTitle = activeSubject === 'all' ? 'All Subjects' : (subjectMap[activeSubject as string]?.title ?? 'Subject');

  const questionsReady = sd.isQuestionsReady(subjectId);
  const pool = useMemo(() => sd.questionsFor(subjectId), [subjectId, questionsReady, sd.questionsFor]);
  const totalAvailable = pool.length;
  /** Metadata-backed count so mock gating matches Dashboard before banks finish loading */
  const authoredQuestionCount = sd.statsFor(subjectId).totalQuestions;

  const wrongPool = useMemo(() => {
    const wrongIds = new Set(
      Object.entries(data.questionResults).filter(([, r]) => !r.correct).map(([qid]) => qid)
    );
    return pool.filter((q) => wrongIds.has(q.id));
  }, [data.questionResults, pool]);

  const easyPool = useMemo(() => pool.filter((q) => q.difficulty === 'easy'), [pool]);
  const mediumPool = useMemo(() => pool.filter((q) => q.difficulty === 'medium'), [pool]);
  const hardPool = useMemo(() => pool.filter((q) => q.difficulty === 'hard'), [pool]);

  const challengePool = useMemo(() => {
    if (prefs.challengeDifficulty === 'easy') return easyPool;
    if (prefs.challengeDifficulty === 'medium') return mediumPool;
    return hardPool;
  }, [easyPool, mediumPool, hardPool, prefs.challengeDifficulty]);

  const recentSessions = [...data.quizHistory].reverse().slice(0, 3);

  // --- Focus mode topic picker ---
  if (view === 'focus') {
    if (questionsLoading) return <PageContainer width="standard"><LoadingSpinner label="Loading questions…" /></PageContainer>;
    const subjectOrder = subjects.reduce((map, s, i) => { map[s.id] = i; return map; }, {} as Record<string, number>);
    const focusSections = sd.sectionsFor(subjectId).slice().sort((a, b) => {
      const aOrder = subjectOrder[a.subjectId] ?? 99;
      const bOrder = subjectOrder[b.subjectId] ?? 99;
      return aOrder - bOrder;
    });

    return (
      <PageContainer width="standard">
        <div className="mb-4">
          <button onClick={() => setView('modes')} className="flex items-center gap-1 text-slate-500 text-sm hover:text-slate-700 mb-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-xl sm:text-3xl font-bold text-slate-900">Focus Practice</h1>
          <p className="text-slate-500 mt-1">Select topics to drill — {selectedFocusTopics.size} selected</p>
        </div>

        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-2">
          &quot;All subjects&quot; means every subject in your active track (and exam profile), not other tracks.
        </p>
        <SubjectSelector value={activeSubject} onChange={handleSubjectChange} showAllOption={false} compact />
        </div>

        {focusSections.length === 0 ? (
          <Card className="p-8">
            <EmptyState title="No topics available" message={`${subjectTitle} hasn't been authored yet.`} icon={<GraduationCap className="w-12 h-12" />} />
          </Card>
        ) : (
          <>
            <div className="space-y-4 mb-3 sm:mb-6">
              {focusSections.map((section) => {
                const sectionTopics = topicsBySection(section.id);
                return (
                  <div key={section.id}>
                    <div className="flex items-center gap-2 mb-2">
                      <SectionBadge section={section} />
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{section.title}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sectionTopics.map((topic) => {
                        const qs = questionsByTopic(topic.id);
                        if (qs.length === 0) return null;
                        const selected = selectedFocusTopics.has(topic.id);
                        const progress = data.topicProgress[topic.id];
                        const studied = data.studiedTopics.includes(topic.id);
                        const status = getTopicStatusFromProgress(studied, progress);
                        const isMastered = status === 'mastered';
                        const isAttempted = !isMastered && (progress?.quizTotal ?? 0) > 0;
                        return (
                          <button
                            key={topic.id}
                            onClick={() => {
                              setSelectedFocusTopics((prev) => {
                                const next = new Set(prev);
                                if (next.has(topic.id)) next.delete(topic.id);
                                else next.add(topic.id);
                                return next;
                              });
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                              selected
                                ? 'bg-brand-500 text-white'
                                : isMastered
                                  ? 'bg-success-50 border border-success-100 text-success-700 hover:bg-success-100'
                                  : isAttempted
                                    ? 'bg-warning-50 border border-warning-100 text-warning-700 hover:bg-warning-100'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {isMastered && !selected && <CheckCircle2 size={14} className="shrink-0" />}
                            {isAttempted && !selected && <RotateCcw size={14} className="shrink-0" />}
                            {topic.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => {
                const topicIdsArr = [...selectedFocusTopics];
                if (topicIdsArr.length === 0) return;
                navigate({ screen: 'quiz', mode: 'quick', topicIds: topicIdsArr, scope: activeSubject === 'all' ? 'all' : 'subject', subjectId: activeSubject === 'all' ? undefined : subjectId, count: 'all', difficulty: 'any', timeLimit: 'none' });
              }}
              disabled={selectedFocusTopics.size === 0}
              className="w-full py-3 rounded-btn bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors disabled:opacity-50"
            >
              Start Focus Practice — all questions ({selectedFocusTopics.size} topic{selectedFocusTopics.size !== 1 ? 's' : ''})
            </button>
          </>
        )}
      </PageContainer>
    );
  }

  // --- Default: mode cards ---
  const mockDisabled = authoredQuestionCount < 30;
  const challengeDisabled = challengePool.length === 0;
  const reviewDisabled = wrongPool.length === 0;
  const mockTimerMinutes = computeMockTimerMinutes(prefs.mockCount);

  const startQuick = () => {
    navigate({ screen: 'quiz', mode: 'quick', scope: activeSubject === 'all' ? 'all' : 'subject', subjectId: activeSubject === 'all' ? undefined : subjectId, count: 10, difficulty: 'any', timeLimit: 'none' });
  };

  const startReview = () => {
    navigate({ screen: 'quiz', mode: 'review', scope: activeSubject === 'all' ? 'all' : 'subject', subjectId: activeSubject === 'all' ? undefined : subjectId, count: 'all', difficulty: 'any', timeLimit: 'none', wrongPool: true });
  };

  const startMock = () => {
    navigate({ screen: 'quiz', mode: 'mock', scope: activeSubject === 'all' ? 'all' : 'subject', subjectId: activeSubject === 'all' ? undefined : subjectId, count: prefs.mockCount, difficulty: 'any', timeLimit: mockTimerMinutes });
  };

  const startChallenge = () => {
    navigate({ screen: 'quiz', mode: 'challenge', scope: activeSubject === 'all' ? 'all' : 'subject', subjectId: activeSubject === 'all' ? undefined : subjectId, count: 'all', difficulty: prefs.challengeDifficulty, timeLimit: 'none' });
  };

  const toggleExpand = (modeType: ModeType) => {
    setExpandedMode((prev) => (prev === modeType ? null : modeType));
  };

  if (loadError) return (
    <PageContainer width="standard">
      <Card className="p-8">
        <EmptyState title="Failed to load" message="Something went wrong while loading questions. Please try again." icon={<AlertTriangle className="w-12 h-12" />} />
        <div className="flex justify-center mt-4">
          <Button onClick={() => { setLoadError(false); setQuestionsLoading(true); ensureQuestionsLoaded(subjectId).then(() => setQuestionsLoading(false)).catch(() => { setQuestionsLoading(false); setLoadError(true); }); }}>Retry</Button>
        </div>
      </Card>
    </PageContainer>
  );

  if (questionsLoading) return <PageContainer width="standard"><LoadingSpinner label="Loading questions…" /></PageContainer>;

  return (
    <PageContainer width="standard">
      <ScreenHeader
        title="Practice"
        subtitle="Choose a mode, set scope, then start. One primary action per mode."
      />
      <PurposeLine>Test yourself deliberately. Five paths, one clear goal.</PurposeLine>

      <SectionLabel>Scope</SectionLabel>
      <div className="mb-5">
        <SubjectSelector value={activeSubject} onChange={handleSubjectChange} showAllOption />
        <p className="text-slate-500 text-sm mt-2">
          {totalAvailable} question{totalAvailable !== 1 ? 's' : ''} available in this scope
        </p>
      </div>

      <SectionLabel>Mode</SectionLabel>

      {activeSubject !== 'all' && !hasContent ? (
        <Card className="p-8">
          <EmptyState title={`No content for ${subjectTitle} yet`} message="Try selecting a different subject or use All Subjects." icon={<GraduationCap className="w-12 h-12" />} />
        </Card>
      ) : (
        <>
          <div className="space-y-3 mb-3 sm:mb-6">
            {/* Quick Practice */}
            <SimpleModeCard
              icon={<Zap className="w-5 h-5" />}
              iconBg="bg-warning-100 text-warning-600"
              title="Quick Practice"
              description="Random 10 questions, no timer"
              bestFor="daily warm-up"
              onClick={startQuick}
              disabled={totalAvailable === 0}
              disabledNote={totalAvailable === 0 ? 'No questions available for this subject' : undefined}
            />

            {/* Focus Practice */}
            <SimpleModeCard
              icon={<Target className="w-5 h-5" />}
              iconBg="bg-brand-100 text-brand-600"
              title="Focus Practice"
              description="Every available question from your selected topics"
              bestFor="targeted improvement"
              onClick={() => {
                setSelectedFocusTopics(new Set());
                setView('focus');
              }}
              disabled={!hasContent && activeSubject !== 'all'}
            />

            {/* Mock Exam */}
            <ExpandableModeCard
              icon={<GraduationCap className="w-5 h-5" />}
              iconBg="bg-slate-900 text-brand-400"
              title="Mock Exam"
              description={mockDisabled ? `Need at least 30 questions — only ${authoredQuestionCount} available` : `${prefs.mockCount} questions, exam simulation`}
              bestFor="exam simulation"
              expanded={expandedMode === 'mock'}
              onToggle={() => toggleExpand('mock')}
              disabled={mockDisabled}
              disabledNote={mockDisabled ? `Need at least 30 questions for a meaningful mock exam (currently ${authoredQuestionCount})` : undefined}
              onStart={startMock}
              startLabel="Start Mock"
            >
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-500 text-xs font-medium mb-1.5">Count</label>
                    <Dropdown
                      value={String(prefs.mockCount)}
                      options={MOCK_COUNT_OPTIONS.map((n) => ({ value: String(n), label: String(n) }))}
                      onChange={(v) => updatePrefs({ mockCount: parseInt(v) as MockCount })}
                      ariaLabel="Mock exam question count"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-xs font-medium mb-1.5">Timer</label>
                    <div className="px-3 py-2 rounded-btn border border-slate-200 bg-slate-50 text-slate-600 text-sm font-medium">
                      {mockTimerMinutes} min (auto)
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-500 text-xs font-medium mb-1.5">Difficulty</label>
                    <div className="px-3 py-2 rounded-btn border border-slate-200 bg-slate-50 text-slate-500 text-sm font-medium">
                      Auto-mixed
                    </div>
                  </div>
                </div>
              </div>
            </ExpandableModeCard>

            {/* Review Wrong Answers */}
            <SimpleModeCard
              icon={<RotateCcw className="w-5 h-5" />}
              iconBg="bg-danger-100 text-danger-600"
              title="Review Wrong Answers"
              description={reviewDisabled ? "Re-attempt questions you got wrong" : `All ${wrongPool.length} wrong answers available`}
              bestFor="closing knowledge gaps"
              onClick={startReview}
              disabled={reviewDisabled}
              disabledNote={reviewDisabled ? 'No wrong answers yet — keep practicing!' : undefined}
            />

            {/* Challenge Mode */}
            <ExpandableModeCard
              icon={<Dumbbell className="w-5 h-5" aria-hidden />}
              iconBg="bg-warning-100 text-warning-700"
              title="Challenge Mode"
              description={challengeDisabled ? `No ${prefs.challengeDifficulty} questions available` : `All ${prefs.challengeDifficulty} questions`}
              bestFor="advanced learners"
              expanded={expandedMode === 'challenge'}
              onToggle={() => toggleExpand('challenge')}
              disabled={challengeDisabled}
              disabledNote={challengeDisabled ? `No ${prefs.challengeDifficulty} questions available` : undefined}
              onStart={startChallenge}
              startLabel="Start Challenge"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 text-xs font-medium mb-1.5">Difficulty</label>
                  <Dropdown
                    value={prefs.challengeDifficulty}
                    options={CHALLENGE_DIFFICULTY_OPTIONS.map((d) => ({ value: d.value, label: d.label }))}
                    onChange={(v) => updatePrefs({ challengeDifficulty: v as ChallengeDifficulty })}
                    ariaLabel="Challenge difficulty"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 text-xs font-medium mb-1.5">Available at this level</label>
                  <div className="px-3 py-2 rounded-btn border border-slate-200 bg-slate-50 text-slate-500 text-sm font-medium">
                    {challengePool.length} questions
                  </div>
                </div>
              </div>
            </ExpandableModeCard>
          </div>

          {/* Recent Sessions */}
          <Card className="p-5">
            <h3 className="font-semibold text-slate-900 mb-3">Your last 3 sessions</h3>
            {recentSessions.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-4">No sessions yet — start a quiz to see your history here.</p>
            ) : (
              <div className="space-y-3">
                {recentSessions.map((quiz, i) => {
                  const pct = quiz.total > 0 ? Math.round((quiz.score / quiz.total) * 100) : 0;
                  const modeLabel = quiz.mode === 'topic' ? 'Topic Quiz'
                    : quiz.mode === 'quick' ? 'Quick Practice'
                    : quiz.mode === 'mock' ? 'Mock Exam'
                    : quiz.mode === 'review' ? 'Review Wrong'
                    : 'Challenge';
                  const subjLabel = quiz.subjectId ? (subjectMap[quiz.subjectId]?.title ?? quiz.subjectId) : 'All Subjects';
                  const diffLabel = quiz.difficultyFilter && quiz.difficultyFilter !== 'any' ? ` · ${quiz.difficultyFilter}` : '';
                  return (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <CheckCircle2 className={`w-5 h-5 shrink-0 ${pct >= 75 ? 'text-success-500' : pct >= 50 ? 'text-warning-500' : 'text-danger-500'}`} />
                        <div className="min-w-0">
                          <p className="text-slate-800 text-sm font-medium truncate">{modeLabel}</p>
                          <p className="text-slate-500 text-xs">{relativeDate(quiz.date)} · {subjLabel}{diffLabel}</p>
                        </div>
                      </div>
                      <span className={`text-sm font-bold shrink-0 ${pct >= 75 ? 'text-success-600' : pct >= 50 ? 'text-warning-600' : 'text-danger-600'}`}>
                        {quiz.score}/{quiz.total} ({pct}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </>
      )}
    </PageContainer>
  );
}

function Dropdown({ value, options, onChange, ariaLabel }: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  ariaLabel?: string;
}) {
  const panelId = `dropdown-${ariaLabel ?? 'select'}`.replace(/\s+/g, '-').toLowerCase();
  const {
    open, setOpen, triggerRef, panelRef, optionRefs,
    closeDropdown, handleTriggerKeyDown, handleOptionKeyDown,
  } = useDropdownKeyboard(options.length);

  const currentLabel = options.find((o) => o.value === value)?.label ?? value;

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => (open ? closeDropdown() : setOpen(true))}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={ariaLabel}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-btn border border-slate-200 bg-white text-slate-800 text-sm font-medium hover:bg-slate-50 transition-colors"
      >
        <span>{currentLabel}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => closeDropdown()} />
          <div
            ref={panelRef}
            id={panelId}
            role="listbox"
            aria-label={ariaLabel}
            className="absolute z-20 mt-1 w-full rounded-btn border border-slate-200 bg-white shadow-lg overflow-hidden max-h-60 overflow-y-auto"
          >
            {options.map((opt, idx) => (
              <button
                key={opt.value}
                ref={(el) => { optionRefs.current[idx] = el; }}
                onClick={() => { onChange(opt.value); closeDropdown(); }}
                onKeyDown={(e) => handleOptionKeyDown(e, idx)}
                role="option"
                aria-selected={opt.value === value}
                tabIndex={-1}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-slate-50 transition-colors ${
                  opt.value === value ? 'bg-brand-50 text-brand-700 font-medium' : 'text-slate-700'
                }`}
              >
                <span>{opt.label}</span>
                {opt.value === value && <Check className="w-4 h-4 text-brand-500" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SimpleModeCard({ icon, iconBg, title, description, bestFor, onClick, disabled, disabledNote }: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  bestFor: string;
  onClick: () => void;
  disabled?: boolean;
  disabledNote?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-start gap-2.5 sm:gap-4 p-3.5 sm:p-5 rounded-card bg-white border border-slate-200 hover:border-slate-300 hover:shadow-card-hover transition-all text-left disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
    >
      <div className={`w-12 h-12 rounded-btn ${iconBg} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="text-slate-500 text-sm mt-0.5">{disabledNote ?? description}</p>
        <p className="text-slate-400 text-xs mt-1">Best for: {bestFor}</p>
      </div>
      {!disabled && <ChevronRight className="w-5 h-5 text-slate-300 shrink-0 mt-1" />}
    </button>
  );
}

function ExpandableModeCard({ icon, iconBg, title, description, bestFor, expanded, onToggle, disabled, disabledNote, onStart, startLabel, children }: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  bestFor: string;
  expanded: boolean;
  onToggle: () => void;
  disabled?: boolean;
  disabledNote?: string;
  onStart: () => void;
  startLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-card bg-white border transition-all ${expanded ? 'border-slate-300 shadow-card' : 'border-slate-200 hover:border-slate-300 hover:shadow-card-hover'} ${disabled ? 'opacity-60' : ''}`}>
      <button
        onClick={onToggle}
        disabled={disabled}
        aria-expanded={expanded}
        aria-controls={`practice-options-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="w-full flex items-start gap-2.5 sm:gap-4 p-3.5 sm:p-5 text-left disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
      >
        <div className={`w-12 h-12 rounded-btn ${iconBg} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900">{title}</p>
          <p className="text-slate-500 text-sm mt-0.5">{disabledNote ?? description}</p>
          <p className="text-slate-400 text-xs mt-1">Best for: {bestFor}</p>
        </div>
        {!disabled && (
          <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        )}
      </button>

      {expanded && !disabled && (
        <div id={`practice-options-${title.toLowerCase().replace(/\s+/g, '-')}`} className="px-5 pb-5">
          <div className="border-t border-slate-100 pt-4">
            {children}
            <button
              onClick={onStart}
              className="w-full mt-4 py-2 rounded-btn bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              {startLabel}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
