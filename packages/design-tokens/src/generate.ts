import { type ColorRole, type Hex, type Palette, type Theme } from './themes.js';

const header = (theme: Theme, comment: string) =>
  `${comment} Généré par @soodidi/design-tokens (thème « ${theme.label} ») : ne pas modifier, régénérer (GLB-012).`;

const kebab = (role: ColorRole) =>
  role.replaceAll(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

/** Rayons dérivés du rayon de base, en pixels. */
export function radii(theme: Theme) {
  return {
    small: Math.round((theme.radius * 2) / 3),
    medium: theme.radius,
    large: Math.round(theme.radius * 1.5),
  };
}

const roles = (palette: Palette) => Object.entries(palette) as [ColorRole, Hex][];

// ---------------------------------------------------------------- Web

function cssVariables(palette: Palette, indent: string): string {
  return roles(palette)
    .map(([role, hex]) => `${indent}--${kebab(role)}: ${hex};`)
    .join('\n');
}

/**
 * Variables CSS du thème. Mode clair par défaut, sombre si le système le demande,
 * forçable avec `data-mode="light" | "dark"` sur `<html>`.
 */
export function toCss(theme: Theme): string {
  const { small, medium, large } = radii(theme);
  return `${header(theme, '/*')} */
:root {
${cssVariables(theme.light, '  ')}
  --radius-small: ${small / 16}rem;
  --radius: ${medium / 16}rem;
  --radius-large: ${large / 16}rem;
  --app-font-sans: ${theme.fontSans};
  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-mode='light']) {
${cssVariables(theme.dark, '    ')}
    color-scheme: dark;
  }
}

:root[data-mode='dark'] {
${cssVariables(theme.dark, '  ')}
  color-scheme: dark;
}
`;
}

/** Correspondance Tailwind 4 (`bg-primary`, `text-muted-foreground`, `rounded-md`…), commune à tous les thèmes. */
export function toTailwindCss(theme: Theme): string {
  const colors = roles(theme.light)
    .map(([role]) => `  --color-${kebab(role)}: var(--${kebab(role)});`)
    .join('\n');
  return `/* Généré par @soodidi/design-tokens : ne pas modifier, régénérer (GLB-012). */
@theme inline {
${colors}
  --color-popover: var(--card);
  --color-popover-foreground: var(--card-foreground);
  --radius-sm: var(--radius-small);
  --radius-md: var(--radius);
  --radius-lg: var(--radius-large);
  --font-sans: var(--app-font-sans);
}
`;
}

// ---------------------------------------------------------------- Android

const kotlinColor = (hex: Hex) => `Color(0xFF${hex.slice(1).toUpperCase()})`;

/** Rôles Material 3 dérivés des rôles du thème (aucun rôle laissé à la valeur Material par défaut). */
function materialRoles(palette: Palette, inversePrimary: Hex): [string, Hex][] {
  return [
    ['primary', palette.primary],
    ['onPrimary', palette.primaryForeground],
    ['primaryContainer', palette.accent],
    ['onPrimaryContainer', palette.accentForeground],
    ['inversePrimary', inversePrimary],
    ['secondary', palette.secondary],
    ['onSecondary', palette.secondaryForeground],
    ['secondaryContainer', palette.secondary],
    ['onSecondaryContainer', palette.secondaryForeground],
    ['tertiary', palette.accent],
    ['onTertiary', palette.accentForeground],
    ['tertiaryContainer', palette.accent],
    ['onTertiaryContainer', palette.accentForeground],
    ['background', palette.background],
    ['onBackground', palette.foreground],
    ['surface', palette.background],
    ['onSurface', palette.foreground],
    ['surfaceVariant', palette.muted],
    ['onSurfaceVariant', palette.mutedForeground],
    ['surfaceTint', palette.primary],
    ['inverseSurface', palette.foreground],
    ['inverseOnSurface', palette.background],
    ['error', palette.destructive],
    ['onError', palette.destructiveForeground],
    ['errorContainer', palette.destructive],
    ['onErrorContainer', palette.destructiveForeground],
    ['outline', palette.input],
    ['outlineVariant', palette.border],
    ['scrim', '#000000'],
    ['surfaceBright', palette.card],
    ['surfaceDim', palette.muted],
    ['surfaceContainerLowest', palette.card],
    ['surfaceContainerLow', palette.card],
    ['surfaceContainer', palette.muted],
    ['surfaceContainerHigh', palette.muted],
    ['surfaceContainerHighest', palette.secondary],
  ];
}

function kotlinArgs(args: [string, string][], indent: string): string {
  return args.map(([name, value]) => `${indent}${name} = ${value},`).join('\n');
}

/** `ThemeTokens.kt` pour Jetpack Compose (Material 3). `StatusColors` est défini dans `Theme.kt`. */
export function toKotlin(theme: Theme, packageName: string): string {
  const scheme = (palette: Palette, inverse: Hex) =>
    kotlinArgs(
      materialRoles(palette, inverse).map(([name, hex]) => [name, kotlinColor(hex)]),
      '            ',
    );
  const status = (palette: Palette) =>
    kotlinArgs(
      [
        ['success', kotlinColor(palette.success)],
        ['onSuccess', kotlinColor(palette.successForeground)],
        ['warning', kotlinColor(palette.warning)],
        ['onWarning', kotlinColor(palette.warningForeground)],
      ],
      '            ',
    );
  const { small, medium, large } = radii(theme);
  return `${header(theme, '//')}
package ${packageName}

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Shapes
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

internal object ThemeTokens {
    const val NAME = "${theme.id}"

    val lightColors =
        lightColorScheme(
${scheme(theme.light, theme.dark.primary)}
        )

    val darkColors =
        darkColorScheme(
${scheme(theme.dark, theme.light.primary)}
        )

    val lightStatus =
        StatusColors(
${status(theme.light)}
        )

    val darkStatus =
        StatusColors(
${status(theme.dark)}
        )

    val shapes =
        Shapes(
            extraSmall = RoundedCornerShape(${small}.dp),
            small = RoundedCornerShape(${small}.dp),
            medium = RoundedCornerShape(${medium}.dp),
            large = RoundedCornerShape(${large}.dp),
            extraLarge = RoundedCornerShape(${large}.dp),
        )
}
`;
}

// ---------------------------------------------------------------- iOS

const swiftHex = (hex: Hex) => `0x${hex.slice(1).toUpperCase()}`;

/** `ThemeTokens.swift` pour SwiftUI. `Color(light:dark:)` est défini dans `Color+Mode.swift`. */
export function toSwift(theme: Theme): string {
  const colors = roles(theme.light)
    .map(
      ([role, hex]) =>
        `    public static let ${role} = Color(light: ${swiftHex(hex)}, dark: ${swiftHex(theme.dark[role])})`,
    )
    .join('\n');
  const { small, medium, large } = radii(theme);
  return `${header(theme, '//')}
import SwiftUI

/// GLB-012 : rôles de couleur du thème « ${theme.label} », en clair et en sombre.
public enum AppColor {
${colors}
}

/// GLB-012 : rayons d'angle du thème.
public enum AppRadius {
    public static let small: CGFloat = ${small}
    public static let medium: CGFloat = ${medium}
    public static let large: CGFloat = ${large}
}
`;
}
