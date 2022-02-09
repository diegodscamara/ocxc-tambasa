import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import {useContext} from 'react';
import {getGlobalContext, getCategory} from '@oracle-cx-commerce/commerce-utils/selector';

export const useRootCategoriesData = () => {
const store = useContext(StoreContext);
const rootCategoryIds = getGlobalContext(store.getState()).categories || [];

return rootCategoryIds.map(categoryId => getCategory(store.getState(), {categoryId}));
};

export const useExpandedCategoriesData = (categories = []) => {
const store = useContext(StoreContext);

return categories.map(({id}) => getCategory(store.getState(), {categoryId: id}));
};
