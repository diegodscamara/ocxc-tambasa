/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useCallback, useContext, useState} from 'react';

import Form from '@oracle-cx-commerce/react-components/form';
import {PAGE_PROFILE_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import ProfileEmailPreference from './profile-email-preference';
import ProfileGDPRConsent from './profile-gdpr-consent';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';

const ProfilePreferences = props => {
  const {actionSave, alertUpdateProfileSuccessful} = props;
  const {requireGDPRP13nConsent} = props;
  const {
    inProgress,
    setInProgress,
    setUpdateProfileStatus,
    redirectLink = PAGE_PROFILE_LINK,
    buttonText = actionSave,
    actionCancel
  } = props;

  // selected preferences
  const [preferencesSelection, setPreferencesSelection] = useState({});

  const {action} = useContext(StoreContext);
  const goToPage = useNavigator();

  /**
   * update the selected preference
   * @param {Object} selection the selection value object
   */
  const updatePreferencesSelection = useCallback(selection => {
    setPreferencesSelection(selections => {
      return {...selections, ...selection};
    });
  }, []);

  /**
   * Success Handler for Update Profile
   */
  const onSuccess = useCallback(() => {
    action('notifyClearAll');
    action('notify', {level: 'info', message: alertUpdateProfileSuccessful});
    /* goToPage(redirectLink); */
  }, [action, alertUpdateProfileSuccessful, redirectLink, goToPage]);

  /**
   * Failure Handler for Update Profile
   */
  const onError = useCallback(
    ({error}) => {
      setUpdateProfileStatus(prevState => {
        return {
          ...prevState,
          type: 'error',
          message: error.message
        };
      });
    },
    [setUpdateProfileStatus]
  );

  /**
   * Function to handle the form submission.
   * Trigger the updateProfile action
   */
  const onSubmit = useCallback(() => {
    setInProgress(true);
    action('updateProfile', preferencesSelection)
      .then(response => {
        action('notifyClearAll');
        if (response.ok === false) {
          onError(response);
        } else {
          onSuccess();
        }
      })
      .finally(() => {
        setInProgress(false);
      });
  }, [setInProgress, action, preferencesSelection, onError, onSuccess]);

  return (
    <Styled id="ProfilePreferences" css={css}>
      <div className="ProfilePreferences__Form">
        <Form onSubmit={onSubmit} enableUnsavedChangesTracking={true} onOk={onSuccess} onNotOk={onError} noValidate>
          <div className="ProfilePreferences__Form">
            {/* Email Preference */}
            <ProfileEmailPreference
              {...props}
              setPreferencesSelection={setPreferencesSelection}
              updatePreferencesSelection={updatePreferencesSelection}
            />

            {/* GDPR Consent */}
            {requireGDPRP13nConsent ? (
              <ProfileGDPRConsent
                {...props}
                setPreferencesSelection={setPreferencesSelection}
                updatePreferencesSelection={updatePreferencesSelection}
              />
            ) : null}

            <div className="ProfilePreferences__Buttons">
              <button type="submit" className="ProfilePreferences__SubmitButton" disabled={inProgress}>
                {buttonText}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </Styled>
  );
};

export default ProfilePreferences;
