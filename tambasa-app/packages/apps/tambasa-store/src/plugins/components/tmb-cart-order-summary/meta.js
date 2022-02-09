import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from '@oracle-cx-commerce/react-widgets/cart/cart-order-summary/config';

const widgetResourceKeys = [
  'textExcludingTax',
  'textFree',
  'textGiftCardBalance',
  'textIncludingTax',
  'textOrderDiscounts',
  'textShipping',
  'textShippingDiscount',
  'textShippingSurcharge',
  'textSubtotal',
  'textTax',
  'textTotal',
  'textRemainingTotal',
  'textGiftCard',
  'labelPayInStore',
  'labelInvoice',
  'textOrderSummaryGiftCard',
  'textPriceChangeMessage',
  'textConditionalTotal'
];

export default TmbCartOrderSummary = {
  name: 'TmbCartOrderSummary',
  decription: 'Description of widget TmbCartOrderSummary',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config,
  availableToAllPages: false,
  pageTypes: ['cart', 'checkout-shipping', 'checkout-payment', 'checkout-review-order']
};

