import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = [
  'breadcrumbSeparator', 
  'correctedToAltText', 
  'textHome'
];

export default TmbProductBreadcrumbs = {
  name: 'TmbProductBreadcrumbs',
  decription: 'TmbProductBreadcrumbs description',
  author: 'diegodscamara',
  fetchers: [],
  actions: [],
  resources: buildResources(resourceBundle, widgetResourceKeys),
  pageTypes: ['product'],
  config: defaultConfig,
};
