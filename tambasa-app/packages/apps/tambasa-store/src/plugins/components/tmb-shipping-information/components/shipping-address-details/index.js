import React, {useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import HomeIcon from '@oracle-cx-commerce/react-components/icons/home';
import StoreIcon from '@oracle-cx-commerce/react-components/icons/store';
import {ShippingDeliveryMethod} from '../shipping-delivery-method';
import {ShippingDeliveryOption} from '../shipping-delivery-option';
import TmbPaymentInformation from '../../../tmb-payment-information'
import css from './styles.css';

/**
 * Following component renders Shipping Group Address Details
 * Includes sub components to render shipping delivery address and delivery option
 * @param props
 */
export const ShippingAddressDetails = props => {
  const PICKUP_INSTORE_SHIPPINGGROUP = 'inStorePickupShippingGroup';
  const {shippingGroup = {}} = props;

  return (
    <Styled id="ShippingAddressDetails" css={css}>
      {(shippingGroup.items || []).length > 0 && (
        <div className="ShippingAddressDetails__ShippingDetails">
          <div className="ShippingAddressDetails__ShippingMethodIcon">
            {shippingGroup.type !== PICKUP_INSTORE_SHIPPINGGROUP ? (
              <HomeIcon className="ShippingAddressDetails__HomeIcon" />
            ) : (
              <StoreIcon className="ShippingAddressDetails__StoreIcon" />
            )}
          </div>
          <div className="PaymentAndShippingContainer">
            <TmbPaymentInformation { ...props }/>
            <ShippingDeliveryMethod
              homeDeliveryAddress={shippingGroup.shippingAddress}
              pickUpInStoreAddress={shippingGroup.store}
              deliveryMethodType={shippingGroup.type}
              {...props}
            >
              {shippingGroup.type !== PICKUP_INSTORE_SHIPPINGGROUP && (
                <ShippingDeliveryOption deliveryMethodOption={shippingGroup.shippingMethod} {...props} />
              )}
            </ShippingDeliveryMethod>
          </div>
        </div>
      )}
    </Styled>
  );
};
