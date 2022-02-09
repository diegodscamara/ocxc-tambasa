import * as pt_BR from './locales/pt-BR';
import * as en from './locales/en';

const config = {
  properties: [
    {
      id: 'tradePolicyConfig',
      type: 'webContentType',
      defaultValue: 'tradePolicyDefaultValue',
      labelResourceId: 'tradePolicyConfigLabel'
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
