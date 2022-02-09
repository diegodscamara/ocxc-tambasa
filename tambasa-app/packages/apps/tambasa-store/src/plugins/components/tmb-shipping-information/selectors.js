import {getPage} from '@oracle-cx-commerce/commerce-utils/selector'

export const getComponentData = state => {
    const currentPage = getPage(state)
    return { currentPage }
}