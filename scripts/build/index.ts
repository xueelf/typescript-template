import { type BuildConfig, build } from 'bun';

import { rmPlugin } from './plugin';

export const OUT_DIR = 'dist';

const config: BuildConfig = {
  entrypoints: ['src/index.ts'],
  outdir: OUT_DIR,
  plugins: [rmPlugin()],
};

await build(config);
