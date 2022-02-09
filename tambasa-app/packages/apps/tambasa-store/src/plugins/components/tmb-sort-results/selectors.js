import {getGlobalContext, isAuthenticated, getCurrentProfileId} from '@oracle-cx-commerce/commerce-utils/selector';

export const getPageData = state => {
  const {baseURI} = getGlobalContext(state);
  const isUserLoggedIn = isAuthenticated(state) && getCurrentProfileId(state) !== 'anonymous';


  return {
    baseURI,
    isUserLoggedIn
  };
};
