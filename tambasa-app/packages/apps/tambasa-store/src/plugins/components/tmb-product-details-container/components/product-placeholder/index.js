import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';

import css from './styles.css';

/**
 * Renders placeholder boxes for Product details Page
 */
const TmbProductPlaceholder = () => {
  return (
    <Styled id="TmbProductPlaceholder" css={css}>
      <div className="TmbProductPlaceholder">
        <div className="TmbProductPlaceholder__Img"></div>
        <div className="TmbProductPlaceholder__NavIcons"></div>
        <div className="TmbProductPlaceholder__Title"></div>
        <div className="TmbProductPlaceholder__Price"></div>
        <div className="TmbProductPlaceholder__Variants"></div>
        <div className="TmbProductPlaceholder__AddToCart"></div>
      </div>

      <div className="TmbProductPlaceholderDtp">
        <div className="TmbProductPlaceholderDtp__Left">
          <div className="TmbProductPlaceholderDtp__Thumbnails"></div>
          <div className="TmbProductPlaceholderDtp__Img"></div>
        </div>
        <div className="TmbProductPlaceholderDtp__Right">
          <div className="TmbProductPlaceholderDtp__Title"></div>
          <div className="TmbProductPlaceholderDtp__Price"></div>
          <div className="TmbProductPlaceholderDtp__Variants"></div>
          <div className="TmbProductPlaceholderDtp__AddToCart"></div>
          <div className="TmbProductPlaceholderDtp__AddToList"></div>
          <div className="TmbProductPlaceholderDtp__Desc"></div>
        </div>
        <div className="TmbProductPlaceholderDtp__Footer"></div>
      </div>
    </Styled>
  );
};

export default TmbProductPlaceholder;
