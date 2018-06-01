import { put } from 'redux-saga/effects'
import axios from '../../axios'
import { readAllData, writeData, clearAllData } from '../../services/utility'
import { addedToSyncQueueNotification } from '../../services/notificationsMgmt'

import * as actionCreators from '../actions'

export function * storeDataSaga (action) {
  const number = {
    num: action.value * (Math.floor(Math.random() * 50) + 1),
    id: new Date().toISOString()
  }
  try {
    const url = process.env.STORE_DATA
    yield axios.post(url, number)
    yield put(actionCreators.addNumber(number.num))
  } catch (error) {
    yield addedToSyncQueueNotification()
    yield put(actionCreators.addNumberError(error))
  }
}

export function * initializeStateSaga (action) {
  try {
    const res = yield axios.get('/nums.json')
    const nums = Object.keys(res.data).map(key => res.data[key].num)
    if ('indexedDB' in window) {
      clearAllData('numbers')
      for (let num in res.data) {
        writeData('numbers', res.data[num])
      }
    }
    yield put(actionCreators.setInitialState(nums))
  } catch (err) {
    if ('indexedDB' in window) {
      const nums = yield readAllData('numbers').then(function (data) {
        const nums = Object.keys(data).map(key => data[key].num)
        console.log('From cache idb: ', nums)
        return nums
      })
      if (nums) {
        yield put(
          actionCreators.setInitialStateError(
            nums,
            'Showing cached data from idb'
          )
        )
      }
    } else {
      yield put(actionCreators.setInitialStateError(err))
    }
  }
}
