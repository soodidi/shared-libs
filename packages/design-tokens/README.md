# @soodidi/design-tokens

Socle de design commun (GLB-012) : trois thèmes, chacun en clair et en sombre, générés pour le web, Android et iOS à partir d'une seule source.

| Thème      | Id      | Style                                                       |
| ---------- | ------- | ----------------------------------------------------------- |
| Épuré      | `clean` | Neutre et sobre, accent quasi noir, angles discrets         |
| Chaleureux | `warm`  | Fonds sable, accent miel, coins arrondis                    |
| Coloré     | `vivid` | Accent violet, touches rose et turquoise, formes généreuses |

## Utilisation

Les apps copient les fichiers de `generated/` (GLB-010) :

| Plateforme | Fichiers                               | Destination dans le boilerplate                   |
| ---------- | -------------------------------------- | ------------------------------------------------- |
| Web        | `css/<thème>.css` + `css/tailwind.css` | `src/theme/`, importés par `src/styles.css`       |
| Android    | `android/<thème>/ThemeTokens.kt`       | `core/designsystem/` (adapter la ligne `package`) |
| iOS        | `ios/<thème>/ThemeTokens.swift`        | `Packages/Sources/DesignSystem/`                  |

Dans le code, on n'utilise que les rôles :

- Web : `bg-primary text-primary-foreground`, `text-muted-foreground`, `rounded-md`.
- Android : `MaterialTheme.colorScheme.primary`, `AppTheme.status.success`, `MaterialTheme.shapes.medium`.
- iOS : `AppColor.primary`, `AppColor.mutedForeground`, `AppRadius.medium`.

Mode sombre : automatique selon le système. Sur le web, `data-mode="light"` ou `data-mode="dark"` sur `<html>` force un mode.

## Ajouter ou modifier un thème

1. Modifier `src/themes.ts` (copier un thème existant pour en créer un).
2. `npm run build -w @soodidi/design-tokens` régénère `generated/`.
3. `npm test -w @soodidi/design-tokens` vérifie les contrastes WCAG AA de chaque paire texte / fond et des bordures de champ.
4. Ajouter un changeset (`npx changeset`) et reporter les fichiers générés dans les apps concernées.
