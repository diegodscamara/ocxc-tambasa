import {noop} from '@oracle-cx-commerce/utils/generic';

const GET_PRODUCT = 'getProduct';
const GET_PRODUCT_PRICES = 'getProductsPrices';
const GET_STOCK_STATUS = 'getStockStatus';

/**
 * Failure handler
 */
const onNotOk = (action, {error: {message = ''} = {}} = {}) => {
  action('notify', {level: 'error', message});
};

/**
 * Invoke the necessary actions to fetch data for the Product Details.
 *
 * @param {function}  action function to invoke store actions
 * @param {string}  productId the id of the product whose data needs to be fetched
 * @param {function}  onOk function to be called on successful data fetching
 */

export const getProductData = (action, productId, onOk = noop) => {
  // First fetch the product details
  action(GET_PRODUCT, {productId})
    .then(getProductResponse => {
      if (getProductResponse.ok) {
        const products = [];
        Object.keys(getProductResponse.delta.catalogRepository.skus).forEach(skuId => {
          products.push(`${productId}:${skuId}`);
        });

        // Then fetch the product price
        action(GET_PRODUCT_PRICES, {
          productIds: [productId]
        }).then(getProductsPricesResponse => {
          if (getProductsPricesResponse.ok) {
            // Then fetch the stock status
            action(GET_STOCK_STATUS, {
              products
            }).then(getStockStatusResponse => {
              if (getStockStatusResponse.ok) {
                onOk({getProductResponse, getProductsPricesResponse, getStockStatusResponse});
              } else {
                onNotOk(action, {getStockStatusResponse});
              }
            });
          } else {
            onNotOk(action, {getProductsPricesResponse});
          }
        });
      } else {
        onNotOk(action, {getProductResponse});
      }
    })
    .catch(error => {
      onNotOk(action, {error});
    });
};
