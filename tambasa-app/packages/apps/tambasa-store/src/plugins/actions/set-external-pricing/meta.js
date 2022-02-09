/**
 * Metadata for the setExternalPricing action.
 */
export const setExternalPricing = {
  name: 'setExternalPricing',
  // Action's description
  description: 'Description for setExternalPricing',
  author: 'nsh',
  // This action uses a Saga to invoke an endpoint.
  endpoints: ['setExternalPricing'],
  // The path to Json schema representing the request Json structure and the example of payload.
  input: '@tambasa-store/tambasa-store/src/plugins/actions/set-external-pricing/schema/input.json',
  packageId: '@tambasa-store/tambasa-store'
};
