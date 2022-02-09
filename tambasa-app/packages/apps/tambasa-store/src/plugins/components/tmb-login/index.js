
import { PAGE_401_LINK, PAGE_HOME_LINK } from '@oracle-cx-commerce/commerce-utils/constants/page-links';
import React, { useContext, useEffect, useRef, useState } from 'react';

import Alert from '@oracle-cx-commerce/react-components/alert';
import LoginForm from './components/login-form';
import ProfilePreferences from '@oracle-cx-commerce/react-widgets/profile/profile-email-marketing-preferences/components/profile-preferences';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import { getLoggedInData } from './selectors';
import { getPage } from '@oracle-cx-commerce/commerce-utils/selector';
import { getRedirect } from '@oracle-cx-commerce/utils/browser';
import { useNavigator } from '@oracle-cx-commerce/react-components/link';

/**
 * Displays a Login Form.
 * @param {*} props - includes labels of the input fields.
 * @param defaultLoginSuccessPage - default login success page.
 */
const TmbLogin = props => {
  const {
    authenticated,
    defaultLoginSuccessPage = PAGE_HOME_LINK,
    profileId,
    headingEmailMarketingPreferences,
    textConfirmEmailAndMarkatingPreference,
    requireGDPRP13nConsent,
    parentOrganization,
    previousVisitDate,
    GDPRProfileP13nConsentGranted,
    buttonContinue,
    currentOrganization
  } = props;

  const goToPage = useNavigator();
  const [inProgress, setInProgress] = useState(false);
  const [showMarketingPreferences, setShowMarketingPreference] = useState(false);
  // profile update status
  const [updateProfileStatus, setUpdateProfileStatus] = useState('');
  const { getState } = useContext(StoreContext);

  //to check if b2b user visits page while already logged in.
  const loggedIn = useRef(authenticated);
  useEffect(() => {
    if (authenticated && profileId) {
      const state = getState();

      const { pageType } = getPage(state);

      if (
        requireGDPRP13nConsent &&
        currentOrganization !== null &&
        previousVisitDate === null &&
        GDPRProfileP13nConsentGranted === false
      ) {
        setShowMarketingPreference(true);
      } else if (currentOrganization !== null && loggedIn.current) {
        goToPage(PAGE_HOME_LINK);
      } else if (currentOrganization !== null && !loggedIn.current) {
        loggedIn.current = true;
        const url = `${PAGE_HOME_LINK}?currentOrganization=${currentOrganization}`;
        location.assign(url);
      } else if (pageType === PAGE_401_LINK) {
        // Soft reload
        goToPage(undefined, { redirect: true });
      } else {
        goToPage(getRedirect(defaultLoginSuccessPage), { redirect: true });
      }
    }
  }, [
    authenticated,
    defaultLoginSuccessPage,
    requireGDPRP13nConsent,
    profileId,
    parentOrganization,
    previousVisitDate,
    GDPRProfileP13nConsentGranted,
    getState,
    goToPage,
    currentOrganization
  ]);

  return (
    <Styled id="TmbLogin" css={css}>
      <div className="Login">


        {!showMarketingPreferences && (
          <LoginForm {...props} inProgress={inProgress} setInProgress={setInProgress}></LoginForm>
        )}
        {showMarketingPreferences && (
          <div className="Login__EmailMarketingPreferences">
            <h1>{headingEmailMarketingPreferences}</h1>
            <span>{textConfirmEmailAndMarkatingPreference}</span>
            <ProfilePreferences
              {...props}
              redirectLink={defaultLoginSuccessPage}
              buttonText={buttonContinue}
              setShowMarketingPreference={setShowMarketingPreference}
              setUpdateProfileStatus={setUpdateProfileStatus}
              inProgress={inProgress}
              setInProgress={setInProgress}
            ></ProfilePreferences>
          </div>
        )}
        {updateProfileStatus.message && updateProfileStatus.message !== '' && (
          <Alert
            id="ProfileEmailMarketingPreferences__Alert"
            type={updateProfileStatus.type}
            message={updateProfileStatus.message}
          />
        )}
      </div>
    </Styled>
  );
};

export default connect(getLoggedInData)(TmbLogin);
