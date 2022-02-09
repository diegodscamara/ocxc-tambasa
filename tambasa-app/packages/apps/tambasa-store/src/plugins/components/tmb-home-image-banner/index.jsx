import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Link from '@oracle-cx-commerce/react-components/link';

import css from './styles.css';

const TmbHomeImageBanner = props => {
  return (
    <Styled id="tmbHomeImageBanner" css={css}>
      <div className="tmbHomeImageBanner"> 
        <Link route={props.linkRedirectBannerHome}>
          <img className="image-banner-home" src={props.imageBannerHome.src} alt="No image" />
        </Link>
      </div>
    </Styled>
  );
};

export default TmbHomeImageBanner;
