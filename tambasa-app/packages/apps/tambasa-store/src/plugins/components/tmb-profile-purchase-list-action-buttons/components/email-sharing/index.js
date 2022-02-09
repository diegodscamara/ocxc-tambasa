/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Checkbox from '@oracle-cx-commerce/react-components/checkbox';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import EmailConfig from '@oracle-cx-commerce/react-widgets/profile/profile-purchase-list-action-buttons/components/email-config';
import {noop} from '@oracle-cx-commerce/utils/generic';

/**
 * Share with Email Address
 * @param {*} props
 */
const EmailSharing = props => {
  const {
    emailSharingEnabled,
    handleCheckedChange = noop,
    labelShareWithEmailAddress,
    selectedPermissions,
    permissions,
    emailList,
    setEmailList,
    onDropdownValueChange = noop,
    newEmailList,
    setNewEmailList,
    textRemoveShopper,
    handleNewEmail = noop,
    textAddEmailAddress,
    labelAddComment,
    addEmailCommentParam,
    deletedEmailList,
    setDeletedEmailList
  } = props;

  /**
   * handler for changing email
   */
  const handleEmailChange = (item, list, handler) => e => {
    item.email = e.target.value;
    handler([...list]);
  };

  /**
   * handler for removing saved email config
   * @param {*} event
   */
  const removeSavedEmail = event => {
    const itemId = event.target.id.split('-')[1];
    setEmailList(emailList.filter(element => element.id !== itemId));
    const deletedItem = {
      id: itemId
    };
    setDeletedEmailList([...deletedEmailList, deletedItem]);
  };

  /**
   * handler for removing unsaved email config
   * @param {*} event
   */
  const removeUnsavedEmail = event => {
    const itemId = event.target.id.split('-')[1];
    setNewEmailList(newEmailList.filter(element => element.key !== itemId));
  };

  return (
    <Styled id="SharePurchaseList__EmailSharing" css={css}>
      <div className="SharePurchaseList__Checkbox">
        <Checkbox
          checked={emailSharingEnabled ? true : false}
          onChange={handleCheckedChange}
          id="emailSharingEnabled"
          name="emailSharingEnabled"
          labelText={labelShareWithEmailAddress}
        ></Checkbox>
      </div>

      {emailSharingEnabled && (
        <div>
          <ul className="SharePurchaseList__EmailConfigWrapper">
            {emailList.map(item => (
              <li className="SharePurchaseList__EmailConfigItem" key={item.id} id={`emailConfigItem-${item.id}`}>
                {selectedPermissions.find(element => element.id.split('-')[1] === item.id) && (
                  <>
                    <EmailConfig
                      item={item}
                      handleEmailChange={handleEmailChange(item, emailList, setEmailList)}
                      onDropdownValueChange={onDropdownValueChange}
                      editEnabled={item.editEnabled}
                      emailListId={item.id}
                      selectedPermission={
                        selectedPermissions.find(element => element.id.split('-')[1] === item.id).permission
                      }
                      permissions={permissions}
                      {...props}
                    ></EmailConfig>

                    <div className="SharePurchaseList__RemoveShopper">
                      <button
                        onClick={removeSavedEmail}
                        className="SharePurchaseList__RemoveShopperButton"
                        aria-label={textRemoveShopper}
                        title={textRemoveShopper}
                        type="button"
                        id={`removeShopper-${item.id}`}
                        data-testid={`removeShopper-${item.id}`}
                      >
                        {textRemoveShopper}
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}

            {newEmailList.map(item => (
              <li className="SharePurchaseList__EmailConfigItem" key={item.key} id={`emailConfigItem-${item.key}`}>
                {selectedPermissions.find(element => element.id.split('-')[1] === item.key) && (
                  <>
                    <EmailConfig
                      item={item}
                      handleEmailChange={handleEmailChange(item, newEmailList, setNewEmailList)}
                      onDropdownValueChange={onDropdownValueChange}
                      editEnabled={item.editEnabled}
                      emailListId={item.key}
                      selectedPermission={
                        selectedPermissions.find(element => element.id.split('-')[1] === item.key).permission
                      }
                      permissions={permissions}
                      {...props}
                    ></EmailConfig>

                    <div className="SharePurchaseList__RemoveShopper">
                      <button
                        onClick={removeUnsavedEmail}
                        className="SharePurchaseList__RemoveShopperButton"
                        aria-label={textRemoveShopper}
                        title={textRemoveShopper}
                        type="button"
                        id={`removeShopper-${item.key}`}
                        data-testid={`removeShopper-${item.key}`}
                      >
                        {textRemoveShopper}
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

          <div className="SharePurchaseList__AddEmailElement">
            <button
              onClick={handleNewEmail}
              className="SharePurchaseList__AddEmail"
              aria-label={textAddEmailAddress}
              title={textAddEmailAddress}
              type="button"
            >
              {textAddEmailAddress}
            </button>
          </div>

          <div className="SharePurchaseList__InputElement">
            <label htmlFor="addEmailComment">{labelAddComment}</label>
            <textarea
              type="text"
              id="addEmailComment"
              name="addEmailComment"
              data-testid="addEmailComment"
              autoCapitalize="sentences"
              rows="4"
              className="SharePurchaseList__Comment"
              ref={addEmailCommentParam}
            />
            <span className="validationMessage"></span>
          </div>
        </div>
      )}
    </Styled>
  );
};

export default EmailSharing;
