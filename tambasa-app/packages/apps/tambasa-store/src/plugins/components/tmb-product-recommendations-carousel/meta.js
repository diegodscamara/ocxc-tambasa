import { en, pt_BR } from '@oracle-cx-commerce/resources'
import { buildResources } from '@oracle-cx-commerce/resources/utils';
import * as customEn from './locales/en'
import * as customPtBR from './locales/pt-BR'
import config from './config';

const widgetResourceKeys = [
  'headingProductRecommendations',
  'textPriceRange',
  'alertPriceUnavailable',
  'textSalePriceNow',
  'textSalePriceWas',
  'textQuantity',
  'textPrice',
  'textQuantityAndAbove',
  'skuText',
  'priceDetails',
  'productDetails'
];

const resources = buildResources({
  en: { ...en, ...customEn },
  pt_BR: { ...pt_BR, ...customPtBR }
}, widgetResourceKeys)

export default {
  name: 'TmbProductRecommendationsCarousel',
  decription: 'Description of widget TmbProductRecommendationsCarousel',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: ['listProducts', 'getProductsPrices'],
  resources,
  config
};