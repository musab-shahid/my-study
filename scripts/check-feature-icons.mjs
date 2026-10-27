#!/usr/bin/env node
/**
 * Ensures primary nav surfaces use FEATURE_ICONS for shared destinations.
 * - Requires @/lib/feature-icons import in nav shells
 * - Requires FEATURE_ICONS.<id> usage for each primary destination
 * - Bans known divergent icons (Dumbbell, Sigma)
 * - Requires AppBrand → BrandMark
 */
import { readFileSync } from 'node:fs';

const files = [
  'src/components/layout/Navigation.tsx',
  'src/components/layout/ToolsTray.tsx',
];

/** Destinations that must appear via FEATURE_ICONS on at least one primary surface. */
const requiredOnAny = [
  'home',
  'tracks',
  'learn',
  'practice',
  'review',
  'formulas',
  'progress',
  'search',
  'settings',
  'flashcards',
  'mockExam',
];

const errors = [];
const combined = [];

for (const f of files) {
  const t = readFileSync(f, 'utf8');
  combined.push(t);
  if (!t.includes("from '@/lib/feature-icons'") && !t.includes('from "@/lib/feature-icons"')) {
    errors.push(`${f}: missing import of @/lib/feature-icons`);
  }
  if (/\bDumbbell\b/.test(t)) {
    errors.push(`${f}: Dumbbell still referenced — Practice must use FEATURE_ICONS.practice`);
  }
  if (/\bSigma\b/.test(t)) {
    errors.push(`${f}: Sigma must not be used for Formulas — use FEATURE_ICONS.formulas`);
  }
}

const all = combined.join('\n');
for (const id of requiredOnAny) {
  const re = new RegExp(`FEATURE_ICONS\\.${id}\\b`);
  if (!re.test(all)) {
    errors.push(`FEATURE_ICONS.${id} is not referenced on Navigation or ToolsTray`);
  }
}

// Sidebar stages must use registry for learn/practice/formulas/progress
const nav = readFileSync('src/components/layout/Navigation.tsx', 'utf8');
for (const id of ['learn', 'practice', 'formulas', 'progress']) {
  if (!new RegExp(`FEATURE_ICONS\\.${id}\\b`).test(nav)) {
    errors.push(`Navigation.tsx must use FEATURE_ICONS.${id}`);
  }
}

const brand = readFileSync('src/components/ui/index.tsx', 'utf8');
if (/\bBookOpenCheck\b/.test(brand)) {
  errors.push('AppBrand still references BookOpenCheck — use BrandMark');
}
if (!brand.includes('BrandMark')) {
  errors.push('AppBrand must render BrandMark');
}

if (errors.length) {
  console.error('Feature-icon / logo guard FAILED\n - ' + errors.join('\n - '));
  process.exit(1);
}
console.log('Feature-icon / logo guard passed (canonical FEATURE_ICONS usage verified).');
