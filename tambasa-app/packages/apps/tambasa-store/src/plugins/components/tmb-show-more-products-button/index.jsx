import React, {useContext, useState} from 'react';

import PropTypes from 'prop-types';
import {ProductListingContext} from '@oracle-cx-commerce/react-widgets/contexts';
import {PaginationContext, StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import StandardPagination from '@oracle-cx-commerce/react-components/pagination/standard';
import BasicPagination from '@oracle-cx-commerce/react-components/pagination/basic';
import TextPagination from '@oracle-cx-commerce/react-components/pagination/text';
import DropdownPagination from '@oracle-cx-commerce/react-components/pagination/dropdown';
import PageIndicator from '@oracle-cx-commerce/react-components/pagination/page-indicator';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {t} from '@oracle-cx-commerce/utils/generic';

/**
* A button to show the next set of results
* @param props
*/
const TmbShowMoreProductsButton = props => {
  const {
    actionShowMoreProducts,
    textRetrievingProducts,
    paginationMode = 'button',
    pagesToShowBesideCurrentPage = 1,
    labelPageOfPages,
    labelPageOfPagesDropdown,
    labelPaginationDropDown,
    labelPreviousPage,
    labelNextPage,
    labelFirstPage,
    labelLastPage
  } = props;

  const {currentOffset, limit, totalRecords, pageId, pageParam, onPageChange} = useContext(PaginationContext);
  const {action} = useContext(StoreContext);

  // Product Listing results data
  const {
    searchResults: {results: {lastRecNum, recsPerPage, totalNumRecs} = {}},
    searchServicePath,
    mobile
  } = useContext(ProductListingContext);

  // A flag to keep track of whether products are currently being loaded
  const [loadingProducts, setLoadingProducts] = useState(false);

  let pagination = null;

  if (paginationMode === 'standard') {
    pagination = (
      <StandardPagination
        currentOffset={currentOffset}
        limit={limit}
        totalRecords={totalRecords}
        pagesToShowBesideCurrentPage={pagesToShowBesideCurrentPage}
        pageId={pageId}
        pageParam={pageParam}
        onPageChange={onPageChange}
      />
    );
  } else if (paginationMode === 'basic') {
    pagination = (
      <BasicPagination
        currentOffset={currentOffset}
        limit={limit}
        totalRecords={totalRecords}
        pagesToShowBesideCurrentPage={pagesToShowBesideCurrentPage}
        pageId={pageId}
        pageParam={pageParam}
        onPageChange={onPageChange}
        labelPreviousPage={labelPreviousPage}
        labelNextPage={labelNextPage}
        labelFirstPage={labelFirstPage}
        labelLastPage={labelLastPage}
      />
    );
  } else if (paginationMode === 'text') {
    pagination = (
      <TextPagination
        currentOffset={currentOffset}
        limit={limit}
        totalRecords={totalRecords}
        pageId={pageId}
        pageParam={pageParam}
        onPageChange={onPageChange}
        labelPreviousPage={labelPreviousPage}
        labelNextPage={labelNextPage}
        labelPageOfPages={labelPageOfPages}
      />
    );
  } else if (paginationMode === 'dropdown') {
    pagination = (
      <DropdownPagination
        currentOffset={currentOffset}
        limit={limit}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        labelPageOfPagesDropdown={labelPageOfPagesDropdown}
        labelPaginationDropDown={labelPaginationDropDown}
      />
    );
  }

  // Load the next batch of products
  const loadNextProducts = () => {
    setLoadingProducts(true);
    action('search', {
      getNextPage: true,
      searchServicePath
    }).then(() => {
      setLoadingProducts(false);
    });
  };

  // Only show More Products button if there are more products to load.
  if (paginationMode === 'button' && lastRecNum < totalNumRecs) {
    pagination = (
      <div>
        <button
          type="button"
          className={`TmbShowMoreProductsButton__Button ${
            mobile ? 'TmbShowMoreProductsButton__Button--Mobile' : 'TmbShowMoreProductsButton__Button--Desktop'
          }`}
          disabled={loadingProducts}
          onClick={loadNextProducts}
        >
          {loadingProducts
            ? t(textRetrievingProducts)
            : t(actionShowMoreProducts, {RECSPERPAGE: recsPerPage.toString()})}
        </button>
      </div>
    );
  }

  // Return pagination. Include hidden link for SEO.
  if (pagination && totalNumRecs > 0) {
    return (
      <Styled id="TmbShowMoreProductsButton" css={css}>
        <div className="TmbShowMoreProductsButton">
          {pagination}
          {(paginationMode === 'dropdown') && (
            <>
              {lastRecNum < totalNumRecs && (
                <PageIndicator
                  pageNumber={Math.ceil((lastRecNum + 1) / recsPerPage)}
                  limit={recsPerPage}
                  pageId={pageId}
                  pageParam={pageParam}
                  label={t(labelNextPage)}
                  className={'TmbShowMoreProductsButton__HiddenLink'}
                />
              )}
            </>
          )}
        </div>
      </Styled>
    );
  } else {
    return <div style={{display: 'none'}} />;
  }
};

TmbShowMoreProductsButton.propTypes = {
  /**
  * The resource string to display on the button for loading more product results
  */
  actionShowMoreProducts: PropTypes.string.isRequired,
  /**
  * The resource string to indicate more products are being loaded
  */
  textRetrievingProducts: PropTypes.string.isRequired
};

export default TmbShowMoreProductsButton;
