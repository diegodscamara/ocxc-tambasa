import React, {useEffect, useContext, useRef, useState} from 'react';
// import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import {getComponentData} from './selectors';
import {PaymentsContext, StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import {noop, isEmptyObject} from '@oracle-cx-commerce/utils/generic';
import {usePaymentConfigurationsFetcher} from '@oracle-cx-commerce/fetchers/payments/hooks';
import {fetchPaymentConfigurations} from '@oracle-cx-commerce/fetchers/payments';
import {PAYMENT_STATE_INITIAL, ORDER_STATE_PENDING_PAYMENT} from '@oracle-cx-commerce/commerce-utils/constants';
import css from './styles.css';
import PropTypes from 'prop-types';

import TmbCheckoutCreditCard from '../tmb-checkout-credit-card'
import TmbCheckoutBillet from '../tmb-checkout-billet';

/*
  Export payment configurations fetcher so that the server can use them to load state during 
  server-side rendering.
*/
export const fetchers = [fetchPaymentConfigurations];

/**
* A container that holds all the payment related widgets.
* Holds widgets for credit card, gift card, pay in store or other payment method widgets.
* @param props
*/
const TmbCheckoutPaymentMethodsContainer = props => {
  // props
  const {orderState, paymentGroups, textOrderProcessingTimedOut, headingPayment} = props;
  const store = useContext(StoreContext);

  // Calls usePaymentConfigurations Fetcher hook to load the payment configurations data into the state
  // This will not perform any action if the payment configuration is already part of the state.
  usePaymentConfigurationsFetcher(store);
  const paymentMethodsRef = useRef(null);
  const {isApprovalRequired, setPaymentsAlertMessage = noop} = useContext(PaymentsContext) || {};
  const [inProgress, setInProgress] = useState(false);

  //track the loaded radio button elements count
  const radioElementsCount =
    paymentMethodsRef && paymentMethodsRef.current
      ? paymentMethodsRef.current.querySelectorAll('.CheckoutPaymentsGroup').length
      : 0;

  //useEffect to style bottom border of last dom element which contains CheckoutPaymentsGroup css class
  useEffect(() => {
    if (paymentMethodsRef && paymentMethodsRef.current) {
      const elements = paymentMethodsRef.current.querySelectorAll('.CheckoutPaymentsGroup');
      const lastElement = elements.length > 0 ? elements[elements.length - 1] : null;
      //apply bottom border style to the last element
      lastElement &&
        !lastElement.classList.contains('BottomBorderStyle') &&
        lastElement.classList.add('BottomBorderStyle');
      // remove bottom border style from non last element
      for (let i = 0; i < elements.length - 1; i++) {
        if (elements[i].classList.contains('BottomBorderStyle')) {
          elements[i].classList.remove('BottomBorderStyle');
        }
      }
    }
  }, [isApprovalRequired, paymentMethodsRef, radioElementsCount]);

  // Remove expired payment group from the current order
  useEffect(() => {
    const removeExpiredPaymentGroups = async () => {
      if (paymentGroups && !isEmptyObject(paymentGroups) && !inProgress && orderState !== ORDER_STATE_PENDING_PAYMENT) {
        const expiredPaymentGroups = Object.values(paymentGroups).filter(
          paymentGroup => paymentGroup.paymentExpired === 'true' && paymentGroup.paymentState === PAYMENT_STATE_INITIAL
        );
        // Calling deleteAppliedPayment action to remove expired payment groups
        if (expiredPaymentGroups.length > 0) {
          setInProgress(true);
          // notify the user to re-enter payment details since payment groups have expired
          setPaymentsAlertMessage({type: 'info', message: textOrderProcessingTimedOut});

          // remove each expired payment group
          for (const paymentGroup of expiredPaymentGroups) {
            const {paymentGroupId} = paymentGroup;
            await store.action('deleteAppliedPayment', {paymentGroupId});
          }
          setInProgress(false);
        }
      }
    };
    removeExpiredPaymentGroups();
  }, [inProgress, textOrderProcessingTimedOut, paymentGroups, setPaymentsAlertMessage, store, orderState]);

  const [ paymentTypeSelected, setPaymentTypeSelected ] = useState() 

  useEffect(() => {
    store.subscribeDispatch((actionEvent) => {
      const { type, payload } = actionEvent;
      if (type === "paymentTypeSelector") {
        setPaymentTypeSelected(payload.payment)
      }
   });
  }, [store.subscribeDispatch])

  const renderPayment = () => {
    switch(paymentTypeSelected) {
      case 'credit-card':
        return <TmbCheckoutCreditCard {...props}/>
      case 'bank-slip':
        return <TmbCheckoutBillet {...props} isInvoicedBill={false}/>
      case 'invoiced-bill':
        return <TmbCheckoutBillet {...props} isInvoicedBill={true}/>
      case 'pix':
        return <div>PIX</div>
      default: 
        return <></>
    }
  }

  return (
    <Styled id="TmbCheckoutPaymentMethodsContainer" css={css}>
      <section ref={paymentMethodsRef} className="TmbCheckoutPaymentMethodsContainer">
        <div className="TmbCheckoutPaymentMethodsContainer__Header">
          <h2 className="TmbCheckoutPaymentMethodsContainer__Header___Title">{headingPayment}</h2>
        </div>
        { renderPayment() }
      </section>
    </Styled>
  );
};

TmbCheckoutPaymentMethodsContainer.propTypes = {
  /**
  * The state of the order (INCOMPLETE, PENDING_PAYMENT etc)
  */
  orderState: PropTypes.string,
  /**
  * Object containing list of payment groups on the order
  */
  paymentGroups: PropTypes.objectOf(
    PropTypes.shape({
      /**
      * Indicates if the payment group has expired
      */
      paymentExpired: PropTypes.string,
      /**
      * The payment group id
      */
      paymentGroupId: PropTypes.string.isRequired,
      /**
      * The state of the payment group(INITIAL, AUTHROIZED etc)
      */
      paymentState: PropTypes.string.isRequired
    })
  )
};

TmbCheckoutPaymentMethodsContainer.defaultProps = {
  orderState: undefined,
  paymentGroups: undefined
};

export default connect(getComponentData)(TmbCheckoutPaymentMethodsContainer);
