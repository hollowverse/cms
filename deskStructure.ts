import S from '@sanity/desk-tool/structure-builder';

export default () =>
  S.list()
    .title('Document types')
    .items([
      ...S.documentTypeListItems().filter((listItem) => {
        if (['orderOfIssues', 'media.tag'].includes(listItem.getId())) {
          return false;
        }

        return true;
      }),
      S.divider(),
      S.listItem()
        .title('Order of issues')
        .child(
          S.editor()
            .title('Order of issues')
            .schemaType('orderOfIssues')
            .documentId('orderOfIssues'),
        ),
    ]);
