import React from 'react';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import { isMobile } from '@oracle-cx-commerce/commerce-utils/selector'
import {useSelector} from '@oracle-cx-commerce/react-components/provider';

const TmbResultsAndFiltersContainerMobile = props => {
  const { regions = [] } = props

  const mobile = useSelector(isMobile)

  return (
    mobile 
    ? <Styled id="TmbResultsAndFiltersContainer" css={css}>
        <section className="TmbResultsAndFiltersContainer TmbResultsAndFiltersContainer--Mobile">
          {
            regions.map(regionId => (
              <Region key={regionId} regionId={regionId} />
            ))
          }
        </section>
      </Styled>
    : <></>
  );
};

export default TmbResultsAndFiltersContainerMobile;
