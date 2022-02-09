import React, { useState, useContext, useEffect } from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Region from '@oracle-cx-commerce/react-components/region'
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts'

import css from './styles.css';
import TmbSpinner from '../utils/components/tmb-spinner';

const TmbCartOrderSummaryContainer = props => {
  const { regions = [] } = props

  const [ showSpinner, setShowSpinner ] = useState(false)
  const { subscribeDispatch } = useContext(StoreContext)

  useEffect(() => {
    subscribeDispatch(action => {
      const { type } = action
  
      if(type === "paymentTypeLoading")
        setShowSpinner(true)
      else if(type === "paymentTypeLoaded")
        setShowSpinner(false)
    })
  }, [])
  
  return (
    <Styled id="TmbCartOrderSummaryContainer" css={css}>
      <section className="TmbCartOrderSummaryContainer">
        <TmbSpinner show={showSpinner}/>
        {
          regions.map(regionId => (
            <Region key={regionId} regionId={regionId} />
          ))
        }
      </section>
    </Styled>
  );
};

export default TmbCartOrderSummaryContainer;
