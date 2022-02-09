/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import AddressInput from '../address-input';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import formCss from '@oracle-cx-commerce/react-components/form/styles.css';

/**
 * component to display profile address specific form fields.
 * @param {Object} props the properties object
 */
const ProfileAddressInput = props => {
  const {labelFirstName, labelLastName, labelNickName, labelCompanyName} = props;
  const {id = '', className = '', address = {}, isB2BUser, validationConfig = {}, onInputChange, onInputBlur} = props;

  return (
    <Styled
      id="ProfileAddressInput"
      css={`
        ${css} ${formCss}
      `}
    >
      <div className={`ProfileAddressInput ${className}`}>
        {isB2BUser && (
          <div className="ProfileAddressInput__Field ProfileAddressInput__AddressType">
            <label htmlFor={`addressType-${id}`} aria-label={labelNickName}>
              {labelNickName}
            </label>
            <input
              id={`addressType-${id}`}
              type="text"
              name="addressType"
              value={address.addressType || ''}
              onChange={onInputChange}
              onBlur={onInputBlur}
              required={validationConfig.addressType && validationConfig.addressType.required}
              autoCapitalize="words"
              disabled={(validationConfig.addressType && validationConfig.addressType.disabled) || false}
              maxLength={(validationConfig.addressType && validationConfig.addressType.maxLength) || '50'}
            />
            <span className="validationMessage"></span>
          </div>
        )}
        <div className="ProfileAddressInput__Field ProfileAddressInput__FirstNameLastNameContainer">
          <div className="ProfileAddressInput__Field ProfileAddressInput__FirstName">
            <label htmlFor={`firstName-${id}`} aria-label={labelFirstName}>
              {labelFirstName}
            </label>
            <input
              id={`firstName-${id}`}
              type="text"
              name="firstName"
              value={address.firstName || ''}
              onChange={onInputChange}
              onBlur={onInputBlur}
              tabIndex="0"
              required
              autoCapitalize="words"
              autoComplete="given-name"
              disabled={(validationConfig.firstName && validationConfig.firstName.disabled) || false}
              maxLength={(validationConfig.firstName && validationConfig.firstName.maxLength) || '60'}
            />
            <span className="validationMessage"></span>
          </div>
          <div className="ProfileAddressInput__Field ProfileAddressInput__LastName">
            <label htmlFor={`lastName-${id}`} aria-label={labelLastName}>
              {labelLastName}
            </label>
            <input
              id={`lastName-${id}`}
              type="text"
              name="lastName"
              value={address.lastName || ''}
              onChange={onInputChange}
              onBlur={onInputBlur}
              required
              autoCapitalize="words"
              autoComplete="family-name"
              disabled={(validationConfig.lastName && validationConfig.lastName.disabled) || false}
              maxLength={(validationConfig.lastName && validationConfig.lastName.maxLength) || '60'}
            />
            <span className="validationMessage"></span>
          </div>
        </div>
        {isB2BUser && (
          <div className="ProfileAddressInput__Field ProfileAddressInput__CompanyName">
            <label htmlFor={`companyName-${id}`} aria-label={labelCompanyName}>
              {labelCompanyName}
            </label>
            <input
              id={`companyName-${id}`}
              type="text"
              name="companyName"
              value={address.companyName || ''}
              onChange={onInputChange}
              onBlur={onInputBlur}
              required={validationConfig.companyName && validationConfig.companyName.required}
              autoCapitalize="words"
              disabled={(validationConfig.companyName && validationConfig.companyName.disabled) || false}
              maxLength={(validationConfig.companyName && validationConfig.companyName.maxLength) || '50'}
            />
            <span className="validationMessage"></span>
          </div>
        )}
        <AddressInput {...props}></AddressInput>
      </div>
    </Styled>
  );
};

export default ProfileAddressInput;
