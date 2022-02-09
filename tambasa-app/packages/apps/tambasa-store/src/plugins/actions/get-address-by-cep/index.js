import { takeLatest } from '@oracle-cx-commerce/store/utils';

/**
 * @author guilherme.vieira
 * @description finds extra details for a given cep
 * @param {*} action 
 * @returns 
 */
async function getAddressByCepSaga(action) {
  const { payload = {} } = action
  const { cep = '' } = payload
  const url = `https://viacep.com.br/ws/${cep}/json/`

  try {
    const fetchResponse = await fetch(url, { method: "GET"})
    const jsonResult = await fetchResponse.json()
    return jsonResult
  } catch(error) {
    return {
      error
    }
  }
}

export default {
  *saga() {
    yield takeLatest('getAddressByCep', getAddressByCepSaga);
  }
};
