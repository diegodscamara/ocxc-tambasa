import DeleteIcon from '@oracle-cx-commerce/react-components/icons/delete';
import Link from '@oracle-cx-commerce/react-components/link';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {t} from '@oracle-cx-commerce/utils/generic';

// A component that displays a refinement breadcrumb with a link to remove it.
const RefinementCrumb = ({crumbData, formatPriceRange, deleteFilterAltText, onSelect, route}) => (
  <Styled id="RefinementCrumb" css={css}>
    <span className="RefinementCrumb__Breadcrumb">
      <span className="RefinementCrumb__BreadcrumbLabel">
        {crumbData.dimensionName === 'product.priceRange' ? formatPriceRange(crumbData) : crumbData.label}
      </span>
      <Link
        className="RefinementCrumb__RemoveButton"
        href={`${route}${crumbData.removeAction.link}`}
        onClick={onSelect}
      >
        <span aria-label={t(deleteFilterAltText)}>
          <DeleteIcon />
        </span>
      </Link>
    </span>
  </Styled>
);

export default RefinementCrumb;
