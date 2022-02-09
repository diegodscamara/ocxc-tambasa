import * as en from './locales/en';
import * as pt_BR from './locales/pt_BR';

const config = {
  properties: [
    {
      id: 'contactEmailLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'contactEmailLinkLabel'
    },
    {
      id: 'contactEmailText',
      type: 'stringType',
      defaultValue: 'atendimento@tambasa.com.br',
      labelResourceId: 'contactEmailTextLabel'
    },
    {
      id: 'contactPhoneLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'contactPhoneLinkLabel'
    },
    {
      id: 'contactPhoneText',
      type: 'stringType',
      defaultValue: '(31) 3359-0291 | (31) 3359-0291',
      labelResourceId: 'contactPhoneTextLabel'
    },
    {
      id: 'facebooklLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'facebooklLinkLabel'
    },
    {
      id: 'instagramLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'instagramLinkLabel'
    },
    {
      id: 'linkedinLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'linkedinLinkLabel'
    },
    {
      id: 'menuHomeLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'menuHomeLinkLabel'
    },
    {
      id: 'menuHomeText',
      type: 'stringType',
      defaultValue: 'HOME',
      labelResourceId: 'menuHomeTextLabel'
    },
    {
      id: 'menuPromoLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'menuPromoLinkLabel'
    },
    {
      id: 'menuPromoText',
      type: 'stringType',
      defaultValue: 'PROMOÇÕES',
      labelResourceId: 'menuPromoTextLabel'
    },
    {
      id: 'menuBlogLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'menuBlogLinkLabel'
    },
    {
      id: 'menuBlogText',
      type: 'stringType',
      defaultValue: 'BLOG',
      labelResourceId: 'menuBlogTextLabel'
    },
    {
      id: 'menuContactLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'menuContactLinkLabel'
    },
    {
      id: 'menuContactText',
      type: 'stringType',
      defaultValue: 'FALE CONOSCO',
      labelResourceId: 'menuContactTextLabel'
    },
    {
      id: 'servicesLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'servicesLinkLabel'
    },
    {
      id: 'servicesText',
      type: 'stringType',
      defaultValue: 'Outros serviços',
      labelResourceId: 'servicesTextLabel'
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
