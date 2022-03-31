import S from '@sanity/desk-tool/structure-builder';
import { BsChatDots, BsFilePerson, BsGear, BsHash } from 'react-icons/bs';
import { workflowListItems } from './workflow';

const listItems = [
  { schema: 'celeb', title: 'Celebrities', icon: BsFilePerson },
  { schema: 'tag', title: 'Tags', icon: BsHash },
  { schema: 'topic', title: 'Topics', icon: BsChatDots },
];

const docTypeListItems = listItems.map(({ schema, title, icon }) =>
  S.documentTypeListItem(schema).icon(icon).title(title),
);

export default () =>
  S.list()
    .title('Content')
    .items([
      ...workflowListItems,
      S.divider(),
      ...docTypeListItems,
      S.divider(),
      S.listItem()
        .title('Settings')
        .icon(BsGear)
        .child(
          S.list()
            .title('Items')
            .items([
              S.listItem()
                .title('Order of topics')
                .child(
                  S.editor()
                    .title('Order of topics')
                    .schemaType('orderOfTopics')
                    .documentId('orderOfTopics'),
                ),
            ]),
        ),
    ]);
