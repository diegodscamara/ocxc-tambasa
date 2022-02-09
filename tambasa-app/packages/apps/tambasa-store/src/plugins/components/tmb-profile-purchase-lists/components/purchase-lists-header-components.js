/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useCallback} from 'react';
import Dropdown from '@oracle-cx-commerce/react-components/dropdown';
import DropdownArrowIcon from '@oracle-cx-commerce/react-components/icons/dropdown-arrow';
import SlidersIcon from '@oracle-cx-commerce/react-components/icons/sliders';

import Search from '@oracle-cx-commerce/react-widgets/profile/contact-registration-requests/components/search';

/**
 * An object denoting the possible purchase list share types
 */
export const PURCHASE_LIST_SHARE_TYPES = {
  ALL: 'all',
  EMAIL: 'email',
  ACCOUNT: 'account'
};

/**
 * A sub-widget that handles the filtering of purchase lists based on share type
 */
export const PurchaseListFilter = props => {
  const {
    dataTestId = '',
    selectedFilter,
    setSelectedFilter,
    setPurchaseListIds,
    resetPage,
    labelAriaFilterText,
    textAllSharedLists,
    textSharedWithEmail,
    textSharedWithAccount
  } = props;

  /**
   * Listens to the change in the share-type of sort drop-down.
   *
   * @param {*} event
   */
  const onFilterChange = useCallback(
    event => {
      // loadMore.current = false;
      resetPage.current = true;
      setPurchaseListIds([]);
      setSelectedFilter(event.target.value);
    },
    [resetPage, setPurchaseListIds, setSelectedFilter]
  );

  return (
    <Dropdown
      className="ProfilePurchaseList__Filter"
      data-testid={dataTestId}
      onChange={onFilterChange}
      value={selectedFilter}
      aria-label={labelAriaFilterText}
      icon={
        <>
          <SlidersIcon className="SharedPurchaseLists__SelectSlidersIcon"></SlidersIcon>
          <DropdownArrowIcon className="SharedPurchaseLists__SelectArrowIcon"></DropdownArrowIcon>
        </>
      }
    >
      <option value={PURCHASE_LIST_SHARE_TYPES.ALL}>{textAllSharedLists}</option>
      <option value={PURCHASE_LIST_SHARE_TYPES.EMAIL}>{textSharedWithEmail}</option>
      <option value={PURCHASE_LIST_SHARE_TYPES.ACCOUNT}>{textSharedWithAccount}</option>
    </Dropdown>
  );
};

/**
 * A sub-widget that handles the filtering of purchase lists based on a search term
 */
export const PurchaseListSearch = props => {
  const {placeholderLabel, setSearchKey, setPurchaseListIds, resetPage} = props;

  /**
   * Listens to the change in the search bar.
   */
  const onSearchSubmit = useCallback(
    searchValue => {
      setPurchaseListIds([]);
      resetPage.current = true;
      setSearchKey(searchValue);
    },
    [resetPage, setPurchaseListIds, setSearchKey]
  );

  return (
    <Search
      searchInput={onSearchSubmit}
      placeholderLabel={placeholderLabel}
      searchIconAltText="searchIcon"
      {...props}
    />
  );
};

/**
 * A sub-widget that handles the sorting of purchase lists
 */
export const PurchaseListSort = props => {
  const {dataTestId, sortOptions, selectedSort, setSelectedSort, setPurchaseListIds, resetPage, labelAriaSortText} =
    props;

  /**
   * Listens to the change in the status of sort drop-down.
   *
   * @param {*} event
   */
  const onSortChange = useCallback(
    event => {
      // loadMore.current = false;
      resetPage.current = true;
      setPurchaseListIds([]);
      setSelectedSort(event.target.value);
    },
    [resetPage, setPurchaseListIds, setSelectedSort]
  );

  return (
    <Dropdown onChange={onSortChange} value={selectedSort} data-testid={dataTestId} aria-label={labelAriaSortText}>
      {sortOptions.map(sortOption => (
        <option
          key={`${sortOption.sortTerm}:${sortOption.order}`}
          aria-label={sortOption.display}
          label={sortOption.display}
          value={`${sortOption.sortTerm}:${sortOption.order}`}
        >
          {sortOption.display}
        </option>
      ))}
    </Dropdown>
  );
};

/**
 * A sub-widget that shows summary of the purchase lists loaded
 */
export const PurchaseListSummary = props => {
  const {
    fetchingData,
    searchKey,
    purchaseListIds,
    textRetrievingPurchaseLists,
    textPurchaseListsFilterResults,
    textNoMatchingPurchaseLists
  } = props;

  return (
    <>
      {fetchingData && (
        <div className="PurchaseLists__FetchingDataText">
          <span>{textRetrievingPurchaseLists}</span>
        </div>
      )}
      {!fetchingData && !searchKey && purchaseListIds.length === 0 && (
        <div className="PurchaseLists__FetchingDataText">
          <span>{textNoMatchingPurchaseLists}</span>
        </div>
      )}
      {!fetchingData && searchKey && (
        <div className="PurchaseLists__SearchSummaryContainer">
          <div>
            <span>{textPurchaseListsFilterResults}</span>
            &nbsp;
            <span className="PurchaseLists__SearchText">{`"${searchKey}"`}</span>
          </div>
          {purchaseListIds.length === 0 && <div>{textNoMatchingPurchaseLists}</div>}
        </div>
      )}
    </>
  );
};
