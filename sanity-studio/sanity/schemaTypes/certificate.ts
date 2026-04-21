import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
      description: 'The exact username or full name of the user to match against their search.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'certificateFile',
      title: 'Certificate File',
      type: 'file',
      options: {
        accept: 'application/pdf,image/*',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'issueDate',
      title: 'Issue Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'courseName',
      title: 'Course / Program Name',
      type: 'string',
      initialValue: 'Signet Mentoring Program'
    }),
  ],
  preview: {
    select: {
      title: 'username',
      subtitle: 'courseName',
    },
  },
});
