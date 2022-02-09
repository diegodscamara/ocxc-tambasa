import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import Img from '@oracle-cx-commerce/react-components/img';
import Checkbox from '@oracle-cx-commerce/react-components/checkbox';
import Link from '@oracle-cx-commerce/react-components/link';
import PropTypes from 'prop-types';

const ProfilePurchaseListItemData = props => {
  const {
    textItemDetails,
    labelProductQuantity,
    actionRemoveItem,
    transformedList,
    setTransformedList,
    setSkuList,
    skuList,
    setAddToCartButtonView,
    isEditable,
    setTransformedListEmptied,
    textItemisNotAvailable,
    textSku,
    purchaseListInfoFormRef = null
  } = props;

  const NUMERIC_STRING_PATTERN = /^[0-9]+(\.[0-9]+)?$/;

  /*
   * Method to remove the selected item from the transformed list of Purchase List items
   */

  const handleRemoveItem = deleteItem => {
    const transformedItems = [...transformedList];
    const skuItems = [...skuList];
    Object.values(transformedItems).forEach(item => {
      if (item.catRefId === deleteItem.catRefId) {
        const index = transformedItems.indexOf(item);
        if (index !== -1) {
          transformedItems.splice(index, 1);
          const skuIndex = skuItems.indexOf(item.catRefId);
          skuItems.splice(skuIndex, 1);
        }
      }
    });
    if (transformedItems.length === 0) {
      setAddToCartButtonView(false);
      setTransformedListEmptied(true);
    }
    setSkuList(skuItems);
    setTransformedList(transformedItems);
    purchaseListInfoFormRef.current.dataset.dirty = true;
  };

  /**
   * Method to update the quantity of the selected item in the transformed list
   * of Purchase List items
   */

  const handleQuantityChange = (event, itemId) => {
    if (!NUMERIC_STRING_PATTERN.test(event.target.value)) {
      event.target.value = '';
    }
    const transformedItems = [...transformedList];
    Object.values(transformedItems).forEach(item => {
      if (item.catRefId === itemId) {
        item.quantityDesired = Number(event.target.value);
      }
    });
    setTransformedList(transformedItems);
  };

  /*
   * Method to Check the selected item to be marked for adding to cart.
   */

  const handleCheckedChange = (event, itemId) => {
    const transformedItems = [...transformedList];
    let addTocartButtonView = false;
    Object.values(transformedItems).forEach(item => {
      if (event && event.target && item.catRefId === itemId) {
        item.addToCart = event.target.checked ? true : false;
      }
      if (item.addToCart) {
        addTocartButtonView = true;
      }
    });
    setAddToCartButtonView(addTocartButtonView);
    setTransformedList(transformedItems);
  };

  return (
    <Styled id="ProfilePurchaseListItemData__ItemDetails" css={css}>
      <div className="ProfilePurchaseListItemData__ItemDetails">
        <div className="ProfilePurchaseListItemData__ItemDetailsHeader">
          <span className="ProfilePurchaseListItemData__ItemDetailsLabel">{textItemDetails}</span>
          <span className="ProfilePurchaseListItemData__QuantityLabel">{labelProductQuantity}</span>
        </div>
        {Object.values(transformedList).map(item => (
          <div className="ProfilePurchaseListItemData__Row" key={`PurchaseListItem-${item.catRefId}`}>
            <div className="ProfilePurchaseListItemData__Select">
              <Checkbox
                id={`ProductCheckBox-${item.catRefId}`}
                checked={item.addToCart}
                className="ProfilePurchaseListItemData__Checkbox"
                data-testid={`ProductCheckBox-${item.catRefId}`}
                aria-label={`ProductCheckBox-${item.catRefId}`}
                disabled={item.productName === ''}
                onChange={event => {
                  handleCheckedChange(event, item.catRefId);
                }}
              ></Checkbox>
            </div>
            <div className="ProfilePurchaseListItemData__Image">
              <Link href={item.path}>
                <Img src={item.thumbnailUrl} title={item.productName} alt={item.productName} />
              </Link>
            </div>
            <div className="ProfilePurchaseListItemData__Name">
              {item.productName === '' ? (
                <div>
                  <div>{textItemisNotAvailable}</div>
                  <div>
                    {textSku}
                    {item.catRefId}
                  </div>
                </div>
              ) : (
                <Link href={item.path} className="ProfilePurchaseListItemData__ProductName">
                  {item.productName}
                </Link>
              )}
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
                  id={`ProductQuantity-${item.catRefId}`}
                  name={`ProductQuantity-${item.catRefId}`}
                  className="ProfilePurchaseListItemData__QuantityInputText"
                  data-testid={`ProductQuantity-${item.catRefId}`}
                  aria-label={`ProductQuantity-${item.catRefId}`}
                  disabled={item.productName === ''}
                  onChange={event => {
                    handleQuantityChange(event, item.catRefId);
                  }}
                  value={item.quantityDesired}
                />
              </div>
              {isEditable && (
                <div
                  role="button"
                  tabIndex={0}
                  className="ProfilePurchaseListItemData__RemoveItem"
                  key="ProfilePurchaseListItemData__RemoveItem"
                  data-testid={`ProductRemoveItem-${item.catRefId}`}
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
              )}
            </div>
          </div>
        ))}
      </div>
    </Styled>
  );
};

ProfilePurchaseListItemData.propTypes = {
  /** Callback function to be invoked to update the value of transformed list */
  setTransformedList: PropTypes.func.isRequired,
  /** The list of Purchase list items to be displayed in the UI */
  transformedList: PropTypes.arrayOf(
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
      path: PropTypes.string.isRequired,
      /** Stock availability of the product */
      isProductDeleted: PropTypes.bool.isRequired,
      /** denotes if the item is selected to be added to cart */
      addToCart: PropTypes.bool.isRequired
    })
  ).isRequired,
  /** Callback function to be invoked to update the value of sku list */
  setSkuList: PropTypes.func.isRequired,
  /** The array of sku Ids of items to be displayed in the UI */
  skuList: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Callback function to reset the flag that controls the display of Add Items To Cart button in the UI */
  setAddToCartButtonView: PropTypes.func.isRequired,
  /** Denotes whether current Purchase List is editable by the user */
  isEditable: PropTypes.bool.isRequired
};

ProfilePurchaseListItemData.defaultProps = {};

export default ProfilePurchaseListItemData;
