import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  planDailyWorkload,
  rankTopicsForExamDay,
  type TopicPlanInput,
} from '../exam-planner.ts';
import type { ExamSession } from '../exam-schedule.ts';

const session: ExamSession = {
  id: 'profile-exam-1',
  label: 'Configured practice exam',
  startsAtIso: '2026-10-11T10:00:00+05:00',
  timeZone: 'Asia/Karachi',
  note: 'Explicit test fixture only.',
};

describe('exam planner contracts', () => {
  it('does not invent an exam horizon when no session is configured', () => {
    const plan = planDailyWorkload({
      dueTopicCount: 3,
      now: new Date('2026-10-01T12:00:00Z'),
    });
    assert.equal(plan.session, null);
    assert.equal(plan.daysUntilExam, null);
    assert.equal(plan.sampleInterval, null);
    assert.match(plan.message, /No upcoming exam session is configured/);
    assert.equal(plan.suggestedMinutes, 36);
  });

  it('uses an explicitly configured session and its calendar time zone', () => {
    const plan = planDailyWorkload({
      dueTopicCount: 2,
      sessions: [session],
      now: new Date('2026-10-01T12:00:00Z'),
    });
    assert.equal(plan.session?.id, 'profile-exam-1');
    assert.equal(plan.daysUntilExam, 10);
    assert.equal(plan.sampleInterval?.status, 'scheduled');
    assert.equal(plan.sampleInterval?.intervalDays, 3);
  });

  it('returns an empty planning horizon after all configured sessions pass', () => {
    const plan = planDailyWorkload({
      dueTopicCount: 1,
      sessions: [session],
      now: new Date('2026-10-12T00:00:00Z'),
    });
    assert.equal(plan.session, null);
    assert.equal(plan.daysUntilExam, null);
    assert.equal(plan.sampleInterval, null);
  });

  it('rejects invalid workload values and malformed exam sessions', () => {
    assert.throws(() => planDailyWorkload({ dueTopicCount: -1 }), RangeError);
    assert.throws(() => planDailyWorkload({ dueTopicCount: 1.5 }), RangeError);
    assert.throws(() => planDailyWorkload({ dueTopicCount: 1, minutesPerDueTopic: Number.NaN }), RangeError);
    assert.throws(() => planDailyWorkload({ dueTopicCount: 1, dailyBudgetMinutes: -1 }), RangeError);
    assert.throws(() => planDailyWorkload({
      dueTopicCount: 1,
      sessions: [{ ...session, startsAtIso: 'not-a-date' }],
    }), RangeError);
  });

  it('validates recall probabilities and blueprint weights', () => {
    const validTopic: TopicPlanInput = { topicId: 'topic-a', predictedRecall: 0.5 };
    assert.equal(rankTopicsForExamDay([validTopic]).length, 1);
    assert.throws(() => rankTopicsForExamDay([{ topicId: 'topic-a', predictedRecall: 1.2 }]), RangeError);
    assert.throws(() => rankTopicsForExamDay([validTopic], [{ id: 'x', weight: Number.NaN }]), RangeError);
    assert.throws(() => rankTopicsForExamDay([validTopic], [
      { id: 'x', weight: 1 },
      { id: 'x', weight: 2 },
    ]), RangeError);
  });
});
