/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useCallback, useContext} from 'react';

import Modal from '@oracle-cx-commerce/react-components/modal';
import {StoreContext, ContainerContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import Form from '@oracle-cx-commerce/react-components/form';
import {formToJson} from '@oracle-cx-commerce/react-components/utils';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';

const CopyPurchaseList = props => {
  const {
    labelCopy,
    actionCancel,
    textCopyPurchaseList,
    showCopyModal,
    toggleCopyModal,
    labelListName,
    cssOverride,
    closeLinkAltText,
    alertPurchaseListCreated
  } = props;

  const {action} = useContext(StoreContext);
  const {accountId, siteId, purchaseListItems} = useContext(ContainerContext);
  const goToPage = useNavigator();
  const purchaseListDetailsPage = '/purchase-list-details';

  /**
   * success callback method when copy purchase list details form submitted
   */
  const onOk = useCallback(
    purchaseListId => {
      action('notify', {level: 'success', message: alertPurchaseListCreated});
      goToPage(`${purchaseListDetailsPage}/${purchaseListId}`);
    },
    [action, alertPurchaseListCreated, goToPage]
  );

  /**
   * failure callback method for copy purchase list details form submitted
   */
  const onNotOk = useCallback(
    ({error: {message = ''} = {}} = {}) => {
      action('notify', {level: 'error', message});
    },
    [action]
  );

  /**
   * Handler for createPurchaseList action invoked on save of Copy Purchase List
   * @param {*} event
   */
  const handleCopyPurchaseList = event => {
    event.preventDefault();

    action('notifyClearAll');
    const form = event.target;
    const formData = formToJson(form);
    const items = Object.values(purchaseListItems);

    action('createPurchaseList', {
      name: formData.purchaseListName,
      items,
      accountId,
      siteId
    })
      .then(response => {
        if (response.ok === false) {
          onNotOk(response);
        } else {
          onOk(response.json.id);
        }
      })
      .catch(error => {
        onNotOk({error});
      });
  };

  const handleCancel = () => {
    toggleCopyModal();
  };

  return (
    <Styled id="CopyPurchaseList" css={css}>
      <Modal
        cssOverride={cssOverride}
        show={showCopyModal}
        onClose={handleCancel}
        closeIconTitle={closeLinkAltText}
        closeArialLabel={closeLinkAltText}
        title={
          <>
            <span className="CopyPurchaseList__HeaderText">{textCopyPurchaseList}</span>
          </>
        }
      >
        <div className="CopyPurchaseList__Wrapper">
          <Form onSubmit={handleCopyPurchaseList} noValidate={true}>
            <div className="CopyPurchaseList__InputElement">
              {/* listName */}
              <label htmlFor="purchaseListName">{labelListName}</label>
              <input
                type="text"
                id="purchaseListName"
                name="purchaseListName"
                data-testid="purchaseListName"
                autoCapitalize="words"
                required
                maxLength="254"
              />
              <span className="validationMessage"></span>
            </div>
            <div className="CopyPurchaseList__Buttons">
              <button data-testid="submitButton" type="submit" className={'CopyPurchaseList__SubmitButton'}>
                {labelCopy}
              </button>
              <button
                data-testid="cancelButton"
                type="button"
                className={'secondary CopyPurchaseList__CancelButton'}
                onClick={handleCancel}
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

export default React.memo(CopyPurchaseList);
