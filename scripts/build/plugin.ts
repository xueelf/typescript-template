import { type BunPlugin, $ } from 'bun';
import { rm } from 'node:fs/promises';

import { journal } from 'annal';

import { OUT_DIR } from '.';

export function rmPlugin(): BunPlugin {
  return {
    name: 'rm',
    async setup(): Promise<void> {
      await rm(OUT_DIR, { recursive: true, force: true });
      journal.info(`${OUT_DIR} directory removed`);
    },
  };
}

export function dtsPlugin(): BunPlugin {
  return {
    name: 'dts',
    async setup(): Promise<void> {
      await $`tsc`;
      journal.info('Type declaration files generated');
    },
  };
}
