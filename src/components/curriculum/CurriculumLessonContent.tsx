import { Card } from '@/components/ui';
import { MathText } from '@/components/MathText';
import type { CurriculumContentBlock, CurriculumLesson } from '@/types/curriculum';

export function CurriculumLessonContent({ lesson }: { lesson: CurriculumLesson }) {
  const toneClasses = {
    info: 'border-sky-200 bg-sky-50/70',
    warning: 'border-amber-200 bg-amber-50/70',
    success: 'border-success-200 bg-success-50/70',
    critical: 'border-danger-200 bg-danger-50/70',
  } as const;

  const renderBlock = (block: CurriculumContentBlock) => {
    const heading = block.title ? <h2 className="font-semibold text-slate-900 text-base sm:text-lg mb-2">{block.title}</h2> : null;
    switch (block.kind) {
      case 'prose':
        return (
          <section key={block.id} className="rounded-xl">
            {heading}
            {block.body && <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line"><MathText text={block.body} /></div>}
          </section>
        );
      case 'key-points':
      case 'checklist':
        return (
          <section key={block.id} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
            {heading}
            <ul className="space-y-2">
              {(block.items ?? []).map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 text-slate-700 text-sm sm:text-base leading-relaxed">
                  <span className={block.kind === 'checklist' ? 'mt-0.5 rounded border border-slate-300 w-4 h-4 shrink-0' : 'w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0'} />
                  <span><MathText text={item} /></span>
                </li>
              ))}
            </ul>
          </section>
        );
      case 'equation':
        return (
          <Card key={block.id} className="p-4 sm:p-5 border border-slate-200 bg-white overflow-hidden">
            {heading}
            {block.expression && <div className="formula-display text-slate-900 text-lg text-center py-4 px-3 bg-slate-50 border border-slate-200 rounded-xl overflow-x-auto"><MathText text={block.expression.includes('$') ? block.expression : `$${block.expression}$`} /></div>}
            {block.body && <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line mt-3"><MathText text={block.body} /></div>}
          </Card>
        );
      case 'worked-example':
        return (
          <Card key={block.id} className="p-4 sm:p-5 border-l-4 border-l-success-500 bg-success-50/40">
            {heading}
            {block.body && <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line"><MathText text={block.body} /></div>}
          </Card>
        );
      case 'table':
        return (
          <section key={block.id} className="rounded-xl border border-slate-200 bg-white p-4 overflow-x-auto">
            {heading}
            <table className="w-full text-sm border-collapse">
              {block.headers?.length ? <thead><tr>{block.headers.map((header, index) => <th key={index} className="text-left font-semibold text-slate-700 bg-slate-50 border border-slate-200 p-2">{header}</th>)}</tr></thead> : null}
              <tbody>{(block.rows ?? []).map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex} className="align-top border border-slate-200 p-2 text-slate-700"><MathText text={cell} /></td>)}</tr>)}</tbody>
            </table>
          </section>
        );
      case 'code':
        return (
          <section key={block.id} className="rounded-xl border border-slate-200 overflow-hidden">
            {heading}
            {block.language && <p className="px-3 py-2 text-xs font-semibold text-slate-500 bg-slate-50 border-b border-slate-200">{block.language}</p>}
            <pre className="overflow-x-auto p-4 text-sm leading-relaxed bg-slate-950 text-slate-50"><code>{block.code ?? block.body ?? ''}</code></pre>
          </section>
        );
      case 'callout':
      case 'reflection':
        return (
          <aside key={block.id} className={`rounded-xl border p-4 ${toneClasses[block.tone ?? (block.kind === 'reflection' ? 'info' : 'warning')]}`}>
            {heading}
            {block.body && <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line"><MathText text={block.body} /></p>}
            {block.items?.length ? <ul className="mt-2 space-y-1 list-disc pl-5 text-sm text-slate-700">{block.items.map((item, index) => <li key={index}><MathText text={item} /></li>)}</ul> : null}
          </aside>
        );
      case 'figure':
        return (
          <figure key={block.id} className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
            <p className="text-sm text-slate-600">{block.body ?? 'Figure or visual resource to be added.'}</p>
            {block.caption && <figcaption className="text-xs text-slate-500 mt-2">{block.caption}</figcaption>}
          </figure>
        );
      default:
        return null;
    }
  };

  return <div className="space-y-6 sm:space-y-8">{lesson.content.map(renderBlock)}</div>;
}
