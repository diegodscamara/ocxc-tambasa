import defaultConfig from '@oracle-cx-commerce/react-widgets/config';
import * as en from './locales/en';
import * as pt_BR from './locales/pt_BR';

export default TmbProductLongDescription = {
  name: 'TmbProductLongDescription',
  decription: 'TmbProductLongDescription widget',
  author: 'diegodscamara',
  requiresContext: ['product_context'],
  resources: { en, 'pt-BR': pt_BR },
  config: defaultConfig
};
