import type { Plugin } from 'vite'
import path from 'node:path'
import { promises as fs } from 'node:fs'
import { PluginOptions } from './types'

export const constants = {
  name: 'vite-plugin-virtual-alias',
}

export const virtual_alias = (options: PluginOptions): Plugin => {
  if (!options || options.length === 0) return { name: constants.name }
  const current = {
    projectRoot: '',
  }
  return {
    name: constants.name,
    enforce: 'pre',
    configResolved(resolvedConfig) {
      current.projectRoot = resolvedConfig.root
    },
    resolveId(id: string) {
      if (!current.projectRoot) return null
      const relativeId = path.relative(current.projectRoot, id).replace(/\\/g, '/')
      const option = options.find((option) => option.proto === relativeId)
      if (!option) return null
      if (option.resolve) return path.join(current.projectRoot, option.resolve)
      return id
    },
    async load(id: string) {
      if (!current.projectRoot) return null
      const relativeId = path.relative(current.projectRoot, id).replace(/\\/g, '/')
      const option = options.find((option) => option.proto === relativeId)
      if (!option) return null
      if (option.source) return await fs.readFile(option.source, 'utf-8')
      return null
    },
  }
}
