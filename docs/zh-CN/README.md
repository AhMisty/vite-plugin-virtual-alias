# Vite 虚拟别名插件

[![npm version](https://img.shields.io/npm/v/vite-plugin-virtual-alias.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-virtual-alias)
[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg?style=flat-square)](https://github.com/AhMisty/vite-plugin-virtual-alias/blob/main/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/vite-plugin-virtual-alias.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-virtual-alias)

[English](../en-US/README.md) | <span style="color: #999">中文</span>

一个轻量级 Vite 插件，提供强大的虚拟别名功能，使您能够在构建过程中将自定义的虚拟路径映射到项目中的实际文件。

## ✨ 功能特性

- 🚀 **零配置** - 开箱即用，无需复杂配置
- ⚡ **高性能** - 轻量级实现，几乎不影响构建速度
- 🔄 **灵活映射** - 支持目录映射和文件内容直接注入
- 🧩 **TypeScript 友好** - 完整的类型定义支持
- 📦 **模块化** - 轻松管理项目中的路径别名
- 🔍 **智能解析** - 基于项目根目录的智能路径解析

## 📦 安装

使用您喜欢的包管理器安装：

```bash
# 使用 npm
npm install -D vite-plugin-virtual-alias

# 使用 yarn
yarn add -D vite-plugin-virtual-alias

# 使用 pnpm
pnpm add -D vite-plugin-virtual-alias
```

## 🚀 使用方法

### 基本配置

在 Vite 配置文件中引入并配置插件：

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { virtualAlias } from 'vite-plugin-virtual-alias'

export default defineConfig({
  plugins: [
    virtualAlias({
      mappings: [
        {
          // 虚拟路径
          proto: 'virtual:config.ts',
          // 映射路径
          resolve: 'path/to/your/custom/config.alias.ts',
          // 或者
          // source: 'path/to/your/custom/config.alias.ts',
        },
      ],
    }),
  ],
})
```

### 使用示例

配置完成后，您可以在代码中这样使用：

```typescript
// 使用虚拟别名导入
import config from 'virtual:config.ts'

console.log(config) // 将解析为 path/to/your/custom/config.alias.ts 文件
```

## 🔍 工作原理

- **resolve**：使用 `resolveId` 钩子进行路径映射，会影响到构建后的文件名
- **source**：使用 `load` 钩子直接返回文件内容，不会改变构建后的文件名

## 🤝 贡献

欢迎提交 Issue 和 Pull Request。对于重大变更，请先开启一个 issue 讨论您想要更改的内容。

## 📄 许可证

[MIT](https://github.com/AhMisty/vite-plugin-virtual-alias/blob/main/LICENSE) © [AhMisty](https://github.com/AhMisty)
