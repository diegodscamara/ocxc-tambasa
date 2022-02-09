import React, { useState } from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { isEmptyObject } from '@oracle-cx-commerce/utils/generic';
import { getProduct } from '@oracle-cx-commerce/commerce-utils/selector';
import { useSelector } from '@oracle-cx-commerce/react-components/provider';
import { ContainerContext, ProductContext, ProductSelectionContext } from '@oracle-cx-commerce/react-ui/contexts';

import css from './styles.css';

export const TmbProductVideoDescription = props => {

  const { productId } = props;

  const [selections, setSelections] = useState({});

  let productSelection = {};

  let { product } = props;

  const productData = useSelector(getProduct, { productId });

  if (!isEmptyObject(productData)) {
    product = productData;
  }

  productSelection = {
    productId: !isEmptyObject(product) && product.video_do_produto ? product.video_do_produto : ''
  };

  return (
    <Styled id="TmbProductVideoDescription" css={css}>
      {product && !isEmptyObject(productSelection) && (
        <div className="TmbProductVideoDescription">
          <ProductContext.Provider value={product}>
            <ContainerContext.Provider value={{ selections, setSelections }}>
              <ProductSelectionContext.Provider value={{ productSelection }}>
                <iframe width="100%" height="413"
                  src={product.video_do_produto} >
                </iframe>
              </ProductSelectionContext.Provider>
            </ContainerContext.Provider>
          </ProductContext.Provider>
        </div>
      )}
    </Styled>
  );
}

export default TmbProductVideoDescription;
