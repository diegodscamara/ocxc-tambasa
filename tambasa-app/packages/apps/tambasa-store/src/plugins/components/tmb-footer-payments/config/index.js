import * as en from './locales/en';
import * as pt_BR from './locales/pt_BR';

const config = {
  properties: [
    {
      id: 'paymentMethodsText',
      type: 'stringType',
      defaultValue: 'FORMAS DE PAGAMENTO',
      labelResourceId: 'paymentMethodsTextLabel',
    },
    {
      id: 'paymentMethodsImage',
      type: 'mediaType',
      defaultValue: '',
      labelResourceId: 'paymentMethodsImageLabel',
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
