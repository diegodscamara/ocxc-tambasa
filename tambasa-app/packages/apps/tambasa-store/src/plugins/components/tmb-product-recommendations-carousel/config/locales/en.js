import { en } from '@oracle-cx-commerce/resources';
import { buildConfigResources } from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = [
  'configMaximumNumberOfProductsLabel',
  'configMaximumNumberOfProductsHelpText',
  'configRecommendationsStrategyLabel',
  'configRecommendationsStrategyHelpText',
  'recommendationsTitleLabel',
  'recommendationsTitleHelp'
];

const recommendationsTitleLabel = "Carousel title"
const recommendationsTitleHelp = "It will be displayed on top of the carousel. Tip: To use the styles as designed on layouts you need to split the text with a '/'"

const enLocales = buildConfigResources({
  en: {...en, recommendationsTitleLabel, recommendationsTitleHelp }
}, configResourceKeys)

export default enLocales