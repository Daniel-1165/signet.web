import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Designation',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company / Organization',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Testimonial Content',
      type: 'text',
      description: 'The written feedback from the client.',
    }),
    defineField({
      name: 'testimonialImage',
      title: 'Full Testimonial Image Card',
      description: 'Upload an image that shows the testimonial. If present, this will be displayed instead of the text content.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'avatar',
      title: 'Author Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'Show this testimonial on the homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'avatar',
    },
  },
})
