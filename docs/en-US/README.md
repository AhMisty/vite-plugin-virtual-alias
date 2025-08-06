# Vite Plugin Virtual Alias

[![npm version](https://img.shields.io/npm/v/vite-plugin-virtual-alias.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-virtual-alias)
[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg?style=flat-square)](https://github.com/AhMisty/vite-plugin-virtual-alias/blob/main/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/vite-plugin-virtual-alias.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-virtual-alias)

<span style="color: #999">English</span> | [中文](../zh-CN/README.md)

A lightweight Vite plugin that provides powerful virtual alias functionality, allowing you to map custom virtual paths to actual files in your project during the build process.

## 📦 Installation

Install with your favorite package manager:

```bash
# Using npm
npm install -D vite-plugin-virtual-alias

# Using yarn
yarn add -D vite-plugin-virtual-alias

# Using pnpm
pnpm add -D vite-plugin-virtual-alias
```

## 🚀 Basic Usage

### Configuration

Add the plugin to your Vite configuration:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { virtualAlias } from 'vite-plugin-virtual-alias'

export default defineConfig({
  plugins: [
    virtualAlias({
      mappings: [
        {
          // Virtual path
          proto: 'virtual:config.ts',
          // Mapped path
          resolve: 'path/to/your/custom/config.alias.ts',
          // or
          // source: 'path/to/your/custom/config.alias.ts',
        },
      ],
    }),
  ],
})
```

### Example Usage

After configuration, you can use the virtual alias in your code:

```typescript
// Import using virtual alias
import config from 'virtual:config.ts'

console.log(config) // Will be resolved to path/to/your/custom/config.alias.ts
```

## 🔍 How It Works

- **resolve**: Uses Vite's `resolveId` hook for path mapping, which affects the built file names
- **source**: Uses the `load` hook to directly return file content, keeping the original file names

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

[MIT](https://github.com/AhMisty/vite-plugin-virtual-alias/blob/main/LICENSE) © [AhMisty](https://github.com/AhMisty)
