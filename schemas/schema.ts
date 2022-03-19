import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';
import { celeb } from './celeb';
import { fact } from './fact';
import { issue } from './issue';

export default createSchema({
  name: 'hollowverse',

  types: schemaTypes.concat([celeb, fact, issue]),
});
