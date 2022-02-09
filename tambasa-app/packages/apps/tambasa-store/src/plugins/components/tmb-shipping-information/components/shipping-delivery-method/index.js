import React from 'react';
import {HomeDeliveryAddressInformation} from '../homedelivery-address-information';
import {StorePickUpInformation} from '../store-pickup-information';

/**
 * Following component displays Shipping Group Address Details
 * Renders Home delivery address or Store pick up address based on delivery method type
 * @param props
 */
export const ShippingDeliveryMethod = props => {
  const PICKUP_INSTORE_SHIPPINGGROUP = 'inStorePickupShippingGroup';
  const {homeDeliveryAddress, pickUpInStoreAddress, deliveryMethodType, headingShippingTo, headingStorePickUpAt} =
    props;

  return (
    <React.Fragment>
      {deliveryMethodType === PICKUP_INSTORE_SHIPPINGGROUP ? (
        <StorePickUpInformation storeAddress={pickUpInStoreAddress} headingStorePickUpAt={headingStorePickUpAt} />
      ) : (
        <HomeDeliveryAddressInformation address={homeDeliveryAddress} headingAddress={headingShippingTo} { ...props } />
      )}
    </React.Fragment>
  );
};
