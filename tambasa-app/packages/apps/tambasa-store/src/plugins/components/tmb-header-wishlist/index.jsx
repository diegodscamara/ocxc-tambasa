import React, { useContext, useState, useEffect } from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Link from '@oracle-cx-commerce/react-components/link'
import { PAGE_PROFILE_LINK } from '@oracle-cx-commerce/commerce-utils/constants'
import { AiOutlineHeart } from 'react-icons/ai'
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts'
import { useSelector } from '@oracle-cx-commerce/react-components/provider';
import { shopperSelector } from '../../selectors'

import css from './styles.css';

const TmbHeaderWishlist = () => {
  const { action } = useContext(StoreContext)
  const [ purchaseListQty, setPurchaseListQty ] = useState(0)

  const getItemCountForLists = async (result) => {
    const { items = [] } = result
    const responseLists = []

    for(const item of items) {
      const getListResponse = await action('getPurchaseList', { purchaseListId: item.id })
      responseLists.push(getListResponse)
    }
    
    responseLists.forEach(response => {
      if(response.ok && response.status === 200) {
        const { purchaseLists } = response.delta.purchaseListRepository

        let total = 0

        for(const list in purchaseLists) {
          const values = Object.values(purchaseLists[list].purchaseListItems)

          if(values && values.length > 0) {
            const listItemsSum = values.reduce((previous, current) => (previous.quantityDesired || previous) + current.quantityDesired)
            total += typeof listItemsSum === "object" 
              ? listItemsSum.quantityDesired 
              : listItemsSum
          }
        }
  
        setPurchaseListQty((currentQty)  => currentQty + total)
      }
    })

  }

  const getLists = async() => {
    const response = await action('listPurchaseLists', {})
    if(response.ok && response.status === 200 && response.json)
      getItemCountForLists(response.json)
    else {
      console.error('Error getting lists', response);
    }
  }

  const { isUserLoggedIn } = useSelector(shopperSelector)

  useEffect(() => {
    if(isUserLoggedIn)
      getLists()
    else
      setPurchaseListQty(0)
  }, [ isUserLoggedIn ])


  return (
    <Styled id="TmbHeaderWishlist" css={ css }>
      <Link route={ PAGE_PROFILE_LINK + "?purchase-lists" }>
        <div className="TmbHeaderWishlist">
          <AiOutlineHeart className="TmbHeaderWishlist__Icon"/>
          <span className="TmbHeaderWishlist__ListQty">
            { purchaseListQty > 99 ? '99+' : purchaseListQty }
          </span>
        </div>
      </Link>
    </Styled>
  );
};

export default TmbHeaderWishlist
