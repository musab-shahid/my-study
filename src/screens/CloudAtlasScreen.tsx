import { useState, useCallback } from 'react';
import { Cloud, ChevronRight } from 'lucide-react';
import { clouds } from '@/data/clouds';
import { PageContainer, Card, ScreenHeader, Dialog } from '@/components/ui';
import { BackButton, Breadcrumbs } from '@/components/layout/Breadcrumbs';
import type { CloudEntry } from '@/types';

const LEVELS: CloudEntry['level'][] = ['High', 'Middle', 'Low', 'Vertical'];

const levelColors: Record<CloudEntry['level'], string> = {
  High: 'bg-brand-100 text-brand-700 border-brand-200',
  Middle: 'bg-brand-100 text-brand-700 border-brand-200',
  Low: 'bg-slate-100 text-ink border-slate-200',
  Vertical: 'bg-warning-100 text-warning-700 border-warning-200',
};

export function CloudAtlasScreen() {
  const [selected, setSelected] = useState<CloudEntry | null>(null);

  const closeCloud = useCallback(() => setSelected(null), []);

  return (
    <PageContainer width="analytics">
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
                <Cloud className="w-5 h-5 text-muted" />
                <h2 className="font-semibold text-ink text-lg">{level} Clouds</h2>
                <span className="text-muted text-sm">({levelClouds.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {levelClouds.map((cloud) => (
                  <Card key={cloud.name} elevation="interactive" className="p-4">
                    <button
                      type="button"
                      onClick={() => setSelected(cloud)}
                      className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 rounded-btn"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-ink">{cloud.name}</p>
                        <ChevronRight className="w-4 h-4 text-muted" />
                      </div>
                      <p className="text-muted text-xs">{cloud.altitude}</p>
                    </button>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog
        open={Boolean(selected)}
        onClose={closeCloud}
        title={selected?.name ?? ''}
        size="sm"
        closeLabel="Close cloud details"
      >
        {selected && (
          <div className="space-y-4">
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${levelColors[selected.level]}`}>
              {selected.level}
            </span>
            <div>
              <p className="text-ink-muted text-xs font-medium uppercase tracking-wide mb-1">Altitude</p>
              <p className="text-ink-muted text-sm">{selected.altitude}</p>
            </div>
            <div>
              <p className="text-ink-muted text-xs font-medium uppercase tracking-wide mb-1">Composition</p>
              <p className="text-ink-muted text-sm">{selected.composition}</p>
            </div>
            <div>
              <p className="text-ink-muted text-xs font-medium uppercase tracking-wide mb-1">Appearance</p>
              <p className="text-ink-muted text-sm leading-relaxed">{selected.appearance}</p>
            </div>
          </div>
        )}
      </Dialog>
    </PageContainer>
  );
}
