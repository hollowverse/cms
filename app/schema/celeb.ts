export const celeb = {
  title: 'Celebrity',

  name: 'celeb',

  type: 'document',

  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },

    {
      title: 'Picture',
      name: 'picture',
      type: 'image',
      options: {
        hotspot: true,
      },
    },

    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
    },

    {
      title: 'Discourse Topic ID',
      name: 'discourseTopicId',
      type: 'number',
    },

    {
      title: 'Pronoun',
      name: 'pronoun',
      type: 'string',
      options: {
        list: [
          { title: 'He', value: 'he' },
          { title: 'She', value: 'she' },
          { title: 'They', value: 'they' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },

    {
      title: 'Date of birth',
      name: 'dob',
      type: 'date',
    },

    {
      title: 'Facts',
      name: 'facts',
      type: 'array',
      of: [{ type: 'fact' }],
    },

    {
      title: 'Old content',
      name: 'oldContent',
      type: 'text',
      readOnly: true,
      hidden: true,
    },

    {
      title: 'Wikipedia ID',
      name: 'wikipediaId',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
  ],
};