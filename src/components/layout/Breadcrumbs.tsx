import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useRouter } from '@/router';
import { breadcrumbForRoute } from '@/router/paths';
import { IconButton, Button } from '@/components/ui';

export function Breadcrumbs({ showCurrent = true }: { showCurrent?: boolean } = {}) {
  const { currentRoute, navigate } = useRouter();
  const items = Array.isArray(currentRoute.breadcrumb) ? currentRoute.breadcrumb : [];
  const displayItems = showCurrent ? items : items.slice(0, -1);
  if (showCurrent ? displayItems.length <= 1 : displayItems.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-caption sm:text-body overflow-x-auto scrollbar-hide">
      {displayItems.map((item, i) => {
        const isCurrent = showCurrent && i === displayItems.length - 1;
        return (
          <div key={i} className="flex items-center gap-1 shrink-0">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" aria-hidden />}
            {isCurrent ? (
              <span className="text-slate-800 font-semibold truncate max-w-[160px] sm:max-w-[200px]" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => navigate({ ...item.route, breadcrumb: breadcrumbForRoute(item.route) })}
                className="text-slate-500 hover:text-brand-600 transition-colors duration-DEFAULT truncate max-w-[120px] sm:max-w-[160px] rounded px-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-1"
              >
                {item.label}
              </button>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export function BackButton({ fallbackToHome: _fallbackToHome = false }: { fallbackToHome?: boolean } = {}) {
  const { back, canGoBack, navigate } = useRouter();
  return (
    <IconButton
      label="Go back"
      onClick={() => {
        if (canGoBack) back();
        else navigate({ screen: 'home', parent: null });
      }}
      className="shrink-0"
    >
      <ChevronLeft className="w-5 h-5" aria-hidden />
    </IconButton>
  );
}

export function HomeButton() {
  const { navigate } = useRouter();
  return (
    <Button
      variant="ghost"
      size="md"
      onClick={() => navigate({ screen: 'home', parent: null })}
      className="shrink-0"
      aria-label="Go to home"
    >
      <Home className="w-4 h-4" aria-hidden />
      Home
    </Button>
  );
}
