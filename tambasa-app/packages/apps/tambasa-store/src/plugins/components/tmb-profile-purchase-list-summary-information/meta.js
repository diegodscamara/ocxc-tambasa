import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = [
  'textPurchaseListOwner',
  'textLastModified',
  'textModifiedBy',
  'textListSharedWithAccount',
  'textListSharedWithEmail',
  'textListNotShared',
  'textListSharedWithBoth'
];

export default TmbProfilePurchaseListSummaryInformation = {
  name: 'TmbProfilePurchaseListSummaryInformation',
  decription: 'Description of widget TmbProfilePurchaseListSummaryInformation',
  author: 'guilherme.vieira',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: { properties: [], locales: {} },
  availableToAllPages: false,
  pageTypes: ['profile'],
  requiresContext: ['container_context']
};