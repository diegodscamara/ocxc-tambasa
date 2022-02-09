import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';

export const cartItemDetailsConfigResourceKeys = [
  'configAddToPurchaseListEnable',
  'configAddToPurchaseListEnableHelpText',
  'configMoveToWishListEnable',
  'configMoveToWishListEnableHelpText',
  'configShowItemPriceLabel',
  'configShowItemPriceHelpText',
  'configColorSwatchImageHeadingLabel',
  'configColorIndicatorLabel',
  'configColorIndicatorHelpText',
  'configTextNumberOfColors',
  'configTextFirstFew',
  'configTextAllColors',
  'configNumberOfSwatchesDisplayedLabel',
  'configNumberOfSwatchesDisplayedHelpText',
  'configColorSwatchShapeHelpText',
  'configColorSwatchShapeLabel',
  'configTextCircular',
  'configTextRectangular',
  'configColorSwatchImageWidthHelpText',
  'configColorSwatchImageWidthLabel',
  'configColorSwatchImageHeightHelpText',
  'configColorSwatchImageHeightLabel',
  'configSwatchVariantOptionHelpText',
  'configSwatchVariantOptionLabel',
  'configSwatchMappingPropertyHelpText',
  'configSwatchMappingPropertyLabel',
  'configColorSwatchUrlPlaceholderHelpText',
  'configColorSwatchUrlPlaceholderLabel'
];
export const cartItemConfigProperties = [
  {
    id: 'showAddToPurchaseList',
    type: 'booleanType',
    defaultValue: false,
    labelResourceId: 'configAddToPurchaseListEnable',
    helpTextResourceId: 'configAddToPurchaseListEnableHelpText'
  },
  {
    id: 'showMoveToWishList',
    type: 'booleanType',
    defaultValue: false,
    labelResourceId: 'configMoveToWishListEnable',
    helpTextResourceId: 'configMoveToWishListEnableHelpText'
  },
  {
    id: 'showItemPrice',
    type: 'booleanType',
    labelResourceId: 'configShowItemPriceLabel',
    defaultValue: false,
    helpTextResourceId: 'configShowItemPriceHelpText'
  },
  {
    id: 'colorSwatchImageHeading',
    name: 'colorSwatchImageHeading',
    type: 'sectionTitleType',
    labelResourceId: 'configColorSwatchImageHeadingLabel'
  },
  {
    id: 'colorIndicator',
    type: 'optionType',
    name: 'colorIndicator',
    helpTextResourceId: 'configColorIndicatorHelpText',
    labelResourceId: 'configColorIndicatorLabel',
    defaultValue: 'firstFew',
    required: true,
    options: [
      {
        id: 'numberOfColors',
        value: 'numberOfColors',
        labelResourceId: 'configTextNumberOfColors'
      },
      {
        id: 'firstFew',
        value: 'firstFew',
        labelResourceId: 'configTextFirstFew'
      },
      {
        id: 'allColors',
        value: 'allColors',
        labelResourceId: 'configTextAllColors'
      }
    ]
  },
  {
    id: 'numberOfSwatchesDisplayed',
    type: 'stringType',
    name: 'numberOfSwatchesDisplayed',
    helpTextResourceId: 'configNumberOfSwatchesDisplayedHelpText',
    labelResourceId: 'configNumberOfSwatchesDisplayedLabel',
    defaultValue: '5',
    required: true,
    maxLength: 3
  },
  {
    id: 'colorSwatchShape',
    type: 'optionType',
    name: 'colorSwatchShape',
    helpTextResourceId: 'configColorSwatchShapeHelpText',
    labelResourceId: 'configColorSwatchShapeLabel',
    defaultValue: 'circular',
    required: true,
    options: [
      {
        id: 'circular',
        value: 'circular',
        labelResourceId: 'configTextCircular'
      },
      {
        id: 'rectangular',
        value: 'rectangular',
        labelResourceId: 'configTextRectangular'
      }
    ]
  },
  {
    id: 'colorSwatchImageWidth',
    type: 'stringType',
    name: 'colorSwatchImageWidth',
    helpTextResourceId: 'configColorSwatchImageWidthHelpText',
    labelResourceId: 'configColorSwatchImageWidthLabel',
    defaultValue: '24',
    required: true,
    maxLength: 3
  },
  {
    id: 'colorSwatchImageHeight',
    type: 'stringType',
    name: 'colorSwatchImageHeight',
    helpTextResourceId: 'configColorSwatchImageHeightHelpText',
    labelResourceId: 'configColorSwatchImageHeightLabel',
    defaultValue: '24',
    required: true,
    maxLength: 3
  },
  {
    id: 'swatchVariantOption',
    type: 'stringType',
    name: 'swatchVariantOption',
    helpTextResourceId: 'configSwatchVariantOptionHelpText',
    labelResourceId: 'configSwatchVariantOptionLabel',
    defaultValue: 'color'
  },
  {
    id: 'swatchMappingProperty',
    type: 'stringType',
    name: 'swatchMappingProperty',
    helpTextResourceId: 'configSwatchMappingPropertyHelpText',
    labelResourceId: 'configSwatchMappingPropertyLabel',
    defaultValue: 'x_swatchMapping'
  },
  {
    id: 'colorSwatchUrlPlaceholder',
    type: 'stringType',
    name: 'colorSwatchUrlPlaceholder',
    helpTextResourceId: 'configColorSwatchUrlPlaceholderHelpText',
    labelResourceId: 'configColorSwatchUrlPlaceholderLabel',
    defaultValue:
      '/ccstore/v1/images/?source=/file/products/__productId__.__swatchKey__.png&outputFormat=JPEG&quality=0.8&height=__height__&width=__width__'
  }
];

const cartItemConfig = mergeDefaultConfig({
  properties: [...cartItemConfigProperties],
  locales: buildConfigResources(resourceBundle, cartItemDetailsConfigResourceKeys)
});

export default cartItemConfig;
