import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {t} from '@oracle-cx-commerce/utils/generic';
import Link from '@oracle-cx-commerce/react-components/link'

import { PAGE_PROFILE_LINK, PAGE_LOGIN_LINK } from '@oracle-cx-commerce/commerce-utils/constants'
import { CgProfile } from 'react-icons/cg'
import { BiLogIn } from 'react-icons/bi'
import css from './styles.css';

import { getComponentData } from './selectors'
import { connect } from '@oracle-cx-commerce/react-components/provider'

const TmbHeaderMyAccount = props => {
  
  const { myAccountTitle, loginTitle } = props

  return (
    <Styled id="TmbHeaderMyAccount" css={css}>
      <div className="MyAccountContainer">
        <Link route={ props.isLoggedIn ? PAGE_PROFILE_LINK : PAGE_LOGIN_LINK }>
          <div className="MyAccountContainer__Icon">
            { props.isLoggedIn 
                ? <CgProfile/>
                : <BiLogIn/>
            }
          </div>
          <div className="MyAccountContainer__Title">
            { props.isLoggedIn 
              ? t(myAccountTitle)
              : t(loginTitle)
            }
          </div>
        </Link>
      </div>
    </Styled>
  );
};

export default connect(getComponentData)(TmbHeaderMyAccount);
