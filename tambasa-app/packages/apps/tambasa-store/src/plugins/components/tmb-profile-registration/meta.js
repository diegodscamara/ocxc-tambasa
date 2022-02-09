import config from './config';

import { pt_BR as ptBRBundle, en as enBundle } from '@oracle-cx-commerce/resources';
import { buildResources } from '@oracle-cx-commerce/resources/utils';
import * as pt_BR from "./locales/pt-BR";
import * as en from "./locales/en";

export const widgetResourceKeys = [
  'alertAccountCreated',
  'headingCreateAnAccount',
  'actionCreateAnAccount',
  'alertCreateProfileEmailSentSuccessful',
  'alertCreateProfileSuccessful',
  'labelEmailAddress',
  'labelEmailUpdates',
  'labelFirstName',
  'labelGdprConsentGranted',
  'labelLastName',
  'textLogIn',
  'labelNo',
  'labelPassword',
  'labelPasswordConfirm',
  'alertPasswordNotMatched',
  'labelCpf',
  'labelStateRegistration',
  'labelPhone',
  'labelConfirmEmail',
  'buttonAdvance',
  'formTitleRegister',
  'formTitleDelivery',
  'labelCep',
  'labelSreet',
  'labelNumber',
  'labelComplement',
  'labelNeighborhood',
  'labelCity',
  'labelState',
  'alertCreateProfileSuccessfulTitle',
  'alertCreateProfileSuccessfulText',
  'alertCreateProfileSuccessfulButton',
  'concludeButton',
  'labelYes'
];

const resources = buildResources({
  en: { ...enBundle, ...en },
  pt_BR: { ...ptBRBundle, ...pt_BR }
}, widgetResourceKeys)

export default {
  name: 'TmbProfileRegistration',
  decription: 'Description of widget TmbProfileRegistration',
  author: 'ruan.matos',
  fetchers: [],
  actions: [],
  resources,
  config
};
