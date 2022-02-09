import React, {useContext, useEffect} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Link from '@oracle-cx-commerce/react-components/link'
import {t} from '@oracle-cx-commerce/utils/generic';
import {ProductContext} from '@oracle-cx-commerce/react-ui/contexts'
import css from './styles.css';

const TmbProductPageButton = props => {
  const { route } = useContext(ProductContext)

  return (
    <Styled id="TmbProductPageButton" css={css}>
      <Link route={route} className="TmbProductPageButton__Link">
        {t(props.detailsButtonText)}
      </Link>
    </Styled>
  );
};

export default TmbProductPageButton;
