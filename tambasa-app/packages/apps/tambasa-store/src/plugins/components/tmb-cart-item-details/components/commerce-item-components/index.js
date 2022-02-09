import React, {useContext} from 'react';
import {
  FreeGiftMessage,
  FreeMessage
} from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/components/gwp-free-labels';
import {CartItemContext} from '@oracle-cx-commerce/react-ui/contexts';
import GiftIcon from '@oracle-cx-commerce/react-components/icons/gift';
import Img from '@oracle-cx-commerce/react-components/img';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import giftCss from '@oracle-cx-commerce/react-widgets/cart/cart-item-details/styles.css';
import {useNumberFormatter} from '@oracle-cx-commerce/react-components/utils/hooks';
import Link from '@oracle-cx-commerce/react-components/link';

/**
 * It displays commerce item name.
 */
export const CommerceItemName = () => {
  // context
  const {commerceItem = {}, pdpUrl} = useContext(CartItemContext);

  return (
    <Styled id="CommerceItemName" css={css}>
      <Link className="CommerceItemName" href={pdpUrl}>
        {commerceItem.displayName}
      </Link>
    </Styled>
  );
};

/**
 * It displays commerce item image.
 */
export const CommerceItemImage = () => {
  // context
  const {commerceItem = {}, pdpUrl} = useContext(CartItemContext);
  const imageUrl =
    commerceItem.isItemValid &&
    commerceItem.childSKUs &&
    commerceItem.childSKUs.length > 0 &&
    commerceItem.childSKUs[0].primaryThumbImageURL
      ? commerceItem.childSKUs[0].primaryThumbImageURL
      : commerceItem.primaryThumbImageURL;

  return (
    <Styled id="CommerceItemImage" css={css}>
      <Link className="CommerceItemImage" href={pdpUrl}>
        {imageUrl && (
          <Img src={imageUrl} title={commerceItem.displayName} alt={commerceItem.displayName} size="xsmall" />
        )}
      </Link>
    </Styled>
  );
};

/**
 *  It displays commerce line item total price.
 *
 * @param {*} props
 */
export const CommerceItemTotalPrice = props => {
  // resources
  const {textFree} = props;

  // context
  const {shippingGroupCommerceItem = {}, commerceItem = {}} = useContext(CartItemContext);

  const formatCurrency = useNumberFormatter({style: 'currency'}, props.priceListGroup);

  let totalPriceInfo = null;

  if (
    commerceItem.giftWithPurchaseCommerceItemMarkers &&
    (commerceItem.giftWithPurchaseCommerceItemMarkers.length === 0 ||
      (commerceItem.giftWithPurchaseCommerceItemMarkers.length > 0 && shippingGroupCommerceItem.quantity > 1))
  ) {
    totalPriceInfo = !isNaN(shippingGroupCommerceItem.amount) && formatCurrency(shippingGroupCommerceItem.amount);
  } else if (
    commerceItem.giftWithPurchaseCommerceItemMarkers &&
    commerceItem.giftWithPurchaseCommerceItemMarkers.length > 0 &&
    shippingGroupCommerceItem.quantity === 1
  ) {
    if (
      shippingGroupCommerceItem.discountInfo[0] &&
      shippingGroupCommerceItem.discountInfo[0].promotionId ===
        commerceItem.giftWithPurchaseCommerceItemMarkers[0].value
    ) {
      totalPriceInfo = <FreeMessage textFree={textFree} />;
    } else {
      totalPriceInfo = !isNaN(shippingGroupCommerceItem.amount) && formatCurrency(shippingGroupCommerceItem.amount);
    }
  }

  return (
    <Styled id="CommerceItemTotalPrice" css={css}>
      <div className="CommerceItemTotalPrice">{totalPriceInfo}</div>
    </Styled>
  );
};

/**
 * It displays commerce item price.
 */
export const CommerceItemPrice = props => {
  // context
  const {shippingGroupCommerceItem = {}, commerceItem = {giftWithPurchaseCommerceItemMarkers: []}} =
    useContext(CartItemContext);
  const {detailedItemPriceInfo = []} = shippingGroupCommerceItem;
  detailedItemPriceInfo.sort(function (a, b) {
    return b.amount - a.amount;
  });
  const formatCurrency = useNumberFormatter({style: 'currency'}, props.priceListGroup);

  return (
    <Styled id="CommerceItemPrice" css={css}>
      <div className="CommerceItemPrice">
        {commerceItem.giftWithPurchaseCommerceItemMarkers &&
          (commerceItem.giftWithPurchaseCommerceItemMarkers.length === 0 ||
            (commerceItem.giftWithPurchaseCommerceItemMarkers.length > 0 && shippingGroupCommerceItem.quantity > 1)) &&
          shippingGroupCommerceItem.listPrice &&
          (!detailedItemPriceInfo || (detailedItemPriceInfo && detailedItemPriceInfo.length === 1)
            ? formatCurrency(detailedItemPriceInfo[0].detailedUnitPrice)
            : detailedItemPriceInfo.map((itemPrice, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="CommerceItemPrice__PriceBreakUp">
                  {itemPrice.quantity}
                  <span className="CommerceItemPrice__PriceBreakUpAtRate">{props.messageAtTheRate}</span>
                  {formatCurrency(itemPrice.detailedUnitPrice)}
                </div>
              )))}
      </div>
    </Styled>
  );
};

/**
 * It displays commerce item variant information.
 */
export const CommerceItemVariants = () => {
  const {
    commerceItem: {variant = []}
  } = useContext(CartItemContext);

  return (
    <Styled id="CommerceItemVariants" css={css}>
      <div className="CommerceItemVariants">
        {variant &&
          variant.map(item => (
            <div key={item.optionName}>
              {item && item.optionName && item.optionValue && (
                <>
                  {item.optionName} : {item.optionValue}
                </>
              )}
            </div>
          ))}
      </div>
    </Styled>
  );
};

/**
 * It displays commerce item free gift icon message.
 *
 * @param {*} props
 */
export const CommerceItemFreeGiftIconMessage = props => {
  // resources
  const {textFreeGift} = props;
  // context
  const {
    commerceItem: {giftWithPurchaseCommerceItemMarkers = []},
    shippingGroupCommerceItem
  } = useContext(CartItemContext);

  return (
    <Styled id="FreeGiftIconMessage" css={giftCss}>
      {giftWithPurchaseCommerceItemMarkers &&
        giftWithPurchaseCommerceItemMarkers.length > 0 &&
        shippingGroupCommerceItem.discountInfo[0] &&
        shippingGroupCommerceItem.discountInfo[0].promotionId === giftWithPurchaseCommerceItemMarkers[0].value && (
          <div className="FreeGiftIconMessage">
            <GiftIcon className="FreeGiftIconMessage__GiftIcon" />
            <FreeGiftMessage textFreeGift={textFreeGift} />
          </div>
        )}
    </Styled>
  );
};

/**
 * It displays commerce item quantity.
 *
 * @param {*} props
 */
export const CommerceItemQty = () => {
  const {shippingGroupCommerceItem = {}} = useContext(CartItemContext);
  const {quantity} = shippingGroupCommerceItem;

  return (
    <Styled id="CommerceItemQty" css={css}>
      <div className="CommerceItemQtyContainer">
        <div className="CommerceItemQty">{quantity}</div>
      </div>
    </Styled>
  );
};
