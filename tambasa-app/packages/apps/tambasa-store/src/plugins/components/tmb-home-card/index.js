import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Link from '@oracle-cx-commerce/react-components/link'
import {BsArrowRight} from 'react-icons/bs';

import css from './styles.css';

const TmbHomeCard = props => {
  const {
    cardBackground, 
    titleTop = '', 
    titleBottom = '', 
    categoryLink, 
    linkText = ''
  } = props;
  return (
    <Styled id="TmbHomeCard" css={css}>
      {/* Home Card starts here */}
      <div className="TmbHomeCard">
        <img className="TmbHomeCard__Background" src={cardBackground.src} alt="No image" />
        <div className="TmbHomeCard__Fade">
          <div className="TmbHomeCard__Content">
            <span className="TmbHomeCard__Content-Title">{titleTop}</span>
            <span className="TmbHomeCard__Content-Title">{titleBottom}</span>
            <span className="TmbHomeCard__Content-Border"></span>
            <Link className="TmbHomeCard__Content-More" route={categoryLink}>
              {linkText} <BsArrowRight width="22px" height="9px" />
            </Link>
          </div>
        </div>
      </div>
      {/* Home Card ends here */}
    </Styled>
  );
};

export default TmbHomeCard;
