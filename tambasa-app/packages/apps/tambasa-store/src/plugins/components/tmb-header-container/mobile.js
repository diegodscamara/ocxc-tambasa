import React from 'react';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';

import css from './mobile.css'
 
const TmbHeaderContainerMobile = props => {
  const {regions = []} = props;
  return (
    <Styled id="TmbHeaderContainerMobile" css={css}>
      <section className="TmbHeaderContainerMobile__Section">
      {
        regions.map(regionId => (
          <Region key={regionId} regionId={regionId} />
        ))
      }
      </section>
    </Styled>
  );
};
 
export default TmbHeaderContainerMobile;
 