import * as en from './locales/en';
import * as pt_BR from './locales/pt_BR';

const config = {
  properties: [
    {
      id: 'imageBannerHome',
      type: 'mediaType',
      defaultValue: false,
      labelResourceId: 'imageBannerHomeLabel',
      helpTextResourceId: 'imageBannerHomeHelp'
    },
    {
      id: 'linkRedirectBannerHome',
      type: 'stringType',
      defaultValue: false,
      labelResourceId: 'linkRedirectBannerHomeLabel',
      helpTextResourceId: 'linkRedirectBannerHomeHelp'
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
