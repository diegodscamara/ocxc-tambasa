import { pt_BR } from '@oracle-cx-commerce/resources';
import { buildConfigResources } from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = [
  'configMaximumNumberOfProductsLabel',
  'configMaximumNumberOfProductsHelpText',
  'configRecommendationsStrategyLabel',
  'configRecommendationsStrategyHelpText',
  'recommendationsTitleLabel',
  'recommendationsTitleHelp'
];

const recommendationsTitleLabel = "Título do Carrossel"
const recommendationsTitleHelp = "O título do carrossel. Dica: Para usar os estilos demarcados assim como nos layouts basta dividir o texto com uma '/'"

const ptBRLocales = buildConfigResources({
  'pt-BR': { ...pt_BR, recommendationsTitleLabel, recommendationsTitleHelp }
}, configResourceKeys)

export default ptBRLocales