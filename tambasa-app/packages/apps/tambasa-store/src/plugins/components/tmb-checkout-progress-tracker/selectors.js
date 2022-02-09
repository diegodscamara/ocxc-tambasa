import {
  getCurrentOrder,
  getCurrentOrderId,
  getPage,
  getUUID,
  isCurrentUserB2B,
  isMobile
} from '@oracle-cx-commerce/commerce-utils/selector';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';
import {isPayLaterSelected} from '@oracle-cx-commerce/react-components/utils/payment';

export const getComponentData = state => {
  const currentOrder = getCurrentOrder(state);
  const currentOrderId = getCurrentOrderId(state);
  const isPlaceOrderInProgress = getUUID(state) !== '';
  const currentPage = getPage(state);
  const isB2BUser = isCurrentUserB2B(state);
  const mobile = isMobile(state)

  return {
    currentOrderId,
    currentOrder: !isEmptyObject(currentOrder) ? currentOrder : undefined,
    currentPage,
    currentPageType: currentPage.pageType,
    isB2BUser,
    isPlaceOrderInProgress,
    isPayAfterApprovalSelected: isPayLaterSelected(state),
    mobile
  };
};
