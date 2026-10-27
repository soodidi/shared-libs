/**
 * GLB-012 : source unique des tokens de design.
 * Un thème = des rôles de couleur (clair et sombre), un rayon de base et une police.
 * Les apps n'utilisent que ces rôles, jamais une couleur brute.
 */

export type ColorRole =
  | 'background'
  | 'foreground'
  | 'card'
  | 'cardForeground'
  | 'primary'
  | 'primaryForeground'
  | 'secondary'
  | 'secondaryForeground'
  | 'muted'
  | 'mutedForeground'
  | 'accent'
  | 'accentForeground'
  | 'destructive'
  | 'destructiveForeground'
  | 'success'
  | 'successForeground'
  | 'warning'
  | 'warningForeground'
  | 'border'
  | 'input'
  | 'ring';

/** Couleur sRGB au format `#rrggbb`. */
export type Hex = `#${string}`;

export type Palette = Record<ColorRole, Hex>;

export type Theme = {
  id: string;
  label: string;
  description: string;
  light: Palette;
  dark: Palette;
  /** Rayon de base en pixels ; les tailles sm et lg en sont dérivées. */
  radius: number;
  /** Pile de polices CSS pour le web. Le mobile utilise la police système. */
  fontSans: string;
};

const systemFont =
  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

/** Paires texte / fond qui doivent respecter WCAG AA (4,5:1), testées pour chaque thème. */
export const contrastPairs: readonly (readonly [text: ColorRole, surface: ColorRole])[] = [
  ['foreground', 'background'],
  ['cardForeground', 'card'],
  ['mutedForeground', 'background'],
  ['mutedForeground', 'muted'],
  ['primaryForeground', 'primary'],
  ['secondaryForeground', 'secondary'],
  ['accentForeground', 'accent'],
  ['destructiveForeground', 'destructive'],
  ['successForeground', 'success'],
  ['warningForeground', 'warning'],
];

/** Éléments non textuels (bordure de champ, anneau de focus) : WCAG AA 1.4.11 (3:1) sur le fond. */
export const nonTextPairs: readonly (readonly [element: ColorRole, surface: ColorRole])[] = [
  ['input', 'background'],
  ['ring', 'background'],
  ['primary', 'background'],
];

export const themes = [
  {
    id: 'clean',
    label: 'Épuré',
    description: 'Neutre et sobre : gris froids, accent quasi noir, angles discrets.',
    radius: 6,
    fontSans: systemFont,
    light: {
      background: '#ffffff',
      foreground: '#18181b',
      card: '#ffffff',
      cardForeground: '#18181b',
      primary: '#18181b',
      primaryForeground: '#fafafa',
      secondary: '#f4f4f5',
      secondaryForeground: '#18181b',
      muted: '#f4f4f5',
      mutedForeground: '#52525b',
      accent: '#eef2ff',
      accentForeground: '#3730a3',
      destructive: '#dc2626',
      destructiveForeground: '#ffffff',
      success: '#15803d',
      successForeground: '#ffffff',
      warning: '#b45309',
      warningForeground: '#ffffff',
      border: '#e4e4e7',
      input: '#8d8d96',
      ring: '#52525b',
    },
    dark: {
      background: '#0b0b0d',
      foreground: '#fafafa',
      card: '#18181b',
      cardForeground: '#fafafa',
      primary: '#fafafa',
      primaryForeground: '#18181b',
      secondary: '#27272a',
      secondaryForeground: '#fafafa',
      muted: '#27272a',
      mutedForeground: '#a1a1aa',
      accent: '#1e1b4b',
      accentForeground: '#c7d2fe',
      destructive: '#f87171',
      destructiveForeground: '#450a0a',
      success: '#4ade80',
      successForeground: '#052e16',
      warning: '#fbbf24',
      warningForeground: '#451a03',
      border: '#27272a',
      input: '#63636d',
      ring: '#d4d4d8',
    },
  },
  {
    id: 'warm',
    label: 'Chaleureux',
    description: 'Accueillant : fonds sable, accent miel, coins arrondis.',
    radius: 12,
    fontSans: `ui-rounded, 'SF Pro Rounded', ${systemFont}`,
    light: {
      background: '#fcfaf6',
      foreground: '#292524',
      card: '#ffffff',
      cardForeground: '#292524',
      primary: '#a8520a',
      primaryForeground: '#ffffff',
      secondary: '#f3eadc',
      secondaryForeground: '#3d2a14',
      muted: '#f3eee6',
      mutedForeground: '#68594b',
      accent: '#e6efe1',
      accentForeground: '#2f4a28',
      destructive: '#b91c1c',
      destructiveForeground: '#ffffff',
      success: '#3f6f2a',
      successForeground: '#ffffff',
      warning: '#8a5a00',
      warningForeground: '#ffffff',
      border: '#e8dfd2',
      input: '#958672',
      ring: '#c2670f',
    },
    dark: {
      background: '#1c1815',
      foreground: '#f4eee6',
      card: '#26211c',
      cardForeground: '#f4eee6',
      primary: '#f0a64a',
      primaryForeground: '#2a1803',
      secondary: '#3a3027',
      secondaryForeground: '#f4eee6',
      muted: '#2e2822',
      mutedForeground: '#b9ab9b',
      accent: '#2b3a26',
      accentForeground: '#cfe3c5',
      destructive: '#f28b82',
      destructiveForeground: '#3b0a07',
      success: '#9bcf86',
      successForeground: '#16290d',
      warning: '#f5c451',
      warningForeground: '#2e2000',
      border: '#3a332c',
      input: '#7a6d60',
      ring: '#f0a64a',
    },
  },
  {
    id: 'vivid',
    label: 'Coloré',
    description: 'Énergique : accent violet, touches rose et turquoise, formes généreuses.',
    radius: 16,
    fontSans: systemFont,
    light: {
      background: '#fdfcff',
      foreground: '#1e1b3a',
      card: '#ffffff',
      cardForeground: '#1e1b3a',
      primary: '#6d28d9',
      primaryForeground: '#ffffff',
      secondary: '#fce7f3',
      secondaryForeground: '#831843',
      muted: '#f1effa',
      mutedForeground: '#57527a',
      accent: '#ccfbf1',
      accentForeground: '#134e4a',
      destructive: '#dc2626',
      destructiveForeground: '#ffffff',
      success: '#15803d',
      successForeground: '#ffffff',
      warning: '#b45309',
      warningForeground: '#ffffff',
      border: '#e4e0f5',
      input: '#8a83b0',
      ring: '#8b5cf6',
    },
    dark: {
      background: '#13111f',
      foreground: '#f4f2ff',
      card: '#1d1a2e',
      cardForeground: '#f4f2ff',
      primary: '#b49cfc',
      primaryForeground: '#1e1037',
      secondary: '#4a1d3a',
      secondaryForeground: '#fbcfe8',
      muted: '#262238',
      mutedForeground: '#aca6c9',
      accent: '#12403c',
      accentForeground: '#99f6e4',
      destructive: '#f87171',
      destructiveForeground: '#2a0707',
      success: '#4ade80',
      successForeground: '#052e16',
      warning: '#fbbf24',
      warningForeground: '#2a1a00',
      border: '#2f2a45',
      input: '#665f8c',
      ring: '#b49cfc',
    },
  },
] as const satisfies readonly Theme[];

export type ThemeId = (typeof themes)[number]['id'];

export function getTheme(id: ThemeId): Theme {
  const theme = themes.find((candidate) => candidate.id === id);
  if (!theme) throw new Error(`Thème inconnu : ${id}`);
  return theme;
}
