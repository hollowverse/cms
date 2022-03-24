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

    {
      title: 'Incompatible tags',
      name: 'incompatibleTags',
      type: 'array',
      description:
        'What tags are incompatible with this tag? For example, atheist and agnostic are incompatible with religious',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }],
        },
      ],
    },
  ],
};
