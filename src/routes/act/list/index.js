import React, {Component} from 'react'
import {injectReducer} from '../../../store/reducers'
import {reducer,handleC} from './action';

class List extends Component {

	componentWillMount() {
		fetch('/v2/movie/in_theaters')
			.then(res => res.json()
			.then(res => console.log(res.title)));
	}

    render() {
        const props = this.props;
        return (
            <div onClick={props.increment}>{props.actList.get('num')}</div>
        )
    }
}

export default store => {
    injectReducer(store, {key: 'actList', reducer})
    return handleC(List)
}
