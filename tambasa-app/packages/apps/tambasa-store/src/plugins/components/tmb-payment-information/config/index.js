import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = [
  'configDisplayBillToNameLabel',
  'configShowEditLinkLabel',
  'configShowEditPaymentLinkHelpText'
];

const config = {
  properties: [
    {
      id: 'showEditLink',
      type: 'booleanType',
      labelResourceId: 'configShowEditLinkLabel',
      helpTextResourceId: 'configShowEditPaymentLinkHelpText',
      defaultValue: false
    },
    {
      id: 'displayBillToName',
      type: 'booleanType',
      labelResourceId: 'configDisplayBillToNameLabel',
      defaultValue: false
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
};

export default config; 