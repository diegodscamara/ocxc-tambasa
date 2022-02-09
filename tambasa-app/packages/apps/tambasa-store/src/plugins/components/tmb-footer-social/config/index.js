import * as en from './locales/en';
import * as pt_BR from './locales/pt_BR';

const config = {
  properties: [
    {
      id: 'tambasaLogoLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'tambasaLogoLinkText'
    },
    {
      id: 'facebookLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'facebookLinkText'
    },
    {
      id: 'instagramLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'instagramLinkText'
    },
    {
      id: 'linkedinLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'linkedinLinkText'
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
