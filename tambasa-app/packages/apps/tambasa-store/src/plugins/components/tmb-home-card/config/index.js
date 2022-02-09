import * as en from './locales/en';
import * as pt_BR from './locales/pt_BR';

const config = {
  properties: [
    {
      id: 'cardBackground',
      type: 'mediaType',
      defaultValue: false,
      labelResourceId: 'cardBackgroundLabel'
    },
    {
      id: 'titleTop',
      type: 'stringType',
      defaultValue: '',
      labelResourceId: 'titleTopLabel'
    },
    {
      id: 'titleBottom',
      type: 'stringType',
      defaultValue: '',
      labelResourceId: 'titleBottomLabel'
    },
    {
      id: 'categoryLink',
      type: 'stringType',
      defaultValue: '',
      labelResourceId: 'categoryLinkLabel'
    },
    {
      id: 'linkText',
      type: 'stringType',
      defaultValue: '',
      labelResourceId: 'linkTextLabel'
    }
  ],
  locales: {
    en: {
      resources: en
    },
    pt_BR: {
      resources: pt_BR
    }
  }
};

export default config;
