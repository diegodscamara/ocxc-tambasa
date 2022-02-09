import {mobileConfig, desktopConfig} from '@oracle-cx-commerce/react-widgets/cart/mini-cart/config';
import {buildResources} from '@oracle-cx-commerce/resources/utils';

import { en, pt_BR } from '@oracle-cx-commerce/resources';
import * as customEn from './locales/en'
import * as customPt_BR from './locales/pt_BR'

const widgetResourceKeys = [
  'headingMiniShoppingCart',
  'actionCheckout',
  'actionContinueShopping',
  'actionViewCart',
  'closeLinkAltText',
  'alertAddedToCart',
  'alertPriceUnavailable',
  'headingYourCart',
  'textQuantity',
  'textFreeGift',
  'textFree',
  'textSubtotal',
  'textPreOrderable',
  'textBackOrderable',
  'messageStatusPreOrder',
  'messageStatusBackOrder',
  'messageAtTheRate',
  'miniCartTitle'
];

export const TmbMiniCartDesktop = {
  name: 'TmbMiniCartDesktop',
  decription: 'Description of widget TmbMiniCartDesktop',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources: buildResources({ en: { ...en, ...customEn }, pt_BR: { ...pt_BR,...customPt_BR } }, widgetResourceKeys),
  config: desktopConfig
};

export const TmbMiniCartMobile = {
  name: 'TmbMiniCartMobile',
  decription: 'Description of widget TmbMiniCartMobile',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources: buildResources({ en: { ...en, ...customEn }, pt_BR: { ...pt_BR,...customPt_BR } }, widgetResourceKeys),
  config: mobileConfig
};
