import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Signet Web CMS',
  projectId: 'et3ud76d',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
