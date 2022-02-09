/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useCallback, useContext, useRef, useEffect} from 'react';

import Modal from '@oracle-cx-commerce/react-components/modal';
import {StoreContext, ContainerContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import Form from '@oracle-cx-commerce/react-components/form';
import {formToJson} from '@oracle-cx-commerce/react-components/utils';

/**
 * Provides edit action on Purchase List
 * @param {*} props
 */
const EditPurchaseList = props => {
  const {
    actionSave,
    actionCancel,
    textEditPurchaseList,
    showEditModal,
    toggleEditModal,
    textAllFieldsRequired,
    labelListName,
    labelDescriptionOptional,
    cssOverride,
    closeLinkAltText,
    alertPurchaseListUpdated
  } = props;

  const {action} = useContext(StoreContext);
  const {
    id: purchaseListId,
    name: purchaseListName,
    description: purchaseListDescription
  } = useContext(ContainerContext);

  const nameInputParam = useRef();
  const descriptionInputParam = useRef();

  // clear unsaved changes from the edit purchase list form
  useEffect(() => {
    if (!showEditModal) {
      if (nameInputParam.current) {
        nameInputParam.current.form.classList.remove('invalid');
        nameInputParam.current.value = purchaseListName;
      }

      if (descriptionInputParam.current) {
        descriptionInputParam.current.value = purchaseListDescription;
      }
    }
  }, [purchaseListDescription, purchaseListName, showEditModal]);

  /**
   * success callback method when edit purchase list details form submitted
   */
  const onOk = useCallback(() => {
    toggleEditModal();
    action('notify', {level: 'success', message: alertPurchaseListUpdated});
  }, [action, toggleEditModal, alertPurchaseListUpdated]);

  /**
   * failure callback method for edit purchase list details form submitted
   */
  const onNotOk = useCallback(
    ({error: {message = ''} = {}} = {}) => {
      toggleEditModal();
      action('notify', {level: 'error', message});
    },
    [action, toggleEditModal]
  );

  /**
   * Handler for updatePurchaseList action invoked on submit of Edit Purchase List
   * @param {*} event
   */
  const handleEditPurchaseList = event => {
    event.preventDefault();
    action('notifyClearAll');
    const form = event.target;
    const formData = formToJson(form);

    action('updatePurchaseList', {
      purchaseListId,
      name: formData.purchaseListName,
      description: formData.purchaseListDescription
    })
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
    <Styled id="EditPurchaseList" css={css}>
      <Modal
        cssOverride={cssOverride}
        show={showEditModal}
        onClose={toggleEditModal}
        closeIconTitle={closeLinkAltText}
        closeArialLabel={closeLinkAltText}
        title={
          <>
            <span className="EditPurchaseList__HeaderText">{textEditPurchaseList}</span>
          </>
        }
      >
        <div className="EditPurchaseList__AllFieldsRequiredText">{textAllFieldsRequired}</div>
        <div className="EditPurchaseList__Wrapper">
          <Form onSubmit={handleEditPurchaseList} noValidate={true}>
            <div className="EditPurchaseList__InputElement">
              {/* listName */}
              <label htmlFor="purchaseListName">{labelListName}</label>
              <input
                type="text"
                id="purchaseListName"
                name="purchaseListName"
                data-testid="purchaseListName"
                autoCapitalize="words"
                defaultValue={purchaseListName}
                ref={nameInputParam}
                required
                maxLength="254"
              />
              <span className="validationMessage"></span>
            </div>
            <div className="EditPurchaseList__InputElement">
              {/* listDescription */}
              <label htmlFor="purchaseListDescription">{labelDescriptionOptional}</label>
              <textarea
                type="text"
                id="purchaseListDescription"
                name="purchaseListDescription"
                data-testid="purchaseListDescription"
                autoCapitalize="sentences"
                defaultValue={purchaseListDescription}
                ref={descriptionInputParam}
                rows="4"
                maxLength="254"
              />
              <span className="validationMessage"></span>
            </div>
            <div className="EditPurchaseList__Buttons">
              <button data-testid="submitButton" type="submit" className={'EditPurchaseList__SubmitButton'}>
                {actionSave}
              </button>
              <button
                data-testid="cancelButton"
                type="button"
                className={'secondary EditPurchaseList__CancelButton'}
                onClick={toggleEditModal}
              >
                {actionCancel}
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </Styled>
  );
};

export default React.memo(EditPurchaseList);
