/**
 * Created by Administrator on 2/25.
 */

import React, {Component} from 'react'
import './model.scss'
import {List, ListItem} from 'material-ui/List'
import {GridList, GridTile} from 'material-ui/GridList'

const box = ({i, images:{medium}, id, title}) => (
  <main>
    <div styleName="grid">
      <div styleName="gridImgBox">
        <img role="presentation" src={medium}/>
      </div>
      <div styleName="info">
        <div styleName="largeTitle">{title}</div>
      </div>
    </div>
  </main>
)

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
      {movieList.get('list').toJSON()
        .map((e, i) => <ListItem key={e.id}>
            {list({i, ...e})}
          </ListItem>
        )}
    </List>
  }
}

export class FGrid extends Component {

  render() {
    const {movieList} = this.props
    return <GridList cols={3} padding={20} style={{paddingTop: 64, margin: 12}} styleName=''>
      {movieList.get('list').toJSON()
        .map((e, i) => <GridTile key={e.id}>
            {box({i, ...e})}
          </GridTile>
        )}
    </GridList>
  }
}

