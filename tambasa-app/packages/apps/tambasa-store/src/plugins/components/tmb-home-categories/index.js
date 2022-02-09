import React, { useContext, useState, useEffect } from 'react';
import Category from './components/category';

import Styled from '@oracle-cx-commerce/react-components/styled';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
SwiperCore.use([Navigation])

import css from './styles.css';
import TmbSpinner from '../utils/components/tmb-spinner';

const TmbHomeCategories = props => {
  // Extract information from category
  const { homeCategoriesCollectionsIds } = props;
  const [categoriesList, setCategoriesList] = useState([]);
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(true);

  const mapCategory = response => {
    if (response.ok) {
      let category = response.delta.catalogRepository.categories;
      const keys = Object.keys(category);
      category = category[keys[0]];

      const images = category.categoryImages.filter(image => {
        if (image.tags.length > 0) {
          let foundImage = image.tags.find(tag => tag.repositoryId.toLowerCase() === 'herotag');

          if (foundImage && foundImage.repositoryId) return foundImage.repositoryId.toLowerCase() == 'herotag';
        }
        return false;
      });

      return {
        id: category.displayName.replace(/\s/g, '').toLowerCase(),
        name: category.displayName,
        route: category.route,
        image: images[0].path
      };
    } else console.error('Não foi possível encontrar a coleção');
  };

  const { action } = useContext(StoreContext);
  const extractCategories = async () => {
    const collectionsIds = homeCategoriesCollectionsIds.split(',');
    const categories = [];
    for (const collectionId of collectionsIds) {
      try {
        const tempCategory = await action('getCollection', {
          categoryId: collectionId
        });
        const { id, name, route, image } = mapCategory(tempCategory);
        categories.push(<Category key={id} name={name} route={route} image={image} />);
      } catch (e) {
        console.log(e);
      }
    }
    setCategoriesList(categories);
    setIsSpinnerVisible(false);
  };

  useEffect(() => {
    extractCategories();
  }, []);

  const breakpointsSettings = {
    2560: {
      slidesPerView: 4
    },
    1920: {
      slidesPerView: 3
    },
    1280: {
      slidesPerView: 3
    },
    860: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 2
    },
    572: {
      slidesPerView: 2
    },
    460: {
      slidesPerView: 1
    },
    0: {
      slidesPerView: 1
    }
  }

  return (
    categoriesList.length > 0 
    ? <Styled id="TmbHomeCategories" css={css}>
      <div className="TmbHomeCategories">
        <Swiper navigation={true} spaceBetween={15} breakpoints={breakpointsSettings}>
          {categoriesList.map((slide, index) => (
            <SwiperSlide key={index}>{slide}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Styled>
  : <>
      <Styled id="TmbHomeCategories" css={css}>
        <div className="Loader__Container">
          <TmbSpinner show={isSpinnerVisible} />
        </div>
      </Styled>
    </>
  );
};

export default TmbHomeCategories;
