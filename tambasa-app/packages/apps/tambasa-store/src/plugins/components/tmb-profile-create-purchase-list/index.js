/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, { useCallback, useContext, useEffect, useRef, useState, Suspense } from 'react';
import { debounce, throttle } from '@oracle-cx-commerce/utils/generic';
import {
  getCurrentOrganizationId,
  getCurrentSiteId,
  getGlobalContext
} from '@oracle-cx-commerce/commerce-utils/selector';
import { scrollToTop } from '../utils/misc/dom-functions'

import Form from '@oracle-cx-commerce/react-components/form';
import ProfilePurchaseListItemData from './components/profile-purchaselist-item-data';
import PropTypes from 'prop-types';
import SearchIcon from '@oracle-cx-commerce/react-components/icons/search';
import SearchResultsPanel from './components/profile-purchaselist-search-results';
import { StoreContext, ContainerContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import { formToJson } from '@oracle-cx-commerce/react-components/utils';
import { useNavigator } from '@oracle-cx-commerce/react-components/link';
import { getProductData } from '@oracle-cx-commerce/react-widgets/profile/profile-purchase-list-information/utils';
import { useProductData } from '@oracle-cx-commerce/react-widgets/profile/profile-purchase-list-information/selectors';

// Lazy load Quick View
const QuickView = React.lazy(() =>
  import('@oracle-cx-commerce/react-widgets/profile/profile-purchase-list-information/components/quick-view')
);
/**
 * A component for creating profile related Purchase Lists.
 */
const ProfileCreatePurchaseList = props => {
  const {
    headingCreatePurchaseList,
    textAllFieldsRequired,
    labelListName,
    labelDescriptionOptional,
    headingAddAProduct,
    labelSearchProductsFilter,
    actionSave,
    alertPurchaseListCreated,
    actionClear,
    numberOfSearchResultsToLoad = 5,
    menuList,
    setMenuList,
    widgetId
  } = props;

  const goToPage = useNavigator();
  const store = useContext(StoreContext);
  const { action } = store;
  const siteId = getCurrentSiteId(store.getState());
  const accountId = getCurrentOrganizationId(store.getState());
  const { locale } = getGlobalContext(store.getState());
  const clearTypeaheadThrottle = throttle(action, 200);
  const searchClearRef = useRef(null);
  const productSearchInput = useRef(null);
  const [itemList, setItemList] = useState([]);
  const [showQuickView, setShowQuickView] = useState(false);
  const [product, setProduct] = useState({});
  const [currentRecord, setCurrentRecord] = useState({});
  const { selections, setSelections } = useProductData();
  const createPurchaseListFormRef = useRef(null);

  /**
   * Handler to open quick view pop up and fetch product data
   */
  const handleQuickView = useCallback(
    productId => {
      if (productId) {
        getProductData(action, productId, response => {
          const { products } = response.getProductResponse.delta.catalogRepository;
          setProduct(products[Object.keys(products)[0]]);
        });
      }

      // Open quick view modal
      setShowQuickView(true);
    },
    [setShowQuickView, setProduct, action]
  );

  /**
   * Success callback for createPurchaseList action
   */
  const onOk = useCallback(
    menuList => {
      action('notify', { level: 'success', message: alertPurchaseListCreated });

      const purchaseListMenuId = menuList.find(menuItem => 
        menuItem.name === "LISTAS DE COMPRA" || 
        menuItem.widgetId.includes("profile-purchase-lists")
      )

      if(purchaseListMenuId) {
        props.setActiveTab(purchaseListMenuId.widgetId);
        scrollToTop()
      }
    },
    [action, alertPurchaseListCreated, goToPage]
  );

  /**
   * Failure callback for createPurchaseList action
   */
  const onNotOk = useCallback(
    ({ error: { message = '' } = {} } = {}) => {
      action('notify', { level: 'error', message });
    },
    [action]
  );

  /**
   * On submit method to create a new Purchase List.
   */
  const createPurchaseList = useCallback(
    event => {
      event.preventDefault();
      const form = event.target;
      const formData = formToJson(form);
      const purchaseListItems = [];

      Object.values(itemList).forEach(item => {
        const inputItem = {};
        inputItem.productId = item.productId;
        inputItem.catRefId = item.catRefId;
        inputItem.quantityDesired = Number(item.quantityDesired);
        purchaseListItems.push(inputItem);
      });
      const payload = {
        siteId,
        accountId,
        name: formData.purchaseListName,
        description: formData.description,
        items: purchaseListItems
      };
      action('createPurchaseList', payload)
        .then(response => {
          if (response.ok === false) {
            onNotOk(response);
          } else {
            onOk(menuList);
            delete createPurchaseListFormRef.current.dataset.dirty;
          }
        })
        .catch(error => {
          onNotOk({ error });
        });
    },
    [accountId, action, itemList, onNotOk, onOk, siteId]
  );

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
    const transformedItems = [...itemList];
    let skuId = product['sku.repositoryId'][0];
    if (variantData && variantData.skuId) {
      skuId = variantData.skuId;
    }
    let index = -1;
    Object.values(transformedItems).forEach(item => {
      if (index === -1 && item.catRefId === skuId) {
        index = transformedItems.indexOf(item);
      }
    });
    if (index !== -1) {
      transformedItems[index].quantityDesired++;
      setItemList(transformedItems);
    } else {
      const purchaseListItemData = {
        catRefId: skuId,
        quantityDesired: '1',
        productId: product['product.repositoryId'][0],
        productName: product['product.displayName'][0],
        thumbnailUrl: product['sku.listingThumbImageURL']
          ? product['sku.listingThumbImageURL'][0]
          : product['product.primaryThumbImageURL'][0],
        selectedOptions:
          variantData && variantData.selectedVariants && variantData.selectedVariants.length > 0
            ? variantData.selectedVariants
            : null,
        path: product['product.route']
      };

      transformedItems.push(purchaseListItemData);
      setItemList(transformedItems);
    }
    createPurchaseListFormRef.current.dataset.dirty = true;
    action('clearTypeahead');
  };

  /**
   * Event handler when a product is selected to add to the list of items in Purchase List
   */

  const selectProduct = (product, variants) => {
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
    setShowQuickView(false);
  }, [setShowQuickView]);

  useEffect(() => {
    action('clearTypeahead');
  }, [action]);

  useEffect(() => {
    if (menuList && menuList.length > 0) {

      var menuListTemp = menuList.find(el => el.widgetId === widgetId);

      if (menuListTemp && !menuListTemp.name) {

        menuListTemp.name = "CRIAR LISTAS DE COMPRA";

        setMenuList(menuList);
        props.setCreatePurchaseListId(widgetId);
      }
    }

  }, [menuList]);

  useEffect(() => {
    setItemList([]);
    searchClearRef.current.style.display = 'none';
    productSearchInput.current.value = '';
  }, [props.activeTab]);

  return (
    <Styled id="TmbProfileCreatePurchaseList" css={css}>
      <ContainerContext.Provider value={{ selections, setSelections }}>
        <div className="ProfileCreatePurchaseList">
          <h1>{headingCreatePurchaseList}</h1>
          <div className="ProfileCreatePurchaseList__RequiredLabel">{textAllFieldsRequired}</div>
          <Form
            formRef={createPurchaseListFormRef}
            enableUnsavedChangesTracking={true}
            onSubmit={createPurchaseList}
            noValidate
          >
            <div className="ProfileCreatePurchaseList__ListName">
              <label htmlFor="purchaseListName" className="ProfileCreatePurchaseList__ListNameLabel">
                {labelListName}
              </label>
              <input
                type="text"
                id="purchaseListName"
                name="purchaseListName"
                className="ProfileCreatePurchaseList__ListNameInput"
                data-testid="purchaseListName"
                autoCapitalize="words"
                maxLength="256"
                required
              />
              <span className="validationMessage"></span>
            </div>
            <div>
              <label htmlFor="description" className="ProfileCreatePurchaseList__DescriptionLabel">
                {labelDescriptionOptional}
              </label>
              <textarea
                id="description"
                name="description"
                className="ProfileCreatePurchaseList__Description"
                maxLength="254"
                autoCapitalize="sentences"
              />
              <span className="validationMessage"></span>
            </div>
            <div className="ProfileCreatePurchaseList__AddProduct">
              <h2 className="primary-heading">{headingAddAProduct}</h2>
              <div className="ProfileCreatePurchaseList__Search">
                <label htmlFor={`ProductSearch`}>{ }</label>
                <div className="ProductSearch__Wrapper">
                  <div className="ProfileCreatePurchaseList__SearchIcon">
                    <SearchIcon />
                  </div>
                  <input
                    name="Ntt"
                    type="search"
                    id={`ProductSearch`}
                    className="ProfileCreatePurchaseList__SearchInput"
                    placeholder={labelSearchProductsFilter}
                    autoComplete="off"
                    aria-label={labelSearchProductsFilter}
                    ref={productSearchInput}
                    data-disablechangetracking={true}
                    onBlurCapture={onSearchInputBlur}
                    onChange={onSearchSubmitDebounced}
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        event.preventDefault();
                      }
                    }}
                  />

                  <button
                    type="button"
                    className="ProfileCreatePurchaseList_Search__ClearButton"
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
                    {...props}
                  />
                </Suspense>
              )}
            </div>
            {itemList && itemList.length > 0 && (
              <ProfilePurchaseListItemData
                createPurchaseListFormRef={createPurchaseListFormRef}
                itemList={itemList}
                setItemList={setItemList}
                {...props}
              />
            )}
            <div className="ProfileCreatePurchaseList__FormButtons">
              <button type="submit" className="ProfileCreatePurchaseList__SubmitButton">
                {actionSave}
              </button>
            </div>
          </Form>
        </div>
      </ContainerContext.Provider>
    </Styled>
  );
};

ProfileCreatePurchaseList.propTypes = {
  /** Number of results to load on searching for a product */
  numberOfSearchResultsToLoad: PropTypes.number
};

ProfileCreatePurchaseList.defaultProps = {
  numberOfSearchResultsToLoad: 5
};

export default ProfileCreatePurchaseList;
