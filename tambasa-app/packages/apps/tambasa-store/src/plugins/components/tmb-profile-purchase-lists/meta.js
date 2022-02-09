import { en as enBundle, pt_BR as pt_BR_Bundle } from '@oracle-cx-commerce/resources';
import * as en from './locales/en'
import * as pt_BR from './locales/pt-BR'
import { buildResources } from '@oracle-cx-commerce/resources/utils';
import config from '@oracle-cx-commerce/react-widgets/profile/profile-purchase-lists/config';

const widgetResourceKeys = [
  'textPurchaseListItems',
  'headingPurchaseLists',
  'labelNewList',
  'headingMyLists',
  'headingSharedLists',
  'labelMyPurchaseListsFilter',
  'labelSharedPurchaseListsFilter',
  'labelLoadMore',
  'textNoMatchingPurchaseLists',
  'textPurchaseListsFilterResults',
  'textRetrievingPurchaseLists',
  'nameasc',
  'namedesc',
  'labelAriaSortText',
  'labelAriaFilterText',
  'textAllSharedLists',
  'textSharedWithEmail',
  'textSharedWithAccount',
  'textPurchaseListOwnerDescription',
  'textOwnerLastNameAsc',
  'textOwnerLastNameDesc',
  'textOwnerEmailAsc',
  'textOwnerEmailDesc',
  'textPrivate',
  'textShared',
  'widgetPresentationName'
];

const resources = buildResources({
  en: { ...enBundle, ...en },
  pt_BR: { ...pt_BR_Bundle, ...pt_BR }
}, widgetResourceKeys)

export default {
  name: 'TmbProfilePurchaseLists',
  decription: 'Description of widget TmbProfilePurchaseLists',
  author: 'ruan.matos',
  availableToAllPages: false,
  actions: ['listPurchaseLists'],
  pageTypes: ['Purchase Lists'],
  resources,
  config
};
