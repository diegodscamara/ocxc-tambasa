import { en as enBundle, pt_BR as pt_BR_Bundle } from '@oracle-cx-commerce/resources';
import * as pt_BR from './locales/pt-BR'
import * as en from './locales/en'
import { buildResources } from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = [
  'actionCancel',
  'actionSave',
  'actionUpdatePassword',
  'alertUpdateProfileSuccessful',
  'headingAccountDetails',
  'labelEmailAddress',
  'labelFirstName',
  'labelCompany',
  'labelLastName',
  'labelPhoneNumberOptional',
  'textAllFieldsRequired',
  'textRequiredField',
  'widgetPresentationName'
];

const resources = buildResources({
  en: { ...enBundle, ...en },
  pt_BR: { ...pt_BR_Bundle, ...pt_BR }
}, widgetResourceKeys)

export default {
  name: 'TmbProfileDetails',
  decription: 'Description of widget TmbProfileDetails',
  author: 'ruan.matos',
  availableToAllPages: false,
  pageTypes: ['profile'],
  actions: ['updateProfile'],
  config: { properties: [], locales: {} },
  resources
};
