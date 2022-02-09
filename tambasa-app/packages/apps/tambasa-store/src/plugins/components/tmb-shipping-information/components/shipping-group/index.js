import React, {useContext} from 'react';
import {OrderContext} from '@oracle-cx-commerce/react-ui/contexts';
import Card from '@oracle-cx-commerce/react-components/card';
import OrderItemDetails from '../order-item-details';
import {ShippingAddressDetails} from '../../../tmb-shipping-information/components/shipping-address-details';
import {hasCartItemsFromMultipleSites} from '@oracle-cx-commerce/commerce-utils/selector';
import {useSelector} from '@oracle-cx-commerce/react-components/provider';

/**
 * Following component renders shipping group details
 * Following Wrapper component holds the sub components of shipping group
 * @param props
 */
export const ShippingGroup = props => {
  const {shippingGroupId} = props;
  const order = useContext(OrderContext);
  const {shippingGroups = {}, commerceItems = {}} = order;
  const displayCartItemSiteInfo = useSelector(hasCartItemsFromMultipleSites, {commerceItems});
  // const PICKUP_INSTORE_SHIPPINGGROUP = 'inStorePickupShippingGroup';

  return (
    <React.Fragment>
      {((shippingGroups[shippingGroupId] || {}).items || []).length > 0 && (
        <Card key={`ShippingGroup-${shippingGroupId}`}>
          <OrderItemDetails
            shippingGroup={shippingGroups[shippingGroupId]}
            commerceItems={commerceItems}
            shippingGroupId={shippingGroupId}
            priceListGroup={props.priceListGroup}
            displayCartItemSiteInfo={displayCartItemSiteInfo}
            {...props}
          />
          <ShippingAddressDetails
            shippingGroup={shippingGroups[shippingGroupId]}
            shippingGroupId={shippingGroupId}
            {...props}
          />
        </Card>
      )}
    </React.Fragment>
  );
};
