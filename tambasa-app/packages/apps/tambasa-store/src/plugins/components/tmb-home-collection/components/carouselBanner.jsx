import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Link from '@oracle-cx-commerce/react-components/link';
import {t} from '@oracle-cx-commerce/utils/generic'
import {FaAngleRight} from 'react-icons/fa'

import css from '../styles.css';

const ProductBanner = props => {

  const { categoryInfo, isMobile } = props;

  return (
    <Styled id="ProductBanner" css={css}>
      <div className={`ProductBanner ${isMobile ? 'ProductBanner--mobile' : ''}`}>
        <div className="Relative-div">
          <div className="ProductBanner__Image" style={{ backgroundImage: `url(${props.imageCarouselBanner.src})` }}></div>
          <div className="Banner-relative">
            <div className="content-top">
              <p className="p-content-top">{categoryInfo.displayName}</p>
              <div className="White-bar"></div>
            </div>
            <div className="content-bottom">
              { isMobile
                ? (
                  <Link route={categoryInfo.route}>
                    <FaAngleRight className="ProductBanner__Icon"/>
                  </Link>
                )
                : (
                  <>
                    <Link route={categoryInfo.route}>
                      <p className="p-content-bottom">{t(props.clickAndSeeProducts)}</p>
                    </Link>
                    <img src="/file/general/seta-banner-home.png" alt="" />
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </Styled>
  );
};

export default ProductBanner;