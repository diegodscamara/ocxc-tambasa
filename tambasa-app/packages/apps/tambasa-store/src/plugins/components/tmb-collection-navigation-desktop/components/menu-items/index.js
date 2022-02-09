import React from 'react';
import Link from '@oracle-cx-commerce/react-components/link';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css'

const MenuItems = ({categories = []}) => {
  return (
    <Styled id="CollectionNavigationDesktop__MenuItems" css={css}>
      <div className="CollectionNavigationDesktop__MenuItems">
        <ul>
          {categories.map(({id, displayName, route}) => (
            <li key={id}>
              <Link href={route}>{displayName}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Styled>
  );
};

export default React.memo(MenuItems);
