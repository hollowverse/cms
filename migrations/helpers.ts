import sanityClient from 'part:@sanity/base/client';

export const client = sanityClient.withConfig({
  apiVersion: '2022-03-28',
  dataset: process.env.PROD !== undefined ? 'production' : 'staging',
});

export const createTransaction = (mutations) => {
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

export const migrate = async (
  fetchDocuments: () => any,
  buildMutations: (docs: any) => any[],
  runOnce = false,
) => {
  const migrateNextBatch = async () => {
    const documents = await fetchDocuments();

    if (!Array.isArray) {
      throw new Error('Returned docs not array');
    }

    if (documents.length === 0) {
      console.log('No more documents to migrate!');
      return null;
    }
    const mutations = buildMutations(documents);

    console.log(
      `Migrating batch:\n\n %s`,
      mutations.map((mutation) => `${JSON.stringify(mutation)}`).join('\n\n'),
    );

    const transaction = createTransaction(mutations);
    await transaction.commit();

    if (runOnce) {
      return;
    }

    return migrateNextBatch();
  };

  migrateNextBatch().catch((err) => {
    console.log(err);
    process.exit(1);
  });
};
