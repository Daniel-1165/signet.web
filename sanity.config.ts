import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemaTypes'

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID = 'placeholder-project-id',
  NEXT_PUBLIC_SANITY_DATASET = 'production',
} = process.env

export default defineConfig({
  name: 'default',
  title: 'Signet Web CMS',
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
