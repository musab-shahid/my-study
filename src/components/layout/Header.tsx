import { BackButton, Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AppBrand } from '@/components/ui';

export function Header({
  context,
  desktopVisible = true,
  showMobileMeta = false,
}: {
  context?: string;
  desktopVisible?: boolean;
  showMobileMeta?: boolean;
}) {
  return (
    <header
      className={`sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur ${desktopVisible ? '' : 'lg:hidden'}`}
    >
      <div className="flex min-h-[60px] items-center gap-3 px-page-x sm:px-page-x-sm lg:px-page-x-lg">
        <BackButton />
        <div className="min-w-0 lg:hidden">
          <AppBrand compact />
        </div>
        <div className="hidden min-w-0 flex-1 lg:block">
          <Breadcrumbs showCurrent={false} />
        </div>
        {context && (
          <p title={context} className="ml-auto hidden max-w-[45%] truncate text-caption text-ink-muted sm:block">
            {context}
          </p>
        )}
      </div>
      {showMobileMeta && (
        <div className="flex flex-col gap-1 px-page-x pb-2 sm:hidden">
          {context && <p title={context} className="truncate text-caption text-ink-muted">{context}</p>}
          <Breadcrumbs showCurrent={false} />
        </div>
      )}
    </header>
  );
}
