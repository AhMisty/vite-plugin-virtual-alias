export type PluginOption = {
  mappings?: PluginOptionMapping[]
}

export type PluginOptionMapping = {
  proto: string
  resolve?: string
  source?: string
}
