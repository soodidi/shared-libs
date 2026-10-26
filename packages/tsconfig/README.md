# @soodidi/tsconfig

Configurations TypeScript partagées. Elles appliquent FE-002 : `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `noFallthroughCasesInSwitch`.

| Fichier        | Usage                                                  |
| -------------- | ------------------------------------------------------ |
| `base.json`    | Socle strict, commun à tout                            |
| `react.json`   | App React + Vite (pas d'émission, `vite/client`)       |
| `node.json`    | Service Node.js ESM / NestJS (décorateurs, `NodeNext`) |
| `library.json` | Package publié (déclarations `.d.ts`)                  |

```json
{
  "extends": "@soodidi/tsconfig/react.json",
  "include": ["src"]
}
```

> TypeScript 6 n'inclut plus automatiquement les `@types/*` : chaque config déclare ses `types`. Ajouter `"types": ["node", "vitest/globals"]` selon le projet.
