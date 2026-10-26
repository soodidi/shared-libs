// @ts-check
import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import reactHooks from 'eslint-plugin-react-hooks';
import testingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const TS_FILES = ['**/*.{ts,tsx,mts,cts}'];
const TEST_FILES = ['**/*.{test,spec}.{ts,tsx}', '**/*.e2e-spec.ts', '**/test/**', '**/e2e/**'];
const CONFIG_FILES = ['**/*.config.{js,ts,mjs,cjs,mts}'];

/**
 * Socle : JS recommandé + typescript-eslint strict avec vérification des types (FE-002).
 * @param {{ tsconfigRootDir: string }} options
 */
export function base({ tsconfigRootDir }) {
  return defineConfig(
    js.configs.recommended,
    {
      files: TS_FILES,
      extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
      languageOptions: {
        parserOptions: { projectService: true, tsconfigRootDir },
      },
      rules: {
        // FE-002 : pas d'enum TypeScript, exports nommés uniquement.
        'no-restricted-syntax': [
          'error',
          {
            selector: 'TSEnumDeclaration',
            message:
              "Pas d'enum (FE-002) : utiliser une union de littéraux ou un objet `as const`.",
          },
          {
            selector: 'ExportDefaultDeclaration',
            message: 'Exports nommés uniquement (FE-002).',
          },
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { fixStyle: 'inline-type-imports' },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
        // BE-007 : pas de console.log dans le code livré.
        'no-console': ['error', { allow: ['warn', 'error'] }],
        eqeqeq: ['error', 'always'],
      },
    },
    {
      // Les fichiers de configuration des outils exigent un export par défaut.
      files: CONFIG_FILES,
      rules: { 'no-restricted-syntax': 'off' },
    },
    {
      files: TEST_FILES,
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/unbound-method': 'off',
      },
    },
    {
      files: ['**/*.{js,mjs,cjs}'],
      extends: [tseslint.configs.disableTypeChecked],
    },
    prettier,
  );
}

/**
 * App React : hooks + règles du React Compiler, accessibilité, TanStack Query, Testing Library
 * (FE-004, FE-007, FE-008).
 * @param {{ tsconfigRootDir: string }} options
 */
export function react({ tsconfigRootDir }) {
  return defineConfig(
    base({ tsconfigRootDir }),
    {
      files: ['**/*.{ts,tsx}'],
      languageOptions: { globals: globals.browser },
      extends: [
        reactHooks.configs.flat.recommended,
        jsxA11y.configs.recommended,
        pluginQuery.configs['flat/recommended'],
      ],
    },
    {
      files: ['**/*.test.{ts,tsx}'],
      extends: [testingLibrary.configs['flat/react']],
    },
    prettier,
  );
}

/**
 * Service Node.js / NestJS (BE-001, BE-007).
 * @param {{ tsconfigRootDir: string }} options
 */
export function node({ tsconfigRootDir }) {
  return defineConfig(
    base({ tsconfigRootDir }),
    {
      files: ['**/*.{ts,js,mjs,cjs}'],
      languageOptions: { globals: globals.node },
    },
    {
      // NestJS : modules et contrôleurs sont des classes décorées sans logique propre.
      files: ['**/*.ts'],
      rules: {
        '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
      },
    },
    prettier,
  );
}
