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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
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
          {title: 'Design', value: 'Design'},
          {title: 'Image', value: 'Image'}
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
    }),
    defineField({
      name: 'content',
      title: 'Write-up / Article Content',
      type: 'blockContent',
      description: 'Rich text content for articles (highly recommended over plain text)',
    }),
  ],
})
