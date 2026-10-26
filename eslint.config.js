import { base } from '@soodidi/eslint-config';

export default [
  { ignores: ['**/dist/**', '**/coverage/**', 'packages/eslint-config/index.d.ts'] },
  ...base({ tsconfigRootDir: import.meta.dirname }),
];
