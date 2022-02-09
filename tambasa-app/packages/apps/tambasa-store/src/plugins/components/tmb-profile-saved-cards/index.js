/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, { useContext, useEffect, useState } from 'react';

import Alert from '@oracle-cx-commerce/react-components/alert';
import Card from '@oracle-cx-commerce/react-components/card';
import { PAGE_PROFILE_ADD_CREDIT_CARD_LINK } from '@oracle-cx-commerce/commerce-utils/constants';
import ProfileSavedCard from './components/profile-saved-card';
import PropTypes from 'prop-types';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import { getPageData } from './selectors';
import { useCardTypesFetcher } from '@oracle-cx-commerce/fetchers/payments/hooks';
import { useNavigator } from '@oracle-cx-commerce/react-components/link';
import AddCard from "./components/profile-add-credit-card";

//constants
const PROFILE_ADD_CREDIT_CARD = PAGE_PROFILE_ADD_CREDIT_CARD_LINK,
  ERROR = 'error';

/**
 * Top component for listing profile saved cards. It includes profile saved card sub component
 * It provides functionality to make a saved card as default card and provide
 * option to navigate to either add new card or delete existing card
 * @param {*} props the property object
 */
const ProfileSavedCards = props => {
  const {
    id,
    isUserLoggedIn,
    actionAddNewCard,
    headingSavedCreditCards,
    textProfileCardHelper1,
    textProfileCardHelper2,
    profileSavedCards = [],
    menuList,
    setMenuList,
    widgetId, 
    profile,
    activeTab
  } = props;
  const [actionCompletedSuccessfully, setActionCompletedSuccessfully] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const store = useContext(StoreContext);
  const [currentPage, setCurrentPage] = useState("main");
  const { action } = store;
  // local state to show action result in alert
  const [actionResponse, setActionResponse] = useState({ type: '', message: '' });

  const isB2BUserProfile = profile.dynamicProperties ? profile.dynamicProperties.find((prop) => prop.id === "tam_isB2B_user").value : false;

  // Fetches the list of card types
  useCardTypesFetcher(store);

  useEffect(() => {
    if (menuList && menuList.length > 0) {

      var menuListTemp = menuList.find(el => el.widgetId === widgetId);

      if (menuListTemp && !menuListTemp.name) {

        menuListTemp.name = "MEUS CARTÕES";

        setMenuList(menuList);
      }
    }
  }, [menuList]);

  useEffect(() => {
    setCurrentPage("main");
  }, [activeTab]);

  //use effect to trigger list profile card actions
  useEffect(() => {
    if (!actionCompletedSuccessfully && isUserLoggedIn && !errorOccured) {
      action('listProfileSavedCards').then(response => {
        if (response.ok) setActionCompletedSuccessfully(true);
        if (!response.ok) {
          const { error } = response;
          setActionResponse({ type: ERROR, message: error.message });
          setErrorOccured(true);
        }
      });
    }
  }, [action, actionCompletedSuccessfully, errorOccured, isUserLoggedIn]);

  const goToPage = useNavigator();

  /**
   * Function to navigate to add new card page
   */
  const gotoNewCardPage = () => {
    /* goToPage(PROFILE_ADD_CREDIT_CARD); */
    setCurrentPage("add-card");
  };

  return (
    <Styled id="TmbProfileSavedCards" css={css}>
      {currentPage === "main" && (

        <>
          {isUserLoggedIn && (
            <div className="ProfileSavedCards">
              <div>
                <h1>{headingSavedCreditCards}</h1>
              </div>
              {actionResponse.message && actionResponse.type && (
                <div className="ProfileSavedCards__ActionResponse">
                  <Alert
                    id={`ProfileAddCreditCard__Alert-${props.id}`}
                    type={actionResponse.type}
                    message={actionResponse.message}
                  />
                </div>
              )}
              {actionCompletedSuccessfully &&
                (profileSavedCards.length === 0 ? (
                  <div>
                    <Card type="primary" className="ProfileSavedCards__NoSavedCards">
                      <span>{textProfileCardHelper1}</span>
                      <span>{textProfileCardHelper2}</span>
                    </Card>
                  </div>
                ) : (
                  <div class="cards-container">
                    <ProfileSavedCardList
                      profileSavedCards={profileSavedCards}
                      setActionResponse={setActionResponse}
                      inProgress={inProgress}
                      setInProgress={setInProgress}
                      {...props}
                    />
                  </div>
                ))}
              <div className="ProfileSavedCards__Footer">
                <button
                  className="add-new-card"
                  id={`addNewCard-${id}`}
                  aria-labelledby={`noSavedCards-${id} addNewCard-${id}`}
                  type="button"
                  onClick={() => gotoNewCardPage()}
                >
                  {actionAddNewCard}
                </button>
              </div>
            </div>
          )}
        </>
      )}
      {currentPage === "add-card" && (
        <AddCard isB2BUserProfile={isB2BUserProfile} setCurrentPage={setCurrentPage} {...props}/>
      )}
    </Styled>
  );
};

/**
 * Displays list of saved cards
 * @param props the required properties
 */
const ProfileSavedCardList = props => {
  //transform saved cards into a list of profile card item
  const savedCards = props.profileSavedCards.map(savedCard => (
    <div className="card-main-container ProfileSavedCards__ListItem" key={savedCard.savedCardId}>
      <ProfileSavedCard cardDetails={savedCard} {...props} />
    </div>
  ));

  return savedCards;
};

ProfileSavedCards.propTypes = {
  /**
   * The unique id for the component
   */
  id: PropTypes.string.isRequired,

  /**
   * Flag to indicate if user is logged in or not
   */
  isUserLoggedIn: PropTypes.bool.isRequired,

  /**
   * The array of credit/debit cards object
   * from redux state(ProfileRepository->savedCards>-profileId->savedCardsMap)
   */
  profileSavedCards: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Card type
       */
      cardType: PropTypes.string.isRequired,
      /**
       * Card number
       */
      cardNumber: PropTypes.string.isRequired,
      /**
       * Expiry month of card
       */
      expiryMonth: PropTypes.string.isRequired,
      /**
       * Expiry year of card
       */
      expiryYear: PropTypes.string.isRequired,
      /**
       * Name of card
       */
      nameOnCard: PropTypes.string.isRequired,
      /**
       * Flag to indicate whether card is default card
       */
      isDefault: PropTypes.bool.isRequired,
      /**
       * Saved card id
       */
      savedCardId: PropTypes.string.isRequired
    })
  )
};

/**
 * Default values for not required properties
 */
ProfileSavedCards.defaultProps = {
  profileSavedCards: []
};

export default connect(getPageData)(ProfileSavedCards);
