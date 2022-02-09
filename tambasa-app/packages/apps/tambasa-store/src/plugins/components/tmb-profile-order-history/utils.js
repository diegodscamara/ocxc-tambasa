/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

const nonDisplayableOrderStates = [
  'PENDING_APPROVAL_TEMPLATE',
  'FAILED_APPROVAL_TEMPLATE',
  'TEMPLATE',
  'PENDING_PAYMENT_TEMPLATE',
  'INCOMPLETE_CANCEL'
];
const sortProperty = 'submittedDate:desc';

export const numberOfRecentOrdersDesktop = 4;

export const numberOfRecentOrdersMobile = 1;

export const INPROGRESS_COLOR = {
  color: '#39B54A',
  gradientColor: '#006600'
};
export const FULFILLED_COLOR = {
  color: '#084F96',
  gradientColor: '#003161'
};
export const FAILED_COLOR = {
  color: '#F85359',
  gradientColor: '#DC151D'
};

export const ORDER_STATE_MESSAGES = {
  AGENT_REJECTED: 'messageAgentRejected',
  APPROVED: 'messageApproved',
  BEING_AMENDED: 'messageBeingAmended',
  FAILED: 'messageFailed',
  NO_PENDING_ACTION: 'messageNoPendingAction',
  REMOVED: 'messageRemoved',
  PENDING_REMOVE: 'messagePendingRemove',
  PROCESSING: 'messageProcessing',
  SUBMITTED: 'messageSubmitted',
  SUSPENDED: 'messageSuspended',
  REJECTED_QUOTE: 'messageRejectedQuote',
  PENDING_QUOTE: 'messagePendingQuote',
  QUEUED: 'messageQueued',
  PENDING_PAYMENT: 'messagePendingPayment',
  REJECTED: 'messageRejected',
  QUOTE_REQUEST_FAILED: 'messageQuoteRequestFailed',
  FAILED_APPROVAL: 'messageFailedApproval',
  QUOTED: 'messageQuoted',
  APPROVED_TEMPLATE: 'messageApprovedTemplate',
  PENDING_MERCHANT_ACTION: 'messagePendingMerchantAction',
  PENDING_CUSTOMER_RETURN: 'messagePendingCustomerReturn',
  PENDING_CUSTOMER_ACTION: 'messagePendingCustomerAction',
  PENDING_APPROVAL: 'messagePendingApproval',
  PENDING_AGENT_APPROVAL: 'messagePendingAgentApproval',
  INCOMPLETE: 'messageIncomplete'
};

export const buildQuerySQLPram = (profileId, siteFilter, organizationFilter) => {
  let query = nonDisplayableOrderStates.reduce((query, value, index) => {
    query += `state ne "${value}"`;
    if (index < nonDisplayableOrderStates.length - 1) query += ' AND ';

    return query;
  }, '');
  if (profileId) {
    query += ` AND profileId eq "${profileId}"`;
  }
  if (organizationFilter) {
    query += ` AND organizationId eq "${organizationFilter}"`;
  }
  if (siteFilter) {
    query += ` AND siteId eq "${siteFilter}"`;
  }

  return query;
};

const getOrderThumbnails = (orderIds, action) => {
  const payload = {
    orderId: '',
    queryParams: {
      fields: [
        'order.items.childSKUs.primaryThumbImageURL',
        'order.items.primaryThumbImageURL',
        'order.items.primaryImageTitle',
        'order.items.id',
        'id'
      ]
    }
  };
  for (const order of orderIds) {
    payload.orderId = order;
    action('getOrder', {...payload});
  }
};

export const getOrder = (q, offset, numberOfOrders, action, showThumbnails, getOrderCallback) => {
  const payload = {
    q,
    offset,
    limit: numberOfOrders,
    sort: sortProperty
  };
  action('getAllOrdersForProfile', payload).then(response => {
    if (response.ok && response.json && response.json.items) {
      const recentOrderIds = [];
      for (const order of response.json.items) {
        recentOrderIds.push(order.orderId);
      }
      getOrderCallback(recentOrderIds, response);
      if (showThumbnails) getOrderThumbnails(recentOrderIds, action);
    } else {
      getOrderCallback();
    }
  });
};
