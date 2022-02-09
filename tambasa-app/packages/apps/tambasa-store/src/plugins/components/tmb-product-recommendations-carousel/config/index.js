import pt_BR from './locales/pt-BR'
import en from './locales/en'

const config = {
  properties: [
    {
      id: 'recommendationsTitle',
      type: 'stringType',
      defaultValue: 'Você também vai gostar de',
      required: true,
      labelResourceId: 'recommendationsTitleLabel',
      helpTextResourceId: 'recommendationsTitleHelp'
    },
    {
      id: 'maximumNumberOfProducts',
      type: 'stringType',
      labelResourceId: 'configMaximumNumberOfProductsLabel',
      defaultValue: '12',
      helpTextResourceId: `configMaximumNumberOfProductsHelpText`,
      required: true,
      pattern: '^[1-9]\\d*$'
    },
    {
      id: 'strategy',
      type: 'select2Type',
      name: 'strategy',
      helpTextResourceId: 'configRecommendationsStrategyHelpText',
      labelResourceId: 'configRecommendationsStrategyLabel',
      required: true,
      dataKey: 'strategies',
      defaultValue: 'Blended'
    }
  ],
  locales: {
    en,
    pt_BR
  },
  defaults: {
    maximumNumberOfProducts: '12',
    strategy: 'Blended'
  }
};

export default config;
