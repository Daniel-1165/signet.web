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
      name: 'title',
      title: 'Title (optional)',
      type: 'string',
      description: 'The main headline for this slide',
    }),
    defineField({
      name: 'tag',
      title: 'Tag (optional)',
      type: 'string',
      description: 'A small label appearing above the title (e.g., GROWTH SERIES)',
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
      title: 'title',
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
