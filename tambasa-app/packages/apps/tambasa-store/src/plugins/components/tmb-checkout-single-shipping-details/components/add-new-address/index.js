/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useState, useCallback} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Plus from '@oracle-cx-commerce/react-components/icons/plus';
import AddressFormModal from '../address-form-modal';
import css from './styles.css';

/**
 * Component to add a new shipping/billing address
 * @param props
 */
const AddNewAddress = props => {
  // resource
  const {labelAddANewAddress} = props;
  const [showAddressFormModal, setShowAddressFormModal] = useState(false);

  /**
   * Function to handle the modal close
   */
  const handleCloseAddressFormModal = useCallback(() => {
    setShowAddressFormModal(false);
  }, []);

  return (
    <Styled id="AddNewAddress" css={css}>
      <div className="AddNewAddress">
        <div
          role="button"
          tabIndex="0"
          className="AddNewAddress__Container"
          aria-label={labelAddANewAddress}
          onClick={() => {
            setShowAddressFormModal(true);
          }}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              setShowAddressFormModal(true);
            }
          }}
        >
          <span className="AddNewAddress__Icon">
            <Plus />
          </span>
        </div>

        {/* Add New Address Modal */}
        <AddressFormModal
          {...props}
          show={showAddressFormModal}
          isEditAddress={false}
          handleCloseAction={handleCloseAddressFormModal}
        ></AddressFormModal>
      </div>
    </Styled>
  );
};

AddNewAddress.propTypes = {};

AddNewAddress.defaultProps = {};

export default React.memo(AddNewAddress);
