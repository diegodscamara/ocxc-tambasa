/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Checkbox from '@oracle-cx-commerce/react-components/checkbox';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

const ProfileGDPRConsent = props => {
  const {GDPRProfileP13nConsentGranted} = props;
  const {labelShowPersonalizationConsent} = props;
  const {updatePreferencesSelection} = props;

  return (
    <Styled id="ProfileGDPRConsent" css={css}>
      <div className="ProfilePreferences__Checkbox">
        <Checkbox
          id="GDPRProfileP13nConsentGranted"
          name="GDPRProfileP13nConsentGranted"
          defaultValue={true}
          defaultChecked={GDPRProfileP13nConsentGranted}
          labelText={labelShowPersonalizationConsent}
          onChange={event => {
            updatePreferencesSelection({
              GDPRProfileP13nConsentGranted: event.target.checked
            });
          }}
        />
      </div>
    </Styled>
  );
};

export default ProfileGDPRConsent;
