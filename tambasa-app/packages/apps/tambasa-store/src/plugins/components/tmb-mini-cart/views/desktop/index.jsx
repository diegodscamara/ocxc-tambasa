import React, {Suspense, useCallback, useContext, useEffect, useState} from 'react';

import Link from '@oracle-cx-commerce/react-components/link';
import {MINI_CART_DURATION} from '@oracle-cx-commerce/commerce-utils/constants/cart';
import {PAGE_CART_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import PropTypes from 'prop-types';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './index.css';
import {getComponentData} from '../../selectors';
import {t} from '@oracle-cx-commerce/utils/generic';
import {useCartInitializer} from '@oracle-cx-commerce/react-components/utils/cart/hooks';

import { BiCart } from 'react-icons/bi'

const MiniCartPopoverPromise = import('../../components/mini-cart-popover-desktop');
const MiniCartPopover = React.lazy(() => MiniCartPopoverPromise);

const TmbMiniCartDesktop = props => {

    const {
        headingMiniShoppingCart,
        enableMiniCartOnDesktop = true,
        currentOrder,
        isGetCartInProgress,
        commerceItems = {},
        numberOfItems = 0,
        miniCartTitle
    } = props;

    const showMobileElements = false; //this variable controls the visibility of mobile specific elements
    const cartLinkAriaText = t(headingMiniShoppingCart, {numberOfItems});
    const store = useContext(StoreContext);
    const {action} = store;

    const [miniCartState, setMiniCartState] = useState({
        showMiniCart: false,
        miniCartItems: [],
        itemAdded: false,
        closeHandler: null
    });

    const closeMiniCart = useCallback(() => {
        setMiniCartState({
        showMiniCart: false,
        miniCartItems: [],
        itemAdded: false,
        closeHandler: null
        });
    }, []);

    const closeMiniCartPopover = useCallback(() => {
        setMiniCartState(prevState => {
        return {...prevState, closeHandler: setTimeout(closeMiniCart, 250)};
        });
    }, [closeMiniCart]);

    const handleMouseOver = useCallback(() => {
        if (miniCartState.closeHandler) {
        clearTimeout(miniCartState.closeHandler);
        }
        if (miniCartState.showMiniCart) return;
        const cartItems = Object.values(commerceItems);
        setMiniCartState({
        miniCartItems: cartItems,
        itemAdded: false,
        showMiniCart: true,
        closeHandler: null
        });
    }, [commerceItems, miniCartState]);

    useCartInitializer(currentOrder, isGetCartInProgress);

    useEffect(() => {
        // subscribe to 'addItemsToCartComplete', to get notified when an item is added to cart
        const unsubscribe = store.subscribeDispatch(action => {
        const {type, originalAction: {payload: {items = []} = {}} = {}} = action;

        if (type === 'addItemsToCartComplete' && items && items.length > 0) {
            const cartItems = Object.values(commerceItems);
            const itemAddedToCart = cartItems.find(cartItem => cartItem.catRefId === items[0].catRefId);
            // update the local state with item added and other properties accordingly
            if (itemAddedToCart) {
            setMiniCartState({
                miniCartItems: [itemAddedToCart],
                itemAdded: true,
                showMiniCart: true,
                closeHandler: null
            });
            // close the mini cart (item added) pop up after specified no. of seconds
            setTimeout(closeMiniCart, MINI_CART_DURATION * 1000);
            }
        }
        });

        return unsubscribe;
    }, [action, closeMiniCart, commerceItems, store]);

    // include the mini cart only if the 'enableMiniCartOnDesktop' is set in the widget configuration

    return (
        <Styled id="TmbMiniCartDesktop" css={css}>
            <div
                className="TmbMiniCartDesktop"
                onFocus={handleMouseOver}
                onMouseOver={handleMouseOver}
                onMouseLeave={closeMiniCartPopover}
            >
                <div className="TmbMiniCartDesktop__Container">
                    <Link href={PAGE_CART_LINK} ariaLabel={cartLinkAriaText}>
                        <div className="TmbMiniCartDesktop__Container___IconBlock">
                            <BiCart color="#E6E7DF"/>
                            <span className="TmbMiniCartDesktop__Container___IconBlock___Qty" aria-hidden="true">
                                { numberOfItems > 99 ? '+99' : numberOfItems }
                            </span>
                        </div>
                        <div className="TmbMiniCartDesktop__Container__Title">
                            { t(miniCartTitle) }
                        </div>
                    </Link>
                </div>

                {enableMiniCartOnDesktop && numberOfItems > 0 && typeof window !== 'undefined' && (
                <Suspense fallback={null}>
                    <MiniCartPopover
                    miniCartState={miniCartState}
                    closeMiniCart={closeMiniCart}
                    showMobileElements={showMobileElements}
                    {...props}
                    />
                </Suspense>
                )}
            </div>
        </Styled>
    );
};

TmbMiniCartDesktop.propTypes = {
    enableMiniCartOnDesktop: PropTypes.bool,
    displayCheckoutButtonOnMiniCart: PropTypes.bool,
    miniCartItemsBeforeScrolling: PropTypes.string,
    currentOrder: PropTypes.shape({
        commerceItems: PropTypes.objectOf(PropTypes.object),
        shippingGroups: PropTypes.objectOf(PropTypes.object),
        priceInfo: PropTypes.shape({
        subTotal: PropTypes.number
        }),
        numberOfItems: PropTypes.number
    }).isRequired,
    currentPriceListGroup: PropTypes.shape({
        currency: PropTypes.shape({
        currencyCode: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired
        }),
        locale: PropTypes.string
    }).isRequired,
    isUserLoggedIn: PropTypes.bool.isRequired
};

TmbMiniCartDesktop.defaultProps = {
    enableMiniCartOnDesktop: true,
    displayCheckoutButtonOnMiniCart: true,
    miniCartItemsBeforeScrolling: '3'
};

export default connect(getComponentData)(TmbMiniCartDesktop);
