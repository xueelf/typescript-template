# Bun Template

> 使用其他语言阅读：[English](./README.md) | 中文

开箱即用的 Bun 与 TypeScript 开发模板，预配置了代码检查、格式化、测试、构建和 Git 提交验证。

## 功能特性

- ![Bun](https://img.shields.io/badge/Bun-latest-f9f1e1?style=flat-square&logo=bun&logoColor=f9f1e1&labelColor=fafafa) 运行时、包管理器、测试运行器和打包器
- ![TypeScript](https://img.shields.io/badge/TypeScript-^6-3178C6?style=flat-square&logo=typescript&logoColor=3178C6&labelColor=fafafa) 严格类型检查与现代化配置
- ![ESLint](https://img.shields.io/badge/ESLint-latest-4B32C3?style=flat-square&logo=eslint&logoColor=4B32C3&labelColor=fafafa) 基于推荐规则的代码检查
- ![Prettier](https://img.shields.io/badge/Prettier-latest-F7B93E?style=flat-square&logo=prettier&logoColor=F7B93E&labelColor=fafafa) 代码自动格式化
- ![EditorConfig](https://img.shields.io/badge/EditorConfig-latest-E0EFEF?style=flat-square&logo=editorconfig&logoColor=E0EFEF&labelColor=fafafa) 跨编辑器一致的编码风格
- ![Husky](https://img.shields.io/badge/Husky-latest-42b983?style=flat-square&logo=git&logoColor=F05032&labelColor=fafafa) Git hooks 自动化检查
- ![Commitlint](https://img.shields.io/badge/Commitlint-latest-000000?style=flat-square&logo=commitlint&logoColor=000000&labelColor=fafafa) 约定式提交信息校验
- ![OIDC](https://img.shields.io/badge/Publish-OIDC-CB3837?style=flat-square&logo=npm&logoColor=CB3837&labelColor=fafafa) 安全的无密码 npm 发布

## 快速开始

### 安装

```bash
# 克隆仓库
git clone https://github.com/xueelf/bun-template.git
cd bun-template

# 安装依赖
bun install
```

### 持续集成与发布

拉取请求和推送到 `master` 会运行 `.github/workflows/ci.yml`。以 `v` 开头的标签会触发 `.github/workflows/publish.yml`，在验证通过后通过 OIDC 发布到 npm。

> `devEngines` 暂时使用 `onFail: "warn"`，因为 OIDC 发布目前仍需 npm。待 [`bun publish` 支持 npm OIDC](https://github.com/oven-sh/bun/issues/22423) 后，应恢复为 `"error"` 并改用 Bun 发布。

1. **准备包信息**：更新包名、版本号和仓库地址，然后删除 `"private": true`。
2. **配置可信发布**：在 npm 上配置该包信任此 GitHub 仓库。
3. **推送标签**：创建并推送以 `v` 开头的 Git 标签（如 `v1.0.0`）。

### 常用命令

| 命令                   | 描述                           |
| ---------------------- | ------------------------------ |
| `bun run build`        | 构建包并生成类型声明           |
| `bun test`             | 运行测试                       |
| `bun run lint`         | 运行 ESLint                    |
| `bun run lint:fix`     | 修复 ESLint 问题               |
| `bun run format`       | 使用 Prettier 格式化支持的文件 |
| `bun run format:check` | 检查格式                       |
| `bun run typecheck`    | 执行类型检查                   |
| `bun run prepare`      | 配置 Git hooks                 |

## 项目结构

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
- 通过 [`prettier-plugin-sort`](https://github.com/xueelf/prettier-plugin-sort) 自动排序导入

### EditorConfig

编辑器级别的编码风格配置：

- UTF-8 字符集
- LF 换行符
- 文件末尾插入空行
- TypeScript、JSON、TOML 和 YAML 使用 2 空格缩进
- 除 Markdown 外移除行尾空白

### Git Hooks

- **pre-commit** — 提交前检查格式、ESLint、类型、测试和构建
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
