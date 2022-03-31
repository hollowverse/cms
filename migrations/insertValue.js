import sanityClient from 'part:@sanity/base/client';

const client = sanityClient.withConfig({ apiVersion: '2022-03-28' });

const fetchDocuments = () =>
  client.fetch(`*[_id == 'E14LTzHgErlS4wrVKRvMLd' && _type == $type]`, {
    type: 'celeb',
  });

const buildMutations = (docs) => {
  const mutations = [];

  docs.forEach((doc) => {
    if (doc.facts) {
      mutations.push({
        id: doc._id,
        patch: {
          set: {
            facts: doc.facts.map((f) => {
              return {
                ...f,
                topics: f.topics.map((t) => {
                  return {
                    ...t,
                    _key: Math.random().toString(36).slice(2),
                  };
                }),
              };
            }),
          },
        },
      });
    }
  });

  return mutations.filter(Boolean);
};

const createTransaction = (mutations) => {
  return mutations.reduce((tx, mutation) => {
    if (mutation.patch) {
      return tx.patch(mutation.id, mutation.patch);
    }
    if (mutation.delete) {
      return tx.delete(mutation.delete);
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

  console.log(
    `Migrating batch:\n %s`,
    mutations
      .map((patch) => `${patch.id} => ${JSON.stringify(patch.patch)}`)
      .join('\n'),
  );

  const transaction = createTransaction(mutations);
  await transaction.commit();
  // return migrateNextBatch();
};

migrateNextBatch().catch((err) => {
  console.log(err);
  process.exit(1);
});
