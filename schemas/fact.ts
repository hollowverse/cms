const isNotQuoteType = ({ parent }) => parent?.type !== 'quote';
const isNotFactType = ({ parent }) => parent?.type !== 'fact';

export const fact = {
  title: 'Fact',

  name: 'fact',

  type: 'object',

  fields: [
    {
      title: 'Date',
      name: 'date',
      description: 'When did this fact happen?',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Source',
      name: 'source',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Forum link',
      name: 'forumLink',
      type: 'url',
      description: 'The link to the forum post where the Fact was submitted',
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Quote', value: 'quote' },
          { title: 'Fact', value: 'fact' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Context',
      description: 'In what context did they say that?',
      name: 'context',
      type: 'string',
      hidden: isNotQuoteType,
      validation: (Rule) =>
        Rule.custom((duration, context) => {
          return context.parent.type === 'quote' ? Rule.required() : true;
        }),
    },

    {
      title: 'Quote',
      name: 'quote',
      type: 'text',
      hidden: isNotQuoteType,
    },

    {
      title: 'Content',
      name: 'content',
      type: 'text',
      hidden: isNotFactType,
    },

    {
      title: 'Issue',
      name: 'issue',
      type: 'reference',
      description: 'What is the ideological issue that this FACT is about?',
      to: [{ type: 'issue' }],
    },

    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }],
        },
      ],
    },
  ],
};
