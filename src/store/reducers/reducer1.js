import * as actionTypes from '../actions/actionTypes'
// By using utility.js we make our switch cases leaner
import { updateObject } from '../utility'

const initialState = {
  string: 'Working reducer 1 '
}

const reducer1 = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTION_1:
      return updateObject(state, {string: state.string + '& action creator 1'})
    default:
      return state
  }
}

export default reducer1
