import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
const widgetResourceKeys = ['textRetrievingPaymentDetails'];

export default TmbCheckoutPaymentsContainer = {
  name: 'TmbCheckoutPaymentsContainer',
  decription: 'Description of widget TmbCheckoutPaymentsContainer',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  type: 'container',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  availableToAllPages: false,
  pageTypes: ['checkout-payment', 'checkout-review-order', 'pending-payment'],
  config: { properties: [], locales: {} },
  providesContext: ['payment_context'],
  actions: ['checkOrderRequiresApproval', 'getOrder', 'notify']
};
