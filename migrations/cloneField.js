/* eslint-disable no-console */
import sanityClient from 'part:@sanity/base/client';

const client = sanityClient.withConfig({ apiVersion: '2022-03-28' });

const fetchDocuments = () =>
  client.fetch(
    `*[_id == 'E14LTzHgErlS4wrVKRvMLd' && _type == 'celeb' && !defined(issue)][0...100] {_id, _rev, facts}`,
  );

const buildPatches = (docs) => {
  const patches = [];

  docs.forEach((doc) => {
    if (doc.facts) {
      patches.push({
        id: doc._id,
        patch: {
          set: {
            facts: doc.facts.map((f) => ({
              ...f,
              issue: f.topics[0],
            })),
          },
          ifRevisionID: doc._rev,
        },
      });
    }
  });

  return patches;
};

const createTransaction = (patches) =>
  patches.reduce(
    (tx, patch) => tx.patch(patch.id, patch.patch),
    client.transaction(),
  );

const commitTransaction = (tx) => tx.commit();

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const patches = buildPatches(documents);
  if (patches.length === 0) {
    console.log('No more documents to migrate!');
    return null;
  }
  console.log(
    `Migrating batch:\n %s`,
    patches
      .map((patch) => `${patch.id} => ${JSON.stringify(patch.patch)}`)
      .join('\n'),
  );
  const transaction = createTransaction(patches);
  await commitTransaction(transaction);
  return migrateNextBatch();
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
