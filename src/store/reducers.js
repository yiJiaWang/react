// import { combineReducers } from 'redux'
import {combineReducers } from 'redux-immutable'
import {reducer_0} from './globalAction'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
  	reducer_0,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
