import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = ['labelTextCookiePolicyURL', 'webContentLabel'];

const config = {
  properties: [
    {
      id: 'cookiePolicyURL',
      type: 'stringType',
      labelResourceId: 'labelTextCookiePolicyURL',
      defaultValue: ''
    },
    {
      id: 'webContent',
      type: 'webContentType',
      labelResourceId: 'webContentLabel',
      defaultValue: '<p>Some Web Content Text</p>'
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
};

export default config;
