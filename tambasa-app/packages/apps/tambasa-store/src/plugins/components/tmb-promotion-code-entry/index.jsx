import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import React, {useContext, useState, useRef} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import {getComponentData} from '@oracle-cx-commerce/react-widgets/cart/promotion-code-entry/selectors';
import WarningIcon from '@oracle-cx-commerce/react-components/icons/warning';

import { t } from '@oracle-cx-commerce/utils/generic'
import { MdLocalOffer } from 'react-icons/md'
import { RiCoupon3Line } from 'react-icons/ri'

/**
* TmbPromotionCodeEntry widget displays input field to enter and apply Promotion.
* It handles promotion validation message.
* @param {*} props
*/
const TmbPromotionCodeEntry = props => {

  //resources and configuration
  const {
    messageDuplicateCoupon,
    actionApply,
    messageEmptyCoupon,
    couponCodeInputPlaceholder
    // showApplyPromoInput = false
  } = props;
  const appliedCoupons = props.coupons || [];

  // component state variables
  // const [showPromoForm, setShowPromoForm] = useState(showApplyPromoInput === 'true');
  const [couponErrorMessage, setCouponErrorMessage] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [isApplyCodeClicked, setIsApplyCodeClicked] = useState(false);
  const promoCodeInputElement = useRef(null);

  //context
  const {action} = useContext(StoreContext);

  const couponAlreadyApplied = () => {
    let alreadyApplied = false;
    if (appliedCoupons && appliedCoupons.length > 0) {
      const couponCount = appliedCoupons.length;
      for (let i = 0; i < couponCount; i++) {
        if (appliedCoupons[i] === promoCode) {
          alreadyApplied = true;
          break;
        }
      }
    }

    return alreadyApplied;
  };

  const applyPromotion = () => {
    setPromoCode(promoCode.trim());
    if (promoCode && promoCode !== '') {
      if (couponErrorMessage !== '') {
        setCouponErrorMessage('');
      }
      // check if the coupon has already been applied.
      if (couponAlreadyApplied()) {
        setCouponErrorMessage(messageDuplicateCoupon);
      } else {
        const payload = {
          coupons: [promoCode]
        };
        setIsApplyCodeClicked(true);
        action('applyCouponsToCart', payload).then(response => {
          setIsApplyCodeClicked(false);
          if (response.ok) {
            promoCodeInputElement.current.value = '';
          } else if (response.error && response.error.errors && response.error.errors.length > 0) {
            const errorMessage = response.error.errors.reduce(
              (errorMessage, error) => `${errorMessage} ${error.message}`,
              ''
            );
            promoCodeInputElement.current.focus();
            setCouponErrorMessage(errorMessage);
          }
        });
      }
    } else {
      setCouponErrorMessage(messageEmptyCoupon);
    }
  };

  return (
    <Styled id="TmbPromotionCodeEntry" css={css}>
      {props.displayPromoCodeEntry && (
        <div className="TmbPromotionCodeEntry">
          {(
            <div className="TmbPromotionCodeEntry__Container">
              <div className="TmbPromotionCodeEntry__InputContainer">
                <input
                  name="promoCode"
                  onChange={event => {
                    setPromoCode(event.target.value);
                  }}
                  id="TmbPromotionCodeEntry__Input"
                  data-testid="TmbPromotionCodeEntry__Input"
                  onKeyUp={event => {
                    if (event.key === 'Enter') applyPromotion();
                  }}
                  ref={promoCodeInputElement}
                  placeholder={t(couponCodeInputPlaceholder)}
                ></input>
                  <button onClick={applyPromotion} 
                    disabled={isApplyCodeClicked}
                    className="TmbPromotionCodeEntry__Button"
                    type="button" 
                  >
                    <RiCoupon3Line style={{
                      fontSize: '1rem',
                      marginRight: ".5rem"
                    }}/>
                    {actionApply}
                  </button>
              </div>
              {couponErrorMessage !== '' && (
                <div className="TmbPromotionCodeEntry__ErrorMessage">
                  <WarningIcon className="warning-icon"></WarningIcon>
                  <span className="warning-message">
                    {couponErrorMessage}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Styled>
  );
};

export default connect(getComponentData)(TmbPromotionCodeEntry);
