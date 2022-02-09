/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Checkbox from '@oracle-cx-commerce/react-components/checkbox';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

const RECEIVE_EMAIL_NO = 'no',
  RECEIVE_EMAIL_YES = 'yes';

const ProfileEmailPreference = props => {
  const {receiveEmail} = props;
  const {labelGetMarketingMails} = props;
  const {updatePreferencesSelection} = props;

  return (
    <Styled id="ProfileEmailPreference" css={css}>
      <div className="ProfilePreferences__Checkbox">
        <Checkbox
          id="receiveEmail"
          name="receiveEmail"
          defaultValue={RECEIVE_EMAIL_YES}
          defaultChecked={receiveEmail === RECEIVE_EMAIL_YES}
          labelText={labelGetMarketingMails}
          onChange={event => {
            updatePreferencesSelection({
              receiveEmail: event.target.checked ? RECEIVE_EMAIL_YES : RECEIVE_EMAIL_NO
            });
          }}
        />
      </div>
    </Styled>
  );
};

export default ProfileEmailPreference;
