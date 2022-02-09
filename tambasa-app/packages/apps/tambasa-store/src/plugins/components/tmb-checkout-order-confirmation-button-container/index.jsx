import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Region from '@oracle-cx-commerce/react-components/region';
import css from './styles.css';

const TmbCheckoutOrderConfirmationButtonsContainer = props => {
  const { regions = [] } = props
  return (
    <Styled id="TmbCheckoutOrderConfirmationButtonsContainer" css={css}>
      <div className="TmbCheckoutOrderConfirmationButtonsContainer">
        {
          regions.map(regionId => 
            <Region key={regionId} regionId={regionId} />
          )
        }
      </div>
    </Styled>
  );
};

export default TmbCheckoutOrderConfirmationButtonsContainer;
