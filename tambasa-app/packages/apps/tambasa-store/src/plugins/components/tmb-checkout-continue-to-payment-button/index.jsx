import {CartContext, ScheduledOrderContext, StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import {PAGE_CHECKOUT_PAYMENT_LINK, SHIPPING_GROUP_HARDGOOD} from '@oracle-cx-commerce/commerce-utils/constants';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  getHardgoodShippingGroupsWithItems,
  deleteEmptyShippingGroups,
  mergeDuplicateShippingGroups,
  loadShippingMethodsForAllSGs
} from '@oracle-cx-commerce/react-components/utils/shipping';
import {loadShippingMethodsAndSetDefaultForSG} from '@oracle-cx-commerce/react-components/utils/address';

import {CheckoutShippingContext} from '@oracle-cx-commerce/react-widgets/checkout/checkout-shipping-container/context';
import ConfirmationDialog from '@oracle-cx-commerce/react-components/confirmation-dialog';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {noop} from '@oracle-cx-commerce/utils/generic';
import {useComponentData} from './selectors';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';
import PropTypes from 'prop-types';

import {BiCart} from 'react-icons/bi'


/**
* Widget that handles the navigation between different shipping phases
* It displays the 'Continue'/'Continue to Payment' button based on the shipping phase
* For 'Continue' button, it navigates to the required shipping phase
* For 'Continue to Payment' button, it navigates to the checkout payment page
* @param props
*/
const TmbCheckoutContinueToPaymentButton = props => {
  // resources
  const {
    actionConfirm,
    actionContinue,
    actionContinueToPayment,
    closeLinkAltText,
    headingItemsWillBeShippedTogether,
    labelCancel,
    alertItemsWillBeShippedTogether,
    alertVerifyShippingDetails
  } = props;

  const {id, cssOverride = ''} = props;

  //selector
  const {isUserLoggedIn, shippingGroups, currentOrderId} = useComponentData();

  // cart context
  const {cartStatus = {}} = useContext(CartContext);

  // shipping context
  const {
    shippingStatus = {},
    setShippingStatus = noop,
    deliveryAddressForm = {},
    checkoutShippingTabs
  } = useContext(CheckoutShippingContext);
  const {showConinueToPayment = false, enableContinue = false} = shippingStatus;

  // scheduled order context
  const {scheduledInfoStatus = {}, createSchedulePayload = {}} = useContext(ScheduledOrderContext);
  const {enableScheduleContinue = false} = scheduledInfoStatus;
  const enableSchedledOrderContinue = createSchedulePayload.isScheduleCurrentOrder ? enableScheduleContinue : true;

  const store = useContext(StoreContext);
  const {action} = store;
  const goToPage = useNavigator();

  const [showDuplicateShippingGroupsDialog, setShowDuplicateShippingGroupsDialog] = useState(false);

  /**
  * Failure callback function
  */
  const onNotOk = useCallback(
    ({error: {message = ''} = {}} = {}) => {
      action('notify', {level: 'error', message});
    },
    [action]
  );

  /**
  * Function to load the shipping methods for all the shipping groups
  * and select the first shipping method as default if the shipping method is not selected for any shipping group
  */
  const loadCheckoutShippingMethods = useCallback(() => {
    loadShippingMethodsForAllSGs(store)
      .then(response => {
        if (response && response.ok === false) {
          onNotOk({response});
        }
      })
      .finally(() => {
        setShippingStatus(prevState => {
          return {...prevState, loadShippingMethods: false};
        });
      });
  }, [onNotOk, setShippingStatus, store]);

  /**
  * Gets shipping methods for all home delivery shipping groups on change of amount of the order
  */
  useEffect(() => {
    if (
      (shippingStatus.tabIndex === checkoutShippingTabs.MULTI_SHIPPING_SUMMARY_TAB_INDEX ||
        shippingStatus.tabIndex === checkoutShippingTabs.SINGLE_SHIPPING_SUMMARY_TAB_INDEX) &&
      shippingStatus.loadShippingMethods
    ) {
      loadCheckoutShippingMethods();
    }
  }, [
    checkoutShippingTabs.MULTI_SHIPPING_SUMMARY_TAB_INDEX,
    checkoutShippingTabs.SINGLE_SHIPPING_SUMMARY_TAB_INDEX,
    loadCheckoutShippingMethods,
    shippingStatus.loadShippingMethods,
    shippingStatus.tabIndex,
    store
  ]);

  /**
  * Function to update the shipping address for the shipping group
  * Invokes the 'updateCartShippingGroup' action
  * @param {Object} shippingGroup shipping group
  */
  const updateShippingGroupAddress = useCallback(
    (shippingGroup = {}) => {
      const payload = {
        shippingAddress: deliveryAddressForm.address,
        type: SHIPPING_GROUP_HARDGOOD,
        shippingGroupId: shippingGroup.shippingGroupId
      };

      action('updateCartShippingGroup', payload)
        .then(response => {
          if (response.ok) {
            // Set the tabIndex to the next shipping screen
            setShippingStatus(prevState => {
              return {...prevState, enableContinue: false, tabIndex: shippingStatus.tabIndex + 1};
            });
            loadShippingMethodsAndSetDefaultForSG(store, shippingGroup);
          } else {
            setShippingStatus(prevState => {
              return {...prevState, enableContinue: false};
            });
            onNotOk(response);
          }
        })
        .catch(() => {
          setShippingStatus(prevState => {
            return {...prevState, enableContinue: false};
          });
          onNotOk();
        });

      if (isUserLoggedIn && deliveryAddressForm.saveAsANewProfileAddress) {
        action('createProfileAddress', {...deliveryAddressForm.address});
      }
      if (isUserLoggedIn && deliveryAddressForm.saveAsANewAccountAddress) {
        action('addOrganizationAddress', {...deliveryAddressForm.address});
      }
    },
    [
      action,
      deliveryAddressForm.address,
      deliveryAddressForm.saveAsANewAccountAddress,
      deliveryAddressForm.saveAsANewProfileAddress,
      isUserLoggedIn,
      onNotOk,
      setShippingStatus,
      shippingStatus.tabIndex,
      store
    ]
  );

  /**
  * Function to check if multiple shipping groups exist with same shipping address and shipping method
  */
  const hasDuplicateShippingGroup = useCallback(() => {
    const hardGoodShippingGroups = getHardgoodShippingGroupsWithItems(shippingGroups);

    if (hardGoodShippingGroups.length > 1) {
      const addressShippingMethodSet = new Set();
      for (let i = 0; i < hardGoodShippingGroups.length; i++) {
        const shippingAddress = Object.values(hardGoodShippingGroups[i].shippingAddress || {}).join('-');
        const shippingMethod = (hardGoodShippingGroups[i].shippingMethod || {}).value || '';

        const key = `${shippingAddress}-${shippingMethod}`;
        addressShippingMethodSet.add(key);

        // If the shippingAddress-shippingMethod set size is less than i,
        // then there are shipping groups that share same address and shipping method
        if (addressShippingMethodSet.size - 1 < i) {
          return true;
        }
      }
    }

    return false;
  }, [shippingGroups]);

  /**
  * Function to save schedule info to state when shopper selects for scheduling order
  */
  const saveScheduleInfoToState = useCallback(async () => {
    const {isScheduleCurrentOrder, ...scheduleInfo} = createSchedulePayload;
    if (isScheduleCurrentOrder && currentOrderId) {
      const payload = {
        scheduledOrders: {
          [currentOrderId]: scheduleInfo
        }
      };
      try {
        await action('saveComponentData', {...payload});
      } catch (error) {
        console.error(error);
      }
    } else if (!isScheduleCurrentOrder && createSchedulePayload.name) {
      const payload = {
        scheduledOrders: {
          [currentOrderId]: null
        }
      };
      try {
        await action('saveComponentData', {...payload});
      } catch (error) {
        console.error(error);
      }
    }
  }, [action, createSchedulePayload, currentOrderId]);

  /**
  * Click handler function for the 'Confirm' button in the dialog
  */
  const handleConfirmClick = async () => {
    const response = await mergeDuplicateShippingGroups(action, shippingGroups);
    if (response.ok) {
      goToPage(PAGE_CHECKOUT_PAYMENT_LINK);
    }
  };

  /**
  * Click handler function for the 'Cancel' button in the dialog
  */
  const handleCancelClick = () => {
    setShowDuplicateShippingGroupsDialog(false);
  };

  /**
  * Click handler function for the Checkout Continue To Payment Button button (Continue / Continue to Payment) in the shipping page
  * 1. For 'Continue to Payment' button, it navigates to the checkout payment page if the cart is valid
  * 2. For 'Continue' button, it either triggers the required action or sets the tabIndex to the next shipping phase
  * @param {Object} cartStatus cart status from the Cart Context
  */
  const handleShippingContinueBtn = useCallback(async () => {
    // For 'Continue to Payment' button, navigate to the checkout payment page if the cart is valid,
    // else scroll up to display the error message
    if (shippingStatus.showConinueToPayment) {
      saveScheduleInfoToState();
      const {isCartInValid, hasOutOfStockItems, hasInactiveItems} = cartStatus;

      if (!isCartInValid && !hasOutOfStockItems && !hasInactiveItems) {
        const response = await deleteEmptyShippingGroups(action, shippingGroups);
        if (!response.ok) {
          onNotOk(response);
        }

        if (hasDuplicateShippingGroup()) {
          setShowDuplicateShippingGroupsDialog(true);

          return;
        }

        goToPage(PAGE_CHECKOUT_PAYMENT_LINK);
      } else {
        scrollTo({top: 0, left: 0});
      }

      return;
    }

    const hardgoodShippingGroups = getHardgoodShippingGroupsWithItems(shippingGroups);

    // Save the delivery address when the address form is modified
    if (deliveryAddressForm.isModified) {
      // When a single home delivery shipping group is available, then update the shipping group with the delivery form address
      if (hardgoodShippingGroups.length === 1) {
        updateShippingGroupAddress(hardgoodShippingGroups[0]);
      }
    } else {
      // Set the tabIndex to the next shipping phase
      setShippingStatus(prevState => {
        return {...prevState, tabIndex: prevState.tabIndex + 1};
      });
    }

    scrollTo({top: 0, left: 0});
  }, [
    action,
    cartStatus,
    deliveryAddressForm.isModified,
    goToPage,
    hasDuplicateShippingGroup,
    onNotOk,
    saveScheduleInfoToState,
    setShippingStatus,
    shippingGroups,
    shippingStatus.showConinueToPayment,
    updateShippingGroupAddress
  ]);

  /**
  * Click handler function for the 'Continue' or 'Continue to Payment' button
  */
  const handleClick = () => {
    handleShippingContinueBtn();
  };

  return (
    <Styled id="TmbCheckoutContinueToPaymentButton" css={css}>
      <div className="TmbCheckoutContinueToPaymentButton">
        <button
          type="button"
          disabled={!enableContinue || !enableSchedledOrderContinue}
          className={`TmbCheckoutContinueToPaymentButton__Continue ${
            (!enableContinue || !enableSchedledOrderContinue) && 'TmbCheckoutContinueToPaymentButton__Continue--disabled'
          } `}
          onClick={handleClick}
        >
          <BiCart className="TmbCheckoutContinueToPaymentButton__Icon"/>
          <span className="TmbCheckoutContinueToPaymentButton__Label">
            {showConinueToPayment ? actionContinueToPayment : actionContinue}
          </span>
        </button>

        <ConfirmationDialog
          id={id}
          cssOverride={cssOverride}
          title={headingItemsWillBeShippedTogether}
          closeAriaLabel={closeLinkAltText}
          closeIconTitle={closeLinkAltText}
          alertMessage={alertItemsWillBeShippedTogether}
          confirmMessage={alertVerifyShippingDetails}
          labelConfirm={actionConfirm}
          labelCancel={labelCancel}
          confirmCallback={handleConfirmClick}
          cancelCallback={handleCancelClick}
          closeCallback={handleCancelClick}
          show={showDuplicateShippingGroupsDialog}
        ></ConfirmationDialog>
      </div>
    </Styled>
  );
};

TmbCheckoutContinueToPaymentButton.propTypes = {
  id: PropTypes.string.isRequired
};

export default TmbCheckoutContinueToPaymentButton;
