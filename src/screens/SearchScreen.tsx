import { useState, useMemo, useDeferredValue, useEffect } from 'react';
import { Search, BookOpen, Calculator, ChevronRight, AlertTriangle } from 'lucide-react';
import { useRouter } from '@/router';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { useSubjectData } from '@/hooks/useSubjectData';
import { SubjectSelector, type SubjectFilterValue } from '@/components/subject/SubjectSelector';
import { sectionMap } from '@/data/sections';
import { subjectMap } from '@/data/subjects';
import { PageContainer, Card, EmptyState, LoadingSpinner, Button, ScreenHeader } from '@/components/ui';
import type { SubjectId } from '@/types';

export function SearchScreen() {
  const { navigate } = useRouter();
  const sd = useSubjectData();
  const { getActiveSubject, setActiveSubjectForScreen } = useSubjectSelection();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const activeSubject = getActiveSubject('search');
  const isAllSubjects = activeSubject === 'all';
  const subjectTitle = isAllSubjects
    ? 'All subjects in your active workspace'
    : (subjectMap[activeSubject as string]?.title ?? 'Subject');

  const handleSubjectChange = (value: SubjectFilterValue) => {
    setActiveSubjectForScreen('search', value);
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(false);
    // Scoped loader — only active track/profile subjects
    sd.ensureTopicsLoaded(isAllSubjects ? 'all' : (activeSubject as SubjectId))
      .then(() => {
        if (!cancelled) setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setLoading(false);
          setLoadError(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [isAllSubjects, activeSubject, sd.ensureTopicsLoaded]);

  // Shared learning-scope search (metadata + cache, track + profile filtered)
  const results = useMemo(() => {
    if (loading || !deferredQuery.trim()) return [];
    const all = sd.searchAll(deferredQuery);
    if (isAllSubjects) return all;
    return all.filter((r) => r.subjectId === activeSubject);
  }, [deferredQuery, loading, isAllSubjects, activeSubject, sd]);

  const hasContent = isAllSubjects
    ? sd.totalTopics > 0
    : sd.topicsFor(activeSubject as SubjectId).length > 0 || sd.totalTopics > 0;

  if (loadError) {
    return (
      <PageContainer>
        <Card className="p-8">
          <EmptyState
            title="Failed to load"
            message="Something went wrong while loading topics. Please try again."
            icon={<AlertTriangle className="w-12 h-12" />}
          />
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => {
                setLoadError(false);
                setLoading(true);
                sd
                  .ensureTopicsLoaded(isAllSubjects ? 'all' : (activeSubject as SubjectId))
                  .then(() => setLoading(false))
                  .catch(() => {
                    setLoading(false);
                    setLoadError(true);
                  });
              }}
            >
              Retry
            </Button>
          </div>
        </Card>
      </PageContainer>
    );
  }

  if (loading) {
    return (
      <PageContainer>
        <LoadingSpinner label="Loading topics…" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ScreenHeader
        title="Search"
        subtitle="Find topics, definitions, key facts, and formulas in your active workspace."
      />

      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <SubjectSelector value={activeSubject} onChange={handleSubjectChange} showAllOption />
        <p className="text-xs text-slate-500">Results stay within this track and exam profile.</p>
      </div>

      {!hasContent ? (
        <Card className="p-8">
          <EmptyState
            title="No topics in this workspace"
            message="Begin a track or switch workspace to search study material."
            icon={<Search className="w-12 h-12" />}
          />
        </Card>
      ) : (
        <>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${subjectTitle}…`}
              className="w-full pl-10 pr-4 py-3 rounded-btn border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
              autoComplete="off"
            />
          </div>

          {!deferredQuery.trim() ? (
            <Card className="p-8">
              <EmptyState
                title="Start typing to search"
                message="Find topics by title, definition, key facts, or formula names within your active workspace."
                icon={<Search className="w-12 h-12" />}
              />
            </Card>
          ) : results.length === 0 ? (
            <Card className="p-8">
              <EmptyState
                title="No results found"
                message={`No matches for "${query}" in ${subjectTitle}. Try different keywords.`}
                icon={<Search className="w-12 h-12" />}
              />
            </Card>
          ) : (
            <div>
              <p className="text-slate-500 text-sm mb-3">
                {results.length} result{results.length !== 1 ? 's' : ''} · {subjectTitle}
              </p>
              <div className="space-y-2">
                {results.map((result, i) => {
                  const section = sectionMap[result.topic.sectionId];
                  return (
                    <Card key={`${i}-${result.type}-${result.topic.id}`} elevation="flat" className="p-0 border-b border-slate-200 rounded-none first:rounded-t-card last:rounded-b-card">
                      <button
                        type="button"
                        onClick={() => navigate({ screen: 'topic', topicId: result.topic.id })}
                        className="w-full flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
                      >
                        <div className="w-9 h-9 rounded-btn bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                          {result.type === 'formula' ? (
                            <Calculator className="w-4 h-4 text-slate-600" />
                          ) : (
                            <BookOpen className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900 text-sm">{result.topic.title}</p>
                          <p className="text-slate-500 text-xs mt-0.5">
                            {subjectMap[result.subjectId]?.title ?? result.subjectId}
                            {section ? ` · ${section.title}` : ''}
                          </p>
                          <p className="text-slate-600 text-sm mt-2 line-clamp-2">
                            {result.match}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      </button>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </PageContainer>
  );
}
