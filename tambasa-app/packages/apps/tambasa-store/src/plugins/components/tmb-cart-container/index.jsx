import React, {useState} from 'react';

import {CartContext} from '@oracle-cx-commerce/react-ui/contexts';
import CartPlaceholder from '@oracle-cx-commerce/react-widgets/cart/cart-container/components/cart-placeholder';
import CartValidation from '@oracle-cx-commerce/react-widgets/cart/cart-container/components/cart-validations';
import PageLoader from '@oracle-cx-commerce/react-components/page-loader';
import PropTypes from 'prop-types';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getComponentData} from './selector';

/**
* CartContainer displays widgets of the cart page in responsive way.
* It supports single shipping group only.
* @param {*} props
*/
const TmbCartContainer = props => {
  const {regions = [], className = '', headingYourCart, isGetCartInProgress} = props;
  const [cartStatus, setCartStatus] = useState({
    isCartInValid: false,
    hasOutOfStockItems: false,
    hasInactiveItems: false
  });

  return (
    <Styled id="TmbCartContainer" css={css}>
      <div className="TmbCartContainer">
        <CartContext.Provider value={{cartStatus, setCartStatus}}>
          <CartValidation {...props} />
          <PageLoader show={isGetCartInProgress === 1}>
            <CartPlaceholder />
          </PageLoader>
          <section
            className={`TmbCartContainer__Section ${className}`.trim()}
            style={{visibility: isGetCartInProgress !== 1 ? 'visible' : 'hidden'}}
          >
            {regions.map((regionId, index) => (
              <Region key={index} regionId={regionId} /> // eslint-disable-line react/no-array-index-key
            ))}
          </section>
        </CartContext.Provider>
      </div>
    </Styled>
  );
};

TmbCartContainer.propTypes = {
  isGetCartInProgress: PropTypes.number.isRequired, // Boolean flag to indicate whether Cart is loaded or not.
  regions: PropTypes.PropTypes.arrayOf(PropTypes.string).isRequired // Set of regions defined in Cart Container layout.
};

export default connect(getComponentData)(TmbCartContainer);
