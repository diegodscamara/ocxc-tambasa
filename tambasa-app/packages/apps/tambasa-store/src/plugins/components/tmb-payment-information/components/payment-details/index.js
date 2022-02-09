import React from 'react';
import {CreditCardPaymentDetails} from '../credit-card';
import {GiftCardPaymentDetails} from '../gift-card';
import {InvoicePaymentDetails} from '../invoice-payment';
import {GeneralPaymentDetails} from '../general-payment-details';
import {
  PAYMENT_TYPE_GIFTCARD,
  PAYMENT_METHOD_TOKENIZED_CREDIT_CARD,
  PAYMENT_METHOD_CREDIT_CARD,
  PAYMENT_TYPE_PAY_IN_STORE,
  PAYMENT_METHOD_INVOICE_REQUEST,
  PAYMENT_METHOD_ONLINE_PAYMENT_GROUP
} from '@oracle-cx-commerce/commerce-utils/constants';

/**
 * Following component renders different payment methods based on payment method type.
 *
 * @param props - Payment method type
 */
export const PaymentDetails = props => {
  const {payment = {}, textPayInStore, textPayOnline} = props;
  const {paymentMethod} = payment;

  const getPaymentMethod = () => {
    if (paymentMethod === PAYMENT_METHOD_CREDIT_CARD || paymentMethod === PAYMENT_METHOD_TOKENIZED_CREDIT_CARD) {
      return <CreditCardPaymentDetails {...props} />;
    }
    if (paymentMethod === PAYMENT_TYPE_GIFTCARD) {
      return <GiftCardPaymentDetails {...props} />;
    }
    if (paymentMethod === PAYMENT_METHOD_INVOICE_REQUEST) {
      return <InvoicePaymentDetails {...props} />;
    }
    if (paymentMethod === PAYMENT_TYPE_PAY_IN_STORE) {
      return <GeneralPaymentDetails>{textPayInStore}</GeneralPaymentDetails>;
    }
    //Merchant can customize this to display details of online payment group such as displaying logo
    if (paymentMethod === PAYMENT_METHOD_ONLINE_PAYMENT_GROUP) {
      return <GeneralPaymentDetails>{textPayOnline}</GeneralPaymentDetails>;
    }
  };

  return <>{getPaymentMethod()}</>;
};
