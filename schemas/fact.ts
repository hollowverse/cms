const isNotQuoteType = ({ parent }) => parent?.type !== 'quote';
const isNotFactType = ({ parent }) => parent?.type !== 'fact';
const requiredForType = (type: 'quote' | 'fact') => (Rule) =>
  Rule.custom((field, context) => {
    return context.parent.type === type && field === undefined
      ? 'This field must not be empty'
      : true;
  });

export const fact = {
  title: 'Fact',

  name: 'fact',

  type: 'object',

  fields: [
    {
      title: 'Date added',
      name: 'dateAdded',
      type: 'datetime',
      readOnly: true,
      initialValue: new Date().toISOString(),
    },

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
      validation: requiredForType('quote'),
    },

    {
      title: 'Quote',
      name: 'quote',
      type: 'text',
      hidden: isNotQuoteType,
      validation: requiredForType('quote'),
    },

    {
      title: 'Content',
      name: 'content',
      type: 'text',
      hidden: isNotFactType,
      validation: requiredForType('fact'),
    },

    {
      title: 'Topic',
      name: 'topic',
      type: 'reference',
      description: 'What is the ideological topic that this FACT is about?',
      to: [{ type: 'topic' }],
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
