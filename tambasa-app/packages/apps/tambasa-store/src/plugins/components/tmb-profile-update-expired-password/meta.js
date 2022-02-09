import * as resourceBundle from '@oracle-cx-commerce/resources';
import { buildResources } from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = [
  'buttonContinue',
  'labelEmailAddress',
  'labelConfirmNewPassword',
  'labelNewPassword',
  'HeadingNewPassword',
  'alertPasswordNotMatched',
  'buttonSubmit',
  'alertUpdateExpiredPasswordFailure',
  'alertUpdatePasswordSuccessful'
];

export default {
  name: 'TmbProfileUpdateExpiredPassword',
  decription: 'Description of widget TmbProfileUpdateExpiredPassword',
  author: 'ruan.matos',
  fetchers: [],
  actions: [],
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: defaultConfig
};
