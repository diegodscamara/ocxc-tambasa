import {
  getCurrentOrder,
  getCurrentOrderId,
  getCartEndpointStatus,
  getUUID,
  getGiftWithPurchaseMessages,
  getCurrentOrderScheduleInfo
} from '@oracle-cx-commerce/commerce-utils/selector';

export const getComponentData = state => {
  const currentOrder = getCurrentOrder(state) || {};
  const currentOrderId = getCurrentOrderId(state) || '';
  const uuid = getUUID(state) || '';
  const {shippingGroups = {}, commerceItems = {}, paymentGroups = {}, billingAddress = {}} = currentOrder;
  const isGetCartInProgress = getCartEndpointStatus(state);
  const totalGwpMessages = getGiftWithPurchaseMessages(state) || {};
  const giftWithPurchaseMessages = totalGwpMessages[getCurrentOrderId(state)]
    ? totalGwpMessages[getCurrentOrderId(state)].messages
    : [];
  const scheduleInfo = getCurrentOrderScheduleInfo(state);

  return {
    shippingGroups,
    commerceItems,
    paymentGroups,
    billingAddress,
    isGetCartInProgress,
    isPlaceOrderInProgress: !currentOrderId && uuid !== '',
    giftWithPurchaseMessages,
    scheduleInfo
  };
};
