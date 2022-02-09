import {getPage, getSite, isAuthenticated} from '@oracle-cx-commerce/commerce-utils/selector';

export const getComponentData = state => {
  const site = getSite(state);
  const siteTypes = site.siteTypes || [];
  const b2bCommerceValueIndex = siteTypes.indexOf('b2bCommerce');
  const commerceValueIndex = siteTypes.indexOf('commerce');
  const {pageType} = getPage(state);
  const isLoggedInUser = isAuthenticated(state);

  return {
    b2bCommerceValueIndex,
    commerceValueIndex,
    pageType,
    isLoggedInUser
  };
};
