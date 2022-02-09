/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useContext, useMemo, useState, useEffect} from 'react';
import css from '../styles.css';
import Img from '@oracle-cx-commerce/react-components/img';
import ProductPrice from '@oracle-cx-commerce/react-widgets/product/product-price/component';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';
import {
  ContainerContext,
  ProductContext,
  ProductSelectionContext,
  StoreContext
} from '@oracle-cx-commerce/react-ui/contexts';
import Link from '@oracle-cx-commerce/react-components/link';

import { connect } from '@oracle-cx-commerce/react-components/provider'
import { shopperSelector } from '../../../selectors'
import { PAGE_LOGIN_LINK } from '@oracle-cx-commerce/commerce-utils/constants'
import { t } from '@oracle-cx-commerce/utils/generic'

const ProductItem = props => {
  const {product, recSetId, isUserLoggedIn} = props;
  const { skuText, priceDetails, productDetails } = props //resources
  const [selections, setSelections] = useState({});
  const {action} = useContext(StoreContext);
  const [ showPrice, setShowPrice ] = useState(false)

  useMemo(() => {
    const {variantOptionsSeed, variantToSkuLookup = []} = product;

    // For products with no variant options, the skuId is set in the initial state.
    const skuId = isEmptyObject(variantOptionsSeed) ? variantToSkuLookup[''] : null;
    if (!selections || skuId !== selections.skuId) {
      setSelections({
        skuId,
        variantOptions: {},
        qty: 1
      });
    }
  }, [product, selections]);

  useEffect(() => {
    setShowPrice(isUserLoggedIn)
  }, [isUserLoggedIn])

  const productSelection = {
    productId: product.id,
    skuId: selections.skuId,
    quantity: selections.qty
  };

  const onClick = () => {
    const payload = {product, recSetId};
    action('recommendationsClickThru', payload);
  };

  return (
    <Styled id="ProductItem" css={css}>
      <div className="ProductItem">
        <ProductContext.Provider value={product}>
          <ContainerContext.Provider value={{selections, setSelections}}>
            <ProductSelectionContext.Provider value={{productSelection}}>

              <Link href={product.route} onClick={onClick} className="ProductItem__Image">
                <Img src={product.primaryFullImageURL} alt={product.primaryImageAltText} size={'182,182'} />
              </Link>

              <span className="ProductItem_SKU">
                { t(skuText, { skuId: product.id }) }
              </span>

              <Link href={product.route} onClick={onClick} className="ProductItem__DisplayName">
                <div>{product.displayName}</div>
              </Link>

              { showPrice ? 
                <div className="ProductItem__Price">
                  <ProductPrice {...props} />
                </div> :
                <Link route={PAGE_LOGIN_LINK} className="ProductItem__CheckPrice">
                  { t(priceDetails) }
                </Link>
              }

              <Link route={product.route} className="ProductItem__Details" onClick={onClick}>
                { t(productDetails) }
              </Link>

            </ProductSelectionContext.Provider>
          </ContainerContext.Provider>
        </ProductContext.Provider>
      </div>
    </Styled>
  );
};

export default connect(shopperSelector)(ProductItem);
