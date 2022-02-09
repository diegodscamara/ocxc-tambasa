
import {getSearchResults, isMobile} from '@oracle-cx-commerce/commerce-utils/selector';
import {getSearchResultsFetcherData} from '@oracle-cx-commerce/fetchers/search/selectors';

export const getComponentData = state => {
  const {contextId, pageId, pageType} = getSearchResultsFetcherData(state);
  const searchResults = getSearchResults(state);
  const mobile = isMobile(state);

  return {
    contextId,
    pageId,
    pageType,
    searchResults,
    mobile
  };
};
