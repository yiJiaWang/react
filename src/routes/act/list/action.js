/**
 * Created by Administrator on 2/16.
 */
import {connect} from 'react-redux'
import {createActions, handleActions} from 'redux-actions'
import Immutable from 'immutable';
import * as api from '../api'

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const GET_LIST = 'GET_LIST';

const initState = Immutable.fromJS({
    num: 0,
    theaterList: [],
})


const actions = createActions({
        [INCREMENT]: (num = 1) => (num),
        [GET_LIST]: async(city = '武汉') => {
            const data = await api.in_theaters(
                {method:'get', body: JSON.stringify({city})}
                )
            return data.subjects
        }
    },
    DECREMENT
)

export const reducer = handleActions({
    INCREMENT: (state, action) => state,

    DECREMENT: (state, action) => ({
        num: state.num - action.payload
    }),

    [GET_LIST]: (s, a) => s.mergeIn(['theaterList'], a.payload)

}, initState);

const mapStateToProps = state =>
    ({actList: state.get('actList')})

export const handleC = c => connect(mapStateToProps, actions)(c)
