import {getPurchaseList, getPage} from '@oracle-cx-commerce/commerce-utils/selector';

export const getComponentData = state => {
  const purchaseListId = getPage(state).contextId;
  const purchaseList = getPurchaseList(state, {id: purchaseListId});

  return {
    purchaseListId,
    purchaseList
  };
};
