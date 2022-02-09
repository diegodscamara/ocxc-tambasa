import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {BsEnvelope} from 'react-icons/bs';
import {t} from '@oracle-cx-commerce/utils/generic';

import css from './styles.css';

const tmbFooterNewsletter = props => {

  const {
    newsletterText,
    newsletterButton
  } = props;

  return (
    <Styled id="tmbFooterNewsletter" css={css}>
      {/* Footer Newsltter Starts here */}
      <div className="TmbFooterNewsletter">
        <form className="TmbFooterNewsletter__Form">
          <div className="TmbFooterNewsletter__Text Responsive">
            <p>
              <BsEnvelope className="TmbFooterNewsletter__Icon" />
              {t(newsletterText)}
            </p>
          </div>
          <div className="TmbFooterNewsletter__Input Responsive">
            <input className="TmbFooterNewsletter__Input-Content Responsive" type="email" placeholder="Preencha seu e-mail aqui" />
          </div>
          <div className="TmbFooterNewsletter__Register Responsive">
            <button className="TmbFooterNewsletter__Register-Button Responsive" type="submit">
              {t(newsletterButton)}
            </button>
          </div>
          <div className="TmbFooterNewsletter__Right"></div>
        </form>
      </div>
      {/* Footer Newsltter Ends here */}
    </Styled>
  );
};

export default tmbFooterNewsletter;
