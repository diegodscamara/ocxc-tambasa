/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Dropdown from '@oracle-cx-commerce/react-components/dropdown';
import Checkbox from '@oracle-cx-commerce/react-components/checkbox';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {noop} from '@oracle-cx-commerce/utils/generic';

/**
 * Share with Organization
 * @param {*} props
 */
const OrganizationSharing = props => {
  const {
    organizationSharingEnabled,
    handleCheckedChange = noop,
    labelShareWithAccount,
    selectedPermissions,
    labelPermissions,
    onDropdownValueChange = noop,
    permissions,
    originalAccountSharing,
    labelAddComment,
    addAccountCommentParam
  } = props;

  return (
    <Styled id="SharePurchaseList__OrganizationSharing" css={css}>
      <div className="SharePurchaseList__Checkbox">
        <Checkbox
          checked={organizationSharingEnabled}
          onChange={handleCheckedChange}
          id="organizationSharingEnabled"
          name="organizationSharingEnabled"
          labelText={labelShareWithAccount}
        ></Checkbox>
      </div>

      {organizationSharingEnabled && selectedPermissions.find(element => element.id === 'accountPermission') && (
        <>
          <div className="SharePurchaseList__DropdownWrapper">
            <div className="SharePurchaseList__DropdownElement">
              <Dropdown
                value={selectedPermissions.find(element => element.id === 'accountPermission').permission}
                aria-label={labelPermissions}
                onChange={onDropdownValueChange}
                id="accountPermission"
                data-testid="accountPermission"
                label={labelPermissions}
              >
                {permissions.map(permission => (
                  <option key={permission.id} value={permission.value}>
                    {permission.name}
                  </option>
                ))}
              </Dropdown>
            </div>
          </div>

          {!originalAccountSharing.current && (
            <div className="SharePurchaseList__InputElement">
              <label htmlFor="addAccountComment">{labelAddComment}</label>
              <textarea
                type="text"
                id="addAccountComment"
                name="addAccountComment"
                data-testid="addAccountComment"
                autoCapitalize="sentences"
                rows="4"
                className="SharePurchaseList__Comment"
                ref={addAccountCommentParam}
              />
              <span className="validationMessage"></span>
            </div>
          )}
        </>
      )}
    </Styled>
  );
};

export default OrganizationSharing;
