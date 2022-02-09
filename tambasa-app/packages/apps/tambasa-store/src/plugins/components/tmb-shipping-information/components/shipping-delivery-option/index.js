import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

export const ShippingDeliveryOption = props => {
  const {deliveryMethodOption = {}, textShippingOption} = props;
  const shippingOption = deliveryMethodOption.shippingMethodDescription;

  return (
    <Styled id="ShippingDeliveryOption" css={css}>
      <div className="ShippingDeliveryOption__ShippingOption">
        <div>
          <div className="ShippingDeliveryOption__ShippingOptionLabel">{textShippingOption}</div>
        </div>
        <div className="ShippingDeliveryOption__ShippingOptionDescription">{shippingOption}</div>
      </div>
    </Styled>
  );
};
