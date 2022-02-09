import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Link from '@oracle-cx-commerce/react-components/link';
import {PAGE_HOME_LINK} from '@oracle-cx-commerce/commerce-utils/constants'
import {t} from '@oracle-cx-commerce/utils/generic';
import css from './styles.css';

const TmbContinueShoppingButton = props => {
  const { continueShoppingText } = props
  return (
    <Styled id="TmbContinueShoppingButton" css={css}>
      <Link route={PAGE_HOME_LINK} className="TmbContinueShoppingButton__Link">
        {t(continueShoppingText)}
      </Link>
    </Styled>
  );
};

export default TmbContinueShoppingButton;
