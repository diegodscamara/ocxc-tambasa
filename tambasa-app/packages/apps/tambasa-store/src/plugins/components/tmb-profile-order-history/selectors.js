/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {
  isAuthenticated,
  getCurrentProfileId,
  isMobile,
  getCurrentSiteId
} from '@oracle-cx-commerce/commerce-utils/selector';

export const getProfileOrdersData = state => {
  const profileId = getCurrentProfileId(state);
  const isMobileDevice = isMobile(state);
  const siteId = getCurrentSiteId(state);
  const isUserLoggedIn = isAuthenticated(state) && getCurrentProfileId(state) !== 'anonymous';

  return {
    profileId,
    isMobileDevice,
    siteId,
    isUserLoggedIn
  };
};
