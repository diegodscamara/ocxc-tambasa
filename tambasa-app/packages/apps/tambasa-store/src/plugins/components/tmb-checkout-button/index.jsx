import React, {useContext} from 'react';
import {CartContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getComponentData} from './selectors';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';
import {getCheckoutLink} from './utils';
import PropTypes from 'prop-types';

import { BiCart } from 'react-icons/bi'

/**
* Widget for the 'Checkout' button in the cart page
* If the cart is valid, then it navigates to the checkout-shipping/checkout-login page
*/
const TmbCheckoutButton = props => {
  const {actionCheckout} = props;
  const {isUserLoggedIn, numberOfItems = 0} = props;

  // cart context
  const {
    cartStatus: {isCartInValid, hasOutOfStockItems, hasInactiveItems}
  } = useContext(CartContext);

  const goToPage = useNavigator();

  /**
  * Click handler for the checkout button
  * If the cart is valid, then navigate to the checkout page,
  * else scroll up in the cart page to display the alert message to the user
  */
  const onCheckoutClick = () => {
    if (!isCartInValid && !hasOutOfStockItems && !hasInactiveItems) {
      goToPage(getCheckoutLink(isUserLoggedIn));
    } else {
      scrollTo({top: 0, left: 0});
    }
  };

  return (
    <Styled id="TmbCheckoutButton" css={css}>
      {numberOfItems > 0 && (
        <button
          type="button"
          className="TmbCheckoutButton"
          disabled={isCartInValid || hasOutOfStockItems || hasInactiveItems}
          onClick={onCheckoutClick}
        >
          <BiCart className="TmbCheckoutButton__Icon" style={{
            fontSize: '1.5rem',
            color: '#fff'
          }}/>
          <span className="TmbCheckoutButton__Label">
            {actionCheckout}
          </span>
        </button>
      )}
    </Styled>
  );
};

TmbCheckoutButton.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  numberOfItems: PropTypes.number
};

TmbCheckoutButton.defaultProps = {
  numberOfItems: 0
};

export default connect(getComponentData)(TmbCheckoutButton);
