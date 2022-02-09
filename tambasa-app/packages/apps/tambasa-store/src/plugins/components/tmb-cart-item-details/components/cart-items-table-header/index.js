import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * It display cart items table header.
 * @param {*} props
 */
const CartItemsTableHeader = props => {
  const {textItemDetails, textQuantity, textItemUnity, textTotal} = props;

  return (
    <Styled id="CartItemsTableHeader" css={css}>
      <div className="CartItemsTableHeader">
        <div className="CartItemDetails__ItemDetailsHeading">{textItemDetails}</div>
        <div className="CartItemDetails__QuantityTotalContainer">
          <div className="CartItemDetails__ItemQunatityHeading">{textQuantity}</div>
          { textItemUnity && textItemUnity !== '' &&
            <div className="CartItemDetails__ItemUnity">{textItemUnity}</div>
          }
          <div className="CartItemDetails__ItemTotalHeading">{textTotal}</div>
        </div>
      </div>
    </Styled>
  );
};

export default CartItemsTableHeader;
