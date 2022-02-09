/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Dropdown from '@oracle-cx-commerce/react-components/dropdown';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {noop} from '@oracle-cx-commerce/utils/generic';

/**
 * Email Config for Sharing a Purchase List with Email Address
 * @param {*} props
 */
const EmailConfig = props => {
  const {
    item,
    emailListId,
    labelEmailAddress,
    handleEmailChange = noop,
    selectedPermission,
    labelPermissions,
    onDropdownValueChange = noop,
    permissions
  } = props;

  return (
    <Styled id="SharePurchaseList__EmailConfig" css={css}>
      <div className="SharePurchaseList__EmailConfig">
        <div className="SharePurchaseList__EmailElement">
          <label htmlFor={`emailAddress-${emailListId}`}>{labelEmailAddress}</label>
          <input
            type="email"
            id={`emailAddress-${emailListId}`}
            name="emailAddress"
            data-testid={`emailAddress-${emailListId}`}
            value={item.email}
            onChange={handleEmailChange}
            className="SharePurchaseList__Email"
            maxLength="254"
          />
          <span className="validationMessage"></span>
        </div>

        <div className="SharePurchaseList__DropdownElement">
          <Dropdown
            value={selectedPermission}
            aria-label={labelPermissions}
            onChange={onDropdownValueChange}
            id={`emailPermission-${emailListId}`}
            data-testid={`emailPermission-${emailListId}`}
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
    </Styled>
  );
};

export default EmailConfig;
