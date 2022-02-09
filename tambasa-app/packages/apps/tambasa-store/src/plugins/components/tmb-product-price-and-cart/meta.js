import defaultConfig from '@oracle-cx-commerce/react-widgets/config';
import * as en from './locales/en';
import * as pt_BR from './locales/pt_BR';

export const widgetResourceKeys = [
  'textPriceRange',
  'alertPriceUnavailable',
  'textSalePriceNow',
  'textSalePriceWas',
  'textQuantity',
  'textPrice',
  'textQuantityAndAbove',
  'actionCheckout',
  'actionContinueShopping',
  'actionViewCart',
  'closeLinkAltText',
  'alertAddedToCart',
  'actionAddToCart',
  'alertAddToCartAdded',
  'alertAddToCartAdding',
  'actionAddToCartPreOrder',
  'alertPriceUnavailable',
  'alertTotalItemQuantityExceeded',
  'textSuccessGiftMessage',
  'textFailureGiftMessage',
  'labelProductQuantity',
  'textMaxOrderQtyExceeded',
  'textMinOrderQtyRequired',
  'alertTotalItemQuantityExceeded'
];

export default TmbProductPriceAndCart = {
  name: 'TmbProductPriceAndCart',
  decription: 'TmbProductPriceAndCart description',
  author: 'diegodscamara',
  resources: { en, 'pt-BR': pt_BR },
  config: defaultConfig,
  requiresContext: ['product_context', 'container_context']
};
