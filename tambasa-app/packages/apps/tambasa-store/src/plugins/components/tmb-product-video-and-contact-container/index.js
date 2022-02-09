import React from 'react';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import ProductPlaceholder from './components/product-placeholder';
import PageLoader from '@oracle-cx-commerce/react-components/page-loader';
import {fetchCurrentProductDetails} from '@oracle-cx-commerce/fetchers/product';
import {ProductContext, ContainerContext, ProductSelectionContext} from '@oracle-cx-commerce/react-ui/contexts';
import {useComponentData} from '@oracle-cx-commerce/react-widgets/product/product-details-container/selectors';

import css from './styles.css';

export const fetchers = [fetchCurrentProductDetails];

/**
 * A container that holds all the product details related widgets.
 */
const TmbProductVideoAndContactContainer = ({regions = []}) => {
  // selectors
  const {isProductFound, product, selections, setSelections, productSelection} = useComponentData();

  return (
    <Styled id="TmbProductVideoAndContactContainer" css={css}>
      <div className="TmbProductVideoAndContactContainer">
        <PageLoader show={!isProductFound}>
          <ProductPlaceholder />
        </PageLoader>
        <ProductContext.Provider value={product}>
          <ContainerContext.Provider value={{selections, setSelections}}>
            <ProductSelectionContext.Provider value={{productSelection}}>
              <section
                className="TmbProductVideoAndContactContainer__Section"
                style={{visibility: isProductFound ? 'visible' : 'hidden'}}
              >
                {regions.map((regionId, index) => (
                  /*
                  Using region ids as keys causes unnecessary DOM reconciliation.
 
                  https://reactjs.org/docs/reconciliation.html#keys
                */
                  <Region key={index} regionId={regionId} /> // eslint-disable-line react/no-array-index-key
                ))}
              </section>
            </ProductSelectionContext.Provider>
          </ContainerContext.Provider>
        </ProductContext.Provider>
      </div>
    </Styled>
  );
};

export default TmbProductVideoAndContactContainer;
