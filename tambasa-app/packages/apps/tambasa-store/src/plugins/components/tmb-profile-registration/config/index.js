import * as resourceBundle from '@oracle-cx-commerce/resources';
import { buildConfigResources } from '@oracle-cx-commerce/resources/utils';
import { mergeDefaultConfig } from '@oracle-cx-commerce/react-widgets/config';

const configResourceKeys = [
  'configDefaultAutoLoginSuccessPageLabel',
  'configDefaultAutoLoginSuccessPageHelpText',
  'configNoteHelpLabel',
  'configNoteHelpText'
];

const config = mergeDefaultConfig({
  properties: [
    {
      id: 'defaultAutoLoginSuccessPage',
      type: 'stringType',
      labelResourceId: 'configDefaultAutoLoginSuccessPageLabel',
      helpTextResourceId: 'configDefaultAutoLoginSuccessPageHelpText'
    },
    {
      id: 'helpTextTitle',
      type: 'sectionTitleType',
      labelResourceId: 'configNoteHelpLabel',
      helpTextResourceId: 'configNoteHelpText'
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
});
export default config;
