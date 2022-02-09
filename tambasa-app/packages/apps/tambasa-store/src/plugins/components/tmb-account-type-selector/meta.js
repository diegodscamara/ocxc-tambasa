import { widgetResourceKeys as accountRegistrationKeys } from '@oracle-cx-commerce/react-widgets/profile/accounts-contacts-registration/meta';
import { widgetResourceKeys as profileRegistrationKeys } from '../tmb-profile-registration/meta';
import { pt_BR as ptBRBundle, en as enBundle } from '@oracle-cx-commerce/resources';
import * as ptBRwidget from '../tmb-profile-registration/locales/pt-BR';
import * as enwidget  from '../tmb-profile-registration/locales/en';
import { buildResources } from '@oracle-cx-commerce/resources/utils';

const widgetResourceKeys = [
  'personalAccountText',
  'selectAccountTypeTextSummary',
  'businessAccountText',
  'selectAccountTypeText',
  'siteTypeHelpText',
  ...accountRegistrationKeys,
  ...profileRegistrationKeys
];

const resources = buildResources({
  en: { ...enBundle, ...enwidget },
  pt_BR: { ...ptBRBundle, ...ptBRwidget }
}, widgetResourceKeys);

export default {
  name: 'TmbAccountTypeSelector',
  decription: 'Description of widget TmbAccountTypeSelector',
  author: 'ruan.matos',
  fetchers: [],
  actions: [],
  availableToAllPages: false,
  pageTypes: ['Registration'],
  resources,
};
