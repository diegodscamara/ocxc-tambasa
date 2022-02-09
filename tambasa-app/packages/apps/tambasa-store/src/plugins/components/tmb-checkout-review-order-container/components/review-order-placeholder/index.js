import React from 'react';

import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * Renders placeholder boxes for Review Order Page
 */
const ReviewOrderPlaceholder = () => {
  return (
    <Styled id="ReviewOrderPlaceholder" css={css}>
      <div className="ReviewOrderPlaceholder">
        <div className="ReviewOrderPlaceholder__CustomerEmail"></div>
        <div className="ReviewOrderPlaceholder__OrderItemsHolder">
          <div className="ReviewOrderPlaceholder__OrderItem">
            <div className="ReviewOrderPlaceholder__OrderItemImage"></div>
            <div className="ReviewOrderPlaceholder__OrderItemName"></div>
          </div>
          <div className="ReviewOrderPlaceholder__OrderItem">
            <div className="ReviewOrderPlaceholder__OrderItemImage"></div>
            <div className="ReviewOrderPlaceholder__OrderItemName"></div>
          </div>
        </div>
        <div className="ReviewOrderPlaceholder__OrderSummary"></div>
        <div className="ReviewOrderPlaceholder__PaymentInformation"></div>
        <div className="ReviewOrderPlaceholder__PlaceOrder"></div>
      </div>
    </Styled>
  );
};

export default ReviewOrderPlaceholder;
