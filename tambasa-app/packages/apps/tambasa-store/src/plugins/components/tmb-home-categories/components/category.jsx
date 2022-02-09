import React from 'react';
import Link from '@oracle-cx-commerce/react-components/link';
import Styled from '@oracle-cx-commerce/react-components/styled';

import css from '../styles.css';

const Category = props => {
  const {name, route, image} = props;
  return (
    <Styled className="TmbHomeCategories" id="TmbHomeCategories" css={css}>
      <div className="TmbHomeCategories__Category">
        <Link className="TmbHomeCategories__Category-Link" route={route}>
          <div className="TmbHomeCategories__Category-Image" style={{backgroundImage: `url(/file${image})`}}>
            <div className="TmbHomeCategories__Content">
              <div className="TmbHomeCategories__Border">
                <span className="TmbHomeCategories__Title">{name}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Styled>
  );
};

export default Category;
