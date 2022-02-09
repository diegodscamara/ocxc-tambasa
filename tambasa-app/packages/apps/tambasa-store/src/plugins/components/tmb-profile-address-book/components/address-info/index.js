/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * Component to show information of an address.
 * @param {Object} props the properties object
 */
const AddressInfo = props => {
  const {address} = props;

  return (
    address && (
      <Styled css={css} id="AddressInfo">
        <address className="AddressInfo__Address">
          {address.firstName && address.lastName ? <div>{`${address.firstName} ${address.lastName}`}</div> : ``}
          <div>
            {`${address.address1}`} {address.address2 ? `, ${address.address2}` : ``}
          </div>
          <div>{`${address.city}, ${address.state} ${address.postalCode}`}</div>
          <div>{`${address.country}`}</div>
          {address.phoneNumber && <div>{`${address.phoneNumber}`}</div>}
        </address>
      </Styled>
    )
  );
};

export default AddressInfo;
