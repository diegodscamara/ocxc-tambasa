import CartItemRow from '../cart-item-row';
import CartItemsTableHeader from '../cart-items-table-header';
import GWPPlaceholder from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/gwp-placeholder';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {useCartState} from '@oracle-cx-commerce/react-components/utils/cart/hooks';

/**
 * It display cart items table header, cart item list and GWP place holder (if cart has complex gift item) in shopping cart.
 *
 * @param {*} props
 */
const CartItemsTable = props => {
  // resources
  const {
    currentOrder: {shippingGroups = {}, commerceItems = {}}
  } = props;

  const {setInvalidItems, invalidItemsOnQuantityChange, setInvalidItemsOnQuantityChange} = useCartState();

  return (
    <Styled id="CartItemsTable" css={css}>
      <div className="CartItemsTable_Header">
        <CartItemsTableHeader {...props} />
      </div>
      <div className="CartItemsTable_Body">
        {(Object.keys(shippingGroups || {}) || []).map(shippingGroupId => (
          <div key={shippingGroupId}>
            {shippingGroups[shippingGroupId].items.map(item => {
              return (
                <CartItemRow
                  key={`${shippingGroupId}-${item.commerceId}`}
                  shippingGroupCommerceItem={item}
                  shippingGroupId={shippingGroupId}
                  commerceItem={commerceItems[item.commerceId]}
                  setInvalidItems={setInvalidItems}
                  setInvalidItemsOnQuantityChange={setInvalidItemsOnQuantityChange}
                  invalidItemsOnQuantityChange={invalidItemsOnQuantityChange}
                  {...props}
                />
              );
            })}
          </div>
        ))}
        <GWPPlaceholder {...props} />
      </div>
    </Styled>
  );
};

export default CartItemsTable;
