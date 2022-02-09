import { getBodyAsJson } from '@oracle-cx-commerce/endpoints/factory';
import { populateError } from '@oracle-cx-commerce/endpoints/utils';

/** This endpoint uses a public API for requesting contents from the url */
/**
 * Convert response data into an object to be merged into the application state.
 */
const processOutput = json => ({
  externalPricingRepository: {
    externalPricingQuery: {
      externalPricing: json
    }
  }
});

/**
 * Return an object that implements the endpoint adapter interface.
 */
const setExternalPricing = {
  /**
   * Return a Fetch API Request object to be used for invoking the endpoint.
   *
   * @param payload Optional payload to be included in the request
   * @param state The current application state
   * @return Request object for invoking the endpoint via Fetch API
   */
  async getRequest(payload, state) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    const url = document.location.origin + '/ccstorex/custom/v1/nsh_external_pricing/calculateprice';

    return new Request(url, { method: 'POST', body: payload, headers: myHeaders });
  },

  /**
   * Return a Fetch API Response object containing data from the endpoint.
   *
   * @param response The Response object returned by the fetch call
   * @param state The current application state
   * @param payload Optional payload that was included in the request
   * @return Response object, augmented with an async getJson function to return
   * an object to be merged into the application state
   */
  getResponse(response) {
    let json;
    response.getJson = async () => {
      if (json === undefined) {
        json = await getBodyAsJson(response);

        return response.ok ? processOutput(json) : populateError(response, json);
      }

      return json;
    };

    return response;
  }
};

export default setExternalPricing;
