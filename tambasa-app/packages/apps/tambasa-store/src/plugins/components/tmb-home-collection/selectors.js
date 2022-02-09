import {getCatalogRepository, getProducts} from '@oracle-cx-commerce/commerce-utils/selector';

export const getCatalogDataForCarousel = state => {
  const products = getProducts(state);
  const catalog = getCatalogRepository(state);
  
  return {
    products,
    catalog
  };
};