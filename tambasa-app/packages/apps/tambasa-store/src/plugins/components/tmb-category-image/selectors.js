import {
    getCategory, 
    getPage, 
    getSearchResults, 
    getCatalogRepository,
    isMobile
} from '@oracle-cx-commerce/commerce-utils/selector';

import {getSearchResultsFetcherData} from '@oracle-cx-commerce/fetchers/search/selectors';

export const getComponentData = state => {
    const {contextId: categoryId} = getPage(state);
    
    const {
        displayName, 
        categoryImages = []
    } = getCategory(state, {categoryId});
    
    return {
        displayName,
        categoryImages
    };
};

export const getDataForBreadcrumbs = state => {
    const {categories} = getCatalogRepository(state);
    const {contextId, pageId, pageType} = getSearchResultsFetcherData(state);
    const searchResults = getSearchResults(state);
    const mobile = isMobile(state);

    return {
        contextId,
        pageId,
        pageType,
        searchResults,
        mobile,
        categories
    };
}
