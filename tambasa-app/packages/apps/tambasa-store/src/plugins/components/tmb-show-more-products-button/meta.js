import config from './config';
import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = [
  'actionShowMoreProducts',
  'labelPageOfPages',
  'labelPageOfPagesDropdown',
  'labelPaginationDropDown',
  'labelPreviousPage',
  'labelNextPage',
  'labelFirstPage',
  'labelLastPage',
  'textRetrievingProducts'
];

export default {
  name: 'TmbShowMoreProductsButton',
  decription: 'Description of widget TmbShowMoreProductsButton',
  author: 'guilherme.vieira',
  actions: ['search'],
  pageTypes: ['search', 'category'],
  requiresContext: ['pagination_context'],
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config
};