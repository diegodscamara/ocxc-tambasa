import * as en from './locales/en';
import * as pt_BR from './locales/pt_BR';

const config = {
  properties: [
    {
      id: 'homeCategoriesCollectionsIds',
      type: 'collectionType',
      labelResourceId: 'homeCategoriesCollectionsIdsLabel',
      helpTextResourceId: 'homeCategoriesCollectionsIdsHelp'
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

