import {getCurrentOrder, getCurrentProfile, getOrder, getPage, getProfileShippingAddresses} from '@oracle-cx-commerce/commerce-utils/selector';
import {
  getPaymentGroupsByTypes,
  isPaymentEnabledForApproval,
  isPaymentTypeEnabled,
  isPaymentDisabled,
  getPaymentEnabledForScheduledOrder
} from '@oracle-cx-commerce/react-components/utils/payment';
import {PAYMENT_TYPE_INVOICE, PAYMENT_METHOD_INVOICE_REQUEST} from '@oracle-cx-commerce/commerce-utils/constants';

/**
 * Returns widget's required data
 * @param {Object} state the state object
 * @returns required data
 */
export const getComponentData = state => {
  // selectors
  const contextOrderId = getPage(state).contextId;
  const order = contextOrderId ? getOrder(state, {id: contextOrderId}) : getCurrentOrder(state);
  const currentProfile = getCurrentProfile(state)

  return {
    isPaymentDisabled: isPaymentDisabled(order),
    isDisplayCheckoutInvoice: isPaymentTypeEnabled(state, PAYMENT_TYPE_INVOICE),
    appliedInvoicePaymentGroups: getPaymentGroupsByTypes(order, [PAYMENT_METHOD_INVOICE_REQUEST]),
    isPaymentMethodEnabledForApproval: isPaymentEnabledForApproval(state, PAYMENT_TYPE_INVOICE),
    currentProfile,
    isApprovalEnabled: currentProfile.derivedApprovalRequired,
    PaymentInfoForScheduledOrder: getPaymentEnabledForScheduledOrder(state, PAYMENT_TYPE_INVOICE)
  };
};
