export const tag = {
  title: 'Tag',

  name: 'tag',

  type: 'document',

  fields: [
    {
      title: 'Tag',
      name: 'tag',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Issue',
      name: 'issue',
      description: 'What is the ideological issue that this TAG is about?',
      type: 'reference',
      to: [{ type: 'issue' }],
    },
  ],
};
