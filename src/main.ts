import type { Plugin } from 'vite'
import path from 'node:path'
import { promises as fs } from 'node:fs'

export const constants = {
  name: 'vite-plugin-virtual-alias',
}

export type PluginOption = {
  maps?: Record<string, string>
}

export const virtual_alias = (options: PluginOption): Plugin => {
  const { maps } = options
  if (!maps || Object.keys(maps).length === 0) return { name: constants.name }
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
      if (!maps[relativeId]) return null
      return id
    },
    async load(id: string) {
      if (!current.projectRoot) return null
      const relativeId = path.relative(current.projectRoot, id).replace(/\\/g, '/')
      const sourceFile = maps[relativeId]
      if (!sourceFile) return null
      const absoluteSourcePath = path.resolve(current.projectRoot, sourceFile)
      try {
        return await fs.readFile(absoluteSourcePath, 'utf-8')
      } catch (error) {
        this.error(`Could not read the source file '${sourceFile}' for alias '${relativeId}'.`)
        this.error(error as Error)
      }
    },
  }
}
