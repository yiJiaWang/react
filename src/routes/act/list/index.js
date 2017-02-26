import React, {Component} from 'react'
import {injectReducer} from '../../../store/reducers'
import {reducer, handleC} from './action';
import {hasBack} from '../../../components/Head'
import style from './style.scss'
import {box, list} from './model'
import {List, ListItem} from 'material-ui/List';

class FilmList extends Component {

	propTypes: {
		getList: React.PropTypes.func.isRequired,
		actList: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.state = {showModel: 'list'};
		this._handleShowModel = this._handleShowModel.bind(this)
	}

	componentWillMount() {
		const props = this.props;
		props.getList();
	}

	_handleShowModel(){
		const _self = this;
		_self.setState({showModel: '123'})
	}

	render() {
		const props = this.props;
		const {actList} = props,
			{showModel} = this.state
		return (
			<div>
				{hasBack({title: '电影列表'})}
				<List style={{paddingTop: 64}} className={showModel==='list'?style.mainBoxRed:''} onClick={this._handleShowModel}>
					{actList.get('theaterList').toJSON().map((e,i) => {
						return (
							<ListItem key={e.id}>
								{list({i, ...e})}
							</ListItem>
						)
					})}
				</List>
			</div>
		)
	}
}

export default store => {
	injectReducer(store, {key: 'actList', reducer})
	return handleC(FilmList)
}
