import { Search, Settings, Home } from 'lucide-react';
import { useRouter, type ScreenName } from '@/router';
import { BackButton, Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { IconButton } from '@/components/ui';

export function Header({ title, subtitle, screen }: { title?: string; subtitle?: string; screen?: ScreenName }) {
  const { navigate } = useRouter();
  const showSearch = screen !== 'search';
  const showSettings = screen !== 'settings';
  const showHome = screen !== 'home';

  return (
    <header className="sticky top-0 z-30 glass-surface border-b border-slate-200/80">
      <div className="flex items-center justify-between gap-2 px-3 sm:px-6 py-2 sm:py-3 min-h-[56px]">
        <div className="flex items-center gap-1 min-w-0 flex-1">
          <BackButton />
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-slate-900 text-base sm:text-lg leading-tight truncate tracking-tight">
              {title || 'ExamPrep Hub'}
            </h2>
            <div className="flex items-center gap-2 mt-0.5 min-w-0">
              {subtitle && (
                <p className="text-slate-500 text-xs sm:text-sm truncate hidden sm:block">{subtitle}</p>
              )}
              <div className="hidden sm:block min-w-0">
                <Breadcrumbs />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center shrink-0 -mr-1">
          {showHome && (
            <IconButton label="Home" onClick={() => navigate({ screen: 'home', parent: null })}>
              <Home className="w-5 h-5" />
            </IconButton>
          )}
          {showSearch && (
            <IconButton label="Search" onClick={() => navigate({ screen: 'search', parent: null })}>
              <Search className="w-5 h-5" />
            </IconButton>
          )}
          {showSettings && (
            <IconButton label="Settings" onClick={() => navigate({ screen: 'settings', parent: null })}>
              <Settings className="w-5 h-5" />
            </IconButton>
          )}
        </div>
      </div>
      {/* Mobile breadcrumbs row */}
      <div className="px-4 sm:px-6 pb-2 sm:hidden">
        <Breadcrumbs />
      </div>
    </header>
  );
}
