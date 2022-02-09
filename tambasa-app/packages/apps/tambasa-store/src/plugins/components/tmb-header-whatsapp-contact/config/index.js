import * as en from './locales/en';
import * as pt_BR from './locales/pt_BR'

const config = {
  properties: [
    {
      id: 'settingTabTitle',
      type: 'sectionTitleType',
      labelResourceId: 'widgetSectionTitleText',
    },
    {
      id: 'whatsAppAccountPhoneNumber',
      type: 'stringType',
      defaultValue: '+00 00 00000-0000',
      labelResourceId: 'accountNumberLabelText',
      helpTextResourceId: 'accountNumberHelpText'
    },
    {
      id: 'whatsAppAttendancePageLink',
      type: 'stringType',
      defaultValue: '',
      labelResourceId: 'attendanceLinkLabelText',
      helpTextResourceId: 'attendanceLinkHelpText'
    }
  ],
  locales: {
    en: {
      resources: en
    },
    pt_BR: {
      resources: pt_BR
    }
  }
};

export default config;
