/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import AddressInfo from '../address-info';
import Badge from '@oracle-cx-commerce/react-components/badge';
import Home from '@oracle-cx-commerce/react-components/icons/home';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * Component to view address information.
 * @param {Object} props the properties object
 */
const AddressView = props => {
  const {labelDefaultAddress} = props;
  const {showShippingBadge, address, addressInfoClass} = props;

  return (
    address && (
      <Styled id="AddressView" css={css}>
        <React.Fragment>
          <div className={addressInfoClass}>
            <div className="AddressView__Address">
              <address className="AddressView__Address">
                <AddressInfo address={address} />
              </address>
            </div>
            {showShippingBadge && <Badge className="AddressView__Badge" badgeText={labelDefaultAddress} />}
          </div>
        </React.Fragment>
      </Styled>
    )
  );
};

export default AddressView;
