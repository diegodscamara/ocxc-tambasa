import * as resourceBundle from '@oracle-cx-commerce/resources';

import { buildResources } from '@oracle-cx-commerce/resources/utils';
import config from './config';

const widgetResourceKeys = [
  'headingReturningCustomer',
  'textCreateAnAccount',
  'labelEmail',
  'textForgottenPassword',
  'actionLogin',
  'alertLoginSuccessful',
  'alertLoginUnSuccessful',
  'labelPassword',
  'headingEmailMarketingPreferences',
  'textConfirmEmailAndMarkatingPreference',
  'labelShowPersonalizationConsent',
  'labelGetMarketingMails',
  'buttonContinue',
  'textAccountWithNoContractError'
];

export default {
  name: 'TmbLogin',
  decription: 'Description of widget TmbLogin',
  author: 'ruan.matos',
  fetchers: [],
  actions: [],

  resources: buildResources(resourceBundle, widgetResourceKeys),
  config
};
