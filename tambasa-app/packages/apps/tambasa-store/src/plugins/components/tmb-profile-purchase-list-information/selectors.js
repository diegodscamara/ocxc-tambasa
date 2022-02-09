import {useEffect, useContext, useRef, useState} from 'react';
import {ContainerContext, StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import {getCurrentProduct} from '@oracle-cx-commerce/commerce-utils/selector';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';
import {useSelector} from '@oracle-cx-commerce/react-components/provider';

export const useComponentData = () => {
  const {action} = useContext(StoreContext);
  const {id} = useContext(ContainerContext);
  const [isEditable, setIsEditable] = useState(false);
  const isEditablePopulated = useRef(false);

  useEffect(() => {
    if (id && !isEditablePopulated.current) {
      try {
        action('checkPurchaseListEditAccess', {purchaseListId: id}).then(response => {
          if (response.ok) {
            setIsEditable(response.json.hasEditAccess);
            isEditablePopulated.current = true;
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [action, id, isEditable]);

  return {
    isEditable
  };
};

/**
 * Returns data required by the component by invoking selectors
 *
 * @param  {String} widgetId Widget Id
 * @param  {String} productId Product Id
 * @return {Object} Object
 */
export const useProductData = () => {
  // state
  const [selections, setSelections] = useState({});
  const product = useSelector(getCurrentProduct);
  const isProductFound = !isEmptyObject(product);

  const skuNotInProducts = (childSKUs, skuId) => {
    const sku = childSKUs.find(chidSKU => chidSKU === skuId);

    return sku === undefined ? true : false;
  };

  if (isProductFound) {
    // setSelections only when there is valid product/sku

    const {variantOptionsSeed, variantToSkuLookup = [], childSKUs = []} = product;

    // For products with no variant options, the skuId is set in the initial state.
    const skuId = isEmptyObject(variantOptionsSeed) ? variantToSkuLookup[''] : null;
    if (
      isEmptyObject(selections) ||
      (isEmptyObject(variantOptionsSeed) && skuId !== selections.skuId) ||
      (!isEmptyObject(variantOptionsSeed) && selections.skuId && skuNotInProducts(childSKUs, selections.skuId))
    ) {
      setSelections({
        skuId,
        variantOptions: {},
        qty: 1
      });
    }
  }

  return {
    selections,
    setSelections
  };
};
