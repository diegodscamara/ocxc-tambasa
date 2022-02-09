import PropTypes from 'prop-types';
import { ProductListingContext } from '@oracle-cx-commerce/react-widgets/contexts';
import React, { useContext } from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import { t } from '@oracle-cx-commerce/utils/generic';

/**
 * Displays a label describing the currently loaded product range and total result range
 * @param props
 */
const TmbProductListingSummaryInformation = props => {
  const { textProductListingSummary } = props;

  const {
    searchResults: { results: { firstRecNum = 0, lastRecNum = 0, totalNumRecs = 0 } = {} }
  } = useContext(ProductListingContext);

  if (totalNumRecs > 0) {
    return (
      <Styled id="TmbProductListingSummaryInformation" css={css}>
        <p className="TmbProductListingSummaryInformation__AllResults">
          {t(textProductListingSummary, { firstRecNum, lastRecNum, totalNumRecs })}
        </p>
      </Styled>
    );
  }

  return <div />;
};

TmbProductListingSummaryInformation.propTypes = {
  /**
   * The resource string for the product listing summary
   */
  textProductListingSummary: PropTypes.string.isRequired
};

export default TmbProductListingSummaryInformation;