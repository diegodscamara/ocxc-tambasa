import * as pt_BR from './locales/pt-BR';
import * as en from './locales/en';

export const TmbDynamicProductListingContainerDesktop = {
  name: 'TmbDynamicProductListingContainerDesktop',
  decription: 'Description of widget TmbDynamicProductListingContainerDesktop',
  author: 'guilherme.vieira',
  fetchers: ['fetchSearchResults'],
  pageTypes: ['search', 'category'],
  providesContext: ['pagination_context'],
  type: "container",
  resources: {
    pt_BR,
    en
  }
};

export const TmbDynamicProductListingContainerMobile = {
  name: 'TmbDynamicProductListingContainerMobile',
  decription: 'Description of widget TmbDynamicProductListingContainerMobile',
  author: 'guilherme.vieira',
  fetchers: ['fetchSearchResults'],
  pageTypes: ['search', 'category'],
  providesContext: ['pagination_context'],
  type: "container",
  resources: {
    pt_BR,
    en
  }
};