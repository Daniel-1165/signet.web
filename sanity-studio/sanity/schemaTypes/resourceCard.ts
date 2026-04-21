import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resourceCard',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Magazine', value: 'Magazine'},
          {title: 'Book', value: 'Book'},
          {title: 'Article', value: 'Article'},
          {title: 'Design', value: 'Design'}
        ],
      }
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail / Cover Image',
      type: 'image',
      description: 'Used for Book covers, Design previews, etc.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'resourceFile',
      title: 'Resource File (PDF / Document)',
      type: 'file',
      description: 'Upload PDF for books or magazines',
    }),
    defineField({
      name: 'content',
      title: 'Write-up / Article Content',
      type: 'text',
      description: 'Write up for designs, or text content for articles',
    }),
  ],
})
