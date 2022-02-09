/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React, {useState, useMemo, useRef} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';

import css from './styles.css';
import {getSortOptions} from '@oracle-cx-commerce/react-widgets/profile/profile-purchase-lists/utils';
import {
  PurchaseListSearch,
  PurchaseListSort,
  PurchaseListSummary
} from '@oracle-cx-commerce/react-widgets/profile/profile-purchase-lists/components/purchase-lists-header-components';
import ListPurchaseLists from '../list-purchase-lists';

/**
 * A component for listing profile related Purchase Lists.
 * New lists are loaded on click of Load More
 */
const MyPurchaseLists = props => {
  // Translations
  const {labelMyPurchaseListsFilter} = props;

  // Sort and search
  const sortOptions = getSortOptions(props);
  const [selectedSort, setSelectedSort] = useState(`${sortOptions[0].sortTerm}:${sortOptions[0].order}`);
  const [searchKey, setSearchKey] = useState();

  // Pagination
  const [purchaseListIds, setPurchaseListIds] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  const resetPage = useRef(false);

  /**
   * Used to create payload to fetch purchase list data
   */
  const createPayload = useMemo(() => {
    let q = '';
    if (searchKey) {
      q = `name co "${searchKey}"`;
    }
    const payload = {
      sort: selectedSort,
      q
    };

    return payload;
  }, [searchKey, selectedSort]);

  return (
    <Styled id="TmbMyPurchaseLists" css={css}>
      <div className="TmbMyPurchaseLists">
        <div className="TmbMyPurchaseLists__FilterOptions">
          <div className="TmbMyPurchaseLists__RightOptions">
            <PurchaseListSearch
              className="TmbMyPurchaseLists__Search"
              dataTestId="my-purchase-list-search"
              placeholderLabel={labelMyPurchaseListsFilter}
              setSearchKey={setSearchKey}
              setPurchaseListIds={setPurchaseListIds}
              nameValue="my-purchase-list-search"
              resetPage={resetPage}
              {...props}
            />
          </div>
          <PurchaseListSort
            dataTestId="my-purchase-list-sort"
            sortOptions={sortOptions}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            setPurchaseListIds={setPurchaseListIds}
            resetPage={resetPage}
            {...props}
          />
        </div>

        <PurchaseListSummary
          fetchingData={fetchingData}
          searchKey={searchKey}
          purchaseListIds={purchaseListIds}
          {...props}
        />

        <ListPurchaseLists
          setFetchingData={setFetchingData}
          resetPage={resetPage}
          purchaseListIds={purchaseListIds}
          setPurchaseListIds={setPurchaseListIds}
          createPayload={createPayload}
          showShareIcon={true}
          {...props}
        />
      </div>
    </Styled>
  );
};

MyPurchaseLists.propTypes = {};

MyPurchaseLists.defaultProps = {};

export default MyPurchaseLists;
