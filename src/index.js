import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import registerServiceWorker from './registerServiceWorker'
// Material-UI fonts
import 'typeface-roboto'
// Google analytics
import ReactGA from 'react-ga'

import './index.scss'
import App from './containers/App'
import reducer1 from './store/reducers/reducer1'
import reducer2 from './store/reducers/reducer2'
import { watchActionCreator2 } from './store/sagas/index'

// Combining multiple reducers
const rootReducer = combineReducers({
  r1: reducer1,
  r2d2: reducer2
})

// Custom middleware for logging the dispatched actions and current state
const logger = store => {
  return next => {
    return action => {
      console.log('[Middleware] Dispatching ', action)
      const result = next(action)
      console.log('[Middleware] Next state ', store.getState())
      return result
    }
  }
}

const sagaMiddleware = createSagaMiddleware()

// For Chrome Dev tools, https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : null || compose

// For single reducer store
// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// Multiple reducers store and as a second argument we can pass the so called
// enhancer (the middleware or multiple middlewares)
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, sagaMiddleware))
)

sagaMiddleware.run(watchActionCreator2)

// GA setup
ReactGA.initialize(process.env.GA_KEY)
ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker() // Runs register() as default function
