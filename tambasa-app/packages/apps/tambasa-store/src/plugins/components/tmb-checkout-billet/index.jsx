import React, {useContext, useEffect, useState} from 'react';
import {PAYMENT_TYPE_INVOICE} from '@oracle-cx-commerce/commerce-utils/constants';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {getComponentData} from './selectors';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import {PaymentsContext, StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import PropTypes from 'prop-types';
import {validatePaymentsEnabled} from '@oracle-cx-commerce/react-components/utils/payment';

import ExternalPricing from '../tmb-external-pricing'

/**
 * This component is an extension of the checkout-invoice component. We're using it since there's no
 * generic or cash payment component available at the moment.
*/
const TmbCheckoutBillet = props => {
  const {
    isPaymentDisabled,
    isDisplayCheckoutInvoice,
    appliedInvoicePaymentGroups,
    isPaymentMethodEnabledForApproval,
    isApprovalEnabled = false,
    PaymentInfoForScheduledOrder,
    currentProfile,
    isInvoicedBill
  } = props;

  // custom resources
  const {
    invoicedBillDescription,
    bankSlipDescription
  } = props

  const {
    payments = [],
    selectedPaymentType,
    addOrUpdatePaymentToContext,
    isApprovalRequired,
    setSelectedPaymentType,
    removePaymentFromContextByType,
    updateSelectedPaymentType
  } = useContext(PaymentsContext) || {};

  const { action } = useContext(StoreContext)
  const [paymentDetails, setPaymentDetails] = useState({type: PAYMENT_TYPE_INVOICE});

  // useEffect will set selectedPaymentType (which to set payment radio button as checked) if payment already applied
  useEffect(() => {
    if (appliedInvoicePaymentGroups.length && !isPaymentDisabled) {
      setPaymentDetails(paymentDetails => {
        return {
          ...paymentDetails,
          PONumber: ''
          /* customProperties: {
            type: isInvoicedBill ? "invoicedBill" : "bankSlip",
            condition: ""
          } */
        };
      });
      setSelectedPaymentType(PAYMENT_TYPE_INVOICE);
    }
  }, [appliedInvoicePaymentGroups, isPaymentDisabled, setSelectedPaymentType]);

  // this useEffect will add current payment in the payment context
  // on radio button selection and if payment get disable then it reset the selected payment type
  // and removes the applied in store payment
  useEffect(() => {
    if (selectedPaymentType === PAYMENT_TYPE_INVOICE) {
      const existingInvoicePayment = payments.find(payment => payment.type === PAYMENT_TYPE_INVOICE);
      if (!isPaymentDisabled && paymentDetails.billingAddress && paymentDetails.billingAddress.country) {
        const paymentGroupId =
          appliedInvoicePaymentGroups.length !== 0 ? appliedInvoicePaymentGroups[0].paymentGroupId : null;
        const payment = paymentGroupId ? {...paymentDetails, paymentGroupId} : paymentDetails;

        if (existingInvoicePayment) {
          payment.seqNum = existingInvoicePayment.seqNum;
        }
        if (
          !existingInvoicePayment ||
          existingInvoicePayment.billingAddress !== payment.billingAddress ||
          existingInvoicePayment.PONumber !== payment.PONumber
        ) {
          addOrUpdatePaymentToContext(payment);
        }
      } else if (
        isPaymentDisabled ||
        ((!paymentDetails.billingAddress || !paymentDetails.billingAddress.country) && existingInvoicePayment)
      ) {
        removePaymentFromContextByType(PAYMENT_TYPE_INVOICE);
        if (isPaymentDisabled) {
          setSelectedPaymentType('');
        }
      }
    }
  }, [
    selectedPaymentType,
    isPaymentDisabled,
    appliedInvoicePaymentGroups,
    paymentDetails,
    payments,
    addOrUpdatePaymentToContext,
    removePaymentFromContextByType,
    setSelectedPaymentType
  ]);

  /**
   * @author guilherme.vieira
   * @description we need to set the billing address anyway
   * first we try to use the contactBillingAddress, if not ok, the contactShippingAddress
   * and finally the first shipping address in addresses list
   * @param {Object} profile 
   * @returns {String} that contains the address id
   */
  const getShopperAddressId = (profile) => {
    return (profile.shippingAddress && profile.shippingAddress != "")
      ? profile.shippingAddress
      : (profile.shippingAddresses && profile.shippingAddresses.length && profile.shippingAddresses.length > 0)
        ? profile.shippingAddresses[0]
        : ''
  }

  const fetchAndPopulateShopperOrderAddress = async (addressId) => {
    const result = await action('getProfileAddress', { addressId })

    if(result.ok) {
      const contactInfos = result.delta.profileRepository.contactInfos
      const contactInfosKeys = Object.keys(contactInfos)
      let address = {}
      if(contactInfosKeys.length > 0) {
        const { 
          firstName = '',
          lastName = '',
          country = '',
          postalCode = '',
          state = '',
          address1 = '',
          city = '',
          phoneNumber = ''
        } = contactInfos[contactInfosKeys[0]]

        address = {
          billingAddress: {
            firstName,
            lastName,
            country,
            postalCode,
            state,
            address1,
            city,
            phoneNumber
          }
        }

      }

      setPaymentDetails(paymentDetails => {
        return {...paymentDetails, ...address};
      });

    } else {
      console.error(`Error fetching address ${addressId}`, result)
    }
  }

  useEffect(() => {
    const chosenShippingAddress = getShopperAddressId(currentProfile)
    fetchAndPopulateShopperOrderAddress(chosenShippingAddress)
    updateSelectedPaymentType(PAYMENT_TYPE_INVOICE);

    action('updateCart', {
      op: "update",
      tam_externalPricingID: "__reset"
    })

  }, [])

  return (
    isDisplayCheckoutInvoice &&
    validatePaymentsEnabled(
      isApprovalRequired,
      isApprovalEnabled,
      isPaymentMethodEnabledForApproval,
      PaymentInfoForScheduledOrder
    ) && (
      <Styled id="TmbCheckoutBillet" css={css}>
        <div className="TmbCheckoutBillet__Container">
          {
            !isInvoicedBill
              ? <div className="TmbCheckoutBillet__Container__Common">
                <div className="TmbCheckoutBilletCommon__Wrapper">
                  <p>{bankSlipDescription}</p>
                </div>
                <img className='TmbCheckoutBilletCommon__Icon' src="/file/general/boleto.png" alt="Boleto" />
              </div>
              : <div className="TmbCheckoutBillet__Container__Invoiced">
                <div className="TmbCheckoutBilletInvoiced__Wrapper">
                  <p>{invoicedBillDescription}</p>
                </div>
                <div className="TmbCheckoutBillet_ExternalPricing__Container">
                  <ExternalPricing {...props}/>
                </div>
              </div>
          }
        </div>
      </Styled>
    )
  );
};

TmbCheckoutBillet.propTypes = {
  /**
  * The unique id for the component
  */
  id: PropTypes.string.isRequired,

  /**
  * Flag to indicate if order is accepting new payment
  */
  isPaymentDisabled: PropTypes.bool.isRequired,

  /**
  * Flag indicates whether to display component UI or not
  */
  isDisplayCheckoutInvoice: PropTypes.bool.isRequired,

  /**
  * Indicates if payment method is enabled for approval
  */
  isPaymentMethodEnabledForApproval: PropTypes.bool.isRequired,

  /**
  * Indicates if approval is enabled
  */
  isApprovalEnabled: PropTypes.bool,

  /**
  * Invoice payment Groups
  */
  appliedInstorePaymentGroups: PropTypes.arrayOf(
    PropTypes.shape({
      /**
      * paymentGroupId of paymentGroup
      */
      paymentGroupId: PropTypes.string.isRequired,

      /**
      * Payment method of payment Group
      */
      paymentMethod: PropTypes.string.isRequired,

      /**
      * Payment state of payment Group
      */
      paymentState: PropTypes.string.isRequired,

      /**
      * amount of payment Group
      */
      amount: PropTypes.number.isRequired
    })
  )
};

/**
* Default values for props
*/
TmbCheckoutBillet.defaultProps = {
  isApprovalEnabled: false,
  appliedInstorePaymentGroups: []
};

export default connect(getComponentData)(TmbCheckoutBillet);
