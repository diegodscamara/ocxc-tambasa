/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {getPage} from '@oracle-cx-commerce/commerce-utils/selector';

export const getPageData = state => {
  const {route = ''} = getPage(state);

  return {
    route
  };
};
