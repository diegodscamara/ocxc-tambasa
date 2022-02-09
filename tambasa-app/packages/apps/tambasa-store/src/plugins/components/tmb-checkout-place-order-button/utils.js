import {
  ORDER_STATE_INCOMPLETE,
  ORDER_STATE_PENDING_PAYMENT,
  ORDER_STATE_SUBMITTED,
  PAGE_CHECKOUT_ORDER_CONFIRMATION_LINK,
  PAGE_CHECKOUT_PAYMENT_LINK,
  PAGE_PENDING_PAYMENT_LINK,
  PAGE_SCHEDULED_ORDER_DETAILS_LINK,
  PAYMENT_STATE_AUTHORIZE_FAILED
} from '@oracle-cx-commerce/commerce-utils/constants';
import {
  getPayerAuthPaymentGroup,
  handlePayerAuthPaymentGroup,
  notifyPaymentFailure
} from '@oracle-cx-commerce/react-components/utils/payment';

/**
 * Submit Order Success Handler.
 * Checks order state and invokes the respective page navigation and validations
 *
 * @function {goToPage}  goToPage callback function
 * @param {object}  submit order action response
 * @function {action}  action callback function
 * @param {object} default messages array
 */

export const handleOrderSubmitSuccess = (goToPage, response = {}, action, messages) => {
  const {delta: {orderRepository = {}} = {}} = response;
  const {orders = {}, scheduledOrders = {}} = orderRepository;
  const order = Object.values(orders || {})[0] || {};
  const scheduledOrder = Object.values(scheduledOrders || {})[0] || {};
  let {state} = order;
  const {id, paymentGroups = {}} = order;
  if (scheduledOrder.templateOrder) {
    state = scheduledOrder.templateOrder.state;
  }
  if (state === ORDER_STATE_SUBMITTED || state === 'PENDING_APPROVAL') {
    const url = `${PAGE_CHECKOUT_ORDER_CONFIRMATION_LINK}/${response.delta.clientRepository.context.request.uuid}`;
    goToPage(url);
  } else if (state === 'TEMPLATE' || state === 'PENDING_APPROVAL_TEMPLATE') {
    // scheduled payments
    const url = `${PAGE_SCHEDULED_ORDER_DETAILS_LINK}/${scheduledOrder.id}`;
    goToPage(url);
  } else if (state === 'QUOTE') {
    // Quote
  } else {
    const payerAuthPaymentGroup = getPayerAuthPaymentGroup(paymentGroups);
    if (payerAuthPaymentGroup) {
      handlePayerAuthPaymentGroup(goToPage, order);
    } else {
      const failedPaymentGroups = Object.values(paymentGroups).filter(
        payment => payment.paymentState === PAYMENT_STATE_AUTHORIZE_FAILED
      );
      // get error message
      if (failedPaymentGroups.length === 0) {
        const message = messages.alertTechnicalProblemContactUs;
        action('notify', {level: 'error', message});
      } else if (state === ORDER_STATE_PENDING_PAYMENT) {
        notifyPaymentFailure(action, failedPaymentGroups, messages);
        // navigate to order pending payment page
        const url = `${PAGE_PENDING_PAYMENT_LINK}/${id}`;
        goToPage(url);
      } else if (state === ORDER_STATE_INCOMPLETE) {
        notifyPaymentFailure(action, failedPaymentGroups, messages);
        goToPage(PAGE_CHECKOUT_PAYMENT_LINK);
      }
    }
  }
};

/**
 * Submit Order Failure Handler.
 * Based on the error code, decides which page to be navigated and throws the error notifications.
 *
 * @param { action }  to trigger any action
 * @function { goToPage }  goToPage callback function
 * @param { response }  submit order action response
 */

export const handleOrderSubmitFailure = (action, goToPage, response = {}) => {
  const {error = {}} = response;
  const {message} = error;
  //Display Error Message
  action('notify', {level: 'error', message});
  //To know the price change, expired payment groups etc
  action('getCart', {}).then(response => {
    if (response.ok === false) {
      const {error = {}} = response;
      const {message} = error;
      action('notify', {level: 'error', message});
    }
  });
  //uncomment these lines when we know the error codes categorization
  //Based on the error code, navigate to the respective checkout page
  // for (const index of Object.keys(errorCodes)) {
  //   const errorCodeCategory = errorCodes[index];
  //   for (const codeIndex of Object.values(errorCodeCategory)) {
  //     if (codeIndex === errorCode) {
  //       if (errorCodeCategory === 'SHIPPING_ERROR_CODES') {
  //         goToPage('checkout-shipping');
  //       } else if (errorCodeCategory === 'PAYMENT_ERROR_CODES') {
  //         goToPage('checkout-payment');
  //       } else {
  //         window.location.reload();
  //       }
  //     }
  //   }
  // }
};
