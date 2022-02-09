import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = [
  'closeLinkAltText',
  'textShareList',
  'textEditList',
  'textCopyList',
  'textDeleteList',
  'textEditPurchaseList',
  'textAllFieldsRequired',
  'labelListName',
  'labelDescriptionOptional',
  'actionSave',
  'actionCancel',
  'actionConfirm',
  'textDeletePurchaseList',
  'textConfirmDeletePurchaseListMessage',
  'actionShowMore',
  'textActionButtonsSeparator',
  'alertPurchaseListUpdated',
  'alertPurchaseListDeleted',
  'alertPurchaseListCreated',
  'textCopyPurchaseList',
  'labelCopy',
  'textSharePurchaseList',
  'labelEmailAddress',
  'labelAddComment',
  'labelShareWithAccount',
  'labelShareWithEmailAddress',
  'textAddEmailAddress',
  'labelPermissions',
  'textCanEdit',
  'textReadOnly',
  'textRemoveShopper',
  'alertPurchaseListSharingUpdated'
];

export default TmbProfilePurchaseListActionButtons = {
  name: 'TmbProfilePurchaseListActionButtons',
  decription: 'Description of widget TmbProfilePurchaseListActionButtons',
  author: 'guilherme.vieira',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: { properties: [], locales: {} },
  availableToAllPages: false,
  pageTypes: ['profile'],
  requiresContext: ['container_context']
};
