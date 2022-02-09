import config from './config';
import * as pt_BR from './locales/pt-BR';
import * as en from './locales/en';

export default TmbCheckoutPaymentTypeSelector = {
  name: 'TmbCheckoutPaymentTypeSelector',
  decription: 'Description of widget TmbCheckoutPaymentTypeSelector',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources: {
    'pt-BR': pt_BR,
    en
  },
  config
};
