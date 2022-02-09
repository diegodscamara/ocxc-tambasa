/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {
  getGlobalContext,
  getSearchResults,
  getTypeaheadSearchResults
} from '@oracle-cx-commerce/commerce-utils/selector';

export const getComponentData = state => {
  const {resultsList: {records = []} = {}} = getTypeaheadSearchResults(state);
  const {searchAdjustments} = getSearchResults(state);
  const {locale} = getGlobalContext(state);

  return {
    records,
    searchAdjustments,
    locale
  };
};
