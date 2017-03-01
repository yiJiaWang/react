// import { combineReducers } from 'redux'
import {combineReducers} from 'redux-immutable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {reducer_0} from './globalAction'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    global_state: reducer_0,
    ...asyncReducers
  })
}

export const injectReducer = (store, {key, reducer}) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export const handleClassForAsync = (store) => ({name, actions, reducer, actionName = 'actions'}) => clazz => {
  injectReducer(store, {key: name, reducer});
  return connect(state => ({[name]: state.get(name), 'global_state': state.get('global_state')}), dispatch => ({[actionName]: bindActionCreators(actions, dispatch)}))(clazz);
}

export default makeRootReducer
