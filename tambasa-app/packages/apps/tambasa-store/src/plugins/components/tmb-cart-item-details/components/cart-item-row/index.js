import React, {useState, useContext} from 'react';

import {CartItemContext, ProductSelectionContext, StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import {
  CartItemPromotion,
  CartItemQuantityDisplayAndUpdate,
  CartItemRemoveLink,
  CartItemStockStatus,
  CartItemSurcharge,
  CartItemUpdateError,
  CartItemSiteInformation
} from '../cart-line-item-components';

import {
  CommerceItemFreeGiftIconMessage,
  CommerceItemImage,
  CommerceItemName,
  CommerceItemPrice,
  CommerceItemQty,
  CommerceItemTotalPrice,
  CommerceItemVariants
} from '../commerce-item-components';


import AddToPurchaseList from '@oracle-cx-commerce/react-widgets/profile/add-to-purchase-list/component';
import GWPItemChangeLink from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/gwp-item-change-link';
import MoveProductToWishList from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/move-product-to-wishlist';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {useCartItemState} from '@oracle-cx-commerce/react-components/utils/cart/hooks';
import TmbSpinner from '../../../utils/components/tmb-spinner'

import {getPage} from '@oracle-cx-commerce/commerce-utils/selector'

/**
 * It display each cart item in shopping cart based on the current viewport.
 *
 * @param {*} props
 */
const CartItemRow = props => {
  const {
    shippingGroupCommerceItem = {},
    commerceItem = {},
    shippingGroupId,
    showItemPrice,
    currentOrder: {shippingGroups},
    setInvalidItems,
    setInvalidItemsOnQuantityChange,
    messageInsufficientStock,
    messageInsufficientStockAtStore,
    textSkuID,
    pdpUrlNotRequired
  } = props;
  const [triggerRemoveItem, setTriggerRemoveItem] = useState(false);

  /**
   * Cart Item status from the custom hook - useCartItemState
   */
  const {cartItemDetails, isItemInValid} = useCartItemState({
    commerceItem,
    shippingGroupCommerceItem,
    shippingGroups,
    shippingGroupId,
    showItemPrice,
    pdpUrlNotRequired,
    setInvalidItems,
    setInvalidItemsOnQuantityChange,
    messageInsufficientStock,
    triggerRemoveItem,
    messageInsufficientStockAtStore
  });

  // Product selection context data
  const productSelection = {
    commerceItem,
    shippingGroups,
    shippingGroupId,
    setTriggerRemoveItem
  };

  const { getState } = useContext(StoreContext)
  const commerceItemSkuID = () => {
    const currentPage = getPage(getState())
    const {commerceItem} = productSelection

    const findSkuIdOrProductId = () => {
      const skudId = commerceItem.skuProperties.find(dp => dp.id === "id")
      return skudId.value || commerceItem.productId || ''
    }

    return currentPage.path === "checkout-shipping"
      ? <span className="CommerceItemSKU">{textSkuID + findSkuIdOrProductId()}</span>
      : <></>
  }

  const [ isSpinnerVisible, setIsSpinnerVisible ] = useState(false)

  return (
    <Styled id="CartItemRow" css={css}>
      <CartItemContext.Provider value={cartItemDetails}>
        <ProductSelectionContext.Provider value={{productSelection}}>
          <div className="CartItemRow" style={{ position: "relative" }}>
            <TmbSpinner show={isSpinnerVisible}/>
            <div>
              <div className="CartItemDetails__ItemDetails">
                <CommerceItemImage />
                <div className="CartItemDetails__ItemBasicDetails">
                  <CommerceItemName />
                  <CommerceItemVariants />
                  <div className="CartItemDetails__DesktopVisible">
                    { commerceItemSkuID() }
                    <CommerceItemPrice messageAtTheRate={props.messageAtTheRate} />
                  </div>
                  <div className="CartItemDetails__MobileVisible">
                    {props.showItemPrice && <CommerceItemPrice messageAtTheRate={props.messageAtTheRate} />}
                  </div>
                  {commerceItem.giftWithPurchaseCommerceItemMarkers &&
                    commerceItem.giftWithPurchaseCommerceItemMarkers.length > 0 && <GWPItemChangeLink {...props} />}
                  <CartItemStockStatus {...props} />
                  <CartItemPromotion />
                  <CommerceItemFreeGiftIconMessage textFreeGift={props.textFreeGift} />
                  <CartItemSurcharge shippingSurchargeText={props.shippingSurchargeText} />
                  {props.displayCartItemSiteInfo && <CartItemSiteInformation textSiteIcon={props.textSiteIcon} />}
                </div>
                
                <div className="CartItemDetails__QuantityTotalContainer">
                  <div className="CartItemDetails__Quantity">
                    {commerceItem.giftWithPurchaseCommerceItemMarkers &&
                    commerceItem.giftWithPurchaseCommerceItemMarkers.length > 0 ? (
                      <CommerceItemQty />
                    ) : (
                      <CartItemQuantityDisplayAndUpdate setIsSpinnerVisible={setIsSpinnerVisible} {...props} />
                    )}
                  </div>
                  <div className="CartItemDetails__Total">
                    <CommerceItemTotalPrice textFree={props.textFree} />
                  </div>
                </div>

                <div className="CartItemDetails__ActionLinks">
                  <div className="CartItemDetails__ActionLinksLeftCol">
                    {props.showAddToPurchaseList && <AddToPurchaseList {...props} />}
                    {props.showMoveToWishList && <MoveProductToWishList {...props} />}
                  </div>
                  <CartItemRemoveLink {...props} />
                </div>
              </div>
              <CartItemUpdateError
                invalidItemsOnQuantityChange={props.invalidItemsOnQuantityChange}
                currentOrder={props.currentOrder}
              />
              <div className="CartItemDetails__BOPIS"></div>
            </div>
          </div>
        </ProductSelectionContext.Provider>
      </CartItemContext.Provider>
    </Styled>
  );
};

export default React.memo(CartItemRow);
