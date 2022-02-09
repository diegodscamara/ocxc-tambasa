import { en, pt_BR } from '@oracle-cx-commerce/resources';

import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';

const configResourceKeys = [
  'configNumberOfSuggestionsHelpText',
  'configNumberOfSuggestionsLabel',
  'configPersistSearchTermHelpText',
  'configPersistSearchTermLabel'
];

const config = mergeDefaultConfig({
  properties: [
    {
      id: 'persistSearchTerm',
      type: 'booleanType',
      name: 'persistSearchTerm',
      helpTextResourceId: 'configPersistSearchTermHelpText',
      labelResourceId: 'configPersistSearchTermLabel',
      defaultValue: true
    },
    {
      id: 'numberOfSuggestions',
      type: 'stringType',
      name: 'numberOfSuggestions',
      helpTextResourceId: 'configNumberOfSuggestionsHelpText',
      labelResourceId: 'configNumberOfSuggestionsLabel',
      defaultValue: '5',
      required: true
    }
  ],
  locales: buildConfigResources({ en, pt_BR }, configResourceKeys)
});

export default config;
