import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

export const widgetResourceKeys = [
  'headingYourCart',
  'alertNoLongerForSale',
  'alertOutOfStock',
  'alertPriceIncreased',
  'messagePriceChange',
  'alertPriceDecreased',
  'alertCartHeading'
];

export default TmbCartContainer = {
  name: 'TmbCartContainer',
  decription: 'Description of widget TmbCartContainer',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources: buildResources(resourceBundle, widgetResourceKeys),
  type: 'container',
  config: defaultConfig,
  availableToAllPages: false,
  pageTypes: ['cart'],
  providesContext: ['cart_context']
};

