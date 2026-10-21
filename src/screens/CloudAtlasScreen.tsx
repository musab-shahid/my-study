import { useState, useRef, useCallback } from 'react';
import { Cloud, ChevronRight, X } from 'lucide-react';
import { clouds } from '@/data/clouds';
import { PageContainer, Card, ScreenHeader } from '@/components/ui';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { BackButton, Breadcrumbs } from '@/components/layout/Breadcrumbs';
import type { CloudEntry } from '@/types';

const LEVELS: CloudEntry['level'][] = ['High', 'Middle', 'Low', 'Vertical'];

const levelColors: Record<CloudEntry['level'], string> = {
  High: 'bg-sky-100 text-sky-700 border-sky-200',
  Middle: 'bg-brand-100 text-brand-700 border-brand-200',
  Low: 'bg-slate-100 text-slate-700 border-slate-200',
  Vertical: 'bg-amber-100 text-amber-700 border-amber-200',
};

export function CloudAtlasScreen() {
  const [selected, setSelected] = useState<CloudEntry | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const openCloud = useCallback((cloud: CloudEntry, el: HTMLElement | null) => {
    openerRef.current = el;
    setSelected(cloud);
  }, []);

  const closeCloud = useCallback(() => {
    setSelected(null);
    // Focus restore is handled by useFocusTrap; also re-focus stored opener if still mounted
    requestAnimationFrame(() => openerRef.current?.focus());
  }, []);

  return (
    <PageContainer className="max-w-[72rem]">
      <div className="flex items-center gap-2 mb-4"><BackButton /><Breadcrumbs /></div>
      <ScreenHeader
        title="Cloud Atlas"
        subtitle="Explore 10 cloud genera grouped by altitude level."
      />

      <div className="space-y-8">
        {LEVELS.map((level) => {
          const levelClouds = clouds.filter((c) => c.level === level);
          return (
            <div key={level}>
              <div className="flex items-center gap-2 mb-3">
                <Cloud className="w-5 h-5 text-slate-700" />
                <h2 className="font-semibold text-slate-900 text-lg">{level} Clouds</h2>
                <span className="text-slate-400 text-sm">({levelClouds.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {levelClouds.map((cloud) => (
                  <Card key={cloud.name} elevation="interactive" className="p-4">
                    <button
                      type="button"
                      onClick={(e) => openCloud(cloud, e.currentTarget)}
                      className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-btn"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-slate-900">{cloud.name}</p>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                      <p className="text-slate-500 text-xs">{cloud.altitude}</p>
                    </button>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <CloudModal cloud={selected} levelColors={levelColors} onClose={closeCloud} />
      )}
    </PageContainer>
  );
}

function CloudModal({ cloud, levelColors, onClose }: {
  cloud: CloudEntry;
  levelColors: Record<CloudEntry['level'], string>;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useFocusTrap(modalRef, true, { initialFocusRef: closeButtonRef, onEscape: onClose });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <Card className="max-w-md w-full p-6" >
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cloud-modal-title"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 id="cloud-modal-title" className="text-xl font-bold text-slate-900">{cloud.name}</h3>
              <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium border ${levelColors[cloud.level]}`}>
                {cloud.level}
              </span>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 rounded-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Altitude</p>
              <p className="text-slate-700 text-sm">{cloud.altitude}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Composition</p>
              <p className="text-slate-700 text-sm">{cloud.composition}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Appearance</p>
              <p className="text-slate-700 text-sm leading-relaxed">{cloud.appearance}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
