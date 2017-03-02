/**
 * Created by Administrator on 2/25.
 */

import React, {Component} from 'react'
import './model.scss'
import {List, ListItem} from 'material-ui/List'
import {GridList, GridTile} from 'material-ui/GridList'

/**
 * 列表视图组件
 */
export class FList extends Component {

  render() {
    const {movieList, goToDetail} = this.props
    return <List style={{paddingTop: 64}} styleName=''>
      {movieList.get('list')
        .map(({images:{medium}, id, title, original_title}) => <ListItem key={id}>
            <div onTouchTap={goToDetail(id)} styleName="listModel">
              <img role="presentation" src={medium}/>
              <div styleName="info">
                <div styleName="largeTitle">{title}</div>
                <div styleName="smallTitel">{original_title}</div>
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
    return <GridList cols={_col} padding={4} style={{paddingTop: 64, margin: 10}} styleName='gridList'>
      {movieList.get('list')
        .map(({images:{medium}, id, title}) => <GridTile key={id}>
          <div onTouchTap={goToDetail(id)} styleName="grid">
              <div styleName="gridImgBox">
                <img role="presentation" src={medium}/>
              </div>
              <div styleName="gridInfo">
                <div styleName="gridTitle">{title}</div>
              </div>
            </div>
          </GridTile>
        )}
    </GridList>
  }
}

