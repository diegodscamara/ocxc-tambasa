import { pt_BR as ptBRBundle, en as enBundle } from '@oracle-cx-commerce/resources';
import * as pt_BR from './locales/pt-BR'
import * as en from './locales/en'
import {buildResources} from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = [
  'listPriceOnlyAfterText',
  'listPriceOnlyBeforeText',
  'listPriceOnSaleAfterText',
  'listPriceOnSaleBeforeText',
  'checkPriceText'
];

const resources = buildResources({
  en: { ...enBundle, ...en },
  pt_BR: { ...ptBRBundle, ...pt_BR }
}, widgetResourceKeys)

export default TmbProductResultPrice = {
  name: 'TmbProductResultPrice',
  decription: 'Description of widget TmbProductResultPrice',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  pageTypes: ['search', 'category'],
  resources
};
