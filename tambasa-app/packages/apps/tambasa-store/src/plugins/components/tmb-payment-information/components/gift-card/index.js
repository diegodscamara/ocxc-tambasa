/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import CreditCardIcon from '@oracle-cx-commerce/react-components/icons/credit-card';
import css from '@oracle-cx-commerce/react-widgets/profile/payment-information/components/gift-card/styles.css';

/**
 * Following component renders Gift Card Information.
 *
 * @param props - Gift Card Details
 */

export const GiftCardPaymentDetails = props => {
  const giftCardDetails = props.payment || {};
  const {textGiftCard} = props;
  const {maskedCardNumber = ''} = giftCardDetails;

  if (!maskedCardNumber) {
    return null;
  }

  return (
    <Styled id="GiftCardPaymentDetails" css={css}>
      <div className="GiftCardPaymentDetails">
        <CreditCardIcon className="GiftCardPaymentDetails__CardIcon" />
        <div className="GiftCardPaymentDetails__CardDetails">
          <span className="GiftCardPaymentDetails__CardText">{textGiftCard}</span>
          <span className="GiftCardPaymentDetails__CardText">{maskedCardNumber.replace(/x/g, '*')}</span>
        </div>
      </div>
    </Styled>
  );
};
