
import {pt_BR as ptBRBundle, en as enBundle} from '@oracle-cx-commerce/resources';
import * as pt_BR from './locales/pt-BR'
import * as en from './locales/en'
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from './config';

const widgetResourceKeys = [
  'actionConfirm',
  'actionContinue',
  'actionContinueToPayment',
  'closeLinkAltText',
  'headingItemsWillBeShippedTogether',
  'labelCancel',
  'alertItemsWillBeShippedTogether',
  'alertVerifyShippingDetails'
];

const resources = buildResources({
  en: { ...enBundle, ...en },
  pt_BR: { ...ptBRBundle, ...pt_BR }
}, widgetResourceKeys)

export default TmbCheckoutContinueToPaymentButton = {
  name: 'TmbCheckoutContinueToPaymentButton',
  decription: 'Description of widget TmbCheckoutContinueToPaymentButton',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources,
  availableToAllPages: false,
  pageTypes: ['checkout-shipping'],
  config,
  requiresContext: ['cart_context', 'checkout_shipping_context'],
  actions: [
    'listShippingMethodsForCart',
    'updateCartShippingGroup',
    'createProfileAddress',
    'addOrganizationAddress',
    'notify'
  ]
};
