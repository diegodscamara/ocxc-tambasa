/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

/**
 * Configuration options for different components. Can be overridden for customization
 */

// Img Component
export const IMG_CONF = {
  VIEWPORT_XS_WIDTH: 480,
  VIEWPORT_SM_WIDTH: 768,
  VIEWPORT_MD_WIDTH: 979,
  DEFAULT_IMG_SIZES: {
    large: {height: 940, width: 940},
    medium: {height: 475, width: 475},
    small: {height: 300, width: 300},
    xsmall: {height: 100, width: 100}
  },
  ERROR_ALT_TEXT: 'No Image Found',
  DEFAULT_LOADING: 'lazy',
  USE_SRCSET: true,
  DEFAULT_QUALITY: null, // when null, image renders with original quality
  DEFAULT_OUTPUT_FORMAT: null,
  DEFAULT_ALPHA_CHANNEL_COLOR: null
};

export const QTY_CONF = {
  DROP_DOWN_QTY_MAX: 999,
  QTY_MAX_TEXT_INPUT: 999
};

export const PAGE_LOADER = {
  USE_SPINNER_ALWAYS: false
};

export const FOOTER_CONF = {
  LAZY_FOOTER_ENABLED: true,
  FIRST_TIME_PAGE_LOAD_DELAY: 1000, // in milliseconds
  DELAY: 500 // in milliseconds
};
