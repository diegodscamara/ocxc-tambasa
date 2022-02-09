import React, { useCallback, useEffect, useState, useContext } from 'react';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import Modal from '@oracle-cx-commerce/react-components/modal';
import ProductImagePanel from './components/product-image-panel';
import { isMobile } from '@oracle-cx-commerce/commerce-utils/selector';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { useComponentData } from '@oracle-cx-commerce/react-widgets/product/product-image-viewer/selectors';
import { noop } from '@oracle-cx-commerce/utils/generic';
import { scrollToTop } from '../utils/misc/dom-functions'

import css from './styles.css';
/**
 * Product Image component. Gathers image data and renders a ProductImageSlider component.
 */
const TmbProductImageViewer = props => {
  // selector
  const { primaryImageTitle, activeImages, thumbImages } = useComponentData();
  const mobile = isMobile(useContext(StoreContext).getState());

  // state
  const [portalRendered, setPortalRendered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [portalOpenedOnce, setPortalOpenedOnce] = useState(false);

  const { closeLinkAltText, cssOverride } = props;
  portalRendered && !portalOpenedOnce && setPortalOpenedOnce(true);

  /**
   * Handler for clicking close
   */
  const closePortal = useCallback(() => {
    setPortalRendered(false);
  }, []);
  
  /**
   * When a different Sku is selected, reset the slider Images index to zero
   */
  useEffect(() => {
    setCurrentIndex(0);
    scrollToTop()
  }, [activeImages]);

  return (
    <Styled id="TmbProductImageViewer" css={css}>
      <div className="TmbProductImageViewer">
        <ProductImagePanel
          primaryImageTitle={primaryImageTitle}
          images={activeImages}
          thumbs={thumbImages}
          portalRendered={portalRendered}
          setPortalRenderedCallback={setPortalRendered}
          showExpand={true}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          mobile={mobile}
          {...props}
        />

        <Modal
          cssOverride={cssOverride}
          className="TmbProductImageViewer__Modal"
          show={portalRendered}
          onClose={closePortal}
          closeIconTitle={closeLinkAltText}
          closeArialLabel={closeLinkAltText}
        >
          {portalOpenedOnce && (
            <ProductImagePanel
              primaryImageTitle={primaryImageTitle}
              images={activeImages}
              thumbs={thumbImages}
              portalRendered={portalRendered}
              setPortalRenderedCallback={noop}
              showExpand={false}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              mobile={mobile}
              {...props}
            />
          )}
        </Modal>
      </div>
    </Styled>
  );
};

export default TmbProductImageViewer;
