/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useCallback, useContext, useEffect, useState, useRef} from 'react';
import Modal from '@oracle-cx-commerce/react-components/modal';
import {StoreContext, ContainerContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import Form from '@oracle-cx-commerce/react-components/form';
import {getShareSettings, getEmailConfigs} from '@oracle-cx-commerce/commerce-utils/selector';
import {formToJson} from '@oracle-cx-commerce/react-components/utils';
import OrganizationSharing from '@oracle-cx-commerce/react-widgets/profile/profile-purchase-list-action-buttons/components/organization-sharing';
import EmailSharing from '@oracle-cx-commerce/react-widgets/profile/profile-purchase-list-action-buttons/components/email-sharing';
import {noop, isEmptyObject, uuid} from '@oracle-cx-commerce/utils/generic';

/**
 * Purchase List Share Settings
 * Allows user to share a Purchase List with Account or Email Address
 * @param {*} props
 */
const ShareSettings = props => {
  const {
    showShareModal,
    toggleShareModal,
    textCanEdit,
    textReadOnly,
    actionSave,
    actionCancel,
    alertPurchaseListSharingUpdated,
    orgId
  } = props;

  const {action, getState} = useContext(StoreContext);
  const {id: purchaseListId} = useContext(ContainerContext);

  const originalAccountSharing = useRef();
  const addAccountCommentParam = useRef();
  const addEmailCommentParam = useRef();

  const [emailList, setEmailList] = useState([]);
  const [newEmailList, setNewEmailList] = useState([]);
  const [deletedEmailList, setDeletedEmailList] = useState([]);
  const [shareSetting, setShareSetting] = useState({
    organizationSharingEnabled: false,
    emailSharingEnabled: false,
    id: '',
    defaultEditEnabled: false,
    relativeTo: '',
    sharedEmailConfigs: [],
    sharedResourceType: ''
  });
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const permissions = [
    {id: 1, value: textCanEdit, name: textCanEdit},
    {id: 2, value: textReadOnly, name: textReadOnly}
  ];

  /**
   * handler for adding share permissions to newly added email config
   */
  const handleNewEmailPermissions = useCallback(
    id => {
      const sharePermission = {
        id: `emailPermission-${id}`,
        permission: textReadOnly
      };
      setSelectedPermissions([...selectedPermissions, sharePermission]);
    },
    [selectedPermissions, textReadOnly]
  );

  /**
   * handler for adding new email config
   */
  const handleNewEmail = () => {
    const newItem = {
      email: '',
      editEnabled: false,
      key: uuid()
    };
    handleNewEmailPermissions(newItem.key);
    setNewEmailList([...newEmailList, newItem]);
  };

  /**
   * handler for changing share settings in checkbox
   * @param {*} e
   */
  const handleCheckedChange = e => {
    if (e.target.name === 'organizationSharingEnabled') {
      if (e.target.checked === true) {
        setShareSetting({
          ...shareSetting,
          [e.target.name]: e.target.checked
        });
        setSelectedPermissions([
          ...selectedPermissions,
          {
            id: 'accountPermission',
            permission: textReadOnly
          }
        ]);
      } else if (e.target.checked === false) {
        setShareSetting({
          ...shareSetting,
          [e.target.name]: e.target.checked,
          defaultEditEnabled: false
        });
      }
    } else if (e.target.name === 'emailSharingEnabled') {
      setShareSetting({
        ...shareSetting,
        [e.target.name]: e.target.checked
      });
      if (e.target.checked === true && newEmailList.length === 0) {
        handleNewEmail();
      }
    }
  };

  /**
   * handler for changing share permissions in drop down
   */
  const onDropdownValueChange = useCallback(
    event => {
      if (event.target.id.split('-')[0] === 'emailPermission') {
        const updatedEmailList = emailList.map(emailItem => {
          if (emailItem.id === event.target.id.split('-')[1]) {
            return {
              ...emailItem,
              editEnabled: event.target.value === textCanEdit ? true : false
            };
          }

          return emailItem;
        });
        setEmailList(updatedEmailList);

        const updatedNewEmailList = newEmailList.map(emailItem => {
          if (emailItem.key === event.target.id.split('-')[1]) {
            return {
              ...emailItem,
              editEnabled: event.target.value === textCanEdit ? true : false
            };
          }

          return emailItem;
        });
        setNewEmailList(updatedNewEmailList);
      } else if (event.target.id === 'accountPermission') {
        setShareSetting({
          ...shareSetting,
          defaultEditEnabled: event.target.value === textCanEdit ? true : false
        });
      }

      const updatedSelectedPermissions = selectedPermissions.map(selectedPermission => {
        if (selectedPermission.id === event.target.id) {
          return {
            ...selectedPermission,
            permission: event.target.value === textCanEdit ? textCanEdit : textReadOnly
          };
        }

        return selectedPermission;
      });
      setSelectedPermissions(updatedSelectedPermissions);
    },
    [emailList, newEmailList, selectedPermissions, shareSetting, textCanEdit, textReadOnly]
  );

  /**
   * success callback method
   */
  const onOk = useCallback(() => {
    toggleShareModal();
    action('notify', {level: 'success', message: alertPurchaseListSharingUpdated});
  }, [action, alertPurchaseListSharingUpdated, toggleShareModal]);

  /**
   * failure callback method
   */
  const onNotOk = useCallback(
    ({error: {message = ''} = {}} = {}) => {
      if (showShareModal) {
        toggleShareModal();
      }
      action('notify', {level: 'error', message});
    },
    [action, showShareModal, toggleShareModal]
  );

  useEffect(() => {
    if (!showShareModal) {
      if (addAccountCommentParam.current) {
        addAccountCommentParam.current.value = '';
      }
      if (addEmailCommentParam.current) {
        addEmailCommentParam.current.value = '';
      }
      if (newEmailList.length) {
        setNewEmailList([]);
      }
      if (deletedEmailList.length) {
        setDeletedEmailList([]);
      }
      if (shareSetting.id === '') {
        setShareSetting({
          organizationSharingEnabled: false,
          emailSharingEnabled: false,
          id: '',
          defaultEditEnabled: false,
          relativeTo: '',
          sharedEmailConfigs: [],
          sharedResourceType: ''
        });
        setSelectedPermissions([]);
      }
    }
  }, [deletedEmailList.length, newEmailList.length, shareSetting.id, showShareModal]);

  /**
   * Get the share settings for the purchase list
   */
  useEffect(() => {
    if (purchaseListId && showShareModal) {
      let q;
      if (orgId) {
        q = `relativeTo eq "${purchaseListId}" AND account.Id eq "${orgId}"`;
      } else {
        q = `relativeTo eq "${purchaseListId}"`;
      }
      action('listShareSettings', {q})
        .then(response => {
          if (response.ok === false) {
            onNotOk(response);
          } else if (response.json.items && response.json.items.length > 0) {
            const shareSetting = getShareSettings(getState())[response.json.items[0].id];
            shareSetting.emailSharingEnabled = false;
            originalAccountSharing.current = shareSetting.organizationSharingEnabled;
            const emailIds = shareSetting.sharedEmailConfigs;
            const sharePermissions = [];
            let emailItems = [];

            if (shareSetting.organizationSharingEnabled) {
              sharePermissions.push({
                id: 'accountPermission',
                permission: shareSetting.defaultEditEnabled ? textCanEdit : textReadOnly
              });
            }

            if (emailIds && Array.isArray(emailIds) && emailIds.length) {
              shareSetting.emailSharingEnabled = true;
              const emailConfigs = getEmailConfigs(getState());
              for (let i = 0; i < emailIds.length; i++) {
                const sharePermission = {
                  id: `emailPermission-${emailIds[i]}`,
                  permission: emailConfigs[emailIds[i]].editEnabled ? textCanEdit : textReadOnly
                };
                sharePermissions.push(sharePermission);
              }
              emailItems = emailIds.map(id => emailConfigs[id]);
            }
            setShareSetting(shareSetting);
            setSelectedPermissions(sharePermissions);
            setEmailList(emailItems);
          }
        })
        .catch(error => {
          onNotOk({error});
        });
    }
  }, [action, onNotOk, orgId, purchaseListId, getState, textCanEdit, textReadOnly, showShareModal]);

  const handleEmailConfigs = (shareSettingId, addEmailComment, addAccountComment) => {
    const emailConfigs = getEmailConfigs(getState());

    const newEmails = [];
    const updatedEmails = [];
    const deletedEmails = [];
    deletedEmails.push(...deletedEmailList);
    if (shareSetting.emailSharingEnabled === false) {
      if (emailList.length > 0) {
        deletedEmails.push(...emailList);
      }
    } else if (shareSetting.emailSharingEnabled === true) {
      for (let i = 0; i < newEmailList.length; i++) {
        if (newEmailList[i].email !== '') {
          const {key, ...item} = newEmailList[i];
          newEmails.push(item);
        }
      }
      for (let i = 0; i < emailList.length; i++) {
        if (
          emailList[i].email !== emailConfigs[emailList[i].id].email ||
          emailList[i].editEnabled !== emailConfigs[emailList[i].id].editEnabled
        ) {
          updatedEmails.push(emailList[i]);
        }
      }
    }

    const createPromise = newEmails.length
      ? action('createEmailConfigs', {
          shareSettingId,
          emailConfigs: newEmails,
          addEmailComment
        }).catch(error => {
          onNotOk({error});
        })
      : null;

    const updatePromise = updatedEmails.length
      ? action('updateEmailConfigs', {
          shareSettingId,
          emailConfigs: updatedEmails,
          addEmailComment
        }).catch(error => {
          onNotOk({error});
        })
      : null;

    const deletePromise = deletedEmails.length
      ? action('deleteEmailConfigs', {
          shareSettingId,
          emailConfigs: deletedEmails
        }).catch(error => {
          onNotOk({error});
        })
      : null;

    Promise.all([createPromise, updatePromise, deletePromise]).then(responses => {
      let payload;
      if (orgId) {
        payload = {
          shareSettingId,
          defaultEditEnabled: shareSetting.defaultEditEnabled,
          organizationSharingEnabled: shareSetting.organizationSharingEnabled,
          relativeTo: purchaseListId,
          account: {id: orgId},
          comments: addAccountComment || ''
        };
      } else {
        payload = {
          shareSettingId,
          relativeTo: purchaseListId
        };
      }

      action('updateShareSetting', payload)
        .then(response => {
          responses.push(response);
          const failedAction = responses.find(element => element != null && element.ok === false);
          if (isEmptyObject(failedAction)) {
            onOk();
          } else {
            responses.forEach(response => {
              if (response != null && response.ok === false) {
                onNotOk(response);
              }
            });
          }
        })
        .catch(error => {
          onNotOk({error});
        });
    });
  };

  /**
   * Handler for share settings related actions
   * @param {*} event
   */
  const handleSharePurchaseList = event => {
    event.preventDefault();
    action('notifyClearAll');
    const form = event.target;
    const formData = formToJson(form);

    if (shareSetting && shareSetting.id === '') {
      action('createShareSetting', {
        relativeTo: purchaseListId,
        account: orgId,
        sharedResourceType: 'purchaseList',
        organizationSharingEnabled: shareSetting.organizationSharingEnabled,
        defaultEditEnabled: shareSetting.defaultEditEnabled,
        comments: formData.addAccountComment || ''
      })
        .then(response => {
          if (response.ok === false) {
            onNotOk(response);
          } else if (response.delta.purchaseListRepository) {
            const obj = response.delta.purchaseListRepository.shareSettings;
            const shareSettingId = obj[Object.keys(obj)[0]].id;
            handleEmailConfigs(shareSettingId, formData.addEmailComment);
          }
        })
        .catch(error => {
          onNotOk({error});
        });
    } else {
      handleEmailConfigs(shareSetting.id, formData.addEmailComment, formData.addAccountComment);
    }
  };

  return (
    <Styled id="ShareSettings" css={css}>
      <Form onSubmit={handleSharePurchaseList} noValidate={true}>
        {orgId && (
          <OrganizationSharing
            handleCheckedChange={handleCheckedChange}
            organizationSharingEnabled={shareSetting.organizationSharingEnabled}
            permissions={permissions}
            selectedPermissions={selectedPermissions}
            onDropdownValueChange={onDropdownValueChange}
            originalAccountSharing={originalAccountSharing}
            addAccountCommentParam={addAccountCommentParam}
            {...props}
          ></OrganizationSharing>
        )}

        <EmailSharing
          emailSharingEnabled={shareSetting.emailSharingEnabled}
          handleCheckedChange={handleCheckedChange}
          permissions={permissions}
          selectedPermissions={selectedPermissions}
          emailList={emailList}
          setEmailList={setEmailList}
          newEmailList={newEmailList}
          setNewEmailList={setNewEmailList}
          onDropdownValueChange={onDropdownValueChange}
          handleNewEmail={handleNewEmail}
          deletedEmailList={deletedEmailList}
          setDeletedEmailList={setDeletedEmailList}
          addEmailCommentParam={addEmailCommentParam}
          {...props}
        ></EmailSharing>

        <div className="SharePurchaseList__Buttons">
          <button data-testid="submitButton" type="submit" className={'SharePurchaseList__SubmitButton'}>
            {actionSave}
          </button>
          <button
            data-testid="cancelButton"
            type="button"
            className={'secondary SharePurchaseList__CancelButton'}
            onClick={toggleShareModal}
          >
            {actionCancel}
          </button>
        </div>
      </Form>
    </Styled>
  );
};

/**
 * Widget to display Share Purchase List modal
 * @param {*} props
 */
const SharePurchaseList = props => {
  const {cssOverride, closeLinkAltText, textSharePurchaseList, showShareModal, toggleShareModal = noop} = props;

  return (
    <Styled id="SharePurchaseList" css={css}>
      <Modal
        cssOverride={cssOverride}
        show={showShareModal}
        onClose={toggleShareModal}
        closeIconTitle={closeLinkAltText}
        closeArialLabel={closeLinkAltText}
        title={
          <>
            <span className="SharePurchaseList__HeaderText">{textSharePurchaseList}</span>
          </>
        }
      >
        <ShareSettings {...props}></ShareSettings>
      </Modal>
    </Styled>
  );
};

export default React.memo(SharePurchaseList);
