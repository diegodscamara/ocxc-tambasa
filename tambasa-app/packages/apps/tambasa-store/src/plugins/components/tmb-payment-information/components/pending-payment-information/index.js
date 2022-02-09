import React, {useState} from 'react';

import Card from '@oracle-cx-commerce/react-components/card';
import {PAGE_PENDING_PAYMENT_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';

//constants
const PENDING_PAYMENT_PAGE = PAGE_PENDING_PAYMENT_LINK;

/**
 * This component is a button with pending order message which appears when order is in pending payment state
 * On click of this button, it navigates to the pending payment page
 * @param {Object} props properties object
 */
export const PendingPaymentInformation = props => {
  const {
    actionProceedToPayment,
    textAdditionalPaymentInformationNeeded,
    textOrderPendingPayment,
    isDisplayPendingPaymentDetails,
    isEligibleToCompletePay,
    orderId,
    showEditLink
  } = props;
  const [isInProgress, setIsInProgress] = useState(false);
  const goToPage = useNavigator();

  /**
   * Handler method which get invoked on click of complete payment button
   */
  const handleCompletePayment = () => {
    setIsInProgress(true);
    // navigate to order pending payment page
    const url = `${PENDING_PAYMENT_PAGE}/${orderId}`;
    goToPage(url);
  };

  //Button UI along with message
  return (
    !showEditLink &&
    isDisplayPendingPaymentDetails &&
    isEligibleToCompletePay && (
      <Styled id="PendingPaymentInformation" css={css}>
        <div className="PendingPaymentInformation">
          <Card className="PendingPaymentInformation__Card">
            <h3>{textOrderPendingPayment}</h3>
            <span>{textAdditionalPaymentInformationNeeded}</span>
          </Card>
          <button type="button" disabled={isInProgress} onClick={handleCompletePayment}>
            {actionProceedToPayment}
          </button>
        </div>
      </Styled>
    )
  );
};
