/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, { useCallback, useContext, useMemo, useRef, useState, useEffect } from 'react';

import Alert from '@oracle-cx-commerce/react-components/alert';
import Form from '@oracle-cx-commerce/react-components/form';
import { PAGE_LOGIN_LINK } from '@oracle-cx-commerce/commerce-utils/constants';
import PropTypes from 'prop-types';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import { fetchCommonResources } from '@oracle-cx-commerce/fetchers/resources';
import { fetchShopperSettings } from '@oracle-cx-commerce/fetchers/merchant-settings';
import { getPageData } from '@oracle-cx-commerce/react-widgets/profile/profile-update-password/selectors';
import { passwordHelpers } from '@oracle-cx-commerce/react-components/utils';
import { useCommonResourcesFetcher } from '@oracle-cx-commerce/fetchers/resources/hooks';
import { useNavigator } from '@oracle-cx-commerce/react-components/link';
import { useShopperSettingsFetcher } from '@oracle-cx-commerce/fetchers/merchant-settings/hooks';
import { validateRequiredField } from '@oracle-cx-commerce/react-components/utils/payment';

/**
 * export fetchers to load common resources & shopper settings (password policies)
 * into the state during server-side rendering.
 */
export const fetchers = [fetchCommonResources, fetchShopperSettings];

/**
 * Displays the password fields to be updated on update password page.
 * @param {*} props - includes labels for update password title and form fields.
 */

const ProfileUpdatePassword = props => {
  const [updatePasswordStatus, setUpdatePasswordStatus] = useState({});
  const oldPasswordInput = useRef(null);
  const newPasswordInput = useRef(null);
  const newConfirmPasswordInput = useRef(null);
  const goToPage = useNavigator();

  const {
    actionCancel,
    actionSave,
    alertUpdatePasswordSuccessful,
    alertPasswordsDoNotMatch,
    headingUpdatePassword,
    labelConfirmNewPassword,
    labelCurrentPassword,
    labelNewPassword,
    textRequiredField,
    menuList,
    setMenuList,
    widgetId,
    profile,
    activeTab
  } = props;

  const store = useContext(StoreContext);

  /**
   * invoke fetcher hook to load common resources & shopper settings (password policies)
   * into state during client side rendering
   * this will not perform any task if state already has these details
   * This is effective if SSR didn't populate the state with these details
   */
  useCommonResourcesFetcher(store);
  useShopperSettingsFetcher(store);

  const { isUserLoggedIn, firstName = '' } = props;

  const { login = '', passwordPolicies, commonResources } = props;

  const { action } = useContext(StoreContext);



  /**
   * Map holds 'validators' function declaration for Update Password fields
   */
  const validators = useMemo(
    () => ({
      oldPassword: elementValue => validateRequiredField(elementValue, textRequiredField),
      newPassword: elementValue => validateRequiredField(elementValue, textRequiredField),
      newConfirmPassword: elementValue => validateRequiredField(elementValue, textRequiredField)
    }),
    [textRequiredField]
  );

  useEffect(() => {
    if (menuList && menuList.length > 0) {

      var menuListTemp = menuList.find(el => el.widgetId === widgetId);

      if (menuListTemp && !menuListTemp.name) {

        menuListTemp.name = "ALTERAR SENHA";

        setMenuList(menuList);
      }
    }
  }, [menuList]);

  /**
   * success callback method when updated password form submitted.
   */
  const onSuccess = useCallback(() => {
    action('notifyClearAll');
    action('notify', { level: 'info', message: alertUpdatePasswordSuccessful });
    setUpdatePasswordStatus(prevState => {
      return {
        ...prevState,
        type: 'success',
        message: alertUpdatePasswordSuccessful
      };
    });

    setTimeout(() => {
      setUpdatePasswordStatus({});
      goToPage(PAGE_LOGIN_LINK);
    }, 3000);
  }, [action, alertUpdatePasswordSuccessful, goToPage]);

  /**
   * failure callback method when updated password form submitted.
   */
  const onError = useCallback(({ error: { message = '' } = {} } = {}) => {
    oldPasswordInput.current.value = '';
    newPasswordInput.current.value = '';
    newConfirmPasswordInput.current.value = '';
    setUpdatePasswordStatus(prevState => {
      return {
        ...prevState,
        type: 'error',
        message
      };
    });
  }, []);

  /**
   * method to set the custom element validity message.
   */
  const setElementValidity = useCallback(
    element => {
      element.setCustomValidity('');
      setUpdatePasswordStatus(prevState => {
        return {
          ...prevState,
          message: null
        };
      });

      const { validity, name, value } = element;

      element.setCustomValidity('');
      const elementValidator = validators[name];
      //set 'validator' to the element
      if (elementValidator) {
        element.setCustomValidity(elementValidator(value));
      }

      if (name === 'newPassword' && validity.valid) {
        const password = value;
        const passwordValid = passwordHelpers.validatePassword(passwordPolicies, { login, password });
        if (!passwordValid) {
          element.setCustomValidity(passwordHelpers.getEmbeddedAssistence(passwordPolicies, commonResources));
        }
      }
    },
    [commonResources, login, passwordPolicies, validators]
  );

  /**
   * method to handle form submit event.
   */
  const handleFormSubmit = event => {
    if (
      newPasswordInput.current.value &&
      newConfirmPasswordInput.current.value &&
      newPasswordInput.current.value !== newConfirmPasswordInput.current.value
    ) {
      newPasswordInput.current.value = '';
      newConfirmPasswordInput.current.value = '';
      setUpdatePasswordStatus(prevState => {
        return {
          ...prevState,
          type: 'error',
          message: alertPasswordsDoNotMatch
        };
      });

      event.preventDefault();
    }
  };

  /**
   * method to navigate to profile page.
   */
  const gotoProfilePage = event => {
    event.preventDefault();
    goToPage(PAGE_PROFILE_LINK);
  };

  return (
    <Styled id="TmbProfileUpdatePassword" css={css}>
      {isUserLoggedIn && firstName && (
        <div className="ProfileUpdatePassword">
          <div className="ProfileUpdatePassword__Content">
            <h1 data-testid="updatePasswordTitle">{headingUpdatePassword}</h1>
            <Form
              action="updateProfile"
              onOk={onSuccess}
              onNotOk={onError}
              enableUnsavedChangesTracking={true}
              setCustomValidity={setElementValidity}
              noValidate={true}
            >
              {updatePasswordStatus.message &&
                (updatePasswordStatus.message !== null || updatePasswordStatus.message !== '') && (
                  <Alert
                    id="ProfileUpdatePassword__Alert"
                    type={updatePasswordStatus.type}
                    message={updatePasswordStatus.message}
                  />
                )}
              {
                <div>
                  <div className="ProfileUpdatePassword__InputElement">
                    {/* oldPassword */}
                    <label htmlFor="oldPassword">{labelCurrentPassword}</label>
                    <div className="ProfileUpdatePassword__InputElementDiv">
                      <input
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        className="ProfileUpdatePassword__InputField"
                        ref={oldPasswordInput}
                        data-testid="oldPassword"
                        defaultValue={null}
                        required
                      />
                      <span className="validationMessage"></span>
                    </div>
                  </div>

                  <div className="ProfileUpdatePassword__InputElement">
                    {/* newPassword */}
                    <label htmlFor="newPassword">{labelNewPassword}</label>
                    <div className="ProfileUpdatePassword__InputElementDiv">
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="ProfileUpdatePassword__InputField"
                        data-testid="newPassword"
                        ref={newPasswordInput}
                        defaultValue={null}
                        required
                      />
                      <span data-testid="newPasswordValidationMessage" className="validationMessage"></span>
                    </div>
                  </div>

                  <div className="ProfileUpdatePassword__InputElement">
                    {/* newConfirmPassword */}
                    <label htmlFor="newConfirmPassword">{labelConfirmNewPassword}</label>
                    <div className="ProfileUpdatePassword__InputElementDiv">
                      <input
                        type="password"
                        id="newConfirmPassword"
                        name="newConfirmPassword"
                        className="ProfileUpdatePassword__InputField"
                        data-testid="newConfirmPassword"
                        ref={newConfirmPasswordInput}
                        defaultValue={null}
                        required
                      />
                      <span className="validationMessage"></span>
                    </div>
                  </div>
                </div>
              }
              <div className="ProfileUpdatePassword__Buttons">
                <button
                  type="submit"
                  onClick={event => {
                    handleFormSubmit(event);
                  }}
                  data-testid="submitButton"
                  className="ProfileUpdatePassword__SubmitButton"
                >
                  {actionSave}
                </button>
                
              </div>
            </Form>
          </div>
        </div>
      )}
    </Styled>
  );
};

ProfileUpdatePassword.propTypes = {
  /**
   * Boolean flag to indicate whether User is logged-in or not.
   */
  isUserLoggedIn: PropTypes.bool.isRequired,

  /**
   * First name of the logged-in user.
   */
  firstName: PropTypes.string.isRequired,

  /**
   * Registered E-mail of the logged-in user.
   */
  login: PropTypes.string.isRequired,

  /**
   * Set of rules against which the password of the logged-in user is validated.
   */
  passwordPolicies: PropTypes.shape({
    allowedSymbols: PropTypes.string,
    blockCommonPasswords: PropTypes.bool,
    cannotUsePreviousPasswords: PropTypes.bool,
    cannotUseUsername: PropTypes.bool,
    minPasswordLength: PropTypes.number,
    numberOfPreviousPasswords: PropTypes.number,
    useMinPasswordLength: PropTypes.bool,
    useMixedCase: PropTypes.bool,
    useNumber: PropTypes.bool,
    useSymbol: PropTypes.bool
  }).isRequired,

  /**
   * Common Locale Resources
   */
  commonResources: PropTypes.objectOf(PropTypes.string).isRequired
};

export default connect(getPageData)(ProfileUpdatePassword);
