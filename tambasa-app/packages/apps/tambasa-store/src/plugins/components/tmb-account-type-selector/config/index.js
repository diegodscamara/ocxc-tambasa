import {
  PAGE_ACCOUNT_PROFILE_LINK,
  PAGE_CHECKOUT_ORDER_CONFIRMATION_LINK
} from '@oracle-cx-commerce/commerce-utils/constants';

export const forbiddenPageTypes = [PAGE_CHECKOUT_ORDER_CONFIRMATION_LINK, PAGE_ACCOUNT_PROFILE_LINK];

const config = {
  properties: [],
  locales: {}
};

export default config;
