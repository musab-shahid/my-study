import { useEffect, useState } from 'react';
import type { CurriculumRegistry } from '@/types/curriculum';

type CurriculumLoadState =
  | { status: 'loading' }
  | { status: 'ready'; curriculum: CurriculumRegistry }
  | { status: 'error' };

/** Load the substantial canonical curriculum only when a CGEI screen needs it. */
export function useCgeiCurriculum(): CurriculumLoadState {
  const [state, setState] = useState<CurriculumLoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    import('@/data/cgei/curriculum')
      .then(({ cgeiCurriculum }) => {
        if (!cancelled) setState({ status: 'ready', curriculum: cgeiCurriculum });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
