import React from 'react';
import { useComponentData } from '@oracle-cx-commerce/react-widgets/product/product-inventory-status/selectors';
import { t } from '@oracle-cx-commerce/utils/generic';
import Styled from '@oracle-cx-commerce/react-components/styled';

import css from '../styles.css';

const TmbProductStock = props => {

  const {
    unityPlural,
    unitySingular,
    piecePlural,
    pieceSingular
  } = props;

  const { orderableQuantity } = useComponentData();

  return (
    <Styled id="TmbProductStock" css={css}>
      <div className="TmbProductStock">
        <span className="TmbProductStock__Label">
          {orderableQuantity > 1 ? t(unityPlural) : t(unitySingular)}
        </span>
        <span className="TmbProductStock__Amount">
          {orderableQuantity}
        </span>
        <span className="TmbProductStock__Piece">
          {orderableQuantity > 1 ? t(piecePlural) : t(pieceSingular)}
        </span>
      </div>
    </Styled>
  );
};

export default TmbProductStock;
