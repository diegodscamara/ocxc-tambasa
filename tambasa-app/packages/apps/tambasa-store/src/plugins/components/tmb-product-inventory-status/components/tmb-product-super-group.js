import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import { t } from '@oracle-cx-commerce/utils/generic';
import { getPageData } from '@oracle-cx-commerce/react-widgets/product/product-breadcrumbs/selectors';

import css from '../styles.css';

const TmbProductSuperGroup = props => {
  const { superGroupLabel, productId, products, categories } = props;

  const parentCategoryIdPath = products && productId && products[productId] && products[productId].parentCategoryIdPath;
  if (parentCategoryIdPath && categories) {
    const parentCategories = parentCategoryIdPath
      .split('>')
      .filter(i => categories[i])
      .map(i => categories[i]);

    const superGroup = parentCategories[1];

    return (
      <Styled id="TmbProductSuperGroup" css={css}>
        <div className="TmbProductSuperGroup">
          <span className="TmbProductSuperGroup__Label">
            {t(superGroupLabel)}
          </span>
            <div>
              <span className="TmbProductSuperGroup__Name">
                {superGroup.displayName}
              </span>
            </div>
        </div>
      </Styled>
    );
  }

  return <Styled id="TmbProductSuperGroup" css={css} />;
};

export default connect(getPageData)(TmbProductSuperGroup);
