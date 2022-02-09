import CaretDownIcon from '@oracle-cx-commerce/react-components/icons/caret-down';
import PropTypes from 'prop-types';
import { ProductListingContext } from '@oracle-cx-commerce/react-widgets/contexts';
import React, { useCallback, useContext } from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import { getPageData } from './selectors';
import { useNavigator } from '@oracle-cx-commerce/react-components/link';
import { t } from '@oracle-cx-commerce/utils/generic';
import { PAGINATION_PARAM_PAGE } from '@oracle-cx-commerce/commerce-utils/constants/page-links';

/* eslint-disable jsx-a11y/no-onchange */
const getNsFromUrl = url => {
  const ns = new URL(url, 'http://x').searchParams.get('Ns');

  // Because prop "defaultValue" in React shouldn't be null
  return ns || 'bestMatch';
};

/**
 * A button to sort results
 * @param props
 */
const TmbSortResults = props => {
  const {
    filterByLabel,
    sortOptions,
    isUserLoggedIn,
    textBestMatch,
    textPriceHighToLow,
    textPriceLowToHigh,
    textSortAZ,
    textSortZA,
    textSortBy,
    textBrandAZ,
    textBrandZA,
    textNewest,
    baseURI
  } = props;

  const {
    searchResults: { results: { pagingActionTemplate: link = '', totalNumRecs = 0 } = {} },
    mobile
  } = useContext(ProductListingContext);

  const goToPage = useNavigator();

  const sortOptionsList = sortOptions ? sortOptions.split(',') : [];
  const defaultNs = getNsFromUrl(link.link);

  const onChange = useCallback(
    event => {
      const { value } = event.target;

      const searchParams = new URLSearchParams(location.search);

      // Reset pagination
      searchParams.delete(PAGINATION_PARAM_PAGE);

      if (!value || value === '' || value === 'bestMatch') {
        searchParams.delete('Ns');
      } else {
        searchParams.set('Ns', value);
      }
      const newParams = searchParams.toString();
      const urlWithParams = new URL(location.href);
      urlWithParams.search = newParams;
      const url = urlWithParams.toString() || '';

      // Strip out base URL to prevent full page refresh
      const baseURL = `${location.origin}${baseURI}`;
      let newURL = url.split(baseURL)[1] || '';

      if (newURL.startsWith('/')) {
        newURL = newURL.substring(1);
      }
      goToPage(newURL);
    },
    [goToPage, baseURI]
  );

  // Return the appropriate resource string for given sort by option
  const getSortOptionResourceString = value => {
    switch (value) {
      case 'bestMatch':
        return textBestMatch;
      case 'sku.activePrice|1':
        return textPriceHighToLow;
      case 'sku.activePrice|0':
        return textPriceLowToHigh;
      case 'product.displayName|0':
        return textSortAZ;
      case 'product.displayName|1':
        return textSortZA;
      case 'product.brand|0':
        return textBrandAZ;
      case 'product.brand|1':
        return textBrandZA;
      case 'product.dateAvailable':
        return textNewest;
      default:
        return null;
    }
  };

  if (totalNumRecs > 0) {
    return (
      <Styled id="TmbSortResults" css={css}>
        { isUserLoggedIn && 
        <div className="TmbSortResults__Container">
          <div
            className={`SortResults__Content ${mobile ? 'SortResults__Content--Mobile' : 'SortResults__Content--Desktop'
              }`}
          >
            <span className="SortResults__Content__OrderByText">{t(filterByLabel)}</span>
            <div className="SortResults__Button">
              <select className="SortResults__Label" value={defaultNs} onChange={onChange} aria-label={t(textSortBy)}>
                <option disabled>{t(textSortBy)}</option>
                {Object.keys(sortOptionsList).map(i => (
                  <option key={`sortby${i}`} value={sortOptionsList[i]}>
                    {t(getSortOptionResourceString(sortOptionsList[i]))}
                  </option>
                ))}
              </select>
              <div className="SortResults__CaretIcon">
                <CaretDownIcon style={'dropdown'} />
              </div>
            </div>
          </div>
        </div>
        }
      </Styled>
    );
  }

  return <div />;
};

TmbSortResults.propTypes = {
  /**
   * The list of options for the order in which to sort product results
   */
  sortOptions: PropTypes.string.isRequired,
  /**
   * The resource string to indicate products will be sorted by best match
   */
  textBestMatch: PropTypes.string.isRequired,
  /**
   * The resource string to indicate products will be sorted by price in descending order
   */
  textPriceHighToLow: PropTypes.string.isRequired,
  /**
   * Indicates if the user is logged in.
   */
  isUserLoggedIn: PropTypes.bool.isRequired,
  /**
   * The resource string to indicate products will be sorted by price in ascending order
   */
  textPriceLowToHigh: PropTypes.string.isRequired,
  /**
   * The resource string to indicate products will be sorted alphabetically by product name
   */
  textSortAZ: PropTypes.string.isRequired,
  /**
   * The resource string to indicate products will be sorted in reverse alphabetical order by product name
   */
  textSortZA: PropTypes.string.isRequired,
  /**
   * The resource string for indicating the field to select which option to sort products by
   */
  textSortBy: PropTypes.string.isRequired,
  /**
   * The resource string to indicate products will be sorted alphabetically by brand
   */
  textBrandAZ: PropTypes.string.isRequired,
  /**
   * The resource string to indicate products will be sorted in reverse alphabetical order by brand
   */
  textBrandZA: PropTypes.string.isRequired,
  /**
   * The resource string to indicate products will be sorted by release date
   */
  textNewest: PropTypes.string.isRequired
};

export default connect(getPageData)(TmbSortResults);
