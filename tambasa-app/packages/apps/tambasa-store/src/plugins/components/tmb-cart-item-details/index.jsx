import CartItemsTable from './components/cart-items-table';
import Link from '@oracle-cx-commerce/react-components/link';
import {PAGE_HOME_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import PropTypes from 'prop-types';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getComponentData} from './selectors';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';
import {useCartInitializer} from '@oracle-cx-commerce/react-components/utils/cart/hooks';

/**
* CartItemDetails widget displays shopping cart commerce items to view each item quantity, price and promotion information.
* It supports single shipping group only.
* @param {*} props
*/
const TmbCartItemDetails = props => {
  const {messageEmptyCart, actionContinueShopping} = props;

  //current order and shipping group info.
  const {currentOrder, isGetCartInProgress} = props;
  const {commerceItems = {}} = currentOrder;

  useCartInitializer(currentOrder, isGetCartInProgress);

  return (
    <Styled id="TmbCartItemDetails" css={css}>
      <div className="TmbCartItemDetails">
        {isGetCartInProgress !== 1 && (
          <>
            {isEmptyObject(commerceItems) ? (
              <>
                <h2 className="TmbCartItemDetails__EmptyMessage">{messageEmptyCart}</h2>
                <Link className="TmbCartItemDetails__ContiueShopping" href={PAGE_HOME_LINK}>
                  {actionContinueShopping}
                </Link>
              </>
            ) : (
              <>
                <CartItemsTable {...props} />
                <Link className="TmbCartItemDetails__ContiueShopping hidden-xs" href={PAGE_HOME_LINK}>
                  {actionContinueShopping}
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </Styled>
  );
};

TmbCartItemDetails.propTypes = {
  isGetCartInProgress: PropTypes.number.isRequired,
  currentOrder: PropTypes.shape({
    commerceItems: PropTypes.objectOf(PropTypes.object)
  }).isRequired
};

export default connect(getComponentData)(TmbCartItemDetails);
