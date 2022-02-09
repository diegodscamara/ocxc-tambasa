import React, {useContext} from 'react';
import Link from '@oracle-cx-commerce/react-components/link';
import PropTypes from 'prop-types';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {useNumberFormatter} from '@oracle-cx-commerce/react-components/utils/hooks';
import {t} from '@oracle-cx-commerce/utils/generic';
import {ProductContext} from '@oracle-cx-commerce/react-ui/contexts';

import {useSelector} from '@oracle-cx-commerce/react-components/provider';
import {shopperSelector} from '../../selectors'
import {PAGE_LOGIN_LINK} from '@oracle-cx-commerce/commerce-utils/constants/page-links'

const OPTIONS = {style: 'currency'};

/**
* Displays the product price for use in search results
*
* @param props
*/
const TmbProductResultPrice = props => {
  const {
    listPriceOnlyAfterText,
    listPriceOnlyBeforeText,
    listPriceOnSaleAfterText,
    listPriceOnSaleBeforeText,
    checkPriceText
  } = props;
  const {record = {}, route = ''} = useContext(ProductContext);

  const minPrice = record.attributes['sku.minActivePrice'] && record.attributes['sku.minActivePrice'][0];
  const maxPrice = record.attributes['sku.maxActivePrice'] && record.attributes['sku.maxActivePrice'][0];

  const recordData = record.records && record.records[0] ? record.records[0] : record;
  const {attributes} = recordData;

  const listPrice = attributes['sku.listPrice'] && attributes['sku.listPrice'][0];
  const salePrice = attributes['sku.salePrice'] && attributes['sku.salePrice'][0];

  // Format the price in appropriate currency
  const formatPrice = useNumberFormatter(OPTIONS);

  const priceRange = minPrice !== maxPrice && `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;

  const isOnSale = salePrice && salePrice !== listPrice;

  const { isUserLoggedIn } = useSelector(shopperSelector)

  if(!isUserLoggedIn)
    return (
      <Styled id="TmbProductResultPrice" css={css}>
        <Link href={PAGE_LOGIN_LINK} className="TmbProductCheckPrice">
          <span className="TmbProductResultPrice__CheckPrice">{t(checkPriceText)}</span>
        </Link>
      </Styled>
    )

  if (priceRange) {
    return (
      <Styled id="TmbProductResultPrice" css={css}>
        <Link href={route} className="TmbProductResultPrice">
          <span className="TmbProductResultPrice__ProductPrice">
            {t(listPriceOnlyBeforeText)} {priceRange} {t(listPriceOnlyAfterText)}
          </span>
        </Link>
      </Styled>
    );
  }

  if (listPrice) {
    return (
      <Styled id="TmbProductResultPrice" css={css}>
        <Link href={route} className="TmbProductResultPrice">
          {isOnSale ? (
            <span className={'TmbProductResultPrice__OriginalPrice'}>
              {t(listPriceOnSaleBeforeText, { listPrice: formatPrice(listPrice) || "---" })}
            </span>
          ) : (
            <span className={'TmbProductResultPrice__ProductPrice'}>
              {formatPrice(listPrice)}
            </span>
          )}
          {isOnSale && (
            <span className="TmbProductResultPrice__ProductPrice">
              {formatPrice(salePrice)}
            </span>
          )}
        </Link>
      </Styled>
    );
  }

  return <Styled id="TmbProductResultPrice" css={css} />;
};

TmbProductResultPrice.propTypes = {
  /**
  * A resource string to display after the product list price
  */
  listPriceOnlyAfterText: PropTypes.string.isRequired,
  /**
  * A resource string to display before the product list price
  */
  listPriceOnlyBeforeText: PropTypes.string.isRequired,
  /**
  * A resource string to display after the product list price if the product is on sale
  */
  listPriceOnSaleAfterText: PropTypes.string.isRequired,
  /**
  * A resource string to display before the product list price if the product is on sale
  */
  listPriceOnSaleBeforeText: PropTypes.string.isRequired
};

export default TmbProductResultPrice;
