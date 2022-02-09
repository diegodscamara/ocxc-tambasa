import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin} from 'react-icons/ai';
import Link from '@oracle-cx-commerce/react-components/link';
import {t} from '@oracle-cx-commerce/utils/generic';

import css from './styles.css';

const TmbFooterSocial = props => {
  const {
    tambasaLogoLink, 
    facebookLink, 
    instagramLink, 
    linkedinLink,
    socialText1,
    socialText2
  } = props;

  return (
    <Styled id="TmbFooterSocial" css={css}>
      {/* Footer Social Starts here */}
      <div className="TmbFooterSocial">
        <div className="TmbFooterSocial__Logo TmbFooterSocial__Responsive">
          <Link className="TmbFooterSocial__Link" route={tambasaLogoLink}>
            <div className="TmbFooterSocial__Imagem" />
          </Link>
        </div>
        <div className="TmbFooterSocial__Text TmbFooterSocial__Responsive">
          <p>
            {t(socialText1)} <b>{t(socialText2)}</b>
          </p>
        </div>
        <div className="TmbFooterSocial__Icons TmbFooterSocial__Responsive">
          <Link className="TmbFooterSocial__Link" route={facebookLink}>
            <AiOutlineFacebook className="TmbFooterSocial__Icon" />
          </Link>
          <Link className="TmbFooterSocial__Link" route={instagramLink}>
            <AiOutlineInstagram className="TmbFooterSocial__Icon" />
          </Link>
          <Link className="TmbFooterSocial__Link" route={linkedinLink}>
            <AiOutlineLinkedin className="TmbFooterSocial__Icon" />
          </Link>
        </div>
      </div>
      {/* Footer Social Ends here */}
    </Styled>
  );
};

export default TmbFooterSocial;
