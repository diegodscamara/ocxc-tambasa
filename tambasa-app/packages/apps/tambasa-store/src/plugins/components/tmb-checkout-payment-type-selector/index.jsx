import React, {useContext, useState, useEffect} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

import {getCurrentOrder} from '@oracle-cx-commerce/commerce-utils/selector'
import {StoreContext, PaymentsContext} from '@oracle-cx-commerce/react-ui/contexts'
import {useSelector} from '@oracle-cx-commerce/react-components/provider'

const TmbCheckoutPaymentTypeSelector = props => {

  //configs
  const {
    enableCreditCardType,
    enableBilletType,
    enableInvoicedBillType,
    enablePIXType
  } = props

  //resources
  const {
    creditCardLabel,
    bankSlipLabel,
    invoicedBillLabel,
    PIXLabel
  } = props

  const { action } = useContext(StoreContext)
  const [ paymentTypes, setPaymentTypes ] = useState([
    {
      id: "credit-card",
      name: creditCardLabel,
      enabled: enableCreditCardType
    },
    {
      id: "bank-slip",
      name: bankSlipLabel,
      enabled: enableBilletType
    },
    {
      id: "invoiced-bill",
      name: invoicedBillLabel,
      enabled: enableInvoicedBillType
    },
    {
      id: "pix",
      name: PIXLabel,
      enabled: enablePIXType
    },
  ])

  const getFirstEnabledPayment = () => {
    const enabledPayments = paymentTypes.filter(type => type.enabled)
    const option = enabledPayments && enabledPayments.length > 0
      ? enabledPayments[0].id
      : (paymentTypes[0] && paymentTypes[0].id) || ""    
    return option
  }

  const [ paymentOptionSelected, setPaymentOptionSelected ] = useState(getFirstEnabledPayment())
  const { dynamicProperties: orderDynamicProperties = [], commerceItems = {} } = useSelector(getCurrentOrder)
  const { setIsInvoicePaymentType } = useContext(PaymentsContext)

  /**
   * @author guilherme.vieira
   * @description Sets a custom property that holds the condition id and
   * changes the externalPriceQuantities to zero based values
   * @returns {void}
   */
  const unsetExternalPricingValuesOfCommerceItems = () => {
    const noExternalPricingItems = []
    const commerceItemsClone = { ...commerceItems }
    for(const commerceItemKey in commerceItemsClone) {
      const commerceItem = commerceItemsClone[commerceItemKey]
      commerceItem.externalPriceQuantity = 0 
      noExternalPricingItems.push(commerceItem)
    }
    
    action('updateCart', {
      op: "update",
      shoppingCart: {
        items: noExternalPricingItems
      },
      tam_externalPricingID: "__reset"
    })

    return 
  }

  /* const updateCustomProperties = async () => {

    const { paymentGroups = [] } = getCurrentOrder(getState());
    const keys = Object.keys(paymentGroups)
    const firstPaymentKey = keys.length > 0 ? keys[0] : '' 

    const updateAppliedPayment = await action('updateAppliedPayment', {
      paymentGroupId: paymentGroups[firstPaymentKey].paymentGroupId || '',
      customProperties: {
        type: "invoicedBill",
        condition: ""
      }
    })

    const newPayment = {
      ...paymentGroups[firstPaymentKey],
      PONumber: "11111",
      customPaymentProperties: {
        type: "invoicedBill",
        condition: ""
      }
    }

    const updateCartResponse = await action('updateCart', {
      op: "update",
      payments: {
        ...paymentGroups,
        [firstPaymentKey]: newPayment
      }
    }) 
    
    console.log('olaaa', updateAppliedPayment)
  } */
    
  /**
   * @author guilherme.vieira
   * @description If the user triggers an external pricing action and then
   * chooses a different payment type, we need to reset the values to the default PLG
   */
  const handleExternalPricingValidations = async () => {
    // Updating payment context. We wanna know when it's invoiced billet is selected
    if(paymentOptionSelected !== "invoiced-bill") {
      setIsInvoicePaymentType(false)

      const externalPricesApplied = orderDynamicProperties.find(dp => dp.id === "tam_externalPricingID")
      if(externalPricesApplied && externalPricesApplied.value
        && externalPricesApplied.value !== "") {
          unsetExternalPricingValuesOfCommerceItems()
      }

    } else if(paymentOptionSelected === "invoiced-bill")
      setIsInvoicePaymentType(true)
  }

  useEffect(() => {
    setPaymentOptionSelected(getFirstEnabledPayment())
  }, [paymentTypes])

  useEffect(() => {
    action('paymentTypeSelector', { payment: paymentOptionSelected })
    // await updateCustomProperties()
    handleExternalPricingValidations()
    // action("paymentTypeLoading", {})
  }, [paymentOptionSelected])

  return (
    <Styled id="TmbCheckoutPaymentTypeSelector" css={css}>
      <div className="TmbCheckoutPaymentTypeSelector__Container">
        <div className="TmbCheckoutPaymentTypeSelector__PaymentGroup">
          {
            paymentTypes.map(paymentType =>
              <label className={`TmbCheckoutPaymentTypeSelector__PaymenyType__Container 
                ${!paymentType.enabled ? 'TmbCheckoutPaymentTypeSelector__PaymenyType__Container--isDisabled' : ''}`} 
                htmlFor={paymentType.id}
              >
                <input className="TmbCheckoutPaymentTypeSelector__Radio" type="radio" name="PaymentType" 
                  value={paymentType.id} id={paymentType.id} checked={paymentOptionSelected === paymentType.id}
                  onClick={() => setPaymentOptionSelected(paymentType.id)} disabled={!paymentType.enabled}/>
                <label className="TmbCheckoutPaymentTypeSelector__RadioLabel"
                  htmlFor={paymentType.id}
                >
                  {paymentType.name}
                </label>
              </label>    
            )
          }
        </div>
      </div>
    </Styled>
  );
};

export default TmbCheckoutPaymentTypeSelector;
