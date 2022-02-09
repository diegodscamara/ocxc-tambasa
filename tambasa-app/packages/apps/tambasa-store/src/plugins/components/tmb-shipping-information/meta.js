import { en as enBundle, pt_BR as pt_BR_Bundle } from '@oracle-cx-commerce/resources';
import * as pt_BR from './locales/pt-BR'
import * as en from './locales/en'
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from './config';

const widgetResourceKeys = [
  'labelEdit',
  'messageEmptyCart',
  'textShippingOption',
  'textSelectedShippingAddress',
  'headingShippingTo',
  'headingStorePickUpAt',
  'textItemDetails',
  'textItemPrice',
  'textQuantity',
  'textItemUnity',
  'textSkuID',
  'textTotal',
  'shippingSurchargeText',
  'textFreeGift',
  'textFree',
  'messageAtTheRate',
  'messageAvailableDate',
  'actionSelectItem',
  'actionSelectAll',
  'actionDeselectAll',
  'textPrice',
  'actionShowDetails',
  'actionHideDetails',
  'textSiteIcon',
  'shippingInfoLabel',
  'paymentHeadingText'
];

const resources = buildResources({
  en: { ...enBundle, ...en },
  pt_BR: { ...pt_BR_Bundle, ...pt_BR }
}, widgetResourceKeys)
 
export default TmbShippingInformation = {
  name: 'TmbShippingInformation',
  decription: 'Description of widget TmbShippingInformation',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources,
  availableToAllPages: false,
  pageTypes: ['profile', 'checkout', 'checkout-review-order', 'checkout-payment'],
  config
};