import React from 'react';
import Img from '@oracle-cx-commerce/react-components/img';
import Link from '@oracle-cx-commerce/react-components/link';
import PropTypes from 'prop-types';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css'
import {noop} from '@oracle-cx-commerce/utils/generic';

const TmbImage = props => {
  const {
    media = {},
    mediaLink = '',
    mediaLinkBehavior = '',
    mediaTitle = '',
    mediaAlt = '',
    errorSrc = null,
    onErrorCallback = noop
  } = props;

  const mediaSrc = media.src;

  let imgLinkCSS = 'Image_Link ';
  let imgCSS = 'Image_Img ';

  const renderImage = () => {
    return (
      <>
        <div className={`Image_ImgContainer ${imgCSS}`}>
          <Img errorSrc={errorSrc}  
            src={mediaSrc}
            title={mediaTitle}
            alt={mediaAlt}
            onErrorCallback={onErrorCallback} />
        </div>
      </>
    );
  };

  const ImageLink = () => {
    let linkProps = {
      className: imgLinkCSS
    };

    if (mediaLink) {
      linkProps = {...linkProps, href: mediaLink};
    }

    if (mediaLinkBehavior === '_self') {
      return <Link {...linkProps}>{renderImage()}</Link>;
    }
    linkProps = {...linkProps, target: mediaLinkBehavior};

    return <a {...linkProps}>{renderImage()}</a>;
  };

  return (
    <Styled id="TmbImage" css={css}>
      <figure className="TmbImage">
        <ImageLink />
      </figure>
    </Styled>
  );
};

TmbImage.propTypes = {
  media: PropTypes.shape(PropTypes.object.isRequired).isRequired,
  mediaLink: PropTypes.string,
  mediaLinkBehavior: PropTypes.string,
  mediaTitle: PropTypes.string,
  mediaAlt: PropTypes.string.isRequired,
  errorSrc: PropTypes.string
};

TmbImage.defaultProps = {
  mediaLink: '',
  mediaLinkBehavior: '',
  mediaTitle: '',
  errorSrc: null
};

export default TmbImage;
