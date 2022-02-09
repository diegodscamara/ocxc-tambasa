/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import SpinnerContent from './spinner-content';
import {objToClassName} from '@oracle-cx-commerce/utils/generic';
import PropTypes from 'prop-types';

/**
 * Generic PageLoader component. This can be used to render any type of Page loader
 * based on page type. This helps to prevent flickering effect and improves user experience.
 * This component can be configured to display CSS Placeholder boxes, spinner or any other
 * type of page loader during page navigation.
 *
 * @param {String} props.show Controls show/hide of the page loader
 * @param {String} props.className Custom classes
 * @param {String} props.showSpinner Spinner display control
 * @param {String} props.children children
 *
 * @return a PageLoader component
 */
const TmbPageLoader = props => {
  const {show = false, className = '', children = '', showSpinner} = props;

  return (
    <Styled id="TmbPageLoader" css={css}>
      <div className={objToClassName({PageLoader: true, [className]: true, Dismiss: !show})}>
        {showSpinner ? <SpinnerContent /> : children}
      </div>
    </Styled>
  );
};

TmbPageLoader.propTypes = {
  /**
   * class name to be applied to the HTML element.
   */
  className: PropTypes.string,

  /**
   * show page loader or not
   */
  show: PropTypes.bool,

  showSpinner: PropTypes.bool,

  /**
   * Child nodes to by displayed
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

TmbPageLoader.defaultProps = {
  className: '',
  show: false,
  children: '',
  showSpinner: false
};

export default React.memo(TmbPageLoader);
