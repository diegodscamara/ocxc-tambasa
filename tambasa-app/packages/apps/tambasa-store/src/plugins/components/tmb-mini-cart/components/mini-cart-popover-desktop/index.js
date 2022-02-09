/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Popover from '@oracle-cx-commerce/react-components/popover';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {MiniCartItemTable} from '@oracle-cx-commerce/react-widgets/cart/mini-cart/components/mini-cart-item-table';
import {
  MiniCartSubTotal,
  MiniCartButtons
} from '../mini-cart-components';

const MiniCartPopover = props => {
  const {
    displayCheckoutButtonOnMiniCart = true,
    miniCartitemsBeforeScrolling = 3,
    commerceItems = {},
    shippingGroups = {},
    numberOfItems = 0,
    priceInfo = {},
    actionCheckout,
    actionContinueShopping,
    actionViewCart,
    closeLinkAltText,
    headingYourCart,
    textSubtotal,
    showMobileElements,
    currentPriceListGroup,
    isUserLoggedIn,
    miniCartState,
    closeMiniCart,
    cssOverride
  } = props;

  const {showMiniCart} = miniCartState;

  return (
    <Styled id="MiniCartDesktop__Popover" css={css}>
      <div className="MiniCartDesktop__Popover">
        <Popover
          cssOverride={cssOverride}
          show={showMiniCart}
          onClose={closeMiniCart}
          closeIconTitle={closeLinkAltText}
          closeArialLabel={closeLinkAltText}
          title={headingYourCart}
          onMouseLeave={closeMiniCart}
        >
          <MiniCartItemTable
            miniCartState={miniCartState}
            miniCartitemsBeforeScrolling={miniCartitemsBeforeScrolling}
            shippingGroups={shippingGroups}
            commerceItems={commerceItems}
            {...props}
          />
          <MiniCartSubTotal
            textSubtotal={textSubtotal}
            subTotal={priceInfo.subTotal}
            orderPriceListGroup={currentPriceListGroup}
          />
          <MiniCartButtons
            showMobileElements={showMobileElements}
            actionContinueShopping={actionContinueShopping}
            actionViewCart={actionViewCart}
            numberOfItems={numberOfItems}
            actionCheckout={actionCheckout}
            closeMiniCart={closeMiniCart}
            displayCheckoutButtonOnMiniCart={displayCheckoutButtonOnMiniCart}
            isUserLoggedIn={isUserLoggedIn}
          />
        </Popover>
      </div>
    </Styled>
  );
};

export default React.memo(MiniCartPopover);
