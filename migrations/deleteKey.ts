import { client, migrate } from './helpers';

const fetchDocuments = () =>
  client.fetch(
    `*[_type == 'tag' && defined(incompatibleTags)][0...100] {_id, _rev}`,
  );

const buildMutations = (docs) =>
  docs.map((doc) => ({
    id: doc._id,
    patch: {
      unset: ['incompatibleTags'],
      ifRevisionID: doc._rev,
    },
  }));

migrate(fetchDocuments, buildMutations);
