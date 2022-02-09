import { endpointSaga, takeEvery } from '@oracle-cx-commerce/store/utils';

function* setExternalPricingSaga(action) {
  if (action.payload && action.payload.length > 0) {
    const sseResponse = yield endpointSaga({ action, payload: action.payload, endpointId: 'setExternalPricing' });

    if (sseResponse.status == 200) {
      const cart = sseResponse.delta.externalPricingRepository.externalPricingQuery.externalPricing;
      const newCart = { "items": [] };
      cart.items.forEach(item => { newCart.items.push({ "commerceItemId": item.id, "id": item.id, "externalPriceQuantity": item.externalQuantity, "externalPrice": item.externalPrice }); });

      const updateItemsResponse = yield endpointSaga({ action, payload: newCart, endpointId: 'updateCartItems' });

      if (updateItemsResponse.status == 200) {

        const tam_codcndven = /\d+/g.exec(cart.id)[0] || ""
        const tam_codcndpgt = /[a-z]+/gi.exec(cart.id)[0] || ""
        const tam_prazo = cart.prazo || ""

        const newDynProps = {
          op: 'update', 
          tam_externalPricingID: cart.id,
          tam_codcndven,
          tam_codcndpgt,
          tam_prazo
        }

        const updateCartDynProps = yield endpointSaga({ action, payload: newDynProps, endpointId: 'updateCart' });

        if (updateCartDynProps.status == 200) {
          return updateCartDynProps;
        }
      }
    }

    console.error("setExternalPricingSaga: error, ", cart);
    return null;
  }
}

export default {
  *saga() {
    //Caso necessario, é possivel alterar de takeEvery pra takeLess ou TakeFirst, caso o usuário clique varias vezes no botão, você decide como interpretar aqui
    yield takeEvery('setExternalPricing', setExternalPricingSaga);
  }
};
