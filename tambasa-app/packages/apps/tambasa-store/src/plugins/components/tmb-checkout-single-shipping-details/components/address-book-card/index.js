/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Card from '@oracle-cx-commerce/react-components/card';
import AccountAddressView from '@oracle-cx-commerce/react-widgets/profile/account-address-book/components/address-view';
import ProfileAddressView from '@oracle-cx-commerce/react-widgets/profile/profile-address-book/components/address-view';
import UseThisAddress from '../use-this-address';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import PropTypes from 'prop-types';

/**
 * Component to display an account address card.
 * @param {Object} props the properties object
 */
const CheckoutAddressBookCard = props => {
  const {
    itemId,
    contactInfos,
    isB2BUser,
    shippingAddress,
    billingAddress,
    showShippingBadge,
    showBillingBadge,
    itemType
  } = props;

  return (
    contactInfos &&
    contactInfos[itemId] && (
      <Styled id="CheckoutAddressBookCard" css={css}>
        <div key={`${itemType}_${itemId}`} className="CheckoutAddressBookCard__ListItem">
          <Card className="CheckoutAddressBookCard__Card">
            <div className="CheckoutAddressBookCard__AddressView">
              {isB2BUser ? (
                <AccountAddressView
                  {...props}
                  showShippingBadge={showShippingBadge && shippingAddress === itemId}
                  showBillingBadge={showBillingBadge && billingAddress === itemId}
                  address={contactInfos[itemId]}
                  addressInfoClass={`CheckoutAddressBook__Info`}
                />
              ) : (
                <ProfileAddressView
                  {...props}
                  showShippingBadge={shippingAddress === itemId}
                  address={contactInfos[itemId]}
                  addressInfoClass={`CheckoutAddressBook__Info`}
                />
              )}
            </div>
            <UseThisAddress {...props} addressId={itemId} />
          </Card>
        </div>
      </Styled>
    )
  );
};

CheckoutAddressBookCard.propTypes = {
  /** Address id to display */
  itemId: PropTypes.string.isRequired,

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

  /** Default shipping address id */
  shippingAddress: PropTypes.string,

  /** Default billing address id */
  billingAddress: PropTypes.string,

  /** Flag to show shipping address badge */
  showShippingBadge: PropTypes.bool,

  /** Flag to show billing address badge */
  showBillingBadge: PropTypes.bool,

  /** Text to show address type */
  itemType: PropTypes.string
};

CheckoutAddressBookCard.defaultProps = {
  contactInfos: {},
  shippingAddress: '',
  billingAddress: '',
  showShippingBadge: undefined,
  showBillingBadge: undefined,
  itemType: undefined
};

export default React.memo(CheckoutAddressBookCard);
