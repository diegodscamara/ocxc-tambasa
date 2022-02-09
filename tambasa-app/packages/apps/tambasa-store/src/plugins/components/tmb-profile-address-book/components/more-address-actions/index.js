/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useCallback, useContext, useState} from 'react';

import ConfirmationDialog from '@oracle-cx-commerce/react-components/confirmation-dialog';
import HorizontalGearIcon from '@oracle-cx-commerce/react-components/icons/horizontal-gear';
import {PAGE_EDIT_PROFILE_ADDRESS_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import Popover from '@oracle-cx-commerce/react-components/popover';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';

/**
 * Component to display address actions popover and horizontal gear icon.
 * @param {Object} props the properties object
 */
const MoreAddressActions = props => {
  const {
    actionEdit,
    actionDelete,
    actionMakeDefault,
    actionRemoveFromDefault,
    textAddressActions,
    closeLinkAltText,
    headingDeleteProfileAddress,
    textAddressDeletionMessage,
    textConfirmAddressDeletionMessage,
    actionConfirm,
    actionCancel
  } = props;

  const {id, itemId, cssOverride, contactInfos, defaultShippingAddressId, handlePopoverToggle, showMenuPopover} = props;

  const {action} = useContext(StoreContext);
  const goToPage = useNavigator();

  const makeOrRemoveDefaultShippingAddress = (addressId, defaultShippingAddressId) => {
    if (addressId === defaultShippingAddressId) {
      /* This block executes when removed default address */
      const address = contactInfos[addressId];
      action('updateProfileAddress', {addressId, ...address, isDefaultShippingAddress: false});
    } else {
      action('updateDefaultProfileAddress', {addressId});
    }
  };

  const handleEditAddress = addressId => {
    props.setEditingAddresId(addressId);
    props.setCurrentPage("editing");
  };

  const [showDeleteAddressModal, setShowDeleteAddressModal] = useState(false);

  const confirmCallback = useCallback(() => {
    setShowDeleteAddressModal(false);
    action('deleteProfileAddress', {addressId: itemId});
  }, [action, itemId]);

  const cancelCallback = useCallback(() => {
    setShowDeleteAddressModal(false);
  }, []);

  const getAddressActions = addressId => {
    const popoverKey = `${addressId}`;

    return (
      <React.Fragment>
        <li>
          <div
            key={`ProfileAddressActionsEdit_${addressId}`}
            onClick={() => {
              handlePopoverToggle(popoverKey);
              handleEditAddress(addressId);
            }}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handlePopoverToggle(popoverKey);
                handleEditAddress(addressId);
              }
            }}
            role="button"
            tabIndex={0}
            className="MoreAddressActions__Edit"
          >
            {actionEdit}
          </div>
        </li>
        <li>
          <div
            key={`ProfileAddressActionsDelete_${addressId}`}
            onClick={() => {
              handlePopoverToggle(popoverKey);
              setShowDeleteAddressModal(true);
            }}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handlePopoverToggle(popoverKey);
                setShowDeleteAddressModal(true);
              }
            }}
            role="button"
            tabIndex={0}
            className="MoreAddressActions__Delete"
          >
            {actionDelete}
          </div>
        </li>
        <li>
          <div
            key={`ProfileAddressActionsMakeDefault_${addressId}`}
            onClick={() => {
              handlePopoverToggle(popoverKey);
              makeOrRemoveDefaultShippingAddress(addressId, defaultShippingAddressId);
            }}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handlePopoverToggle(popoverKey);
                makeOrRemoveDefaultShippingAddress(addressId, defaultShippingAddressId);
              }
            }}
            role="button"
            tabIndex={0}
            className="MoreAddressActions__MakeDefault"
          >
            {itemId === defaultShippingAddressId ? actionRemoveFromDefault : actionMakeDefault}
          </div>
        </li>
      </React.Fragment>
    );
  };

  return (
    <Styled id="MoreAddressActions" css={css}>
      <ConfirmationDialog
        id={id}
        cssOverride={cssOverride}
        title={headingDeleteProfileAddress}
        closeAriaLabel={closeLinkAltText}
        closeIconTitle={closeLinkAltText}
        alertMessage={textAddressDeletionMessage}
        confirmMessage={textConfirmAddressDeletionMessage}
        labelConfirm={actionConfirm}
        labelCancel={actionCancel}
        confirmCallback={confirmCallback}
        cancelCallback={cancelCallback}
        closeCallback={cancelCallback}
        show={showDeleteAddressModal}
      />
      <div className="MoreAddressActions__Icon">
        <HorizontalGearIcon
          tabIndex={0}
          aria-label={textAddressActions}
          className="MoreAddressActions__HorizontalGearIcon"
          onKeyPress={event => (event.key === 'Enter' ? handlePopoverToggle(itemId) : '')}
          onClick={() => {
            handlePopoverToggle(itemId);
          }}
        />
        <Popover
          id={`Popover_${itemId}`}
          key={`Popover_${itemId}`}
          className="MoreAddressActions__Popover"
          show={showMenuPopover}
          title=""
          onClose={() => {
            handlePopoverToggle(itemId);
          }}
          closeIconTitle={closeLinkAltText}
        >
          <ul role="presentation">{getAddressActions(itemId)}</ul>
        </Popover>
      </div>
    </Styled>
  );
};

export default MoreAddressActions;
