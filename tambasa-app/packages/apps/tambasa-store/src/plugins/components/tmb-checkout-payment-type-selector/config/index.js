import * as pt_BR from './locales/pt-BR';
import * as en from './locales/en';

const config = {
  properties: [
    {
      id: 'enableCreditCardType',
      type: 'booleanType',
      defaultValue: true,
      labelResourceId: 'enableCreditCardTypeLabel',
      helpTextResourceId: 'enableAnyTypeHelpText'
    },
    {
      id: 'enableBilletType',
      type: 'booleanType',
      defaultValue: true,
      labelResourceId: 'enableBilletTypeLabel',
      helpTextResourceId: 'enableAnyTypeHelpText'
    },
    {
      id: 'enableInvoicedBillType',
      type: 'booleanType',
      defaultValue: true,
      labelResourceId: 'enableInvoicedBillTypeLabel',
      helpTextResourceId: 'enableAnyTypeHelpText'
    },
    {
      id: 'enablePIXType',
      type: 'booleanType',
      defaultValue: true,
      labelResourceId: 'enablePIXTypeLabel',
      helpTextResourceId: 'enableAnyTypeHelpText'
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
