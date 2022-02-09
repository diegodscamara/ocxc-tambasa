import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const desktopConfigResourceKeys = [
  'configEnableMiniCartOnDesktopLabel',
  'configEnableMiniCartOnDesktopHelpText',
  'configDisplayCheckoutButtonOnMiniCartLabel',
  'configDisplayCheckoutButtonOnMiniCartHelpText',
  'configMiniCartItemsBeforeScrollingLabel',
  'configMiniCartItemsBeforeScrollingHelpText'
];

const mobileConfigResourceKeys = [
  'configDisplayCheckoutButtonOnMiniCartLabel',
  'configDisplayCheckoutButtonOnMiniCartHelpText'
];

export const desktopConfig = {
  properties: [
    {
      id: 'enableMiniCartOnDesktop',
      type: 'booleanType',
      defaultValue: true,
      labelResourceId: 'configEnableMiniCartOnDesktopLabel',
      helpTextResourceId: 'configEnableMiniCartOnDesktopHelpText',
      required: false
    },
    {
      id: 'displayCheckoutButtonOnMiniCart',
      type: 'booleanType',
      defaultValue: true,
      labelResourceId: 'configDisplayCheckoutButtonOnMiniCartLabel',
      helpTextResourceId: 'configDisplayCheckoutButtonOnMiniCartHelpText',
      required: false
    },
    {
      id: 'miniCartItemsBeforeScrolling',
      type: 'stringType',
      defaultValue: '3',
      labelResourceId: 'configMiniCartItemsBeforeScrollingLabel',
      helpTextResourceId: 'configMiniCartItemsBeforeScrollingHelpText',
      required: false
    }
  ],
  locales: buildConfigResources(resourceBundle, desktopConfigResourceKeys)
};

export const mobileConfig = {
  properties: [
    {
      id: 'displayCheckoutButtonOnMiniCart',
      type: 'booleanType',
      defaultValue: true,
      labelResourceId: 'configDisplayCheckoutButtonOnMiniCartLabel',
      helpTextResourceId: 'configDisplayCheckoutButtonOnMiniCartHelpText',
      required: false
    }
  ],
  locales: buildConfigResources(resourceBundle, mobileConfigResourceKeys)
};
