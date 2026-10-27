#!/usr/bin/env node
/**
 * Ensures primary nav surfaces do not hard-code divergent icons for shared features.
 * Looks for Dumbbell as Practice (forbidden) and requires feature-icons imports in nav shells.
 */
import { readFileSync } from 'node:fs';

const files = [
  'src/components/layout/Navigation.tsx',
  'src/components/layout/ToolsTray.tsx',
];
const errors = [];
for (const f of files) {
  const t = readFileSync(f, 'utf8');
  if (!t.includes("from '@/lib/feature-icons'") && !t.includes('from "@/lib/feature-icons"')) {
    errors.push(`${f}: missing import of @/lib/feature-icons`);
  }
  if (/Dumbbell/.test(t)) {
    errors.push(`${f}: Dumbbell still referenced — Practice must use FEATURE_ICONS.practice (Brain)`);
  }
  if (/\bSigma\b/.test(t)) {
    errors.push(`${f}: Sigma must not be used for Formulas — use FEATURE_ICONS.formulas`);
  }
}
const brand = readFileSync('src/components/ui/index.tsx', 'utf8');
if (/BookOpenCheck/.test(brand)) {
  errors.push('AppBrand still references BookOpenCheck — use BrandMark');
}
if (!brand.includes('BrandMark')) {
  errors.push('AppBrand must render BrandMark');
}
if (errors.length) {
  console.error('Feature-icon / logo guard FAILED\n - ' + errors.join('\n - '));
  process.exit(1);
}
console.log('Feature-icon / logo guard passed.');
