import { en, pt_BR } from '@oracle-cx-commerce/resources';
import * as customEn from './locales/en'
import * as customPt_BR from './locales/pt-BR'
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import config from './config';

const widgetResourceKeys = [
  'breadcrumbLinkText1',
  'breadcrumbLinkText2',
  'breadcrumbLinkText3',
  'breadcrumbLinkText4',
  'breadcrumbLinkText5',
  'breadcrumbSeparator',
  'actionHome',
  'actionYourAccount',
  'actionOrderHistory',
  'actionWishLists',
  'actionScheduledOrders',
  'actionPurchaseLists',
  'actionAccountContacts',
  'actionRegistrationRequests',
  'pageLocationText'
];

const resources = buildResources({
  en: { ...en, ...customEn }, pt_BR: { ...pt_BR, ...customPt_BR }
}, widgetResourceKeys)

export default TmbNavigationBreadcrumbs = {
  name: 'TmbNavigationBreadcrumbs',
  decription: 'Description of widget TmbNavigationBreadcrumbs',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  config,
  resources
};
