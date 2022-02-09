import { isAuthenticated, getCurrentProfileId } from '@oracle-cx-commerce/commerce-utils/selector'

export const getComponentData = state => {
    const isLoggedIn = isAuthenticated(state) && getCurrentProfileId(state) !== 'anonymous'
    return { isLoggedIn }
}