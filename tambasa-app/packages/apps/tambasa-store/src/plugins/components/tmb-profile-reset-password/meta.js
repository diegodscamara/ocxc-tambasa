import * as resourceBundle from '@oracle-cx-commerce/resources';
import { buildResources } from '@oracle-cx-commerce/resources/utils';
import defaultConfig from '@oracle-cx-commerce/react-widgets/config';

const widgetResourceKeys = [
  'labelEmail',
  'textPasswordResetHelper',
  'headingResetPassword',
  'alertResetPasswordFailure',
  'alertResetPasswordSuccessful',
  'buttonResendPasswordRequest',
  'buttonSubmit'
];

export default {
  name: 'TmbProfileResetPassword',
  decription: 'Description of widget TmbProfileResetPassword',
  author: 'ruan.matos',
  fetchers: [],
  actions: [],
  resources: buildResources(resourceBundle, widgetResourceKeys),
  config: defaultConfig
};
