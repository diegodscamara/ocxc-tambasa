import { pt_BR, en } from '@oracle-cx-commerce/resources';
import * as customPt_BR from './locales/pt-BR'
import * as customEn from './locales/en'
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = [
  'configCategoryMediaPropertyLabel',
  'configCategoryMediaPropertyHelpText',
  'configHideCategoryIfOutOfStockLabel',
  'configHideCategoryIfOutOfStockHelpText',
  'menuMainCollectionsLabel',
  'menuMainCollectionsHelp'
];

const locales = buildConfigResources({
  en: { ...en, ...customEn },
  pt_BR: { ...pt_BR, customPt_BR }
}, configResourceKeys)

const config = {
  properties: [
    {
      id: 'categoryMediaProperty',
      type: 'stringType',
      name: 'categoryMediaProperty',
      labelResourceId: 'configCategoryMediaPropertyLabel',
      helpTextResourceId: 'configCategoryMediaPropertyHelpText'
    },
    {
      id: 'hideCategoryIfOutOfStock',
      type: 'booleanType',
      defaultValue: false,
      labelResourceId: 'configHideCategoryIfOutOfStockLabel',
      helpTextResourceId: 'configHideCategoryIfOutOfStockHelpText'
    },
    {
      id: 'menuMainCollections',
      type: 'collectionType',
      labelResourceId: 'menuMainCollectionsLabel',
      helpTextResourceId: 'menuMainCollectionsHelp'
    }
  ],
  locales
};

export default config;
