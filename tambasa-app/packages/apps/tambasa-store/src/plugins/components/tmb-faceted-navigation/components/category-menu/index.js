import React, {useContext, useState} from 'react';

import CaretDownIcon from '@oracle-cx-commerce/react-components/icons/caret-down';
import CaretRightIcon from '@oracle-cx-commerce/react-components/icons/caret-right';
import {AiFillCloseCircle} from  'react-icons/ai'
import DeleteIcon from '@oracle-cx-commerce/react-components/icons/delete';
import Minus from '@oracle-cx-commerce/react-components/icons/minus';
import {ProductListingContext} from '@oracle-cx-commerce/react-widgets/contexts';
import Plus from '@oracle-cx-commerce/react-components/icons/plus';
import Link from '@oracle-cx-commerce/react-components/link';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {t} from '@oracle-cx-commerce/utils/generic';

// A component to display the category menu.
const CategoryMenu = ({categoryCrumb, categoryRefinement, route, onSelect, actionShowMore, deleteFilterAltText}) => {
  // A flag to determine whether category options are shown
  const [showOptions, setShowOptions] = useState(true);

  const {mobile} = useContext(ProductListingContext);

  // Show and hide category options when menu header is tapped
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // Get the title and navigation link
  const categoryTitle =
    (categoryCrumb && categoryCrumb.displayName) || (categoryRefinement && categoryRefinement.displayName);

  // Get the path of ancestor categories to display
  const categoryAncestors = categoryCrumb
    ? categoryCrumb.ancestors.filter(item => item.properties['dimval.prop.category.repositoryId'] !== 'rootCategory')
    : [];

  // Determines which icon to display to show or hide the menu
  const getExpandIcon = () => {
    if (mobile) {
      return <div className="CategoryMenu__CaretIcon">{showOptions ? <CaretDownIcon /> : <CaretRightIcon />}</div>;
    }

    return showOptions ? <Minus className="CategoryMenu__ExpandIcon" /> : <Plus className="CategoryMenu__ExpandIcon" />;
  };

  return (
    <Styled id="CategoryMenu" css={css}>
      {categoryTitle && (
        <>
          <div
            className="CategoryMenu__RefinementHeader"
            onClick={toggleOptions}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                toggleOptions();
              }
            }}
            role="button"
            tabIndex="0"
          >
            <span
              className={`CategoryMenu__CategoryRefinementHeaderTitle
               ${mobile ? 'CategoryMenu__CategoryRefinementHeaderTitle--Mobile' : ''}`}
            >
              {categoryTitle}
            </span>
            {mobile && categoryCrumb && <span className="CategoryMenu__SelectedCategory">{categoryCrumb.label}</span>}
            {getExpandIcon()}
          </div>
          {showOptions && (
            <div>
              {categoryCrumb && (
                <div>
                  {categoryAncestors.map((ancestor, i) => (
                    <div
                      key={ancestor.label}
                      className="CategoryMenu__CategoryRefinementContainer"
                      style={{paddingLeft: `${i + 1}rem`}}
                    >
                      <Link
                        className="CategoryMenu__CategoryRefinement"
                        title={ancestor.label}
                        href={`${route}${ancestor.link}`}
                        onClick={onSelect}
                      >
                        {ancestor.label}
                      </Link>
                    </div>
                  ))}
                  <div
                    className="CategoryMenu__CategoryRefinementContainer"
                    style={{paddingLeft: `${categoryAncestors.length + 1}rem`}}
                  >
                    <Link
                      className="CategoryMenu__SelectedCategoryRefinement"
                      href={`${route}${categoryCrumb.removeAction.link}`}
                      onClick={onSelect}
                    >
                      <span
                        title={`${categoryCrumb.label} (${categoryCrumb.count})`}
                        aria-label={`${categoryCrumb.label} (${categoryCrumb.count}), ${t(deleteFilterAltText)}`}
                      >
                        {categoryCrumb.label} ({categoryCrumb.count})
                      </span>
                      <span className="CategoryMenu__DeleteCategoryIcon">
                        <AiFillCloseCircle />
                      </span>
                    </Link>
                  </div>
                </div>
              )}
              {categoryRefinement && (
                <div style={{paddingLeft: `${categoryCrumb ? 1 : 0}rem`}}>
                  {categoryRefinement.refinements.map(refinement => (
                    <div
                      key={refinement.label}
                      className="CategoryMenu__CategoryRefinementContainer"
                      style={{paddingLeft: `${categoryAncestors.length + 1}rem`}}
                    >
                      <Link
                        className="CategoryMenu__CategoryRefinement"
                        title={`${refinement.label} (${refinement.count})`}
                        href={`${route}${refinement.link}`}
                        onClick={onSelect}
                      >
                        {refinement.label} ({refinement.count})
                      </Link>
                    </div>
                  ))}
                  {categoryRefinement.moreLink && (
                    <div
                      className="CategoryMenu__CategoryRefinementContainer"
                      style={{paddingLeft: `${categoryAncestors.length + 1}rem`}}
                    >
                      <Link className="CategoryMenu__ShowMoreLink" href={`${route}${categoryRefinement.moreLink.link}`}>
                        {t(actionShowMore)}
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </Styled>
  );
};

export default CategoryMenu;
