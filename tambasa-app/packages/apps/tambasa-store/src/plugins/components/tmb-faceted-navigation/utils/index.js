import {
  t
} from '@oracle-cx-commerce/utils/generic';

// Get Ns tag from current URL
const getNsFromUrl = url => {
  const ns = new URL(url, 'http://x').searchParams.get('Ns');

  // Because prop "defaultValue" in React shouldn't be null
  return ns === null ? '' : ns;
};

// Gets the link to reset all applied filters
export const getResetLink = (refinementCrumbs, categories, pagingActionTemplate, originalSearch, route) => {
  let resetLink;
  if (originalSearch) {
    // Reset to original search
    resetLink = `${route}?Ntt=${originalSearch.toString()}`;
  } else {
    // If no search term, reset to browsed category
    const categoryCrumb = refinementCrumbs.find(crumb => crumb.dimensionName === 'product.category');
    const browsedCategory = categoryCrumb && categories[categoryCrumb.properties['dimval.prop.category.repositoryId']];

    resetLink = browsedCategory ? browsedCategory.route : route;
  }

  const currentNs = getNsFromUrl(pagingActionTemplate.link).replace('|', '%7C');

  if (currentNs && currentNs.length > 0) {
    resetLink += `${originalSearch ? '&' : '?'}Ns=${currentNs}`;
  }

  return resetLink;
};

// Returns a formatted string representing a price range
export const formatPriceRangeUtil = (formatPrice, data, textBelowPrice, textPriceAndAbove) => {
  const lowerBound = data.properties['dimval.prop.lowerBound'];
  const upperBound = data.properties['dimval.prop.upperBound'];

  if (lowerBound && upperBound && lowerBound > 0) {
    return `${formatPrice(lowerBound)} - ${formatPrice(upperBound)}`;
  }
  if (upperBound) {
    return t(textBelowPrice, {
      UPPERBOUND: formatPrice(upperBound)
    });
  }
  if (lowerBound) {
    return t(textPriceAndAbove, {
      LOWERBOUND: formatPrice(lowerBound)
    });
  }

  return data.label;
};
