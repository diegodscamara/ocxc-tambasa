import React, {useContext, useState} from 'react';
import CaretDownIcon from '@oracle-cx-commerce/react-components/icons/caret-down';
import CaretRightIcon from '@oracle-cx-commerce/react-components/icons/caret-right';
import Minus from '@oracle-cx-commerce/react-components/icons/minus';
import Plus from '@oracle-cx-commerce/react-components/icons/plus';
import {ProductListingContext} from '@oracle-cx-commerce/react-widgets/contexts';
import Link from '@oracle-cx-commerce/react-components/link';
import RefinementList from '../refinement-list';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {t} from '@oracle-cx-commerce/utils/generic';

// A menu for a single refinement.
const RefinementMenu = props => {
  const {refinementMenuData, route, actionShowMore, formatPriceRange, onSelect, index} = props;
  const {mobile} = useContext(ProductListingContext);

  // A flag to determine whether refinement options are shown
  // Expand first three menus by default on desktop
  const [showOptions, setShowOptions] = useState(index < 3 && !mobile);

  // Show and hide refinement options when refinement name is tapped
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // Determines which icon to display to show or hide the menu
  const getExpandIcon = () => {
    if (mobile) {
      return <div className="RefinementMenu__CaretIcon">{showOptions ? <CaretDownIcon /> : <CaretRightIcon />}</div>;
    }

    return showOptions ? (
      <Minus className="RefinementMenu__ExpandIcon" />
    ) : (
      <Plus className="RefinementMenu__ExpandIcon" />
    );
  };

  return (
    <Styled id="RefinementMenu" css={css}>
      <>
        <div
          className="RefinementMenu__RefinementHeader"
          onClick={toggleOptions}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              toggleOptions();
            }
          }}
          role="button"
          tabIndex="0"
        >
          <span className="RefinementMenu__RefinementHeaderTitle" role="button">
            {refinementMenuData.displayName}
          </span>
          {getExpandIcon()}
        </div>
        {showOptions && (
          <div className="RefinementMenu__Refinements">
            {mobile && refinementMenuData.refinements.length > 10 && !refinementMenuData.multiSelect ? (
              <RefinementList
                refinementMenuData={refinementMenuData}
                route={route}
                formatPriceRange={formatPriceRange}
                onSelect={onSelect}
                {...props}
              />
            ) : (
              refinementMenuData.refinements.map(refinement => (
                <Link
                  key={`${refinement.label}-${refinement.status}`}
                  className={
                    refinement.status === 'selected'
                      ? 'RefinementMenu__SelectedRefinement'
                      : 'RefinementMenu__Refinement'
                  }
                  href={`${route}${refinement.link}`}
                  onClick={onSelect}
                >
                  {refinementMenuData.dimensionName === 'product.priceRange'
                    ? formatPriceRange(refinement)
                    : refinement.label}
                </Link>
              ))
            )}
            {refinementMenuData.moreLink && (
              <Link className="RefinementMenu__ShowMoreLink" href={`${route}${refinementMenuData.moreLink.link}`}>
                {t(actionShowMore)}
              </Link>
            )}
          </div>
        )}
      </>
    </Styled>
  );
};

export default RefinementMenu;
