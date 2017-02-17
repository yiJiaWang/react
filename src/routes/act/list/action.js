/**
 * Created by Administrator on 2/16.
 */
import { connect } from 'react-redux'
import { createActions, handleActions } from 'redux-actions'
import Immutable from 'immutable';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const initState = Immutable.fromJS({
    num: 0
})



const actions = createActions({
        [INCREMENT]: (num = 1) => (num)
},
    DECREMENT
)

export const reducer = handleActions({
    INCREMENT: (state, action) => state,

    DECREMENT: (state, action) => ({
        num: state.num - action.payload
    })
}, initState);

const mapStateToProps = state =>
    ({actList: state.get('actList')})

export const handleC = c => connect(mapStateToProps, actions)(c)
