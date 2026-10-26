import base from './index.js';

/**
 * FE-005 : ordre des classes Tailwind trié automatiquement.
 * Le projet doit indiquer sa feuille de style Tailwind v4 :
 *   export default { ...tailwind, tailwindStylesheet: './src/styles.css' }
 * @type {import('prettier').Config}
 */
const config = {
  ...base,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cn', 'cva'],
};

export default config;
