import type { Linter } from 'eslint';

type Options = { tsconfigRootDir: string };

export function base(options: Options): Linter.Config[];
export function react(options: Options): Linter.Config[];
export function node(options: Options): Linter.Config[];
