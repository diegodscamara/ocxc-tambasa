import * as en from './locales/en';
import * as pt_BR from './locales/pt_BR'

const config = {
  properties: [
    {
      id: 'productVideoDescription',
      type: 'stringType',
      defaultValue: '#',
      required: true,
      labelResourceId: 'productVideoDescriptionLabel',
      helpTextResourceId: 'productVideoDescriptionHelp'
    },
  ],
  locales: {
    en: {
      resources: en
    }, 
    'pt-BR': {
      resources: pt_BR
    }
  }
};

export default config;
