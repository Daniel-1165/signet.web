import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'newsletterSubscription',
  title: 'Newsletter Subscription',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Subscriber Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
