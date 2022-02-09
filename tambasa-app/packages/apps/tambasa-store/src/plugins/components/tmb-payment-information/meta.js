import { en as enBundle, pt_BR as pt_BR_Bundle } from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';

import * as pt_BR from './locales/pt-BR'
import * as en from './locales/en'
import config from './config';

const widgetResourceKeys = [
  'actionProceedToPayment',
  'textGiftCard',
  'textBillingAddress',
  'labelEdit',
  'textAdditionalPaymentInformationNeeded',
  'textExpiryDate',
  'textOrderPendingPayment',
  'textPayInStore',
  'textInvoice',
  'textPONumber',
  'textPayAfterApproval',
  'textPayOnline',
  'paymentHeadingText'
];

const resources = buildResources({
  en: { ...enBundle, ...en },
  pt_BR: { ...pt_BR_Bundle, ...pt_BR }
}, widgetResourceKeys)

export default TmbPaymentInformation = {
  name: 'TmbPaymentInformation',
  decription: 'Description of widget TmbPaymentInformation',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources,
  availableToAllPages: false,
  pageTypes: ['profile', 'checkout', 'checkout-review-order', 'checkout-payment'],
  config
};
