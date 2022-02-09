/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {ContainerContext, StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import React, {useCallback, useContext} from 'react';

import Alert from '@oracle-cx-commerce/react-components/alert';
import Modal from '@oracle-cx-commerce/react-components/modal';
import {PAGE_PROFILE_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';

/**
 * Provides delete action on Purchase List
 * @param {*} props
 */
const DeletePurchaseList = props => {
  const {
    actionConfirm,
    actionCancel,
    textDeletePurchaseList,
    textConfirmDeletePurchaseListMessage,
    showDeleteModal,
    toggleDeleteModal,
    cssOverride,
    closeLinkAltText,
    alertPurchaseListDeleted
  } = props;

  const {action} = useContext(StoreContext);
  const {id: purchaseListId} = useContext(ContainerContext);
  const goToPage = useNavigator();

  /**
   * Failure call back for the deletePurchaseList action
   */
  const onNotOk = useCallback(
    ({error: {message = ''} = {}} = {}) => {
      toggleDeleteModal();
      action('notify', {level: 'error', message});
    },
    [action, toggleDeleteModal]
  );

  /**
   * Success call back for the deletePurchaseList action
   */
  const onOk = useCallback(() => {
    toggleDeleteModal();
    goToPage(PAGE_PROFILE_LINK + "?purchase-lists");
    action('notify', {level: 'success', message: alertPurchaseListDeleted});
  }, [action, goToPage, toggleDeleteModal, alertPurchaseListDeleted]);

  /**
   * Handler for deletePurchaseList action invoked on confirm of Delete Purchase List
   * @param {*} event
   */
  const handleDeletePurchaseList = event => {
    event.preventDefault();
    action('notifyClearAll');
    action('deletePurchaseList', {purchaseListId})
      .then(response => {
        if (response.ok === false) {
          onNotOk(response);
        } else {
          onOk();
        }
      })
      .catch(error => {
        onNotOk({error});
      });
  };

  return (
    <Styled id="DeletePurchaseList" css={css}>
      <Modal
        cssOverride={cssOverride}
        show={showDeleteModal}
        onClose={toggleDeleteModal}
        closeIconTitle={closeLinkAltText}
        closeArialLabel={closeLinkAltText}
        title={
          <>
            <span className="DeletePurchaseList__HeaderText">{textDeletePurchaseList}</span>
          </>
        }
      >
        <div className="DeletePurchaseList__Wrapper">
          <div className="DeletePurchaseList__Alert">
            <Alert type="warning" message={textConfirmDeletePurchaseListMessage}></Alert>
          </div>

          <div className="DeletePurchaseList__Buttons">
            <button type="button" className={'DeletePurchaseList__ConfirmButton'} onClick={handleDeletePurchaseList}>
              {actionConfirm}
            </button>
            <button type="button" className={'secondary DeletePurchaseList__CancelButton'} onClick={toggleDeleteModal}>
              {actionCancel}
            </button>
          </div>
        </div>
      </Modal>
    </Styled>
  );
};

export default React.memo(DeletePurchaseList);
