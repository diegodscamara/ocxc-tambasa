import { en, pt_BR } from '@oracle-cx-commerce/resources';
import * as customEn from './locales/en'
import * as customPtBR from './locales/pt-BR'
import {buildResources} from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = [
  'messageDuplicateCoupon',
  'textApplyPromoCode',
  'lablePromoCode',
  'actionApply',
  'messageEmptyCoupon',
  'couponCodeInputPlaceholder'
];

const resources = buildResources({
  en: { ...en, ...customEn },
  'pt-BR': { ...pt_BR, ...customPtBR }
}, widgetResourceKeys)

export default PromotionCodeEntry = {
  name: 'TmbPromotionCodeEntry',
  decription: 'Description of widget TmbPromotionCodeEntry',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources,
  actions: ['applyCouponsToCart']
};

