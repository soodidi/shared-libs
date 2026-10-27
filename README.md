# shared-libs

Configurations et libs communes à plusieurs projets ([GLB-010](https://github.com/soodidi/engineering-guidelines/blob/main/adr/global/GLB-010-boilerplates-et-libs-partagees.md)).

## Contenu

| Package / fichier                                          | Rôle                                                                               | ADR                            |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------ |
| [`@soodidi/tsconfig`](packages/tsconfig)                   | Configs TypeScript strictes (base, React, Node, librairie)                         | FE-002, BE-001                 |
| [`@soodidi/eslint-config`](packages/eslint-config)         | Flat config ESLint : `base`, `react`, `node`                                       | FE-002, FE-007, FE-008, BE-007 |
| [`@soodidi/prettier-config`](packages/prettier-config)     | Config Prettier (+ variante Tailwind)                                              | FE-005                         |
| [`@soodidi/commitlint-config`](packages/commitlint-config) | Conventional Commits + type `adr`                                                  | GLB-002                        |
| [`@soodidi/problem-details`](packages/problem-details)     | Format d'erreur API RFC 9457, partagé back ↔ front                                 | BE-004, FE-006, FE-009         |
| [`@soodidi/env`](packages/env)                             | Validation de la configuration au démarrage                                        | GLB-005, BE-005                |
| [`@soodidi/design-tokens`](packages/design-tokens)         | Thèmes épuré, chaleureux, coloré (clair et sombre) pour Tailwind, Compose, SwiftUI | GLB-012, FE-005                |
| [`default.json`](default.json)                             | Preset Renovate                                                                    | GLB-008                        |
| [`.github/workflows/reusable-*.yml`](.github/workflows)    | Workflows GitHub Actions réutilisables (CI Node, image Docker, titre de PR)        | OPS-001, OPS-002, GLB-002      |

## Utiliser les packages dans un projet

Les packages sont publiés sur GitHub Packages. Dans le projet :

```ini
# .npmrc
@soodidi:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN?}
```

En local, `NODE_AUTH_TOKEN` est un token GitHub (classic) avec le droit `read:packages`. En CI, `secrets.GITHUB_TOKEN` suffit si le repo a accès aux packages (réglage _Package settings → Manage Actions access_).

```bash
npm install -D @soodidi/eslint-config @soodidi/tsconfig @soodidi/prettier-config
```

## Utiliser sans publication

- **Renovate** : `{ "extends": ["github>soodidi/shared-libs"] }`
- **Workflows** :

  ```yaml
  jobs:
    ci:
      uses: soodidi/shared-libs/.github/workflows/reusable-node-ci.yml@main
  ```

  Si le repo `shared-libs` est privé, autoriser son accès dans _Settings → Actions → General → Access_.

## Développer

```bash
npm install
npm run verify      # format, lint, build, typecheck, tests
npx changeset   # à chaque changement d'un package publié
```

La publication est automatique : la CI ouvre une PR « Version Packages » ; la fusionner publie les nouvelles versions.

## Ajouter une lib

Une lib entre ici seulement si elle sert **au moins deux projets** et ne contient pas de logique métier propre à une app (GLB-010).
