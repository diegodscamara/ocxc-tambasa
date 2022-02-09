import { en, pt_BR } from '@oracle-cx-commerce/resources';
import { buildConfigResources } from '@oracle-cx-commerce/resources/utils';

const configResourceKeys = [
  'configMediaLabel',
  'configMediaLinkBehaviorLabel',
  'configMediaTargetSelfLabel',
  'configMediaTargetBlankLabel',
  'configMediaLinkURLHelpText',
  'configMediaLinkURLLabel',
  'configMediaTitleTextLabel',
  'configMediaAltTextLabel',
  'configMediaTitleHelpText',
  'configMediaAltHelpText'
];

const config = {
  properties: [
    {
      id: 'mediaTitle',
      type: 'sectionTitleType',
      labelResourceId: 'configMediaLabel'
    },
    {
      id: 'media',
      type: 'mediaType',
      labelResourceId: 'configMediaLabel',
      required: true
    },
    {
      id: 'mediaAlt',
      type: 'stringType',
      labelResourceId: 'configMediaAltTextLabel',
      defaultValue: '',
      helpTextResourceId: 'configMediaAltHelpText',
      required: true,
      maxLength: 125
    },
    {
      id: 'mediaTitle',
      type: 'stringType',
      labelResourceId: 'configMediaTitleTextLabel',
      defaultValue: '',
      helpTextResourceId: 'configMediaTitleHelpText',
      required: false,
      maxLength: 500
    },
    {
      id: 'mediaLink',
      type: 'stringType',
      labelResourceId: 'configMediaLinkURLLabel',
      defaultValue: '',
      maxLength: 2000,
      helpTextResourceId: 'configMediaLinkURLHelpText',
      required: false,
      pattern:
        '^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/|\\/|www\\.)?([a-zA-Z0-9\\.\\-]+)*([a-zA-Z0-9\\.\\-]{1,5})(:[0-9]{1,5})?(\\/.*)?$'
    },
    {
      id: 'mediaLinkBehavior',
      type: 'optionType',
      labelResourceId: 'configMediaLinkBehaviorLabel',
      defaultValue: '_self',
      options: [
        {
          id: 'mediaTargetSelf',
          value: '_self',
          labelResourceId: 'configMediaTargetSelfLabel'
        },
        {
          id: 'mediaTargetBlank',
          value: '_blank',
          labelResourceId: 'configMediaTargetBlankLabel'
        }
      ],
      required: true
    }
  ],
  locales: buildConfigResources({ en, pt_BR }, configResourceKeys),
  defaults: {
    mediaTitle: ''
  }
};

export default config;
