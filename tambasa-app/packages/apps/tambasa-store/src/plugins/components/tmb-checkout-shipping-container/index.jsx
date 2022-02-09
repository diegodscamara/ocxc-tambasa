/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

 import {CartContext, ScheduledOrderContext} from '@oracle-cx-commerce/react-ui/contexts';
 import React, {useState} from 'react';
 import CartPlaceholder from '@oracle-cx-commerce/react-widgets/cart/cart-container/components/cart-placeholder';
 import CartValidation from '@oracle-cx-commerce/react-widgets/cart/cart-container/components/cart-validations';
 import {CheckoutShippingContext} from '@oracle-cx-commerce/react-widgets/checkout/checkout-shipping-container/context';
 import PageLoader from '@oracle-cx-commerce/react-components/page-loader';
 import Region from '@oracle-cx-commerce/react-components/region';
 import Styled from '@oracle-cx-commerce/react-components/styled';
 import {connect} from '@oracle-cx-commerce/react-components/provider';
 import css from './styles.css';
 import {getComponentData} from '@oracle-cx-commerce/react-widgets/checkout/checkout-shipping-container/selectors';
 import PropTypes from 'prop-types';
 
 /**
  * Container to hold all the widgets for the Checkout Shipping Page
  * @param props
  */
 const TmbCheckoutShippingContainer = props => {
   // container layout
   const {regions = [], className = ''} = props;
 
   const {isB2BUser, isGetCartInProgress} = props;
 
   // Delivery address form data when there is no saved address / profile address available.
   const [deliveryAddressForm, setDeliveryAddressForm] = useState({
     address: {},
     saveAsANewProfileAddress: !isB2BUser,
     saveAsANewAccountAddress: false,
     isModified: false
   });
 
   // Shipping status to manage the tabs under the shipping page.
   const [shippingStatus, setShippingStatus] = useState({
     tabIndex: 0,
     showConinueToPayment: false,
     enableContinue: false,
     loadShippingMethods: false
   });
 
   // Cart context state to maintain the status of the cart.
   const [cartStatus, setCartStatus] = useState({
     isCartInValid: false,
     hasOutOfStockItems: false,
     hasInactiveItems: false
   });
 
   // Check Shipping Tab Index Values
   const [checkoutShippingTabs, setCheckoutShippingTabs] = useState({});
 
   // scheduleInfo to manage the schedule order under the shipping page.
   // scheduleInfo to manage the schedule order under the shipping page.
   const [createSchedulePayload, setCreateSchedulePayload] = useState({isScheduleCurrentOrder: false});
   // Scheduled info status to manage the continue payment button.
   const [scheduledInfoStatus, setScheduledInfoStatus] = useState({
     enableScheduleContinue: false
   });
 
   return (
     <Styled id="TmbCheckoutShippingContainer" css={css}>
       <div className="TmbCheckoutShippingContainer">
         <CheckoutShippingContext.Provider
           value={{
             shippingStatus,
             setShippingStatus,
             deliveryAddressForm,
             setDeliveryAddressForm,
             checkoutShippingTabs,
             setCheckoutShippingTabs
           }}
         >
           <CartContext.Provider value={{cartStatus, setCartStatus}}>
             <CartValidation {...props} />
             <PageLoader show={isGetCartInProgress === 1}>
               <CartPlaceholder />
             </PageLoader>
             <ScheduledOrderContext.Provider
               value={{createSchedulePayload, setCreateSchedulePayload, scheduledInfoStatus, setScheduledInfoStatus}}
             >
               <section
                 className={`TmbCheckoutShippingContainer__Section ${className}`.trim()}
                 style={{visibility: isGetCartInProgress !== 1 ? 'visible' : 'hidden'}}
               >
                 {regions.map((regionId, index) => (
                    /*
                      Using region ids as keys causes unnecessary DOM reconciliation.
                        
                      https://reactjs.org/docs/reconciliation.html#keys
                    */
                   <Region key={index} regionId={regionId} /> // eslint-disable-line react/no-array-index-key
                 ))}
               </section>
             </ScheduledOrderContext.Provider>
           </CartContext.Provider>
         </CheckoutShippingContext.Provider>
       </div>
     </Styled>
   );
 };
 
 TmbCheckoutShippingContainer.propTypes = {
   isGetCartInProgress: PropTypes.number.isRequired,
   isB2BUser: PropTypes.bool.isRequired,
   regions: PropTypes.arrayOf(PropTypes.string).isRequired
 };
 
 export default connect(getComponentData)(TmbCheckoutShippingContainer);
 