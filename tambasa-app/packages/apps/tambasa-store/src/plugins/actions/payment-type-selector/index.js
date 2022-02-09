import {takeEvery} from '@oracle-cx-commerce/store/utils';

export default {
  *saga() {
    yield takeEvery('paymentTypeSelector', function(){});
  }
};
