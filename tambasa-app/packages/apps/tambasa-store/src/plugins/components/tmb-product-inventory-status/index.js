import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import TmbProductId from './components/tmb-product-id';
import TmbProductGroup from './components/tmb-product-group';
import TmbProductSuperGroup from './components/tmb-product-super-group';
import TmbProductBrand from './components/tmb-product-brand';
import TmbProductSalesUnity from './components/tmb-product-sales-unity';
import TmbProductEAN from './components/tmb-product-ean';

import css from './styles.css';

const TmbProductInventoryStatus = props => {

  return (
    <Styled id="TmbProductInventoryStatus" css={css}>
      <div className="TmbProductInventoryStatus">
        <TmbProductId {...props} />
        <TmbProductEAN {...props} />
        <TmbProductGroup {...props} />
        <TmbProductSuperGroup {...props} />
        <TmbProductBrand {...props} />
        <TmbProductSalesUnity {...props} />
      </div>
    </Styled>
  );
};

export default TmbProductInventoryStatus;
