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
      title: 'Topic',
      name: 'topic',
      description: 'What is the ideological topic that this TAG is about?',
      type: 'reference',
      to: [{ type: 'topic' }],
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
