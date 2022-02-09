import {
  getCurrentOrganizationId,
  getEndpoints,
  getGlobalContext,
  getSessionContext
} from '@oracle-cx-commerce/commerce-utils/selector';

import {
  createEndpointFactory
} from '@oracle-cx-commerce/endpoints/utils/endpoint-factory';

export {
  getBodyAsJson
}
from '@oracle-cx-commerce/endpoints/utils';

const capitalize = s => s[0].toUpperCase() + s.slice(1);

export const createEndpoint = createEndpointFactory({
  apiCatalogPaths: ['/ccstore/v1/registry', '/ccstore/v1/xregistry'],

  async getApiCatalog({
    fetchApiCatalog,
    state,
    endpointId
  }) {
    let catalog = getEndpoints(state);

    if (!catalog[endpointId]) {
      const responsesJson = await fetchApiCatalog();

      catalog = {
        ...responsesJson.reduce((result, json) => Object.assign(result, json.endpointMap), {}),
        ...getEndpoints(state)
      };
    }

    return catalog;
  },

  getOrigin({
    state
  }) {
    return state.global ? getGlobalContext(state).appServerURL : self.location.origin;
  },

  getHeaders({
    state,
    location
  }) {
    const {
      isPreview,
      previewToken,
      previewTokenType = 'Bearer',
      locale,
      site,
      priceListGroup,
      visitorId,
      visitId,
      earlyVisitInitialized,
      baseUrl
    } = getGlobalContext(state);

    const {
      OCStateData,
      token,
      tokenType = 'Bearer'
    } = getSessionContext(state);
    const currentOrganization = getCurrentOrganizationId(state);

    // The forwarded url header is used to determine the site on OCC. Here we adjust the pathname
    // to remove the baseURL that the application server may be using as a routing path (e.g. /occ-live) so
    // site resolution works properly.
    // For example, /occ-live/site1/home becomes /site1/home.
    const pathname =
      baseUrl && baseUrl.length > 0 ? location.pathname.replace(new RegExp(`^${baseUrl}`), '') : location.pathname;
    const headers = {
      'X-CCProfileType': 'storefrontUI',
      'X-CC-MeteringMode': 'CC-NonMetered',
      'X-CC-Frontend-Forwarded-Url': location.host + pathname + location.search
    };

    // If the user has an access token then send it.
    if (token != null) {
      headers.Authorization = `${capitalize(tokenType)} ${token}`;
    } else if (isPreview && previewToken != null) {
      // Otherwise if user has a preview access token then send that.
      headers.Authorization = `${capitalize(previewTokenType)} ${previewToken}`;
    }

    if (currentOrganization) {
      headers['X-CCOrganization'] = currentOrganization;
    }

    if (site) {
      headers['X-CCSite'] = site;
    }

    if (priceListGroup) {
      headers['X-CCPriceListGroup'] = priceListGroup !== 'defaultPriceGroup' ?
        priceListGroup :
        'grupoPrecoReal';
    }

    if (OCStateData) {
      headers['X-OCStateData'] = OCStateData;
    }

    if (locale) {
      headers['X-CCAsset-Language'] = locale;
    }

    if (visitorId) {
      headers['X-CCVisitorId'] = visitorId;
    }

    if (visitId) {
      headers['X-CCVisitId'] = visitId;
    }

    // SSR first request and missing visit/visitor ids
    if (!earlyVisitInitialized && (!visitId || !visitorId)) {
      headers['X-CCFirstSessionRequest'] = 'true';
    }

    return headers;
  }
});
