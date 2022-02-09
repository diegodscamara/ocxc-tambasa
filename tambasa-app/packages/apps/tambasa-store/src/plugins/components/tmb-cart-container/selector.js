import {
    getCartEndpointStatus,
    getGiftWithPurchaseMessages,
    getCurrentOrder,
    getSkuInventoryItems,
    getCurrentOrderId
} from '@oracle-cx-commerce/commerce-utils/selector';

export const getComponentData = state => {
    const currentOrder = getCurrentOrder(state);
    const skuInventory = getSkuInventoryItems(state);
    const totalGwpMessages = getGiftWithPurchaseMessages(state) || {};
    const giftWithPurchaseMessages = totalGwpMessages[getCurrentOrderId(state)]
        ? totalGwpMessages[getCurrentOrderId(state)].messages
        : [];

    const isGetCartInProgress = getCartEndpointStatus(state);

    return {
        currentOrder,
        skuInventory,
        giftWithPurchaseMessages,
        isGetCartInProgress
    };
};
