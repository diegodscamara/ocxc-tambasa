import React, {useState, useContext, useEffect} from 'react';
import CarouselItem from './components/carouselItem';
import CarouselBanner from './components/carouselBanner'

import PropTypes from 'prop-types';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import { getCategory } from '@oracle-cx-commerce/commerce-utils/selector';

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
SwiperCore.use([Navigation])

import css from './styles.css';
import TmbSpinner from '../utils/components/tmb-spinner'
import { shopperSelector } from '../../selectors';


/**
* This component is used to render the products of a category as a Carousel.
* @param {*} props
*/
const CategoryListingCarousel = props => {

  // configs
  const { 
    categoryId, 
    directionBannerCarousel
  } = props;

  const [categoryInfo, setCategoryInfo] = useState();
  const [categoryProductIds, setCategoryProductIds] = useState(null);
  const [slides, setSlides] = useState([])
  const [shopperContextLoaded, setShopperContextLoaded] = useState(false)
  const { action, getState, endpoint, subscribeDispatch } = useContext(StoreContext);

  async function fetchAsyncData() {
    const firstCategory = categoryId.split(',')[0]
    await action('getCollection', {
      categoryId: firstCategory,
      expandChildren: true,
      maxLevel: 10
    })

    setCategoryInfo(
      getCategory(getState(), { categoryId: firstCategory })
    );
    
    let { isUserLoggedIn, profile } = shopperSelector(getState())

    if(isUserLoggedIn) 
      if(profile && Object.keys(profile).length === 0) {
        await endpoint('getCurrentProfile')
        const shopperInfo = shopperSelector(getState())
        profile = shopperInfo.profile
      }

    const profilePriceListGroupId = profile.dynamicProperties && 
      profile.dynamicProperties.find(dp => dp.id === "tam_price_list_id") || "grupoPrecoReal"

    const listProductsResponse = await action('listProducts', {
      categoryId: firstCategory,
      includeChildren: true,
      limit: 16,
      priceListGroupId: typeof profilePriceListGroupId === "object" 
        ? profilePriceListGroupId.value : profilePriceListGroupId
    })

    if (listProductsResponse.status === 200) {
      const productIds = Object.keys(listProductsResponse.delta.catalogRepository.products);
      setCategoryProductIds(productIds);
    }
  }

  useEffect(() => {
    subscribeDispatch(action => {
      const { type } = action
      if(type === "setShopperContextComplete") 
        setShopperContextLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (categoryProductIds) {
      Object.values(categoryProductIds).forEach(productId => {
        setSlides(current => 
          [
            ...current, 
            <CarouselItem productId={productId} {...props} />
          ]
        )
      });
    }
  }, [categoryProductIds])
  
  useEffect(() => {
    fetchAsyncData()
  }, [action, categoryId, setCategoryProductIds, shopperContextLoaded]);

  const breakpointsSettings = {
    2300: {
      slidesPerView: 6
    },
    1920: {
      slidesPerView: 5
    },
    1300: {
      slidesPerView: 4
    },
    860: {
      slidesPerView: 3
    },
    460: {
      slidesPerView: 2
    },
    0: {
      slidesPerView: 1
    }
  }

  const customProps = { ...props, categoryInfo }

  return (
    slides.length > 0
    ? <Styled id="CategoryListingCarousel" css={css}>
      <CarouselBanner {...customProps} isMobile={true}/>
      <div className={`CategoryListingCarousel CarouselWrapper 
        ${directionBannerCarousel == "right" ? 'CarouselWrapperReverted' : ''}`}>
        <CarouselBanner {...customProps} />
        <Swiper navigation={true}
          spaceBetween={16}
          breakpoints={breakpointsSettings}
        >
          { slides.map((slide, index) => (
              <SwiperSlide key={index}>
                {slide}
              </SwiperSlide>
            )) 
          }
        </Swiper>
      </div>
    </Styled>
      : <>
        <Styled id="CategoryListingCarousel" css={css}>
          <div className="Loader__Wrapper">
            <TmbSpinner show={true} />
          </div>
        </Styled>
      </>
  );

};

CategoryListingCarousel.propTypes = {
  /** category id to display products as a carousel */
  categoryId: PropTypes.string.isRequired,
};

export default CategoryListingCarousel;