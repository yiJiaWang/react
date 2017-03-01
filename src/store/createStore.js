import { applyMiddleware, compose, createStore } from 'redux'
import rx_promise from 'redux-promise'
import makeRootReducer from './reducers'
import Immutable from 'immutable';
// import thunk from 'redux-thunk'
// import { browserHistory } from 'react-router'
// import { updateLocation } from './location'
import {initState} from './globalAction'

export const _createStore = (initialState = initState) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [rx_promise]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  // store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}

export const store = _createStore()
