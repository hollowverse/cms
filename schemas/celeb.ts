import { sanityClient } from '../lib/client';
import { isString } from 'lodash-es';

export const celeb = {
  title: 'Celebrity',

  name: 'celeb',

  type: 'document',

  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Picture',
      name: 'picture',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Knowledge Graph ID',
      name: 'knowledgeGraphId',
      type: 'string',
      validation: (Rule) =>
        Rule.custom(async (field, context) => {
          if (!isString(field) || field.length < 1) {
            return 'This field is required.';
          }

          const response = await sanityClient.fetch(
            `*[
                _type == 'celeb' &&
                knowledgeGraphId == '${field}'
              ][0]{name, _id}`,
          );

          if (
            response &&
            response.name &&
            response._id !== context.parent._id &&
            `drafts.${response._id}` !== context.parent._id
          ) {
            return `This field has to be unique. Your value is currently being used in ${response.name}`;
          }

          return true;
        }),
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
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Date of birth',
      name: 'dob',
      type: 'date',
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
