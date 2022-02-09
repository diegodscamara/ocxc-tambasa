import config from './config';
import * as customEn from './locales/en';
import * as customPtBR from './locales/pt-BR';
import { en, pt_BR } from '@oracle-cx-commerce/resources'
import { buildResources } from '@oracle-cx-commerce/resources/utils'

const widgetResourceKeys = [
  'collectionCarouselLabel',
  'clickAndSeeProducts', 
  'productSkuId',
  'consultPrice', 
  'moreDetails',
  'wasPriceText'
];

const resources = buildResources({ 
  en: {...en, ...customEn}, 
  pt_BR: {...pt_BR, ...customPtBR} 
}, widgetResourceKeys)

export default {
  name: 'TmbHomeCollection',
  decription: 'TmbHomeCollection widget',
  author: 'renan.andreolla',
  fetchers: [],
  resources,
  config,
  actions: ['listProducts', 'getProductsPrices']
};