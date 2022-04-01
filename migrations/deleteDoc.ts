import { client, migrate } from './helpers';

const fetchDocuments = () => client.fetch(`*[_type == 'issue'][0...100]`);
// client.fetch(
//   `*[_id == 'workflow-metadata.04a824fd-b98e-4e00-83af-e3ffedb1f2b3']`,
// );

const buildMutations = (docs: any) => {
  const mutations = [];

  docs.forEach((d) => {
    mutations.push({
      delete: d._id,
    });
  });

  return mutations;
};

migrate(fetchDocuments, buildMutations);
