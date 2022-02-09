/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import { useNavigator } from '@oracle-cx-commerce/react-components/link';
import React, { useEffect } from 'react';
import { getRedirect } from '@oracle-cx-commerce/utils/browser';

import Link from '@oracle-cx-commerce/react-components/link'
import Alert from '@oracle-cx-commerce/react-components/alert';

/**
 *  On successful Registration displays the success message for two sec
 * and navigates to home page.
 */
const NotifyAuthSuccessAndNavigate = props => {
  const { formSubmitted, defaultAutoLoginSuccessPage, alertCreateProfileSuccessfulTitle, alertCreateProfileSuccessfulText, alertCreateProfileSuccessfulButton, authenticated } = props;
  const goToPage = useNavigator('');
  const NO_REDIRECT_ON_SUCCESS = 'noredirect';

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!formSubmitted && authenticated) {
        goToPage(defaultAutoLoginSuccessPage);
      }
      if (defaultAutoLoginSuccessPage !== NO_REDIRECT_ON_SUCCESS) {
        goToPage(getRedirect(defaultAutoLoginSuccessPage), { redirect: true });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [authenticated, defaultAutoLoginSuccessPage, formSubmitted, goToPage]);

  return (
    formSubmitted && (
      <>
        <div class="account-finish-container" >
          <img src="/ccstore/v1/images/?source=/file/v2734146280622988607/general/finish-register-img.png&amp;height=300&amp;width=300" />
          <h3>{alertCreateProfileSuccessfulTitle}</h3>
          <p class="account-finish-text">{alertCreateProfileSuccessfulText}</p>
          <Link route={'/profile'}>
            <button class="account-finish-button">{alertCreateProfileSuccessfulButton}</button>
          </Link>
      </div>
      </>
    )
  );
};

export default NotifyAuthSuccessAndNavigate;
