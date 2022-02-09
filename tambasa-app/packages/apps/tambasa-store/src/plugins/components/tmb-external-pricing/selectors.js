import { externalPricingSelector, shopperSelector } from '../../selectors'

export const getComponentData = state => {
    const {
        currentOrder,
        isGetCartInProgress,
        displayCartItemSiteInfo
    } = externalPricingSelector(state)

    const {
        isUserLoggedIn
    } = shopperSelector(state)

    return {
        currentOrder,
        isGetCartInProgress,
        displayCartItemSiteInfo,
        isUserLoggedIn
    }
}