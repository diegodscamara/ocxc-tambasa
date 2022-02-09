import React, { useContext } from 'react';
import { t } from '@oracle-cx-commerce/utils/generic';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { ProductContext } from '@oracle-cx-commerce/react-ui/contexts';

import css from './styles.css';

export default function TmbProductLongDescription(props) {

  const { longDescription = '' } = useContext(ProductContext);

  const { productDescriptionTitle } = props;

  return (
    <Styled id="TmbProductLongDescription" css={css}>
      <div className="TmbProductLongDescription">
        <h2 className="TmbProductLongDescription__Title">{t(productDescriptionTitle)}</h2>
        <div className="TmbProductLongDescription__Description" dangerouslySetInnerHTML={{ __html: longDescription }}></div>
      </div>
    </Styled>
  );
}
