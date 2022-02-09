import {getOrder, getPage, getCurrentProfileId} from '@oracle-cx-commerce/commerce-utils/selector';
import {isPayLaterSelected, isEligibleToCompletePayment} from '@oracle-cx-commerce/react-components/utils/payment';
import {ORDER_STATE_PENDING_PAYMENT} from '@oracle-cx-commerce/commerce-utils/constants';

export const getComponentData = state => {
  const orderId = getPage(state).contextId;
  const order = getOrder(state, {id: orderId});
  const currentProfileId = getCurrentProfileId(state);
  const isEligibleToCompletePay = isEligibleToCompletePayment(order, currentProfileId);
  const isDisplayPendingPaymentDetails = order.state === ORDER_STATE_PENDING_PAYMENT ? true : false;

  return {
    isPayAfterApprovalSelected: isPayLaterSelected(state),
    isDisplayPendingPaymentDetails,
    isEligibleToCompletePay,
    orderId
  };
};
