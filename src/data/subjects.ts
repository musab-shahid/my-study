import type { Subject } from '../types.ts';
import type { TrackId } from './tracks.ts';
import { listTrackDefinitions } from './tracks.ts';
import {
  Calculator,
  Atom,
  Globe,
  Cloud,
  Leaf,
  BarChart3,
  BookOpen,
  Trophy,
  FileText,
  MessageSquareText,
  Puzzle,
  Sigma,
  Map,
  Satellite,
  Binary,
  Brain,
  Shield,
  FlaskConical,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ExamTrack = TrackId;

export interface ExamTrackMeta {
  id: ExamTrack;
  title: string;
  shortTitle: string;
  description: string;
  icon: LucideIcon;
  /** Coarse token name; prefer getTrackStyle for UI */
  color: string;
  /** Tailwind gradient classes — keep in sync with getTrackStyle(track).gradient */
  accent: string;
}

/** Derived from tracks.ts registry — do not hard-code a parallel list. */
export const examTracks: ExamTrackMeta[] = listTrackDefinitions().map((d) => ({
  id: d.id,
  title: d.title,
  shortTitle: d.shortTitle,
  description: d.description,
  icon: d.iconKey === 'GraduationCap' ? Trophy : FileText,
  color: d.accent,
  accent:
    d.accent === 'indigo'
      ? 'from-indigo-500 to-blue-600'
      : d.accent === 'teal'
        ? 'from-teal-500 to-cyan-600'
        : 'from-sky-500 to-cyan-600',
}));

export const examTrackMap: Record<ExamTrack, ExamTrackMeta> = Object.fromEntries(
  examTracks.map((t) => [t.id, t])
) as Record<ExamTrack, ExamTrackMeta>;

export interface SubjectWithMeta extends Subject {
  /**
   * @deprecated Not used for UI. Visual colors live in subject-colors.ts (getSubjectStyle).
   * Kept only as a coarse human label; do not style from this string.
   */
  color: string;
  icon?: string;
  lucideIcon?: LucideIcon;
  examScope?: ('bs17' | 'bs16')[];
  track: ExamTrack;
}

export const subjects: SubjectWithMeta[] = [
  { id: 'maths', title: 'Mathematics', color: 'orange', lucideIcon: Calculator, track: 'fpsc' },
  { id: 'physics', title: 'Physics', color: 'blue', lucideIcon: Atom, track: 'fpsc' },
  { id: 'earth-science', title: 'Earth Sciences', color: 'stone', lucideIcon: Globe, track: 'fpsc' },
  { id: 'meteo-climatology', title: 'Meteorology & Climatology', color: 'sky', lucideIcon: Cloud, track: 'fpsc' },
  { id: 'env-studies', title: 'Environmental Studies', color: 'green', lucideIcon: Leaf, track: 'fpsc' },
  { id: 'research-analysis', title: 'Research & Analysis', color: 'red', lucideIcon: BarChart3, track: 'fpsc' },
  { id: 'english', title: 'English', color: 'pink', lucideIcon: BookOpen, examScope: ['bs17', 'bs16'], track: 'fpsc' },
  { id: 'hat-verbal', title: 'Verbal Reasoning', color: 'indigo', lucideIcon: MessageSquareText, track: 'hat' },
  { id: 'hat-analytical', title: 'Analytical Reasoning', color: 'emerald', lucideIcon: Puzzle, track: 'hat' },
  { id: 'hat-quantitative', title: 'Quantitative Reasoning', color: 'amber', lucideIcon: Sigma, track: 'hat' },
  {
    id: 'cgei-env-systems',
    title: 'Environmental Systems & Earth Processes',
    color: 'stone',
    lucideIcon: Globe,
    track: 'cgei',
  },
  {
    id: 'cgei-climate-science',
    title: 'Climate Science & Climate Data',
    color: 'teal',
    lucideIcon: Cloud,
    track: 'cgei',
  },
  {
    id: 'cgei-geospatial',
    title: 'Geospatial Science, GIS & Cartography',
    color: 'cyan',
    lucideIcon: Map,
    track: 'cgei',
  },
  {
    id: 'cgei-remote-sensing',
    title: 'Remote Sensing & Earth Observation',
    color: 'sky',
    lucideIcon: Satellite,
    track: 'cgei',
  },
  {
    id: 'cgei-data-science',
    title: 'Scientific Computing & Data Science',
    color: 'violet',
    lucideIcon: Binary,
    track: 'cgei',
  },
  {
    id: 'cgei-ml-geoai',
    title: 'Machine Learning & GeoAI',
    color: 'fuchsia',
    lucideIcon: Brain,
    track: 'cgei',
  },
  {
    id: 'cgei-climate-risk',
    title: 'Climate Risk, DRR & Resilience',
    color: 'rose',
    lucideIcon: Shield,
    track: 'cgei',
  },
  {
    id: 'cgei-research-practice',
    title: 'Research Design & Communication',
    color: 'amber',
    lucideIcon: FlaskConical,
    track: 'cgei',
  },
];

export const subjectMap: Record<string, SubjectWithMeta> = Object.fromEntries(
  subjects.map((s) => [s.id, s])
);

export function subjectsByTrack(track: ExamTrack): SubjectWithMeta[] {
  return subjects.filter((s) => s.track === track);
}
