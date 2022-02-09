import React, { useContext, useEffect, useMemo, useState } from 'react';
import css from './styles.css';
// import TmbGenericCarousel from '../utils/layouts/tmb-generic-carousel'
import ProductItem from './components/product-item';
import PropTypes from 'prop-types';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import {useSelector} from '@oracle-cx-commerce/react-components/provider';
import {
  isMobile,
  getProducts,
  getRecommendations,
  getRecommendationsSet
} from '@oracle-cx-commerce/commerce-utils/selector';

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'

SwiperCore.use([Navigation])

/**
* This component is used to render the product recommendations as a Carousel.
* @param props
*/
const TmbProductRecommendationsCarousel = props => {
  const { widgetId, recommendationsTitle } = props;

  const mobile = useSelector(isMobile);
  const recommendations = useSelector(getRecommendations, {widgetId});
  const {recSetId} = useSelector(getRecommendationsSet, {widgetId});
  const products = useSelector(getProducts);
  const {action} = useContext(StoreContext);

  const [ commonText, setCommonText ] = useState('')
  const [ highlightedText, setHighlightedText ] = useState('')

  const splitRecommendationsText = () => {
    if(!recommendationsTitle) return

    const [ commonText, highlightedText ] = recommendationsTitle.split('/')
    
    setCommonText(
      commonText && typeof commonText === 'string' 
        ? commonText.trim() 
        : commonText
    )

    setHighlightedText(
      highlightedText && typeof highlightedText === 'string' 
        ? highlightedText.trim()
        : highlightedText
    )
  }

  useEffect(() => {
    if (recommendations && recommendations.length > 0) {
      // Exclude relatedProducts to reduce the size of the response and
      // to workaround an issue with variants if any of the recommended products
      // has a related product that is currently being viewed on a PDP page.
      const payload = {productIds: recommendations, exclude: 'items.relatedProducts'};

      action('listProducts', payload);
      
      // Extracting recommendations title.
      // Common and hightlighted part
      splitRecommendationsText()
    }
  }, [action, recommendations, recommendationsTitle]);

  const productsForSlides = [];

  useMemo(() => {
    recommendations
      .map(productId => products[productId])
      .filter(product => product != null)
      .forEach(product => {
        productsForSlides.push(product);
      });
  }, [recommendations, products, productsForSlides, recSetId, props]);

  if (productsForSlides.length === 0) {
    return null;
  }

  const breakpointsSettings = {
    2000: {
      slidesPerView: 6
    },
    1300: {
      slidesPerView: 5
    },
    1000: {
      slidesPerView: 4
    },
    768: {
      slidesPerView: 3
    }
  }

  return (
    <Styled id="TmbProductRecommendationsCarousel" css={css}>
      {recommendations && recommendations.length > 0 && (
        <div className="TmbProductRecommendationsCarousel">
          <div className="TmbProductRecommendationsCarousel__Heading">
            { commonText &&
              <span className="TmbProductRecommendationsCarousel__Heading___CommonText">
                { commonText }
              </span> }
            { highlightedText &&
              <span className="TmbProductRecommendationsCarousel__Heading___HighlightedText">
                { highlightedText }
              </span>
            }
          </div>
          <div className="TmbProductRecommendationsCarousel_Content">
            <Swiper navigation={true} 
              spaceBetween={30}
              breakpoints={breakpointsSettings}>
              { productsForSlides.map(product => (
                <SwiperSlide key={product.id}>
                  <ProductItem {...props} product={product} recSetId={recSetId} />
                </SwiperSlide>
              )) }
            </Swiper>
          </div>
        </div>
      )}
    </Styled>
  );
};

TmbProductRecommendationsCarousel.propTypes = {
  /** The id of the widget */
  widgetId: PropTypes.string.isRequired,

  /* It's a config who defines the carousel title */
  recommendationsTitle: PropTypes.string.isRequired
};

export default TmbProductRecommendationsCarousel;
