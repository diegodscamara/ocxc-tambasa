import React, { useState } from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';

import css from './styles.css';

import AccountsAndContactsRegistration from '@oracle-cx-commerce/react-widgets/profile/accounts-contacts-registration/component';
import BuildingIcon from '@oracle-cx-commerce/react-components/icons/building';
import HomeIcon from '@oracle-cx-commerce/react-components/icons/home';
import Link from '@oracle-cx-commerce/react-components/link';
import { PAGE_LOGIN_LINK } from '@oracle-cx-commerce/commerce-utils/constants';
import ProfileRegistration from '../tmb-profile-registration';
import PropTypes from 'prop-types';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import { forbiddenPageTypes } from './config';
import { getComponentData } from './selectors';


const TmbAccountTypeSelector = props => {
  const {
    textLogIn,
    personalAccountText,
    selectAccountTypeTextSummary,
    businessAccountText,
    selectAccountTypeText,
    siteTypeHelpText,
    b2bCommerceValueIndex,
    commerceValueIndex,
    pageType,
    isLoggedInUser
  } = props;

  const defaultSate = { isSiteSupportsB2C: true, isSiteSupportsB2B: false };
  const show = !isLoggedInUser || !forbiddenPageTypes.includes(pageType);

  /* if (b2bCommerceValueIndex >= 0 && commerceValueIndex < 0) {
    defaultSate.isSiteSupportsB2B = true;
    defaultSate.isSiteSupportsB2C = false;
  } else if (b2bCommerceValueIndex < 0 && commerceValueIndex >= 0) {
    defaultSate.isSiteSupportsB2C = true;
    defaultSate.isSiteSupportsB2B = false;
  } else if (commerceValueIndex >= 0 && b2bCommerceValueIndex >= 0) {
    defaultSate.isSiteSupportsB2B = true;
    defaultSate.isSiteSupportsB2C = true;
  }
 */
  const [display, setDisplay] = useState(defaultSate);

  if (display.isSiteSupportsB2C && !display.isSiteSupportsB2B && show) {
    return <ProfileRegistration {...props} />;
  }
  if (!display.isSiteSupportsB2C && display.isSiteSupportsB2B && show) {
    return <AccountsAndContactsRegistration {...props} />;
  }
  if (!display.isSiteSupportsB2C && !display.isSiteSupportsB2B && show) {
    return <h1>{siteTypeHelpText}</h1>;
  }

  return (
    <Styled id="AccountTypeSelector" css={css}>
      
      {show && (
        <div className="AccountTypeSelector">
          <h1>{selectAccountTypeText}</h1>
          <p>{selectAccountTypeTextSummary}</p>
          <div className="AccountTypeSelector__Row">
            <button
              type="button"
              className="AccountTypeSelector__Option"
              onClick={() => {
                setDisplay({ ...display, isSiteSupportsB2C: true, isSiteSupportsB2B: false });
              }}
            >
              <HomeIcon className="AccountTypeSelector_Icon" />
              <p>{personalAccountText}</p>
            </button>
            <button
              type="button"
              className="AccountTypeSelector__Option"
              onClick={() => {
                setDisplay({ ...display, isSiteSupportsB2C: false, isSiteSupportsB2B: true });
              }}
            >
              <BuildingIcon className="AccountTypeSelector_Icon" />
              <p>{businessAccountText}</p>
            </button>
          </div>
          <Link href={PAGE_LOGIN_LINK} className="AccountTypeSelector__LinkToLogin">
            {textLogIn}
          </Link>
         
        </div>
      )}
      
    </Styled>
  );
};

TmbAccountTypeSelector.propTypes = {
  /**
   * This is the index of 'b2b-commerce' type in siteTypes
   */
  b2bCommerceValueIndex: PropTypes.number,
  /**
   * This is the index of 'commerce' type in siteTypes
   */
  commerceValueIndex: PropTypes.number
};

TmbAccountTypeSelector.defaultProps = {
  b2bCommerceValueIndex: -1,
  commerceValueIndex: 0
};

export default connect(getComponentData)(TmbAccountTypeSelector);