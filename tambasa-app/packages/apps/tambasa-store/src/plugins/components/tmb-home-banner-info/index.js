import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';

import css from './styles.css';

const TmbHomeBannerInfo = props => {
  const {
    firstTitleTop,
    firstTitleBottom,
    secondTitleTop,
    secondTitleBottom,
    thirdTitleTop,
    thirdTitleBottom,
    fourthTitleTop,
    fourthTitleBottom,
    fifthTitleTop,
    fifthTitleBottom,
    firstImage,
    secondImage,
    thirdImage,
    fourthImage,
    fifthImage
  } = props;

  return (
    <Styled id="TmbHomeBannerInfo" css={css}>
      {/* Home banner info starts here */}

      <div className="TmbHomeBannerInfo">
        <div className="TmbHomeBannerInfo__Container">
          <img className="TmbHomeBannerInfo__Container-Image" src={firstImage.src} alt="No image" />
          <div className="TmbHomeBannerInfo__Container-Content">
            <span className="TmbHomeBannerInfo__Container-Title">{firstTitleTop}</span>
            <span className="TmbHomeBannerInfo__Container-Text">{firstTitleBottom}</span>
          </div>
        </div>
        <div className="TmbHomeBannerInfo__Container">
          <img className="TmbHomeBannerInfo__Container-Image" src={secondImage.src} alt="No image" />
          <div className="TmbHomeBannerInfo__Container-Content">
            <span className="TmbHomeBannerInfo__Container-Title">{secondTitleTop}</span>
            <span className="TmbHomeBannerInfo__Container-Text">{secondTitleBottom}</span>
          </div>
        </div>
        <div className="TmbHomeBannerInfo__Container">
          <img className="TmbHomeBannerInfo__Container-Image" src={thirdImage.src} alt="No image" />
          <div className="TmbHomeBannerInfo__Container-Content">
            <span className="TmbHomeBannerInfo__Container-Title">{thirdTitleTop}</span>
            <span className="TmbHomeBannerInfo__Container-Text">{thirdTitleBottom}</span>
          </div>
        </div>
        <div className="TmbHomeBannerInfo__Container">
          <img className="TmbHomeBannerInfo__Container-Image" src={fourthImage.src} alt="No image" />
          <div className="TmbHomeBannerInfo__Container-Content">
            <span className="TmbHomeBannerInfo__Container-Title">{fourthTitleTop}</span>
            <span className="TmbHomeBannerInfo__Container-Text">{fourthTitleBottom}</span>
          </div>
        </div>
        <div className="TmbHomeBannerInfo__Container">
          <img className="TmbHomeBannerInfo__Container-Image" src={fifthImage.src} alt="No image" />
          <div className="TmbHomeBannerInfo__Container-Content">
            <span className="TmbHomeBannerInfo__Container-Title">{fifthTitleTop}</span>
            <span className="TmbHomeBannerInfo__Container-Text">{fifthTitleBottom}</span>
          </div>
        </div>
      </div>
      {/* Home banner info Ends here    */}
    </Styled>
  );
};

export default TmbHomeBannerInfo;
