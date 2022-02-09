import config from './config';
import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = [
  'labelNextImage',
  'labelImageSelected',
  'closeLinkAltText',
  'labelExpand',
  'lableOpenExpandedView',
  'labelRollOverImage'
];

export default {
  name: 'TmbProductImageViewer',
  decription: 'TmbProductImageViewer widget',
  author: 'diegodscamara',
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: mergeDefaultConfig(config),
  requiresContext: ['container_context', 'product_context']
};
