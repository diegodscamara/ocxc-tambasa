import config from './config';
import * as en from './locales/en';
import * as pt_BR from './locales/pt_BR';

export default {
  name: 'TmbContactUs',
  decription: 'Description of widget TmbContactUs',
  author: 'ruan.matos',
  fetchers: [],
  actions: [],
  resources: {en, 'pt-BR': pt_BR},
  config
};
