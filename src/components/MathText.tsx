// src/components/MathText.tsx
// Lightweight wrapper around KaTeX that lets us write formulas
// inside any string field (explanationSections, keyFacts, etc.).
// Usage: $...$ for inline, $$...$$ for block math. Plain text passes through.
//
// KaTeX JS is lazy-loaded: only imported when text actually contains
// math delimiters. The CSS loads eagerly (small). Plain text never
// triggers the KaTeX import at all.

import 'katex/dist/katex.min.css';
import { useEffect, useState } from 'react';

interface MathTextProps {
  text: string;
  className?: string;
}

let katexPromise: Promise<typeof import('katex').default> | null = null;

function getKatex(): Promise<typeof import('katex').default> {
  if (!katexPromise) {
    katexPromise = import('katex').then((m) => m.default);
  }
  return katexPromise;
}

function hasMath(text: string): boolean {
  return text.includes('$');
}

function splitParts(text: string): string[] {
  const parts: string[] = [];
  let i = 0;
  let buf = '';
  while (i < text.length) {
    if (text[i] === '$') {
      if (text[i + 1] === '$') {
        const end = text.indexOf('$$', i + 2);
        if (end !== -1) {
          if (buf) { parts.push(buf); buf = ''; }
          parts.push(text.slice(i, end + 2));
          i = end + 2;
          continue;
        }
      } else {
        const end = text.indexOf('$', i + 1);
        if (end !== -1) {
          if (buf) { parts.push(buf); buf = ''; }
          parts.push(text.slice(i, end + 1));
          i = end + 1;
          continue;
        }
      }
    }
    buf += text[i];
    i++;
  }
  if (buf) parts.push(buf);
  return parts;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderParts(text: string, katex: typeof import('katex').default): string {
  const parts = splitParts(text);
  return parts
    .map((part) => {
      if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
        const expr = part.slice(2, -2).trim();
        return katex.renderToString(expr, { displayMode: true, throwOnError: false });
      }
      if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
        const expr = part.slice(1, -1).trim();
        return katex.renderToString(expr, { displayMode: false, throwOnError: false });
      }
      // Preserve prose between formulas (escaped for safe HTML injection)
      return escapeHtml(part);
    })
    .join('');
}

export function MathText({ text, className }: MathTextProps) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    if (!text || !hasMath(text)) {
      setHtml(null);
      return;
    }

    let cancelled = false;
    getKatex().then((katex) => {
      if (cancelled) return;
      setHtml(renderParts(text, katex));
    });

    return () => { cancelled = true; };
  }, [text]);

  if (!text) return null;

  if (html !== null) {
    return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
  }

  // Fallback: render raw text (with $...$ visible) until KaTeX loads
  return <span className={className}>{text}</span>;
}
