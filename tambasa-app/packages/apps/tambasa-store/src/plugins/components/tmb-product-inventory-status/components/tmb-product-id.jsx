import React, { useState } from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { isEmptyObject } from '@oracle-cx-commerce/utils/generic';
import { getProduct } from '@oracle-cx-commerce/commerce-utils/selector';
import { useSelector } from '@oracle-cx-commerce/react-components/provider';
import { ContainerContext, ProductContext, ProductSelectionContext } from '@oracle-cx-commerce/react-ui/contexts';
import { t } from '@oracle-cx-commerce/utils/generic';

import css from '../styles.css';


export const TmbProductId = props => {

  const { idLabel, productId } = props;

  const [selections, setSelections] = useState({});
  let productSelection = {};

  let { product } = props;
  const productData = useSelector(getProduct, { productId });
  if (!isEmptyObject(productData)) {
    product = productData;
  }
  if (isEmptyObject(product)) {
    product = null;
  }

  if (product) {
    // setSelections only when there is valid product/sku
    if (isEmptyObject(selections)) {
      const { variantOptionsSeed, variantToSkuLookup = [] } = product;

      const skuId = isEmptyObject(variantOptionsSeed) ? variantToSkuLookup[''] : null;
      setSelections({
        skuId,
        variantOptions: {},
        qty: 1
      });
    }
    productSelection = {
      productId: product.id,
      skuId: selections.skuId,
      quantity: selections.qty
    };
  }

  if (product) {
    return (
      <Styled id="TmbProductId" css={css}>
        {product && !isEmptyObject(productSelection) && (
          <div className="TmbProductId">
            <ProductContext.Provider value={product}>
              <ContainerContext.Provider value={{ selections, setSelections }}>
                <ProductSelectionContext.Provider value={{ productSelection }}>
                  <span className="TmbProductId__Label">{t(idLabel)}</span>
                  <span className="TmbProductId__Id">{product.id}</span>
                </ProductSelectionContext.Provider>
              </ContainerContext.Provider>
            </ProductContext.Provider>
          </div>
        )}
      </Styled>
    );
  }

  return null;
};

export default TmbProductId;
