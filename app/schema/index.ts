import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Import workflow types
import workflowMetadata from './workflow/metadata';

// Import custom types
import { celeb } from './celeb';
import { fact } from './fact';
import { tag } from './tag';
import { topic } from './topic';
import { orderOfTopics } from './orderOfTopics';
import author from './author';

export default createSchema({
  name: 'hollowverse',
  // types: schemaTypes.concat([author, post, release, workflowMetadata]),
  types: schemaTypes.concat([
    author,
    celeb,
    fact,
    tag,
    topic,
    orderOfTopics,
    workflowMetadata,
  ]),
});
