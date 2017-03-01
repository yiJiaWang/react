/**
 * Created by Administrator on 3/1.
 */
import React, {Component} from 'react'
import {handleClassForAsync} from '../../../store/reducers'
import './style.scss'
// import * as action from './action';
import {name, reducer, actions} from './action';
import Head from '../../../components/Head'
import Paper from 'material-ui/Paper'

class FilmDetail extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const {detail, actions, params} = this.props
		detail.getIn(['data', 'id']) !== params.id && actions.getData(params.id)
	}


	render() {
		const props = this.props,
			{detail} = props;
		const {data} = detail.toJSON()

		return <div>
			<Head title={data.title || ''}/>
			{(!data.images) ? <div></div>
				: <div styleName="detail">
					<main styleName="mainTop">
						<div styleName="img">
							<img src={data.images.medium} alt=""/>
						</div>
						<div styleName="info">
							<div><span>{data.rating.average}分</span><span>({data.ratings_count}人评分)</span></div>
							<div>{data.year}</div>
							<div>{data.genres.join('/')}</div>
							<div>{data.countries[0]}</div>
						</div>
					</main>
					<Paper styleName="intro">{data.summary}</Paper>
				</div>
			}

		</div>
	}

}

export default store => ({
	path: 'detail/:id',
	component: handleClassForAsync(store)({name, reducer, actions})(FilmDetail)
})



