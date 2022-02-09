import * as customEn from './locales/en';
import * as customPtBR from './locales/pt-BR';
import { en, pt_BR } from '@oracle-cx-commerce/resources' 
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';
 
const configResourceKeys = [
  'collectionIdLabel',
  'collectionCarouselHeadingLabel',
  'displayCollectionNameLabel',
  'displayTextSnippetLabel',
  'noOfSlideItemsCountLabel',
  'itemsToSlideCountLabel',
  'itemsToSlideHelpText',
  'imageCarouselBannerLabel',
  'imageCarouselBannerHelpText',
  'directionBannerCarouselLabel',
  'directionBannerCarouselHelpText',
  'displayBannerRight',
  'displayBannerLeft'
];

const resources = buildConfigResources({ 
  en: {...en, ...customEn}, 
  pt_BR: {...pt_BR, ...customPtBR} 
}, configResourceKeys)

const config = {
  properties: [
    {
      id: 'categoryId',
      type: 'collectionType',
      labelResourceId: 'collectionIdLabel',
      required: true
    },
    {
      id: 'imageCarouselBanner',
      type: 'mediaType',
      labelResourceId: 'imageCarouselBannerLabel',
      helpTextResourceId: 'imageCarouselBannerHelpText',
      required: true
    },
    {
      id: 'directionBannerCarousel',
      type: 'optionType',
      labelResourceId: 'directionBannerCarouselLabel',
      helpTextResourceId: 'directionBannerCarouselHelpText',
      defaultValue: "left",
      options: [
        {
          id: 'displayBannerCarouselRight',
          value: "right",
          labelResourceId: 'displayBannerRight'
        },
        {
          id: 'displayBannerCarouselLeft',
          value: "left",
          labelResourceId: 'displayBannerLeft'
        }
      ],
      required: false
    },
  ],
  locales: resources
};

export default config;