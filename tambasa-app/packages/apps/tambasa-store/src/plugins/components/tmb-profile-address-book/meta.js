import { en as enBundle, pt_BR as pt_BR_Bundle } from '@oracle-cx-commerce/resources';
import * as en from './locales/en'
import * as pt_BR from './locales/pt-BR'
import { buildResources } from '@oracle-cx-commerce/resources/utils';
import config from './config';

const widgetResourceKeys = [
  'headingAddressBook',
  'labelAddressBook',
  'labelAddNewAddress',
  'labelDefaultAddress',
  'actionDelete',
  'actionMakeDefault',
  'actionEdit',
  'actionAddNewAddress',
  'actionRemoveFromDefault',
  'closeLinkAltText',
  'actionConfirm',
  'actionCancel',
  'textAddressDeletionMessage',
  'textConfirmAddressDeletionMessage',
  'headingDeleteProfileAddress',
  'labelNoProfileAddressesAvailable',
  'headingAddAddress',
  'headingEditAddress',
  'headingEditProfileAddress',
  'headingAddProfileAddress',
  'textAllFieldsRequired',
  'textInvalidField',
  'textRequiredField',
  'labelNickName',
  'labelFirstName',
  'labelLastName',
  'labelCompanyName',
  'labelCountry',
  'labelZipCode',
  'labelState',
  'labelStreetAddress',
  'labelTownCity',
  'labelPhoneNumberOptional',
  'labelMakeDefaultShippingAddress',
  'labelCancel',
  'labelSave',
  'alertAddressChangedSuccessfully',
  'alertAddressCreatedSuccessfully',
  'widgetPresentationName'
];

const resources = buildResources({
  en: { ...enBundle, ...en },
  pt_BR: { ...pt_BR_Bundle, ...pt_BR }
}, widgetResourceKeys)

export default {
  name: 'TmbProfileAddressBook',
  decription: 'Description of widget TmbProfileAddressBook',
  author: 'ruan.matos',
  availableToAllPages: false,
  pageTypes: ['profile'],
  config,
  resources
};
