import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from './config';

const widgetResourceKeys = ['headingCheckout', 'headingPayment', 'headingReview', 'headingShipping'];

export default TmbCheckoutProgressTracker = {
  name: 'TmbCheckoutProgressTracker',
  decription: 'Description of widget TmbCheckoutProgressTracker',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config,
  availableToAllPages: false,
  pageTypes: ['checkout-shipping', 'checkout-payment', 'checkout-review-order']
};