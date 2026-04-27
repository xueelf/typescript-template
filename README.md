# TypeScript Template

An out-of-the-box TypeScript development template, pre-configured with code linting, formatting, and Git commit validation.

## Features

- ![Bun](https://img.shields.io/badge/Bun-latest-f9f1e1?style=flat-square&logo=bun&logoColor=f9f1e1&labelColor=fafafa) Fast JavaScript runtime and package manager (default)
- ![TypeScript](https://img.shields.io/badge/TypeScript-^6-3178C6?style=flat-square&logo=typescript&logoColor=3178C6&labelColor=fafafa) Strict type checking with modern configuration
- ![ESLint](https://img.shields.io/badge/ESLint-latest-4B32C3?style=flat-square&logo=eslint&logoColor=4B32C3&labelColor=fafafa) Code linting with recommended rules
- ![Prettier](https://img.shields.io/badge/Prettier-latest-F7B93E?style=flat-square&logo=prettier&logoColor=F7B93E&labelColor=fafafa) Opinionated code formatting
- ![EditorConfig](https://img.shields.io/badge/EditorConfig-latest-E0EFEF?style=flat-square&logo=editorconfig&logoColor=E0EFEF&labelColor=fafafa) Consistent coding styles across different editors
- ![Husky](https://img.shields.io/badge/Husky-latest-42b983?style=flat-square&logo=git&logoColor=F05032&labelColor=fafafa) Git hooks for automated checks
- ![Commitlint](https://img.shields.io/badge/Commitlint-latest-000000?style=flat-square&logo=commitlint&logoColor=000000&labelColor=fafafa) Conventional commit message enforcement

## Requirements

- TypeScript ^6
- A JavaScript runtime ([Bun](https://bun.sh/), [Node.js](https://nodejs.org/))

## Getting Started

Since I personally prefer Bun, this template uses it as the default runtime and package manager. Feel free to switch to Node.js if that's your thing — just a few file changes and you're good to go.

> **Note**: The `devEngines` field in `package.json` enforces the runtime and package manager. If you're not using Bun, make sure to update this field **before** running `install`, or the installation will fail.

### Installation

```bash
# Clone the repository
git clone https://github.com/xueelf/typescript-template.git
cd typescript-template

# Install dependencies
bun install
```

### Using Node.js

1. Update the `devEngines` field in `package.json` (swap `npm` with `yarn` or `pnpm` if you prefer):

   ```json
   {
     "devEngines": {
       "runtime": {
         "name": "node",
         "onFail": "error"
       },
       "packageManager": {
         "name": "npm",
         "onFail": "error"
       }
     }
   }
   ```

2. Delete `bun.lock` so your package manager can generate its own lockfile:

   ```bash
   rm bun.lock
   ```

3. Remove the Bun types and replace them with Node.js types:

   ```bash
   npm uninstall @types/bun
   npm install -D @types/node
   ```

   Then update the `types` field in `tsconfig.json`:

   ```json
   {
     "compilerOptions": {
       "types": ["node"]
     }
   }
   ```

4. Update `.husky/pre-commit` (use `yarn` or `pnpm` if that's what you chose):

   ```bash
   npm run lint
   npm run format
   ```

5. Update `.husky/commit-msg`:

   ```bash
   npm run commitlint --edit $1
   ```

6. ESLint, Prettier and Commitlint config files are written in TypeScript (`eslint.config.ts`, `prettier.config.ts`, `commitlint.config.ts`). Bun loads them natively, but Node.js does not. Pick one of the following:

   - **Install [`jiti`](https://github.com/unjs/jiti)** to keep the `.ts` configs:

     ```bash
     npm install -D jiti
     ```

   - **Or rename them** to `.js` / `.mjs` and strip out the TypeScript syntax (e.g. type imports, `satisfies`).

### Using Deno

This template isn't really recommended for Deno. Since Deno comes with its own built-in formatter and linter, you'd have to rip out all the ESLint and Prettier setups, delete `package.json` and `tsconfig.json`, and create a `deno.json` from scratch. It's a lot of work for little gain, so you're better off starting with a Deno-specific template.

### Available Scripts

| Script    | Description                               |
| --------- | ----------------------------------------- |
| `lint`    | Run ESLint on all TypeScript files        |
| `format`  | Format all TypeScript files with Prettier |
| `prepare` | Set up Husky Git hooks                    |

## Project Structure

```
.
├─ .editorconfig         # Editor configuration
├─ .github/              # GitHub metadata (workflows, etc.)
├─ .gitignore            # Git ignore rules
├─ .husky/               # Git hooks
│  ├─ commit-msg           # Commit message validation
│  └─ pre-commit           # Pre-commit linting
├─ bun.lock              # Bun lockfile
├─ commitlint.config.ts  # Commitlint configuration
├─ eslint.config.ts      # ESLint configuration
├─ index.ts              # Entry point
├─ LICENSE               # License file
├─ package.json          # Project manifest
├─ prettier.config.ts    # Prettier configuration
└─ tsconfig.json         # TypeScript configuration
```

## Configuration

### ESLint

Uses the flat config format with:

- ESLint recommended rules
- TypeScript ESLint recommended rules

### Prettier

Code style settings:

- 2 spaces indentation
- Single quotes
- Semicolons enabled
- LF line endings
- No parentheses for single arrow function parameters
- Sorted imports via [`prettier-plugin-sort`](https://github.com/aliemir/prettier-plugin-sort)

### EditorConfig

Editor-level settings for consistent coding styles:

- UTF-8 charset
- LF line endings
- Final newline at end of file
- 2 spaces indentation for TypeScript files
- Trim trailing whitespace for TypeScript files

### Git Hooks

- **pre-commit** — runs ESLint and Prettier to catch issues before committing
- **commit-msg** — validates your commit message format

### Commitlint

Follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope?): subject

# Examples
feat: add new feature
fix(api): resolve endpoint issue
docs: update README
```
