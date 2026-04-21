import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resource Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'tag', title: 'Tag', type: 'string', description: "e.g. 'Feature', 'Guide', 'Deep Dive'" }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'readTime', title: 'Read Time', type: 'string', description: "e.g. '5 min read'" }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'accentColor', title: 'Accent Color', type: 'string', description: 'Hex code (e.g. #1DA756)' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
  ],
})
