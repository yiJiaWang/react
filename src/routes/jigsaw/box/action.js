/**
 * Created by Administrator on 3/1.
 */
import {createActions, handleActions} from 'redux-actions'
import Immutable from 'immutable';
import _ from 'lodash'
import {_move, getAnswer} from './path'

export const name = 'jigsaw'

const _keyToDir = {
  37: 'left',
  39: 'right',
  38: 'up',
  40: 'down'
}

const _moveByKey = key => _move[_keyToDir[key]]

const _state_ = {
  answer: [],
  doneAns: [],
}
const _initData = x => {
  let n = 999,
    xy = [2, 2],
    data = [[1, 2, 3], [4, 5, 6], [7, 8, '']],
    _state = Immutable.fromJS({
      data, xy, msg: '', ..._state_
    })
  while (n-- > 0) {
    _state = _moveByKey(_.random(37, 40))(_state)
  }
  return _state
}

const initState = _initData()

export const CHANGE_OPTION = 'CHANGE_OPTION';
export const MOVE = 'MOVE';
export const GET_ANSWER = 'GET_ANSWER'
export const NEXT = 'NEXT'
export const BACK = 'BACK'


export const actions = createActions({},
  CHANGE_OPTION, MOVE, GET_ANSWER, NEXT, BACK
)

export const reducer = handleActions({
  [CHANGE_OPTION]: (s, {payload:{key = '-1', value}}) => s.mergeIn([key], value),
  [MOVE]: (s, {payload}) => _moveByKey(payload) ? _move[_keyToDir[payload]](s) : s,
  [GET_ANSWER]: (s, {payload}) => s.mergeIn(['answer'], getAnswer(s)),
  [NEXT]: (s, a) => {
    const oper = s.getIn(['answer', 0])
    if (_move[oper]) {
      return _move[oper](s).updateIn(['doneAns'], e => e.push(oper)).updateIn(['answer'], e => e.shift())
    } else {
      console.log('操作不合法')
      return s
    }
  },
  [BACK]: (s, a) => {
    const _re = {
        'up': 'down',
      'down': 'up',
      'right': 'left',
      'left': 'right'
      },
      oper = s.getIn(['doneAns', -1]);
    if (_move[_re[oper]]) {
      return _move[_re[oper]](s).updateIn(['answer'], e => e.unshift(oper)).updateIn(['doneAns'], e => e.pop())
    } else {
      console.log('操作不合法')
      return s
    }
  }
}, initState);






