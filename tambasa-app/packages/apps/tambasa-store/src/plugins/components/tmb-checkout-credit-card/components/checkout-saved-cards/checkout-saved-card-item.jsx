/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import React, {useState, useEffect} from 'react';
import Radio from '@oracle-cx-commerce/react-components/radio';
import {noop, t} from '@oracle-cx-commerce/utils/generic';
import CardCVVIcon from '@oracle-cx-commerce/react-components/icons/card-cvv';
import WarningIcon from '@oracle-cx-commerce/react-components/icons/warning';
import {formatCardNumber, validateCVV} from '@oracle-cx-commerce/react-components/utils/payment';
import {PAYMENT_TYPE_CARD} from '@oracle-cx-commerce/commerce-utils/constants';

import {AiFillCaretRight} from 'react-icons/ai'

const CheckoutSavedCardItem = props => {
  const {
    labelSavedCard,
    id,
    labelCardCVV,
    cardTypes = {},
    cardDetails,
    selectedSavedCardId,
    onSelectSavedCard,
    setElementValidity,
    textFieldInvalid,
    textRequiredField,
    onInput = noop,
    isCardPaymentDisabled,
    selectedPaymentType
  } = props;

  const {savedCardId, nickname, nameOnCard, expiryMonth, expiryYear, cardType, cardNumber: maskedCardNumber} = cardDetails;

  const [cardCVV, setCardCVV] = useState('');

  const card = cardTypes[cardType];
  let imgSrc = null;
  let cardImageAltText = cardType;
  let cvvLength = 3;
  if (card) {
    cardImageAltText = card.name;
    cvvLength = card.cvvLength;
    if (card.img) {
      imgSrc = card.img.url;
    }
  }
  const cardCVVValidator = cardCVV =>
    validateCVV(cardCVV, card.cvvLength, {
      messageCardCVVInvalid: t(textFieldInvalid, {fieldName: labelCardCVV}),
      messageCardCVVRequired: textRequiredField
    });

  // set card cvv to empty on change of selected saved card
  // or if card payment is disabled
  useEffect(() => {
    setCardCVV('');
  }, [selectedSavedCardId, isCardPaymentDisabled]);

  /**
   * Called when cvv changes, calls onInput Callback to set saved card state to parent component.
   * @param {Object} event The event object
   */
  const onCVVChange = event => {
    const element = event.target;
    const cardCVV = element.value;
    const regex = /^[0-9]+$/;
    if (cardCVV === '' || regex.test(cardCVV)) {
      setCardCVV(cardCVV);
    }
    element.setCustomValidity(cardCVVValidator(cardCVV));
    if (onInput) {
      onInput({
        cardCVV,
        savedCardId: selectedSavedCardId,
        type: PAYMENT_TYPE_CARD
      });
    }
  };

  const isSavedCardSelected = selectedPaymentType === PAYMENT_TYPE_CARD && selectedSavedCardId === savedCardId;

  return (
    <div className={`CheckoutSavedCards__Item CheckoutSavedCards__Item___Front${isSavedCardSelected ? ' CheckoutSavedCards__Item--selected' : ''}`}>
      <div className="CheckoutSavedCards__RadioButtonContainer">
        <Radio
          className="CheckoutSavedCards__RadioButton"
          id={id}
          name={savedCardId}
          value={savedCardId}
          checked={isSavedCardSelected}
          disabled={isCardPaymentDisabled}
          onChange={onSelectSavedCard}
          aria-label={t(labelSavedCard, {
            cardNumber: maskedCardNumber.substr(-4),
            cardType: card ? card.name : '',
            nameOnCard,
            expiryDate: `${expiryMonth}/${expiryYear}`
          })}
        ></Radio>
      </div>
      <div id={`cardDetails-${id}-${savedCardId}`} className="CheckoutSavedCards__CardDetailsContainer">
        <div className="CheckoutSavedCards__CardTypeContainer">
          <div className="CheckoutSavedCard__Nickname">
            <p className="CheckoutSavedCard__NicknameText">{nickname}</p>
            <img className="CheckoutSavedCards__Chip" src={'/file/general/card-chip.png'} alt={''} />
          </div>
          <img className="CheckoutSavedCards__CardTypeImg" src={imgSrc} alt={cardImageAltText} />
        </div>
        <div className="CheckoutSavedCards__CardDetailsWrapper">
          <div className="CheckoutSavedCards__CardNumber">
            {
              (() => {
                const formattedNumber = formatCardNumber(maskedCardNumber, card ? card.repositoryId : '')
                return formattedNumber.split(/\s/g).map((group, index) => <span key={index}>{group}</span>)
              })()
            }
          </div>
          <div id={`expiryDate-${id}-${savedCardId}`} className="CheckoutSavedCard__ExpiryDate">
            <div className="CheckoutSavedCard__ExpiryDate___ValidThruContainer">
              <span className="CheckoutCardDetails__Card__ValidThru">
                VALID THRU
                <AiFillCaretRight className="CheckoutCardDetails__Card__ValidThruArrow"/>
              </span>
              {/* <img className="CheckoutSavedCard__ExpiryDate___ValidThru" src="/file/general/valid-thru.png" alt="" /> */}
              <p className="CheckoutSavedCard__ExpiryDate___Date">{`${expiryMonth}/${expiryYear.substr(-2)}`}</p>
            </div>
            {isSavedCardSelected && (
              <div className="CheckoutSavedCards__CvvDetailsContainer">
                <div className="CheckoutSavedCards__CvvInputContainer">
                  <input
                    type="password"
                    className="CheckoutSavedCards__CvvInput"
                    id={`cvv-${id}-${savedCardId}`}
                    name="cardCVV"
                    value={cardCVV}
                    maxLength={cvvLength}
                    disabled={isCardPaymentDisabled}
                    onChange={onCVVChange}
                    onBlur={event => setElementValidity(event.target, cardCVVValidator)}
                    required
                  />
                  <span className="CheckoutSavedCards__CvvIconContainer">
                    <CardCVVIcon />
                  </span>
                </div>
                <div className="CheckoutSavedCards__ErrorContainer">
                  <div className="CheckoutSavedCards__ErrorContainerWrapper">
                    <span className="CheckoutSavedCards__ErrorMessage"></span>
                    <span className="CheckoutSavedCards__ErrorIconContainer">
                      <WarningIcon />
                    </span>
                    <div className="CheckoutSavedCards__ErrorContainer__Arrow"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <span className="CheckoutSavedCard__NameOnCard">{nameOnCard}</span>
          
        </div>
      </div>
    </div>
  );
};

export default CheckoutSavedCardItem;
