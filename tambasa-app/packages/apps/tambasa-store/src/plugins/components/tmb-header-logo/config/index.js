import * as pt_BR from './locales/pt-BR';
import * as en from './locales/en';

const config = {
  properties: [
    {
      id: 'headerLogoMedia',
      type: 'mediaType',
      labelResourceId: 'headerLogoMediaLabel',
      helpTextResourceId: 'headerLogoMediaHelp'
    }
  ],
  locales: {
    'pt-BR': {
      resources: pt_BR
    },
    en: {
      resources: en
    }
  }
};

export default config;
