import * as en from './locales/en'
import * as pt_BR from './locales/pt_BR'

const config = {
  properties: [
    {
      id: 'firstImage',
      type: 'mediaType',
      defaultValue: '/file/v1434829370805616394/general/caminhao.png',
      labelResourceId: 'firstImageText'
    },
    {
      id: 'firstTitleTop',
      type: 'stringType',
      defaultValue: 'FRETE GRÁTIS',
      labelResourceId: 'firstTitleTopText'
    },
    {
      id: 'firstTitleBottom',
      type: 'stringType',
      defaultValue: 'Acima de R$ 599',
      labelResourceId: 'firstTitleBottomText'
    },
    {
      id: 'secondImage',
      type: 'mediaType',
      defaultValue: '/file/v8437484103116696069/general/brasil.png',
      labelResourceId: 'secondImageText'
    },
    {
      id: 'secondTitleTop',
      type: 'stringType',
      defaultValue: 'ENTREGAMOS',
      labelResourceId: 'secondTitleTopText'
    },
    {
      id: 'secondTitleBottom',
      type: 'stringType',
      defaultValue: 'Em todo Brasil',
      labelResourceId: 'secondTitleBottomText'
    },
    {
      id: 'thirdImage',
      type: 'mediaType',
      defaultValue: '/file/v268275004750116475/general/cartao.png',
      labelResourceId: 'thirdImageText'
    },
    {
      id: 'thirdTitleTop',
      type: 'stringType',
      defaultValue: 'PAGUE NO CARTÃO',
      labelResourceId: 'thirdTitleTopText'
    },
    {
      id: 'thirdTitleBottom',
      type: 'stringType',
      defaultValue: 'Parcele em até 12x',
      labelResourceId: 'thirdTitleBottomText'
    },
    {
      id: 'fourthImage',
      type: 'mediaType',
      defaultValue: '/file/v6678984436735984037/general/codigo de barras.png',
      labelResourceId: 'fourthImageText'
    },
    {
      id: 'fourthTitleTop',
      type: 'stringType',
      defaultValue: '5% DE DESCONTO',
      labelResourceId: 'fourthTitleTopText'
    },
    {
      id: 'fourthTitleBottom',
      type: 'stringType',
      defaultValue: 'Pagto. PIX ou Boleto',
      labelResourceId: 'fourthTitleBottomText'
    },
    {
      id: 'fifthImage',
      type: 'mediaType',
      defaultValue: '/file/v7818802810804791971/general/seguro.png',
      labelResourceId: 'fifthImageText'
    },
    {
      id: 'fifthTitleTop',
      type: 'stringType',
      defaultValue: '100% SEGURO',
      labelResourceId: 'fifthTitleTopText'
    },
    {
      id: 'fifthTitleBottom',
      type: 'stringType',
      defaultValue: 'Compras seguras',
      labelResourceId: 'fifthTitleBottomText'
    }
  ],
  locales: {
    en: {
      resources: en
    },
    'pt-BR': {
      resources: pt_BR
    }
  }
};

export default config;

