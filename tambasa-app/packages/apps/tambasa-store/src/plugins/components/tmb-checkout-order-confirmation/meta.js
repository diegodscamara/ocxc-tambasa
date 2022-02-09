
import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = [
  'textOrderConfirmation',
  'textReceiveEmailAfterApproval',
  'textAfterapprovalPendingPaymentMessage',
  'headingOrderConfirmation',
  'textOrderNumber'
];

export default TmbCheckoutOrderConfirmation = {
  name: 'TmbCheckoutOrderConfirmation',
  decription: 'Description of widget TmbCheckoutOrderConfirmation',
  author: 'guilherme.vieira',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: { properties: [], locales: {} },
  pageTypes: ['checkout-order-confirmation'],
  requiresContext: ['container_context']
};