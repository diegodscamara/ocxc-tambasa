import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = [
  'configCheckoutShippingAddressLabel',
  'configCheckoutShippingAddressHelpText',
  'configCheckoutPaymentAddressLabel',
  'configCheckoutPaymentAddressHelpText',
  'configCheckoutReviewAddressLabel',
  'configCheckoutReviewAddressHelpText'
];

const config = {
  properties: [
    {
      id: 'checkoutShippingAddress',
      type: 'stringType',
      defaultValue: 'checkout-shipping',
      labelResourceId: 'configCheckoutShippingAddressLabel',
      helpTextResourceId: 'configCheckoutShippingAddressHelpText',
      required: true
    },
    {
      id: 'checkoutPaymentAddress',
      type: 'stringType',
      defaultValue: 'checkout-payment',
      labelResourceId: 'configCheckoutPaymentAddressLabel',
      helpTextResourceId: 'configCheckoutPaymentAddressHelpText',
      required: true
    },
    {
      id: 'checkoutReviewAddress',
      type: 'stringType',
      defaultValue: 'checkout-review-order',
      labelResourceId: 'configCheckoutReviewAddressLabel',
      helpTextResourceId: 'configCheckoutReviewAddressHelpText',
      required: true
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
};

export default config;
