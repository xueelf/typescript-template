# TypeScript Template

> 使用其他语言阅读：[English](./README.md) | 中文

开箱即用的 TypeScript 开发模板，预配置了代码检查、格式化和 Git 提交验证。

## 功能特性

- ![Bun](https://img.shields.io/badge/Bun-latest-f9f1e1?style=flat-square&logo=bun&logoColor=f9f1e1&labelColor=fafafa) 快速的 JavaScript 运行时和包管理器（默认）
- ![TypeScript](https://img.shields.io/badge/TypeScript-^6-3178C6?style=flat-square&logo=typescript&logoColor=3178C6&labelColor=fafafa) 严格类型检查与现代化配置
- ![ESLint](https://img.shields.io/badge/ESLint-latest-4B32C3?style=flat-square&logo=eslint&logoColor=4B32C3&labelColor=fafafa) 基于推荐规则的代码检查
- ![Prettier](https://img.shields.io/badge/Prettier-latest-F7B93E?style=flat-square&logo=prettier&logoColor=F7B93E&labelColor=fafafa) 代码自动格式化
- ![EditorConfig](https://img.shields.io/badge/EditorConfig-latest-E0EFEF?style=flat-square&logo=editorconfig&logoColor=E0EFEF&labelColor=fafafa) 跨编辑器一致的编码风格
- ![Husky](https://img.shields.io/badge/Husky-latest-42b983?style=flat-square&logo=git&logoColor=F05032&labelColor=fafafa) Git hooks 自动化检查
- ![Commitlint](https://img.shields.io/badge/Commitlint-latest-000000?style=flat-square&logo=commitlint&logoColor=000000&labelColor=fafafa) 约定式提交信息校验
- ![OIDC](https://img.shields.io/badge/Publish-OIDC-CB3837?style=flat-square&logo=npm&logoColor=CB3837&labelColor=fafafa) 安全的无密码 npm 发布（带溯源证明）

## 环境要求

- TypeScript ^6
- JavaScript 运行时（[Bun](https://bun.sh/) 或 [Node.js](https://nodejs.org/)）

## 快速开始

本模板默认使用 Bun 作为运行时和包管理器。如果你想使用 Node.js，只需修改几个文件即可。

> **注意**：`package.json` 中的 `devEngines` 字段强制要求运行时和包管理器。如果你不使用 Bun，请在运行 `install` **之前**更新该字段，否则会安装失败。

### 安装

```bash
# 克隆仓库
git clone https://github.com/xueelf/typescript-template.git
cd typescript-template

# 安装依赖
bun install
```

### 切换到 Node.js

1. 更新 `package.json` 中的 `devEngines` 字段（如使用 yarn 或 pnpm，请将 `npm` 替换为对应名称）：

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

2. 删除 `bun.lock`，让你的包管理器生成自己的 lockfile：

   ```bash
   rm bun.lock
   ```

3. 移除 Bun 类型声明，替换为 Node.js 类型声明：

   ```bash
   npm uninstall @types/bun
   npm install -D @types/node
   ```

   然后更新 `tsconfig.json` 中的 `types` 字段：

   ```json
   {
     "compilerOptions": {
       "types": ["node"]
     }
   }
   ```

4. 更新 `.husky/pre-commit`（如使用 yarn 或 pnpm，请替换命令）：

   ```bash
   npm run lint
   npm run format
   ```

5. 更新 `.husky/commit-msg`：

   ```bash
   npm run commitlint --edit $1
   ```

6. ESLint、Prettier 和 Commitlint 的配置文件使用 TypeScript 编写（`eslint.config.ts`、`prettier.config.ts`、`commitlint.config.ts`）。Bun 和 Node.js 22.6+（通过 `--experimental-strip-types`，23+ 默认启用）均可原生加载。如果你使用较旧的 Node.js 版本，选择以下方案之一：
   - **安装 [`jiti`](https://github.com/unjs/jiti)** 以保留 `.ts` 配置：

     ```bash
     npm install -D jiti
     ```

   - **或将它们重命名**为 `.js` / `.mjs`，并移除 TypeScript 语法（如类型导入、`satisfies`）。

7. 更新 `.github/workflows/publish.yml`，将 `bun ci`、`bun run lint`、`bun run build` 等命令替换为 npm/pnpm/yarn 对应命令。

### 发布到 npm

本模板预配置了 GitHub Actions 工作流（`.github/workflows/publish.yml`），支持安全的无密码发布。

1. **关联仓库**：在 npm 上配置你的包信任此 GitHub 仓库的 OIDC 发布。
2. **推送标签**：创建并推送以 `v` 开头的 Git 标签（如 `v1.0.0`）。
3. **自动发布**：工作流将自动安装依赖、检查代码、运行测试、构建，并以 `--provenance` 发布你的包，增强供应链安全。

### 使用 Deno

不推荐将此模板用于 Deno。Deno 自带格式化工具和检查器，你需要移除所有 ESLint 和 Prettier 配置、删除 `package.json` 和 `tsconfig.json`，然后从头创建 `deno.json`。建议使用 Deno 专用模板。

### 可用脚本

| 脚本        | 描述                                     |
| ----------- | ---------------------------------------- |
| `build`     | 使用 Bun 构建项目                        |
| `test`      | 通过 Bun 测试运行器执行测试              |
| `lint`      | 对所有 TypeScript 文件运行 ESLint        |
| `format`    | 使用 Prettier 格式化所有 TypeScript 文件 |
| `typecheck` | 运行 TypeScript 类型检查                 |
| `prepare`   | 配置 Husky Git hooks                     |

## 项目结构

```
.
├── .github/
├── .husky/
├── scripts/
├── src/
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

- `.github/` — GitHub Actions 工作流与 Dependabot 依赖更新
- `.husky/` — Git hooks，提交前检查与提交信息校验
- `scripts/` — 构建流程与测试自动化

## 配置说明

### ESLint

使用扁平化配置格式，包含：

- ESLint 推荐规则
- TypeScript ESLint 推荐规则
- 未使用变量检查（忽略 `_` 前缀）

### Prettier

代码风格设置：

- 2 空格缩进
- 单引号
- 启用分号
- LF 换行符
- 单参数箭头函数不添加括号
- 通过 [`prettier-plugin-sort`](https://github.com/aliemir/prettier-plugin-sort) 自动排序导入

### EditorConfig

编辑器级别的编码风格配置：

- UTF-8 字符集
- LF 换行符
- 文件末尾插入空行
- TypeScript 文件使用 2 空格缩进
- TypeScript 文件去除行尾空白

### Git Hooks

- **pre-commit** — 提交前运行 ESLint 和 Prettier，及早发现问题
- **commit-msg** — 验证提交信息格式

### Commitlint

遵循 [约定式提交](https://www.conventionalcommits.org/zh-hans/) 规范：

```
type(scope?): subject

# 示例
feat: 添加新功能
fix(api): 修复接口问题
docs: 更新 README
```
