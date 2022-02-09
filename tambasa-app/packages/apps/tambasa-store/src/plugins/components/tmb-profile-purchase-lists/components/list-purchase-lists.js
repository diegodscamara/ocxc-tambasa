/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useCallback, useContext, useEffect} from 'react';
import LoadMore from '@oracle-cx-commerce/react-components/load-more';
import IterateListItems from '@oracle-cx-commerce/react-components/load-more/list-items';
import Link from '@oracle-cx-commerce/react-components/link';
import UserIcon from '@oracle-cx-commerce/react-components/icons/user';
import UsersIcon from '@oracle-cx-commerce/react-components/icons/users';
import {useSelector} from '@oracle-cx-commerce/react-components/provider';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import {t} from '@oracle-cx-commerce/utils/generic';
import {getPurchaseList} from '@oracle-cx-commerce/commerce-utils/selector';
import PropTypes from 'prop-types';

/**
 * A sub component that loads the individual purchase list item
 * from the list.
 */
const PurchaseList = props => {
  const {
    itemId,
    textPurchaseListItems,
    textPurchaseListOwnerDescription,
    textPrivate,
    textShared,
    showOwner = false,
    showShareIcon = false
  } = props;

  const purchaseList = useSelector(getPurchaseList, {id: itemId});
  const {purchaseListItems = {}} = purchaseList;

  return (
    <Link href={`purchase-list-details/${itemId}`} className="PurchaseList__PurchaseListItem">
      <div className="PurchaseList__FlexElement">
        <div className="PurchaseList__FlexGrow">
          <div className="PurchaseList__PurchaseListItemName">{purchaseList.name}</div>
          <div className="PurchaseList__PurchaseListItemQuantity">
            {t(textPurchaseListItems, {PURCHASELISTCOUNT: Object.keys(purchaseListItems).length})}
          </div>
        </div>
        {showShareIcon &&
          (purchaseList.sharedWithOthers ? (
            <UsersIcon className="PurchaseList__ShareIcon" alt={textShared} title={textShared} />
          ) : (
            <UserIcon className="PurchaseList__ShareIcon" alt={textPrivate} title={textPrivate} />
          ))}
      </div>
      {showOwner && (
        <div className="PurchaseList__PurchaseListOwner">{t(textPurchaseListOwnerDescription, purchaseList.owner)}</div>
      )}
    </Link>
  );
};

/**
 * A widget whose responsibility is to show a list of purchase lists. This includes the pagination
 * logic as well.
 */
const ListPurchaseLists = props => {
  const {action, subscribeDispatch} = useContext(StoreContext);

  const {
    setFetchingData,
    resetPage,
    purchaseListIds,
    setPurchaseListIds,
    createPayload,
    numberOfPurchaseListsToLoad = 12
  } = props;

  /**
   * @author guilherme.vieira
   * @description when you create a new list we need to fetch data again,
   * and sometimes lists were duplicated
   * @param {Array} oldIds 
   * @param {Array} newIds 
   * @returns {Array} containg all purchase lists ids
   */
  const preventDuplicatedIds = (oldIds, newIds) => {
    const additionalIds = []

    newIds.forEach(newId => {
      if(!oldIds.includes(newId)) {
        additionalIds.push(newId)
      }
    })

    return [...oldIds, ...additionalIds]
  }

  /**
   * Used to load the purchase lists upon clicking
   * Load More button.
   * @param {*} newIds The new listing ids for the page.
   */
  const handleSetListItems = useCallback(
    newIds => {
      setFetchingData(false);
      resetPage.current = false;
      setPurchaseListIds(oldIds => preventDuplicatedIds(oldIds, newIds));
    },
    [resetPage, setFetchingData, setPurchaseListIds]
  );

  const handleFetchData = useCallback(
    async payloadOffset => {
      createPayload.offset = payloadOffset;
      createPayload.limit = numberOfPurchaseListsToLoad;

      setFetchingData(true);
      try {
        const response = await action('listPurchaseLists', createPayload);
        setFetchingData(false);
        if (response.ok && response.json && response.json.items) {
          const recentListingItems = [];
          for (const item of response.json.items) {
            recentListingItems.push(item['id']);
          }
          handleSetListItems(recentListingItems);

          return {totalNumberOfItems: response.json.totalResults, currentItemsCount: recentListingItems.length};
        }
      } catch (error) {
        setFetchingData(false);
        console.error(error);
      }
    },
    [action, createPayload, handleSetListItems, numberOfPurchaseListsToLoad, setFetchingData]
  );

  useEffect(() => {
    subscribeDispatch((action) => {
      const {type} = action;
      if(type === "createPurchaseListComplete")
        handleFetchData()
    })
  }, [])

  return (
    <div>
      <div className="PurchaseLists__PurchaseListItems">
        <IterateListItems child={PurchaseList} listOFItems={purchaseListIds} {...props}></IterateListItems>
      </div>
      <LoadMore
        className="PurchaseLists__LoadMore"
        numberOfItemsToLoad={numberOfPurchaseListsToLoad}
        loadMoreLabel={props.labelLoadMore}
        handleLoadMore={handleFetchData}
        loadMoreLoadingLabel={props.textRetrievingPurchaseLists}
        resetPage={resetPage.current}
      />
    </div>
  );
};

ListPurchaseLists.propTypes = {
  /** Callback function to be invoked to reset the value of fetch data */
  setFetchingData: PropTypes.func.isRequired,
  /** Flag to indicate if the page needs to be reloaded */
  resetPage: PropTypes.oneOfType([
    PropTypes.shape({
      /** The current value of ref*/
      current: PropTypes.bool.isRequired
    }).isRequired
  ]).isRequired,
  /** The array of Purchase list Ids to be displayed in the UI */
  purchaseListIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Callback function to set the Purchase list Ids to be displayed in the UI */
  setPurchaseListIds: PropTypes.func.isRequired,
  /** Callback function to create a payload to invoke listPurchaseLists API call */
  createPayload: PropTypes.shape({
    /** The search selected in the UI */
    q: PropTypes.string.isRequired,
    /** The sort options selected in the UI */
    sort: PropTypes.string.isRequired
  }).isRequired,
  /** Number of Purchase lists to load on clicking Load More */
  numberOfPurchaseListsToLoad: PropTypes.number
};

ListPurchaseLists.defaultProps = {
  numberOfPurchaseListsToLoad: 5
};

export default ListPurchaseLists;
