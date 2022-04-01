import { client, migrate } from './helpers';

const fetchDocuments = () =>
  client.fetch(`*[_type == 'tag' && defined(tag)][0...100] {_id, _rev, tag}`);

const buildMutations = (docs) => {
  const mutations = [];

  docs.forEach((doc) => {
    mutations.push({
      id: doc._id,
      patch: {
        set: { name: doc.tag },
        unset: ['tag'],
        ifRevisionID: doc._rev,
      },
    });
  });

  return mutations;
};

migrate(fetchDocuments, buildMutations, true);
