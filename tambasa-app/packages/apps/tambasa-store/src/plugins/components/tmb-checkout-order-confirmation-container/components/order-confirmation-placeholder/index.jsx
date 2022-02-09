import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * Renders placeholder boxes for Order Confirmation details Page
 */
const OrderConfirmationPlaceholder = () => {
  return (
    <Styled id="OrderConfirmationPlaceholder" css={css}>
      <div className="OrderConfirmationPlaceholder">
        <div className="OrderConfirmationPlaceholder__Heading"></div>
        <div className="OrderConfirmationPlaceholder__ConfirmationDetails"></div>
        <div className="OrderConfirmationPlaceholder__ContinueShopping"></div>
      </div>
    </Styled>
  );
};

export default OrderConfirmationPlaceholder;
