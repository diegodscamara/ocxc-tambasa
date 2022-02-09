import React, {useContext} from 'react'
import Link from '@oracle-cx-commerce/react-components/link';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from '../styles.css'
import {t} from '@oracle-cx-commerce/utils/generic';
import {getDataForBreadcrumbs} from '../selectors'
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts'
import {useSearchResultsFetcher} from '@oracle-cx-commerce/fetchers/search/hooks';

const Breadcrumbs = props => {

    const {
        categories, 
        breadcrumbSeparator,
        correctedToAltText,
        textHome,
        pageIdentificationText
    } = props;

    const {searchResults, contextId, pageId, pageType, searchServicePath} = props;

    const {
        breadcrumbs, results: {totalNumRecs = 0} = {}
    } = searchResults

    // Fetch the latest search results during client-side rendering.
    const store = useContext(StoreContext);
    useSearchResultsFetcher(store, {contextId, pageId, pageType, searchServicePath});

    const divider = <span> {t(breadcrumbSeparator)} </span>;

    if (breadcrumbs && breadcrumbs.searchCrumbs && breadcrumbs.searchCrumbs.length > 0) {
        // Don't show breadcrumbs if no search results
        if (totalNumRecs === 0) {
          return <Styled id="DynamicBreadcrumbs" css={css} />;
        }
    
        return (
          <Styled id="DynamicBreadcrumbs" css={css}>
            <div className="DynamicBreadcrumbs">
              <Link className="DynamicBreadcrumbs__BreadcrumbLink" href=".">
                {t(textHome)}
              </Link>
              {divider}
              {breadcrumbs.searchCrumbs.map(crumbData => (
                <span
                  key={crumbData.correctedTerms || crumbData.terms}
                  aria-label={
                    crumbData.correctedTerms && `${crumbData.terms} ${t(correctedToAltText)} ${crumbData.correctedTerms}`
                  }
                >
                  <span
                    className={
                      crumbData.correctedTerms
                        ? 'DynamicBreadcrumbs__CorrectedLabel'
                        : 'DynamicBreadcrumbs__BreadcrumbLabel'
                    }
                  >
                    &quot;{crumbData.terms}&quot;
                  </span>
                  {crumbData.correctedTerms && <span>&quot;{crumbData.correctedTerms}&quot;</span>}
                </span>
              ))}
            </div>
          </Styled>
        );
    }
    
    // If on a category page render category breadcrumbs
    const categoryCrumb =
    breadcrumbs &&
    breadcrumbs.refinementCrumbs &&
    breadcrumbs.refinementCrumbs.find(crumb => crumb.dimensionName === 'product.category');
    
    if (categoryCrumb && categories) {
        return (
          <Styled id="DynamicBreadcrumbs" css={css}>
            <div className="DynamicBreadcrumbs">
              <span>{t(pageIdentificationText)}</span>
              <Link className="DynamicBreadcrumbs__BreadcrumbLink" href=".">
                {t(textHome)}
              </Link>
              {categoryCrumb.ancestors.map(ancestor => (
                <span key={ancestor.label}>
                  {divider}
                  <Link
                    className="DynamicBreadcrumbs__BreadcrumbLink"
                    href={categories[ancestor.properties['dimval.prop.category.repositoryId']].route}
                  >
                    {ancestor.label}
                  </Link>
                </span>
              ))}
              {divider}
              <span className="DynamicBreadcrumbs__BreadcrumbLabel">{categoryCrumb.label}</span>
            </div>
          </Styled>
        );
    }
    
    return <Styled id="DynamicBreadcrumbs" css={css} />;
}

export default connect(getDataForBreadcrumbs)(Breadcrumbs)