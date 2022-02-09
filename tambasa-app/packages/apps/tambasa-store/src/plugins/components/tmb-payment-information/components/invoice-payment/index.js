/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Invoice from '@oracle-cx-commerce/react-components/icons/invoice-payment';
import {PaymentBillingAddressDetails} from '@oracle-cx-commerce/react-widgets/profile/payment-information/components/billing-address';
import css from '@oracle-cx-commerce/react-widgets/profile/payment-information/components/invoice-payment/styles.css';

/**
 * Following component renders Invoice payment details.
 *
 * @param {Object} props the payment details
 */

export const InvoicePaymentDetails = props => {
  const invoiceDetails = props.payment || {};
  const {textInvoice, textPONumber, displayBillToName = false, textBillingAddress} = props;
  const {PONumber, billingAddress} = invoiceDetails;

  return (
    <Styled id="InvoicePayment" css={css}>
      <div className="InvoicePayment">
        <Invoice className="InvoicePayment__Icon" />
        <div className="InvoicePayment__Details">
          <span className="InvoicePayment__Text">{textInvoice}</span>
          {PONumber && <span className="InvoicePayment__PONumber">{`${textPONumber} ${PONumber}`}</span>}
          <PaymentBillingAddressDetails
            billingAddress={billingAddress}
            displayBillToName={displayBillToName}
            textBillingAddress={textBillingAddress}
          />
        </div>
      </div>
    </Styled>
  );
};
