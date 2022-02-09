import { en as enBundle, pt_BR as pt_BR_Bundle } from '@oracle-cx-commerce/resources';
import * as en from './locales/en'
import * as pt_BR from './locales/pt-BR'
import { buildResources } from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = [
  'headingEmailMarketingPreferences',
  'actionCancel',
  'labelGetMarketingMails',
  'alertUpdateProfileSuccessful',
  'actionSave',
  'labelShowPersonalizationConsent',
  'textUnsubscribeEmailMarketingUpdates',
  'widgetPresentationName'
];

const resources = buildResources({
  en: { ...enBundle, ...en },
  pt_BR: { ...pt_BR_Bundle, ...pt_BR }
}, widgetResourceKeys)

export default {
  name: 'TmbProfileEmailMarketingPreferences',
  decription: 'Description of widget TmbProfileEmailMarketingPreferences',
  author: 'ruan.matos',
  availableToAllPages: false,
  pageTypes: ['profile'],
  config: { properties: [], locales: {} },
  resources
};
