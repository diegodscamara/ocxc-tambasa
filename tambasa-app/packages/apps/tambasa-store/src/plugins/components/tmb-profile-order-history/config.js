import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = [
  'configDisplayStatusBarLabel',
  'configDisplayStatusBarHelpText',
  'configDisplayThumbnailsLabel',
  'configDisplayThumbnailsHelpText',
  'configNumberOfMostRecentOrdersLabel'
];

const config = {
  properties: [
    {
      id: 'displayStatusBar',
      type: 'booleanType',
      labelResourceId: 'configDisplayStatusBarLabel',
      helpTextResourceId: 'configDisplayStatusBarHelpText',
      defaultValue: true
    },
    {
      id: 'displayThumbnails',
      type: 'booleanType',
      labelResourceId: 'configDisplayThumbnailsLabel',
      helpTextResourceId: 'configDisplayThumbnailsHelpText',
      defaultValue: true
    },
    {
      id: 'numberOfOrderToLoad',
      type: 'stringType',
      labelResourceId: 'configNumberOfMostRecentOrdersLabel',
      defaultValue: '10',
      pattern: '^[0-9]*$'
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
};

export default config;
