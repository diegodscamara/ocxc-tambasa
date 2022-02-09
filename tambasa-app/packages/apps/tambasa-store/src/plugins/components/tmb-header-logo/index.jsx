import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Link from '@oracle-cx-commerce/react-components/link';
import {PAGE_HOME_LINK} from '@oracle-cx-commerce/commerce-utils/constants'
import css from './styles.css';

const TmbHeaderLogo = () => {
  return (
    <Styled id="TmbHeaderLogo" css={css}>
      <Link route={PAGE_HOME_LINK} className="TmbHeaderLogo__Link">
          <div className="TmbHeaderLogo__Link___Image" />
      </Link>
    </Styled>
  );
};

export default TmbHeaderLogo;
