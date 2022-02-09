import React, {useState} from 'react';
import Link from '@oracle-cx-commerce/react-components/link';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {t} from '@oracle-cx-commerce/utils/generic'
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';
import {getProduct} from '@oracle-cx-commerce/commerce-utils/selector';
import {useSelector} from '@oracle-cx-commerce/react-components/provider';
import {ContainerContext, ProductContext, ProductSelectionContext} from '@oracle-cx-commerce/react-ui/contexts';
import {shopperSelector} from '../../../selectors'
import {useNumberFormatter} from '@oracle-cx-commerce/react-components/utils/hooks'
import {PAGE_LOGIN_LINK} from '@oracle-cx-commerce/commerce-utils/constants'

import css from '../styles.css';

export const ProductItem = props => {

  const { productId } = props;

  // resources
  const {
    productSkuId,
    wasPriceText
  } = props

  const [selections, setSelections] = useState({});
  const productData = useSelector(getProduct, {productId});


  let productSelection = {};
  let {product} = props;


  if (!isEmptyObject(productData)) {
    product = productData;
  }
  if (isEmptyObject(product)) {
    product = null;
  }

  if (product) {
    // setSelections only when there is valid product/sku
    if (isEmptyObject(selections)) {
      const {variantOptionsSeed, variantToSkuLookup = []} = product;

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

  const {isUserLoggedIn} = useSelector(shopperSelector)
  const formatCurrency = useNumberFormatter({style: 'currency'})
  const productPrice = product.listPrice ? formatCurrency(product.listPrice) : '---'

  if (product) {
    return (
      <Styled id="ProductItem" css={css}>
        {product && !isEmptyObject(productSelection) && (
          <ProductContext.Provider value={product}>
            <ContainerContext.Provider value={{selections, setSelections}}>
              <ProductSelectionContext.Provider value={{productSelection}}>
                <div className="ProductItem">
                  <Link route={product.route}>
                    <div className="ProductItem__Image">
                      <img className="Image-product-carousel" src={product.primaryFullImageURL} alt={product.primaryImageAltText} />
                    </div>
                    <div className="Product-id-item">
                      <p className="Id-item">{t(productSkuId, { skuID: product.id || '' })}</p>
                    </div>
                    <div className="ProductItem__DisplayName">
                      <p className="Product-name-item">{product.displayName}</p>
                    </div>
                    { isUserLoggedIn
                      ? <div className="ProductItem__Price">
                          { product.salePrice
                            ? <>
                                <p className="Was-Price">
                                  {t(wasPriceText, {listPrice: productPrice || '---'})}
                                </p>
                                <p className="Price-Info">{formatCurrency(product.salePrice)}</p>
                              </>
                            : <p className="Price-Info">{productPrice}</p>
                          }
                        </div>
                      : <Link route={PAGE_LOGIN_LINK}>
                          <div className="ProductItem__Price">
                            <p className="See-price">{t(props.consultPrice)}</p>
                          </div>
                        </Link> 
                    }
                    <div className="Btn-details-product">
                      <button className="Details-btn">{t(props.moreDetails)}</button>
                    </div>
                  </Link>
                </div>
                <div className="ProductItem__BrandImage">
                  <span className=".ProductItem__BrandImage__Text">
                    {
                      !product.brand || product.brand === ""
                        ? "sem marca"
                        : product.brand
                    }
                  </span>
                </div>
              </ProductSelectionContext.Provider>
            </ContainerContext.Provider>
          </ProductContext.Provider>
        )}
      </Styled>
    );
  }

  return null;
};

export default ProductItem;
