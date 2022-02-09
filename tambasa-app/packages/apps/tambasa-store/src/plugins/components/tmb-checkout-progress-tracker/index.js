import React, {useCallback, useState, useEffect, useContext} from 'react';
import {
  PAGE_CART_LINK,
  PAGE_CHECKOUT_PAYMENT_LINK,
  PAGE_CHECKOUT_REVIEW_ORDER_LINK,
  PAGE_CHECKOUT_SHIPPING_LINK
} from '@oracle-cx-commerce/commerce-utils/constants';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getComponentData} from './selectors';
import {isEmptyObject, noop} from '@oracle-cx-commerce/utils/generic';
import {isPaymentDetailsComplete} from '@oracle-cx-commerce/react-components/utils/payment';
import {isShippingDetailsComplete} from '@oracle-cx-commerce/react-components/utils/shipping';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts'
import PropTypes from 'prop-types';

/**
 * Widget that displays the checkout progress
 */
const TmbCheckoutProgressTracker = props => {
  //resources
  const {headingCheckout, headingPayment, headingReview, headingShipping} = props;

  // addresses for the checkout pages (from widget config)
  const {checkoutShippingAddress, checkoutPaymentAddress, checkoutReviewAddress} = props;

  const {
    currentOrderId,
    currentOrder = {},
    currentPage,
    isB2BUser,
    isPlaceOrderInProgress,
    isPayAfterApprovalSelected,
    mobile
  } = props;
  const {numberOfItems = 0} = currentOrder;
  const currentPageId = currentPage.pageId.replace(/\//g, '')

  const { subscribeDispatch } = useContext(StoreContext)
  const [ isFinalStepDisabled, setIsFinalStepDisabled ] = useState(false)

  useEffect(() => {
    subscribeDispatch((actionEvent) => {
      const { type, payload } = actionEvent;
      if (type === "isContinueToReviewOrderButtonDisabled") {
        setIsFinalStepDisabled(payload.isItDisabled)
      }
   });
  }, [])

  const goToPage = useNavigator();

  // progress tracker data for each page type
  const checkoutPagesData = {
    [PAGE_CHECKOUT_SHIPPING_LINK]: {index: 1, label: headingShipping, page: checkoutShippingAddress},
    [PAGE_CHECKOUT_PAYMENT_LINK]: {index: 2, label: headingPayment, page: checkoutPaymentAddress},
    [PAGE_CHECKOUT_REVIEW_ORDER_LINK]: {index: 3, label: headingReview, page: checkoutReviewAddress}
  };

  // current active tab
  const currentActiveTab = checkoutPagesData[currentPageId] ? checkoutPagesData[currentPageId].index : -1;

  /**
   * @param {Sting} pageType the page type
   * @returns {boolean} true if the previous pages are valid
   */
  const isPageDisabled = pageType => {
    if (numberOfItems === 0) {
      return true;
    }
    if (pageType === PAGE_CHECKOUT_PAYMENT_LINK) {
      return !isShippingDetailsComplete(currentOrder, isB2BUser);
    }
    if (pageType === PAGE_CHECKOUT_REVIEW_ORDER_LINK) {
      return !(
        isShippingDetailsComplete(currentOrder, isB2BUser) &&
        (isPaymentDetailsComplete(currentOrder) || isPayAfterApprovalSelected)
      );
    }

    return false;
  };

  /**
   * Method to navigate to the appropriate page
   * If any of the the previous pages have invalid information or incomplete data,
   * then it navigates to that page
   * @param {Sting} pageType the page type for the currently loaded page
   */
  const validatePage = useCallback(
    pageType => {
      if (numberOfItems === 0) {
        // If the cart is empty, navigate to the cart page
        goToPage(PAGE_CART_LINK);
      } else if (pageType === PAGE_CHECKOUT_PAYMENT_LINK && !isShippingDetailsComplete(currentOrder, isB2BUser)) {
        // for checkout payment page, if the shipping information is not valid, then navigate to the shipping page
        goToPage(checkoutPagesData[PAGE_CHECKOUT_SHIPPING_LINK].page);
      } else if (pageType === PAGE_CHECKOUT_REVIEW_ORDER_LINK) {
        if (!isShippingDetailsComplete(currentOrder, isB2BUser)) {
          // for checkout review page, if the shipping information is not valid, then navigate to the shipping page
          goToPage(checkoutPagesData[PAGE_CHECKOUT_SHIPPING_LINK].page);
        } else if (!isPaymentDetailsComplete(currentOrder) && !isPayAfterApprovalSelected) {
          // For checkout review page, if the payment information is not valid, then navigate to the payment page
          goToPage(checkoutPagesData[PAGE_CHECKOUT_PAYMENT_LINK].page);
        }
      }
    },
    [numberOfItems, currentOrder, isB2BUser, goToPage, checkoutPagesData, isPayAfterApprovalSelected]
  );

  useEffect(() => {
    // If there is no incomplete order and place order is not in progress, then navigate to the cart page
    if (!currentOrderId && !isPlaceOrderInProgress) {
      goToPage(PAGE_CART_LINK);
    }

    if (currentOrderId && !isEmptyObject(currentOrder)) {
      validatePage(currentPageId);
    }
  }, [currentOrder, currentOrderId, currentPageId, goToPage, isPlaceOrderInProgress, validatePage]);

  const checkoutStepButton = (step) => {
    return checkoutPagesData[step].index === 3
      ? (
        <button
          type="button"
          className={`TmbCheckoutProgressTracker__label ${isFinalStepDisabled ? 'disabled' : ''}`}
          disabled={isPageDisabled(step) || isFinalStepDisabled}
          onClick={
            isFinalStepDisabled
              ? noop
              : () => goToPage(checkoutPagesData[step].page)
          }
        >
          {checkoutPagesData[step].label}
        </button>
      ) : (
        <button
          type="button"
          className="TmbCheckoutProgressTracker__label"
          disabled={isPageDisabled(step)}
          onClick={() => goToPage(checkoutPagesData[step].page)}
        >
          {checkoutPagesData[step].label}
        </button>
      )
  }

  return (
    <Styled id="TmbCheckoutProgressTracker" css={css}>
      <div className="TmbCheckoutProgressTracker">
        { mobile && <h1 className="TmbCheckoutProgressTracker__heading">{headingCheckout}</h1> }
        <ul className="TmbCheckoutProgressTracker__wrapper">
          {(Object.keys(checkoutPagesData || {}) || []).map(step => (
            <li key={step} className="TmbCheckoutProgressTracker__step">
              <div
                data-text={checkoutPagesData[step].index}
                className={`${
                  currentActiveTab >= checkoutPagesData[step].index ? 'TmbCheckoutProgressTracker__markerActive' : ''
                } TmbCheckoutProgressTracker__marker`}
              >
                { checkoutStepButton(step) }
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Styled>
  );
};

TmbCheckoutProgressTracker.propTypes = {
  checkoutShippingAddress: PropTypes.string.isRequired,
  checkoutPaymentAddress: PropTypes.string.isRequired,
  checkoutReviewAddress: PropTypes.string.isRequired,
  currentOrderId: PropTypes.string.isRequired,
  currentOrder: PropTypes.shape({
    shippingGroups: PropTypes.objectOf(PropTypes.object),
    commerceItems: PropTypes.objectOf(PropTypes.object)
  }),
  currentPage: PropTypes.objectOf(PropTypes.object),
  isB2BUser: PropTypes.bool.isRequired,
  isPlaceOrderInProgress: PropTypes.bool.isRequired,
  isPayAfterApprovalSelected: PropTypes.bool.isRequired
};

TmbCheckoutProgressTracker.defaultProps = {
  currentOrder: {}
};

export default connect(getComponentData)(TmbCheckoutProgressTracker);
