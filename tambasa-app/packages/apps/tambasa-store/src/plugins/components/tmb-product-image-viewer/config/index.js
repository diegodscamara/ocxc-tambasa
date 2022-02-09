/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = [
  'configThumbnailLocation',
  'configThumbnailLocationHelpText',
  'configThumbnailLocationDoNotDisplayLabel',
  'configThumbnailLocationAboveLabel',
  'configThumbnailLocationBelowLabel',
  'configThumbnailLocationLeftLabel',
  'configThumbnailLocationRightLabel',
  'configDisplayImageZoom',
  'configDisplayImageZoomHelpText'
];

const config = {
  properties: [
    {
      id: 'thumbnailLocation',
      type: 'optionType',
      name: 'thumbnailLocation',
      helpTextResourceId: 'configThumbnailLocationHelpText',
      labelResourceId: 'configThumbnailLocation',
      defaultValue: 'left',
      required: true,
      options: [
        {
          id: 'thumbnailLocationDropDown',
          value: 'doNotDisplay',
          labelResourceId: 'configThumbnailLocationDoNotDisplayLabel'
        },
        {
          id: 'thumbnailLocationDropDown',
          value: 'above',
          labelResourceId: 'configThumbnailLocationAboveLabel'
        },
        {
          id: 'thumbnailLocationDropDown',
          value: 'below',
          labelResourceId: 'configThumbnailLocationBelowLabel'
        },
        {
          id: 'thumbnailLocationDropDown',
          value: 'left',
          labelResourceId: 'configThumbnailLocationLeftLabel'
        },
        {
          id: 'thumbnailLocationDropDown',
          value: 'right',
          labelResourceId: 'configThumbnailLocationRightLabel'
        }
      ]
    },
    {
      id: 'displayImageZoom',
      type: 'booleanType',
      labelResourceId: 'configDisplayImageZoom',
      helpTextResourceId: 'configDisplayImageZoomHelpText',
      defaultValue: true
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
};

export default config;
