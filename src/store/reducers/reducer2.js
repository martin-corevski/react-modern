import * as actionTypes from '../actions/actionTypes'
// By using utility.js we make our switch cases leaner
import { updateObject } from '../utility'

const initialState = {
  numbers: [],
  error: ''
}

// In order to have even leaner switch cases we can create functions that take
// care of the state update
const addNumber = (state, action) => {
  let nums = state.numbers.slice()
  nums.push(action.num)
  return updateObject(state, { numbers: nums, error: '' })
}

const addNumberError = (state, action) => {
  return updateObject(state, { error: action.error })
}

const setInitialState = (state, action) => {
  return updateObject(state, {
    numbers: action.nums
  })
}

const setInitialStateError = (state, action) => {
  return updateObject(state, {
    numbers: action.nums,
    error: action.error
  })
}

const reducer2 = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INITIAL_STATE:
      return setInitialState(state, action)
    case actionTypes.SET_INITIAL_STATE_ERROR:
      return setInitialStateError(state, action)
    case actionTypes.ADD_NUMBER:
      return addNumber(state, action)
    case actionTypes.ADD_NUMBER_ERROR:
      return addNumberError(state, action)
    default:
      return state
  }
}

export default reducer2
