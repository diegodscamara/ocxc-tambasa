import React from 'react';
import {ShippingGroup} from '../../tmb-shipping-information/components/shipping-group';

/**
 * Following component filters hard good shipping groups and renders each hard good shipping group.
 *
 * @param props - list of shipping groups
 */
export const HardGoodShippingGroupList = props => {
  const {shippingGroups = {}, priceListGroup = {}} = props;
  let listCount = 0;
  let list = [];

  const filterHardGoodShippingGroups = () => {
    if (Object.keys(shippingGroups).length > 0) {
      list = Object.keys(shippingGroups).filter(key => {
        return shippingGroups[key].type === 'hardgoodShippingGroup';
      });
    }
    if (list.length > 0) listCount = list.length;

    return list;
  };

  return (
    <>
      {filterHardGoodShippingGroups().map((shippingGroupId, index) => {
        return (
          <div key={shippingGroupId}>
            {shippingGroups[shippingGroupId].type === 'hardgoodShippingGroup' && (
              <ShippingGroup
                key={shippingGroupId}
                shippingGroupId={shippingGroupId}
                shippingDeliveryIndex={listCount === 1 ? '' : index + 1}
                type={shippingGroups[shippingGroupId].type}
                {...props}
                priceListGroup={priceListGroup}
              />
            )}
          </div>
        );
      })}
    </>
  );
};
