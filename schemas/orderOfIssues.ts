export const orderOfIssues = {
  title: 'Order of issues',

  name: 'orderOfIssues',

  type: 'document',

  fields: [
    {
      name: 'issues',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'issue' }],
        },
      ],
    },
  ],
};
