/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Img from '@oracle-cx-commerce/react-components/img';
import Link from '@oracle-cx-commerce/react-components/link';
import css from '@oracle-cx-commerce/react-widgets/profile/shipping-information/components/order-item-details/styles.css';
import {CartItemContext} from '@oracle-cx-commerce/react-ui/contexts';

/**
 * It displays commerce item image.
 * For Order Details, variants images will be available in ChildSku's
 * For Review Page(Current Order), variants images will be retrieved from sku's object in catalog repository
 */
export const OrderItemImage = () => {
  // context
  const {commerceItem = {}, pdpUrl} = useContext(CartItemContext);
  const skuImage =
    commerceItem.childSKUs && commerceItem.childSKUs.length > 0 && commerceItem.childSKUs[0].primaryThumbImageURL;

  /**
   * Fetches the primary thumb image url.
   * If Variant images are available, fetches the variant image url.
   * Condition check for order details page and for current order
   */
  const imageUrl = () => {
    return (commerceItem.isItemValid === undefined || commerceItem.isItemValid) && skuImage
      ? skuImage
      : commerceItem.primaryThumbImageURL;
  };

  return (
    <Styled id="OrderItemImage" css={css}>
      <Link className="OrderItemImage" href={pdpUrl}>
        {imageUrl && (
          <Img src={imageUrl()} title={commerceItem.displayName} alt={commerceItem.displayName} size="xsmall" />
        )}
      </Link>
    </Styled>
  );
};
