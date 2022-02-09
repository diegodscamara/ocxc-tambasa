import React, {useContext} from 'react';
import {ProductContext} from '@oracle-cx-commerce/react-ui/contexts'
import Styled from '@oracle-cx-commerce/react-components/styled';
import {t} from '@oracle-cx-commerce/utils/generic';

import css from './styles.css';

const useProductId = (record)  => {
  return record.attributes &&
    record.attributes["product.repositoryId"] &&
    record.attributes["product.repositoryId"][0]
      ? record.attributes["product.repositoryId"][0]
      : 'N0C0D3'
}

const TmbProductResultSKU = props => {

  const { record = {} } = useContext(ProductContext)

  const repositoryId = 
    record.attributes &&
    record.attributes["sku.repositoryId"] &&
    record.attributes["sku.repositoryId"][0]
      ? record.attributes["sku.repositoryId"][0]
      : useProductId(record)

  return (
    <Styled id="TmbProductResultSKU" css={css}>
      <span className="TmbProductResultSKU__Text">
        {t(props.skuText, {skuId: repositoryId})}
      </span>
    </Styled>
  );
};

export default TmbProductResultSKU;
