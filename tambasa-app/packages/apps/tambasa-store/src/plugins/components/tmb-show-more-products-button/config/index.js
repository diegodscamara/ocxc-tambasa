import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = [
  'configTextPaginationMode',
  'configTextPaginationModeHelpText',
  'configNumberOfpagesToShowBesideCurrentPage',
  'configNumberOfpagesToShowBesideCurrentPageHelpText',
  'configTextPaginationModeButton',
  'configTextPaginationModeStandard',
  'configTextPaginationModeBasic',
  'configTextPaginationModeDropdown',
  'configTextPaginationModeText'
];

const config = {
  properties: [
    {
      id: 'paginationMode',
      type: 'optionType',
      name: 'paginationMode',
      labelResourceId: 'configTextPaginationMode',
      helpTextResourceId: 'configTextPaginationModeHelpText',
      defaultValue: 'basic',
      required: true,
      options: [
        {
          id: 'button',
          value: 'button',
          labelResourceId: 'configTextPaginationModeButton'
        },
        {
          id: 'standard',
          value: 'standard',
          labelResourceId: 'configTextPaginationModeStandard'
        },
        {
          id: 'basic',
          value: 'basic',
          labelResourceId: 'configTextPaginationModeBasic'
        },
        {
          id: 'dropdown',
          value: 'dropdown',
          labelResourceId: 'configTextPaginationModeDropdown'
        },
        {
          id: 'text',
          value: 'text',
          labelResourceId: 'configTextPaginationModeText'
        }
      ]
    },
    {
      id: 'pagesToShowBesideCurrentPage',
      type: 'stringType',
      labelResourceId: 'configNumberOfpagesToShowBesideCurrentPage',
      helpTextResourceId: 'configNumberOfpagesToShowBesideCurrentPageHelpText',
      defaultValue: '1',
      pattern: '^[0-9]*$'
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
};

export default config;
