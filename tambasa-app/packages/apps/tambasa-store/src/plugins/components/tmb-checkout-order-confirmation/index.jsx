import React, {useContext} from 'react';
import {ContainerContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
* Widget to display Order Confirmation Details
* @param {props} component props
*/
const TmbCheckoutOrderConfirmation = props => {
  //locales
  const {
    textOrderConfirmation,
    textReceiveEmailAfterApproval,
    textAfterapprovalPendingPaymentMessage,
    headingOrderConfirmation,
    textOrderNumber
  } = props;
  //context
  const {orderId = '', orderState, approvalSystemMessages, paymentData} = useContext(ContainerContext) || {};

  const isPendingApproval =
    orderState === 'PENDING_APPROVAL' || orderState === 'PENDING_APPROVAL_TEMPLATE' ? true : false;

  let isPaymentRequiredAfterApproval = false;
  if (isPendingApproval) {
    isPaymentRequiredAfterApproval = paymentData[0] !== undefined ? paymentData[0].default_initial : true;
  }

  return (
    <Styled id="TmbCheckoutOrderConfirmation" css={css}>
      {orderId && (
        <div className="TmbCheckoutOrderConfirmation">
          <div className="TmbCheckoutOrderConfirmation__ConfirmationMessage">
            <div className="TmbCheckoutOrderConfirmation__Image"></div>
            <h1 className="TmbCheckoutOrderConfirmation__Heading">{headingOrderConfirmation}</h1>
            <div className="TmbCheckoutOrderConfirmation__OrderNumber">
              <span>{textOrderNumber}</span>
              <span className="TmbCheckoutOrderConfirmation__OrderId">{orderId}</span>
            </div>
            <div className="TmbCheckoutOrderConfirmation__OrderDetails">
              {isPendingApproval ? (
                <div>
                  <span className="TmbCheckoutOrderConfirmation__Message">{approvalSystemMessages[0]}</span>
                  <span className="TmbCheckoutOrderConfirmation__Message">{textReceiveEmailAfterApproval}</span>
                  <br></br>
                  {isPaymentRequiredAfterApproval && 
                  <span className="TmbCheckoutOrderConfirmation__Message">{textAfterapprovalPendingPaymentMessage}</span>}
                </div>
              ) : (
                <div>
                  <span className="TmbCheckoutOrderConfirmation__Message">{textOrderConfirmation}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Styled>
  );
};

export default TmbCheckoutOrderConfirmation;
