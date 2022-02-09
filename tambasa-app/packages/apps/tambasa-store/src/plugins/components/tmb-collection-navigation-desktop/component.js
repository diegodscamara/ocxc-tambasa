import React, { useContext } from 'react';

import NavBar from './components/nav-bar';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {fetchMenuCategories} from '@oracle-cx-commerce/react-widgets/category/collection-navigation/fetcher';
import {useMenuCategoriesFetcher} from '@oracle-cx-commerce/react-widgets/category/collection-navigation/hook';
import { useRootCategoriesData } from './selectors';

export const fetchers = [fetchMenuCategories];

import { TiThMenu } from 'react-icons/ti'
import { t } from '@oracle-cx-commerce/utils/generic'
import { 
  renderMainCategories, 
  onEscapeKeyDown,
  onCategoryLinkClick,
  showCategories,
  hideCategories
} from './utils' 

const TmbCollectionNavigationDesktop = props => {
  const store = useContext(StoreContext);
  useMenuCategoriesFetcher(store, props);
  const rootCategories = useRootCategoriesData();

  const {
    allCategoriesLabelText,
    menuMainCollections
  } = props;

  return (
    <Styled id="TmbCollectionNavigationDesktop" css={css}>
      <div className="TmbCollectionNavigationDesktop">
        <div 
          className="TmbCollectionNavigationDesktop_AllCategories"
          role="menubar"
          tabIndex="-1"
          onKeyDown={onEscapeKeyDown}
          onClick={onCategoryLinkClick}
        >
          <div className="TmbCollectionNavigationDesktop_AllCategories_Wrapper" 
            onMouseOver={showCategories}
            onMouseOut={hideCategories}
          >
            <TiThMenu 
              color="#fff"
              fontSize="16px"
            />
            <span className="TmbCollectionNavigationDesktop_AllCategories__Title" >
              { t(allCategoriesLabelText) }
            </span>
          </div>
        </div>
        <NavBar { ...props }
          categories={rootCategories}
          showCategoriesCb={showCategories}
          hideCategoriesCb={hideCategories} />
        <ul className="TmbCollectionNavigationDesktop_OtherCategories">
          { renderMainCategories(store.getState(), menuMainCollections) }
        </ul>
      </div>
    </Styled>
  );
};

export default TmbCollectionNavigationDesktop;
