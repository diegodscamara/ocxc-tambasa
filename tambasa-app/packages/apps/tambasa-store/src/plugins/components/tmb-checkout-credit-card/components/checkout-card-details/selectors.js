/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import {getCardTypes} from '@oracle-cx-commerce/commerce-utils/selector';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';

export const getCardDetailsData = state => {
  const cardTypes = getCardTypes(state);

  return {
    cardTypes: !isEmptyObject(cardTypes) ? cardTypes : undefined
  };
};
