import {OrderContext, StoreContext, ContainerContext} from '@oracle-cx-commerce/react-ui/contexts';
import {priceOrderTotal} from '@oracle-cx-commerce/react-components/utils/cart';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';
import css from './styles.css';
import ReviewOrderPlaceholder from './components/review-order-placeholder';
import PageLoader from '@oracle-cx-commerce/react-components/page-loader';
import {getComponentData} from './selectors';

/**
* CheckoutReviewOrderContainer holds widgets related to review order page.
* Provides the current order context.
* @param {*} props
*/
const TmbCheckoutReviewOrderContainer = props => {
  //props
  const {
    regions = [],
    isGetCartInProgress,
    isPlaceOrderInProgress,
    commerceItems = {},
    ...currentOrder
  } = props;
  //state
  const [guestEmailDetails, setGuestEmailDetails] = useState({});
  const [isPlaceOrderInitiated, setPlaceOrderInitiated] = useState(false);

  const {action} = useContext(StoreContext);
  const count = useRef(0);

  /**
  * Method to invoke price order only once
  * Method to invoke stock status when commerce items changes
  */
  useEffect(() => {
    if (isGetCartInProgress !== 1 && !isEmptyObject(commerceItems)) {
      if (count.current === 0) {
        count.current++;
        // Reprice should be executed one time only.
        priceOrderTotal(action);
      }
    }
  }, [action, commerceItems, isGetCartInProgress]);

  return (
    <Styled id="TmbCheckoutReviewOrderContainer" css={css}>
      <div className="TmbCheckoutReviewOrderContainer">
        <PageLoader show={isGetCartInProgress === 1 || (isPlaceOrderInProgress && isGetCartInProgress === 0)}>
          <ReviewOrderPlaceholder />
        </PageLoader>
        {isGetCartInProgress !== 1 && !isPlaceOrderInProgress && (
          <OrderContext.Provider value={{commerceItems, ...currentOrder}}>
            <ContainerContext.Provider
              value={{guestEmailDetails, setGuestEmailDetails, isPlaceOrderInitiated, setPlaceOrderInitiated}}
            >
              <section className="TmbCheckoutReviewOrderContainer__Section">
                {regions.map(regionId => (
                  <Region key={regionId} regionId={regionId} />
                ))}
              </section>
            </ContainerContext.Provider>
          </OrderContext.Provider>
        )}
      </div>
    </Styled>
  );
};

export default connect(getComponentData)(TmbCheckoutReviewOrderContainer);
