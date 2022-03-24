import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';
import { celeb } from './celeb';
import { fact } from './fact';
import { issue } from './issue';
import { tag } from './tag';
import { orderOfIssues } from './orderOfIssues';
// import { wildCard } from './wildCard';

export default createSchema({
  name: 'hollowverse',

  types: schemaTypes.concat([celeb, fact, tag, issue, orderOfIssues]),
});
