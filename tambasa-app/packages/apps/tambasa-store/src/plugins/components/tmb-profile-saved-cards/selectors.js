/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {
  getCurrentProfileId,
  getProfileSavedCardsArray,
  isAuthenticated,
  getCardTypes,
  getProfile
} from '@oracle-cx-commerce/commerce-utils/selector';
import { compareCards } from '@oracle-cx-commerce/react-components/utils/payment';
import { isEmptyObject } from '@oracle-cx-commerce/utils/generic';

export const getPageData = state => {
  const cardTypes = getCardTypes(state);
  const profile = getProfile(state);
  return {
    isUserLoggedIn: isAuthenticated(state) && getCurrentProfileId(state) !== 'anonymous',
    profileSavedCards: getProfileSavedCardsArray(state).sort(compareCards),
    cardTypes: !isEmptyObject(cardTypes) ? cardTypes : undefined,
    profile
 
  };
};
