import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import React, { useContext, useState, useEffect } from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { formToJson } from '@oracle-cx-commerce/react-components/utils';
import { t } from '@oracle-cx-commerce/utils/generic';
import { useComponentData } from '@oracle-cx-commerce/react-widgets/product/product-add-to-cart-button/selectors';
import { PREORDERABLE, OUT_OF_STOCK } from '@oracle-cx-commerce/commerce-utils/constants/cart';
import { getTotalItemQuantityFromOtherSGs } from '@oracle-cx-commerce/react-components/utils/cart';
import PropTypes from 'prop-types';

import { getComponentData } from '../selectors'
import { connect } from '@oracle-cx-commerce/react-components/provider'

import css from '../styles.css';

const stockStatuses = {
  OUT_OF_STOCK,
  PREORDERABLE
};

const TmbAddToCartButton = props => {

  const { action, subscribeDispatch } = useContext(StoreContext);

  const { actionAddToCart, alertAddToCartAdding, actionAddToCartPreOrder, alertTotalItemQuantityExceeded, onAddToCart } =
    props;

  const {
    productId,
    shippingGroups,
    skuId,
    selectedStore,
    isPickupInStoreOptionSelected,
    qty,
    stockStatus,
    orderableQuantity,
    orderLimit,
    isUserLoggedIn,
    configurable
  } = useComponentData();

  const [addToCartInProgress, setAddToCartInProgress] = useState(false);
  const [ isStockValid, setIsStockValid ] = useState(false)

  useEffect(() => {
    subscribeDispatch((action) => {
      const { type, payload } = action
      if(type === "tmbIsStockValid") setIsStockValid(payload.valid)
    })
  }, [])

  const disabledButton = () => {
    return (
      addToCartInProgress ||
      (skuId && stockStatus === stockStatuses.OUT_OF_STOCK) ||
      !isStockValid ||
      !isUserLoggedIn ||
      configurable
    );
  };

  const buttonText = () => {
    if (addToCartInProgress) {
      return alertAddToCartAdding;
    }
    if (stockStatus === stockStatuses.PREORDERABLE) {
      return actionAddToCartPreOrder;
    }

    return actionAddToCart;
  };

  const validateQty = qty => {
    const qtyAdded = qty ? parseInt(qty, 10) : 0;
    const itemQtyInCart = getTotalItemQuantityFromOtherSGs({
      skuId,
      selectedStore,
      isPickupInStoreOptionSelected,
      shippingGroups
    });
    const qtyAvailable = orderableQuantity && orderableQuantity > 0 ? orderableQuantity : 1;
    const maxQtyAllowed = orderLimit && orderLimit < qtyAvailable ? orderLimit : qtyAvailable;

    return {
      isQtyValid: qtyAdded && qtyAdded > 0 && qtyAdded + itemQtyInCart <= maxQtyAllowed,
      maxQtyAllowed,
      itemQtyInCart
    };
  };

  const onNotOk = ({ error: { message = '' } = {} } = {}) => {
    action('notify', { level: 'error', message });
  };

  const onComplete = () => {
    setAddToCartInProgress(false);
  };

  const handleAddToCart = event => {
    event.preventDefault();
    action('notifyClearAll');
    const form = event.target;

    if (form.checkValidity()) {
      const payload = formToJson(form);
      if (isPickupInStoreOptionSelected === true && selectedStore.locationId) {
        payload.locationId = selectedStore.locationId;
      }
      const { isQtyValid, maxQtyAllowed, itemQtyInCart } = validateQty(payload.quantity);
      if (isQtyValid) {
        setAddToCartInProgress(true);
        onAddToCart({ payload, onNotOk, onComplete });
      } else {
        action('notify', {
          level: 'error',
          message: t(alertTotalItemQuantityExceeded, { stockAvailable: maxQtyAllowed, itemQuantityInCart: itemQtyInCart })
        });
      }
    }
  };

  return (
    <Styled id="TmbAddToCartButton" css={css}>
      <div className="TmbAddToCartButton__Wrapper">
        <form onSubmit={handleAddToCart}>
          <input type="hidden" name="productId" value={productId ? productId : ''} />
          <input type="hidden" name="catRefId" value={skuId ? skuId : ''} />
          <input type="hidden" name="quantity" value={qty} />
          <button className="TmbAddToCartButton__Button" data-testid="Add-To-Cart-Button" type="submit"
            disabled={disabledButton()}>
            {buttonText()}
          </button>
        </form>
      </div>
    </Styled>
  );
};

TmbAddToCartButton.propTypes = {

  onAddToCart: PropTypes.func.isRequired
};

export default React.memo(connect(getComponentData)(TmbAddToCartButton));
