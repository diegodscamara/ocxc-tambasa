import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import React, { useCallback, useContext } from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { noop } from '@oracle-cx-commerce/utils/generic';
import TmbAddToCartButton from './tmb-add-to-cart-button';
import TmbProductQuantity from './tmb-product-quantity';

import css from '../styles.css';

const TmbProductCart = props => {

  const { action } = useContext(StoreContext);

  const onAddToCart = useCallback(
    ({ payload, onOk = noop, onNotOk = noop, onComplete = noop }) => {
      action('addItemsToCart', {
        items: [{ ...payload }]
      })
        .then(response => {
          if (response.ok === true) {
            onOk(response);
          } else {
            onNotOk(response);
          }
        })
        .catch(error => {
          onNotOk({ error });
        })
        .finally(onComplete);
    },
    [action]
  );

  return (
    <Styled id="TmbProductCart" css={css}>
      <div className="TmbProductCart__Wrapper">
        <img src="/file/general/shopping-cart.png" alt="Shopping cart" width="41" height="37"></img>
        <TmbProductQuantity onAddToCart={onAddToCart} {...props} />
        <TmbAddToCartButton onAddToCart={onAddToCart} {...props} />
      </div>
    </Styled>
  );
};

export default TmbProductCart;
