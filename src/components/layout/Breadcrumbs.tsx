import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useRouter } from '@/router';

export function Breadcrumbs() {
  const { currentRoute, navigate } = useRouter();
  const items = Array.isArray(currentRoute.breadcrumb) ? currentRoute.breadcrumb : [];
  if (items.length <= 1) return null;
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs sm:text-sm overflow-x-auto scrollbar-hide">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <div key={i} className="flex items-center gap-1 shrink-0">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" aria-hidden />}
            {isLast ? (
              <span className="text-slate-800 font-semibold truncate max-w-[160px] sm:max-w-[200px]" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => navigate({ ...item.route, parent: null })}
                className="text-slate-500 hover:text-brand-600 transition-colors duration-DEFAULT truncate max-w-[120px] sm:max-w-[160px] rounded px-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
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

export function BackButton({ fallbackToHome = false }: { fallbackToHome?: boolean } = {}) {
  const { back, canGoBack, navigate } = useRouter();
  if (!canGoBack && !fallbackToHome) return null;
  return (
    <button
      type="button"
      onClick={() => {
        if (canGoBack) back();
        else navigate({ screen: 'home', parent: null });
      }}
      className="flex items-center justify-center w-11 h-11 rounded-btn text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 transition-colors duration-DEFAULT shrink-0 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
      aria-label="Go back"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
}

export function HomeButton() {
  const { navigate } = useRouter();
  return (
    <button
      type="button"
      onClick={() => navigate({ screen: 'home', parent: null })}
      className="flex items-center gap-1.5 px-3 h-11 rounded-btn text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 transition-colors duration-DEFAULT shrink-0 text-sm font-medium touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
      aria-label="Go to home"
    >
      <Home className="w-4 h-4" />
      Home
    </button>
  );
}
