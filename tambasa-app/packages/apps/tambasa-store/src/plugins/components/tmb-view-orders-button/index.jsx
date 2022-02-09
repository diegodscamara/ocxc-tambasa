import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Link from '@oracle-cx-commerce/react-components/link';
import {PAGE_PROFILE_LINK} from '@oracle-cx-commerce/commerce-utils/constants'
import {t} from '@oracle-cx-commerce/utils/generic';
import css from './styles.css';

const TmbViewOrdersButton = props => {
  const { viewOrdersText } = props
  return (
    <Styled id="TmbViewOrdersButton" css={css}>
      <Link route={PAGE_PROFILE_LINK} className="TmbViewOrdersButton__Link">
        {t(viewOrdersText)}
      </Link>
    </Styled>
  );
};

export default TmbViewOrdersButton;
