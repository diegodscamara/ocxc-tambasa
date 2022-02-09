/* import { en as enBundle, pt_BR as pt_BR_Bundle } from '@oracle-cx-commerce/resources';
import * as en from './locales/en'
import * as pt_BR from './locales/pt-BR'
import {buildResources} from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = [
  'actionCancel',
  'buttonSaveAndContinue',
  'closeLinkAltText',
  'headingAddBillingAddress',
  'headingBillingAddress',
  'headingEditBillingAddress',
  'labelAddANewAddress',
  'labelAddressBook',
  'labelCancel',
  'labelCardCVV',
  'labelCardNumber',
  'labelCompanyName',
  'labelCountry',
  'labelCreditCard',
  'labelDefaultAddress',
  'labelDefaultBillingAddress',
  'labelDefaultShippingAddress',
  'labelEditAddress',
  'labelExpiryDate',
  'labelExpiryMonth',
  'labelExpiryYear',
  'labelFirstName',
  'labelLastName',
  'labelNameOnCard',
  'labelNickName',
  'labelNoAccountAddressesAvailable',
  'labelNoDefaultAddressesAvailable',
  'labelNoInheritedAddressesAvailable',
  'labelNoProfileAddressesAvailable',
  'labelOpenAddressBook',
  'labelPhoneNumberOptional',
  'labelSaveAsANewAccountAddress',
  'labelSaveAsANewProfileAddress',
  'textAccountAddressBook',
  'textAddressesForThisAccount',
  'textAllFieldsRequired',
  'textDefaultAddresses',
  'textEnterABillingAddress',
  'textInheritedAddresses',
  'textLoading',
  'textLoadMoreAccountAddress',
  'textLoadMoreInheritedAddress',
  'textLoadMoreProfileAddress',
  'textOpenAddressBookAndChooseBillingAddress',
  'textProfileAddresses',
  'textRequiredField',
  'textInvalidField',
  'textUseThisAddress',
  'labelSavedCard',
  'labelSaveCardToProfile',
  'labelState',
  'labelStreetAddress',
  'labelTownCity',
  'labelUseAnotherCard',
  'labelZipCode',
  'textFieldInvalid',
  'creditCardOwner',
  'creditCardNumber',
  'creditCardCVV',
  'creditCardMonth', 
  'creditCardYear',
  'shippingInfoLabel'
];

const resources = buildResources({
  en: { ...enBundle, ...en },
  pt_BR: { ...pt_BR_Bundle, ...pt_BR }
}, widgetResourceKeys) */

export default TmbCheckoutCreditCard = {
  name: 'TmbCheckoutCreditCard',
  decription: 'Description of widget TmbCheckoutCreditCard',
  author: 'guilherme.vieira',
  resources: {},
  availableToAllPages: false,
  pageTypes: ['checkout-payment', 'pending-payment'],
  config: { properties: [], locales: {} },
  requiresContext: ['payment_context'],
  actions: ['listProfileSavedCardsForCurrentSite', 'getOrganizationDefaultAddresses', 'notify'],
  fetchers: ['fetchCardTypes', 'fetchBillingCountries']
};

