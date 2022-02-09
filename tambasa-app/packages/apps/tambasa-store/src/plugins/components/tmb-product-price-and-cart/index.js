import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import TmbProductPrice from './components/tmb-product-price';
import TmbProductCart from './components/tmb-product-cart';

import css from './styles.css';

const TmbProductPriceAndCart = props => {

  return (
    <Styled id="TmbProductPriceAndCart" css={css}>
      <div className="TmbProductPriceAndCart">
        <TmbProductPrice {...props} />
        <TmbProductCart {...props} />
      </div>
    </Styled>
  );
};

export default TmbProductPriceAndCart;
