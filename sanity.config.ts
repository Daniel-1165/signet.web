import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in environment. Add it to .env.local or your deployment env settings.')
}

export default defineConfig({
  name: 'default',
  title: 'Signet Web CMS',
  projectId,
  dataset,
  plugins: [
    structureTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
