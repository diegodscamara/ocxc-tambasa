import * as resourceBundle from '@oracle-cx-commerce/resources';
import { buildResources } from '@oracle-cx-commerce/resources/utils';
import config from './config';

const widgetResourceKeys = [
  'headingGDPRCookieControlTitle',
  'textCookieControlMessage1',
  'textCookieControlMessage2',
  'labelAcceptButton',
  'labelOptOutButton',
  'textAgreeToUseCookie',
  'textCookiePolicyHyperText'
];

export default TmbCookieControl = {
  name: 'TmbCookieControl',
  decription: 'Description of widget TmbCookieControl',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  packageId: '@tambasa-store/tambasa-store/src/plugins/components',
  config,
  resources: buildResources(resourceBundle, widgetResourceKeys),
  availableToAllPages: true
};