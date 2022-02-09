/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React from 'react';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/profile/payment-information/components/billing-address/styles.css';

/**
 * Following component renders Billing Address Information.
 *
 * @param props - Billing Address Details
 */

export const PaymentBillingAddressDetails = ({
  billingAddress = {},
  displayBillToName = false,
  textBillingAddress = ''
}) => {
  const {
    firstName = '',
    lastName = '',
    address1 = '',
    address2 = '',
    city = '',
    state = '',
    postalCode = '',
    country = ''
  } = billingAddress;

  //Don't render anything if Billing Address is empty
  if (isEmptyObject(billingAddress)) {
    return null;
  }

  return (
    <Styled id="BillingAddressDetails" css={css}>
      <div className="BillingAddressDetails">
        <span className="BillingAddressDetails__HeadingText">{textBillingAddress}</span>
        {displayBillToName && (
          <span>
            {firstName} {lastName}
          </span>
        )}
        {address1 && (
          <div className="BillingAddressDetails__Text">
            <span>{`${address1},`}</span>
          </div>
        )}
        {address2 && (
          <div className="BillingAddressDetails__Text">
            <span>{`${address2},`}</span>
          </div>
        )}
        <div className="BillingAddressDetails__Text">
          {city} {state} {postalCode} {country}
        </div>
      </div>
    </Styled>
  );
};
