import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = ['configMultiSelectModeHelpText', 'configMultiSelectModeLabel'];

const mobileConfig = {
  properties: [
    {
      id: 'multiSelectMode',
      type: 'booleanType',
      name: 'multiSelectMode',
      helpTextResourceId: 'configMultiSelectModeHelpText',
      labelResourceId: 'configMultiSelectModeLabel',
      defaultValue: true
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
};

export default mobileConfig;
