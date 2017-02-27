import React, {Component} from 'react'
import {handleClassForAsync} from '../../../store/reducers'
import * as action from './action';
import {hasBack} from '../../../components/Head'
import './style.scss'
import {box, list} from './model'
import {List, ListItem} from 'material-ui/List';

class FilmList extends Component {

	static propTypes: {
		getList: React.PropTypes.func.isRequired,
		actList: React.PropTypes.object.isRequired
	}

	componentWillMount() {
		const props = this.props,
			{movieList2, actions} = props;
		if (!movieList2.get('list').size) actions.getList2();
	}

	render() {
		const props = this.props,
			{movieList2} = props,
			{showModel, title} = movieList2.toJSON();
		return (
			<div>
				{hasBack({title})}
				<List onClick={x=>props.router.push('/act/list')} style={{paddingTop: 64}} styleName=''>
					{movieList2.get('list').toJSON().map((e, i) => {
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

export default store => ({
  path: 'list2',
  component: handleClassForAsync(store)(action)(FilmList)
})

