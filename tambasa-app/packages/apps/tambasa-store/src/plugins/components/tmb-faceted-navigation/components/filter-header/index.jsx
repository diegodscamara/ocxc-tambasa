import React, {useContext} from 'react';
import {ProductListingContext} from '@oracle-cx-commerce/react-widgets/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {t} from '@oracle-cx-commerce/utils/generic';

// A header for the Filter menu
const FilterHeader = ({toggleMenu, textItemCount, headingFilterResults, textDone}) => {
  const {searchResults: {results: {totalNumRecs = 0} = {}} = {}} = useContext(ProductListingContext);

  return (
    <Styled id="FilterHeader" css={css}>
      <div className="FilterHeader">
        <div className="FilterHeader_LeftSide">
          <h1 className="FilterHeader__Title">{t(headingFilterResults)}</h1>
          <span className="FilterHeader__Subtitle">{t(textItemCount, {TOTALNUMRECS: totalNumRecs.toString()})}</span>
        </div>
        <div className="FilterHeader_RightSide">
          <button type="button" className="FilterHeader__DoneLink" onClick={toggleMenu}>
            {t(textDone)}
          </button>
        </div>
      </div>
    </Styled>
  );
};

export default FilterHeader;
