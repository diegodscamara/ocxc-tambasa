/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/profile/profile-create-purchase-list/components/profile-purchaselist-item-data/styles.css';
import Img from '@oracle-cx-commerce/react-components/img';
import Link from '@oracle-cx-commerce/react-components/link';
import PropTypes from 'prop-types';

const ProfilePurchaseListItemData = props => {
  const {
    textItemDetails,
    labelProductQuantity,
    actionRemoveItem,
    itemList,
    setItemList,
    createPurchaseListFormRef = null
  } = props;

  const NUMERIC_STRING_PATTERN = /^[0-9]+(\.[0-9]+)?$/;

  /*
   * Method to remove the selected product from the list of items in the PurchaseList
   */

  const handleRemoveItem = deleteItem => {
    const transformedItems = [...itemList];
    Object.values(transformedItems).forEach(item => {
      if (item.catRefId === deleteItem.catRefId) {
        const index = transformedItems.indexOf(item);
        if (index !== -1) {
          transformedItems.splice(index, 1);
        }
      }
    });
    setItemList(transformedItems);
    createPurchaseListFormRef.current.dataset.dirty = true;
  };

  /**
   * Method to update the quantity of the selected product in PurchaseList
   */

  const handleQuantityChange = event => {
    if (!NUMERIC_STRING_PATTERN.test(event.target.value)) {
      event.target.value = '';
    }
    const transformedItems = [...itemList];
    Object.values(transformedItems).forEach(item => {
      if (item.catRefId === event.target.id) {
        item.quantityDesired = Number(event.target.value);
      }
    });
    setItemList(transformedItems);
  };

  return (
    <Styled id="ProfilePurchaseListItemData__ItemDetails" css={css}>
      <div className="ProfilePurchaseListItemData__ItemDetails">
        <div className="ProfilePurchaseListItemData__ItemDetailsHeader">
          <span className="ProfilePurchaseListItemData__ItemDetailsLabel">{textItemDetails}</span>
          <span className="ProfilePurchaseListItemData__QuantityLabel">{labelProductQuantity}</span>
        </div>
        {Object.values(itemList).map(item => (
          <div className="ProfilePurchaseListItemData__Row" key={`PurchaseListItem-${item.catRefId}`}>
            <div className="ProfilePurchaseListItemData__Image">
              <Link href={item.path}>
                <Img src={item.thumbnailUrl} title={item.productName} alt={item.productName} />
              </Link>
            </div>
            <div className="ProfilePurchaseListItemData__Name">
              <Link href={item.path} className="ProfilePurchaseListItemData__ProductName">
                {item.productName}
              </Link>
              {item.selectedOptions &&
                item.selectedOptions.length > 0 &&
                Object.values(item.selectedOptions).map(option => (
                  <div
                    key={`PurchaseListItemVariant-${option.optionName}`}
                    className="ProfilePurchaseListItemData__PurchaseListItemVariant"
                  >
                    {option.optionName} : {option.optionValue}
                  </div>
                ))}
            </div>
            <div className="ProfilePurchaseListItemData__Quantity">
              <div className="ProfilePurchaseListItemData__QuantityInput">
                <input
                  type="text"
                  id={item.catRefId}
                  name={`ProductQuantity-${item.catRefId}`}
                  className="ProfilePurchaseListItemData__QuantityInputText"
                  data-testid={`ProductQuantity-${item.catRefId}`}
                  onChange={handleQuantityChange}
                  value={item.quantityDesired}
                />
              </div>
              <div
                role="button"
                tabIndex={0}
                className="ProfilePurchaseListItemData__RemoveItem"
                key="ProfilePurchaseListItemData__RemoveItem"
                data-testid={`RemoveItem-${item.catRefId}`}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    handleRemoveItem(item);
                  }
                }}
                onClick={() => {
                  handleRemoveItem(item);
                }}
              >
                {actionRemoveItem}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Styled>
  );
};

ProfilePurchaseListItemData.propTypes = {
  /** Callback function to be invoked to update the value of item list */
  setItemList: PropTypes.func.isRequired,
  /** The list of Purchase list items to be displayed in the UI */
  itemList: PropTypes.arrayOf(
    PropTypes.shape({
      /** The Sku id of the variant */
      catRefId: PropTypes.string.isRequired,
      /** The quantity of the product in purchase list*/
      quantityDesired: PropTypes.number.isRequired,
      /** The id of the product */
      productId: PropTypes.string.isRequired,
      /** Display name of the product */
      productName: PropTypes.string,
      /** Thumbnail image URI of the product variant */
      thumbnailUrl: PropTypes.string,
      /** Product variant property values */
      selectedOptions: PropTypes.arrayOf(
        PropTypes.shape({
          /** The variant type of the product */
          optionName: PropTypes.string.isRequired,
          /** The variant value of the product */
          optionValue: PropTypes.string.isRequired
        })
      ),
      /** The path of the product description page*/
      path: PropTypes.string.isRequired
    })
  ).isRequired
};

ProfilePurchaseListItemData.defaultProps = {};

export default ProfilePurchaseListItemData;
