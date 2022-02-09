import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import mobileConfig from './config';

const widgetResourceKeys = [
  'deleteFilterAltText',
  'textBelowPrice',
  'textDone',
  'textFilter',
  'headingFilterResults',
  'textFilters',
  'textItemCount',
  'textPriceAndAbove',
  'actionReset',
  'textSelectAValue',
  'actionShowMore'
];

export const TmbFacetedNavigationMobile = {
  name: 'TmbFacetedNavigationMobile',
  decription: 'Description of widget TmbFacetedNavigationMobile',
  author: 'guilherme.vieira',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: mobileConfig,
  pageTypes: ['search', 'category']
};

export const TmbFacetedNavigationDesktop = {
  name: 'TmbFacetedNavigationDesktop',
  decription: 'Description of widget TmbFacetedNavigationDesktop',
  author: 'guilherme.vieira',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: { properties: [], locales: {} },
  pageTypes: ['search', 'category']
};
 
 

