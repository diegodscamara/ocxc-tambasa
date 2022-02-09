import React, { useContext } from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Widget from '@oracle-cx-commerce/react-components/widget';
import { getRegion } from '@oracle-cx-commerce/commerce-utils/selector'
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts'

import GenericCarousel from '@oracle-cx-commerce/react-components/generic-carousel'
import css from './styles.css';

const TmbHomeMainCarousel = props => {
  const {regions = []} = props;

  const widgets = []

  const state = useContext(StoreContext).getState()

  const mapWidgets = () => {
    for(const region of regions) {
      const regionDetails = getRegion(state, { regionId: region })
      for(const widgetId of regionDetails.widgets) {
        widgets.push(
          <Widget key={widgetId} widgetId={widgetId}/>
        )
      }
    }
  }

  mapWidgets()
    
  return (
    <Styled id="TmbHomeMainCarousel" css={css}>
      <section className="TmbHomeMainCarousel__Section">
        <GenericCarousel
          slides={widgets}
          isAutoSlide={false}
          showIndicator={!1}
        />
      </section>
    </Styled>
  );
};

export default TmbHomeMainCarousel;
