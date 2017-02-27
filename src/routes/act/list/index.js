import React, {Component} from 'react'
import {handleClassForAsync} from '../../../store/reducers'
import './style.scss'
import * as action from './action';
import {api_const} from './action';
import {hasBack} from '../../../components/Head'
import HeadRight from './HeadRight'
import {box, list} from './model'
import {List, ListItem} from 'material-ui/List';
import _ from 'lodash'

class FilmList extends Component {

  static propTypes: {
    getList: React.PropTypes.func.isRequired,
    actList: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const props = this.props,
      {movieList, actions} = props;
    if (!movieList.get('list').size) actions.getList();
  }

  render() {
    const props = this.props,
      {movieList, actions} = props,
      {showModel, title} = movieList.toJSON()

		const menuList = _.map(api_const, e => ({text: e.title, event: actions[e.method]}))
    return (
      <div>
        {hasBack({title, iconElementRight: <HeadRight menuList={menuList} />})}
        <List style={{paddingTop: 64}} styleName=''>
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

export default store => ({
  path: 'list',
  component: handleClassForAsync(store)(action)(FilmList)
})
