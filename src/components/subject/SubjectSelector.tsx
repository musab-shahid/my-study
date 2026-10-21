import { ChevronDown, Check } from 'lucide-react';
import { useRef, useEffect, useCallback, useId } from 'react';
import { subjects } from '@/data/subjects';
import { subjectsForScope } from '@/lib/track-scope';
import { useData } from '@/hooks/useData';
import { isTrackId } from '@/data/tracks';
import { getSubjectStyle } from '@/data/subject-colors';
import { topicsBySubject } from '@/data/topics';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { useDropdownKeyboard } from '@/hooks/useDropdownKeyboard';
import type { SubjectId } from '@/types';

export type SubjectFilterValue = SubjectId | 'all';

interface SubjectSelectorProps {
  value: SubjectFilterValue;
  onChange: (value: SubjectFilterValue) => void;
  showAllOption?: boolean;
  compact?: boolean;
  label?: string;
}

export function SubjectSelector({ value, onChange, showAllOption = true, compact = false, label }: SubjectSelectorProps) {
  const { activeTrack } = useSubjectSelection();
  const { trackMembership } = useData();
  const examId = isTrackId(activeTrack)
    ? (trackMembership.enrollments[activeTrack]?.activeExamId ?? null)
    : null;
  const ref = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const trackSubjects = isTrackId(activeTrack)
    ? subjectsForScope({ trackId: activeTrack, examId })
    : [];
  const allOptions = [
    ...(showAllOption ? [{ value: 'all' as SubjectFilterValue, label: 'All Subjects' }] : []),
    ...trackSubjects.map((s) => ({ value: s.id as SubjectFilterValue, label: s.title })),
  ];
  const enabledOptions = allOptions.filter((opt) => {
    if (opt.value === 'all') return true;
    return topicsBySubject(opt.value as SubjectId).length > 0;
  });
  const {
    open, setOpen, closeDropdown, openDropdown, handleTriggerKeyDown, handleOptionKeyDown,
    triggerRef,
  } = useDropdownKeyboard(enabledOptions.length);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, setOpen]);
  const currentLabel = value === 'all'
    ? 'All Subjects'
    : (trackSubjects.find((s) => s.id === value)?.title
        ?? subjects.find((s) => s.id === value)?.title
        ?? 'All Subjects');
  const panelId = useId();
  const valueStyle = value !== 'all' ? getSubjectStyle(value) : null;
  const handleSelect = useCallback((val: SubjectFilterValue) => {
    onChange(val);
    closeDropdown();
  }, [onChange, closeDropdown]);
  let optionIdx = -1;
  return (
    <div className={`relative ${compact ? '' : 'w-full sm:w-auto'}`} ref={ref}>
      {label && (
        <p className="text-slate-500 text-xs font-medium mb-1.5">{label}</p>
      )}
      <button
        ref={triggerRef}
        onClick={() => {
          if (open) closeDropdown();
          else {
            const selectedIdx = enabledOptions.findIndex((o) => o.value === value);
            openDropdown(selectedIdx >= 0 ? selectedIdx : 0);
          }
        }}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={label ?? 'Select subject'}
        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-btn border border-slate-200 bg-white text-slate-800 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors duration-DEFAULT min-h-touch touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 ${open ? 'border-brand-300 ring-2 ring-brand-500/20' : ''} ${compact ? 'min-w-[160px]' : 'w-full sm:w-[240px]'}`}
      >
        <span className="flex items-center gap-2 truncate">
          {value !== 'all' && valueStyle && (
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${valueStyle.dotBg}`} />
          )}
          <span className="truncate">{currentLabel}</span>
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-DEFAULT ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div
          id={panelId}
          role="listbox"
          aria-label={label ?? 'Select subject'}
          className="absolute z-50 mt-1 w-full sm:w-[240px] rounded-btn border border-slate-200 bg-white shadow-card-hover overflow-hidden max-h-72 overflow-y-auto"
        >
          {showAllOption && (() => {
            optionIdx++;
            const idx = optionIdx;
            return (
              <button
                ref={(el) => { optionRefs.current[idx] = el; }}
                onClick={() => handleSelect('all')}
                onKeyDown={(e) => handleOptionKeyDown(e, idx)}
                role="option"
                aria-selected={value === 'all'}
                tabIndex={-1}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-slate-50 transition-colors duration-DEFAULT ${
                  value === 'all' ? 'bg-brand-50 text-brand-700 font-medium' : 'text-slate-700'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 shrink-0" />
                <span className="flex-1">All Subjects</span>
                {value === 'all' && <Check className="w-4 h-4 text-brand-500" />}
              </button>
            );
          })()}
          {trackSubjects.map((subject) => {
            const count = topicsBySubject(subject.id as SubjectId).length;
            const disabled = count === 0;
            const active = value === subject.id;
            if (!disabled) optionIdx++;
            const idx = optionIdx;
            return (
              <button
                key={subject.id}
                ref={(el) => { if (!disabled) optionRefs.current[idx] = el; }}
                onClick={() => { if (!disabled) handleSelect(subject.id as SubjectId); }}
                onKeyDown={disabled ? undefined : (e) => handleOptionKeyDown(e, idx)}
                disabled={disabled}
                aria-selected={active}
                aria-disabled={disabled}
                role="option"
                tabIndex={-1}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors duration-DEFAULT ${
                  active ? 'bg-brand-50 text-brand-700 font-medium' : 'text-slate-700 hover:bg-slate-50'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${getSubjectStyle(subject.id).dotBg}`} />
                <span className="flex-1 truncate">{subject.title}</span>
                {disabled && <span className="text-slate-400 text-xs">(no content)</span>}
                {active && <Check className="w-4 h-4 text-brand-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
