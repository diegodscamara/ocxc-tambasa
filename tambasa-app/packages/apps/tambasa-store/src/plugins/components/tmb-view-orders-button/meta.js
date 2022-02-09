import * as pt_BR from './locales/pt-BR';
import * as en from './locales/en';

export default {
  name: 'TmbViewOrdersButton',
  decription: 'Description of widget TmbViewOrdersButton',
  author: 'guilherme.vieira',
  pageTypes: ['checkout-order-confirmation'],
  fetchers: [],
  actions: [],
  resources: {
    'pt-BR': pt_BR,
    en
  },
  config: { properties: [], locales: {} }
};
