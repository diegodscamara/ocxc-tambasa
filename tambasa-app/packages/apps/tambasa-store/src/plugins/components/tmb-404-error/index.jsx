import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {t} from '@oracle-cx-commerce/utils/generic';
import css from './styles.css';
import Link from '@oracle-cx-commerce/react-components/link';

const Tmb404Error = props => {
  return (
    <Styled id="tmb404Error" css={css}>
      <div className="tmb404Error">
        <div className="content-404">
          <div className="image404">
            <img className="image404-img" src="/file/general/img-404.png" alt="Error 404 Image"
            title="Error 404 Image"/>
          </div>
          <div className="pageNotFound2">
            <p className="pageNotFound1-p">{t(props.pageNotFound1)}</p>
            <p className="pageNotFound2-p">{t(props.pageNotFound2)}</p>
          </div>

          <div className="pageNotFound3">
            <p className="pageNotFound3-p">{t(props.pageNotFound3)}</p>
          </div>

          <div className="backToHome">
            <Link route="/home">
              <button className="backToHome-btn">{t(props.backToHome)}</button>
            </Link>
          </div>
        </div>
      </div>
    </Styled>
  );
};

export default Tmb404Error;
