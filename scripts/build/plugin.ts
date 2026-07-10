import { type BunPlugin, $ } from 'bun';
import { rm } from 'node:fs/promises';

import { journal } from 'annal';

import { compilerOptions } from '~/tsconfig.json';

export function rmPlugin(): BunPlugin {
  return {
    name: 'rm',
    async setup(): Promise<void> {
      try {
        await rm(compilerOptions.outDir, { recursive: true, force: true });
        journal.info(`Dist directory removed`);
      } catch (error) {
        if (error instanceof Error) {
          journal.error(error.message);
        }
        process.exit(1);
      }
    },
  };
}

export function dtsPlugin(): BunPlugin {
  return {
    name: 'dts',
    async setup(): Promise<void> {
      try {
        await $`tsc -p tsconfig.build.json`.quiet();
        journal.info('Type declaration files generated');
      } catch (error) {
        if (error instanceof $.ShellError) {
          const output = error.stdout.toString().trim();

          if (output) {
            journal.error(output);
          }
        }
        process.exit(1);
      }
    },
  };
}
