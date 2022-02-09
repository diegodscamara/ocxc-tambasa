import React, {useState, useEffect} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect, useSelector} from '@oracle-cx-commerce/react-components/provider';
import {isMobile} from '@oracle-cx-commerce/commerce-utils/selector';

import {getComponentData} from './selectors'
import Breadcrumbs from './components/Breadcrumbs';
import css from './styles.css';

const getFirstIndependetImage = (categoryImages) => {
  return categoryImages.length > 0 ? categoryImages[0] : {}
}

const findCategoryImage = (categoryImages, setDisplayedCategoryImage) => {
  const result = categoryImages.filter(categoryImage => {
    return categoryImage.tags.find(tag => tag.repositoryId === 'largeTag')  
  })

  setDisplayedCategoryImage(result.lenght > 0 
    ? result[0]
    : getFirstIndependetImage(categoryImages))
}

/**
* Widget that displays all the images that are configured for a particular category
*/
const TmbCategoryImage = props => {
  const {
    displayName,
    categoryImages = []
  } = props;
  
  //selector
  const [displayedCategoryImage, setDisplayedCategoryImage] = useState({})
  const mobile = useSelector(isMobile);

  useEffect(() => {
    findCategoryImage(categoryImages, setDisplayedCategoryImage)
  }, [props])

  const imagePath = displayedCategoryImage.path || '/no-image.png'

  return (
    <Styled id="TmbCategoryImage" css={css}>
      { !mobile
          ? (
            <div className="TmbCategoryImage__Container">
              <div className="TmbCategoryImage__Container__Overlay">
                <Breadcrumbs { ...props }/>
                <h2 className="TmbCategoryImage__Container__Overlay___Title">{displayName}</h2>
              </div>
              <div className="TmbCategoryImage__Container__Image"
                style={{
                  backgroundImage: `url(/file${imagePath})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </div>
          )
          : <></>
      }
    </Styled>
  );
};

export default connect(getComponentData)(TmbCategoryImage);
