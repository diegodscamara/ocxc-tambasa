import React, { useState, useEffect, useContext } from 'react'
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts'
import { getProduct } from '@oracle-cx-commerce/commerce-utils/selector';
import {useComponentData} from '@oracle-cx-commerce/react-widgets/product/product-details-container/selectors';


const TmbProductEAN = props => {
    const { productId } = props
    const [ EAN, setEAN ] = useState("---")
    const { getState } = useContext(StoreContext)
    const { isProductFound, product } = useComponentData()
    
    useEffect(() => {
        const productSelector = getProduct(getState(), { productId })
        if(productSelector && productSelector.tam_ean && productSelector.tam_ean !== "")
            setEAN(productSelector.tam_ean)
    }, [ isProductFound, product ])

    return (
        <div className="ProductEAN">
            <div className="TmbProductId">
            <span className="TmbProductId__Label">EAN: </span>
            <span>{EAN}</span>
            </div>
        </div>
    )
}

export default TmbProductEAN