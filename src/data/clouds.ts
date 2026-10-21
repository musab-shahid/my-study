import type { CloudEntry } from '@/types';

export const clouds: CloudEntry[] = [
  // High
  { name: 'Cirrus', level: 'High', altitude: 'Above 6,000 m', composition: 'Ice crystals', appearance: 'Delicate, fibrous wisps or filaments, often described as "mares\' tails.' },
  { name: 'Cirrocumulus', level: 'High', altitude: 'Above 6,000 m', composition: 'Ice crystals', appearance: 'Small, white, shadowless ripples or patches arranged in rows, producing a "mackerel sky."' },
  { name: 'Cirrostratus', level: 'High', altitude: 'Above 6,000 m', composition: 'Ice crystals', appearance: 'Thin, transparent whitish veil that often produces halos around the sun or moon.' },
  // Middle
  { name: 'Altocumulus', level: 'Middle', altitude: '2,000–6,000 m', composition: 'Water droplets and ice crystals', appearance: 'Patches or rolls of flattened masses, often with shading and a wave-like pattern.' },
  { name: 'Altostratus', level: 'Middle', altitude: '2,000–6,000 m', composition: 'Water droplets and ice crystals', appearance: 'Gray or blue-gray sheet covering the sky, giving the sun a dim, watery appearance (no halo).' },
  // Low
  { name: 'Stratus', level: 'Low', altitude: 'Surface–2,000 m', composition: 'Water droplets', appearance: 'Uniform, gray, featureless sheet resembling elevated fog, rarely producing significant precipitation.' },
  { name: 'Stratocumulus', level: 'Low', altitude: 'Surface–2,000 m', composition: 'Water droplets', appearance: 'Low, lumpy, rolling mass with patches of blue sky or sunshine between elements.' },
  { name: 'Nimbostratus', level: 'Low', altitude: 'Surface–2,000 m', composition: 'Water droplets and ice crystals', appearance: 'Dark, gray, wet-looking layer that is diffuse and produces continuous rain or snow.' },
  // Vertical
  { name: 'Cumulus', level: 'Vertical', altitude: '500–6,000 m (can extend higher)', composition: 'Water droplets (ice at tops)', appearance: 'Detached, dense, dome-shaped heaps with flat bases — ranges from fair-weather humilis to towering congestus.' },
  { name: 'Cumulonimbus', level: 'Vertical', altitude: '500–12,000 m+', composition: 'Water droplets and ice crystals', appearance: 'Towering cloud with a fibrous, anvil-shaped top; produces lightning, thunder, torrential rain, hail, and sometimes tornadoes.' },
];
