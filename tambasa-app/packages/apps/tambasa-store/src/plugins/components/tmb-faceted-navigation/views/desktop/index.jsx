import React, {useCallback, useContext} from 'react';
import {
  formatPriceRangeUtil,
  getResetLink
} from '../../utils';
import {noop, t} from '@oracle-cx-commerce/utils/generic';

import Link from '@oracle-cx-commerce/react-components/link';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import {useNumberFormatter} from '@oracle-cx-commerce/react-components/utils/hooks';

import {ProductListingContext} from '@oracle-cx-commerce/react-widgets/contexts';

import {PAGE_SEARCH_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import PropTypes from 'prop-types';

import Breadcrumbs from '../../components/breadcrumbs';
import Navigation from '../../components/navigation';
import css from './styles.css';
import {getPageData} from '../../utils/selectors';

// Note: name of the search page will need to come from page layout
const route = PAGE_SEARCH_LINK;

const OPTIONS = {style: 'currency'};

/**
 * A component to display the filter menu
 *
 * @param props
 */
const TmbFacetedNavigationDesktop = props => {
  const {categories, textBelowPrice, textPriceAndAbove, actionReset} = props;

  const {
    searchResults: {
      results: {totalNumRecs = 0, pagingActionTemplate = {}} = {},
      searchAdjustments: {originalTerms = []} = {},
      breadcrumbs: {refinementCrumbs = []} = {},
      facets: {navigation = []} = {}
    }
  } = useContext(ProductListingContext);

  const originalSearch = originalTerms && originalTerms[0];

  // Filter out category to be rendered separately
  const filteredRefinementCrumbs = refinementCrumbs.filter(item => item.dimensionName !== 'product.category') || [];

  const categoryCrumb = refinementCrumbs.find(item => item.dimensionName === 'product.category');

  // Format the price in appropriate currency
  const formatPrice = useNumberFormatter(OPTIONS);

  // Returns a formatted string representing a price range
  const formatPriceRange = useCallback(
    data => {
      return formatPriceRangeUtil(formatPrice, data, textBelowPrice, textPriceAndAbove);
    },
    [formatPrice, textBelowPrice, textPriceAndAbove]
  );

  const onSelect = useCallback(noop, []);

  if (totalNumRecs > 0) {
    return (
      <Styled id="TmbFacetedNavigationDesktop" css={css}>
        <div
          className="TmbFacetedNavigationDesktop"
          style={{visibility: refinementCrumbs.length > 0 || navigation.length > 0 ? 'visible' : 'hidden'}}
        >
          <span className="TmbFacetedNavigationDesktop__Content">
            {filteredRefinementCrumbs.length > 0 && (
              <>
                <Breadcrumbs
                  formatPriceRange={formatPriceRange}
                  route={route}
                  filteredRefinementCrumbs={filteredRefinementCrumbs}
                  {...props}
                />
                <Link
                  className="TmbFacetedNavigationDesktop__ResetLink"
                  href={getResetLink(refinementCrumbs, categories, pagingActionTemplate, originalSearch, route)}
                >
                  {t(actionReset)}
                </Link>
              </>
            )}

            <Navigation
              categoryCrumb={categoryCrumb}
              formatPriceRange={formatPriceRange}
              route={route}
              onSelect={onSelect}
              {...props}
            />
          </span>
        </div>
      </Styled>
    );
  }

  return <Styled id="TmbFacetedNavigationDesktop" css={css} />;
};

TmbFacetedNavigationDesktop.propTypes = {
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

TmbFacetedNavigationDesktop.defaultProps = {
  totalNumRecs: 0,
  pagingActionTemplate: {},
  originalTerms: [],
  refinementCrumbs: [],
  navigation: {},
  categories: {}
};

/**
 * Use a "connect" component to arrange for the component
 * to be rendered when its state changes.
 */
export default connect(getPageData)(TmbFacetedNavigationDesktop);
