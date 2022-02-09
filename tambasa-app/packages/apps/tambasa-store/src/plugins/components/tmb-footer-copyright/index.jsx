import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {t} from '@oracle-cx-commerce/utils/generic';

import css from './styles.css';

const TmbFooterCopyright = props => {

  const {
    oracleLogo,
    copyrightText
  } = props;

  return (
    <Styled id="TmbFooterCopyright" css={css}>
      {/* Footer Copyright Starts here */}
      <div className="TmbFooterCopyright">
        <div className="TmbFooterCopyright__Oracle TmbFooterCopyright__Responsive">
          <div className="TmbFooterCopyright__Oracle__Logos">
            <a href="http://nsh-tech.com/" target="_blank">
              <img src="/file/general/nsh-logo.png" alt="NSH Logo" className="TmbFooterCopyright__NSHLogo" />
            </a>
            <img className="TmbFooterCopyright__OracleLogo" src={oracleLogo.src} alt="Oracle logo" />
          </div>
        </div>
        <div className="TmbFooterCopyright__Text TmbFooterCopyright__Responsive">
        <span className="TmbFooterCopyright__Responsive">{t(copyrightText)}</span>
        </div>
      </div>
      {/* Footer Copyright Ends here */}
    </Styled>
  );
};

export default TmbFooterCopyright;
