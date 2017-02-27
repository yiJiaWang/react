// import { combineReducers } from 'redux'
import {combineReducers} from 'redux-immutable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {reducer_0} from './globalAction'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    reducer_0,
    ...asyncReducers
  })
}

export const injectReducer = (store, {key, reducer}) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export const handleClassForAsync = (store) => ({name, actions, reducer, actionName = 'actions'}) => clazz => {
  injectReducer(store, {key: name, reducer});
  return connect(state => ({[name]: state.get(name)}), dispatch => ({[actionName]: bindActionCreators(actions, dispatch)}))(clazz);
}

export default makeRootReducer
