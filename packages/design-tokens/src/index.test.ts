import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  contrastPairs,
  contrastRatio,
  hexToRgb,
  nonTextPairs,
  themes,
  toCss,
  toKotlin,
  toSwift,
  toTailwindCss,
} from './index.js';

const generated = (path: string) =>
  readFileSync(join(import.meta.dirname, '..', 'generated', path), 'utf8');

describe('contrastRatio', () => {
  it('matches the WCAG reference values', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
    expect(contrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1, 5);
    expect(contrastRatio('#767676', '#ffffff')).toBeCloseTo(4.54, 2);
  });

  it('rejects malformed colors', () => {
    expect(() => hexToRgb('#fff')).toThrow();
  });
});

describe.each(themes)('theme $id', (theme) => {
  it.each(['light', 'dark'] as const)('meets WCAG AA for every text pair in %s mode', (mode) => {
    const palette = theme[mode];
    const failures = contrastPairs
      .map(([text, surface]) => ({
        pair: `${text} / ${surface}`,
        ratio: contrastRatio(palette[text], palette[surface]),
      }))
      .filter(({ ratio }) => ratio < 4.5)
      .map(({ pair, ratio }) => `${pair} : ${ratio.toFixed(2)}`);
    expect(failures).toEqual([]);
  });

  it.each(['light', 'dark'] as const)(
    'meets WCAG AA 3:1 for non-text elements in %s mode',
    (mode) => {
      const palette = theme[mode];
      const failures = nonTextPairs
        .filter(([element, surface]) => contrastRatio(palette[element], palette[surface]) < 3)
        .map(([element, surface]) => `${element} / ${surface}`);
      expect(failures).toEqual([]);
    },
  );

  it('defines the same roles in light and dark mode', () => {
    expect(Object.keys(theme.dark).sort()).toEqual(Object.keys(theme.light).sort());
  });

  it('has up-to-date generated files (run `npm run build` otherwise)', () => {
    expect(generated(`css/${theme.id}.css`)).toBe(toCss(theme));
    expect(generated(`android/${theme.id}/ThemeTokens.kt`)).toBe(
      toKotlin(theme, 'com.example.app.core.designsystem'),
    );
    expect(generated(`ios/${theme.id}/ThemeTokens.swift`)).toBe(toSwift(theme));
  });
});

describe('generated files', () => {
  it('exposes every color role to Tailwind', () => {
    const css = generated('css/tailwind.css');
    expect(css).toBe(toTailwindCss(themes[0]));
    for (const role of Object.keys(themes[0].light)) {
      const name = role.replaceAll(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
      expect(css).toContain(`--color-${name}: var(--${name});`);
    }
  });

  it('uses unique theme ids', () => {
    expect(new Set(themes.map((theme) => theme.id)).size).toBe(themes.length);
  });
});
