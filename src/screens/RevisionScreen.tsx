import { RotateCcw, AlertTriangle, Clock, CheckCircle2, GraduationCap, Dumbbell, ChevronRight } from 'lucide-react';
import { useRouter } from '@/router';
import { useData } from '@/hooks/useData';
import { useSubjectData } from '@/hooks/useSubjectData';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { SubjectSelector, type SubjectFilterValue } from '@/components/subject/SubjectSelector';
import { subjectMap } from '@/data/subjects';
import { getTopic } from '@/data/topics';
import { sectionMap } from '@/data/sections';
import { getSubjectColor } from '@/data/subject-colors';
import { PageContainer, Card, EmptyState, Button, ScreenHeader, ListRow, Badge } from '@/components/ui';
import type { SubjectId, TopicProgress } from '@/types';
import { getEffectiveQuizStats, parseLocalDate } from '@/lib/constants';

type RevisionItem = {
  topicId: string;
  dateStr: string;
  accuracy: number | null;
  attempts: number;
  group: 'high' | 'review' | 'refresh';
};

function getRevisionGroups(
  topicProgress: Record<string, TopicProgress>,
  scopedTopicIds: Set<string>,
): Record<'high' | 'review' | 'refresh', RevisionItem[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = Object.entries(topicProgress)
    .filter(([, progress]) => progress.nextReview && scopedTopicIds.has(progress.topicId) && parseLocalDate(progress.nextReview) <= today)
    .map(([topicId, progress]) => {
      const stats = getEffectiveQuizStats(progress);
      const attempts = stats.total;
      const accuracy = attempts > 0 ? stats.accuracy : null;
      const group = attempts <= 0 ? 'refresh' : accuracy! < 60 ? 'high' : accuracy! < 75 ? 'review' : 'refresh';
      return { topicId, dateStr: progress.nextReview!, accuracy, attempts, group };
    });
  return {
    high: due.filter((item) => item.group === 'high'),
    review: due.filter((item) => item.group === 'review'),
    refresh: due.filter((item) => item.group === 'refresh'),
  };
}

export function RevisionScreen() {
  const { navigate } = useRouter();
  const sd = useSubjectData();
  const { data } = useData();
  const { getActiveSubject, setActiveSubjectForScreen } = useSubjectSelection();
  const activeSubject = getActiveSubject('review');
  const isAllSubjects = activeSubject === 'all';
  const subjectTitle = isAllSubjects ? 'All Subjects' : subjectMap[activeSubject as string]?.title ?? 'Subject';
  const scopedTopicIds = new Set(
    sd.topicsFor(isAllSubjects ? 'all' : activeSubject as SubjectId).map((topic) => topic.id),
  );
  const hasContent = isAllSubjects || scopedTopicIds.size > 0;
  const groups = getRevisionGroups(data.topicProgress, scopedTopicIds);
  const totalDue = groups.high.length + groups.review.length + groups.refresh.length;
  const allDueIds = [...groups.high, ...groups.review, ...groups.refresh].map((item) => item.topicId);

  const handleSubjectChange = (value: SubjectFilterValue) => setActiveSubjectForScreen('review', value);

  return (
    <PageContainer>
      <ScreenHeader
        title="Revision"
        subtitle="Review topics when they are due, with priority based on your recent performance."
        actions={<SubjectSelector value={activeSubject} onChange={handleSubjectChange} showAllOption />}
      />

      {!hasContent ? (
        <Card className="p-8">
          <EmptyState
            title={`No content for ${subjectTitle} yet`}
            message="Try another subject or switch to All Subjects."
            icon={<GraduationCap className="w-12 h-12" aria-hidden />}
          />
        </Card>
      ) : totalDue === 0 ? (
        <Card className="p-8">
          <EmptyState
            title="You are caught up"
            message="Nothing is due in this workspace. Study a topic or take a quiz to build your next review schedule."
            icon={<CheckCircle2 className="w-12 h-12 text-success-500" aria-hidden />}
            action={<Button onClick={() => navigate({ screen: 'practice', mode: 'quick' })}>Start practice</Button>}
          />
        </Card>
      ) : (
        <>
          <Card className="p-4 sm:p-5 mb-5 border-brand-100 bg-brand-50/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Ready for review</p>
                <p className="text-xl font-semibold text-slate-900 mt-1">{totalDue} topic{totalDue === 1 ? '' : 's'} due now</p>
                <p className="text-sm text-slate-600 mt-1">Work through the full queue or choose a topic below.</p>
              </div>
              <Button onClick={() => navigate({ screen: 'quiz', mode: 'review', topicIds: allDueIds, count: Math.min(totalDue * 3, 20) })}>
                <Dumbbell className="w-4 h-4" aria-hidden />
                Start review quiz
              </Button>
            </div>
          </Card>

          <div className="space-y-6">
            {groups.high.length > 0 && <RevisionGroup title="Needs attention" description="Recent quiz accuracy below 60%." icon={<AlertTriangle className="w-4 h-4" aria-hidden />} tone="red" items={groups.high} onOpen={(topicId) => navigate({ screen: 'topic', topicId })} />}
            {groups.review.length > 0 && <RevisionGroup title="Keep practicing" description="Due topics with developing recall." icon={<Clock className="w-4 h-4" aria-hidden />} tone="amber" items={groups.review} onOpen={(topicId) => navigate({ screen: 'topic', topicId })} />}
            {groups.refresh.length > 0 && <RevisionGroup title="Refresh" description="Due for a quick check-in." icon={<RotateCcw className="w-4 h-4" aria-hidden />} tone="green" items={groups.refresh} onOpen={(topicId) => navigate({ screen: 'topic', topicId })} />}
          </div>
        </>
      )}
    </PageContainer>
  );
}

function RevisionGroup({
  title,
  description,
  icon,
  tone,
  items,
  onOpen,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  tone: 'red' | 'amber' | 'green';
  items: RevisionItem[];
  onOpen: (topicId: string) => void;
}) {
  const iconClass = { red: 'text-danger-600 bg-danger-50', amber: 'text-warning-600 bg-warning-50', green: 'text-success-600 bg-success-50' }[tone];
  return (
    <section aria-labelledby={`revision-${tone}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${iconClass}`}>{icon}</span>
        <div>
          <h2 id={`revision-${tone}`} className="font-semibold text-slate-900">{title} <span className="text-slate-400 font-normal">({items.length})</span></h2>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>
      <Card elevation="flat" className="p-1">
        {items.map((item) => {
          const topic = getTopic(item.topicId);
          if (!topic) return null;
          const subjectId = sectionMap[topic.sectionId]?.subjectId;
          const subjectColor = subjectId ? getSubjectColor(subjectId) : null;
          return (
            <ListRow key={item.topicId} onClick={() => onOpen(item.topicId)} className="border-b border-slate-100 last:border-0">
              <span className={`w-1 self-stretch rounded-full ${subjectColor?.bar ?? 'bg-slate-300'}`} aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-sm text-slate-900 truncate">{topic.title}</span>
                <span className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                  <span>Due {new Date(item.dateStr).toLocaleDateString()}</span>
                  {item.accuracy === null ? <Badge color="slate">Not attempted</Badge> : <span>{item.accuracy}% recent accuracy</span>}
                </span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" aria-hidden />
            </ListRow>
          );
        })}
      </Card>
    </section>
  );
}
