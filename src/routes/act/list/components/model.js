/**
 * Created by Administrator on 2/25.
 */

import React, {Component} from 'react'
import './model.scss'
import {List, ListItem} from 'material-ui/List'
import {GridList, GridTile} from 'material-ui/GridList'

const list = ({i, images:{medium}, id, title, original_title}) => (
	<div>
		<main>
			<div styleName="listModel">
				<img role="presentation" src={medium}/>
				<div styleName="info">
					<div styleName="largeTitle">{title}</div>
					<div styleName="smallTitel">{original_title}</div>
				</div>
			</div>
		</main>
	</div>
)

export class FList extends Component {

	render() {
		const {movieList} = this.props
		return <List style={{paddingTop: 64}} styleName=''>
			{movieList.get('list')
				.map((e, i) => <ListItem key={e.id}>
						{list({i, ...e})}
					</ListItem>
				)}
		</List>
	}
}

const box = ({i, images:{medium}, id, title}) => (
	<div styleName="grid" >
		<div styleName="gridImgBox">
			<img role="presentation" src={medium}/>
		</div>
		<div styleName="gridInfo">
			<div styleName="gridTitle">{title}</div>
		</div>
	</div>
)

export class FGrid extends Component {

	render() {
		const {movieList} = this.props,
			_col = document.body.clientWidth > 1000 ? 6 : 3;
		return <GridList cols={_col} padding={4} style={{paddingTop: 64, margin: 10}} styleName='gridList'>
			{movieList.get('list')
				.map((e, i) => <GridTile key={e.id}>
						{box({i, ...e})}
					</GridTile>
				)}
		</GridList>
	}
}

