import { useState } from 'react';
import { Card } from '@/components/ui';
import { MathText } from '@/components/MathText';
import { ChevronDown, ChevronRight, Calculator } from 'lucide-react';
import type { ComparisonTable, Topic } from '@/types';

export type QuantFormulaEntry = NonNullable<Topic['quantFormulas']>[number];

interface BlockProps {
  expandedGroups: Set<number>;
  onToggleGroup: (idx: number) => void;
}

function GroupWrapper({
  title,
  idx,
  expandedGroups,
  onToggleGroup,
  children,
  description,
}: {
  title: string;
  idx: number;
  expandedGroups: Set<number>;
  onToggleGroup: (idx: number) => void;
  children: React.ReactNode;
  description?: string;
}) {
  const isExpanded = expandedGroups.has(idx);
  return (
    <Card className="p-3.5 sm:p-5 border-l-4 border-l-brand-400 bg-brand-50/30">
      <button
        onClick={() => onToggleGroup(idx)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
          {description && <p className="text-slate-500 text-xs mt-0.5">{description}</p>}
        </div>
        {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>
      {isExpanded && <div className="mt-3">{children}</div>}
    </Card>
  );
}

export function IdiomGroupsBlock({ groups, expandedGroups, onToggleGroup }: { groups: NonNullable<Topic['idiomGroups']> } & BlockProps) {
  return (
    <section>
      <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-3">Idioms</h3>
      <div className="space-y-2">
        {groups.map((group, idx) => (
          <GroupWrapper key={idx} title={group.title} idx={idx} description={group.description} expandedGroups={expandedGroups} onToggleGroup={onToggleGroup}>
            <div className="space-y-2">
              {group.idioms.map((idiom, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-3 bg-white">
                  <p className="font-medium text-slate-900 text-sm">{idiom.idiom}</p>
                  <p className="text-slate-600 text-sm mt-0.5">{idiom.meaning}</p>
                  <p className="text-slate-500 text-xs italic mt-1">"{idiom.example}"</p>
                </div>
              ))}
            </div>
          </GroupWrapper>
        ))}
      </div>
    </section>
  );
}

export function SubstitutionGroupsBlock({ groups, expandedGroups, onToggleGroup }: { groups: NonNullable<Topic['substitutionGroups']> } & BlockProps) {
  return (
    <section>
      <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-3">One-Word Substitutions</h3>
      <div className="space-y-2">
        {groups.map((group, idx) => (
          <GroupWrapper key={idx} title={group.groupTitle} idx={idx} description={group.groupDescription} expandedGroups={expandedGroups} onToggleGroup={onToggleGroup}>
            <div className="space-y-2">
              {group.entries.map((entry, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-3 bg-white">
                  <p className="font-medium text-slate-900 text-sm">{entry.term}</p>
                  <p className="text-slate-600 text-sm mt-0.5">{entry.definition}</p>
                  {entry.example && <p className="text-slate-500 text-xs italic mt-1">"{entry.example}"</p>}
                </div>
              ))}
            </div>
          </GroupWrapper>
        ))}
      </div>
    </section>
  );
}

export function VocabularyGroupsBlock({ groups, expandedGroups, onToggleGroup }: { groups: NonNullable<Topic['vocabularyGroups']> } & BlockProps) {
  return (
    <section>
      <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-3">Vocabulary</h3>
      <div className="space-y-2">
        {groups.map((group, idx) => (
          <GroupWrapper key={idx} title={group.title} idx={idx} description={group.description} expandedGroups={expandedGroups} onToggleGroup={onToggleGroup}>
            <div className="space-y-2">
              {group.words.map((word, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-3 bg-white">
                  <p className="font-medium text-slate-900 text-sm">{word.word}</p>
                  <p className="text-slate-600 text-sm mt-0.5">{word.definition}</p>
                  {word.synonym && <p className="text-slate-500 text-xs mt-1">Synonym: {word.synonym}</p>}
                  {word.antonym && <p className="text-slate-500 text-xs">Antonym: {word.antonym}</p>}
                  {word.example && <p className="text-slate-500 text-xs italic mt-1">"{word.example}"</p>}
                </div>
              ))}
            </div>
          </GroupWrapper>
        ))}
      </div>
    </section>
  );
}

export function PrefixGroupsBlock({ groups, expandedGroups, onToggleGroup }: { groups: NonNullable<Topic['prefixGroups']> } & BlockProps) {
  return (
    <section>
      <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-3">Prefixes</h3>
      <div className="space-y-2">
        {groups.map((group, idx) => (
          <GroupWrapper key={idx} title={group.title} idx={idx} description={group.description} expandedGroups={expandedGroups} onToggleGroup={onToggleGroup}>
            <div className="space-y-2">
              {group.prefixes.map((prefix, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-3 bg-white">
                  <p className="font-medium text-slate-900 text-sm">{prefix.prefix}</p>
                  <p className="text-slate-600 text-sm mt-0.5">{prefix.meaning}</p>
                  <p className="text-slate-500 text-xs mt-1">Examples: {prefix.examples.join(', ')}</p>
                </div>
              ))}
            </div>
          </GroupWrapper>
        ))}
      </div>
    </section>
  );
}

export function SuffixGroupsBlock({ groups, expandedGroups, onToggleGroup }: { groups: NonNullable<Topic['suffixGroups']> } & BlockProps) {
  return (
    <section>
      <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-3">Suffixes</h3>
      <div className="space-y-2">
        {groups.map((group, idx) => (
          <GroupWrapper key={idx} title={group.title} idx={idx} description={group.description} expandedGroups={expandedGroups} onToggleGroup={onToggleGroup}>
            <div className="space-y-2">
              {group.suffixes.map((suffix, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-3 bg-white">
                  <p className="font-medium text-slate-900 text-sm">{suffix.suffix}</p>
                  <p className="text-slate-600 text-sm mt-0.5">{suffix.meaning}</p>
                  <p className="text-slate-500 text-xs mt-1">Examples: {suffix.examples.join(', ')}</p>
                </div>
              ))}
            </div>
          </GroupWrapper>
        ))}
      </div>
    </section>
  );
}

export function RootGroupsBlock({ groups, expandedGroups, onToggleGroup }: { groups: NonNullable<Topic['rootGroups']> } & BlockProps) {
  return (
    <section>
      <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-3">Roots</h3>
      <div className="space-y-2">
        {groups.map((group, idx) => (
          <GroupWrapper key={idx} title={group.title} idx={idx} description={group.description} expandedGroups={expandedGroups} onToggleGroup={onToggleGroup}>
            <div className="space-y-2">
              {group.roots.map((root, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-3 bg-white">
                  <p className="font-medium text-slate-900 text-sm">{root.root}</p>
                  <p className="text-slate-600 text-sm mt-0.5">{root.meaning}</p>
                  <p className="text-slate-500 text-xs mt-1">Word family: {root.wordFamily.join(', ')}</p>
                </div>
              ))}
            </div>
          </GroupWrapper>
        ))}
      </div>
    </section>
  );
}

export function GrammarRulesBlock({ groups, expandedGroups, onToggleGroup }: { groups: NonNullable<Topic['grammarRules']> } & BlockProps) {
  return (
    <section>
      <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-3">Grammar Rules</h3>
      <div className="space-y-2">
        {groups.map((group, idx) => (
          <GroupWrapper key={idx} title={group.category} idx={idx} description={group.description} expandedGroups={expandedGroups} onToggleGroup={onToggleGroup}>
            <div className="space-y-2">
              {group.rules.map((rule, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-3 bg-white">
                  <p className="font-medium text-slate-900 text-sm">{rule.ruleNumber}. {rule.title}</p>
                  <p className="text-slate-600 text-sm mt-0.5">{rule.description}</p>
                  <p className="text-success-700 text-xs mt-1">Correct: {rule.correctExample}</p>
                  <p className="text-danger-600 text-xs">Incorrect: {rule.incorrectExample}</p>
                </div>
              ))}
            </div>
          </GroupWrapper>
        ))}
      </div>
    </section>
  );
}

export function SubtopicsBlock({ subtopics, expandedGroups, onToggleGroup }: { subtopics: NonNullable<Topic['subtopics']> } & BlockProps) {
  return (
    <section>
      <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-3">Subtopics</h3>
      <div className="space-y-2">
        {subtopics.map((sub, idx) => (
          <GroupWrapper key={idx} title={sub.title} idx={idx} expandedGroups={expandedGroups} onToggleGroup={onToggleGroup}>
            <p className="text-slate-600 text-sm mb-2">{sub.summary}</p>
            <MathText text={sub.explanation} />
            {sub.examples.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Examples</p>
                {sub.examples.map((ex, i) => (
                  <div key={i} className="text-sm text-slate-700">
                    <p>{ex.problem}</p>
                    <p className="text-slate-500 text-xs">Solution: {ex.solution}</p>
                    {ex.answer && <p className="text-success-700 text-xs">Answer: {ex.answer}</p>}
                  </div>
                ))}
              </div>
            )}
            {sub.shortcuts.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Shortcuts</p>
                <ul className="space-y-0.5">{sub.shortcuts.map((s, i) => <li key={i} className="text-slate-700 text-sm">{s}</li>)}</ul>
              </div>
            )}
            {sub.traps.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Traps</p>
                <ul className="space-y-0.5">{sub.traps.map((t, i) => <li key={i} className="text-slate-700 text-sm">{t}</li>)}</ul>
              </div>
            )}
          </GroupWrapper>
        ))}
      </div>
    </section>
  );
}

export function QuantFormulasBlock({ formulas }: { formulas: QuantFormulaEntry[] }) {
  return (
    <Card className="p-3.5 sm:p-5 border-l-4 border-l-sky-500 bg-sky-50/40">
      <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide mb-3 flex items-center gap-1.5">
        <Calculator className="w-4 h-4 text-sky-600" />
        Quantitative Formulas
      </h3>
      <div className="space-y-3">
        {formulas.map((f, i) => (
          <div key={i}>
            <p className="text-slate-900 text-sm font-medium">{f.name}</p>
            <div className="formula-display text-slate-900 text-base py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl overflow-x-auto mt-1">
              <MathText text={`$$${f.expression}$$`} />
            </div>
            {(f.note ?? f.notes) && <p className="text-slate-500 text-xs mt-1">{f.note ?? f.notes}</p>}
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ComparisonTableBlock({ table }: { table: ComparisonTable }) {
  const headers = table.headers ?? (table.rows.length > 0 && !Array.isArray(table.rows[0]) ? Object.keys(table.rows[0] as Record<string, string>) : []);
  return (
    <Card className="p-3.5 sm:p-5">
      {table.title && <h3 className="font-semibold text-slate-900 text-sm mb-3">{table.title}</h3>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {headers.length > 0 && (
            <thead>
              <tr className="border-b border-slate-200">
                {headers.map((h, i) => <th key={i} className="text-left py-2 px-3 text-slate-500 font-medium">{h}</th>)}
              </tr>
            </thead>
          )}
          <tbody>
            {table.rows.map((row, i) => {
              const cells = Array.isArray(row) ? row : Object.values(row);
              return (
                <tr key={i} className="border-b border-slate-100 last:border-0">
                  {cells.map((cell, j) => <td key={j} className="py-2 px-3 text-slate-700"><MathText text={cell} /></td>)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
