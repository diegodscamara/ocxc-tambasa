import DropDownMenu from '../drop-down-menu';
import Link from '@oracle-cx-commerce/react-components/link';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

const NavBar = ({categories = [], categoryMediaProperty = '', showCategoriesCb, hideCategoriesCb}) => {
  return (
    <Styled id="CollectionNavigationDesktop__NavBar" css={css}>
      <div className="CollectionNavigationDesktop__NavBar" onMouseOver={showCategoriesCb}
        onMouseOut={hideCategoriesCb}
      >
        <div className="CollectionNavigationDesktop__NavBar__Wrapper">
          {categories.map(({route, displayName, id, childCategories, [categoryMediaProperty]: categoryMedia = null}) => (
            <div key={id} className="CollectionNavigationDesktop__NavItem">
              <div className="CollectionNavigationDesktop__NavLink">
                <Link href={route}>{displayName}</Link>
              </div>
              {childCategories && childCategories.length > 0 && (
                <DropDownMenu categoryMedia={categoryMedia} categories={childCategories} />
              )}
            </div>
          ))}
          <div className="CollectionNavigationDesktop__Backdrop" data-testid="modalBackdrop"></div>
        </div>
      </div>
    </Styled>
  );
};
export default React.memo(NavBar);
