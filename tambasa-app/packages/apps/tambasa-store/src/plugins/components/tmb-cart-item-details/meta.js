import { en, pt_BR } from '@oracle-cx-commerce/resources';

import {widgetResourceKeys as addToPurchaseListResourceKeys} from '@oracle-cx-commerce/react-widgets/profile/add-to-purchase-list/meta';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import cartItemConfig from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/config';
import {widgetResourceKeys as moveToWishListResourceKeys} from '@oracle-cx-commerce/react-widgets/product/product-add-to-wishlist/meta';

import * as customEn from './locales/en'
import * as customPtBR from './locales/pt-BR'

export const cartItemDetailsWidgetResourceKeys = [
  'actionMoveToWishList',
  'messageEmptyCart',
  'messagePartialBackOrder',
  'messageInsufficientStock',
  'messageInsufficientStockAtStore',
  'messageItemNoLongerAvailable',
  'messageQuantityManditory',
  'labelProductQuantity',
  'actionRemoveItem',
  'shippingSurchargeText',
  'actionContinueShopping',
  'textTotal',
  'textItemDetails',
  'textItemPrice',
  'textQuantity',
  'textGiftItem',
  'textSelectGiftMessage',
  'actionSelect',
  'actionCancel',
  'textFreeProduct',
  'textFreeGift',
  'textFree',
  'textChange',
  'textSelectGift',
  'alertAddToCartAdding',
  'textInStock',
  'textOutOfStock',
  'textPreOrderable',
  'textBackOrderable',
  'textSelectOptionOnline',
  'actionAddToCartPreOrder',
  'alertTotalItemQuantityExceeded',
  'textGWPInvalidation',
  'alertOutOfStock',
  'alertCartHeading',
  'alertNoLongerForSale',
  'messageAtTheRate',
  'messagePriceChange',
  'alertPriceIncreased',
  'alertPriceDecreased',
  'messagePartialPreOrder',
  'messageStatusPreOrder',
  'messageStatusBackOrder',
  'closeLinkAltText',
  'textSiteIcon',
  'textSkuID',
  ...addToPurchaseListResourceKeys,
  ...moveToWishListResourceKeys
];

const resources = buildResources({
  en: { ...en, ...customEn },
  pt_BR: { ...pt_BR, ...customPtBR }
}, cartItemDetailsWidgetResourceKeys)

export default CartItemDetails = {
  name: 'TmbCartItemDetails',
  decription: 'Description of widget TmbCartItemDetails',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources,
  config: cartItemConfig,
  availableToAllPages: false,
  pageTypes: ['cart'],
  requiresContext: ['cart_context']
};