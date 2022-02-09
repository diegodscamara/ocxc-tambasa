import Link from '@oracle-cx-commerce/react-components/link';
import PropTypes from 'prop-types';
import {ProductListingContext} from '@oracle-cx-commerce/react-widgets/contexts';
import React, {useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getPageData} from './selectors';
import {t} from '@oracle-cx-commerce/utils/generic';

/**
* Description of search results, shows adjusted, suggested or no search results if applicable
* @param props
*/
const TmbSearchTermsSummary = props => {
  const {route, textDidYouMean, textNoMatchingItems, textSearchAdjusted, textSearchOriginal} = props;

  const {
    searchResults: {results: {totalNumRecs = 0} = {}, searchAdjustments = {}}
  } = useContext(ProductListingContext);

  const originalSearch = searchAdjustments.originalTerms && searchAdjustments.originalTerms[0];

  // Possible search results info:
  //  original w/ suggestions, original w/o suggestions,
  //  adjusted w/ suggestions, adjusted w/o suggestions,
  //  no results w/ suggestions, no results w/o suggestions
  if (originalSearch) {
    let searchInfo;
    let suggestion;

    if ('suggestedSearches' in searchAdjustments) {
      const suggestionLabels = Object.values(searchAdjustments.suggestedSearches)[0].map(i => i.label);

      const suggestionList = suggestionLabels.map((label, index) => (
        <span key={label}>
          <Link className="TmbSearchTermsSummary__SuggestedSearch" href={`${route}?Ntt=${label}`}>
            <q>{label}</q>
          </Link>
          {index !== suggestionLabels.length - 1 && <span key={label}>{', '}</span>}
        </span>
      ));

      suggestion = (
        <>
          {`${t(textDidYouMean)} `}
          {suggestionList}
        </>
      );
    }

    /* eslint-disable react/no-danger */
    if ('adjustedSearches' in searchAdjustments) {
      // Search was adjusted
      const adjustedSearch = Object.values(searchAdjustments.adjustedSearches)[0][0].adjustedTerms;
      searchInfo = (
        <div className="TmbSearchTermsSummary__SearchAdjusted">
          <div
            dangerouslySetInnerHTML={{
              __html: t(textSearchAdjusted, {
                ORIGINALSEARCH: originalSearch,
                TOTALNUMRECS: totalNumRecs.toString(),
                ADJUSTEDSEARCH: adjustedSearch
              })
            }}
          />
          {suggestion}
        </div>
      );
    } else if (totalNumRecs > 0) {
      // Original search returned results
      searchInfo = (
        <div className="TmbSearchTermsSummary__OriginalSearch">
          <div dangerouslySetInnerHTML={{__html: t(textSearchOriginal, {ORIGINALSEARCH: originalSearch})}} />
          {suggestion}
        </div>
      );
    } else {
      // No matching results
      searchInfo = (
        <div className="TmbSearchTermsSummary__NoResults">
          <div dangerouslySetInnerHTML={{__html: t(textNoMatchingItems, {ORIGINALSEARCH: originalSearch})}} />
          {suggestion}
        </div>
      );
    }

    return (
      <Styled id="TmbSearchTermsSummary" css={css}>
        <div className="TmbSearchTermsSummary__Container">{searchInfo}</div>
      </Styled>
    );
  }

  return <Styled id="TmbSearchTermsSummary" css={css} />;
};

TmbSearchTermsSummary.propTypes = {
  /**
  * The page route
  */
  route: PropTypes.string.isRequired,
  /**
  * The resource string for alternate search term suggestions
  */
  textDidYouMean: PropTypes.string.isRequired,
  /**
  * The resource string indicating no product results were found
  */
  textNoMatchingItems: PropTypes.string.isRequired,
  /**
  * The resource string indicating the search term was adjusted
  */
  textSearchAdjusted: PropTypes.string.isRequired,
  /**
  * The resource string indicating results were found for the original search term
  */
  textSearchOriginal: PropTypes.string.isRequired
};

/**
* Use a "connect" component to arrange for the component
* to be rendered when its state changes.
*/
export default connect(getPageData)(TmbSearchTermsSummary);
