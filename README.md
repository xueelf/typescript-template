# Bun Template

> Read this in other languages: English | [中文](./README.zh.md)

An out-of-the-box Bun and TypeScript development template, pre-configured with code linting, formatting, testing, building, and Git commit validation.

## Features

- ![Bun](https://img.shields.io/badge/Bun-latest-f9f1e1?style=flat-square&logo=bun&logoColor=f9f1e1&labelColor=fafafa) Runtime, package manager, test runner, and bundler
- ![TypeScript](https://img.shields.io/badge/TypeScript-^6-3178C6?style=flat-square&logo=typescript&logoColor=3178C6&labelColor=fafafa) Strict type checking with modern configuration
- ![ESLint](https://img.shields.io/badge/ESLint-latest-4B32C3?style=flat-square&logo=eslint&logoColor=4B32C3&labelColor=fafafa) Code linting with recommended rules
- ![Prettier](https://img.shields.io/badge/Prettier-latest-F7B93E?style=flat-square&logo=prettier&logoColor=F7B93E&labelColor=fafafa) Opinionated code formatting
- ![EditorConfig](https://img.shields.io/badge/EditorConfig-latest-E0EFEF?style=flat-square&logo=editorconfig&logoColor=E0EFEF&labelColor=fafafa) Consistent coding styles across different editors
- ![Husky](https://img.shields.io/badge/Husky-latest-42b983?style=flat-square&logo=git&logoColor=F05032&labelColor=fafafa) Git hooks for automated checks
- ![Commitlint](https://img.shields.io/badge/Commitlint-latest-000000?style=flat-square&logo=commitlint&logoColor=000000&labelColor=fafafa) Conventional commit message enforcement
- ![OIDC](https://img.shields.io/badge/Publish-OIDC-CB3837?style=flat-square&logo=npm&logoColor=CB3837&labelColor=fafafa) Secure passwordless publishing to npm

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/xueelf/bun-template.git
cd bun-template

# Install dependencies
bun install
```

### CI and Publishing

Pull requests and pushes to `master` run `.github/workflows/ci.yml`. Tags starting with `v` trigger `.github/workflows/publish.yml`, which verifies the package before publishing it to npm through OIDC.

> `devEngines` temporarily uses `onFail: "warn"` because OIDC publishing still requires npm. Once [`bun publish` supports npm OIDC](https://github.com/oven-sh/bun/issues/22423), switch it back to `"error"` and publish with Bun.

1. **Prepare the package**: Update the package name, version, and repository, then remove `"private": true`.
2. **Configure trusted publishing**: Configure the package on npm to trust this GitHub repository.
3. **Push a tag**: Create and push a Git tag starting with `v` (e.g., `v1.0.0`).

### Commands

| Command                | Description                                 |
| ---------------------- | ------------------------------------------- |
| `bun run build`        | Build the package and generate declarations |
| `bun test`             | Run tests                                   |
| `bun run lint`         | Run ESLint                                  |
| `bun run lint:fix`     | Fix ESLint issues                           |
| `bun run format`       | Format supported files with Prettier        |
| `bun run format:check` | Check formatting                            |
| `bun run typecheck`    | Type-check the project                      |
| `bun run prepare`      | Set up Git hooks                            |

## Project Structure

```
.
├── .github/
├── .husky/
├── scripts/
│   ├── build.ts
│   └── check-version.ts
├── src/
├── tests/
│   └── example.test.ts
├── .editorconfig
├── .gitignore
├── bun.lock
├── commitlint.config.ts
├── eslint.config.ts
├── LICENSE
├── package.json
├── prettier.config.ts
├── tsconfig.build.json
└── tsconfig.json
```

## Configuration

### ESLint

Uses the flat config format with:

- ESLint recommended rules
- TypeScript ESLint recommended rules
- Unused variables prefixed with `_` are ignored

### Prettier

Code style settings:

- 2 spaces indentation
- Single quotes
- Semicolons enabled
- LF line endings
- No parentheses for single arrow function parameters
- Sorted imports via [`prettier-plugin-sort`](https://github.com/xueelf/prettier-plugin-sort)

### EditorConfig

Editor-level settings for consistent coding styles:

- UTF-8 charset
- LF line endings
- Final newline at end of file
- 2 spaces indentation for TypeScript, JSON, TOML, and YAML
- Trim trailing whitespace except in Markdown

### Git Hooks

- **pre-commit** — checks formatting, ESLint, types, tests, and the build before committing
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
