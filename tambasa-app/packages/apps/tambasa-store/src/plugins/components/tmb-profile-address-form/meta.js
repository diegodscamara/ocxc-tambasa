
import * as resourceBundle from '@oracle-cx-commerce/resources';
import { buildResources } from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = [
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
  'alertAddressCreatedSuccessfully'
];

export default {
  name: 'TmbProfileAddressForm',
  decription: 'Description of widget TmbProfileAddressForm',
  author: 'ruan.matos',
  availableToAllPages: false,
  pageTypes: ['profile'],
  config: defaultConfig,
  resources: buildResources(resourceBundle, widgetResourceKeys)
};
