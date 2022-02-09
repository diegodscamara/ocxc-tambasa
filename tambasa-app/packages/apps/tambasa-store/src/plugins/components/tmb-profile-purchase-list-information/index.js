import {ContainerContext, StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import {PAGE_CART_LINK, PAGE_PROFILE_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import React, {Suspense, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {debounce, throttle} from '@oracle-cx-commerce/utils/generic';
import {getCurrentOrder, getGlobalContext, getSku} from '@oracle-cx-commerce/commerce-utils/selector';
import {
  useComponentData,
  useProductData
} from '@oracle-cx-commerce/react-widgets/profile/profile-purchase-list-information/selectors';

import Form from '@oracle-cx-commerce/react-components/form';
import MergeCartItemsModal from '@oracle-cx-commerce/react-widgets/profile/add-items-to-cart/components/merge-cart-items';
import ProfilePurchaseListItemData from './components/profile-purchaselist-item-data';
import PropTypes from 'prop-types';
import SearchIcon from '@oracle-cx-commerce/react-components/icons/search';
import SearchResultsPanel from './components/profile-purchaselist-search-results';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {getProductData} from './utils';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';

// Lazy load Quick View
const QuickView = React.lazy(() =>
  import('@oracle-cx-commerce/react-widgets/profile/profile-purchase-list-information/components/quick-view')
);
/**
* Widget that displays purchase list item related information
* and allows to update them.
*/
const TmbProfilePurchaseListInformation = props => {
  //resources
  const {
    headingAddAProduct,
    labelSearchProductsFilter,
    labelCancel,
    actionSelectAll,
    actionDeselectAll,
    labelAddSelectedItemsToCart,
    labelSaveChangesToItemsInPurchaseList,
    labelAddToPurchaseList,
    alertPurchaseListUpdated,
    alertCannotFetchSku,
    actionClear,
    textNoItemsToDisplay,
    numberOfSearchResultsToLoad = 5
  } = props;

  //Fetching Container and Store context
  const goToPage = useNavigator();
  const {id: purchaseListId = '', purchaseListItems} = useContext(ContainerContext);
  const store = useContext(StoreContext);
  const {action, getState} = store;
  const {locale} = getGlobalContext(getState());
  // local states
  const [skuList, setSkuList] = useState([]);
  const [invalidSkuList, setInvalidSkuList] = useState([]);
  const [transformedList, setTransformedList] = useState([]);
  const [addToCartButtonView, setAddToCartButtonView] = useState(false);
  const [transformedListEmptied, setTransformedListEmptied] = useState(false);
  const [modalView, setModalView] = useState(false);
  const searchClearRef = useRef(null);
  const productSearchInput = useRef(null);
  const {isEditable} = useComponentData();
  const {selections, setSelections} = useProductData();
  const clearTypeaheadThrottle = throttle(action, 200);

  const [showQuickView, setShowQuickView] = useState(false);
  const [product, setProduct] = useState({});
  const [currentRecord, setCurrentRecord] = useState({});
  const purchaseListInfoFormRef = useRef(null);

  /**
  * Handler to open quick view pop up and fetch pdp data
  */
  const handleQuickView = useCallback(
    productId => {
      if (productId) {
        getProductData(action, productId, response => {
          const {products} = response.getProductResponse.delta.catalogRepository;
          setProduct(products[Object.keys(products)[0]]);
        });
      }

      // Open quick view modal
      setShowQuickView(true);
    },
    [setShowQuickView, setProduct, action]
  );

  useEffect(() => {
    let skuIdsArray = [];
    action('clearTypeahead');

    // Get complete details of individual skus
    if (
      purchaseListItems &&
      purchaseListItems !== null &&
      Object.keys(purchaseListItems).length !== 0 &&
      skuList.length === 0 &&
      !transformedListEmptied
    ) {
      if (searchClearRef.current !== null) {
        searchClearRef.current.style.display = 'none';
      }
      let arrayOfSkus = [];
      Object.values(purchaseListItems).forEach(item => {
        arrayOfSkus = arrayOfSkus.concat(item.catRefId);
      });
      skuIdsArray = arrayOfSkus.splice(0, arrayOfSkus.length);
      try {
        action('listSkus', {skuIds: skuIdsArray, gatherErrorsForAllSkus: true}).then(response => {
          if (!response.ok) {
            if (response.json.invalidSkuIds.length === 0) {
              action('notify', {level: 'error', message: alertCannotFetchSku});
            } else {
              setInvalidSkuList(response.json.invalidSkuIds);
            }
          }
          setSkuList(skuIdsArray);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [action, alertCannotFetchSku, purchaseListItems, setSkuList, skuList.length, transformedListEmptied]);

  // Fetch sku details from the state to display
  const items = useMemo(() => {
    if (skuList.length > 0) {
      return skuList.map(skuId => getSku(getState(), {skuId}));
    }
  }, [getState, skuList]);

  /**
  * Transform sku data from state and purchase list to display in the UI
  */
  useMemo(() => {
    const purchaseListItemsData = [];
    if (purchaseListItems != null && items && items.length > 0 && transformedList.length === 0) {
      Object.values(purchaseListItems).forEach(purItem => {
        if (invalidSkuList.indexOf(purItem.catRefId) !== -1) {
          const purchaseListItemData = {
            catRefId: purItem.catRefId,
            quantityDesired: purItem.quantityDesired,
            productId: purItem.productId,
            productName: '',
            thumbnailUrl: null,
            selectedOptions: null,
            path: null,
            isProductDeleted: false,
            addToCart: false
          };
          purchaseListItemsData.push(purchaseListItemData);
        } else {
          for (const itemIndex of items) {
            if (itemIndex.repositoryId === purItem.catRefId) {
              const item = itemIndex;
              const purchaseListItemData = {
                catRefId: item.repositoryId,
                quantityDesired: purItem.quantityDesired,
                productId: item.parentProducts[0].id,
                productName: item.parentProducts[0].displayName,
                thumbnailUrl:
                  item.thumbImageURLs.length > 0 ? item.thumbImageURLs[0] : item.parentProducts[0].thumbImageURLs[0],
                selectedOptions: item.productVariantOptions ? item.productVariantOptions[0] : null,
                path: item.parentProducts[0].route,
                isProductDeleted: false,
                addToCart: false
              };

              purchaseListItemsData.push(purchaseListItemData);
            }
          }
        }
      });
      setTransformedList(purchaseListItemsData);
    }
  }, [purchaseListItems, items, invalidSkuList, transformedList.length]);

  /**
  * On submit method to make the changes to update the Purchase list
  */
  const handleUpdatePurchaseList = useCallback(() => {
    const inputPurchaseListItems = [];
    Object.values(transformedList).forEach(item => {
      const inputItem = {};
      inputItem.productId = item.productId;
      inputItem.catRefId = item.catRefId;
      inputItem.quantityDesired = Number(item.quantityDesired);
      inputPurchaseListItems.push(inputItem);
    });

    const payload = {
      purchaseListId,
      items: inputPurchaseListItems
    };
    try {
      action('updatePurchaseList', payload).then(response => {
        if (response.ok) {
          setTransformedListEmptied(false);
          delete purchaseListInfoFormRef.current.dataset.dirty;
          action('notify', {level: 'success', message: alertPurchaseListUpdated});
        } else {
          action('notify', {level: 'error', message: response.error.message});
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, [action, alertPurchaseListUpdated, purchaseListId, transformedList]);

  /**
  * Select/Deselect all items on clicking corresponding button
  */
  const handleSelectItemsChange = (event, value) => {
    event.preventDefault();
    const transformedItems = [...transformedList];
    let addTocartButtonView = false;
    Object.values(transformedItems).forEach(item => {
      item.addToCart = value ? true : false;
      if (item.addToCart || addTocartButtonView) {
        addTocartButtonView = true;
      }
    });
    setAddToCartButtonView(addTocartButtonView);
    setTransformedList(transformedItems);
  };

  /**
  * Method to trigger typeahead search on keying input in search
  */

  const onSearchSubmitDebounced = debounce(
    useCallback(
      event => {
        const searchText = event.target.value;
        // Issue a typeahead request if input is at least one character for
        // Chinese, Japanese and Korean locales, or two characters for all other locales
        if (
          searchText.length > (locale.startsWith('zh') || locale.startsWith('ja') || locale.startsWith('ko') ? 0 : 1)
        ) {
          searchClearRef.current.style.display = 'inline-block';
          action('typeahead', {
            text: searchText,
            maxResults: numberOfSearchResultsToLoad,
            searchServicePath: 'Default/services/typeahead',
            searchKey: 'TypeAhead'
          });
        } else {
          action('clearTypeahead');
          if (searchText.length === 0) {
            searchClearRef.current.style.display = 'none';
          }
        }
      },
      [action, locale, numberOfSearchResultsToLoad]
    ),
    200
  );

  const onSearchInputBlur = useCallback(() => {
    clearTypeaheadThrottle('clearTypeahead');
  }, [clearTypeaheadThrottle]);

  const onClear = useCallback(() => {
    action('clearTypeahead');
    searchClearRef.current.style.display = 'none';
    productSearchInput.current.value = '';
  }, [action]);

  /**
  * Method to add a product to the list of items in Purchase List
  */

  const addToPurchaseList = (product, variantData = {}) => {
    const transformedItems = [...transformedList];
    const skuItems = [...skuList];
    let skuId = product['sku.repositoryId'][0];
    if (variantData && variantData.skuId) {
      skuId = variantData.skuId;
    }
    const index = skuItems.indexOf(skuId);
    if (index !== -1) {
      Object.values(transformedItems).forEach(item => {
        if (item.catRefId === skuId) {
          item.quantityDesired++;
        }
      });
      setTransformedList(transformedItems);
    } else {
      const purchaseListItemData = {
        catRefId: skuId,
        quantityDesired: '1',
        productId: product['product.repositoryId'][0],
        productName: product['product.displayName'][0],
        thumbnailUrl: product['sku.listingThumbImageURL']
          ? product['sku.listingThumbImageURL'][0]
          : product['product.primaryThumbImageURL'][0],
        path: product['product.route'],
        selectedOptions:
          variantData && variantData.selectedVariants && variantData.selectedVariants.length > 0
            ? variantData.selectedVariants
            : null,
        isProductDeleted: false,
        addToCart: false
      };

      transformedItems.push(purchaseListItemData);
      skuItems.push(skuId);
      setSkuList(skuItems);
      setTransformedList(transformedItems);
    }
    purchaseListInfoFormRef.current.dataset.dirty = true;
    action('clearTypeahead');
  };

  /**
  * Event handler when a product is selected to add to the list of items in Purchase List
  * @param {object} product the product selected in search
  * @param {object} variants number of variants in the selected product
  */

  const selectProduct = (product, variants) => {
    // If there are more than one variants of the selected product, display quick view modal
    if (variants !== 1) {
      setCurrentRecord(product);
      handleQuickView(product['product.repositoryId'][0]);
    } else {
      addToPurchaseList(product);
    }
  };

  /**
  * Handler to close quick view pop up
  */
  const closeQuickView = useCallback(() => {
    // Hide quick view button
    setShowQuickView(false);
  }, [setShowQuickView]);

  /**
  * Method to fetch items in Purchase List which are selected to add to cart
  */

  const fetchCartItemProperties = itemList => {
    const selectedItemsArray = [];
    Object.values(itemList).forEach(item => {
      if (item.addToCart) {
        const {productId, catRefId} = item;
        const cartItem = {
          quantity: item.quantityDesired,
          productId,
          catRefId
        };
        selectedItemsArray.push(cartItem);
      }
    });

    return selectedItemsArray;
  };

  /**
  * Method to close Merge cart modal
  */

  const closeModal = useCallback(() => {
    setModalView(false);
  }, []);

  const onNotOk = useCallback(
    ({error: {message = ''} = {}} = {}) => {
      closeModal();
      action('notify', {level: 'error', message});
    },
    [action, closeModal]
  );

  const onOk = useCallback(() => {
    goToPage(PAGE_CART_LINK);
  }, [goToPage]);

  /**
  * Method to add the selected purchase list items to cart
  */

  const addSelectedItemsToCart = useCallback(async () => {
    try {
      const response = await action('addItemsToCart', {
        combineLineItems: 'yes',
        items: fetchCartItemProperties(transformedList)
      });
      if (response.ok === false) {
        onNotOk(response);
      } else {
        onOk(response);
      }
    } catch (error) {
      onNotOk(error);
    }
  }, [action, onNotOk, onOk, transformedList]);

  /**
  * Event handler on clicking Add Items To Cart
  */

  const onAddItemsClick = useCallback(() => {
    const isCartNonEmpty = getCurrentOrder(getState()).numberOfItems;
    if (isCartNonEmpty) {
      setModalView(true);
    } else {
      addSelectedItemsToCart();
    }
  }, [getState, addSelectedItemsToCart]);

  const selectAllToggle = useMemo(() => {
    return fetchCartItemProperties(transformedList).length === transformedList.length;
  }, [transformedList]);

  /**
  * Method to navigate to Purchase Lists page.
  */

  const gotoPurchaseListsPage = event => {
    event.preventDefault();
    goToPage(PAGE_PROFILE_LINK + "?purchase-lists");
  };

  return (
    <Styled id="TmbProfilePurchaseListInformation" css={css}>
      <ContainerContext.Provider value={{selections, setSelections}}>
        {purchaseListId && (
          <div className="TmbProfilePurchaseListInformation">
            <Form
              formRef={purchaseListInfoFormRef}
              enableUnsavedChangesTracking={true}
              onSubmit={handleUpdatePurchaseList}
              noValidate
            >
              {((transformedList && transformedList.length > 0) || transformedListEmptied) && isEditable && (
                <div className="TmbProfilePurchaseListInformation__FormButtons">
                  <button
                    type="submit"
                    className="TmbProfilePurchaseListInformation__SubmitButton"
                    data-testid="TmbProfilePurchaseListInformation__SubmitButtonTop"
                  >
                    {labelSaveChangesToItemsInPurchaseList}
                  </button>
                  <button
                    type="button"
                    className="TmbProfilePurchaseListInformation__CancelButton secondary"
                    data-testid="TmbProfilePurchaseListInformation__CancelButtonTop"
                    onClick={gotoPurchaseListsPage}
                  >
                    {labelCancel}
                  </button>
                </div>
              )}
              {isEditable && (
                <div className="TmbProfilePurchaseListInformation__AddProduct">
                  <h2 className="primary-heading">{headingAddAProduct}</h2>
                  <div className="TmbProfilePurchaseListInformation__Search">
                    <label htmlFor={`ProductSearch`}>{}</label>
                    <div className="TmbProfilePurchaseListInformation__SearchInput___Wrapper">
                      <div className="TmbProfilePurchaseListInformation__SearchIcon">
                        <SearchIcon />
                      </div>
                      <input
                        name="Ntt"
                        type="search"
                        id={`ProductSearch`}
                        ref={productSearchInput}
                        className="TmbProfilePurchaseListInformation__SearchInput"
                        placeholder={labelSearchProductsFilter}
                        autoComplete="off"
                        aria-label={labelSearchProductsFilter}
                        onBlurCapture={onSearchInputBlur}
                        data-disablechangetracking={true}
                        onChange={onSearchSubmitDebounced}
                        onKeyPress={event => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                          }
                        }}
                      />

                      <button
                        type="button"
                        className="TmbProfilePurchaseListInformation_Search__ClearButton"
                        ref={searchClearRef}
                        onClick={onClear}
                      >
                        {actionClear}
                      </button>
                    </div>
                  </div>
                  <SearchResultsPanel onSelect={selectProduct} />
                  {typeof window !== 'undefined' && (
                    <Suspense fallback={null}>
                      <QuickView
                        closeQuickView={closeQuickView}
                        showQuickView={showQuickView}
                        product={product}
                        record={currentRecord}
                        addToList={addToPurchaseList}
                        altText={''}
                        labelAddToButton={labelAddToPurchaseList}
                        {...props}
                      />
                    </Suspense>
                  )}
                </div>
              )}
              {transformedList && transformedList.length > 0 && (
                <div className="TmbProfilePurchaseListInformation__UpdateItem">
                  <div className="TmbProfilePurchaseListInformation__DeselectAll">
                    {selectAllToggle ? (
                      <button
                        type="button"
                        className="TmbProfilePurchaseListInformation__DeselectAllButton secondary"
                        onClick={event => {
                          handleSelectItemsChange(event, false);
                        }}
                      >
                        {actionDeselectAll}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="TmbProfilePurchaseListInformation__SelectAllButton secondary"
                        onClick={event => {
                          handleSelectItemsChange(event, true);
                        }}
                      >
                        {actionSelectAll}
                      </button>
                    )}
                  </div>
                  <ProfilePurchaseListItemData
                    transformedList={transformedList}
                    setTransformedList={setTransformedList}
                    setSkuList={setSkuList}
                    skuList={skuList}
                    setAddToCartButtonView={setAddToCartButtonView}
                    isEditable={isEditable}
                    setTransformedListEmptied={setTransformedListEmptied}
                    purchaseListInfoFormRef={purchaseListInfoFormRef}
                    {...props}
                  />
                  <div className="TmbProfilePurchaseListInformation__AddToCart">
                    <button
                      type="button"
                      disabled={!addToCartButtonView}
                      className="TmbProfilePurchaseListInformation__AddToCartButton secondary"
                      onClick={onAddItemsClick}
                      aria-label={labelAddSelectedItemsToCart}
                    >
                      <span>{labelAddSelectedItemsToCart}</span>
                    </button>
                  </div>
                  {isEditable && (
                    <div className="TmbProfilePurchaseListInformation__FormButtons TmbProfilePurchaseListInformation__FormButtonsPageEnd">
                      <button
                        type="submit"
                        className="TmbProfilePurchaseListInformation__SubmitButton"
                        data-testid="TmbProfilePurchaseListInformation__SubmitButtonBottom"
                      >
                        {labelSaveChangesToItemsInPurchaseList}
                      </button>
                      <button
                        type="button"
                        className="TmbProfilePurchaseListInformation__CancelButton secondary"
                        data-testid="TmbProfilePurchaseListInformation__CancelButtonBottom"
                        onClick={gotoPurchaseListsPage}
                      >
                        {labelCancel}
                      </button>
                    </div>
                  )}
                </div>
              )}
              {transformedList && transformedList.length === 0 && (
                <div className="TmbProfilePurchaseListInformation__UpdateItem">{textNoItemsToDisplay}</div>
              )}
              {typeof window !== 'undefined' && (
                <MergeCartItemsModal
                  showMergeCartItemsModal={modalView}
                  closeMergeCartItemsModal={closeModal}
                  addSelectedItemsToCartHandler={addSelectedItemsToCart}
                  {...props}
                ></MergeCartItemsModal>
              )}
            </Form>
          </div>
        )}
      </ContainerContext.Provider>
    </Styled>
  );
};

TmbProfilePurchaseListInformation.propTypes = {
  /** Number of results to load on searching for a product */
  numberOfSearchResultsToLoad: PropTypes.number
};

TmbProfilePurchaseListInformation.defaultProps = {
  numberOfSearchResultsToLoad: 5
};

export default TmbProfilePurchaseListInformation;
