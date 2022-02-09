/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import IterateListItems from '@oracle-cx-commerce/react-components/load-more/list-items';
import CheckoutAddressBookCard from '../address-book-card';
import css from './styles.css';
import PropTypes from 'prop-types';

/**
 * Component to render list of address cards
 * @param {Object} props the properties object
 */
const CheckoutAddressListView = props => {
  // resources
  const {labelNoAddresses} = props;
  const {
    contactInfos,
    addressIds,
    showMoreAction,
    itemType,
    shippingAddress,
    billingAddress,
    showShippingBadge,
    showBillingBadge,
    selectThisAddress
  } = props;

  return (
    <Styled id="CheckoutAddressListView" css={css}>
      <div className="CheckoutAddressListView">
        {contactInfos && addressIds && addressIds.length > 0 ? (
          <IterateListItems
            {...props}
            child={CheckoutAddressBookCard}
            listOFItems={addressIds}
            showMoreAction={showMoreAction}
            itemType={itemType}
            shippingAddress={shippingAddress}
            billingAddress={billingAddress}
            showShippingBadge={showShippingBadge}
            showBillingBadge={showBillingBadge}
            selectThisAddress={selectThisAddress}
          ></IterateListItems>
        ) : (
          <div className="CheckoutAddressListView__NoAddress">
            <span>{labelNoAddresses}</span>
          </div>
        )}
      </div>
    </Styled>
  );
};

CheckoutAddressListView.propTypes = {
  // eslint-disable-next-line spellcheck/spell-checker
  /**
   * The contactInfos (address) object from redux state(ProfileRepository->contactInfos)
   */
  contactInfos: PropTypes.objectOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      address1: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      postalCode: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string
    })
  ),

  /** Default shipping address */
  addressIds: PropTypes.arrayOf(PropTypes.string),

  /** Show icon to display more actions popover */
  showMoreAction: PropTypes.bool,

  /** Text to show address type */
  itemType: PropTypes.string.isRequired,

  /** Default shipping address id */
  shippingAddress: PropTypes.string,

  /** Default billing address id */
  billingAddress: PropTypes.string,

  /** Flag to show shipping address badge */
  showShippingBadge: PropTypes.bool,

  /** Flag to show billing address badge */
  showBillingBadge: PropTypes.bool,

  /** Callback function to handle selection of address */
  selectThisAddress: PropTypes.func.isRequired
};

CheckoutAddressListView.defaultProps = {
  contactInfos: {},
  addressIds: [],
  shippingAddress: '',
  billingAddress: '',
  showMoreAction: undefined,
  showBillingBadge: undefined,
  showShippingBadge: undefined
};

export default React.memo(CheckoutAddressListView);
