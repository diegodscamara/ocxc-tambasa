import { buildResources } from '@oracle-cx-commerce/resources/utils'
import { pt_BR as ptBRBundle, en as enBundle } from '@oracle-cx-commerce/resources'
import config from './config';
import * as pt_BR from './locales/pt-BR';
import * as en from './locales/en';

const widgetResourceKeys = ['breadcrumbSeparator', 'correctedToAltText', 'textHome', 'pageIdentificationText'];

const resources = buildResources({
  en: { ...enBundle, ...en },
  pt_BR: { ...ptBRBundle, ...pt_BR }
}, widgetResourceKeys)

export default {
  name: 'TmbCategoryImage',
  decription: 'Description of widget TmbCategoryImage',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  pageTypes: ['category', 'search'],
  resources,
  config
};
 
