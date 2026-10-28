import { useState, useMemo, useEffect } from 'react';
import { ChevronRight, GraduationCap, AlertTriangle } from 'lucide-react';
import { MathText } from '@/components/MathText';
import { useRouter } from '@/router';
import { useSubjectData } from '@/hooks/useSubjectData';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { SubjectSelector, type SubjectFilterValue } from '@/components/subject/SubjectSelector';
import { getFormulasForSubject, refreshFormulaVault } from '@/data/formulas';
import { subjectMap } from '@/data/subjects';
import { getTrackForSubject } from '@/lib/exam-track';
import { PageContainer, Card, EmptyState, LoadingSpinner, Button, ScreenHeader } from '@/components/ui';
import type { SubjectId } from '@/types';

/** Formula-heavy subjects load first so the vault is usable before every bank finishes. */
const FORMULA_PRIORITY: SubjectId[] = [
  'physics',
  'maths',
  'hat-quantitative',
  'meteo-climatology',
  'earth-science',
  'env-studies',
];


export function FormulaVaultScreen() {
  const { navigate } = useRouter();
  const sd = useSubjectData();
  const { getActiveSubject, setActiveSubjectForScreen, activeTrack } = useSubjectSelection();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [vaultTick, setVaultTick] = useState(0);
  /** Bumped only by Retry — drives the load effect without self-looping */
  const [reloadKey, setReloadKey] = useState(0);

  const activeSubject = getActiveSubject('formulas');
  const isAllSubjects = activeSubject === 'all';
  const subjectTitle = isAllSubjects ? 'All Subjects' : (subjectMap[activeSubject as string]?.title ?? 'Subject');

  const handleSubjectChange = (value: SubjectFilterValue) => {
    setActiveSubjectForScreen('formulas', value);
  };

  const { ensureTopicsLoaded } = sd;
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(false);

    async function load() {
      try {
        if (isAllSubjects) {
          // Priority subjects limited to the active track (no cross-track HAT/FPSC leak)
          const priority = FORMULA_PRIORITY.filter((id) => getTrackForSubject(id) === activeTrack);
          await Promise.allSettled(priority.map((id) => ensureTopicsLoaded(id)));
          if (cancelled) return;
          setVaultTick((n) => n + 1);
          setLoading(false);
          await ensureTopicsLoaded('all');
          if (cancelled) return;
          setVaultTick((n) => n + 1);
        } else {
          await ensureTopicsLoaded(activeSubject as SubjectId);
          if (cancelled) return;
          setVaultTick((n) => n + 1);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setLoading(false);
          setLoadError(true);
        }
      }
    }

    void load();
    return () => { cancelled = true; };
  }, [isAllSubjects, activeSubject, ensureTopicsLoaded, activeTrack, reloadKey]);

  const scopedFormulas = useMemo(() => {
    // Always respect active track / exam profile subject set (never global vault dump)
    void vaultTick;
    return sd.formulasFor(isAllSubjects ? 'all' : (activeSubject as SubjectId));
  }, [isAllSubjects, activeSubject, vaultTick, sd]);

  if (loadError && scopedFormulas.length === 0) return (
    <PageContainer>
      <Card className="p-8">
        <EmptyState title="Failed to load" message="Something went wrong while loading formulas. Please try again." icon={<AlertTriangle className="w-12 h-12" />} />
        <div className="flex justify-center mt-4">
          <Button onClick={() => { setLoadError(false); setLoading(true); setReloadKey((n) => n + 1); }}>Retry</Button>
        </div>
      </Card>
    </PageContainer>
  );

  if (loading && scopedFormulas.length === 0) {
    return <PageContainer><LoadingSpinner label="Loading formulas…" /></PageContainer>;
  }

  const categories = [...new Set(scopedFormulas.map((f) => f.category))];

  return (
    <PageContainer>
      <ScreenHeader
        title="Formulas"
        subtitle={`${isAllSubjects ? 'All formulas across all subjects' : `All formulas in ${subjectTitle}`}, grouped by category${loading ? ' · loading more…' : ''}`}
      />

      <div className="mb-3 sm:mb-6">
        <SubjectSelector value={activeSubject} onChange={handleSubjectChange} showAllOption />
      </div>

      {scopedFormulas.length === 0 ? (
        <Card className="p-8">
          <EmptyState
            title={`No formulas for ${subjectTitle}`}
            message={
              isAllSubjects
                ? 'No formula content is available in your active track and exam profile yet.'
                : 'This subject has no formula entries in the study material yet — not a load failure.'
            }
            icon={<GraduationCap className="w-12 h-12" />}
          />
        </Card>
      ) : (
        <div className="space-y-3 sm:space-y-6">
          {categories.map((cat) => {
            const formulas = scopedFormulas.filter((f) => f.category === cat);
            if (formulas.length === 0) return null;
            return (
              <div key={cat}>
                <h2 className="font-semibold text-ink mb-3 text-lg">{cat}</h2>
                <div className="space-y-3">
                  {formulas.map((f) => {
                    const key = `${f.topicId}:${f.name}`;
                    const isOpen = expanded === key;
                    return (
                    <Card key={key} className="p-card-pad border border-slate-200">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`formula-details-${key}`}
                        onClick={() => setExpanded(isOpen ? null : key)}
                        className="w-full text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <p className="font-semibold text-ink text-sm">{f.name}</p>
                              <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-label font-semibold uppercase tracking-wide text-ink-muted">
                                {cat}
                              </span>
                            </div>
                            <div className="formula-display text-ink text-base mt-2 overflow-x-auto py-2 px-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                              <MathText text={`$$${f.expression}$$`} />
                            </div>
                            <p className="text-muted text-xs mt-2">
                              <span className="font-medium text-ink">Topic:</span> {f.topicTitle}
                            </p>
                          </div>
                          <ChevronRight className={`w-5 h-5 text-ink-muted shrink-0 mt-1 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                        </div>
                      </button>
                      {isOpen && (
                        <div id={`formula-details-${key}`} className="mt-4 pt-4 border-t border-slate-100">
                          {(f.variables?.length ?? 0) > 0 && (
                            <div className="space-y-2 mb-4">
                              <p className="text-label font-semibold uppercase tracking-wide text-muted">Symbols</p>
                              {f.variables.map((v, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm">
                                  <span className="text-ink font-semibold shrink-0 min-w-[3rem]">
                                    <MathText text={`$${v.symbol}$`} />
                                  </span>
                                  <span className="min-w-0 flex-1 break-words text-muted">= {v.meaning}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          <Button variant="ghost" onClick={() => navigate({ screen: 'topic', topicId: f.topicId })} className="min-h-11">
                            Open full topic — {f.topicTitle} →
                          </Button>
                        </div>
                      )}
                    </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}
