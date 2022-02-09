/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, { useCallback, useContext, useMemo, useState } from 'react';
import {
  getCardType,
  validateCVV,
  validateCardNumber,
  validateExpiryMonth,
  validateExpiryYear,
  validateRequiredField
} from '@oracle-cx-commerce/react-components/utils/payment';

import Alert from '@oracle-cx-commerce/react-components/alert';
import BillingAddress from './components/billing-address';
import CardButtons from './components/card-form-buttons';
import DefaultPayment from './components/default-payment';
import Form from '@oracle-cx-commerce/react-components/form';
import { PAGE_PROFILE_SAVED_CARDS_LINK } from '@oracle-cx-commerce/commerce-utils/constants';
import ProfileCardDetails from './components/card-details';
import PropTypes from 'prop-types';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { WARNING_ICON_HTML } from '@oracle-cx-commerce/react-components/form/constants';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import { getPageData } from '../../selectors';
import { isAddressValid } from '@oracle-cx-commerce/react-components/utils/address';
import { t } from '@oracle-cx-commerce/utils/generic';
import { useNavigator } from '@oracle-cx-commerce/react-components/link';
//constants
const PROFILE_SAVED_CARDS = PAGE_PROFILE_SAVED_CARDS_LINK,
  INFO = 'info',
  ERROR = 'error',
  CARD_NUMBER = 'cardNumber',
  EXPIRY_MONTH = 'expiryMonth',
  EXPIRY_YEAR = 'expiryYear',
  CARD_CVV = 'cardCVV',
  VALIDATION_MESSAGE_CLASS = '.validationMessage',
  AFTER_BEGIN = 'afterbegin';

/**
 * This is the top component which combines all the sub components of add credit card widget
 * It provides functionality to add a new credit/debit card to the profile
 * @param {Object} props the required properties
 */
const ProfileAddCreditCard = props => {
  const goToPage = useNavigator();
  const { action } = useContext(StoreContext);
  const { cardTypes, isUserLoggedIn, isB2BUser, isB2BUserProfile, ...remProps } = props;
  //Variable to track action progress, and disable multiple invocation
  const [inProgress, setInProgress] = useState(false);
  //The selected card type (based on the card number)
  const [selectedCardType, setSelectedCardType] = useState({});
  //card details
  const [cardPayload, setCardPayload] = useState({
    cardNumber: '',
    cardType: '',
    cardCVV: '',
    expiryMonth: '',
    expiryYear: '',
    nameOnCard: '',
    setAsDefault: true,
    billingAddress: {
      firstName: '',
      lastName: '',
      country: '',
      postalCode: '',
      state: '',
      address1: '',
      city: '',
      phoneNumber: ''
    }
  });

  // local state to show action result in alert
  const [actionResponse, setActionResponse] = useState({ type: '', message: '' });

  /**
   * Call back method which gets trigger on successful completion of action
   * It will navigated to the profile page.
   * @param {String} cardNumber - the saved card number
   */
  const onOk = useCallback(
    cardNumber => {
      action('notifyClearAll');
      const cardNum = cardNumber.substr(cardNumber.length - 4);
      action('notify', { level: INFO, message: t(remProps.alertCardAdded, { cardNumber: cardNum }) });
      /* goToPage(PROFILE_SAVED_CARDS); */
      props.setCurrentPage("main")
    },
    [action, goToPage, remProps.alertCardAdded]
  );

  /**
   * Call back method which gets trigger on occurrence of any error at server side while performing action
   * It will trigger 'notify' action to show relevant error message.
   */
  const onNotOk = useCallback(({ error = {} }) => {
    setActionResponse({ type: ERROR, message: error.message });
  }, []);

  /**
   * Helper method to remove non-numeric chars and returns max allowed substring of card number
   * @param {string} cardNum the card number
   */
  const getValidCardNumber = useCallback(
    cardNum => {
      const cardNumber = cardNum.replace(/\D/g, '');
      const selectedCardType = getCardType(cardNumber, cardTypes);
      const maxLength = selectedCardType.length ? Math.max(...selectedCardType.length.split('|')) : 16;

      return cardNumber.substr(0, maxLength);
    },
    [cardTypes]
  );

  /**
   * Map holds 'validators' function declaration for card details and billing fields
   */
  const validators = useMemo(
    () => ({
      cardNumber: elementValue =>
        validateCardNumber(elementValue, selectedCardType.length || getCardType(elementValue, cardTypes).length, {
          messageCardNumberInvalid: t(remProps.textFieldInvalid, { fieldName: remProps.labelCardNumber }),
          messageCardNumberRequired: remProps.textRequiredField
        }),
      cardCVV: elementValue =>
        validateCVV(elementValue, selectedCardType.cvvLength, {
          messageCardCVVInvalid: t(remProps.textFieldInvalid, { fieldName: remProps.labelCardCVV }),
          messageCardCVVRequired: remProps.textRequiredField
        }),
      expiryMonth: elementValue =>
        validateExpiryMonth(elementValue, cardPayload.expiryYear.substr(-2), {
          messageExpiryDateInvalid: t(remProps.textFieldInvalid, { fieldName: remProps.labelExpiryDate }),
          messageExpiryDateRequired: remProps.textRequiredField
        }),
      expiryYear: elementValue =>
        validateExpiryYear(elementValue, {
          messageExpiryDateInvalid: t(remProps.textFieldInvalid, { fieldName: remProps.labelExpiryDate }),
          messageExpiryDateRequired: remProps.textRequiredField
        }),
      nameOnCard: elementValue => validateRequiredField(elementValue, remProps.textRequiredField)
    }),
    [
      cardPayload.expiryYear,
      cardTypes,
      remProps.labelCardCVV,
      remProps.labelCardNumber,
      remProps.labelExpiryDate,
      remProps.textFieldInvalid,
      remProps.textRequiredField,
      selectedCardType.cvvLength,
      selectedCardType.length
    ]
  );

  /**
   * update card
   * @param {Object} update the card update object
   */
  const updateCardPayload = useCallback(update => {
    setCardPayload(card => {
      return { ...card, ...update };
    });
  }, []);

  /**
   * update selected card type
   */
  const updateSelectedCardType = useCallback(cardType => {
    setSelectedCardType(cardType);
  }, []);

  /**
   * This method validates value for input fields  by triggering respective 'validators'
   * And sets error message (if any) at corresponding ui elements
   * @param {Object} element ui element
   */
  const validateElement = useCallback(
    element => {
      const fieldName = element.name;
      let fieldValue = element.value;

      //If element is either cardNumber or cardCVV, or expiryYear, or expiryMonth then,
      // get allowed value (e.g. numeric digits) from the provided value before validating it.
      if (element.name === CARD_NUMBER) {
        fieldValue = getValidCardNumber(element.value);
      } else if ([CARD_CVV, EXPIRY_YEAR, EXPIRY_MONTH].includes(element.name)) {
        fieldValue = fieldValue.replace(/\D/g, '');
      }

      let errorMessage = '';
      element.setCustomValidity('');
      const elementValidator = validators[element.name];
      //set 'validator' to the element
      if (elementValidator) {
        element.setCustomValidity(elementValidator(fieldValue));
        errorMessage = element.validationMessage;
      }

      //avoid overriding of error message for expiryMonth by expiryYear and vice-versa
      let isSetErrorMsg = true;
      if ((fieldName === EXPIRY_MONTH || fieldName === EXPIRY_YEAR) && element.parentElement) {
        const otherFieldName = fieldName === EXPIRY_MONTH ? EXPIRY_YEAR : EXPIRY_MONTH;
        const otherDateElement = element.parentElement.querySelector(`input[name=${otherFieldName}]`);
        isSetErrorMsg = !(otherDateElement && otherDateElement.validationMessage && !element.validationMessage);
      }

      //Get element to show error message for input field and set the error message (if any) into it
      const errorMessageContainer =
        (fieldName === EXPIRY_MONTH || fieldName === EXPIRY_YEAR || fieldName === CARD_CVV) && element.parentElement
          ? element.parentElement.nextElementSibling
          : element.nextElementSibling;
      const erroMessageElement =
        errorMessageContainer && !errorMessageContainer.matches(VALIDATION_MESSAGE_CLASS)
          ? errorMessageContainer.querySelector(VALIDATION_MESSAGE_CLASS)
          : errorMessageContainer;
      if (erroMessageElement && isSetErrorMsg) {
        erroMessageElement.textContent = errorMessage;
        if (errorMessage) {
          erroMessageElement.insertAdjacentHTML(AFTER_BEGIN, WARNING_ICON_HTML);
        }
      }
    },
    [getValidCardNumber, validators]
  );

  /***
   * This method get trigger on submit of form it trigger action to add new card to the profile
   */
  const onSubmit = useCallback(() => {
    action('notifyClearAll');
    if (!isAddressValid(cardPayload.billingAddress, isB2BUser)) {
      action('notify', { level: ERROR, message: remProps.textEnterABillingAddress });

      return false;
    }
    setInProgress(true);
    action('saveCardToProfile', cardPayload)
      .then(response => {
        if (response.ok === false) {
          // Callback - action is resolved with !ok status
          onNotOk(response);
        } else {
          // Callback - action is resolved with ok status
          onOk(cardPayload.cardNumber);
        }
      })
      .finally(() => {
        // Callback to indicate action invocation is complete
        setInProgress(false);
      });
  }, [action, cardPayload, isB2BUser, onNotOk, onOk, remProps.textEnterABillingAddress]);

  return (
    <Styled id="ProfileAddCreditCard" css={css}>
      <Form
        onSubmit={onSubmit}
        setCustomValidity={validateElement}
        noValidate={true}
        enableUnsavedChangesTracking={true}
      >
        {useMemo(
          () =>
            isUserLoggedIn && (
              <>
                <div className="ProfileAddCreditCard">
                  <h1>{remProps.headingAddACreditCard}</h1>
                  {actionResponse.message !== '' && actionResponse.type !== '' && (
                    <div className="ProfileAddCreditCard__ActionResponse">
                      <Alert
                        id={`ProfileAddCreditCard__Alert-${remProps.id}`}
                        type={actionResponse.type}
                        message={actionResponse.message}
                      />
                    </div>
                  )}
                  <ProfileCardDetails
                    {...remProps}
                    updateCardPayload={updateCardPayload}
                    updateSelectedCardType={updateSelectedCardType}
                    validateElement={validateElement}
                  />
                  <DefaultPayment {...remProps} updateCardPayload={updateCardPayload} />
                  <BillingAddress
                    {...remProps}
                    updateCardPayload={updateCardPayload}
                    isUserLoggedIn={isUserLoggedIn}
                    isB2BUserProfile={isB2BUserProfile}
                  />
                  <CardButtons {...remProps} inProgress={inProgress} cardTypes={cardTypes} />
                </div>
              </>
            ),
          [
            actionResponse,
            cardTypes,
            inProgress,
            isB2BUser,
            isUserLoggedIn,
            remProps,
            updateCardPayload,
            updateSelectedCardType,
            validateElement
          ]
        )}
      </Form>
    </Styled>
  );
};

ProfileAddCreditCard.propTypes = {
  /**
   * The unique id for the component
   */
  id: PropTypes.string.isRequired,

  /**
   * Flag to indicate if user is logged in or not.
   */
  isUserLoggedIn: PropTypes.bool.isRequired,

  /**
   * Flag to indicate if user is B2B user
   */
  isB2BUser: PropTypes.bool.isRequired,

  /**
   * Types of credit/debit cards
   */
  cardTypes: PropTypes.objectOf(
    PropTypes.shape({
      /**
       * card type mapped to card type's repository id
       */
      img: PropTypes.shape({
        /**
         * image url for card type
         */
        url: PropTypes.string.isRequired
      }).isRequired,

      /**
       * IIN value for card
       */
      iin: PropTypes.string.isRequired,

      /**
       * name of card type
       */
      name: PropTypes.string.isRequired,

      /**
       * repository id for card type
       */
      repositoryId: PropTypes.string.isRequired
    })
  )
};

/**
 * Default values for not required properties
 */
ProfileAddCreditCard.defaultProps = {
  cardTypes: undefined
};

export default connect(getPageData)(ProfileAddCreditCard);
