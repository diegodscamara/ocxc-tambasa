import React, { useContext } from 'react';
import { ProductContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';

import css from './styles.css';

/**
 * Displays a product's description using the description property from the product.
 */
const TmbProductShortDescription = () => {
  // selector
  const { description = '' } = useContext(ProductContext);

  return (
    <Styled id="TmbProductShortDescription" css={css}>
      <span className="TmbProductShortDescription">{description}</span>
    </Styled>
  );
};
export default TmbProductShortDescription;

