import React, { useContext, useEffect } from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { useComponentData } from '@oracle-cx-commerce/react-widgets/product/product-price/selectors';
import { useNumberFormatter } from '@oracle-cx-commerce/react-components/utils/hooks';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import { t } from '@oracle-cx-commerce/utils/generic';
import { getComponentData } from '../selectors'
import { connect } from '@oracle-cx-commerce/react-components/provider';
import Link from '@oracle-cx-commerce/react-components/link';

import css from '../styles.css';

const OPTIONS = { style: 'currency' };

const TmbProductPrice = props => {
  const {
    textPriceRange,
    alertPriceUnavailable = '---',
    textSalePriceNow,
    textSalePriceWas,
    textQuantity,
    textPrice,
    textQuantityAndAbove,
    isLoggedIn,
    loginMessage = 'Consultar Preço'
  } = props;

  const {
    pricesLoaded = false,
    skuId,
    productId,
    skuListPrice,
    skuSalePrice,
    priceMin,
    priceMax,
    priceRange,
    productListPrice,
    productSalePrice,
    skuListVolumePrice = [],
    skuSaleVolumePrice = [],
    skuListVolumeBulkPrice = [],
    skuSaleVolumeBulkPrice = []
  } = useComponentData();

  const formatCurrency = useNumberFormatter(OPTIONS);

  const { action } = useContext(StoreContext);

  useEffect(() => {
    if (productId) {
      action('getProductsPrices', { productIds: [productId] });
    }
    if (skuId) {
      action('getSkusPrices', { skuIds: [skuId] });
    }
  }, [action, productId, skuId]);

  const formatPrice = ({ price, altPriceMsg }) => {
    return typeof price === 'number' ? formatCurrency(price) : altPriceMsg;
  };

  const formatPriceWithAltMsg = price => {
    return formatPrice({ price, altPriceMsg: alertPriceUnavailable });
  };

  const listPrice = () => {
    return skuId ? skuListPrice : productListPrice;
  };

  const salePrice = () => {
    return skuId ? skuSalePrice : productSalePrice;
  };

  const PriceRange = () => {
    return (
      <span>
        {t(textPriceRange, { minPrice: formatPriceWithAltMsg(priceMin), maxPrice: formatPriceWithAltMsg(priceMax) })}
      </span>
    );
  };

  const ListPrice = () => {
    return <span className="TmbProductPrice__Price--Sale">{formatPriceWithAltMsg(listPrice())}</span>;
  };

  const SalePrice = () => {
    return (
      <div className="TmbProductPrice__SaleWrapper">
        <div className="TmbProductPrice__Price--Was">
          <span className="TmbProductPrice__Price--TextSaleWas">{t(textSalePriceWas)}</span>
          <span className="TmbProductPrice__Price--Line">{formatPriceWithAltMsg(listPrice())}</span>
          <span className="TmbProductPrice__Price--TextSaleNow">{t(textSalePriceNow)}</span>
        </div>
        <div className="TmbProductPrice__Price--Sale">
          <span className="TmbProductPrice__Price--SalePrice">{formatPriceWithAltMsg(salePrice())}</span>
        </div>
      </div>
    );
  };

  const VolumePrice = ({ volumePriceList }) => {
    return (
      <div className="TmbProductPrice__ListVolumePriceWrapper">
        <ul>
          <li className="TmbProductPrice__ListVolumePriceWrapper--heading">
            <span className="TmbProductPrice__ListVolumePriceWrapper--quantity">{textQuantity}</span>
            <span className="TmbProductPrice__ListVolumePriceWrapper--price">{textPrice}</span>
          </li>
          {volumePriceList.map(item => (
            <li className="TmbProductPrice__ListVolumePriceWrapper--item" key={item.levelMinimum}>
              {item.levelMaximum ? (
                <span className="TmbProductPrice__ListVolumePriceWrapper--quantity">
                  {t(textPriceRange, { minPrice: item.levelMinimum, maxPrice: item.levelMaximum })}
                </span>
              ) : (
                <span className="TmbProductPrice__ListVolumePriceWrapper--quantity">
                  {t(textQuantityAndAbove, { MINQUANTITY: item.levelMinimum })}
                </span>
              )}
              <span className="TmbProductPrice__ListVolumePriceWrapper--price">
                {formatPriceWithAltMsg(item.price)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderPrice = () => {
    if(isLoggedIn) {
      if (pricesLoaded) {

        // If no value is outputed dashes are displayed
        if(!skuListPrice && !skuSalePrice && !productListPrice && !productSalePrice)
          return <span className="TmbProductPrice__Price--empty">---</span>;

        if (skuSaleVolumePrice && skuSaleVolumePrice.length) {
          return <VolumePrice volumePriceList={skuSaleVolumePrice} />;
        }
        if (skuSaleVolumeBulkPrice && skuSaleVolumeBulkPrice.length) {
          return <VolumePrice volumePriceList={skuSaleVolumeBulkPrice} />;
        }
        if (typeof salePrice() === 'number') {
          return <SalePrice />;
        }
        if (skuListVolumePrice && skuListVolumePrice.length > 0) {
          return <VolumePrice volumePriceList={skuListVolumePrice} />;
        }
        if (skuListVolumeBulkPrice && skuListVolumeBulkPrice.length > 0) {
          return <VolumePrice volumePriceList={skuListVolumeBulkPrice} />;
        }
        if (!skuId && priceRange) {
          return <PriceRange />;
        }
  
        return <ListPrice />;
      }
    } else
      return <Link className="TmbProductPrice__Login" route={'/login'}>{t(loginMessage)}</Link>
  };

  return (
    <Styled id="TmbProductPrice" css={css}>
      <div className="TmbProductPrice">{renderPrice()}</div>
    </Styled>
  );
};

export default connect(getComponentData)(TmbProductPrice);

