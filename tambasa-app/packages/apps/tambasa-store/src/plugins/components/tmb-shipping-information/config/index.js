import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = [
    'configShowEditLinkLabel',
    'configShowEditLinkHelpText',
    'configShowItemPriceLabel',
    'configProductSelectionLabel',
    'configProductSelectionHelpText'
];

const config = {
    properties: [
        {
            id: 'showEditLink',
            type: 'booleanType',
            labelResourceId: 'configShowEditLinkLabel',
            helpTextResourceId: 'configShowEditLinkHelpText',
            defaultValue: false
        },
        {
            id: 'showItemPrice',
            type: 'booleanType',
            labelResourceId: 'configShowItemPriceLabel',
            defaultValue: false
        },
        {
            id: 'enableProductSelection',
            type: 'booleanType',
            defaultValue: false,
            labelResourceId: 'configProductSelectionLabel',
            helpTextResourceId: 'configProductSelectionHelpText'
        }
    ],
    locales: buildConfigResources(resourceBundle, configResourceKeys)
};

export default config;
