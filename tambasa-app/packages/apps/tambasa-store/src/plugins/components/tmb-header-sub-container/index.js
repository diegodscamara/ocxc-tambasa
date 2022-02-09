import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Region from '@oracle-cx-commerce/react-components/region'

import css from './styles.css';

const TmbHeaderSubContainer = props => {
  const { regions = [] } = props
  return (
    <Styled id="TmbHeaderSubContainer" css={css}>
      <section className="TmbHeaderSubContainer">
        {
          regions.map(regionId => (
            <Region key={regionId} regionId={regionId} />
          ))
        }
      </section>
    </Styled>
  );
};

export default TmbHeaderSubContainer;
