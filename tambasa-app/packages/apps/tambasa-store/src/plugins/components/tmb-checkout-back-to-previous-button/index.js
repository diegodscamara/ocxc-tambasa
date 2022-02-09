import {
  PAGE_CHECKOUT_PAYMENT_LINK,
  PAGE_CHECKOUT_REVIEW_ORDER_LINK,
  PAGE_CHECKOUT_SHIPPING_LINK
} from '@oracle-cx-commerce/commerce-utils/constants';

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getComponentData} from './selectors';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';
import PropTypes from 'prop-types';

import {BiArrowBack} from 'react-icons/bi'

/**
 * Widget to navigate to the previous checkout page
 * Widget is currently displayed in the checkout payment page
 * and is available to both checkout payment and checkout review order pages
 */
const TmbCheckoutBackToPreviousButton = props => {
  const {actionBackToPrevious} = props;
  const {currentPage} = props;

  const goToPage = useNavigator();

  /**
   * Click handler for the 'Back to Previous' button
   * If the current page is checkout-payment, then it navigates to the checkout shipping page
   * If the current page is checkout-review-order, then it navigates to the checkout payment page
   */
  const handleButtonClick = () => {
    if (currentPage.path === PAGE_CHECKOUT_PAYMENT_LINK) {
      goToPage(PAGE_CHECKOUT_SHIPPING_LINK);
    } else if (currentPage.path === PAGE_CHECKOUT_REVIEW_ORDER_LINK) {
      goToPage(PAGE_CHECKOUT_PAYMENT_LINK);
    }
  };

  return (
    <Styled id="TmbCheckoutBackToPreviousButton" css={css}>
      <div className="TmbCheckoutBackToPreviousButton">
        <button className="secondary" type="button" onClick={handleButtonClick}>
          <BiArrowBack className="TmbCheckoutBackToPreviousButton__Icon"/>
          {actionBackToPrevious}
        </button>
      </div>
    </Styled>
  );
};

TmbCheckoutBackToPreviousButton.propTypes = {
  currentPage: PropTypes.object.isRequired
};

export default connect(getComponentData)(TmbCheckoutBackToPreviousButton);
