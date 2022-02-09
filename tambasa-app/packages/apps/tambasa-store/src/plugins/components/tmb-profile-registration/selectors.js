import {
  getCommonResources,
  getPasswordPolicies,
  getProfileCustomPropertiesById,
  getSite,
  isAuthenticated,
  isSecureEmailEnabled
} from '@oracle-cx-commerce/commerce-utils/selector';

export const getPageData = state => {
  const authenticated = isAuthenticated(state);
  const commonResources = getCommonResources(state);
  const passwordPolicies = getPasswordPolicies(state);
  const secureEmailEnabled = isSecureEmailEnabled(state);

  return {
    authenticated,
    commonResources,
    passwordPolicies,
    secureEmailEnabled,
    ...getSite(state)
  };
};

export const getCustomPropertiesData = state => {
  const {specifications: customPropertiesUser = []} = getProfileCustomPropertiesById(state, 'user');

  return {
    customPropertiesUser
  };
};
