import {noop, t} from '@oracle-cx-commerce/utils/generic';
import CaretDownIcon from '@oracle-cx-commerce/react-components/icons/caret-down';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';

// A select list for displaying refinement options.
const RefinementList = ({refinementMenuData, textSelectAValue, route, formatPriceRange = noop, onSelect = noop}) => {
  const goToPage = useNavigator();

  // Apply the selected refinement
  const onChange = event => {
    const {value} = event.target;
    goToPage(value);

    // Close the window if multiSelectMode is false
    onSelect();
  };

  return (
    <Styled id="RefinementList" css={css}>
      <div className="RefinementList__SelectListContent">
        <select className="RefinementList__SelectList" onChange={onChange} value={t(textSelectAValue)}>
          <option disabled>{t(textSelectAValue)}</option>
          {refinementMenuData.refinements.map(refinement => (
            <option key={refinement.label} value={`${route}${refinement.link}`}>
              {refinementMenuData.dimensionName === 'product.priceRange'
                ? formatPriceRange(refinement)
                : refinement.label}
            </option>
          ))}
        </select>
        <div className="RefinementList__SelectListCaretIcon">
          <CaretDownIcon style={'dropdown'} />
        </div>
      </div>
    </Styled>
  );
};

export default RefinementList;
