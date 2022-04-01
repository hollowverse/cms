import { client, migrate } from './helpers';

/* eslint-disable no-console */
const fetchDocuments = () =>
  client.fetch(
    `*[_type == 'celeb' && defined(pronoun) && slug.current == 'martin-freeman][0...100] {_id, _rev}`,
  );

const buildMutations = (docs) =>
  docs.map((doc) => ({
    id: doc._id,
    patch: {
      unset: ['pronoun'],
      // this will cause the migration to fail if any of the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev,
    },
  }));

migrate(fetchDocuments, buildMutations);
