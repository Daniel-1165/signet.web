import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'feedInterrupt',
  title: 'Feed Interrupt',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Internal Title', type: 'string' }),
    defineField({ 
      name: 'interruptType', 
      title: 'Interrupt Type', 
      type: 'string',
      options: { list: ['spotlight', 'shelf', 'banner'] },
      validation: Rule => Rule.required()
    }),
    defineField({ name: 'insertAfter', title: 'Insert After Position', type: 'number', validation: Rule => Rule.required().min(0) }),
    defineField({ name: 'isActive', title: 'Is Active', type: 'boolean', initialValue: true }),
    
    // Conditional fields
    defineField({ name: 'headline', title: 'Headline', type: 'string', hidden: ({parent}) => parent?.interruptType === 'shelf' }),
    defineField({ name: 'subtext', title: 'Subtext', type: 'text', hidden: ({parent}) => parent?.interruptType === 'shelf' }),
    defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string', hidden: ({parent}) => parent?.interruptType === 'shelf' }),
    defineField({ name: 'ctaUrl', title: 'CTA URL', type: 'url', hidden: ({parent}) => parent?.interruptType === 'shelf' }),
    defineField({ name: 'label', title: 'Spotlight Label', type: 'string', hidden: ({parent}) => parent?.interruptType !== 'spotlight' }),
    defineField({ name: 'accentColor', title: 'Accent Color', type: 'string', description: 'Hex code (e.g. #1DA756 or #0dcaf0)', hidden: ({parent}) => parent?.interruptType === 'shelf' }),
    
    defineField({ name: 'shelfLabel', title: 'Shelf Label', type: 'string', hidden: ({parent}) => parent?.interruptType !== 'shelf' }),
    defineField({ 
      name: 'tiles', 
      title: 'Shelf Tiles', 
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'emoji', type: 'string', title: 'Emoji' },
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'subtitle', type: 'string', title: 'Subtitle' },
          { name: 'url', type: 'url', title: 'URL' }
        ]
      }],
      hidden: ({parent}) => parent?.interruptType !== 'shelf' 
    }),
  ]
})
