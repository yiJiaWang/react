import { applyMiddleware, compose, createStore } from 'redux'
import rx_promise from 'redux-promise'
import createLogger from 'redux-logger'
import makeRootReducer from './reducers'
import {initState} from './globalAction'
// import Immutable from 'immutable';
// import thunk from 'redux-thunk'
// import { browserHistory } from 'react-router'
// import { updateLocation } from './location'

export const _createStore = (initialState = initState) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [rx_promise]

	if (0 && window.IS_PRO !== 1) {
		// 输出日志
		const logger = createLogger({
			stateTransformer: store => store.toJSON(),
		})
		middleware[middleware.length] = logger;
	}

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
