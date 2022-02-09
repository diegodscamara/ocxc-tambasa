import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = ['textProductListingSummary'];

export default TmbProductListingSummaryInformation = {
  name: 'TmbProductListingSummaryInformation',
  decription: 'Description of widget TmbProductListingSummaryInformation',
  author: 'guilherme.vieira',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  pageTypes: ['search', 'category']
};
