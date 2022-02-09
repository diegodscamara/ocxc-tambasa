import {
    getCurrentOrder,
    getCartEndpointStatus,
    hasCartItemsFromMultipleSites
} from '@oracle-cx-commerce/commerce-utils/selector';

export const getComponentData = state => {
    const currentOrder = getCurrentOrder(state);
    const isGetCartInProgress = getCartEndpointStatus(state);
    const displayCartItemSiteInfo = hasCartItemsFromMultipleSites(state, {commerceItems: currentOrder.commerceItems});

    return {
        currentOrder,
        isGetCartInProgress,
        displayCartItemSiteInfo
    };
};
