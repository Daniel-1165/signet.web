import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'carouselSlide',
  title: 'Carousel Slide',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption (optional)',
      type: 'string',
      description: 'A short caption or title for this slide',
    }),
    defineField({
      name: 'link',
      title: 'Link (optional)',
      type: 'url',
      description: 'Where this slide links to when clicked',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'image',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Untitled Slide',
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
