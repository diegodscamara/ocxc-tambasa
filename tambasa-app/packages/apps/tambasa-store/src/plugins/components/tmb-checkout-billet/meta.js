import {buildResources} from '@oracle-cx-commerce/resources/utils';
import * as en from './locales/en'
import * as pt_BR from './locales/pt-BR'
 
const widgetResourceKeys = [
  'bankSlipDescription',
  'invoicedBillDescription'
];

const resources = buildResources({ en, pt_BR }, widgetResourceKeys)

export default TmbCheckoutBillet = {
  name: 'TmbCheckoutBillet',
  decription: 'Description of widget TmbCheckoutBillet',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  availableToAllPages: false,
  pageTypes: ['checkout-payment', 'pending-payment'],
  requiresContext: ['payment_context'],
  config: { properties: [], locales: {} },
  resources
};
 
