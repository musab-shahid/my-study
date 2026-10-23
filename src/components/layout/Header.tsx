import type { ScreenName } from '@/router';
import { BackButton, Breadcrumbs } from '@/components/layout/Breadcrumbs';

export function Header({ title, subtitle }: { title?: string; subtitle?: string }) {

  return (
    <header className="sticky top-0 z-30 glass-surface border-b border-slate-200/80 supports-[backdrop-filter]:bg-white/85">
      <div className="flex items-center justify-between gap-2 px-3 sm:px-6 py-2 sm:py-3 min-h-[60px]">
        <div className="flex items-center gap-1 min-w-0 flex-1">
          <BackButton />
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-slate-900 text-base sm:text-lg leading-tight truncate tracking-tight">
              {title || 'ExamPrep Hub'}
            </h2>
            <div className="flex items-center gap-2 mt-0.5 min-w-0">
              {subtitle && (
                <p className="text-slate-500 text-[11px] sm:text-sm truncate">{subtitle}</p>
              )}
              <div className="hidden sm:block min-w-0">
                <Breadcrumbs />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile breadcrumbs row */}
      <div className="px-4 sm:px-6 pb-2 sm:hidden" aria-label="Page breadcrumbs">
        <Breadcrumbs />
      </div>
    </header>
  );
}
