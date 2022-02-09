import React, {useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {formatCardNumber} from '@oracle-cx-commerce/react-components/utils/payment';
import {getCardTypes} from '@oracle-cx-commerce/commerce-utils/selector';
import css from './styles.css';
import {useSelector} from '@oracle-cx-commerce/react-components/provider';
import {useCardTypesFetcher} from '@oracle-cx-commerce/fetchers/payments/hooks';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';

import {AiFillCaretRight} from 'react-icons/ai'

/**
 * Following component renders Credit Card Information.
 *
 * @param props - Credit Card Details
 */
export const CreditCardPaymentDetails = props => {
  const store = useContext(StoreContext);

  // Fetches the list of card types
  useCardTypesFetcher(store);

  // const {displayBillToName = false, textExpiryDate, textBillingAddress} = props;
  const cardTypes = useSelector(getCardTypes) || {};
  const cardDetails = props.payment || {};

  /** For Order Details(get order) billing Address needs to be explicitly passed
   *  For current order, billing Address will be available in payment method object
   */
  // const billingAddress = cardDetails.billingAddress || props.billingAddress || {};

  const {cardType = '', nameOnCard = '', cardNumber, expiryMonth = '', expiryYear = ''} = cardDetails;

  const cardIconURL = cardType && cardTypes[cardType] ? (cardTypes[cardType].img || {}).url : '';
  const cardIconName = cardType && cardTypes[cardType] ? cardTypes[cardType].name : '';

  // Don't Render anything if card number is not available
  if (!cardNumber) {
    return null;
  }

  return (
    <Styled id="CreditCardPaymentDetails" css={css}>
      <div className="CheckoutCardDetails__Card">
          <div className="CheckoutCardDetails__Card___NicknameCardType_Container">
            <div className="NicknameChipContainer">
              <span className="CheckoutCardDetails__CardNickname">
                { cardTypes[cardType] && cardTypes[cardType].name
                  ? `${cardTypes[cardType].name} - ${cardNumber.substr(-4)}`
                  : ''
                }
              </span>
              <img className="CheckoutCardDetails__CardChip" src="/file/general/card-chip.png" alt=""/>
            </div>
            <div className="CheckoutCardDetails__CardType">
              { cardIconURL && 
                <img className="CreditCardPaymentDetails__CardIcon" src={cardIconURL} alt={cardIconName} />
              }
            </div>
          </div>
          <div className="CheckoutCardDetails__Card__Number">
            {
              (() => {
                const formattedNumber = formatCardNumber(cardNumber, cardType)
                return formattedNumber.split(/\s/g).map((group, index) => 
                  <span key={index}>{group}</span>
                )
              })()
            }
          </div>
          <div className="CheckoutCardDetails__Card__ExpiryDateCvv_Container">
            <div className="CheckoutCardDetails__Card__ExpiryDate_Container">
              <span className="CheckoutCardDetails__Card__ValidThru">
                VALID THRU
                <AiFillCaretRight className="CheckoutCardDetails__Card__ValidThruArrow"/>
              </span>
              <p className="CheckoutCardDetails__Card__ExpiryDateValue">
                {`${expiryMonth}/${expiryYear}`}
              </p>
            </div>
          </div>
          <span className="CheckoutCardDetails__Card__Name">{nameOnCard}</span>
        </div>
    </Styled>
  );
};
