/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {getTypeaheadSearchResults} from '@oracle-cx-commerce/commerce-utils/selector';

export const getSearchResults = state => {
  const {resultsList: {records = []} = {}} = getTypeaheadSearchResults(state);

  return {
    records
  };
};
