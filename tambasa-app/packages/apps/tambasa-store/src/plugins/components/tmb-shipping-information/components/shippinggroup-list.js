import React from 'react';
import {ShippingGroup} from './shipping-group';

/**
 * Following component iterates on shipping groups and renders each shipping group.
 * Displays the shipping groups in the default order returned from the endpoint.
 *
 * @param props - list of shipping groups
 */
export const ShippingGroupList = props => {
  const {shippingGroups = {}} = props;

  return (
    <>
      {(Object.keys(shippingGroups || {}) || []).map(shippingGroupId => {
        return <ShippingGroup key={shippingGroupId} shippingGroupId={shippingGroupId} {...props} />;
      })}
    </>
  );
};
