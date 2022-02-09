/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, { useState, useEffect } from 'react';

import Alert from '@oracle-cx-commerce/react-components/alert';
import ProfilePreferences from './components/profile-preferences';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import { getProfileData } from '@oracle-cx-commerce/react-widgets/profile/profile-email-marketing-preferences/selectors';
import PropTypes from 'prop-types';

/**
 * widget that allows the shopper to update the email and marketing preferences
 */
const ProfileEmailMarketingPreferences = props => {
  const { headingEmailMarketingPreferences, textUnsubscribeEmailMarketingUpdates, menuList, setMenuList, widgetId } = props;
  const { isUserLoggedIn } = props;

  // profile update status
  const [updateProfileStatus, setUpdateProfileStatus] = useState('');
  // action progress status
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    if (menuList && menuList.length > 0) {

      var menuListTemp = menuList.find(el => el.widgetId === widgetId);

      if (menuListTemp && !menuListTemp.name) {

        menuListTemp.name = "PREFERÊNCIAS DE EMAIL";

        setMenuList(menuList);
      }
    }
  }, [menuList]);

  return (
    <Styled id="TmbProfileEmailMarketingPreferences" css={css}>
      <div className="ProfileEmailMarketingPreferences">
        {isUserLoggedIn && (
          <div>
            <h1>{headingEmailMarketingPreferences}</h1>

            {updateProfileStatus.message && updateProfileStatus.message !== '' && (
              <Alert
                id="ProfileEmailMarketingPreferences__Alert"
                type={updateProfileStatus.type}
                message={updateProfileStatus.message}
              />
            )}

            <div className="ProfileEmailMarketingPreferences__UnsubscribeText">
              <span>{textUnsubscribeEmailMarketingUpdates}</span>
            </div>

            <ProfilePreferences
              {...props}
              setUpdateProfileStatus={setUpdateProfileStatus}
              inProgress={inProgress}
              setInProgress={setInProgress}
            />
          </div>
        )}
      </div>
    </Styled>
  );
};

ProfileEmailMarketingPreferences.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  requireGDPRP13nConsent: PropTypes.bool.isRequired,
  GDPRProfileP13nConsentGranted: PropTypes.bool,
  receiveEmail: PropTypes.string
};

ProfileEmailMarketingPreferences.defaultProps = {
  GDPRProfileP13nConsentGranted: undefined,
  receiveEmail: undefined
};

export default connect(getProfileData)(ProfileEmailMarketingPreferences);
