import * as en from './locales/en';
import * as pt_BR from './locales/pt_BR';

const config = {
  properties: [
    {
      id: 'oracleLogo',
      type: 'mediaType',
      labelResourceId: 'oracleLogoLabel'
    },
    {
      id: 'copyrightText',
      type: 'stringType',
      defaultValue: 'Tambasa Atacadistas - Todos os direitos reservados',
      labelResourceId: 'copyrightTextLabel'
    }
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
