import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import {widgetResourceKeys as cartValidationMessages} from '@oracle-cx-commerce/react-widgets/cart/cart-container/meta';

export default TmbCheckoutShippingContainer = {
  name: 'TmbCheckoutShippingContainer',
  decription: 'Description of widget TmbCheckoutShippingContainer',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources: buildResources(resourceBundle, cartValidationMessages),
  config: { properties: [], locales: {} },
  type: 'container',
  availableToAllPages: false,
  pageTypes: ['checkout-shipping'],
  providesContext: ['checkout_shipping_context', 'scheduled_order_context', 'cart_context']
};
