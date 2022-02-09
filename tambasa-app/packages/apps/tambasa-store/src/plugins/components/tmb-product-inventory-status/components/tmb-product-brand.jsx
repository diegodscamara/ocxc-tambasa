import React, { useState } from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { isEmptyObject } from '@oracle-cx-commerce/utils/generic';
import { getProduct } from '@oracle-cx-commerce/commerce-utils/selector';
import { useSelector } from '@oracle-cx-commerce/react-components/provider';
import { ContainerContext, ProductContext, ProductSelectionContext } from '@oracle-cx-commerce/react-ui/contexts';
import { t } from '@oracle-cx-commerce/utils/generic';

import css from '../styles.css';


export const TmbProductBrand = props => {

  const { brandName, productId } = props;

  const [selections, setSelections] = useState({});
  let productSelection = {};

  let { product } = props;
  const productData = useSelector(getProduct, { productId });
  if (!isEmptyObject(productData)) {
    product = productData;
  }

  productSelection = {
    productId: !isEmptyObject(product) && product.brand ? product.brand : ''
  };

  return (
    <Styled id="TmbProductBrand" css={css}>
      {product && !isEmptyObject(productSelection) && (
        <div className="TmbProductBrand">
          <ProductContext.Provider value={product}>
            <ContainerContext.Provider value={{ selections, setSelections }}>
              <ProductSelectionContext.Provider value={{ productSelection }}>
                <span className="TmbProductBrand__Label">{t(brandName)}</span>
                <span className="TmbProductBrand__Name">{productSelection.productId}</span>
              </ProductSelectionContext.Provider>
            </ContainerContext.Provider>
          </ProductContext.Provider>
        </div>
      )}
    </Styled>
  );
}

export default TmbProductBrand;
