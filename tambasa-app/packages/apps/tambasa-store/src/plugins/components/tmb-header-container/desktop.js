import React from 'react';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';

import css from './desktop.css'

const TmbHeaderContainerDesktop = props => {
  const {regions = []} = props;

  return (
    <Styled id="TmbHeaderContainerDesktop" css={css}>
      <section className="TmbHeaderContainerDesktop__Section">
        {
          regions.map(regionId => (
            <Region key={regionId} regionId={regionId} />
          ))
        }
      </section>
    </Styled>
  );
};

export default TmbHeaderContainerDesktop;
 