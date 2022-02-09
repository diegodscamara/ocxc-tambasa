import * as pt_BR from './locales/pt_BR';
import * as en from './locales/en';
/**
 * Design Studio configuration properties for the WidgetName component.
 */
const config = {
  properties: [
    {
      id: 'backgroundHeaderImage',
      type: 'mediaType',
      defaultValue: '',
      labelResourceId: 'backgroundHeaderImageText'
    },
    {
      id: 'backgroundHeaderImageMob',
      type: 'mediaType',
      defaultValue: '',
      labelResourceId: 'backgroundHeaderImageMobText'
    },
    {
      id: 'instagramLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'instagramLinkText'
    },
    {
      id: 'youtubeLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'youtubeLinkText'
    },
    {
      id: 'linkedinLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'linkedinLinkText'
    },
    {
      id: 'facebookLink',
      type: 'stringType',
      defaultValue: '#',
      labelResourceId: 'facebookLinkText'
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
