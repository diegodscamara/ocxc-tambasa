/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

 import {
    CollectionNavCardContext,
    CollectionNavContext
  } from '@oracle-cx-commerce/react-widgets/category/collection-navigation/context';
  import React, {useCallback, useContext, useEffect, useRef} from 'react';
  
  import ChildCollectionFooter from '@oracle-cx-commerce/react-widgets/category/collection-navigation/components/child-collection-footer';
  import ChildCollectionHeader from '@oracle-cx-commerce/react-widgets/category/collection-navigation/components/child-collection-header';
  import ChildCollectionListing from '@oracle-cx-commerce/react-widgets/category/collection-navigation/components/child-collection-listing';
  import PropTypes from 'prop-types';
  
  /**
   * Represents a child collection.
   */
  const ChildCollectionCard = ({category, index}) => {
    const {visibleCards, onCardVisibilityChange, shouldCardBeHiddenToTheLeft, isCardVisible, closeChildCards} =
      useContext(CollectionNavContext);
  
    // THE ONLY CHANGE IT'S ON THE LINE BELOW, SOMETIMES THERE'S NO CATEGORY OBJECT
    if(!category) return <></>

    const {id, displayName, childCategories = []} = category;
  
    const context = {category, index, isVisible: isCardVisible};
    const cardRef = useRef();
  
    // defines a list of elements which can gain focus
    const focussableElements =
      'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled])';
  
    // Helper const to use below as a dependency
    const test = visibleCards[index];
  
    // focus on the top element of the view as soon as the view open
    useEffect(() => {
      if (isCardVisible(index)) {
        /* needs a delay to ensure that the UI has fully rendered before attempting to set focus, setting it too early results in the browser
          halting the transition */
        setTimeout(() => {
          if (cardRef.current) {
            const focussable = Array.from(cardRef.current.querySelectorAll(focussableElements));
            const topElement = focussable[0];
            topElement.focus();
          }
        }, 500);
      }
    }, [cardRef, index, isCardVisible, test]);
  
    // Close the menu when the escape key is pressed
    const onEscapeKeyDown = useCallback(
      e => {
        if (e.key === 'Escape' && isCardVisible(index)) closeChildCards();
      },
      [closeChildCards, index, isCardVisible]
    );
  
    // If there are no child categories, don't create the card
    if (!childCategories) {
      return <></>;
    }
  
    return (
      <React.Fragment>
        <CollectionNavCardContext.Provider value={context}>
          <input
            type="checkbox"
            name="CollectionNavigation_ChildCard"
            id={`CollectionNavigation_ChildCard--${id}`}
            style={{display: 'none'}}
            checked={visibleCards[index]}
            onChange={({target}) => onCardVisibilityChange(index, target.checked, id, displayName)}
          />
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            className={`CollectionNavigation_ChildCard ${shouldCardBeHiddenToTheLeft(index) ? 'HideLeft' : ''} ${
              isCardVisible(index) ? '' : 'CollectionNavigation_ChildCard--Hidden'
            }`}
            ref={cardRef}
            aria-hidden={!isCardVisible(index)}
            data-testid="childCard"
            onKeyDown={onEscapeKeyDown}
          >
            <ChildCollectionHeader />
            <ChildCollectionListing />
            <ChildCollectionFooter />
          </div>
        </CollectionNavCardContext.Provider>
      </React.Fragment>
    );
  };
  
  ChildCollectionCard.propTypes = {
    /** An object representing a category in the catalog */
    category: PropTypes.shape({
      /** The id of the category */
      id: PropTypes.string.isRequired,
      /** Name of the category */
      displayName: PropTypes.string,
      /** Route of the category page */
      route: PropTypes.string.isRequired,
      /** The array of sub-categories, if any */
      childCategories: PropTypes.arrayOf(PropTypes.object)
    }).isRequired,
    /** The index of current sub-category */
    index: PropTypes.number.isRequired
  };
  
  ChildCollectionCard.defaultProps = {};
  
  export default React.memo(ChildCollectionCard);
  