import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = ['configSearchServicePathHelpText', 'configSearchServicePathLabel'];

const config = {
  properties: [
    {
      id: 'searchServicePath',
      type: 'stringType',
      name: 'searchServicePath',
      helpTextResourceId: 'configSearchServicePathHelpText',
      labelResourceId: 'configSearchServicePathLabel',
      defaultValue: null
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
};

export default config;
