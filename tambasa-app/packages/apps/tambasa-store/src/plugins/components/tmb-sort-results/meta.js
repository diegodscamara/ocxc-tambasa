import { pt_BR as ptBrBundle, en as enBundle } from '@oracle-cx-commerce/resources';
import * as en from './locales/en'
import * as pt_BR from './locales/pt-BR'
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from './config'

const widgetResourceKeys = [
  'textProductListingSummary',
  'filterByLabel',
  'textBestMatch',
  'textPriceHighToLow',
  'textPriceLowToHigh',
  'textSortAZ',
  'textSortZA',
  'textSortBy',
  'textBrandAZ',
  'textBrandZA',
  'textNewest'
];

const resources = buildResources({
  en: { ...enBundle, ...en },
  pt_BR: { ...ptBrBundle, ...pt_BR }
}, widgetResourceKeys)

export default TmbSortResults = {
  name: 'TmbSortResults',
  decription: 'Description of widget TmbSortResults',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources,
  config,
  pageTypes: ['search', 'category']
};
