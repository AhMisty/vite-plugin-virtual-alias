# Vite 虚拟别名插件

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![English](https://img.shields.io/badge/English-EN-blue)](../en-US/README.md)

一个 Vite 插件，提供虚拟别名功能，可以在构建时将虚拟模块解析为实际文件内容。

## 功能特点

- 🚀 创建解析为实际文件内容的虚拟别名
- 🔄 支持基于项目根目录的动态解析
- ⚡ 轻量级且快速
- 🔧 开箱即用的 TypeScript 支持

## 安装

使用 npm:

```bash
npm install -D vite-plugin-virtual-alias
```

使用 yarn:

```bash
yarn add -D vite-plugin-virtual-alias
```

使用 pnpm:

```bash
pnpm add -D vite-plugin-virtual-alias
```

## 使用方法

在 `vite.config.ts` 中：

```typescript
import { defineConfig } from 'vite'
import { virtual_alias } from 'vite-plugin-virtual-alias'

export default defineConfig({
  plugins: [
    virtual_alias({
      maps: {
        // 虚拟模块路径（相对于项目根目录）=> 实际文件路径（相对于项目根目录）
        'virtual:config': 'src/config.json',
        'virtual:styles': 'src/styles/theme.css',
        // 可以映射到任何文件类型
        'virtual:content': 'content/markdown/content.md',
      },
    }),
  ],
})
```

然后在你的代码中，你可以这样导入这些虚拟模块：

```typescript
import config from 'virtual:config'
import styles from 'virtual:styles'
import content from 'virtual:content'

// 使用导入的内容
console.log(config, styles, content)
```

## 接口

### `virtual_alias(options: PluginOption): Plugin`

#### 选项

- `maps` (Record<string, string>): 一个对象，其中键是虚拟模块路径（相对于项目根目录），值是实际文件路径（相对于项目根目录）

## 工作原理

1. 插件在 Vite 插件管道的 `pre` 阶段运行
2. 当导入匹配到配置的虚拟路径之一时，插件会拦截它
3. 插件读取实际文件内容并将其作为模块内容返回
4. 如果文件不存在，构建时会抛出错误

## 许可证

MIT © [AhMisty](https://github.com/AhMisty)
