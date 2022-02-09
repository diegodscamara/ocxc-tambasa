import React, {useContext} from 'react';
import {ProductContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
/**
 * Displays a product's title using the displayName property from the product.
 */
const TmbProductName = () => {
  // context
  const {displayName = ''} = useContext(ProductContext);

  return (
    <Styled id="TmbProductName" css={css}>
      <h1 className="TmbProductName">{displayName}</h1>
    </Styled>
  );
};
export default TmbProductName;
