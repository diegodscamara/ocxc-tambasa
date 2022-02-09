import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = ['numberOfSearchResultsToLoadLabel', 'numberOfSearchResultsToLoadHelpText'];

const config = {
  properties: [
    {
      id: 'numberOfSearchResultsToLoad',
      type: 'stringType',
      labelResourceId: 'numberOfSearchResultsToLoadLabel',
      helpTextResourceId: 'numberOfSearchResultsToLoadHelpText',
      defaultValue: '5',
      required: true,
      pattern: '^[0-9]*$'
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
};

export default config;
