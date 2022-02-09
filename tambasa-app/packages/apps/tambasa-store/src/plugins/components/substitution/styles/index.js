export {default as common} from './common.css';
export {default as commonArmarinho} from './armarinho/common.css';
export {default as commonBg} from './bg/common.css';
export {default as commonEvoluir} from './evoluir/common.css';
export {default as commonOiBrasil} from './oi-brasil/common.css';

export {default as desktop} from './desktop.css';
export {default as mobile} from './mobile.css';
export {default as bootstrap} from './bootstrap.min.css' 

export {default as swiper} from 'swiper/css'
export {default as swiperNavigation} from 'swiper/css/navigation'

export {default as ProfilePendingApprovalModal} from './components/ProfilePendingApprovalModal.css'

const switchTheme = (styles, query) => {
  const { site } = query
  switch(site) {
    case 'armarinho':
      return styles.commonArmarinho || '';
    case 'gb':
      return styles.commonBg || '';
    case 'oibrasil':
      return styles.commonOiBrasil || '';
    case 'evoluir':
      return styles.commonEvoluir || '';
    default:
      return styles.common || '';
  }
}

/* Native functions are not returning siteId and locale properties */
export const getBaseStyleTag = (styles, isMobile, queryParams) => {
  const queryKeys = Object.keys(queryParams)
  let common;

  if(queryKeys.length > 0 && queryParams.site) common = switchTheme(styles, queryParams) 
  else common = styles.common || '';

  const desktop = styles.desktop || '';
  const mobile = styles.mobile || '';
  const bootstrap = styles.bootstrap || '';
  const swiper = styles.swiper || '';
  const swiperNavigation = styles.swiperNavigation || '';
  const ProfilePendingApprovalModal = styles.ProfilePendingApprovalModal || '';

  const css = common + (isMobile ? mobile : desktop) + 
    bootstrap + swiper + 
    swiperNavigation + ProfilePendingApprovalModal;

  return css ? `<style>${css}</style>` : '';
};
