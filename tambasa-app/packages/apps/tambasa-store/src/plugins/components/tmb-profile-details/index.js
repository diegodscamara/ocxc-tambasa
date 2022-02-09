/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import { useNavigator } from '@oracle-cx-commerce/react-components/link';
import React, { useCallback, useContext, useMemo, useState, useEffect } from 'react';

import Alert from '@oracle-cx-commerce/react-components/alert';
import Form from '@oracle-cx-commerce/react-components/form';
import PropTypes from 'prop-types';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import { getPageData } from '@oracle-cx-commerce/react-widgets/profile/profile-details/selectors';
import { validateRequiredField } from '@oracle-cx-commerce/react-components/utils/payment';

/**
 * Displays the profile details to be updated on profile details page.
 * @param {*} props - includes labels for account details title and form fields.
 * Contains the link to update password page.
 */

const ProfileDetails = props => {
  const {
    actionSave,
    alertUpdateProfileSuccessful,
    labelEmailAddress,
    labelFirstName,
    labelCompany,
    labelLastName,
    headingAccountDetails,
    textAllFieldsRequired,
    textRequiredField, menuList, setMenuList, widgetId
  } = props;
  const { isUserLoggedIn, firstName = '', lastName = '', email = '', dynamicProperties = [] } = props;
  const goToPage = useNavigator();

  const [updateProfileStatus, setUpdateProfileStatus] = useState({});

  const { action } = useContext(StoreContext);

  const cpf = dynamicProperties ? dynamicProperties.find((prop) => prop.id === "tam_cpfcnpj") || {}: {};
  const telefone = dynamicProperties ? dynamicProperties.find((prop) => prop.id === "tam_phone") || {} : {};
  
  const dynamicProperty = dynamicProperties.find(dp => dp.id === "tam_isB2B_user")
  const isB2BUser = dynamicProperty && dynamicProperty.value

  useEffect(() => {
    if (menuList && menuList.length > 0) {

      var menuListTemp = menuList.find(el => el.widgetId === widgetId);

      if (menuListTemp && !menuListTemp.name) {

        menuListTemp.name = "ALTERAR DADOS";

        setMenuList(menuList);
      }
    }
  }, [menuList]);

  /**
   * Map holds 'validators' function declaration for Account Details fields
   */
  const validators = useMemo(
    () => ({
      firstName: elementValue => validateRequiredField(elementValue, textRequiredField),
      lastName: elementValue => validateRequiredField(elementValue, textRequiredField)
    }),
    [textRequiredField]
  );

  /**
   * This method validates value for input fields  by triggering respective 'validators'
   * And sets error message (if any) at corresponding ui elements
   * @param {Object} element ui element
   */
  const validateElement = useCallback(
    element => {
      const fieldValue = element.value;

      element.setCustomValidity('');
      const elementValidator = validators[element.name];
      //set 'validator' to the element
      if (elementValidator) {
        element.setCustomValidity(elementValidator(fieldValue));
      }
    },
    [validators]
  );

  /**
   * success callback method when profile details form submitted.
   */
  const onSuccess = useCallback(() => {
    action('notifyClearAll');
    action('notify', { level: 'info', message: alertUpdateProfileSuccessful });
    /* goToPage(PAGE_PROFILE_LINK); */
    setUpdateProfileStatus(prevState => {
      return {
        ...prevState,
        type: 'success',
        message: alertUpdateProfileSuccessful
      };
    });
    
    setTimeout(() => {
      setUpdateProfileStatus({});
    }, 3000);
  }, [action, alertUpdateProfileSuccessful, goToPage]);

  /**
   * failure callback method when profile details form submitted.
   */
  const onError = useCallback(({ error: { message = '' } = {} } = {}) => {
    setUpdateProfileStatus(prevState => {
      return {
        ...prevState,
        type: 'error',
        message
      };
    });
  }, []);

  return (
    <Styled id="ProfileDetails" css={css}>
      <div className="ProfileDetails">
        {isUserLoggedIn && firstName && (
          <div className="ProfileDetails__Wrapper">
            <h1>{headingAccountDetails}</h1>
            <div className="ProfileDetails__AllFieldsRequiredText"> {textAllFieldsRequired}</div>
            <div className="ProfileDetails__Content">
              <Form
                action="updateProfile"
                setCustomValidity={validateElement}
                onOk={onSuccess}
                onNotOk={onError}
                noValidate={true}
                enableUnsavedChangesTracking={true}
              >
                {updateProfileStatus.message && updateProfileStatus.message !== '' && (
                  <Alert
                    id="ProfileDetails__Alert"
                    type={updateProfileStatus.type}
                    message={updateProfileStatus.message}
                  />
                )}
                <div className="ProfileDetails__InputElement">
                  {/* firstName */}
                  <label htmlFor="firstName">{isB2BUser ? labelCompany : labelFirstName}</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="ProfileDetails__InputField"
                    data-testid="firstName"
                    autoCapitalize="words"
                    defaultValue={firstName}
                    required
                  />
                  <span className="validationMessage"></span>
                </div>

                { !isB2BUser
                  ? <div className="ProfileDetails__InputElement">
                      {/* lastName */}
                      <label htmlFor="lastName">{labelLastName}</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="ProfileDetails__InputField"
                        data-testid="lastName"
                        autoCapitalize="words"
                        defaultValue={lastName}
                        required
                      />
                      <span className="validationMessage"></span>
                    </div>
                  : <></>
                }

                <div className="ProfileDetails__InputElement">
                  {/* email */}
                  <label htmlFor="email">{labelEmailAddress}</label>
                  <div className="ProfileDetails__InputElementDiv">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      data-testid="email"
                      readOnly={isB2BUser}
                      className={`ProfileDetails__InputField ${ isB2BUser ? 'ProfileDetails__DisabledField' : '' }`}
                      defaultValue={email}
                      required
                    />
                    <span className="validationMessage"></span>
                  </div>
                </div>

                {cpf && (
                  <div className="ProfileDetails__InputElement">
                    {/* cpf */}
                    <label htmlFor="cpf">{cpf.label}</label>
                    <div className="ProfileDetails__InputElementDiv">
                      <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        data-testid="cpf"
                        readOnly={isB2BUser}
                        className={`ProfileDetails__InputField ${ isB2BUser ? 'ProfileDetails__DisabledField' : '' }`}
                        defaultValue={cpf.value}
                        required
                      />
                      <span className="validationMessage"></span>
                    </div>
                  </div>
                )}

                {telefone && (
                  <div className="ProfileDetails__InputElement">
                    {/* telefone */}
                    <label htmlFor="telefone">{telefone.label}</label>
                    <div className="ProfileDetails__InputElementDiv">
                      <input
                        type="text"
                        id="telefone"
                        name="telefone"
                        data-testid="telefone"
                        readOnly={isB2BUser}
                        className={`ProfileDetails__InputField ${ isB2BUser ? 'ProfileDetails__DisabledField' : '' }`}
                        defaultValue={telefone.value}
                        required
                      />
                      <span className="validationMessage"></span>
                    </div>
                  </div>
                )}


                <div className="ProfileDetails__Buttons">
                  <button data-testid="submitButton" type="submit" className="ProfileDetails__SubmitButton">
                    {actionSave}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </div>
    </Styled>
  );
};

ProfileDetails.propTypes = {
  /**
   * Boolean flag to indicate whether User is logged-in or not.
   */
  isUserLoggedIn: PropTypes.bool.isRequired,

  /**
   * First name of the logged-in user.
   */
  firstName: PropTypes.string.isRequired,

  /**
   * Last name of the logged-in user.
   */
  lastName: PropTypes.string.isRequired,

  /**
   * Last name of the logged-in user.
   */
  email: PropTypes.string.isRequired,

  /**
   * Daytime Telephone Number of the logged-in user.
   */
  daytimeTelephoneNumber: PropTypes.string
};

ProfileDetails.defaultProps = {
  daytimeTelephoneNumber: ''
};

export default connect(getPageData)(ProfileDetails);
