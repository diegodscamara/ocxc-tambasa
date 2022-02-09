export * from '../external-pricing';
import { isAuthenticated, getCurrentProfileId, getProfile } from '@oracle-cx-commerce/commerce-utils/selector'

export const shopperSelector = state => {
    const profileId = getCurrentProfileId(state)
    return {    
        isUserLoggedIn: isAuthenticated(state) && profileId !== 'anonymous',
        profile: getProfile(state, { profileId }) 
    }
}
