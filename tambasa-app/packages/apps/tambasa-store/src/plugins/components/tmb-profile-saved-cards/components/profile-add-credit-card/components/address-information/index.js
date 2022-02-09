/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import AddressBookModal from '@oracle-cx-commerce/react-widgets/checkout/checkout-single-shipping-details/components/address-book-modal';
import AddressFormModal from '@oracle-cx-commerce/react-widgets/checkout/checkout-single-shipping-details/components/address-form-modal';
import {HomeDeliveryAddressInformation} from '@oracle-cx-commerce/react-widgets/profile/shipping-information/components/homedelivery-address-information';
import React, {useState, useCallback} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/checkout/checkout-single-shipping-details/components/address-information/styles.css';
import {isAddressValid} from '@oracle-cx-commerce/react-components/utils/address';
import PropTypes from 'prop-types';

/**
 * Component to display the shipping group address and billing address
 * It provides options to edit the shipping/billing address and to select an address from the address book
 * @param props
 */
const AddressInformation = props => {
  //resources
  const {headingAddress, labelEditAddress, labelOpenAddressBook, textOpenAddressBookAndChooseAddress} = props;

  const { isUserLoggedIn, address = {}, isB2BUserProfile} = props;

  const isB2BUser = false;

  const [showAddressBookModal, setShowAddressBookModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  /**
   * Click handler for the 'Open Address Book' button
   */
  const openAddressBookModal = () => {
    setShowAddressBookModal(true);
  };

  /**
   * Function to handle the address book modal close
   */
  const handleCloseAddressBookModal = useCallback(() => {
    setShowAddressBookModal(false);
  }, []);

  /**
   * Click handler for the 'Edit Address' button
   */
  const openAddressFormModal = () => {
    setShowAddressModal(true);
  };

  /**
   * Function to handle the edit address modal close
   */
  const handleCloseAddressFormModal = useCallback(() => {
    setShowAddressModal(false);
  }, []);

  return (
    <Styled id="AddressInformation" css={css}>
      <div className="AddressInformation">
        <div className="AddressInformation__Container">
          {/* Address */}
          {isAddressValid(address, isB2BUser) && (
            <HomeDeliveryAddressInformation address={address} headingAddress={headingAddress} />
          )}

          {/* Show message when Address not displaying */}
          {isUserLoggedIn && !isAddressValid(address, isB2BUser) && (
            <div className="AddressInformation__NoAddressAvailable">{textOpenAddressBookAndChooseAddress}</div>
          )}

          <div className="AddressInformation__Buttons">
            {/* Edit Address */}
            {isAddressValid(address, isB2BUser) && !isB2BUserProfile &&  (
              <button type="button" className="AddressInformation__EditButton" onClick={openAddressFormModal}>
                {labelEditAddress}
              </button>
            )}

            {/* Open Address Book */}
            {isUserLoggedIn && !isB2BUserProfile && (
              <button
                type="button"
                className="AddressInformation__OpenAddressBookButton"
                onClick={openAddressBookModal}
              >
                {labelOpenAddressBook}
              </button>
            )}
          </div>
        </div>

        {/* Address Book Modal */}
        <AddressBookModal
          {...props}
          show={showAddressBookModal}
          handleCloseAction={handleCloseAddressBookModal}
        ></AddressBookModal>

        {/* Edit Address Modal */}
        <AddressFormModal
          {...props}
          show={showAddressModal}
          isEditAddress={true}
          onActionComplete={handleCloseAddressFormModal}
          handleCloseAction={handleCloseAddressFormModal}
        ></AddressFormModal>
      </div>
    </Styled>
  );
};

AddressInformation.propTypes = {
  /**
   * Type of the shopper.
   */
  isB2BUser: PropTypes.bool.isRequired,

  /**
   * Logged in status of the user.
   */
  isUserLoggedIn: PropTypes.bool.isRequired,

  /**
   * This is the address object for rendering the view
   */
  address: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address1: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
    country: PropTypes.string,
    phoneNumber: PropTypes.string
  }),

  /**
   * Flag to know if this component is rendered for multi-shipping-widget
   */
  isMultiShipping: PropTypes.bool
};

AddressInformation.defaultProps = {
  address: {},
  isMultiShipping: undefined
};

export default AddressInformation;
