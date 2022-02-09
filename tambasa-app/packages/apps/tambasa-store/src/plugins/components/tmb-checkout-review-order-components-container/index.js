import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Region from '@oracle-cx-commerce/react-components/region';
import css from './styles.css';

const TmbCheckoutReviewOrderComponentsContainer = props => {
  const { regions= [] } = props
  return (
    <Styled id="TmbCheckoutReviewOrderComponentsContainer" css={css}>
      <section className="TmbCheckoutReviewOrderComponentsContainer">
      {regions.map(regionId => (
        <Region key={regionId} regionId={regionId} />
      ))}
      </section>
    </Styled>
  );
};

export default TmbCheckoutReviewOrderComponentsContainer;
