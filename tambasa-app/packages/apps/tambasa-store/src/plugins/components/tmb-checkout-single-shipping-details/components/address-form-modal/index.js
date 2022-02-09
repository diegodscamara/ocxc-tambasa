/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useCallback} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Modal from '@oracle-cx-commerce/react-components/modal';
import AddressForm from '../address-form';
import css from './styles.css';
import PropTypes from 'prop-types';

/**
 * Component to display shipping address/billing address form modal
 * It displays the address form to add or edit a shipping/billing address
 * @param props
 */
const AddressFormModal = props => {
  //resources
  const {headingAddAddress, headingEditAddress, closeLinkAltText} = props;
  const {show, isEditAddress, handleCloseAction, cssOverride = ''} = props;

  /**
   * Function to handle the address form modal close
   */
  const handleCloseModal = useCallback(
    payload => {
      handleCloseAction(payload);
    },
    [handleCloseAction]
  );

  return (
    <Styled id="AddressFormModal" css={css}>
      <Modal
        show={show}
        className={'AddressFormModal'}
        onClose={handleCloseModal}
        closeIconTitle={closeLinkAltText}
        closeArialLabel={closeLinkAltText}
        cssOverride={cssOverride}
        title={
          <>
            <span className="AddressFormModal__HeaderText">
              {isEditAddress ? headingEditAddress : headingAddAddress}
            </span>
          </>
        }
      >
        {show && <AddressForm {...props} handleCloseAction={handleCloseModal} />}
      </Modal>
    </Styled>
  );
};

AddressFormModal.propTypes = {
  /**
   * Open or close status of the modal.
   */
  show: PropTypes.bool.isRequired,

  /**
   * Flag to know if address form is opened to edit an address
   */
  isEditAddress: PropTypes.bool.isRequired,

  /** Callback function to handle modal close  */
  handleCloseAction: PropTypes.func.isRequired,

  /** Class name to override css  */
  cssOverride: PropTypes.string
};

AddressFormModal.defaultProps = {
  cssOverride: ''
};

export default React.memo(AddressFormModal);
