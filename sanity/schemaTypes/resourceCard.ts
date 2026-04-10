import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resourceCard',
  title: 'Resource Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category (Magazine, Book, Articles, Designs)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Background/Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'color',
      title: 'Theme Color (Tailwind class)',
      type: 'string',
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name (Lucide string mapping)',
      type: 'string',
    }),
  ],
})
