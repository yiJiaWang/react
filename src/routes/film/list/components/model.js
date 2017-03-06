/**
 * Created by Administrator on 2/25.
 */

import React, {Component} from 'react'
import './model.scss'
import {List, ListItem} from 'material-ui/List'
import {GridList, GridTile} from 'material-ui/GridList'
import RateStar from '../../../../components/RateStar'

/**
 * 列表视图组件
 */
export class FList extends Component {

  render() {
    const {movieList, goToDetail} = this.props
    return <List style={{paddingTop: 64}} styleName=''>
      {movieList.get('list')
        .map(({images:{medium}, id, title, original_title, rating:{average}}) => <ListItem key={id}>
            <div onClick={goToDetail(id)} styleName="listModel">
              <img role="presentation" src={medium}/>
              <div styleName="info">
                <div styleName="largeTitle">{title}</div>
                <div styleName="smallTitel">{original_title}</div>
								<RateStar rate={average}/><span style={{color: '#f56d4c'}}>{average}</span>
              </div>
            </div>
          </ListItem>
        )}
    </List>
  }
}

/**
 *  平铺视图组件
 */
export class FGrid extends Component {

  render() {
    const {movieList, goToDetail} = this.props,
      _col = document.body.clientWidth > 1000 ? 6 : 3;
    return <GridList cellHeight={"auto"} cols={_col} padding={4} style={{paddingTop: 64, margin: 10}} styleName='gridList'>
      {movieList.get('list')
        .map(({images:{medium}, id, title, rating:{average}}) => <GridTile key={id}>
          <div onClick={goToDetail(id)} styleName="grid">
              <div styleName="gridImgBox">
                <img role="presentation" src={medium}/>
              </div>
              <div styleName="gridInfo">
                <div styleName="gridTitle">{title}</div>
								<div styleName="gridTitle">
									<RateStar rate={average}/><span style={{color: '#f56d4c'}}>{average}</span>
								</div>
              </div>
            </div>
          </GridTile>
        )}
    </GridList>
  }
}

