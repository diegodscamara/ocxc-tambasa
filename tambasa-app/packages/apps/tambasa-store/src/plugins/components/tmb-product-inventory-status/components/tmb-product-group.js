import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import { t } from '@oracle-cx-commerce/utils/generic';
import { getPageData } from '@oracle-cx-commerce/react-widgets/product/product-breadcrumbs/selectors';

import css from '../styles.css';

const TmbProductGroup = props => {
  const { groupLabel, productId, products, categories } = props;

  const parentCategoryIdPath = products && productId && products[productId] && products[productId].parentCategoryIdPath;
  if (parentCategoryIdPath && categories) {
    const parentCategories = parentCategoryIdPath
      .split('>')
      .filter(i => categories[i])
      .map(i => categories[i]);

      const group = parentCategories[0];

    return (
      <Styled id="TmbProductGroup" css={css}>
        <div className="TmbProductGroup">
          <span className="TmbProductGroup__Label">
            {t(groupLabel)}
          </span>
            <div>
              <span className="TmbProductGroup__Name">
                {group.displayName}
              </span>
            </div>
        </div>
      </Styled>
    );
  }

  return <Styled id="TmbProductGroup" css={css} />;
};

export default connect(getPageData)(TmbProductGroup);
