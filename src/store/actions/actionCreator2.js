import * as actionTypes from './actionTypes'

// In order to make the actions leaner, we can extract some code in separate
// functions
export const addNumber = value => {
  return {
    type: actionTypes.ADD_NUMBER,
    num: value
  }
}

export const addNumberError = error => {
  return {
    type: actionTypes.ADD_NUMBER_ERROR,
    error
  }
}

export const storeData = value => {
  return {
    type: actionTypes.STORE_DATA,
    value
  }
}

export const setInitialState = value => {
  return {
    type: actionTypes.SET_INITIAL_STATE,
    nums: value
  }
}

export const setInitialStateError = (nums, error) => {
  return {
    type: actionTypes.SET_INITIAL_STATE_ERROR,
    nums,
    error
  }
}

export const initializeState = () => {
  return {
    type: actionTypes.INITIALIZE_STATE
  }
}
