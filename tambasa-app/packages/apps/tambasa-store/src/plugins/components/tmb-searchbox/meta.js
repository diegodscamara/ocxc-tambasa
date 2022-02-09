import { en, pt_BR } from '@oracle-cx-commerce/resources';
import * as customEn from './locales/en'
import * as customPt_BR from './locales/pt_BR'

import { buildResources } from '@oracle-cx-commerce/resources/utils';
import config from './config';
 
const widgetResourceKeys = ['closeLinkAltText', 'actionClear', 'textEnterSearch', 'searchIconAltText'];
 
const resources = buildResources({ 
    en: {...en, ...customEn}, 
    pt_BR: {...pt_BR, ...customPt_BR} 
  }, widgetResourceKeys)

export const TmbSearchBoxMobile = {
  name: 'TmbSearchBoxMobile',
  decription: 'Search box for mobile devices',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources,
  config
}

export const TmbSearchBoxDesktop = {
  name: 'TmbSearchBoxDesktop',
  decription: 'Search box on desktop viewports',
  author: 'guilherme.vieira',
  fetchers: [],
  actions: [],
  resources,
  config
}
 
