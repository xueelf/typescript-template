# Bun + TypeScript 开发模板

本模板基于 Bun 和 TypeScript，开箱即用。

内置代码检查、格式化、测试和构建。同时支持 Git 提交校验、持续集成和可选的 npm 可信发布。

## 功能特性

- ![Bun](https://img.shields.io/badge/Bun-latest-f9f1e1?style=flat-square&logo=bun&logoColor=f9f1e1&labelColor=fafafa) 运行时、包管理器、测试运行器和打包器
- ![TypeScript](https://img.shields.io/badge/TypeScript-^6-3178C6?style=flat-square&logo=typescript&logoColor=3178C6&labelColor=fafafa) 执行严格类型检查并生成类型声明
- ![ESLint](https://img.shields.io/badge/ESLint-latest-4B32C3?style=flat-square&logo=eslint&logoColor=4B32C3&labelColor=fafafa) 基于推荐规则的代码检查
- ![Prettier](https://img.shields.io/badge/Prettier-latest-F7B93E?style=flat-square&logo=prettier&logoColor=F7B93E&labelColor=fafafa) 代码格式化和导入排序
- ![EditorConfig](https://img.shields.io/badge/EditorConfig-latest-E0EFEF?style=flat-square&logo=editorconfig&logoColor=E0EFEF&labelColor=fafafa) 跨编辑器统一编码风格
- ![Husky](https://img.shields.io/badge/Husky-latest-42b983?style=flat-square&logo=git&logoColor=F05032&labelColor=fafafa) 自动执行 Git 提交检查
- ![Commitlint](https://img.shields.io/badge/Commitlint-latest-000000?style=flat-square&logo=commitlint&logoColor=000000&labelColor=fafafa) 约定式提交信息校验
- ![npm 可信发布](https://img.shields.io/badge/Publish-OIDC-CB3837?style=flat-square&logo=npm&logoColor=CB3837&labelColor=fafafa) 基于 GitHub Actions 的 npm 可信发布

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/xueelf/bun-template.git
cd bun-template

# 安装依赖
bun install
```

首次使用时，应修改 `package.json` 中的 `name`、`version` 和 `author` 等字段。还应替换 `src/index.ts` 和示例测试。

## 常用命令

| 命令                   | 说明                         |
| ---------------------- | ---------------------------- |
| `bun run build`        | 构建包并生成类型声明         |
| `bun test`             | 运行测试                     |
| `bun run lint`         | 运行 ESLint                  |
| `bun run lint:fix`     | 自动修复 ESLint 问题         |
| `bun run format`       | 使用 Prettier 格式化指定文件 |
| `bun run format:check` | 检查指定文件的格式           |
| `bun run typecheck`    | 执行 TypeScript 类型检查     |
| `bun run prepare`      | 配置 Git 钩子                |

## 构建

`bun run build` 会依次完成以下步骤：

1. 清空 `dist` 目录。
2. 使用 TypeScript 生成类型声明。
3. 使用 Bun 打包 `src/index.ts`。

输出采用 ESM（ECMAScript Module）格式。Bun 以浏览器为目标环境进行构建。

构建只打包项目源码。第三方依赖仍通过导入语句引用。

开发 Node.js 包时，应修改 `scripts/build.ts` 中的 `target`。多入口包应调整 `entrypoints`。如需将第三方依赖打入单文件产物，应调整 `packages`。

产物结构发生变化时，还应同步修改 `package.json` 中的 `exports` 和 `files`。

## 持续集成与发布

以下操作默认触发 CI（Continuous Integration，持续集成）：

- 发起 `pull request`（拉取请求）。
- 向 `master` 分支推送代码。

CI 配置位于 `.github/workflows/ci.yml`。工作流依次执行格式检查、ESLint、类型检查、测试和构建。

`on.push.branches` 默认只包含 `master`。如需监听 `develop` 等分支，应将分支名称加入该列表。

本模板默认作为私有项目使用，因此 `private` 为 `true`。

如需启用 npm 发布，应作出以下调整：

1. 确认 `package.json` 元数据正确。重点检查 `name`、`version` 和 `author` 等字段。
2. 删除 `"private": true`。
3. 在 npm 中配置可信发布，并绑定当前 GitHub 仓库。工作流文件应设为 `.github/workflows/publish.yml`。
4. 创建并推送与包版本完全一致的标签。例如，`version` 为 `1.0.0` 时，标签应为 `v1.0.0`。

以 `v` 开头的标签会触发发布工作流。工作流先执行全部检查，再确认标签与包版本一致。

发布工作流通过 OIDC（OpenID Connect）完成身份认证。全部检查通过后，工作流将包发布到 npm。

> OIDC 发布目前仍依赖 npm。
> 因此，`devEngines` 暂时将 `onFail` 设为 `"warn"`。
>
> 待 [`bun publish` 支持 npm OIDC](https://github.com/oven-sh/bun/issues/22423) 后，应改用 Bun 发布。
> 同时，应将 `onFail` 恢复为 `"error"`。

## 项目结构

```text
.
├── .github/workflows/       # 持续集成与 npm 发布
├── .husky/                  # Git 提交钩子
├── scripts/
│   ├── build.ts             # 构建脚本
│   └── check-version.ts     # 发布标签与包版本校验
├── src/                     # 包源码
├── tests/                   # 测试
├── commitlint.config.ts
├── eslint.config.ts
├── package.json
├── prettier.config.ts
├── tsconfig.build.json
└── tsconfig.json
```

## 配置说明

### TypeScript

- 启用严格模式和 `noUncheckedIndexedAccess` 等额外检查
- 使用 `bundler` 模块解析策略
- `paths` 将 `~/*` 映射到项目根目录，将 `#/*` 映射到 `src` 目录
- `package.json` 的 `imports` 负责解析发布后声明文件中的 `#/*`

### ESLint

- 使用 ESLint 和 typescript-eslint 推荐规则
- 强制 `if`、`for` 等控制语句使用花括号
- 忽略以 `_` 开头的未使用变量和参数

### Prettier

- 2 空格缩进、单引号、分号和 LF（Line Feed，换行符）
- 单参数箭头函数不添加括号
- 通过 [`prettier-plugin-sort`](https://github.com/xueelf/prettier-plugin-sort) 自动排序导入

### EditorConfig

- 使用 UTF-8 字符集和 LF 换行符
- 文件末尾保留换行
- TypeScript、JSON、TOML 和 YAML 使用 2 空格缩进
- 除 Markdown 外移除行尾空白

### Git 提交校验

- `pre-commit`：提交前执行格式检查、ESLint、类型检查、测试和构建。
- `commit-msg`：按照 [约定式提交](https://www.conventionalcommits.org/zh-hans/) 校验 `commit message`（提交信息）。提交信息应使用英文。

```text
type(scope?): subject

# 示例
feat: add new feature
fix(api): resolve endpoint issue
docs: update README
```
