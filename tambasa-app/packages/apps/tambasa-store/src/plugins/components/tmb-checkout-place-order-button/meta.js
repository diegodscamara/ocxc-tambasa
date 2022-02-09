import { pt_BR as pt_BR_Bundle, en as enBundle } from '@oracle-cx-commerce/resources';
import * as en from './locales/en'
import * as pt_BR from './locales/pt-BR'
import {buildResources} from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = [
  'alertTechnicalProblemContactUs',
  'alertOrderNotPlacedPaymentDeclined',
  'placeOrderButtonLabel'
];

const resources = buildResources({
  pt_BR: { ...pt_BR_Bundle, ...pt_BR },
  en: { ...enBundle, ...en }
}, widgetResourceKeys)

export default TmbCheckoutPlaceOrderButton = {
  name: 'TmbCheckoutPlaceOrderButton',
  decription: 'Description of widget TmbCheckoutPlaceOrderButton',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources,
  config: { properties: [], locales: {} },
  pageTypes: ['checkout-review-order']
};
