import {createClient} from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-04-07',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

export const isConfigured = () => {
  return projectId && projectId !== '' && projectId !== 'placeholder-project-id'
}

export const sanityFetch = async ({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}) => {
  try {
    const data = await client.fetch(query, params, {
      next: {
        revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0,
        tags,
      },
    })
    return data
  } catch (error) {
    console.error('Sanity fetch error:', error)
    throw error
  }
}
