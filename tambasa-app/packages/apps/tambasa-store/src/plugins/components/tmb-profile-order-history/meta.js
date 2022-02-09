
import { en as enBundle, pt_BR as pt_BR_Bundle } from '@oracle-cx-commerce/resources';
import * as en from './locales/en'
import * as pt_BR from './locales/pt-BR'
import { buildResources } from '@oracle-cx-commerce/resources/utils';
import config from './config';

const widgetResourceKeys = [
  'headingOrderHistory',
  'messageNoOrderAssociated',
  'actionShowMoreOrders',
  'textRetrievingOrders',
  'textAddtionSymbol',
  'labelStatus',
  'labelOrderDate',
  'labelTotalCost',
  'labelOrderNumber',
  'messageAgentRecjected',
  'messageApproved',
  'messageBeingAmended',
  'messageFailed',
  'messageNoPendingAction',
  'messageRemoved',
  'messagePendingRemove',
  'messageProcessing',
  'messageSubmitted',
  'messageSuspended',
  'messageRejectedQuote',
  'messagePendingQuote',
  'messageQueued',
  'messagePendingPayment',
  'messageRejected',
  'messageQuoteRequestFailed',
  'messageFailedApproval',
  'messageQuoted',
  'messageApprovedTemplate',
  'messagePendingMerchantAction',
  'messagePendingCustomerReturn',
  'messagePendingCustomerAction',
  'messagePendingApproval',
  'messagePendingAgentApproval',
  'messageIncomplete',
  'widgetPresentationName'
];

const resources = buildResources({
  en: { ...enBundle, ...en },
  pt_BR: { ...pt_BR_Bundle, ...pt_BR }
}, widgetResourceKeys)

export default {
  name: 'TmbProfileOrderHistory',
  decription: 'Description of widget TmbProfileOrderHistory',
  author: 'ruan.matos',
  fetchers: [],
  actions: [],
  config,
  resources
};
