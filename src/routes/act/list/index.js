import React, {Component} from 'react'
import {injectReducer} from '../../../store/reducers'
import {reducer, handleC} from './action';
import AppBar from 'material-ui/AppBar';
import * as api from '../api'

class List extends Component {

    propTypes: {
        getList: React.PropTypes.func.isRequired,
        actList: React.PropTypes.object
    }

    componentWillMount() {
        const props = this.props;
        props.getList();
    }

    render() {
        const props = this.props;
        const {actList} = props
        return (
            <div>
                {/*<div onClick={props.increment}>{props.actList.get('num')}</div>*/}

                <AppBar
                    title="Title"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                {actList.get('theaterList').toJSON().map(e => {
                    return (
                        <li key={e.id}>{e.title}</li>
                    )
                })}
            </div>
        )
    }
}

export default store => {
    injectReducer(store, {key: 'actList', reducer})
    return handleC(List)
}
