import schemaTypes from 'all:part:@sanity/base/schema-type';
import createSchema from 'part:@sanity/base/schema-creator';
// Import custom types
import { celeb } from './celeb';
import { fact } from './fact';
import { orderOfTopics } from './orderOfTopics';
import { tag } from './tag';
import { topic } from './topic';
// Import workflow types
import workflowMetadata from './workflow/metadata';

export default createSchema({
  name: 'hollowverse',
  // types: schemaTypes.concat([author, post, release, workflowMetadata]),
  types: schemaTypes.concat([
    celeb,
    fact,
    tag,
    topic,
    orderOfTopics,
    workflowMetadata,
  ]),
});
