import { takeEvery } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'
import { storeDataSaga, initializeStateSaga } from './actionCreator2Saga'

export function * watchActionCreator2 () {
  yield takeEvery(actionTypes.STORE_DATA, storeDataSaga)
  yield takeEvery(actionTypes.INITIALIZE_STATE, initializeStateSaga)
}
