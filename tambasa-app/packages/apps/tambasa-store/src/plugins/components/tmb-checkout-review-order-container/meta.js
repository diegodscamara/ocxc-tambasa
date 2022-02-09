import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = [];

export default TmbCheckoutReviewOrderContainer = {
  name: 'TmbCheckoutReviewOrderContainer',
  decription: 'Description of widget TmbCheckoutReviewOrderContainer',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources: buildResources(resourceBundle, widgetResourceKeys),
  type: 'container',
  availableToAllPages: false,
  pageTypes: ['checkout', 'checkout-review-order', 'checkout-payment']
};

