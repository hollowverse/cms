/* eslint-disable no-console */
import sanityClient from 'part:@sanity/base/client';

const client = sanityClient.withConfig({ apiVersion: '2022-03-28' });

const QUERY = `*[_type == 'celeb' && defined(facts) && migratedToTopics != true][0...100] {_id, _rev, facts}`;

const fetchDocuments = () => client.fetch(QUERY);

const buildPatches = (docs) => {
  const patches = [];

  docs.forEach((doc) => {
    doc.facts.forEach((fact) => {
      patches.push({
        id: doc._id,
        patch: {
          set: { [`facts[_key == \"${fact._key}\"].topics`]: [fact.issue] },
          unset: [`facts[_key == \"${fact._key}\"].issue`],
          // this will cause the migration to fail if any of the documents has been
          // modified since it was fetched.
          ifRevisionID: doc._rev,
        },
      });
    });

    patches.push({
      id: doc._id,
      patch: {
        set: { migratedToTopics: true },
      },
    });
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