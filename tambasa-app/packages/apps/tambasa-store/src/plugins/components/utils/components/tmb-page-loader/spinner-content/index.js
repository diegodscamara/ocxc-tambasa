import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

const SpinnerContent = props => {
  const { show = false } = props
  return (
    <Styled id="SpinnerContent" css={css}>
      <div className={`SpinnerContent ${!show ? 'Dismiss': ''}`}>
        <div className="SpinnerContent__Circle">
          <div></div>
        </div>
      </div>
    </Styled>
  );
};

export default SpinnerContent;
