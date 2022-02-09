import {ORDER_STATE_PENDING_PAYMENT, PAYMENT_TYPE_LOYALTYPOINTS} from '@oracle-cx-commerce/commerce-utils/constants';
import React, {useCallback, useContext, useEffect} from 'react';
import {connect, useSelector} from '@oracle-cx-commerce/react-components/provider';

import OrderSummary from './components/order-summary';
import PropTypes from 'prop-types';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {getOrderData} from '@oracle-cx-commerce/react-widgets/cart/cart-order-summary/selectors';
import {getSite} from '@oracle-cx-commerce/commerce-utils/selector';

/**
* Widget that displays the order summary information in the Cart and Checkout Pages
*/
const TmbCartOrderSummary = props => {
  //resources
  const {headingOrderSummary} = props;

  const {currentOrder = {}} = props;
  const {
    priceListGroup = {},
    payTaxInSecondaryCurrency,
    payShippingInSecondaryCurrency,
    numberOfItems = 0
  } = currentOrder;
  const {currentPriceListGroup, currencyCode} = props;

  const {action} = useContext(StoreContext);

  // price list group for the secondary currency
  const {priceListGroupList} = useSelector(getSite);
  const secondaryCurrencyPriceListGroup =
    currentOrder && currentOrder.secondaryCurrencyCode
      ? priceListGroupList.find(
          priceListGroup => priceListGroup.currency.currencyCode === currentOrder.secondaryCurrencyCode
        )
      : null;

  // To show shipping data in secondary currency
  // If secondary currency is available, payShippingInSecondaryCurrency is set to true and the primary currency is 'loyalityPoints'
  const showSecondaryShippingData =
    secondaryCurrencyPriceListGroup &&
    payShippingInSecondaryCurrency &&
    priceListGroup.currency.currencyType === PAYMENT_TYPE_LOYALTYPOINTS;

  // To show tax data in secondary currency
  // If secondary currency is available, payTaxInSecondaryCurrency is set to true and the primary currency is 'loyalityPoints'
  const showSecondaryTaxData =
    secondaryCurrencyPriceListGroup &&
    payTaxInSecondaryCurrency &&
    priceListGroup.currency.currencyType === PAYMENT_TYPE_LOYALTYPOINTS;

  /**
  * Failure callback function
  */
  const onNotOk = useCallback(
    ({error: {message = ''} = {}} = {}) => {
      action('notify', {level: 'error', message});
    },
    [action]
  );

  /**
  * If the price list group is changed,
  * then do a price cart call to get the current incomplete order with the latest price list group.
  * Fix: Replace the check of currencyCode with priceListGroup.id once the 'priceCart' is fixed to fetch the correct PLG.
  */
  useEffect(() => {
    if (currentOrder && currentOrder.id && currentPriceListGroup.currency) {
      if (currentOrder.priceInfo.currencyCode !== (currentPriceListGroup.currency.currencyCode || currencyCode)) {
        action('priceCart', {}).then(response => {
          if (!response.ok) {
            onNotOk(response);
          }
        });
      }
    }
  }, [action, currentOrder, currencyCode, onNotOk, currentPriceListGroup.currency]);

  return (
    <Styled id="TmbCartOrderSummary" css={css}>
      <>
        {currentOrder &&
          ((currentOrder.id && numberOfItems > 0) || currentOrder.state === ORDER_STATE_PENDING_PAYMENT) && (
            <div className="TmbCartOrderSummary">
              <div className="TmbCartOrderSummary__Wrapper">
                <h3 className="TmbCartOrderSummary__Heading">{/* headingOrderSummary */'TOTAL'}</h3>
                <OrderSummary
                  order={currentOrder}
                  showSecondaryShippingData={showSecondaryShippingData}
                  showSecondaryTaxData={showSecondaryTaxData}
                  secondaryCurrencyPriceListGroup={secondaryCurrencyPriceListGroup}
                  orderPriceListGroup={currentPriceListGroup}
                  {...props}
                />
              </div>
            </div>
          )}
      </>
    </Styled>
  );
};

TmbCartOrderSummary.propTypes = {
  currentOrder: PropTypes.shape({
    priceInfo: PropTypes.shape({
      subTotal: PropTypes.number,
      secondaryCurrencyShippingAmount: PropTypes.number,
      shipping: PropTypes.number,
      shippingSurchargeValue: PropTypes.number,
      secondaryCurrencyShippingSurchargeValue: PropTypes.number,
      secondaryCurrencyTaxAmount: PropTypes.number,
      tax: PropTypes.number,
      taxExclusiveAmount: PropTypes.number,
      totalWithoutTax: PropTypes.number,
      primaryCurrencyTotal: PropTypes.number,
      secondaryCurrencyTotal: PropTypes.number,
      total: PropTypes.number
    }),
    discountInfo: PropTypes.shape({
      orderDiscount: PropTypes.number,
      shippingDiscount: PropTypes.number,
      secondaryCurrencyShippingDiscount: PropTypes.number
    }),
    paymentGroups: PropTypes.objectOf(PropTypes.object),
    secondaryCurrencyCode: PropTypes.string
  }).isRequired,
  currentPriceListGroup: PropTypes.shape({
    currency: PropTypes.shape({
      currencyCode: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired
    }),
    locale: PropTypes.string.isRequired
  }).isRequired
};

export default connect(getOrderData)(TmbCartOrderSummary);
