/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React, {useContext} from 'react';
import {CartItemContext} from '@oracle-cx-commerce/react-ui/contexts';
import {t} from '@oracle-cx-commerce/utils/generic';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {useDateFormatter} from '@oracle-cx-commerce/react-components/utils/hooks';

export const BackOrderPreOrderDates = props => {
  //context
  const {commerceItem = {}} = useContext(CartItemContext);
  const formatDate = useDateFormatter();

  return (
    <Styled id="BackOrderPreOrderDates">
      {commerceItem.availabilityDate != null && (
        <div>
          {t(props.messageAvailableDate, {
            AVAILABLEDATE: formatDate(new Date(commerceItem.availabilityDate))
          })}
        </div>
      )}
    </Styled>
  );
};
