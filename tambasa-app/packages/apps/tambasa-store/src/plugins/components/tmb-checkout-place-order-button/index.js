import {StoreContext, OrderContext, ContainerContext} from '@oracle-cx-commerce/react-ui/contexts';
import React, {useState, useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {
  handleOrderSubmitSuccess,
  handleOrderSubmitFailure
} from './utils';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import {getComponentData} from './selectors';
import {
  PAYMENT_METHOD_TOKENIZED_CREDIT_CARD,
  PAYMENT_METHOD_CREDIT_CARD,
  PAYMENT_METHOD_INVOICE_REQUEST,
  PAYMENT_METHOD_ONLINE_PAYMENT_GROUP,
  PAYMENT_TYPE_INVOICE,
  PAYMENT_TYPE_CARD
} from '@oracle-cx-commerce/commerce-utils/constants';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';
import {noop, formatDate} from '@oracle-cx-commerce/utils/generic';

import {shopperSelector} from '../../selectors/shopper'
import {BiCart} from 'react-icons/bi'

/**
* Widget to display place order button and handle order submission
* @param {props} component props
*/
const TmbCheckoutPlaceOrderButton = props => {
  //locales
  const {
    alertOrderNotPlacedPaymentDeclined,
    alertTechnicalProblemContactUs,
    placeOrderButtonLabel,
    currentOrderId
  } = props;
  //context
  const {paymentGroups = {}, shippingGroups = {}} = useContext(OrderContext);
  const {guestEmailDetails = {}, setPlaceOrderInitiated = noop} = useContext(ContainerContext);
  const {action, getState} = useContext(StoreContext);

  //selector data
  const {authenticated, isCurrentOrderScheduled = false} = props;
  const [inProgress, setInProgress] = useState(false);
  const goToPage = useNavigator();

  /**
  * Method to invoke when current order is converted(placed) as scheduled order
  */
  const placeScheduledOrder = () => {
    const {scheduleInfo} = props;
    const schedulePayload = {
      ...scheduleInfo,
      startDate: formatDate(scheduleInfo.startDate),
      endDate: formatDate(scheduleInfo.endDate)
    };
    const {daysInMonth, ...sceduleInfoFinal} = schedulePayload.schedule;
    if (daysInMonth && daysInMonth.length === 0) {
      schedulePayload.schedule = sceduleInfoFinal;
    }
    action('convertCartToScheduledOrder', schedulePayload).then(response => {
      setInProgress(false);
      setPlaceOrderInitiated(false);
      if (response.ok === true) {
        const payload = {
          scheduledOrders: {
            [currentOrderId]: null
          }
        };
        try {
          action('saveComponentData', {...payload});
        } catch (error) {
          console.error(error);
        }
        const messages = {alertOrderNotPlacedPaymentDeclined, alertTechnicalProblemContactUs};
        handleOrderSubmitSuccess(goToPage, response, action, messages);
      } else {
        handleOrderSubmitFailure(action, goToPage, response);
      }
    });
  };

  /**
  * Method to invoke the place order action
  */
  const placeOrder = () => {
    const appliedPaymentGroups = [];

    for (const index of Object.keys(paymentGroups)) {
      const paymentGroup = paymentGroups[index];
      //Exclude zero value payment groups or
      //Zero value with only one payment group
      if (paymentGroup.amount !== 0 || (paymentGroup.amount === 0 && Object.keys(paymentGroups).length === 1)) {
        const {paymentGroupId, paymentMethod} = paymentGroup;
        if (paymentMethod === PAYMENT_METHOD_CREDIT_CARD || paymentMethod === PAYMENT_METHOD_TOKENIZED_CREDIT_CARD) {
          appliedPaymentGroups.push({
            type: PAYMENT_TYPE_CARD,
            paymentGroupId
          });
        } else if (paymentMethod === PAYMENT_METHOD_INVOICE_REQUEST) {
          appliedPaymentGroups.push({
            type: PAYMENT_TYPE_INVOICE,
            paymentGroupId
          });
        } else if (paymentMethod === PAYMENT_METHOD_ONLINE_PAYMENT_GROUP) {
          appliedPaymentGroups.push({
            type: paymentGroup.type,
            paymentGroupId
          });
        } else {
          appliedPaymentGroups.push({
            type: paymentMethod,
            paymentGroupId
          });
        }
      }
    }
    const payload = {
      payments: appliedPaymentGroups
    };

    action('checkoutCart', payload).then(response => {
      //Enable Place Order Button
      setInProgress(false);
      setPlaceOrderInitiated(false);
      if (response.ok === true) {
        const messages = {alertOrderNotPlacedPaymentDeclined, alertTechnicalProblemContactUs};
        handleOrderSubmitSuccess(goToPage, response, action, messages);
      } else {
        handleOrderSubmitFailure(action, goToPage, response);
      }
    });
  };
  //To invoke specific order method if scheduled order is enabled
  const selectedPlaceOrderMethod = () => {
    if (!isCurrentOrderScheduled) placeOrder();
    else placeScheduledOrder();
  };

  /**
  * Method to update email address and invoke place order
  * This will be called only for anonymous flow
  */
  const updateEmailAddressAndPlaceOrder = () => {
    const shippingGroupsPayload = [];

    for (const index of Object.keys(shippingGroups)) {
      const shippingGroup = shippingGroups[index] || {};
      const {shippingGroupId = ''} = shippingGroup;
      const shippingAddress = {
        email: guestEmailDetails.emailAddress
      };
      shippingGroupsPayload.push({shippingAddress, shippingGroupId});
    }

    const payload = {
      items: shippingGroupsPayload
    };

    action('updateCartShippingGroups', payload).then(response => {
      if (response.ok) {
        //Invoke Place order method
        selectedPlaceOrderMethod();
      } else {
        action('notify', {level: 'error', message: response.error.message});
      }
    });
  };

  const updateOrderDynamicProperties = async () => {
    const { profile } = shopperSelector(getState())
    const { dynamicProperties = [] } = profile

    const tam_codset = dynamicProperties.find(dp => dp.id === "tam_codset")
    const tam_external_id = dynamicProperties.find(dp => dp.id === "tam_external_id")

    await action('updateCart', {
      op: 'update', 
      tam_empresa: "1",
      tam_codset: tam_codset && tam_codset.value,
      tam_external_id: tam_external_id && tam_external_id.value
    })

  }

  /**
  * Method to handle place order.
  * Based on the user logged in status decides which method to be invoked.
  */
  const handlePlaceOrder = async () => {
    setInProgress(true);
    setPlaceOrderInitiated(true);
    await updateOrderDynamicProperties();
    if (!authenticated) {
      updateEmailAddressAndPlaceOrder();
    } else {
      selectedPlaceOrderMethod();
    }
  };

  return (
    <Styled id="TmbCheckoutPlaceOrderButton" css={css}>
      <div className="TmbCheckoutPlaceOrderButton">
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={inProgress || (!authenticated && !guestEmailDetails.isEmailValid)}
        >
          <BiCart className="TmbCheckoutPlaceOrderButton_Icon"/>
          {placeOrderButtonLabel}
        </button>
      </div>
    </Styled>
  );
};

export default connect(getComponentData)(TmbCheckoutPlaceOrderButton);
