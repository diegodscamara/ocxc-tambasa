import React, {useContext, useState} from 'react';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';
import {PaymentsContext, StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import {getCurrentOrder, getProfile} from '@oracle-cx-commerce/commerce-utils/selector';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {isEmptyObject, noop} from '@oracle-cx-commerce/utils/generic';
import {
  deleteAppliedPaymentsByTypes,
  deleteAppliedPaymentsByIds,
  getAmountRemainingPaymentGroup,
  isPaymentDetailsComplete,
  isZeroValueOrder
} from '@oracle-cx-commerce/react-components/utils/payment';
import {
  PAYMENT_STATE_INITIAL,
  PAYMENT_TYPE_PAY_IN_STORE,
  PAYMENT_TYPE_STORECREDIT,
  PAYMENT_TYPE_GIFTCARD,
  PAYMENT_TYPE_LOYALTYPOINTS,
  PAYMENT_TYPE_PAY_LATER
} from '@oracle-cx-commerce/commerce-utils/constants';
import PropTypes from 'prop-types';

import {BiCart} from 'react-icons/bi'

const ERROR = 'error';

/**
* Widget for Continue To Review Order button, navigates to review order page on click after applying selected payment.
* @param props
*/
const TmbCheckoutContinueToReviewOrderButton = props => {
  const {continueToPageAddress, reviewOrderButtonLabel, paymentGroups = {}} = props;
  const {payments = [], selectedPaymentType, isInvoicePaymentType} = useContext(PaymentsContext) || {};
  const store = useContext(StoreContext);
  const {action = noop, getState} = store;
  //these payments can be combined with some other payment type like credit card, gift card etc.
  //so these payment type should not be deleted while applying new compatible payment type
  const compatiblePaymentTypes = [PAYMENT_TYPE_GIFTCARD, PAYMENT_TYPE_LOYALTYPOINTS, PAYMENT_TYPE_STORECREDIT];

  const [inProgress, setInProgress] = useState(false);

  const goToPage = useNavigator();

  /**
  * Navigates to the review order page
  */
  const goToReviewOrderPage = () => {
    const pageAddress = continueToPageAddress.split('/');
    const pageName = pageAddress.length > 1 ? pageAddress[1] : pageAddress[0];
    goToPage(pageName);
  };

  const updateCustomProperties = async () => {

    const { paymentGroups = [] } = getCurrentOrder(getState());
    const keys = Object.keys(paymentGroups)
    const firstPaymentKey = keys.length > 0 ? keys[0] : '' 

    /* action('updateAppliedPayment', {
      paymentGroupId: paymentGroups[firstPaymentKey].paymentGroupId || '',
      customProperties: {
        type: isInvoicePaymentType ? "invoicedBill" : "bankSlip",
        condition: ""
      }
    }) */

    const newPayment = {
      ...paymentGroups[firstPaymentKey],
      PONumber: "11111",
      customPaymentProperties: {
        type: isInvoicePaymentType ? "invoicedBill" : "bankSlip",
        condition: ""
      }
    }

    const updateCartResponse = await action('updateCart', {
      op: "update",
      payments: {
        ...paymentGroups,
        [firstPaymentKey]: newPayment
      }
    })
    
  }

  /**
  * Invokes apply payment action on the passed in payments payload.
  * @param paymentsToApply Array The payments to be applied
  */
  const applyPayments = paymentsToApply => {
    if (paymentsToApply.length > 0) {
      action('applyPayments', {items: paymentsToApply})
        .then(response => {
          if (response.ok) {
            const order = getCurrentOrder(getState());
            // If entered payment details is complete, navigate to the review order page
            if (isPaymentDetailsComplete(order)) {
              goToReviewOrderPage();
            }
            setInProgress(false);
            // updateCustomProperties()
          } else {
            action('notify', {level: ERROR, message: response.error.message});
            setInProgress(false);
          }
        });
    } else if (isPaymentDetailsComplete(props)) {
      goToReviewOrderPage();
    }
  };

  /**
  * This method removes applied payment groups from order which are not applicable
  * @param payments {Array} The payments(from payment context) to be processed
  */
  const removeNotApplicablePaymentGroups = async payments => {
    let isError = false;
    if (payments.some(payment => payment.type === PAYMENT_TYPE_PAY_IN_STORE)) {
      //delete all payments as we are about to add in store payment and there is already non in store payment applied
      if (Object.values(paymentGroups).some(pGroup => pGroup.paymentMethod !== PAYMENT_TYPE_PAY_IN_STORE)) {
        const response = await deleteAppliedPaymentsByTypes(store);
        if (!response.ok) {
          action('notify', {level: ERROR, message: response.error.message});
          isError = true;
        }
      }
    } else {
      //get payment group ids to be deleted
      const paymentGroupsToRemoved = Object.values(paymentGroups)
        .filter(
          pGroup =>
            pGroup.paymentState === PAYMENT_STATE_INITIAL &&
            !compatiblePaymentTypes.includes(pGroup.paymentMethod) &&
            !payments.some(payment => payment.paymentGroupId === pGroup.paymentGroupId)
        )
        .map(pGroup => pGroup.paymentGroupId);

      if (paymentGroupsToRemoved.length) {
        const response = await deleteAppliedPaymentsByIds(action, paymentGroupsToRemoved);
        if (!response.ok) {
          action('notify', {level: ERROR, message: response.error.message});
          isError = true;
        }
      }
    }

    return isError;
  };

  /**
   * @author guilherme.vieira
   * @description some old users might not have lastName defined, and it's required on payments
   * @param {Object} paymentDetails holding some infos like type, billingAddress...
   * @returns {Object}
   */
  const validateB2BAddress = paymentDetails => {
    if(paymentDetails && paymentDetails.billingAddress && (!paymentDetails.billingAddress.lastName || paymentDetails.billingAddress.lastName === "")) {
      const currentProfile = getProfile(getState())
      const tam_isB2B_user = currentProfile.dynamicProperties.find(dp => dp.id === "tam_isB2B_user")
      if(tam_isB2B_user && tam_isB2B_user.value) {
        paymentDetails.billingAddress.lastName = paymentDetails.billingAddress.firstName
      }
    }
    
    return paymentDetails
  }

  /**
  * Processes the payments in the context
  * Updates the payment group if the payment in the context has an paymentGroupId
  * or calls the apply payments to apply the payment in the context.
  * @param payments Array The payments to be processed
  */
  const processPayments = async payments => {
    const paymentsToApply = [];
    let isError = false;
    isError = await removeNotApplicablePaymentGroups(payments);
    if (isError) {
      setInProgress(false);

      return;
    }
    for (const payment of payments) {
      const {paymentGroupId, ...paymentDetails} = payment;
      const existingPaymentGroup = paymentGroups[paymentGroupId];
      if (paymentGroupId && existingPaymentGroup) {
        // Remove existing applied credit card payment group and reapply if
        // a different saved card has been selected, or
        // selection has been changed from saved card to a newly entered card(not saved) or
        // selection has been changed from newly entered card(not saved) to a saved card
        if (
          (payment.savedCardId &&
            existingPaymentGroup.savedCardId &&
            payment.savedCardId !== existingPaymentGroup.savedCardId) ||
          (!existingPaymentGroup.savedCardId && payment.savedCardId) ||
          (existingPaymentGroup.savedCardId && !payment.savedCardId)
        ) {
          const response = await action('deleteAppliedPayment', {paymentGroupId});
          if (response.ok) {
            paymentsToApply.push(paymentDetails);
          } else {
            action('notify', {level: ERROR, message: response.error.message});
            isError = true;
            setInProgress(false);
            break;
          }
        } else {
          // If there is a payment group with saved card id , only the cvv can be updated
          // Type and seqNum properties are not required for updating an existing payment group
          const {savedCardId, type, seqNum, ...paymentDetailsToUpdate} = paymentDetails;
          // If there is addressType property in billingAddress it can't be patched.
          if (paymentDetailsToUpdate.billingAddress) {
            const {
              billingAddress: {addressType, ...billingAddressDetails}
            } = paymentDetailsToUpdate;
            paymentDetailsToUpdate.billingAddress = billingAddressDetails;
          }

          /* paymentDetailsToUpdate.customProperties = {
            type: isInvoicePaymentType ? "invoicedBill" : "bankSlip",
            condition: ""
          } */       

          if (!isEmptyObject(paymentDetailsToUpdate)) {
            const paymentGroupToUpdate = {paymentGroupId, ...paymentDetailsToUpdate};
            const updateAppliedPaymentResponse = await action('updateAppliedPayment', paymentGroupToUpdate);
            if (!updateAppliedPaymentResponse.ok) {
              action('notify', {level: ERROR, message: updateAppliedPaymentResponse.error.message});
              isError = true;
              setInProgress(false);
              break;
            }
          }
        }
      } else {
        const validatedPaymentDetails = validateB2BAddress(paymentDetails)
        paymentsToApply.push(validatedPaymentDetails);
      }
    }
    if (!isError) {
      // await updateCustomProperties()
      applyPayments(paymentsToApply);
    }
  };

  /**
  * Handler for continue to review order button
  */
  const onContinueToReviewOrder = () => {
    action('notifyClearAll');
    setInProgress(true);
    if (payments.length > 0) {
      processPayments(payments);
    } else if (isPaymentDetailsComplete(props) || selectedPaymentType === PAYMENT_TYPE_PAY_LATER) {
      goToReviewOrderPage();
    }
  };

  /**
   * @author guilherme.vieira
   * @description Checks if at least one of the commerce items has external pricing values
   * @param {Object} commerceItems 
   */
  const doCommerceItemsHaveExternalPrices = (commerceItems) => {
    const commerceItemsAsArray = Object.entries(commerceItems)
      .map(entriesGroup => ({ [entriesGroup[0]]: entriesGroup[1] }))

    return commerceItemsAsArray.some(commerceItem => { 
      const key = Object.keys(commerceItem)
      return commerceItem[key].externalPrice && commerceItem[key].externalPriceQuantity
    })
  }

  /**
   * @author guilherme.vieira
   * @returns {Boolean} determining wether invoice it's ok or not
   */
  const isInvoicePaymentTypeOK = () => {
    const { dynamicProperties: orderDynamicProperties = [], commerceItems = {} } = getCurrentOrder(getState())
    const externalPriceListId = orderDynamicProperties.find(dp => dp.id === "tam_externalPricingID")
    const hasExternalPriceListIdDefined = externalPriceListId &&
      externalPriceListId.value && externalPriceListId.value !== ""
      && externalPriceListId.value !== "__reset"

    return hasExternalPriceListIdDefined && doCommerceItemsHaveExternalPrices(commerceItems)
  }

  /**
  * Returns true if Continue to review order button should be disabled
  * Disable continue to review order button, when
  * Continue to review order is in progress,
  * There are no payments in the payment context when
  * the order is not a zero value order
  * or there are no existing payment groups or there is a default payment group or appliedPaymentGroup
  */
  const isContinueToReviewOrderButtonDisabled = () => {
    const isItDisabled = (
      inProgress ||
      (isInvoicePaymentType && !isInvoicePaymentTypeOK()) ||
      (!isZeroValueOrder(props) &&
        (Object.keys(paymentGroups).length === 0 || getAmountRemainingPaymentGroup(props)) &&
        selectedPaymentType !== PAYMENT_TYPE_PAY_LATER &&
        payments.length === 0)
    );

    // Easier to trigger an action than calling this function there and assign all its attributes
    action('isContinueToReviewOrderButtonDisabled', { isItDisabled })

    return isItDisabled
  };

  return (
    <Styled id="TmbCheckoutContinueToReviewOrderButton" css={css}>
      <div className="TmbCheckoutContinueToReviewOrderButton">
        <button
          type="button"
          className="TmbCheckoutContinueToReviewOrderButton__Button"
          disabled={isContinueToReviewOrderButtonDisabled()}
          onClick={onContinueToReviewOrder}
        >
          <BiCart className="TmbCheckoutContinueToReviewOrderButton__Icon"/>
          {reviewOrderButtonLabel}
        </button>
      </div>
    </Styled>
  );
};

TmbCheckoutContinueToReviewOrderButton.propTypes = {
  /**
  * The page address to redirect to on continue to review order click.
  */
  continueToPageAddress: PropTypes.string.isRequired,
  /**
  * The payment groups in the order
  */
  paymentGroups: PropTypes.objectOf(
    PropTypes.shape({
      /**
      * The payment group id
      */
      paymentGroupId: PropTypes.string.isRequired
    })
  )
};

TmbCheckoutContinueToReviewOrderButton.defaultProps = {
  paymentGroups: {}
};

export default connect(getCurrentOrder)(TmbCheckoutContinueToReviewOrderButton);
