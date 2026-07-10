import { type BuildConfig, build } from 'bun';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

import { journal } from 'annal';

import { dtsPlugin, rmPlugin } from './plugin';

import { compilerOptions } from '~/tsconfig.json';

const config: BuildConfig = {
  entrypoints: ['src/index.ts'],
  outdir: compilerOptions.outDir,
  plugins: [rmPlugin(), dtsPlugin()],
};

await build(config);

const distPath = join(import.meta.dir, '../..', compilerOptions.outDir);
const files = await readdir(distPath);
const fileStats = await Promise.all(
  files.map(async file => {
    const filePath = join(distPath, file);
    const stats = await stat(filePath);

    return { name: file, size: stats.size };
  }),
);
const totalSize = fileStats.reduce((acc, { size }) => acc + size, 0);

journal.info('Build completed');
journal.info(`Output: ${distPath}`);
journal.info(`Files: ${files.length}`);
journal.info(`Size: ${(totalSize / 1024).toFixed(2)} KB`);
