import { ChevronDown, Library, BookA, BookCopy, Type, PenLine, Atom, Lightbulb, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { MathText } from '@/components/MathText';
import { Card } from '@/components/ui';
import type { Topic, ComparisonTable as ComparisonTableType } from '@/types';

export function IdiomGroupsBlock({ groups, expandedGroups, onToggleGroup }: {
  groups: NonNullable<Topic['idiomGroups']>;
  expandedGroups: Set<number>;
  onToggleGroup: (index: number) => void;
}) {
  const validGroups = groups.filter((g) => g.idioms.length > 0);

  return (
    <Card className="p-3.5 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Library className="w-5 h-5 text-slate-600" />
        <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">Idioms by Category</h3>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {validGroups.map((group, gi) => {
          const isExpanded = expandedGroups.has(gi);
          return (
            <div key={gi} className="rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => onToggleGroup(gi)}
                className="w-full flex items-center justify-between gap-3 p-4 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{group.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{group.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full tabular-nums">{group.idioms.length}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100">
                  <div className="space-y-3 mt-3">
                    {group.idioms.map((item, ii) => (
                      <div key={ii} className="pl-3 border-l-2 border-slate-200">
                        <p className="text-slate-900 text-sm font-semibold">&ldquo;{item.idiom}&rdquo;</p>
                        <p className="text-slate-600 text-sm mt-0.5">{item.meaning}</p>
                        <p className="text-slate-500 text-sm italic mt-1 pl-3">e.g. {item.example}</p>
                        {item.origin && (
                          <p className="text-slate-400 text-xs italic mt-1 pl-3">Origin: {item.origin}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
export function SubstitutionGroupsBlock({ groups, expandedGroups, onToggleGroup }: {
  groups: NonNullable<Topic['substitutionGroups']>;
  expandedGroups: Set<number>;
  onToggleGroup: (index: number) => void;
}) {
  const validGroups = groups.filter((g) => g.entries.length > 0);

  return (
    <Card className="p-3.5 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        <BookCopy className="w-5 h-5 text-violet-600" />
        <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">One-Word Substitutions by Category</h3>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {validGroups.map((group, gi) => {
          const isExpanded = expandedGroups.has(gi);
          return (
            <div key={gi} className="rounded-xl border border-violet-200 overflow-hidden">
              <button
                onClick={() => onToggleGroup(gi)}
                className="w-full flex items-center justify-between gap-3 p-4 hover:bg-violet-50/50 transition-colors text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{group.groupTitle}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{group.groupDescription}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full tabular-nums">{group.entries.length}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-violet-100">
                  <div className="space-y-3 mt-3">
                    {group.entries.map((entry, ei) => (
                      <div key={ei} className="pl-3 border-l-2 border-violet-200">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-slate-900 text-sm font-semibold">{entry.term}</p>
                          {entry.difficulty && (
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                              entry.difficulty === 'easy'
                                ? 'bg-emerald-100 text-emerald-700'
                                : entry.difficulty === 'medium'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-red-100 text-red-700'
                            }`}>
                              {entry.difficulty}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm mt-0.5">{entry.definition}</p>
                        {entry.example && (
                          <p className="text-slate-500 text-sm italic mt-1 pl-3">e.g. {entry.example}</p>
                        )}
                        {entry.relatedTerms && entry.relatedTerms.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {entry.relatedTerms.map((rt, ri) => (
                              <span key={ri} className="text-xs font-medium px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 border border-violet-200">{rt}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
// ---- Vocabulary Groups Block (V1) ----
export function VocabularyGroupsBlock({ groups, expandedGroups, onToggleGroup }: {
  groups: NonNullable<Topic['vocabularyGroups']>;
  expandedGroups: Set<number>;
  onToggleGroup: (index: number) => void;
}) {
  const validGroups = groups
    .map((g) => ({ ...g, words: g.words ?? (g as { cards?: typeof g.words }).cards ?? [] }))
    .filter((g) => g.words.length > 0);

  return (
    <Card className="p-3.5 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        <BookA className="w-5 h-5 text-sky-600" />
        <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">Vocabulary by Group</h3>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {validGroups.map((group, gi) => {
          const isExpanded = expandedGroups.has(gi);
          return (
            <div key={gi} className="rounded-xl border border-sky-200 overflow-hidden">
              <button
                onClick={() => onToggleGroup(gi)}
                className="w-full flex items-center justify-between gap-3 p-4 hover:bg-sky-50/50 transition-colors text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{group.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{group.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full tabular-nums">{group.words.length}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-sky-100">
                  <div className="space-y-3 mt-3">
                    {group.words.map((item, ii) => (
                      <div key={ii} className="pl-3 border-l-2 border-sky-200">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-slate-900 text-sm font-semibold">{item.word}</p>
                          {item.difficulty && (
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                              item.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700'
                                : item.difficulty === 'medium' ? 'bg-amber-100 text-amber-700'
                                : 'bg-red-100 text-red-700'
                            }`}>{item.difficulty}</span>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm mt-0.5">{item.definition}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                          {item.synonym && item.synonym !== '—' && (
                            <span className="text-xs text-slate-500"><span className="font-medium text-success-600">Syn:</span> {item.synonym}</span>
                          )}
                          {item.antonym && item.antonym !== '—' && (
                            <span className="text-xs text-slate-500"><span className="font-medium text-danger-600">Ant:</span> {item.antonym}</span>
                          )}
                        </div>
                        {item.example && (
                          <p className="text-slate-500 text-sm italic mt-1 pl-3">e.g. {item.example}</p>
                        )}
                        {item.notes && (
                          <p className="text-slate-400 text-xs mt-1 pl-3">{item.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
// ---- Prefix Groups Block (V2) ----
export function PrefixGroupsBlock({ groups, expandedGroups, onToggleGroup }: {
  groups: NonNullable<Topic['prefixGroups']>;
  expandedGroups: Set<number>;
  onToggleGroup: (index: number) => void;
}) {
  const validGroups = groups.filter((g) => g.prefixes.length > 0);

  return (
    <Card className="p-3.5 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Type className="w-5 h-5 text-teal-600" />
        <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">Prefixes by Category</h3>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {validGroups.map((group, gi) => {
          const isExpanded = expandedGroups.has(gi);
          return (
            <div key={gi} className="rounded-xl border border-teal-200 overflow-hidden">
              <button
                onClick={() => onToggleGroup(gi)}
                className="w-full flex items-center justify-between gap-3 p-4 hover:bg-teal-50/50 transition-colors text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{group.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{group.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full tabular-nums">{group.prefixes.length}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-teal-100">
                  <div className="space-y-3 mt-3">
                    {group.prefixes.map((item, ii) => (
                      <div key={ii} className="pl-3 border-l-2 border-teal-200">
                        <p className="text-slate-900 text-sm font-semibold font-mono">{item.prefix}</p>
                        <p className="text-slate-600 text-sm mt-0.5">{item.meaning}</p>
                        {(item.examples?.length ?? 0) > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {item.examples.map((ex, ei) => (
                              <span key={ei} className="text-xs font-medium px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">{ex}</span>
                            ))}
                          </div>
                        )}
                        {item.notes && (
                          <p className="text-slate-400 text-xs mt-1.5 italic">{item.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
// ---- Suffix Groups Block (V2) ----
export function SuffixGroupsBlock({ groups, expandedGroups, onToggleGroup }: {
  groups: NonNullable<Topic['suffixGroups']>;
  expandedGroups: Set<number>;
  onToggleGroup: (index: number) => void;
}) {
  const validGroups = groups.filter((g) => g.suffixes.length > 0);

  return (
    <Card className="p-3.5 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        <PenLine className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">Suffixes by Category</h3>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {validGroups.map((group, gi) => {
          const isExpanded = expandedGroups.has(gi);
          return (
            <div key={gi} className="rounded-xl border border-indigo-200 overflow-hidden">
              <button
                onClick={() => onToggleGroup(gi)}
                className="w-full flex items-center justify-between gap-3 p-4 hover:bg-indigo-50/50 transition-colors text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{group.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{group.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full tabular-nums">{group.suffixes.length}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-indigo-100">
                  <div className="space-y-3 mt-3">
                    {group.suffixes.map((item, ii) => (
                      <div key={ii} className="pl-3 border-l-2 border-indigo-200">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-slate-900 text-sm font-semibold font-mono">{item.suffix}</p>
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 shrink-0">{item.partOfSpeech}</span>
                        </div>
                        <p className="text-slate-600 text-sm mt-0.5">{item.meaning}</p>
                        {(item.examples?.length ?? 0) > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {item.examples.map((ex, ei) => (
                              <span key={ei} className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">{ex}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
// ---- Root Groups Block (V2) ----
export function RootGroupsBlock({ groups, expandedGroups, onToggleGroup }: {
  groups: NonNullable<Topic['rootGroups']>;
  expandedGroups: Set<number>;
  onToggleGroup: (index: number) => void;
}) {
  const validGroups = groups.filter((g) => g.roots.length > 0);

  return (
    <Card className="p-3.5 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Atom className="w-5 h-5 text-orange-600" />
        <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">Roots by Category</h3>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {validGroups.map((group, gi) => {
          const isExpanded = expandedGroups.has(gi);
          return (
            <div key={gi} className="rounded-xl border border-orange-200 overflow-hidden">
              <button
                onClick={() => onToggleGroup(gi)}
                className="w-full flex items-center justify-between gap-3 p-4 hover:bg-orange-50/50 transition-colors text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{group.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{group.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full tabular-nums">{group.roots.length}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-orange-100">
                  <div className="space-y-3 mt-3">
                    {group.roots.map((item, ii) => (
                      <div key={ii} className="pl-3 border-l-2 border-orange-200">
                        <p className="text-slate-900 text-sm font-semibold font-mono">{item.root}</p>
                        <p className="text-slate-600 text-sm mt-0.5">{item.meaning}</p>
                        {(item.wordFamily?.length ?? 0) > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {item.wordFamily.map((word, wi) => (
                              <span key={wi} className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200">{word}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
// ---- Grammar Rules Block (V3) ----
export function GrammarRulesBlock({ groups, expandedGroups, onToggleGroup }: {
  groups: NonNullable<Topic['grammarRules']>;
  expandedGroups: Set<number>;
  onToggleGroup: (index: number) => void;
}) {
  const validGroups = groups.filter((g) => g.rules.length > 0);

  return (
    <Card className="p-3.5 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-warning-600" />
        <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">Grammar Rules by Category</h3>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {validGroups.map((group, gi) => {
          const isExpanded = expandedGroups.has(gi);
          return (
            <div key={gi} className="rounded-xl border border-amber-200 overflow-hidden">
              <button
                onClick={() => onToggleGroup(gi)}
                className="w-full flex items-center justify-between gap-3 p-4 hover:bg-amber-50/50 transition-colors text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{group.category}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{group.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-warning-600 bg-warning-100 px-2 py-0.5 rounded-full tabular-nums">{group.rules.length}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-amber-100">
                  <div className="space-y-3 mt-3">
                    {group.rules.map((rule, ri) => (
                      <div key={ri} className="pl-3 border-l-2 border-amber-200">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">{rule.ruleNumber}</span>
                          <p className="text-slate-900 text-sm font-semibold">{rule.title}</p>
                        </div>
                        <p className="text-slate-600 text-sm mt-1">{rule.description}</p>
                        <div className="mt-1.5 space-y-1">
                          <div className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-success-500 mt-0.5 shrink-0" />
                            <p className="text-emerald-800 text-xs">{rule.correctExample}</p>
                          </div>
                          {rule.incorrectExample !== '—' && rule.incorrectExample !== '— (context-dependent)' && (
                            <div className="flex items-start gap-1.5">
                              <XCircle className="w-3.5 h-3.5 text-danger-500 mt-0.5 shrink-0" />
                              <p className="text-rose-800 text-xs line-through">{rule.incorrectExample}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ---- Topic subtopics (quant, env, etc.) ----
export interface QuantSubtopic {
  id: string;
  title: string;
  summary: string;
  explanation: string;
  examples: Array<{ problem: string; solution: string; answer?: string }>;
  shortcuts: string[];
  traps: string[];
}

export interface QuantFormulaEntry {
  name: string;
  expression: string;
  note?: string;
}

export function SubtopicsBlock({ subtopics, expandedGroups, onToggleGroup }: {
  subtopics: QuantSubtopic[];
  expandedGroups: Set<number>;
  onToggleGroup: (index: number) => void;
}) {
  return (
    <Card className="p-3.5 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap className="w-5 h-5 text-warning-600" />
        <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">Subtopics</h3>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {subtopics.map((sub, si) => {
          const isExpanded = expandedGroups.has(si);
          return (
            <div key={si} className="rounded-xl border border-amber-200 overflow-hidden">
              <button
                onClick={() => onToggleGroup(si)}
                className="w-full flex items-center justify-between gap-3 p-4 hover:bg-amber-50/50 transition-colors text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{sub.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{sub.summary}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {(sub.examples?.length ?? 0) > 0 && (
                    <span className="text-xs font-medium text-warning-600 bg-warning-100 px-2 py-0.5 rounded-full tabular-nums" title="Worked examples">{sub.examples.length}</span>
                  )}
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-amber-100">
                  <div className="space-y-3 mt-3">
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{sub.explanation}</p>
                    {(sub.examples?.length ?? 0) > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Worked Examples</p>
                        {sub.examples.map((ex, ei) => (
                          <div key={ei} className="pl-3 border-l-2 border-emerald-300">
                            <p className="text-slate-800 text-sm font-medium"><MathText text={ex.problem} /></p>
                            <p className="text-slate-600 text-sm mt-0.5"><MathText text={ex.solution} /></p>
                            {ex.answer && <p className="text-emerald-700 text-sm font-semibold mt-0.5">Answer: <MathText text={ex.answer} /></p>}
                          </div>
                        ))}
                      </div>
                    )}
                    {(sub.shortcuts?.length ?? 0) > 0 && (
                      <div className="rounded-lg bg-sky-50/60 p-3">
                        <div className="flex items-center gap-1.5 mb-1.5"><Lightbulb className="w-3.5 h-3.5 text-sky-600" /><span className="text-xs font-semibold text-sky-700 uppercase tracking-wide">Key anchors</span></div>
                        <ul className="space-y-1">{sub.shortcuts.map((s, si2) => <li key={si2} className="flex items-start gap-2 text-slate-700 text-sm leading-relaxed"><span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" /><MathText text={s} /></li>)}</ul>
                      </div>
                    )}
                    {(sub.traps?.length ?? 0) > 0 && (
                      <div className="rounded-lg bg-rose-50/60 p-3">
                        <div className="flex items-center gap-1.5 mb-1.5"><AlertTriangle className="w-3.5 h-3.5 text-danger-600" /><span className="text-xs font-semibold text-danger-700 uppercase tracking-wide">Common pitfalls</span></div>
                        <ul className="space-y-1">{sub.traps.map((t, ti) => <li key={ti} className="flex items-start gap-2 text-slate-800 text-sm leading-relaxed"><span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" /><MathText text={t} /></li>)}</ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ---- Quant Formulas Block ----
export function QuantFormulasBlock({ formulas }: { formulas: QuantFormulaEntry[] }) {
  return (
    <Card className="p-5 border border-slate-200 bg-white">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <Calculator className="w-4 h-4" />
        </div>
        <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">Key Formulas</h3>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {formulas.map((f, fi) => (
          <div key={fi} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
            <p className="text-slate-900 text-sm font-semibold mb-2">{f.name}</p>
            <div className="formula-display text-slate-900 text-lg text-center py-3 px-2 bg-slate-50 border border-slate-200 rounded-xl overflow-x-auto">
              <MathText text={`$${f.expression}$`} />
            </div>
            {(f.note ?? (f as { notes?: string }).notes) && (
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">{f.note ?? (f as { notes?: string }).notes}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ComparisonTableBlock({ table }: { table: ComparisonTableType }) {
  const rows = table.rows ?? [];
  const isMatrixRows = rows.length > 0 && !Array.isArray(rows[0]);
  if (isMatrixRows) {
    const matrixRows = rows as Array<Record<string, string>>;
    const headers = Object.keys(matrixRows[0] || {});
    return (
      <Card className="p-5 overflow-hidden">
        {table.title && <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide mb-3">{table.title}</h3>}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {headers.map((h, i) => (
                  <th key={i} className={`text-left py-2 px-3 font-semibold text-slate-900 ${i === 0 ? 'min-w-[120px]' : ''}`}><MathText text={h} /></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrixRows.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0">
                  {headers.map((h, j) => (
                    <td key={j} className={`py-2.5 px-3 ${j === 0 ? 'font-medium text-slate-900' : 'text-slate-600'}`}><MathText text={row[h] ?? ''} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  }
  const arrayRows = rows as string[][];
  return (
    <Card className="p-5 overflow-hidden">
      {table.title && <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide mb-3">{table.title}</h3>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {table.headers && (
            <thead>
              <tr className="border-b border-slate-200">
                {table.headers.map((h, i) => (
                  <th key={i} className="text-left py-2 px-3 font-semibold text-slate-900"><MathText text={h} /></th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {arrayRows.map((row, i) => (
              <tr key={i} className="border-b border-slate-100 last:border-0">
                {row.map((cell, j) => (
                  <td key={j} className={`py-2.5 px-3 ${j === 0 ? 'font-medium text-slate-900' : 'text-slate-600'}`}><MathText text={cell} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
