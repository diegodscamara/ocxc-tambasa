import config from './config';
import * as en from './locales/en';
import * as pt_BR from './locales/pt_BR';

export default {
  name: 'TmbFooterPayments',
  decription: 'TmbFooterPayments widget',
  author: 'diegodscamara',
  fetchers: [],
  actions: [],
  resources: {en, 'pt-BR': pt_BR},
  config
};
