/**
 * @author guilherme.vieira
 * @description forcing the scroll to be on its beginning 
 */
export const scrollToTop = () => {
    const { scrollY } = window
    if(scrollY && scrollY !== 0) window.scrollTo(0, 0)
}