import React, {Suspense, useCallback, useContext, useEffect, useState} from 'react';

import ActionIcon from '@oracle-cx-commerce/react-components/action-icon';
import Link from '@oracle-cx-commerce/react-components/link';
import {PAGE_CART_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import PropTypes from 'prop-types';
import ShoppingBasketIcon from '@oracle-cx-commerce/react-components/icons/shopping-basket';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './index.css';
import {getComponentData} from '../../selectors';
import {t} from '@oracle-cx-commerce/utils/generic';
import {useCartInitializer} from '@oracle-cx-commerce/react-components/utils/cart/hooks';

const MiniCartModalPromise = import(
'@oracle-cx-commerce/react-widgets/cart/mini-cart/components/mini-cart-modal-mobile'
);
const MiniCartModal = React.lazy(() => MiniCartModalPromise);

const TmbMiniCartMobile = props => {
    
    const {headingMiniShoppingCart, numberOfItems = 0, commerceItems = {}} = props;
    const cartLinkAriaText = t(headingMiniShoppingCart, {numberOfItems});
    const store = useContext(StoreContext);
    const {currentOrder, isGetCartInProgress} = props;

    const showMobileElements = true; //this variable controls the visibility of mobile specific elements

    const [miniCartState, setMiniCartState] = useState({
        showMiniCart: false,
        miniCartItems: [],
        itemAdded: false
    });

    const closeMiniCart = useCallback(() => {
        setMiniCartState({
        showMiniCart: false,
        miniCartItems: [],
        itemAdded: false
        });
    }, []);

    useEffect(() => {
        const unsubscribe = store.subscribeDispatch(action => {
        const {type, originalAction: {payload: {items = []} = {}} = {}} = action;

        if (type === 'addItemsToCartComplete' && items && items.length > 0) {
            const cartItems = Object.values(commerceItems);
            const itemAdded = cartItems.find(cartItem => cartItem.catRefId === items[0].catRefId);
            // update the local state with item added and other properties accordingly
            if (itemAdded) {
            setMiniCartState({
                miniCartItems: [itemAdded],
                itemAdded: true,
                showMiniCart: true
            });
            }
        }
        });

        return unsubscribe;
    }, [closeMiniCart, commerceItems, store]);

    return (
        <Styled id="TmbMiniCartMobile" css={css}>
        <div className="TmbMiniCartMobile">
            <ActionIcon>
            <Link href={PAGE_CART_LINK} className="MiniCartMobile__CartLink" ariaLabel={cartLinkAriaText}>
                <ShoppingBasketIcon />
            </Link>
            </ActionIcon>
            <span aria-hidden="true">{numberOfItems}</span>

            {numberOfItems > 0 ? (
            <Suspense fallback={null}>
                <MiniCartModal
                miniCartState={miniCartState}
                closeMiniCart={closeMiniCart}
                showMobileElements={showMobileElements}
                {...props}
                />
            </Suspense>
            ) : null}
        </div>
        </Styled>
    );
};

TmbMiniCartMobile.propTypes = {
    displayCheckoutButtonOnMiniCart: PropTypes.bool,
    commerceItems: PropTypes.objectOf(PropTypes.object).isRequired,
    shippingGroups: PropTypes.objectOf(PropTypes.object).isRequired,
    numberOfItems: PropTypes.number,
    currentPriceListGroup: PropTypes.shape({
        currency: PropTypes.shape({
        currencyCode: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired
        }),
        locale: PropTypes.string
    }).isRequired,
    isUserLoggedIn: PropTypes.bool.isRequired
};

TmbMiniCartMobile.defaultProps = {
    displayCheckoutButtonOnMiniCart: true,
    numberOfItems: 0
};

export default connect(getComponentData)(TmbMiniCartMobile);
