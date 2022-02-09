import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
const widgetResourceKeys = ['actionBackToPrevious'];

export default TmbCheckoutBackToPreviousButton = {
  name: 'TmbCheckoutBackToPreviousButton',
  decription: 'Description of widget TmbCheckoutBackToPreviousButton',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources: buildResources(resourceBundle, widgetResourceKeys),
  availableToAllPages: false,
  pageTypes: ['checkout-payment', 'checkout-review-order'],
  config: { properties: [], locales: {} }
};
