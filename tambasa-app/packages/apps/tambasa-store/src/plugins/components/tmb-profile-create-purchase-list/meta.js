import { en as enBundle, pt_BR as pt_BR_Bundle } from '@oracle-cx-commerce/resources';
import * as en from './locales/en'
import * as pt_BR from './locales/pt-BR'
import { buildResources } from '@oracle-cx-commerce/resources/utils';
import config from '@oracle-cx-commerce/react-widgets/profile/profile-create-purchase-list/config';

const widgetResourceKeys = [
  'textPurchaseListItems',
  'headingCreatePurchaseList',
  'textAllFieldsRequired',
  'labelListName',
  'labelDescriptionOptional',
  'headingAddAProduct',
  'labelSearchProductsFilter',
  'actionSave',
  'actionCancel',
  'alertPurchaseListCreated',
  'actionClear',
  'labelProductQuantity',
  'textItemDetails',
  'actionRemoveItem',
  'labelAddToPurchaseList',
  'textBackOrderable',
  'textInStock',
  'textOutOfStock',
  'textPreOrderable',
  'textSelectOptionOnline',
  'textBackOrderableWithAvailabilityDate',
  'textPreOrderableWithAvailabilityDate',
  'widgetPresentationName'
];

const resources = buildResources({
  en: { ...enBundle, ...en },
  pt_BR: { ...pt_BR_Bundle, ...pt_BR }
}, widgetResourceKeys)

export default {
  name: 'TmbProfileCreatePurchaseList',
  decription: 'Description of widget TmbProfileCreatePurchaseList',
  author: 'ruan.matos',
  availableToAllPages: false,
  actions: ['createPurchaseList', 'notify', 'typeahead', 'clearTypeahead'],
  pageTypes: ['Create Purchase List'],
  config,
  resources
};
