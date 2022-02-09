import { isAuthenticated, getCurrentProfileId, getProfile } from '@oracle-cx-commerce/commerce-utils/selector'

export const getComponentData = state => {
    const isLoggedIn = isAuthenticated(state) && getCurrentProfileId(state) !== 
    'anonymous'
    let profile = {};
    if (isLoggedIn) 
    profile = getProfile(state)
    return { isLoggedIn, profile }
}