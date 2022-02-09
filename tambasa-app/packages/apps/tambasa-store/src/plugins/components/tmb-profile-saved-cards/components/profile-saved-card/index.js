/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, { useContext } from 'react';

import Badge from '@oracle-cx-commerce/react-components/badge';
import Card from '@oracle-cx-commerce/react-components/card';
import Link from '@oracle-cx-commerce/react-components/link';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import { formatCardNumber } from '@oracle-cx-commerce/react-components/utils/payment';
import { getCardTypes } from '@oracle-cx-commerce/commerce-utils/selector';
import { t } from '@oracle-cx-commerce/utils/generic';

import { AiFillCaretRight } from 'react-icons/ai';
//constants
const CONFIRM_DELETE_SAVED_CARD = 'confirm-delete-saved-card/',
  SUCCESS = 'success',
  ERROR = 'error',
  TRUE = 'true';

/**
 * UI component for a card.
 * It show basic detail of card like mask car number, name on card expiry date etc.
 * @param {*} props the required properties
 */
const ProfileSavedCard = props => {
  const { action, getState } = useContext(StoreContext);
  const {
    actionDeleteCard,
    actionMakeDefault,
    alertMarkedDefaultCard,
    id,
    labelDeleteCardLink,
    labelMakeDefaultCardLink,
    labelSavedCard,
    textDefaultCard,
    textExpiryDate
  } = props;

  const { savedCardId, isDefault, nameOnCard, expiryMonth, expiryYear, cardType, cardNumber } = props.cardDetails;

  /**
   * This method returns card type object for given card type id
   * @param {string} cardType - the card type id
   */
  const getCard = cardType => {
    const cardTypes = getCardTypes(getState());

    return cardTypes[cardType];
  };

  //set alt text and src image icon for the card
  const card = getCard(cardType);
  let imgSrc = null;
  let cardImageAltText = cardType;
  if (card) {
    cardImageAltText = card.name;
    if (card.img) {
      imgSrc = card.img.url;
    }
  }

  /**
   * This method will trigger update action to make given card as default card
   * @param {String} savedCardId - the saved card id of the card which is going to be default card
   * @param {String} cardNumber - the saved card number
   */
  const onMarkDefaultCard = async (savedCardId, cardNumber) => {
    props.setInProgress(true);
    const response = await action('updateProfileSavedCard', { savedCardId, setAsDefault: TRUE });
    if (response.ok) {
      const cardNum = cardNumber.substr(cardNumber.length - 4);
      props.setActionResponse({ type: SUCCESS, message: t(alertMarkedDefaultCard, { cardNumber: cardNum }) });
      props.setInProgress(false);
    } else {
      props.setActionResponse({ type: ERROR, message: response.error.message });
      props.setInProgress(false);
    }
  };

  return (
    <Styled id="ProfileSavedCard" css={css}>

      <>
        <div className={`ProfileSavedCards__Item ProfileSavedCards__Item___Front`}>
          <div id={`cardDetails-${id}-${savedCardId}`} className="ProfileSavedCards__CardDetailsContainer">
            <div className="ProfileSavedCards__CardTypeContainer">
              <div className="ProfileSavedCard__Nickname">
                <p className="ProfileSavedCard__NicknameText">{/* nickname */}</p>
                <img className="ProfileSavedCards__Chip" src={'/file/general/card-chip.png'} alt={''} />
              </div>
              <img className="ProfileSavedCards__CardTypeImg" src={imgSrc} alt={cardImageAltText} />
            </div>
            <div className="ProfileSavedCards__CardDetailsWrapper">
              <div className="ProfileSavedCards__CardNumber">
                {
                  (() => {
                    const formattedNumber = formatCardNumber(cardNumber, cardType)
                    return formattedNumber.split(/\s/g).map((group, index) => <span key={index}>{group}</span>)
                  })()
                }
              </div>
              <div id={`expiryDate-${id}-${savedCardId}`} className="ProfileSavedCard__ExpiryDate">
                <div className="ProfileSavedCard__ExpiryDate___ValidThruContainer">
                  <span className="ProfileCardDetails__Card__ValidThru">
                    VALID THRU
                    <AiFillCaretRight className="ProfileCardDetails__Card__ValidThruArrow" />
                  </span>
                  {/* <img className="ProfileSavedCard__ExpiryDate___ValidThru" src="/file/general/valid-thru.png" alt="" /> */}
                  <p className="ProfileSavedCard__ExpiryDate___Date">{`${expiryMonth}/${expiryYear.substr(-2)}`}</p>
                </div>
              </div>
              <span className="ProfileSavedCard__NameOnCard">{nameOnCard}</span>

            </div>
          </div>
        </div>

        {/*  <div class="card master-card">
          <div class="card-top">
            <div class="card-top-left">
              <p class="card-name">{" "}</p>
              <img class="card-ship" src="/file/general/credit-card-chip.png" alt="ship" />
            </div>
            <div class="card-top-right">
              <img class="card-flag" src={imgSrc} alt={cardImageAltText} />

            </div>
          </div>
          <div class="card-bottom">
            <p class="card-numbers">{formatCardNumber(cardNumber, cardType)}
            </p>
            <div class="card-bottom-container">

              <div class="card-valid-date">
                <div>
                  <p>VALID</p>
                  <p>THRU</p>
                </div>
                <p>ᐅ</p>
                <p class="card-valid-date_date-text">
                  {expiryMonth}/{expiryYear.substring(2, 4)}
                </p>

              </div>
            </div>
            <p class="card-client-name">{nameOnCard}</p>
          </div>

        </div> */}
        <div className="card-options-container">
          <span>
            {isDefault ? (
              <Badge badgeText={textDefaultCard} ariaLabel={textDefaultCard} />
            ) : (
              <>
                <button
                  type="button"
                    className="ProfileSavedCard__MakeDefault link-colors-card"
                  onClick={() => onMarkDefaultCard(savedCardId, cardNumber)}
                  aria-describedby={`makeDefault-${id}${savedCardId}`}
                  disabled={props.inProgress}
                >
                  {actionMakeDefault}
                </button>
                <span
                  className="ProfileSavedCard__MakeDefault__HelpText"
                  id={`makeDefault-${id}${savedCardId}`}
                >{`${t(labelSavedCard, {
                  cardNumber: cardNumber.substr(cardNumber.length - 4),
                  cardType,
                  nameOnCard,
                  expiryDate: `${expiryMonth}/${expiryYear}`
                })}${labelMakeDefaultCardLink}`}</span>
              </>
            )}
          </span>
          <span>
            <span
              aria-label={`${t(labelSavedCard, {
                cardNumber: cardNumber.substr(cardNumber.length - 4),
                cardType,
                nameOnCard,
                expiryDate: `${expiryMonth}/${expiryYear}`
              })}${isDefault ? ` ${textDefaultCard} ` : ' '}${labelDeleteCardLink}`}
            >
              <Link className="link-colors-card" href={`${CONFIRM_DELETE_SAVED_CARD}${savedCardId}`}>{actionDeleteCard}</Link>
            </span>
          </span>
        </div>
      </>
    </Styled>
  );
};

export default ProfileSavedCard;
