/**
 * Created by Administrator on 2/16.
 */
import {handleActions} from 'redux-actions'
import Immutable from 'immutable';

const GLOBAL_ACTION = 'GLOBAL_ACTION'

export const initState = Immutable.fromJS({
  global_state: {}
})

export const reducer_0 = handleActions({[GLOBAL_ACTION]: e => e}, initState);

