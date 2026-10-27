// GLB-012 : génère les fichiers de thème pour le web, Android et iOS à partir de dist/.
// Lancé par `npm run build`. Les fichiers générés sont commités : les apps mobiles les copient.
import { mkdir, writeFile } from 'node:fs/promises';
import process from 'node:process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { themes, toCss, toKotlin, toSwift, toTailwindCss } from '../dist/index.js';

export const ANDROID_PACKAGE = 'com.example.app.core.designsystem';
const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'generated');

async function write(path, content) {
  await mkdir(dirname(join(root, path)), { recursive: true });
  await writeFile(join(root, path), content);
}

await write('css/tailwind.css', toTailwindCss(themes[0]));
for (const theme of themes) {
  await write(`css/${theme.id}.css`, toCss(theme));
  await write(`android/${theme.id}/ThemeTokens.kt`, toKotlin(theme, ANDROID_PACKAGE));
  await write(`ios/${theme.id}/ThemeTokens.swift`, toSwift(theme));
}
process.stdout.write(`design-tokens : ${themes.length} thèmes générés dans generated/\n`);
