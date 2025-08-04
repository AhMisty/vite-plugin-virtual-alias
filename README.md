# Vite Plugin Virtual Alias

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![中文](https://img.shields.io/badge/中文-ZH-blue)](./docs/zh-CN/README.zh-CN.md)

A Vite plugin that provides virtual module aliasing with file content resolution, allowing you to create virtual modules that resolve to actual file contents at build time.

## Features

- 🚀 Create virtual module aliases that resolve to actual file contents
- 🔄 Supports dynamic resolution based on project root
- ⚡ Lightweight and fast
- 🔧 TypeScript support out of the box

## Installation

Using npm:

```bash
npm install -D vite-plugin-virtual-alias
```

Using yarn:

```bash
yarn add -D vite-plugin-virtual-alias
```

Using pnpm:

```bash
pnpm add -D vite-plugin-virtual-alias
```

## Usage

In your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import { virtual_alias } from 'vite-plugin-virtual-alias'

export default defineConfig({
  plugins: [
    virtual_alias({
      maps: {
        // Virtual module path (relative to project root) => Actual file path (relative to project root)
        'virtual:config': 'src/config.json',
        'virtual:styles': 'src/styles/theme.css',
        // You can map to any file type
        'virtual:content': 'content/markdown/content.md',
      },
    }),
  ],
})
```

Then in your code, you can import these virtual modules:

```typescript
import config from 'virtual:config'
import styles from 'virtual:styles'
import content from 'virtual:content'

// Use the imported content
console.log(config, styles, content)
```

## API

### `virtual_alias(options: PluginOption): Plugin`

#### Options

- `maps` (Record<string, string>): An object where keys are virtual module paths (relative to project root) and values are actual file paths (relative to project root)

## How It Works

1. The plugin runs in the `pre` phase of Vite's plugin pipeline
2. When an import matches one of the configured virtual paths, the plugin intercepts it
3. The plugin reads the actual file content and returns it as the module content
4. If the file doesn't exist, an error is thrown during build

## License

MIT © [AhMisty](https://github.com/AhMisty)
