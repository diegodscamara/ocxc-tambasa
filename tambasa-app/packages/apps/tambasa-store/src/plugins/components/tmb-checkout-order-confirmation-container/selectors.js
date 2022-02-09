import {
  getUUID,
  getContext,
  getPage,
  getOrder
} from '@oracle-cx-commerce/commerce-utils/selector';

export const getComponentData = state => {
  let uuid = getUUID(state);

  //Reloading on confirmation page will not have uuid in request. So, get the value from page context
  const contextId = getPage(state).contextId || null;
  const order = getContext(state).uuidToOrder || {};
  uuid = uuid || contextId;
  const orderId = order[uuid] || null;
  const {
    state: orderState = '',
    approvalSystemMessages = {},
    paymentGroups: paymentData = {}
  } = getOrder(state, {id: orderId}) || {};

  return {
    uuid,
    orderId,
    orderState,
    approvalSystemMessages,
    paymentData
  };
};
