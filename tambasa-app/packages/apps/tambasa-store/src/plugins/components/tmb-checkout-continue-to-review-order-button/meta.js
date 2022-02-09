import * as en from './locales/en'
import * as pt_BR from './locales/pt-BR'
import config from './config';

export default TmbCheckoutContinueToReviewOrderButton = {
  name: 'TmbCheckoutContinueToReviewOrderButton',
  decription: 'Description of widget TmbCheckoutContinueToReviewOrderButton',
  author: 'guilherme.vieira',
  actions: ['applyPayments', 'updateAppliedPayment', 'deleteAppliedPayment', 'notifyClearAll', 'notify'],
  fetchers: [],
  resources: {
    'pt-BR': pt_BR,
    en
  },
  availableToAllPages: false,
  pageTypes: ['checkout-payment'],
  config
};

