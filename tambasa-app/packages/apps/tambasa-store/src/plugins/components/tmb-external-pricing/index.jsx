import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useState, useEffect } from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Dropdown from '@oracle-cx-commerce/react-components/dropdown';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import { getComponentData } from './selectors';
import { useCartInitializer } from '@oracle-cx-commerce/react-components/utils/cart/hooks';
import { t } from '@oracle-cx-commerce/utils/generic'
import css from './styles.css';

import TmbSpinner from '../utils/components/tmb-spinner'

const TmbExternalPricing = props => {
  const store = useContext(StoreContext);
  const { isUserLoggedIn, currentOrder, isGetCartInProgress } = props;
  const { commerceItems = {} } = currentOrder;

  //resources
  const { 
    listPriceTitle,
    searchHelp,
    dueDateText,
    selectPaymentDueDateText
  } = props

  const [ isSpinnerVisible, setIsSpinnerVisible ] = useState()

  /* Initializes the cart by invoking stock status and order pricing calls. */
  useCartInitializer(currentOrder, isGetCartInProgress);

  const [paymenteDateTypes, setPaymenteDateTypes] = useState({ error: true });
  const [isComponentVisible, setIsComponentVisible] = useState(false)

  const getStateOfShippingAddress = order => {
    const state = Object.values(order.shippingGroups)[0]
      .shippingAddress.state

    return !state || state === '' ? 'SP' : state
  }

  const callPaymentDateTypes = () => {
    const isValidCart = currentOrder ? currentOrder.priceInfo ? currentOrder.priceInfo.total ? true : false : false : false;

    if (isValidCart) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", "*");
      myHeaders.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

      const listItemsSku = [];
      const listItems = Object.keys(commerceItems);
      listItems.forEach(item => {
        if (commerceItems[item].productId) {
          listItemsSku.push(commerceItems[item].productId);
        }
      });

      const state = getStateOfShippingAddress(currentOrder)

      const body = JSON.stringify({ "estado": state, "prd": listItemsSku, "valor": currentOrder.priceInfo.total });

      var origin = document.location.origin;
      //origin = origin.includes('localhost') ? 'https://a9263388c1dev-admin.occa.ocs.oraclecloud.com' : origin;

      fetch(`${origin}/ccstorex/custom/v1/nsh_external_pricing/listprices`, { method: "POST", headers: myHeaders, body: body })
        .then(response => response.json()).then(data => {
          const listAux = [];

          data.list.forEach(function (item) {
            item.Cond.forEach(function (condItem, index) {
              listAux.push({
                "id": item.Cod + "--" + index,
                "value": condItem.Prazo != '' ? condItem.Prazo : t(dueDateText) + condItem.Vcmto
              });
            })
          });

          const dateTypes = { list: listAux, error: false };

          setPaymenteDateTypes(dateTypes);
        })
        .catch(err => {
          console.error("callPaymentDateTypes: Catch, ", err);
        })
        .finally(() => { });

    } else {
      console.error("callPaymentDateTypes: Order Object is empty, cannot get external price. ", currentOrder);
    }

  };

  const unsetExternalPricingValues = () => {
    const noExternalPricingItems = []
    const commerceItemsClone = { ...commerceItems }
    for(const commerceItemKey in commerceItemsClone) {
      const commerceItem = commerceItemsClone[commerceItemKey]
      commerceItem.externalPriceQuantity = 0 
      noExternalPricingItems.push(commerceItem)
    }

    store.action('updateCart', {
      op: "update",
      shoppingCart: {
        items: noExternalPricingItems
      },
      tam_externalPricingID: "__reset"
    })
    .then(() => ( setIsSpinnerVisible(false) ))
  }

  const onDateChange = useCallback(event => {

    setIsSpinnerVisible(true)

    if (event.target.value != -1) {
      const dataPayload = event.target.value.split('--');
      const payload = {
        "id": dataPayload[0],
        "idCond": dataPayload[1],
        "items": []
      }

      const listItems = Object.keys(commerceItems);
      listItems.forEach(item => {
        if (commerceItems[item].productId) {
          payload.items.push({
            "id": item,
            "productId": commerceItems[item].productId,
            "quantity": commerceItems[item].quantity,
            "salePrice": commerceItems[item].salePrice,
            "rawTotalPrice": commerceItems[item].rawTotalPrice
          });
        }
      });

      store.action('setExternalPricing', JSON.stringify(payload))
        .then(() => ( setIsSpinnerVisible(false) ))
    } else {
      unsetExternalPricingValues()
    }
  });


  const SELECT_OPTIONS_PAYMENT_DATE = (() => {
    const options = [];
    if (paymenteDateTypes && paymenteDateTypes.list && !paymenteDateTypes.error) {
      const list = paymenteDateTypes.list;

      options.push(
        <option key={-1} value={-1}>
          {t(selectPaymentDueDateText)}
        </option>
      );

      for (let count = 0; count < list.length; count++) {
        options.push(
          <option key={list[count].id} value={list[count].id}>
            {list[count].value}
          </option>
        );
      }
      
    }
    return options;
  })();

  const shouldRenderComponent = () => {
    let hasItems = false
    if(commerceItems)
      hasItems = Object.keys(commerceItems).length > 0

      setIsComponentVisible(
        isUserLoggedIn && 
        hasItems
      )
  }

  useEffect(() => {
    shouldRenderComponent()
    callPaymentDateTypes()
  }, [ isUserLoggedIn, commerceItems ])

  return (
    isComponentVisible
      ? <Styled id="TmbExternalPricing" css={css}>
        <div className="TmbExternalPricing">
            <TmbSpinner show={isSpinnerVisible}/>
            <span className="TmbExternalPricing__Title">{ t(listPriceTitle) }</span>
            { paymenteDateTypes && !paymenteDateTypes.error
              ? <div>
                  <Dropdown
                    defaultValue='Exibir lista de tipos de pagamentos'
                    onChange={onDateChange}
                    aria-label='Exibir lista de tipos de pagamentos'
                  >
                    {SELECT_OPTIONS_PAYMENT_DATE}
                  </Dropdown>
                </div>
              : <div className="TmbExternalPricing__Help">
                  { t(searchHelp) }
                </div>
            }
          </div>
        </Styled>
      : <></>
  );

};

TmbExternalPricing.propTypes = {
  isGetCartInProgress: PropTypes.number.isRequired,
  currentOrder: PropTypes.shape({
    commerceItems: PropTypes.objectOf(PropTypes.object)
  }).isRequired
};

export default connect(getComponentData)(TmbExternalPricing);
