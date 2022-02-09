import React, {useCallback, useState, useEffect, useContext} from 'react';
import Alert from '@oracle-cx-commerce/react-components/alert';
import Region from '@oracle-cx-commerce/react-components/region';
import {PaymentsContext, StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import {useOrderApprovalRequired} from '@oracle-cx-commerce/react-components/utils/payment/hooks';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import {getCheckoutPaymentsContainerData} from './selectors';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';
import PropTypes from 'prop-types';

/**
* A container that holds the widgets on the checkout payment page.
* Contains payment context on top of the widgets which is used to add payment information to the
* from different payment methods widget and access it in continue to review order/complete payment widgets
* @param props
*/
const TmbCheckoutPaymentsContainer = props => {
  const {
    id,
    isUserLoggedIn,
    regions = [],
    headingPayment,
    textRetrievingPaymentDetails,
    isApprovalEnabled,
    orderId,
    isOrderExistInStore,
    isCurrentOrder
  } = props;
  // all applied payments
  const [payments, setPayments] = useState([]);
  // currently selected payment type
  const [selectedPaymentType, setSelectedPaymentType] = useState('');

  const [isApprovalRequired, setIsApprovalRequired] = useState('');

  // Used to set alert message on the payment page level
  // Maintains the message and the type of the message
  const [paymentsAlertMessage, setPaymentsAlertMessage] = useState({});

  //const [isLoading, setIsLoading] = useState(enabledForApproval);

  const [isLoading, setIsLoading] = useState(true);

  const updateSelectedPaymentType = useCallback(type => {
    setSelectedPaymentType(type);
    setPayments([]);
  }, []);

  /**
  * Adds payment to the payment context if not already present.
  * Updates payment if already present.
  * Called from payment methods contained in this container when they are in a valid state
  * @param {Object} payload The payload containing the payment details
  * @returns {Number} seqNum The seqNum of the added payment
  */
  const addOrUpdatePaymentToContext = useCallback(
    payload => {
      const index =
        payload.seqNum !== undefined ? payments.findIndex(payment => payment.seqNum === payload.seqNum) : -1;
      let updatedPayments;
      let seqNum;
      if (index !== -1) {
        updatedPayments = [...payments];
        updatedPayments[index] = payload;
        setPayments(updatedPayments);
        seqNum = payload.seqNum;
      } else {
        seqNum = payments.length ? payments[payments.length - 1]['seqNum'] + 1 : 0;
        updatedPayments = [...payments, {...payload, seqNum}];
        setPayments(updatedPayments);
      }

      return seqNum;
    },
    [payments]
  );

  /**
  * Removes payment from the payment context based on seq num
  * @param {String} seqNum The seq num of payment to be removed
  */
  const removePaymentFromContextBySeqNum = useCallback(
    seqNum => {
      const index = seqNum !== undefined ? payments.findIndex(payment => payment.seqNum === seqNum) : -1;
      if (index !== -1) {
        setPayments(payments => payments.filter(payment => payment.seqNum !== seqNum));
      }
    },
    [payments]
  );

  /**
  * Removes payment from the payment context based on payment type
  * @param {String} type The type of payment to be removed
  */
  const removePaymentFromContextByType = useCallback(
    type => {
      const index = type !== undefined ? payments.findIndex(payment => payment.type === type) : -1;
      if (index !== -1) {
        setPayments(payments => payments.filter(payment => payment.type !== type));
      }
    },
    [payments]
  );
  const store = useContext(StoreContext);
  const {action} = store;
  const orderApproval = useOrderApprovalRequired();
  useEffect(() => {
    if (isApprovalEnabled === false || !isUserLoggedIn) {
      setIsLoading(false);
    }
    if (!isEmptyObject(orderApproval)) {
      if (orderApproval.requiresApproval) {
        setIsApprovalRequired(true);
      } else {
        setIsApprovalRequired(false);
      }
      setIsLoading(false);
    }
  }, [isApprovalEnabled, isUserLoggedIn, orderApproval]);

  /**
  * Failure call back for the getOrder action
  */
  const onNotOk = useCallback(
    ({error: {message = ''} = {}} = {}) => {
      action('notify', {level: 'error', message});
    },
    [action]
  );

  /**
  * Get the order details for the specific order id
  */
  useEffect(() => {
    if (orderId && !isCurrentOrder && !isOrderExistInStore) {
      action('getOrder', {orderId})
        .then(response => {
          if (response.ok === false) {
            onNotOk(response);
          }
        })
        .catch(error => {
          onNotOk({error});
        });
    }
  }, [action, isCurrentOrder, isOrderExistInStore, isUserLoggedIn, onNotOk, orderId]);

  const [ isInvoicePaymentType, setIsInvoicePaymentType ] = useState(false)

  /**
   * @property {Boolean} isInvoicePaymentType
   * We're observing if "invoice billet" type is selected. Because there are some validations to be considered on
   * 'tmb-checkout-continue-to-review-order-button' component
   */
  const paymentContext = {
    isApprovalRequired,
    payments,
    selectedPaymentType,
    setSelectedPaymentType,
    updateSelectedPaymentType,
    addOrUpdatePaymentToContext,
    removePaymentFromContextBySeqNum,
    removePaymentFromContextByType,
    paymentsAlertMessage,
    setPaymentsAlertMessage,
    isInvoicePaymentType,
    setIsInvoicePaymentType
  };

  return (
    <Styled id="TmbCheckoutPaymentsContainer" css={css}>
      <PaymentsContext.Provider value={paymentContext}>
        <div
          className={`TmbCheckoutPaymentsContainer__FetchingPaymentText ${
            !isLoading ? ' TmbCheckoutPaymentsContainer--hidden' : ''
          }`}
        >
          <span>{textRetrievingPaymentDetails}</span>
        </div>
        <div className={`TmbCheckoutPaymentsContainer__Wrapper ${isLoading ? ' TmbCheckoutPaymentsContainer--hidden' : ''}`}>
          {paymentsAlertMessage && paymentsAlertMessage.message && (
            <div className="TmbCheckoutPaymentsContainer__AlertMessage">
              <Alert
                id={`paymentsAlertMessage-${id}`}
                type={paymentsAlertMessage.type}
                message={paymentsAlertMessage.message}
              ></Alert>
            </div>
          )}
          <section className="TmbCheckoutPaymentsContainer__Section">
            {regions.map(regionId => (
              <Region key={regionId} regionId={regionId} />
            ))}
          </section>
        </div>
      </PaymentsContext.Provider>
    </Styled>
  );
};

TmbCheckoutPaymentsContainer.propTypes = {
  /**
  * The unique identifier for the component.
  */
  id: PropTypes.string.isRequired,
  /**
  * Indicates if approval is enabled.
  */
  isApprovalEnabled: PropTypes.bool,
  /**
  * Indicates if order is current incomplete order.
  */
  isCurrentOrder: PropTypes.bool.isRequired,
  /**
  * Indicates if order details is already loaded in redux state.
  */
  isOrderExistInStore: PropTypes.bool.isRequired,
  /**
  * Indicates if the user is logged in.
  */
  isUserLoggedIn: PropTypes.bool.isRequired,
  /**
  * The orderId
  */
  orderId: PropTypes.string.isRequired,
  /**
  * The list of region Id's contained in the container
  */
  regions: PropTypes.arrayOf(PropTypes.string).isRequired
};

TmbCheckoutPaymentsContainer.defaultProps = {
  isApprovalEnabled: undefined
};

export default connect(getCheckoutPaymentsContainerData)(TmbCheckoutPaymentsContainer);
