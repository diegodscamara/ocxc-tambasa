/*
 ** Copyright (c) 2021 Oracle and/or its affiliates.
 */

import {getStylesheetURIs, getSite} from '@oracle-cx-commerce/commerce-utils/selector';
import {getEmptyString} from '@oracle-cx-commerce/utils/generic';
import * as styles from '@oracle-cx-commerce/styles';

const {getBaseStyleTag} = styles;

const getSiteStyleTags = (req, res) => {
  const {state} = res.locals;

  const stylesheetUris = getStylesheetURIs(state);

  // TODO: local modes does not work since it does not know the paths to actual CSS files in assets...
  // const assetModeBaseUrl = options.dsAssetMode === 'local' ? '' : baseURL;

  let siteStyleTags = '';

  for (const stylesheetUri of stylesheetUris) {
    siteStyleTags = `${siteStyleTags}<link rel="stylesheet" href="${stylesheetUri}">`;
  }

  return siteStyleTags;
};

export default (req, res) => {
  const {style = getEmptyString} = res.app.locals.indexHtml || {};

  const {browserCapabilities} = res.locals;

  const mobile = browserCapabilities.has('mobile');

  // Return query params to the style tag function *** THE ONLY CHANGE IN THIS FILE ***
  const baseStyleTag = getBaseStyleTag(styles, mobile, req.query);

  const siteStyleTags = getSiteStyleTags(req, res);

  return baseStyleTag + siteStyleTags + style(req, res);
};
