import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = ['actionRemove', 'messagePromoApplied', 'messagePromoOffer'];

export default TmbPromotionsDisplay = {
  name: 'TmbPromotionsDisplay',
  decription: 'Description of widget TmbPromotionsDisplay',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: defaultConfig,
  actions: ['removeCouponsFromCart']
};
