import React from 'react'
import Link from '@oracle-cx-commerce/react-components/link'
import {getCategory} from '@oracle-cx-commerce/commerce-utils/selector'

const onEscapeKeyDown = event => {
  if (event.key === 'Escape') {
    event.target.blur();
  }
};

const onCategoryLinkClick = event => {
  if (event.target.tagName && event.target.tagName.toLocaleLowerCase() === 'a') {
    event.target.blur();
  }
};

const showCategories = () => {
  const el = document.querySelector('.CollectionNavigationDesktop__NavBar')
  if(el) el.style.display = 'flex'

  const overlay = document.querySelector('.CollectionNavigationDesktop__Backdrop')
  if(overlay) {
    overlay.style.visibility = 'visible'
    overlay.style.opacity = 1
  }

  const body = document.querySelector('body')
  if(body) body.style.overflowY = 'hidden'
}

const hideCategories = () => {
  const el = document.querySelector('.CollectionNavigationDesktop__NavBar')
  if(el) el.style.display = 'none'
  
  const overlay = document.querySelector('.CollectionNavigationDesktop__Backdrop')
  if(overlay) {
    overlay.style.visibility = 'hidden'
    overlay.style.opacity = 0
  }

  const body = document.querySelector('body')
  if(body) body.style.overflowY = 'auto'
}

const renderMainCategories = (state, selectedCategories) => {
  if(typeof selectedCategories != 'string')
    return console.error('No collections provided')

  const categories = []
  const categoriesIds = selectedCategories.split(',')
  const categoriesListSize = categoriesIds.length > 5 
    ? 5 
    : categoriesIds.length

  for(let index = 0; index < categoriesListSize; index++) {
    const category = getCategory(state, { categoryId: categoriesIds[index] })
    if(Object.keys(category).length > 0) // I'm preventing here a not found category, not happening anyway, but it's better
      categories.push(category)
  } /* only first five categories */

  return categories.map(category => (
    <li key={ category.id } className="TmbCollectionNavigationDesktop_OtherCategories__Item">
      <Link route={ category.route }>
        { category.displayName }
      </Link>
      <span className="TmbCollectionNavigationDesktop_OtherCategories__Item___Slider"></span>
    </li>
  ))
}

export {
  renderMainCategories,
  onEscapeKeyDown,
  onCategoryLinkClick,
  showCategories,
  hideCategories
}