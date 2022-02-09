import React, { useContext, useCallback, useState, useEffect } from 'react';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { t } from '@oracle-cx-commerce/utils/generic';
import {getSkuInventory} from '@oracle-cx-commerce/commerce-utils/selector'
import { useComponentData } from '../selectors/index';
import Quantity from './tmb-quantity';
import { getTotalItemQuantityFromOtherSGs } from '@oracle-cx-commerce/react-components/utils/cart';
import {fetchCurrentProductDetails} from '@oracle-cx-commerce/fetchers/product';

import css from '../styles.css';

const ZERO_QTY = 0;

const TmbProductQuantity = props => {

  const { action, getState } = useContext(StoreContext);
  const store = useContext(StoreContext);
  const [validationMsg, setValidationMsg] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { labelProductQuantity, textMaxOrderQtyExceeded, textMinOrderQtyRequired, alertTotalItemQuantityExceeded } =
    props;

  const {
    shippingGroups,
    selectedStore,
    isPickupInStoreOptionSelected,
    skuId,
    orderableQuantity,
    orderLimit,
    previousQty = 1,
    productId,
    setSelections
  } = useComponentData(getState());

  const validateAndNotifyQtyUpdate = useCallback(
    parsedQty => {
      if (skuId) {
        let validationText = null;
        const qtyAvailable = orderableQuantity && orderableQuantity > ZERO_QTY ? orderableQuantity : 1;
        const maxQtyAllowed = orderLimit && orderLimit < qtyAvailable ? orderLimit : qtyAvailable;
        const itemQtyInCart = getTotalItemQuantityFromOtherSGs({
          skuId,
          selectedStore,
          isPickupInStoreOptionSelected,
          shippingGroups
        });
        let qtyToUpdate = ZERO_QTY;
        if (parsedQty <= 0) {
          validationText = t(textMinOrderQtyRequired, { quantity: 1 });
          action && action('tmbIsStockValid', { valid: false })
        } else if (parsedQty > maxQtyAllowed) {
          validationText = t(textMaxOrderQtyExceeded, { quantity: maxQtyAllowed });
          action && action('tmbIsStockValid', { valid: false })
        } else if (parsedQty + itemQtyInCart > maxQtyAllowed) {
          validationText = t(alertTotalItemQuantityExceeded, {
            stockAvailable: maxQtyAllowed,
            itemQuantityInCart: itemQtyInCart
          });
          action && action('tmbIsStockValid', { valid: false })
        } else {
          qtyToUpdate = parsedQty;
          action && action('tmbIsStockValid', { valid: true })
        }

        if (previousQty !== qtyToUpdate) {
          setSelections(prevState => {
            return {
              ...prevState,
              qty: qtyToUpdate
            };
          });
        }
        if (validationMsg !== validationText) {
          setValidationMsg(validationText);
        }
      }
    },
    [
      alertTotalItemQuantityExceeded,
      isPickupInStoreOptionSelected,
      orderLimit,
      orderableQuantity,
      previousQty,
      selectedStore,
      setSelections,
      shippingGroups,
      skuId,
      textMaxOrderQtyExceeded,
      textMinOrderQtyRequired,
      validationMsg
    ]
  );

  const handleQuantityChanged = useCallback(
    parsedQty => {
      setQuantity(parsedQty);
      setSelections(prevState => {
        return {
          ...prevState,
          selectedQuantity: parsedQty
        };
      });
      validateAndNotifyQtyUpdate(parsedQty);
    },
    [setSelections, validateAndNotifyQtyUpdate]
  );

  validateAndNotifyQtyUpdate(quantity);

  /**
   * @description unfortunately, sometimes a product it's no fetched by the container,
   * so this function does it programmatically
   * @param {Object} inventory 
   */
  const checkSkuInventory = async () => {
    const inventory = getSkuInventory(getState(), { skuId })
    const keys = Object.keys(inventory)
    if(keys.length === 0) {
      fetchCurrentProductDetails(store)
    }
  }

  useEffect(() => {
    checkSkuInventory()
  }, [])

  return (
    <Styled id="TmbProductQuantity" css={css}>
      <div className="TmbProductQuantity__Wrapper">
        <Quantity
          label={labelProductQuantity}
          id={`TmbProductQuantity-${productId}`}
          name={`TmbProductQuantity-${productId}`}
          data-testid={`TmbProductQuantity-${productId}`}
          disabled={!skuId}
          handleQuantityChanged={handleQuantityChanged}
          className="TmbProductQuantity"
          value={quantity}
        />
        {validationMsg &&
          skuId &&
          (isPickupInStoreOptionSelected === false ||
            (isPickupInStoreOptionSelected === true && selectedStore.locationId)) && (
            <span className="validationMsg" aria-label={validationMsg} role="alert" aria-live="assertive">
              {validationMsg}
            </span>
          )}
      </div>
    </Styled>
  );
};

export default TmbProductQuantity;
