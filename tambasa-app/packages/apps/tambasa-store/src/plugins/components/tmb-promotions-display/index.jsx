/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
 import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
 import React, {useState, useContext} from 'react';
 import Styled from '@oracle-cx-commerce/react-components/styled';
 import {connect} from '@oracle-cx-commerce/react-components/provider';
 import css from './styles.css';
 import {useNumberFormatter} from '@oracle-cx-commerce/react-components/utils/hooks';
 import {t} from '@oracle-cx-commerce/utils/generic';
 import Alert from '@oracle-cx-commerce/react-components/alert';
 import {getComponentData} from './selectors';
 import WarningIcon from '@oracle-cx-commerce/react-components/icons/warning';
 /**
  * PromotionsDisplay widget displays list of applied Promotions.
  * It handles promotion validation messages occurred while removing a promotion.
  * @param {*} props
  */
 const TmbPromotionsDisplay = props => {
   const {actionRemove, messagePromoApplied, messagePromoOffer} = props;
   const formatCurrency = useNumberFormatter({style: 'currency'});
   const {orderCouponsMap = {}, orderImplicitDiscountList = []} = props;
   const {action} = useContext(StoreContext);
   const [couponErrorMessage, setCouponErrorMessage] = useState('');
 
   // it removes the selected explicit promotion
   const removePromoCode = promocode => {
     const payload = {
       coupons: [promocode]
     };
     action('removeCouponsFromCart', payload).then(response => {
       if (!response.ok && response.error && response.error.errors && response.error.errors.length > 0) {
         const errorMessage = response.error.errors.reduce(
           (errorMessage, error) => `${errorMessage} ${error.message}`,
           ''
         );
         setCouponErrorMessage(errorMessage);
       }
     });
   };
 
   return (
     <Styled id="TmbPromotionsDisplay" css={css}>
       {(Object.keys(orderCouponsMap).length > 0 || orderImplicitDiscountList.length > 0) && (
         <div className="TmbPromotionsDisplay">
           {couponErrorMessage !== '' && (
             <div className="PromotionCodeEntry__ErrorMessage">
               <WarningIcon></WarningIcon>
               {couponErrorMessage}
             </div>
           )}
           <Alert id="PromotionsSuccessAlert" type="success">
             {/* {Display list of implicit promotions} */}
             {orderImplicitDiscountList.length > 0 &&
               orderImplicitDiscountList.map(promotion => (
                 <div key={promotion.promotionName} className="TmbPromotionsDisplay__boldText">
                   {t(messagePromoApplied, {PROMOCODE: promotion.promotionName})}
                 </div>
               ))}
             {/* {Display list of explicit promotions} */}
             {Object.keys(orderCouponsMap).length > 0 &&
               Object.keys(orderCouponsMap || {}).map(promocode => (
                 <div key={promocode}>
                   <div className="">
                     <span className="TmbPromotionsDisplay__boldText">
                       {t(messagePromoApplied, {PROMOCODE: promocode})}
                     </span>
                     <span className="">
                       {orderCouponsMap[promocode].totalAdjustment &&
                         t(messagePromoOffer, {
                           OFFPRICE: formatCurrency(Math.abs(orderCouponsMap[promocode].totalAdjustment)).toString()
                         })}
                     </span>
                   </div>
                   <button
                     type="button"
                     onKeyDown={event => {
                       if (event.key === 'Enter') removePromoCode(promocode);
                     }}
                     className="TmbPromotionsDisplay__RemoveLink"
                     onClick={() => removePromoCode(promocode)}
                   >
                     {t(actionRemove)}
                   </button>
                 </div>
               ))}
           </Alert>
         </div>
       )}
     </Styled>
   );
 };
 
 export default connect(getComponentData)(TmbPromotionsDisplay);
 