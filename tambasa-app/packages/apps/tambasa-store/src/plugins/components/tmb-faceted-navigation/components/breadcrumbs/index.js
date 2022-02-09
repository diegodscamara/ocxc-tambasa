import React from 'react';
import RefinementCrumb from '../refinement-crumb';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {t} from '@oracle-cx-commerce/utils/generic';

// A component for listing navigation breadcrumbs.
const Breadcrumbs = props => {
  const {textFilters, filteredRefinementCrumbs} = props;

  return (
    <Styled id="Breadcrumbs" css={css}>
      <div className="Breadcrumbs">
        <span className="Breadcrumbs__FiltersLabel">{t(textFilters)}</span>
        <br />
        <span className="Breadcrumbs__BreadcrumbsContainer">
          {filteredRefinementCrumbs.map(crumbData => (
            <RefinementCrumb key={crumbData.label} crumbData={crumbData} {...props} />
          ))}
        </span>
      </div>
    </Styled>
  );
};

export default Breadcrumbs;
