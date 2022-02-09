import React, {useState, useCallback} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Dropdown from '@oracle-cx-commerce/react-components/dropdown';
import {QTY_CONF as config} from './config';
import PropTypes from 'prop-types';

import css from '../styles.css';

// anonymous func invocation, as it need not be re rendered.
const SELECT_OPTIONS = (() => {
  const options = [];
  for (let count = 1; count < config.DROP_DOWN_QTY_MAX; count++) {
    options.push(
      <option key={count} value={count}>
        {count}
      </option>
    );
  }
  options.push(
    <option key={config.DROP_DOWN_QTY_MAX} value={config.DROP_DOWN_QTY_MAX}>
      {config.DROP_DOWN_QTY_MAX}+
    </option>
  );

  return options;
})();

/**
 * maxLength Check for number input
 * @param  {Event} event
 */
const maxLengthCheck = event => {
  const inputValue = event.target.value;
  if (inputValue && inputValue.length > 3) {
    event.target.value = inputValue.slice(0, 3);
  }
};

const Quantity = ({
  label,
  id = '',
  name = '',
  disabled = false,
  'data-testid': dataTestId = '',
  className = '',
  handleQuantityChanged,
  value
}) => {
  // state
  const [showQtyTextField, setShowQtyTextField] = useState(false);

  const onQuantityChange = useCallback(
    event => {
      const qty = event.target.value ? event.target.value : 1;
      const parsedQty = parseInt(qty, 10);
      if (parsedQty >= config.DROP_DOWN_QTY_MAX && !showQtyTextField) {
        setShowQtyTextField(true);
      }
      if (!isNaN(parsedQty)) {
        handleQuantityChanged(parsedQty);
      }
    },
    [handleQuantityChanged, showQtyTextField]
  );

  return (
    <Styled id="Quantity" css={css}>
      <div className={`Quantity ${className}`}>
        {showQtyTextField && (
          <Dropdown
            label={label}
            aria-label={label}
            id={id}
            name={name}
            data-testid={dataTestId}
            disabled={disabled}
            onChange={onQuantityChange}
            className={className}
            value={value}
          >
            {SELECT_OPTIONS}
          </Dropdown>
        )}

        {!showQtyTextField && (
          <div className="Quantity__InputWrapper">
            <label htmlFor={id}>{label}</label>
            <input
              type="number"
              id={id}
              name={name}
              data-testid={dataTestId}
              className="TmbQuantity__Textbox"
              defaultValue={value}
              onChange={onQuantityChange}
              onInput={maxLengthCheck}
              aria-label={label}
              disabled={disabled}
              min={1}
              max={config.QTY_MAX_TEXT_INPUT}
            />
          </div>
        )}
      </div>
    </Styled>
  );
};

Quantity.propTypes = {

  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  handleQuantityChanged: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

Quantity.defaultProps = {
  className: '',
  id: ''
};

export default React.memo(Quantity);
