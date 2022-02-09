import React, { useCallback, useContext, useState } from 'react';
import Alert from '@oracle-cx-commerce/react-components/alert';
import EmailIcon from '@oracle-cx-commerce/react-components/icons/email';
import Form from '@oracle-cx-commerce/react-components/form';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import { isAuthenticated } from '@oracle-cx-commerce/commerce-utils/selector';

/**
 * Displays a Form with email field to request for resetting password.
 * @param {*} props - includes labels of the input fields.
 */

const TmbProfileResetPassword = props => {
  const store = useContext(StoreContext);
  const { action } = store;

  const {
    id,
    labelEmail,
    textPasswordResetHelper,
    headingResetPassword,
    alertResetPasswordFailure,
    alertResetPasswordSuccessful,
    buttonResendPasswordRequest,
    buttonSubmit
  } = props;

  const [inProgress, setInProgress] = useState(false);
  const [username, setUsername] = useState('');
  const [resetPasswordStatus, setResetPasswordStatus] = useState('');
  const [resetPasswordMessage, setResetPasswordMessage] = useState('');

  /**
   * success callback of reset password request.
   */

  const onOk = useCallback(() => {
    setResetPasswordStatus('info');
    setResetPasswordMessage(alertResetPasswordSuccessful);
  }, [alertResetPasswordSuccessful]);

  /**
   * failure callback of reset password request.
   */

  const onNotOk = useCallback(
    ({ error }) => {
      setResetPasswordStatus('error');
      error.code === '500'
        ? action('notify', { level: 'error', message: error.message })
        : setResetPasswordMessage(alertResetPasswordFailure);
    },
    [action, alertResetPasswordFailure]
  );

  function resendRequestAction() {
    store
      .action('resetPassword', {
        login: username
      })
      .then(response => {
        if (response.ok === false) {
          onNotOk(response);
        } else {
          onOk(response);
        }
      });
  }

  /**
   * method to store the username in component state.
   * username value is needed for re sending reset password request in case of failure.
   */

  function handleUsername(event) {
    const { value } = event.target;
    setUsername(value);
  }

  /**
   * method to display the request reset password status.
   * if there is a failure, displays a button to resend the request.
   */
  const ResetRequestSubmittedContent = () => {
    return (
      <React.Fragment>
        <Alert id="ProfileResetPassword__Alert" type={resetPasswordStatus} message={resetPasswordMessage} />
        {resetPasswordStatus === 'error' && (
          <div className="button-container-reset-password">
            <button type="button" className="submit-button-reset-password" onClick={resendRequestAction}>
              {buttonResendPasswordRequest}
            </button>
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <Styled id="TmbProfileResetPassword" css={css}>
      <div className="ProfileResetPassword">
        <h1 aria-label={headingResetPassword}>{headingResetPassword}</h1>
        {resetPasswordStatus ? (
          <ResetRequestSubmittedContent />
        ) : (
          <Form action="resetPassword" onOk={onOk} onNotOk={onNotOk} setInProgress={setInProgress} noValidate>
            <p aria-label={textPasswordResetHelper}>{textPasswordResetHelper}</p>

            <div className="ProfileResetPassword__Username">
              <label htmlFor={`login-${id}`}>{labelEmail}</label>
              <div className="ProfileResetPassword__EmailField">
                <EmailIcon className="ProfileResetPassword__EmailIcon" />
                <input
                  id={`login-${id}`}
                  type="email"
                  name="login"
                  aria-label={labelEmail}
                  required
                  onChange={handleUsername}
                />
                <span className="validationMessage"></span>
              </div>
            </div>

            <div className="button-container-reset-password">
              <button type="submit" className="submit-button-reset-password" disabled={inProgress || !username}>
                {buttonSubmit}
              </button>
            </div>
          </Form>
        )}
      </div>
    </Styled>
  );
};

export default connect(isAuthenticated)(TmbProfileResetPassword);
