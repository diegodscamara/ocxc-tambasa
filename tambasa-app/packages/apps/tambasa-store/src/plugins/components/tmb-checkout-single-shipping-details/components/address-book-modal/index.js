/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useCallback} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Modal from '@oracle-cx-commerce/react-components/modal';
import {noop} from '@oracle-cx-commerce/utils/generic';
import CheckoutAccountAddressBook from '@oracle-cx-commerce/react-widgets/checkout/checkout-single-shipping-details/components/account-address-book';
import CheckoutAddressBook from '@oracle-cx-commerce/react-widgets/checkout/checkout-single-shipping-details/components/address-book';
import css from './styles.css';
import PropTypes from 'prop-types';

/**
 * Component to display address book modal
 * It displays the address book, User can select an address as shipping-address or billing address
 * @param props
 */
const AddressBookModal = props => {
  // resources
  const {actionCancel, closeLinkAltText, labelAddressBook, textAccountAddressBook} = props;

  const {show, handleCloseAction, isB2BUser, onAddressUpdated = noop, currentProfile, cssOverride = ''} = props;

  /**
   * Function to handle the address book modal close
   */
  const handleCloseModal = useCallback(
    payload => {
      handleCloseAction(payload);
    },
    [handleCloseAction]
  );

  /**
   * Handler when Use-This-Address button clicked
   * @param {*} address
   */
  const handleSelectAddress = useCallback(
    selectedAddress => {
      /* for b2b user, firstName, lastName is not available for account-address, take it from current-profile */
      const address = {
        ...selectedAddress,
        firstName: selectedAddress.firstName || currentProfile.firstName,
        lastName: selectedAddress.lastName || currentProfile.lastName
      };

      // The selected address need to be passed back to the parent component.
      // isEditAddress: true will display a proper notification message on address selection
      onAddressUpdated({address, handleCloseAction, isEditAddress: true});
    },
    [currentProfile.firstName, currentProfile.lastName, handleCloseAction, onAddressUpdated]
  );

  return (
    <Styled id="AddressBookModal" css={css}>
      <Modal
        show={show}
        className="AddressBookModal"
        onClose={handleCloseModal}
        closeIconTitle={closeLinkAltText}
        closeArialLabel={closeLinkAltText}
        cssOverride={cssOverride}
        title={
          <>
            <span className="AddressBookModal__HeaderText">
              {isB2BUser ? textAccountAddressBook : labelAddressBook}
            </span>
          </>
        }
      >
        {show && (
          <div className="AddressBookModal__Body">
            {isB2BUser ? (
              <CheckoutAccountAddressBook
                {...props}
                handleSelectAddress={handleSelectAddress}
              ></CheckoutAccountAddressBook>
            ) : (
              <CheckoutAddressBook {...props} handleSelectAddress={handleSelectAddress}></CheckoutAddressBook>
            )}
          </div>
        )}
        <div className="AddressBookModal__Buttons">
          <button type="button" className="secondary" onClick={handleCloseModal}>
            {actionCancel}
          </button>
        </div>
      </Modal>
    </Styled>
  );
};

AddressBookModal.propTypes = {
  /**
   * Open or close status of the modal.
   */
  show: PropTypes.bool.isRequired,

  /** Callback function to handle modal close  */
  handleCloseAction: PropTypes.func.isRequired,

  /**
   * Type of the shopper.
   */
  isB2BUser: PropTypes.bool.isRequired,

  /** Callback function to handle save or update address */
  onAddressUpdated: PropTypes.func.isRequired,
  /**
   * This is the object to get the current profile
   */
  currentProfile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }).isRequired,

  /** Class name to override css  */
  cssOverride: PropTypes.string
};

AddressBookModal.defaultProps = {
  cssOverride: ''
};

export default AddressBookModal;
