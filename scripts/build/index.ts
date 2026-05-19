import { type BuildConfig, build } from 'bun';

import { dtsPlugin, rmPlugin } from './plugin';

import { compilerOptions } from '~/tsconfig.json';

const config: BuildConfig = {
  entrypoints: ['src/index.ts'],
  outdir: compilerOptions.outDir,
  plugins: [rmPlugin(), dtsPlugin()],
};

await build(config);
