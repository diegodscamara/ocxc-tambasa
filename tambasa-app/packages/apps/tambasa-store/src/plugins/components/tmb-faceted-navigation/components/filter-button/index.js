import React from 'react';
import SlidersIcon from '@oracle-cx-commerce/react-components/icons/sliders';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {t} from '@oracle-cx-commerce/utils/generic';

// A button to bring up the Filter menu
const FilterButton = ({toggleMenu, textFilter, filterCount}) => (
  <Styled id="FilterButton" css={css}>
    <button
      className="FilterButton"
      onClick={toggleMenu}
      onKeyDown={event => {
        if (event.key === 'Enter') {
          toggleMenu();
        }
      }}
      type="button"
      tabIndex="0"
    >
      <span className="FilterButton__Icon" htmlFor="FacetedNavigationMobile__Toggle">
        <SlidersIcon />
      </span>
      {t(textFilter)}
      {filterCount > 0 && ` (${filterCount})`}
    </button>
  </Styled>
);

export default FilterButton;
