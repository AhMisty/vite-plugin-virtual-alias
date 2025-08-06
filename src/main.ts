import type { Plugin } from 'vite'
import path from 'node:path'
import { promises as fs } from 'node:fs'
import { PluginOption } from './types'

export const constants = {
  name: 'vite-plugin-virtual-alias',
}

export const virtualAlias = (option?: PluginOption): Plugin => {
  if (!option || option.mappings?.length === 0) return { name: constants.name }
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
      const mapping = option?.mappings?.find((mapping) => mapping.proto === relativeId)
      if (!mapping) return null
      if (mapping.resolve) return path.join(current.projectRoot, mapping.resolve)
      return id
    },
    async load(id: string) {
      if (!current.projectRoot) return null
      const relativeId = path.relative(current.projectRoot, id).replace(/\\/g, '/')
      const mapping = option?.mappings?.find((mapping) => mapping.proto === relativeId)
      if (!mapping) return null
      if (mapping.source) return await fs.readFile(mapping.source, 'utf-8')
      return null
    },
  }
}
