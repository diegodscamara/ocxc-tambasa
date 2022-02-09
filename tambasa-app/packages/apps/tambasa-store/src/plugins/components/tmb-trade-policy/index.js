import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import ExchangePolicy from './components/ExchangePolicy';
import ContactUs from './components/ContactUs';

import css from './styles.css';

const TmbTradePolicy = props => {
  return (
    <Styled id="TmbTradePolicy" css={css}>
      <div className="policyContainer">
        <ExchangePolicy {...props} />
        <ContactUs {...props} />
      </div>
    </Styled>
  );
};

export default TmbTradePolicy;
