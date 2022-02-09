import {getCurrentOrder, getPage, getOrder} from '@oracle-cx-commerce/commerce-utils/selector';

export const getComponentData = state => {
  const contextOrderId = getPage(state).contextId;
  const currentOrder = contextOrderId ? getOrder(state, {id: contextOrderId}) : getCurrentOrder(state);

  return {
    paymentGroups: currentOrder.paymentGroups,
    orderState: currentOrder.state
  };
};
