import React, {useCallback, useContext, useRef} from 'react';
import PropTypes from 'prop-types';

import Link from '@oracle-cx-commerce/react-components/link';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {useNumberFormatter} from '@oracle-cx-commerce/react-components/utils/hooks';
import {connect} from '@oracle-cx-commerce/react-components/provider';

import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';

import Breadcrumbs from '../../components/breadcrumbs';
import FilterButton from '../../components/filter-button';
import FilterHeader from '../../components/filter-header';
import Navigation from '../../components/navigation';
import {getPageData} from '../../utils/selectors';
import {ProductListingContext} from '@oracle-cx-commerce/react-widgets/contexts';
import {
  formatPriceRangeUtil,
  getResetLink
} from '../../utils';
import css from './styles.css';

import {PAGE_SEARCH_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import {t} from '@oracle-cx-commerce/utils/generic';

// Note: name of the search page will need to come from page layout
const route = PAGE_SEARCH_LINK;

const OPTIONS = {style: 'currency'};

/**
 * A component to display the filter menu
 *
 * @param props
 */
const TmbFacetedNavigationMobile = props => {
  const {
    filterMenuVisible,
    categories,
    multiSelectMode = true,
    textBelowPrice,
    textDone,
    textPriceAndAbove,
    actionReset
  } = props;

  const {
    searchResults: {
      results: {totalNumRecs = 0, pagingActionTemplate = {}} = {},
      searchAdjustments: {originalTerms = []} = {},
      breadcrumbs: {refinementCrumbs = []} = {},
      facets: {navigation = []} = {}
    }
  } = useContext(ProductListingContext);

  const {action} = useContext(StoreContext);

  const originalSearch = originalTerms && originalTerms[0];

  // Filter out category to be rendered separately
  const filteredRefinementCrumbs = refinementCrumbs.filter(item => item.dimensionName !== 'product.category') || [];

  const categoryCrumb = refinementCrumbs.find(item => item.dimensionName === 'product.category');

  const filterCount = refinementCrumbs.length;

  // Format the price in appropriate currency
  const formatPrice = useNumberFormatter(OPTIONS);

  // Returns a formatted string representing a price range
  const formatPriceRange = useCallback(
    data => {
      return formatPriceRangeUtil(formatPrice, data, textBelowPrice, textPriceAndAbove);
    },
    [formatPrice, textBelowPrice, textPriceAndAbove]
  );

  const toggle = useRef();

  // When selecting or removing a filter, close the window if multiSelectMode is false
  const onSelect = useCallback(() => {
    if (!multiSelectMode) {
      toggle.current.checked = false;
    }
  }, [multiSelectMode]);

  // Shows or hides the Filter menu
  const toggleMenu = useCallback(() => {
    action('showFilterMenu', !toggle.current.checked);
  }, [action]);

  if (totalNumRecs > 0) {
    return (
      <Styled id="TmbFacetedNavigationMobile" css={css}>
        <div
          className="TmbFacetedNavigationMobile"
          style={{visibility: refinementCrumbs.length > 0 || navigation.length > 0 ? 'visible' : 'hidden'}}
        >
          <FilterButton toggleMenu={toggleMenu} filterCount={filterCount} {...props} />
          <input
            className="TmbFacetedNavigationMobile__Toggle"
            id="TmbFacetedNavigationMobile__Toggle"
            name="toggle"
            type="checkbox"
            ref={toggle}
            checked={filterMenuVisible}
          />
          <span
            className="TmbFacetedNavigationMobile__Backdrop"
            onClick={toggleMenu}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                toggleMenu();
              }
            }}
            role="button"
            tabIndex="0"
            aria-label={textDone}
          />
          <aside className="TmbFacetedNavigationMobile__Modal">
            <span>
              <FilterHeader toggleMenu={toggleMenu} {...props} />
              <span className="TmbFacetedNavigationMobile__Content">
                {filteredRefinementCrumbs.length > 0 && (
                  <Breadcrumbs
                    formatPriceRange={formatPriceRange}
                    route={route}
                    filteredRefinementCrumbs={filteredRefinementCrumbs}
                    {...props}
                  />
                )}

                <Navigation
                  categoryCrumb={categoryCrumb}
                  formatPriceRange={formatPriceRange}
                  route={route}
                  onSelect={onSelect}
                  {...props}
                />
              </span>
              {filteredRefinementCrumbs.length > 0 && (
                <Link
                  className="TmbFacetedNavigationMobile__ResetLink"
                  href={getResetLink(refinementCrumbs, categories, pagingActionTemplate, originalSearch, route)}
                  onClick={onSelect}
                >
                  {t(actionReset)}
                </Link>
              )}
            </span>
          </aside>
        </div>
      </Styled>
    );
  }

  return <Styled id="TmbFacetedNavigationMobile" css={css} />;
};

TmbFacetedNavigationMobile.propTypes = {
  /**
   * The total number of product recommendations matching the search or category criteria
   */
  totalNumRecs: PropTypes.number,
  /**
   * An object containing the paging action template link
   */
  pagingActionTemplate: PropTypes.shape({link: PropTypes.string}),
  /**
   * The list of originally searched terms
   */
  originalTerms: PropTypes.arrayOf(PropTypes.string),
  /**
   * The list of refinement breadcrumbs
   */
  refinementCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  /**
   * The navigation object containing facets for search refinement
   */
  navigation: PropTypes.arrayOf(PropTypes.shape({})),
  /**
   * The list of product categories in the catalog
   */
  categories: PropTypes.shape({}),
  /**
   * A flag to determine whether the menu will automatically close each time the user selects a facet
   */
  multiSelectMode: PropTypes.bool.isRequired,
  /**
   * The resource string shown for prices below a certain value
   */
  textBelowPrice: PropTypes.string.isRequired,
  /**
   * The resource string shown for prices above a certain value
   */
  textPriceAndAbove: PropTypes.string.isRequired,
  /**
   * The resource string for resetting all the applied filters
   */
  actionReset: PropTypes.string.isRequired
};

TmbFacetedNavigationMobile.defaultProps = {
  totalNumRecs: 0,
  pagingActionTemplate: {},
  originalTerms: [],
  refinementCrumbs: [],
  navigation: {},
  categories: {}
};

export default connect(getPageData)(TmbFacetedNavigationMobile);
