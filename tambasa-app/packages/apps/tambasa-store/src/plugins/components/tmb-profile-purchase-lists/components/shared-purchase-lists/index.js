/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React, {useState, useMemo, useRef} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {useSelector} from '@oracle-cx-commerce/react-components/provider';
import {isCurrentUserB2B} from '@oracle-cx-commerce/commerce-utils/selector';

import css from '@oracle-cx-commerce/react-widgets/profile/profile-purchase-lists/components/shared-purchase-lists/styles.css';
import {getSortOptions} from '@oracle-cx-commerce/react-widgets/profile/profile-purchase-lists/utils';
import {
  PurchaseListSummary,
  PurchaseListSearch,
  PurchaseListSort,
  PurchaseListFilter,
  PURCHASE_LIST_SHARE_TYPES
} from '@oracle-cx-commerce/react-widgets/profile/profile-purchase-lists/components/purchase-lists-header-components';
import ListPurchaseLists from '@oracle-cx-commerce/react-widgets/profile/profile-purchase-lists/components/list-purchase-lists';

/**
 * A component for listing shared Purchase Lists.
 * New lists are loaded on click of Load More
 */
const SharedPurchaseLists = props => {
  // Translations
  const {labelSharedPurchaseListsFilter} = props;

  // Sort, filter, search
  const sortOptions = getSortOptions(props, true);
  const [selectedSort, setSelectedSort] = useState(`${sortOptions[0].sortTerm}:${sortOptions[0].order}`);
  const [selectedFilter, setSelectedFilter] = useState(PURCHASE_LIST_SHARE_TYPES.ALL);
  const [searchKey, setSearchKey] = useState();

  // Pagination
  const [purchaseListIds, setPurchaseListIds] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  const resetPage = useRef(false);

  const isCurrentProfileB2B = useSelector(isCurrentUserB2B);

  /**
   * Used to create payload to fetch purchase list data
   */
  const createPayload = useMemo(() => {
    let q = '';
    if (searchKey) {
      q = `name co "${searchKey}" OR owner.lastName co "${searchKey}" OR owner.firstName co "${searchKey}" OR owner.email co "${searchKey}"`;
    }
    const payload = {
      sort: selectedSort,
      q,
      listType: 'shared',
      shareType: selectedFilter
    };

    return payload;
  }, [searchKey, selectedSort, selectedFilter]);

  return (
    <Styled id="SharedPurchaseLists" css={css}>
      <div className="SharedPurchaseLists">
        <div className="SharedPurchaseLists__FilterOptions">
          <PurchaseListSearch
            className="SharedPurchaseLists__Search"
            size="50"
            dataTestId="shared-purchase-list-search"
            placeholderLabel={labelSharedPurchaseListsFilter}
            setSearchKey={setSearchKey}
            setPurchaseListIds={setPurchaseListIds}
            nameValue="shared-purchase-list-search"
            resetPage={resetPage}
            {...props}
          />
          <div className="SharedPurchaseLists__SortFilter">
            {isCurrentProfileB2B && (
              <PurchaseListFilter
                dataTestId="shared-purchase-list-filter"
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                setPurchaseListIds={setPurchaseListIds}
                resetPage={resetPage}
                {...props}
              />
            )}
            <PurchaseListSort
              sortOptions={sortOptions}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              setPurchaseListIds={setPurchaseListIds}
              resetPage={resetPage}
              {...props}
            />
          </div>
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
          showOwner={true}
          {...props}
        />
      </div>
    </Styled>
  );
};

SharedPurchaseLists.propTypes = {};

SharedPurchaseLists.defaultProps = {};

export default SharedPurchaseLists;
