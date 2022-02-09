import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = ['textDidYouMean', 'textNoMatchingItems', 'textSearchAdjusted', 'textSearchOriginal'];

export default TmbSearchTermsSummary = {
  name: 'TmbSearchTermsSummary',
  decription: 'Description of widget TmbSearchTermsSummary',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  pageTypes: ['search', 'category']
};

