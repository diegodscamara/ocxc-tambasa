import * as en from './locales/en'
import * as pt_BR from './locales/pt_BR'
import {en as enBundle, pt_BR as ptBR_Bundle} from '@oracle-cx-commerce/resources'
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils'

const configResourceKeys = [
  'columnNameLabel',
  'configAddMoreRowsText',
  'configDisplaySection1Label',
  'configDisplaySection2Label',
  'configDisplaySection3Label',
  'configDisplaySection4Label',
  'attedanceLinkHelp',
  'fourthSectionLink1Label', 
  'fourthSectionText1Label',
  'fourthSectionText1Help',
  'fourthSectionLink2Label',
  'fourthSectionText2Label',
  'fourthSectionText2Help',
  'fourthSectionLink3Label',
  'fourthSectionText3Label',
  'fourthSectionText3Help',
]

const configResources = buildConfigResources({
  en: { ...enBundle, ...en },
  pt_BR: { ...ptBR_Bundle, ...pt_BR }
}, configResourceKeys)

const config = {
  properties: [
    {
      id: 'helpTextLinksListTitle1',
      type: 'sectionTitleType',
      labelResourceId: 'configDisplaySection1Label',
    },
    {
     id: 'firstColumnName',
     type: 'stringType',
     defaultValue: 'INSTITUCIONAL',
     labelResourceId: 'columnNameLabel',
    },
    {
      id: 'displaySection1',
      type: 'multiKeyValuePairsType',
      name: 'displaySection1',
      placeHolders: 'configPlaceHoldersText',
      maxLengths: '1000,2000',
      noOfColumns: 2,
      addMoreRowsResourceId: 'configAddMoreRowsText',
      required: true
    },
    {
      id: 'helpTextLinksListTitle2',
      type: 'sectionTitleType',
      labelResourceId: 'configDisplaySection2Label',
    },
    {
     id: 'secondColumnName',
     type: 'stringType',
     defaultValue: 'CATEGORIAS',
     labelResourceId: 'columnNameLabel',
    },
    {
      id: 'displaySection2',
      type: 'multiKeyValuePairsType',
      name: 'displaySection2',
      labelResourceId: 'configDisplaySection2Label',
      placeHolders: 'configPlaceHoldersText',
      maxLengths: '1000,2000',
      noOfColumns: 2,
      addMoreRowsResourceId: 'configAddMoreRowsText',
      required: true
    },
    {
      id: 'helpTextLinksListTitle3',
      type: 'sectionTitleType',
      labelResourceId: 'configDisplaySection3Label',
    },
    {
     id: 'thirdColumnName',
     type: 'stringType',
     defaultValue: 'PRODUTOS',
     labelResourceId: 'columnNameLabel',
    },
    {
      id: 'displaySection3',
      type: 'multiKeyValuePairsType',
      name: 'displaySection3',
      labelResourceId: 'configDisplaySection3Label',
      placeHolders: 'configPlaceHoldersText',
      maxLengths: '1000,2000',
      noOfColumns: 2,
      addMoreRowsResourceId: 'configAddMoreRowsText',
      required: true
    },
    {
      id: 'helpTextLinksListTitle4',
      type: 'sectionTitleType',
      labelResourceId: 'configDisplaySection4Label',
    },
    {
      id: 'fourthSectionLink1',
      type: 'stringType',
      defaultValue: '#',
      helpTextResourceId: 'attedanceLinkHelp',
      labelResourceId: 'fourthSectionLink1Label'
    },
    {
      id: 'fourthSectionText1',
      type: 'stringType',
      defaultValue: '11 99264-7511',
      helpTextResourceId: 'fourthSectionText1Help',
      labelResourceId: 'fourthSectionText1Label'
    },
    {
      id: 'fourthSectionLink2',
      type: 'stringType',
      defaultValue: '#',
      helpTextResourceId: 'attedanceLinkHelp',
      labelResourceId: 'fourthSectionLink2Label'
    },
    {
      id: 'fourthSectionText2',
      type: 'stringType',
      defaultValue: '11 99264-7511',
      helpTextResourceId: 'fourthSectionText2Help',
      labelResourceId: 'fourthSectionText2Label'
    },
    {
      id: 'fourthSectionLink3',
      type: 'stringType',
      defaultValue: '#',
      helpTextResourceId: 'attedanceLinkHelp',
      labelResourceId: 'fourthSectionLink3Label'
    },
    {
      id: 'fourthSectionText3',
      type: 'stringType',
      defaultValue: 'atendimento@tambasa.com',
      helpTextResourceId: 'fourthSectionText3Help',
      labelResourceId: 'fourthSectionText3Label'
    }
  ],
  defaults: {
    displaySection1: "[{'0':'HOME','1':'#'},{'0':'HOME','1':'#'},{'0':'HOME','1':'#'},{'0':'HOME','1':'#'},{'0':'HOME','1':'#'},{'0':'HOME','1':'#'},{'0':'HOME','1':'#'},{'0':'HOME','1':'#'},{'0':'HOME','1':'#'}]",
    displaySection2: "[{'2':'CATEGORIA','3':'#'},{'2':'CATEGORIA','3':'#'},{'2':'CATEGORIA','3':'#'},{'2':'CATEGORIA','3':'#'},{'2':'CATEGORIA','3':'#'},{'2':'CATEGORIA','3':'#'},{'2':'CATEGORIA','3':'#'},{'2':'CATEGORIA','3':'#'},{'2':'CATEGORIA','3':'#'}]",
    displaySection3: "[{'4':'PRODUTO','5':'#'},{'4':'PRODUTO','5':'#'},{'4':'PRODUTO','5':'#'},{'4':'PRODUTO','5':'#'},{'4':'PRODUTO','5':'#'},{'4':'PRODUTO','5':'#'},{'4':'PRODUTO','5':'#'},{'4':'PRODUTO','5':'#'},{'4':'PRODUTO','5':'#'}]"
  },
  locales: configResources
};
export default config;
