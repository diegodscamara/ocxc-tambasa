import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from './config';

const widgetResourceKeys = [
  'labelSearchProductsFilter',
  'headingAddAProduct',
  'labelCancel',
  'actionSelectAll',
  'actionDeselectAll',
  'labelAddSelectedItemsToCart',
  'labelSaveChangesToItemsInPurchaseList',
  'labelProductQuantity',
  'textItemDetails',
  'actionRemoveItem',
  'alertMergeItemsToCart',
  'alertMergeItemsToCartConfirm',
  'textShoppingCartNotEmpty',
  'actionConfirm',
  'actionCancel',
  'closeLinkAltText',
  'alertPurchaseListUpdated',
  'actionClear',
  'labelAddToPurchaseList',
  'textBackOrderable',
  'textInStock',
  'textOutOfStock',
  'textPreOrderable',
  'textSelectOptionOnline',
  'textBackOrderableWithAvailabilityDate',
  'textPreOrderableWithAvailabilityDate',
  'alertCannotFetchSku',
  'textNoItemsToDisplay',
  'textItemisNotAvailable',
  'textSku'
];

export default TmbProfilePurchaseListInformation = {
  name: 'TmbProfilePurchaseListInformation',
  decription: 'Description of widget TmbProfilePurchaseListInformation',
  author: 'guilherme.vieira',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config,
  availableToAllPages: false,
  pageTypes: ['profile'],
  requiresContext: ['container_context'],
  actions: [
    'clearTypeahead',
    'listSkus',
    'updatePurchaseList',
    'notify',
    'typeahead',
    'qaddItemsToCart',
    'checkPurchaseListEditAccess'
  ]
};
