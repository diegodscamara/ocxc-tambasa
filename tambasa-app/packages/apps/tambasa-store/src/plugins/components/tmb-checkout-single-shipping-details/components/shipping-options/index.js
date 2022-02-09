/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import Dropdown from '@oracle-cx-commerce/react-components/dropdown';
import Radio from '@oracle-cx-commerce/react-components/radio';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {SHIPPING_GROUP_HARDGOOD} from '@oracle-cx-commerce/commerce-utils/constants';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {isAddressValid} from '@oracle-cx-commerce/react-components/utils/address';
import {isEmptyObject, noop, t} from '@oracle-cx-commerce/utils/generic';
import {useComponentData} from './selectors';
import {useNumberFormatter} from '@oracle-cx-commerce/react-components/utils/hooks';
import PropTypes from 'prop-types';

const RADIO = 'radio';

/**
 * Component to select a shipping method for the shipping group
 * @param props
 */
const ShippingOptions = props => {

  // resources
  const {
    headingShippingOptions, 
    labelShippingOptions, 
    textEnterAShippingAddress, 
    textNoShippingMethods, 
    freeShippingLabel
  } = props;

  const {
    shippingGroupId,
    shippingAddress = {},
    shippingMethod = {},
    cartAmount = 0,
    shippingMethodSelectorType = RADIO,
    isB2BUser,
    shippingDeliveryIndex = '',
    excludeNameValidation = false
  } = props;

  const {shippingMethodsDetails = {}, shippingMethodIds = []} = useComponentData({shippingGroupId});

  const store = useContext(StoreContext);
  const {action} = store;

  const formatCurrency = useNumberFormatter({style: 'currency'});
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [isFreeShipping, setIsFreeShipping] = useState(false)

  /**
   * Get the shipping amount based on the cart amount and the shipping cost range
   * @param {Array} shippingCostRanges shipping cost ranges for a shipping option
   * @returns {String} returns the formatted shipping cost
   */
  const getShippingCost = (shippingCostRanges = []) => {
    let shippingCost = 0;
    for (let i = 0; i < shippingCostRanges.length; i++) {
      const highValue = shippingCostRanges[i].high ? shippingCostRanges[i].high : Number.MAX_VALUE;
      const lowValue = shippingCostRanges[i].low;

      if (cartAmount >= lowValue && cartAmount <= highValue) {
        shippingCost = shippingCostRanges[i].amount;
      }
    }

    setIsFreeShipping(shippingCost === 0)

    return formatCurrency(shippingCost);
  };

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
   * Function to update the shipping method
   * @param {String} shippingMethod shipping method id
   */
  const updateShippingMethod = useCallback(
    shippingMethod => {
      const payload = {};
      payload.type = SHIPPING_GROUP_HARDGOOD;
      payload.shippingMethod = {value: shippingMethod};
      payload.shippingGroupId = shippingGroupId;

      setInProgress(true);
      action('updateCartShippingGroup', payload)
        .then(response => {
          if (response.ok === false) {
            onNotOk(response);
          }
        })
        .catch(error => {
          onNotOk({error});
        })
        .finally(() => {
          setInProgress(false);
        });
    },
    [action, onNotOk, shippingGroupId]
  );

  /**
   * Function to handle the shipping option change
   * @param {object} event event object
   */
  const handleShippingOptionChange = event => {
    const selectedShippingOption = event.target.value;
    if (selectedShippingOption !== shippingMethod.value) {
      updateShippingMethod(selectedShippingOption);
      setSelectedShippingMethod(selectedShippingOption);
    }
  };

  useEffect(() => {
    if (!inProgress) {
      if (selectedShippingMethod !== shippingMethod.value) {
        // if the 'updateCartShippingGroup' action is not in progress, then update it to the correct shipping group
        setSelectedShippingMethod(shippingMethod.value);
      }
    }
  }, [inProgress, selectedShippingMethod, shippingMethod.value]);

  /**
   * Shipping Options Selector of type radio buttons
   */
  const ShippingOptionsRadioButtons = () => (
    <div className="ShippingOptions__RadioButtons">
      {shippingMethodIds.map(shippingMethodId => (
        <div key={shippingMethodId}>
          {!isEmptyObject(shippingMethodsDetails[shippingMethodId]) && (
            <Radio
              id={`${shippingGroupId}_${shippingMethodId}`}
              className="ShippingOptions__Radio"
              name={`${shippingGroupId}_${shippingMethodId}`}
              data-testid={`${shippingGroupId}_${shippingMethodId}`}
              value={shippingMethodId}
              onChange={noop}
              onClick={handleShippingOptionChange}
              checked={selectedShippingMethod === shippingMethodId}
              labelText={
                <>
                  <span>
                    {shippingMethodsDetails[shippingMethodId].displayName + ': '}
                  </span>
                  <span className={`ShippingOption__Price${isFreeShipping ? '--isFree' : ''}`}>
                  {
                    getShippingCost(shippingMethodsDetails[shippingMethodId].ranges) && !isFreeShipping
                      ? getShippingCost(shippingMethodsDetails[shippingMethodId].ranges)
                      : <>{freeShippingLabel}</>
                  }
                  </span>
                </>
              }
            />
          )}
        </div>
      ))}
    </div>
  );

  /**
   * Shipping Options Selector of type drop down
   */
  const ShippingOptionsDropDown = () => (
    <Dropdown
      className="ShippingOptions__Dropdown"
      id={'ShippingOptions__Dropdown'}
      aria-label={labelShippingOptions}
      onChange={handleShippingOptionChange}
      required={true}
      value={selectedShippingMethod}
    >
      {shippingMethodIds.map(
        shippingMethodId =>
          !isEmptyObject(shippingMethodsDetails[shippingMethodId]) && (
            <option value={shippingMethodId} key={shippingMethodId}>
              {`${shippingMethodsDetails[shippingMethodId].displayName} : ${getShippingCost(
                shippingMethodsDetails[shippingMethodId].ranges
              )}`}
            </option>
          )
      )}
    </Dropdown>
  );

  /**
   * Render the Shipping Options based on the selector type
   * The selector type can be either 'radio buttons' or 'drop down'
   */
  const renderShippingOptions = () => {
    return shippingMethodSelectorType === RADIO ? <ShippingOptionsRadioButtons /> : <ShippingOptionsDropDown />;
  };

  return (
    <Styled css={css} id="ShippingOptions">
      <div className="ShippingOptions">
        <div className="ShippingOptions__HeadingText">
          <h3>{t(headingShippingOptions, {shippinggroupindex: shippingDeliveryIndex})}</h3>
        </div>

        {!isAddressValid(shippingAddress, isB2BUser, excludeNameValidation) ? (
          <div className="ShippingOptions__InvalidShippingAddress">
            <span>{textEnterAShippingAddress}</span>
          </div>
        ) : (
          <React.Fragment>
            {shippingMethodIds && shippingMethodIds.length > 0 ? (
              <React.Fragment>{renderShippingOptions()}</React.Fragment>
            ) : (
              !inProgress && (
                <div className="ShippingOptions__NoShippingMethods">
                  <span>{textNoShippingMethods}</span>
                </div>
              )
            )}
          </React.Fragment>
        )}
      </div>
    </Styled>
  );
};

ShippingOptions.propTypes = {
  /**
   * This is the shipping group id
   */
  shippingGroupId: PropTypes.string.isRequired,

  /**
   * Shipping Address.
   */
  shippingAddress: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address1: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
    country: PropTypes.string,
    phoneNumber: PropTypes.string
  }).isRequired,

  /**
   * Shipping Method.
   */
  shippingMethod: PropTypes.shape({}).isRequired,

  /**
   * Cart amount.
   */
  cartAmount: PropTypes.number,

  /**
   * Type of the UI element to display shipping options.
   */
  shippingMethodSelectorType: PropTypes.string.isRequired,

  /**
   * Type of the shopper.
   */
  isB2BUser: PropTypes.bool.isRequired,

  /**
   * Shipping Group index.
   */
  shippingDeliveryIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

ShippingOptions.defaultProps = {
  shippingDeliveryIndex: '',
  cartAmount: 0
};

export default React.memo(ShippingOptions);
