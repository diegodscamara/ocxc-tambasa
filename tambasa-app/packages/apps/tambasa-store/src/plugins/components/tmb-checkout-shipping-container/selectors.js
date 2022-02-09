import {
    getCurrentOrder,
    getCurrentOrderId,
    getCurrentProfileId,
    getCartEndpointStatus,
    getGiftWithPurchaseMessages,
    getRoles,
    getSkuInventoryItems,
    isAuthenticated,
    isCurrentUserB2B
} from '@oracle-cx-commerce/commerce-utils/selector';

export const getComponentData = state => {
    const currentOrder = getCurrentOrder(state);
    const isB2BUser = isCurrentUserB2B(state);
    const isUserLoggedIn = isAuthenticated(state) && getCurrentProfileId(state) !== 'anonymous';
    const roles = getRoles(state);
    const skuInventory = getSkuInventoryItems(state);
    const totalGwpMessages = getGiftWithPurchaseMessages(state) || {};
    const giftWithPurchaseMessages = totalGwpMessages[getCurrentOrderId(state)]
        ? totalGwpMessages[getCurrentOrderId(state)].messages
        : [];
    const isGetCartInProgress = getCartEndpointStatus(state);

    return {
        currentOrder,
        isB2BUser,
        isUserLoggedIn,
        roles,
        skuInventory,
        giftWithPurchaseMessages,
        isGetCartInProgress
    };
};
