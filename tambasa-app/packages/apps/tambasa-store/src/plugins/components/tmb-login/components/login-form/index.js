import React, { useCallback, useContext, useState, useEffect } from 'react';
import { PAGE_REGISTRATION_LINK, PAGE_RESET_PASSWORD_LINK } from '@oracle-cx-commerce/commerce-utils/constants';
import Alert from '@oracle-cx-commerce/react-components/alert';
import Form from '@oracle-cx-commerce/react-components/form';
import Link from '@oracle-cx-commerce/react-components/link';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

const LoginForm = props => {
  const {
    id,
    headingReturningCustomer,
    textCreateAnAccount,
    labelEmail,
    textForgottenPassword,
    actionLogin,
    login: softLoginEmail,
    // eslint-disable-next-line no-unused-vars
    alertLoginSuccessful,
    alertLoginUnSuccessful,
    labelPassword,
    inProgress,
    setInProgress,
    textAccountWithNoContractError
  } = props;

  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const { action, subscribeDispatch } = useContext(StoreContext);

  useEffect(() => {
    subscribeDispatch((actionEvent, state) => {
      const { type, payload } = actionEvent;
      if (type === "loginComplete" && payload.ok)
        action('setShopperContext', {})
   });
  }, [subscribeDispatch])

  /**
   * login action success callback
   */
  const onOk = useCallback(() => {
    /* Uncomment the below line, when the notification component is completed.
       With the existing notification component, UI is not looking good with login success notification*/
    //action('notify', {level: 'info', message: labelLoginSuccessful});
  }, []);

  /**
   * login action failure callback
   */
  const onNotOk = useCallback(
    ({ error = {} }) => {
      if (error.code === 500) {
        action('notify', { level: 'error', message: error.message });
      } else if (error.errorCode === '60011') {
        setLoginErrorMessage(textAccountWithNoContractError);
      } else {
        setLoginErrorMessage(error.message === 'unauthorized_client' ? alertLoginUnSuccessful : error.message);
      }
    },
    [action, alertLoginUnSuccessful, textAccountWithNoContractError]
  );

  return (
    <Styled id="TmbLoginForm" css={css}>
      <div className="Login_Content">
        <div className="login-container">

          <h1 className="login-title">Faça o login</h1>
          <Form action="login" onOk={onOk} onNotOk={onNotOk} setInProgress={setInProgress} noValidate>
            <input type="hidden" name="rememberUserEmail" value="true" />
            {loginErrorMessage && <Alert id="Login__Alert" type="error" message={loginErrorMessage} />}

            <div>
              <label className="label" htmlFor={`username-${id}`}>E-MAIL</label>
              <div className="Login__EmailField">
                <input id={`username-${id}`} type="email" name="username" defaultValue={softLoginEmail} required />
                <span className="validationMessage"></span>
              </div>
            </div>
            <div>
              <label className="label" htmlFor={`password-${id}`}>{labelPassword}</label>
              <div className="Login__PasswordField">
                <input id={`password-${id}`} type="password" name="password" required />
                <span className="validationMessage"></span>
              </div>
            </div>
            <div className="Login__ForgotPassword">
              <Link className="Login__ForgotPassword__Link" href={PAGE_RESET_PASSWORD_LINK}>
                {textForgottenPassword}
              </Link>
            </div>
            <div>
              <div className="button-container-login">
                <button type="submit" className="login-button" disabled={inProgress}>
                  ACESSAR →
                </button>
              </div>
            </div>
          </Form>

        </div>
        <div className="midle-line"></div>
        <div className="create-account-container">
          <h1 className="create-account-title">Crie sua conta</h1>
          <p className="create-account-text">Crie sua conta para realizar e acompanhar seus pedidos diretamente em nosso site</p>
          <div >

            <Link href={PAGE_REGISTRATION_LINK} className="button-container-create-account">
              <button className="create-account-button">
                {textCreateAnAccount}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Styled>
  );
};

export default LoginForm;
