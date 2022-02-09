import Img from '@oracle-cx-commerce/react-components/img';
import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import PropTypes from 'prop-types';

import css from './styles.css';

const ProductImageThumbnails = props => {
  const {thumbs, currentIndex, setCurrentImageIndex, primaryImageTitle} = props;

  return (
    <Styled id="TmbProductImageViewer__Thumbnails" css={css}>
      <div className="TmbProductImageViewer__ThumbnailsWrapper">
        <ol className="TmbProductImageViewer__Thumbnails">
          {thumbs.map((value, index) => {
            const imgKey = `${value}_${index}`;

            return (
              <li key={imgKey} className={index === currentIndex ? 'TmbProductImageViewer__Thumbnails--selected' : ''}>
                <span
                  onClick={() => setCurrentImageIndex(index)}
                  onKeyDown={() => setCurrentImageIndex(index)}
                  role="button"
                  tabIndex="0"
                >
                  <Img src={value} alt={primaryImageTitle} size="xsmall" outputFormat="JPEG" />
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </Styled>
  );
};

ProductImageThumbnails.propTypes = {
  /*
   * current image index.
   */
  currentIndex: PropTypes.number.isRequired,
  /*
   * Title of the primary image.
   */
  primaryImageTitle: PropTypes.string,
  /*
   * Callback function to set current image index.
   */
  setCurrentImageIndex: PropTypes.func.isRequired,
  /*
   * Thumbnails array.
   */
  thumbs: PropTypes.arrayOf(PropTypes.string).isRequired
};

ProductImageThumbnails.defaultProps = {
  primaryImageTitle: undefined
};

export default React.memo(ProductImageThumbnails);
