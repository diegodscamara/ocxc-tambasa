/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

const NO_OF_PRODUCT_ROWS = 3;
let productRows = [];

/**
 * Renders placeholder boxes for Category Page
 */
const CategoryPlaceholder = props => {
  const {mobile} = props;

  const getProductRow = index => {
    // Show two columns on mobile and four on desktop
    return (
      <div key={index} className="CategoryPlaceholder__ProductColumns">
        <div className="CategoryPlaceholder__Product">
          <div className="CategoryPlaceholder__Img"></div>
          <div className="CategoryPlaceholder__Title"></div>
          <div className="CategoryPlaceholder__Variants"></div>
          <div className="CategoryPlaceholder__Price"></div>
        </div>
        <div className="CategoryPlaceholder__Product">
          <div className="CategoryPlaceholder__Img"></div>
          <div className="CategoryPlaceholder__Title"></div>
          <div className="CategoryPlaceholder__Variants"></div>
          <div className="CategoryPlaceholder__Price"></div>
        </div>
        {mobile || (
          <>
            <div className="CategoryPlaceholder__Product">
              <div className="CategoryPlaceholder__Img"></div>
              <div className="CategoryPlaceholder__Title"></div>
              <div className="CategoryPlaceholder__Variants"></div>
              <div className="CategoryPlaceholder__Price"></div>
            </div>
            <div className="CategoryPlaceholder__Product">
              <div className="CategoryPlaceholder__Img"></div>
              <div className="CategoryPlaceholder__Title"></div>
              <div className="CategoryPlaceholder__Variants"></div>
              <div className="CategoryPlaceholder__Price"></div>
            </div>
          </>
        )}
      </div>
    );
  };

  productRows = [];
  for (let i = 0; i < NO_OF_PRODUCT_ROWS; i++) {
    productRows.push(getProductRow(i));
  }

  return (
    <Styled id="CategoryPlaceholder" css={css}>
      <div className="CategoryPlaceholder">
        <div className="CategoryPlaceholder__BreadCrumbs"></div>
        <div className="CategoryPlaceholder__SummaryInfo"></div>
        <div className="CategoryPlaceholder__ProductColumns">
          <div className="CategoryPlaceholder__FacetedNav"></div>
          <div className="CategoryPlaceholder__SortResults"></div>
        </div>
        {productRows}
      </div>
    </Styled>
  );
};

export default CategoryPlaceholder;
