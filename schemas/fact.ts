import { v4 as uuid } from 'uuid';

const isNotQuote = ({ parent }) => parent?.type !== 'quote';

export const fact = {
  title: 'Fact',

  name: 'fact',

  type: 'object',

  fields: [
    {
      title: 'Date',
      name: 'date',
      description: 'When did this fact happen?',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'ID',
      name: 'id',
      type: 'string',
      readOnly: true,
      initialValue: () => uuid(),
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Source',
      name: 'source',
      type: 'url',
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
      description: 'When did they say that?',
      name: 'context',
      type: 'string',
      hidden: isNotQuote,
      validation: (Rule) =>
        Rule.custom((duration, context) => {
          console.log('context', context);
          return context.parent.type === 'quote' ? Rule.required() : true;
        }),
    },

    {
      title: 'Quote',
      name: 'quote',
      type: 'text',
      hidden: isNotQuote,
    },

    {
      title: 'Issue',
      name: 'issue',
      type: 'reference',
      to: [{ type: 'issue' }],
    },
  ],
};
