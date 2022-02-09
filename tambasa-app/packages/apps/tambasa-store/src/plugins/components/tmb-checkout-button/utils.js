import {PAGE_CHECKOUT_LOGIN_LINK, PAGE_CHECKOUT_SHIPPING_LINK} from '@oracle-cx-commerce/commerce-utils/constants';

/**
 * Returns the checkout link based on the user authentication
 * Override this method if the checkout page has a different link
 * For example: 'checkout' (instead of 'checkout-shipping) for a single page checkout application
 * @param {boolean} isUserLoggedIn param to indicate if the user is logged in or not
 * @returns {String} returns the checkout link to be redirected to
 */
export const getCheckoutLink = isUserLoggedIn => {
return isUserLoggedIn ? PAGE_CHECKOUT_SHIPPING_LINK : PAGE_CHECKOUT_LOGIN_LINK;
};
