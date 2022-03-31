import sanityClient from 'part:@sanity/base/client';

const client = sanityClient.withConfig({ apiVersion: '2022-03-28' });

const SOURCE_TYPE = 'issue';
const TARGET_TYPE = 'topic';

const fetchDocuments = () =>
  client.fetch(`*[_type == $oldType && cloned != true][0...10]`, {
    oldType: SOURCE_TYPE,
  });

const buildMutations = (docs) => {
  const mutations = [];

  docs.forEach((doc) => {
    console.log(SOURCE_TYPE, doc._id);
    const newDocId = `${doc._id}-m`;
    const newDocument = { ...doc, ...{ _id: newDocId, _type: TARGET_TYPE } };
    delete newDocument._rev;

    mutations.push({ create: newDocument });
    mutations.push({
      id: doc._id,
      patch: {
        set: { cloned: true },
      },
    });
  });

  return mutations;
};

const createTransaction = (mutations) => {
  return mutations.reduce((tx, mutation) => {
    if (mutation.patch) {
      return tx.patch(mutation.id, mutation.patch);
    }
    if (mutation.create) {
      return tx.createIfNotExists(mutation.create);
    }
  }, client.transaction());
};

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  if (documents.length === 0) {
    console.log('No more documents to migrate!');
    return null;
  }
  const mutations = buildMutations(documents);
  const transaction = createTransaction(mutations);
  await transaction.commit();
  return migrateNextBatch();
};

migrateNextBatch().catch((err) => {
  console.log('err', err);
  process.exit(1);
});
