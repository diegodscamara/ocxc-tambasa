import config from './config';
import * as pt_BR from './locales/pt-BR';
import * as en from './locales/en';

export default {
  name: 'TmbTradePolicy',
  decription: 'Description of widget TmbTradePolicy',
  author: 'bernardo.kraczkowski',
  fetchers: [],
  actions: [],

  resources: {
    'pt-BR': pt_BR,
    en
  },

  config
};
