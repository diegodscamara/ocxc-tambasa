import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = ['actionCheckout'];

const resources = buildResources(resourceBundle, widgetResourceKeys)

export default CheckoutButton = {
  name: 'TmbCheckoutButton',
  decription: 'Description of widget TmbCheckoutButton',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources,
  availableToAllPages: false,
  pageTypes: ['cart'],
  config: defaultConfig,
  requiresContext: ['cart_context']
};

