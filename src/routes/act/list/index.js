import React, {Component} from 'react'
import {injectReducer} from '../../../store/reducers'
import {reducerObj, handleC} from './action';
import {hasBack} from '../../../components/Head'
import style from './style.scss'
import {box, list} from './model'
import {List, ListItem} from 'material-ui/List';

class FilmList extends Component {

	static propTypes: {
		getList: React.PropTypes.func.isRequired,
		actList: React.PropTypes.object.isRequired
	}

	componentWillMount() {
		const props = this.props,
			{movieList} = props;
		if (!movieList.get('list').size) props.getList();
	}

	render() {
		const props = this.props,
			{movieList} = props,
			{showModel, title} = movieList.toJSON();
		return (
			<div>
				{hasBack({title})}
				<List style={{paddingTop: 64}} className={showModel === 'list' ? style.mainBoxRed : ''}>
					{movieList.get('list').toJSON().map((e, i) => {
						return (
							<ListItem key={e.id}>
								{showModel === 'list' ? list({i, ...e}) : box({i, ...e})}
							</ListItem>
						)
					})}
				</List>
			</div>
		)
	}
}

export default store => {
	injectReducer(store, reducerObj)
	return handleC(FilmList)
}
